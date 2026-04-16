import { randomUUID } from "crypto";
import { CASE_TEMPLATE } from "../data/mockCase";
import type {
  ChatExchangeResponse,
  ConclusionResponse,
  Contact,
  GameSnapshot,
  Message,
  MessageMeta,
  RuntimeState
} from "../domain/types";
import {
  evaluateConclusionWithAi,
  generateNpcReplyWithAi,
  isRealAiEnabled
} from "../services/aiGateway";
import { classifyIntent, INTENT_LABEL_MAP } from "../services/intentClassifier";
import {
  buildFallbackNpcReply,
  deriveAttitude,
  findMatchedRule
} from "../services/npcReplyEngine";
import {
  buildAnalysis,
  maybeSendManualHint,
  refreshCaseProgress,
  unlockByRule
} from "../services/progressionEngine";

let runtimeState: RuntimeState = createInitialState();

export function getGameSnapshot(): GameSnapshot {
  return buildSnapshot(runtimeState);
}

export function markContactRead(contactId: string): GameSnapshot {
  const contact = runtimeState.contacts.find((item) => item.id === contactId);
  if (contact) {
    contact.unreadCount = 0;
  }
  return buildSnapshot(runtimeState);
}

export async function sendMessage(
  contactId: string,
  text: string,
  clientRequestId?: string
): Promise<ChatExchangeResponse> {
  const contact = assertPlayableContact(contactId);
  const npcBlueprint = CASE_TEMPLATE.npcs[contactId];
  const npcRuntime = runtimeState.npcRuntime[contactId];
  const usingRealAi = isRealAiEnabled();
  const fallbackIntent = classifyIntent(text);
  let intent = fallbackIntent;

  appendMessage(contactId, "player", "我", text, {
    clientRequestId,
    intent: fallbackIntent,
    intentLabel: INTENT_LABEL_MAP[fallbackIntent]
  });

  let matchedRule = undefined as ReturnType<typeof findMatchedRule>;
  let progressMade = false;
  let replyText = "";
  let analysisHint: string | undefined;

  if (usingRealAi) {
    const aiDecision = await generateNpcReplyWithAi({
      caseTitle: runtimeState.caseTitle,
      caseSummary: runtimeState.caseSummary,
      npc: npcBlueprint,
      npcRuntime,
      playerText: text,
      availableRules: npcBlueprint.breakthroughRules.filter(
        (rule) => !npcRuntime.triggeredRuleIds.includes(rule.id)
      ),
      conversationHistory: runtimeState.messagesByContact[contactId],
      globalRecentMessages: collectGlobalRecentMessages(runtimeState, contactId),
      unlockedEvidence: runtimeState.evidence
        .filter((item) => item.unlocked)
        .map((item) => `${item.title}：${item.description}`),
      unlockedDoubts: runtimeState.doubts
        .filter((item) => item.unlocked)
        .map((item) => `${item.title}：${item.description}`)
    });

    intent = aiDecision.intent;
    analysisHint = aiDecision.hint;

    if (intent === "PRESSURE" || intent === "POINT_OUT_CONTRADICTION") {
      npcRuntime.pressure += 1;
    }

    matchedRule = aiDecision.matchedRuleId
      ? npcBlueprint.breakthroughRules.find((rule) => rule.id === aiDecision.matchedRuleId)
      : undefined;

    if (matchedRule) {
      npcRuntime.triggeredRuleIds.push(matchedRule.id);
      npcRuntime.attitude = matchedRule.nextAttitude ?? aiDecision.nextAttitude ?? "动摇";
      unlockByRule(runtimeState, matchedRule, contactId);
      replyText = aiDecision.replyText;
      progressMade = true;
      runtimeState.stuckCounter = 0;
    } else {
      npcRuntime.attitude = aiDecision.nextAttitude ?? deriveAttitude(npcRuntime);
      replyText = aiDecision.replyText;
      progressMade = aiDecision.progressMade;
      runtimeState.stuckCounter = progressMade ? 0 : runtimeState.stuckCounter + 1;
    }
  } else {
    if (intent === "PRESSURE" || intent === "POINT_OUT_CONTRADICTION") {
      npcRuntime.pressure += 1;
    }

    matchedRule = findMatchedRule(npcBlueprint, text, intent, npcRuntime);

    if (matchedRule) {
      npcRuntime.triggeredRuleIds.push(matchedRule.id);
      npcRuntime.attitude = matchedRule.nextAttitude ?? "动摇";
      unlockByRule(runtimeState, matchedRule, contactId);
      replyText = matchedRule.revealText;
      progressMade = true;
      runtimeState.stuckCounter = 0;
    } else {
      npcRuntime.attitude = deriveAttitude(npcRuntime);
      replyText = buildFallbackNpcReply(npcBlueprint, intent, npcRuntime, npcRuntime.attitude);
      runtimeState.stuckCounter += 1;
    }
  }

  contact.attitude = npcRuntime.attitude;

  appendMessage(contactId, "npc", contact.name, replyText, {
    intent,
    intentLabel: INTENT_LABEL_MAP[intent],
    progressMade
  });

  refreshCaseProgress(runtimeState);
  maybeSendManualHint(runtimeState);

  const analysis = buildAnalysis(intent, progressMade, matchedRule?.id);
  if (!progressMade && analysisHint) {
    analysis.hint = analysisHint;
  }

  return {
    snapshot: buildSnapshot(runtimeState),
    analysis
  };
}

function collectGlobalRecentMessages(state: RuntimeState, currentContactId: string) {
  return Object.entries(state.messagesByContact)
    .flatMap(([contactId, messages]) =>
      messages.map((message) => ({
        contactId,
        senderName: message.senderName,
        role: message.role,
        text: message.text,
        timestamp: message.timestamp
      }))
    )
    .filter((message) => message.contactId !== currentContactId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    .slice(-8);
}

export async function submitConclusion(text: string): Promise<ConclusionResponse> {
  if (isRealAiEnabled()) {
    const evaluation = await evaluateConclusionWithAi({
      caseTitle: runtimeState.caseTitle,
      caseSummary: runtimeState.caseSummary,
      conclusionText: text,
      unlockedEvidence: runtimeState.evidence
        .filter((item) => item.unlocked)
        .map((item) => ({ title: item.title, description: item.description })),
      unlockedDoubts: runtimeState.doubts
        .filter((item) => item.unlocked)
        .map((item) => ({ title: item.title, description: item.description }))
    });

    appendSystemToDoubts(`【结案提交】${text}`);
    appendSystemToDoubts(`【系统反馈】${evaluation.feedback}`);

    if (evaluation.status === "pass") {
      appendSystemToStory("剧情更新：本案已被你成功还原。");
    }

    return {
      ...evaluation,
      snapshot: buildSnapshot(runtimeState)
    };
  }

  const normalized = text.replace(/\s+/g, "");
  const missingPoints: string[] = [];

  if (!/(支仓春美|支仓|春美)/.test(normalized)) {
    missingPoints.push("没有明确指出作案者是谁");
  }

  if (!/(接力棒|窗户|翻出|广播室反锁|高处脱身|离开广播室)/.test(normalized)) {
    missingPoints.push("没有说明支仓春美是如何在反锁广播室后离开现场的");
  }

  if (!/(送别|告别|燃北|春风|离开这里|毕业典礼|最后一天)/.test(normalized)) {
    missingPoints.push("没有交代清楚她在毕业典礼上播放《燃北》的真正动机");
  }

  let status: ConclusionResponse["status"] = "pass";
  let feedback =
    "你的真相链已经比较完整：支仓春美在毕业典礼当天播放《燃北》，反锁广播室后又沿危险路线离开现场，而她这么做并不是为了炫技，而是为了把那场过于平淡的告别改写成谁都忘不掉的一天。";

  if (missingPoints.length === 1 || missingPoints.length === 2) {
    status = "follow_up";
    feedback = `你的结论已经接近完整，但还差这些关键点：${missingPoints.join("；")}`;
  }

  if (missingPoints.length >= 3) {
    status = "fail";
    feedback = "当前结论信息量不足，建议先回到证物和疑点继续调查。";
  }

  appendSystemToDoubts(`【结案提交】${text}`);
  appendSystemToDoubts(`【系统反馈】${feedback}`);

  if (status === "pass") {
    appendSystemToStory("剧情更新：旧案的真相已经被你重新还原。");
  }

  return {
    status,
    feedback,
    missingPoints,
    snapshot: buildSnapshot(runtimeState)
  };
}

export function resetGame(): GameSnapshot {
  runtimeState = createInitialState();
  return buildSnapshot(runtimeState);
}

function createInitialState(): RuntimeState {
  const contacts = structuredClone(CASE_TEMPLATE.contacts);
  const evidence = structuredClone(CASE_TEMPLATE.evidence);
  const doubts = structuredClone(CASE_TEMPLATE.doubts);
  const todoPlaceholders = structuredClone(CASE_TEMPLATE.todoPlaceholders);

  const messagesByContact: Record<string, Message[]> = {};
  for (const [contactId, seeds] of Object.entries(CASE_TEMPLATE.initialMessages)) {
    messagesByContact[contactId] = seeds.map((seed) => ({
      id: randomUUID(),
      contactId,
      role: seed.role,
      senderName: seed.senderName,
      text: seed.text,
      timestamp: new Date().toISOString()
    }));
  }

  const npcRuntime: RuntimeState["npcRuntime"] = Object.fromEntries(
    Object.keys(CASE_TEMPLATE.npcs).map((contactId) => [
      contactId,
      {
        triggeredRuleIds: [],
        pressure: 0,
        attitude:
          contacts.find((contact) => contact.id === contactId)?.attitude ?? "正常"
      }
    ])
  );

  const state: RuntimeState = {
    caseId: CASE_TEMPLATE.caseId,
    caseTitle: CASE_TEMPLATE.caseTitle,
    caseSummary: CASE_TEMPLATE.caseSummary,
    contacts,
    messagesByContact,
    evidence,
    doubts,
    todoPlaceholders,
    stageLabel: "初始摸排",
    canCloseCase: false,
    npcRuntime,
    closableEvidenceIds: structuredClone(CASE_TEMPLATE.closableEvidenceIds),
    manualHints: structuredClone(CASE_TEMPLATE.manualHints),
    stuckCounter: 0,
    hintIndex: 0
  };

  refreshCaseProgress(state);
  return state;
}

function buildSnapshot(state: RuntimeState): GameSnapshot {
  return {
    caseId: state.caseId,
    caseTitle: state.caseTitle,
    caseSummary: state.caseSummary,
    contacts: [...state.contacts].sort((a, b) => a.sortOrder - b.sortOrder),
    messagesByContact: state.messagesByContact,
    evidence: state.evidence,
    doubts: state.doubts,
    todoPlaceholders: state.todoPlaceholders,
    stageLabel: state.stageLabel,
    canCloseCase: state.canCloseCase
  };
}

function assertPlayableContact(contactId: string): Contact {
  const contact = runtimeState.contacts.find((item) => item.id === contactId);

  if (!contact || !contact.unlocked) {
    throw new Error("联系人不存在或尚未解锁。");
  }

  if (contact.readonly) {
    throw new Error("系统联系人不可直接聊天。")
  }

  return contact;
}

function appendMessage(
  contactId: string,
  role: Message["role"],
  senderName: string,
  text: string,
  meta?: MessageMeta
): void {
  runtimeState.messagesByContact[contactId].push({
    id: randomUUID(),
    contactId,
    role,
    senderName,
    text,
    timestamp: new Date().toISOString(),
    meta
  });
}

function appendSystemToStory(text: string): void {
  runtimeState.messagesByContact.story.push({
    id: randomUUID(),
    contactId: "story",
    role: "system",
    senderName: "剧情",
    text,
    timestamp: new Date().toISOString()
  });
  const contact = runtimeState.contacts.find((item) => item.id === "story");
  if (contact) {
    contact.unreadCount += 1;
  }
}

function appendSystemToDoubts(text: string): void {
  runtimeState.messagesByContact.doubts.push({
    id: randomUUID(),
    contactId: "doubts",
    role: "system",
    senderName: "疑点",
    text,
    timestamp: new Date().toISOString()
  });
  const contact = runtimeState.contacts.find((item) => item.id === "doubts");
  if (contact) {
    contact.unreadCount += 1;
  }
}

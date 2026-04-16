import { randomUUID } from "crypto";
import type {
  BreakthroughRule,
  ChatAnalysis,
  RuntimeState
} from "../domain/types";
import { INTENT_LABEL_MAP, buildIntentHint } from "./intentClassifier";

export function unlockByRule(
  state: RuntimeState,
  rule: BreakthroughRule,
  currentContactId: string
): void {
  for (const evidenceId of rule.unlockEvidenceIds ?? []) {
    const evidence = state.evidence.find((item) => item.id === evidenceId);
    if (evidence && !evidence.unlocked) {
      evidence.unlocked = true;
      pushSystemMessage(
        state,
        "evidence",
        "证物",
        `新增证物：${evidence.title}。${evidence.description}`,
        currentContactId
      );
    }
  }

  for (const doubtId of rule.unlockDoubtIds ?? []) {
    const doubt = state.doubts.find((item) => item.id === doubtId);
    if (doubt && !doubt.unlocked) {
      doubt.unlocked = true;
      pushSystemMessage(
        state,
        "doubts",
        "疑点",
        `新增疑点：${doubt.title}`,
        currentContactId
      );
    }
  }

  for (const contactId of rule.unlockContactIds ?? []) {
    const contact = state.contacts.find((item) => item.id === contactId);
    if (contact && !contact.unlocked) {
      contact.unlocked = true;
      contact.online = true;
      contact.unreadCount += 1;
      pushSystemMessage(
        state,
        "story",
        "剧情",
        `新联系人出现：${contact.name}（${contact.roleTitle ?? "未知身份"}）。`,
        currentContactId
      );
    }
  }

  for (const update of rule.systemUpdates ?? []) {
    pushSystemMessage(state, update.contactId, update.senderName, update.text, currentContactId);
  }
}

export function refreshCaseProgress(state: RuntimeState): void {
  const unlockedCoreEvidenceCount = state.closableEvidenceIds.filter((evidenceId) =>
    state.evidence.some((item) => item.id === evidenceId && item.unlocked)
  ).length;

  const wasClosable = state.canCloseCase;
  state.canCloseCase = unlockedCoreEvidenceCount === state.closableEvidenceIds.length;

  if (state.canCloseCase) {
    state.stageLabel = "可以结案";
  } else if (unlockedCoreEvidenceCount >= 2) {
    state.stageLabel = "关键矛盾扩大";
  } else if (unlockedCoreEvidenceCount >= 1) {
    state.stageLabel = "线索浮现";
  } else {
    state.stageLabel = "初始摸排";
  }

  if (!wasClosable && state.canCloseCase) {
    pushSystemMessage(
      state,
      "story",
      "剧情",
      "剧情更新：你已经拿到关键矛盾链，可以尝试在“疑点”里提交结论。",
      ""
    );
    pushSystemMessage(
      state,
      "doubts",
      "疑点",
      "结案入口已开放。请在下方写出你的结论，至少覆盖：作案者、进入方式、动机。",
      ""
    );
  }
}

export function maybeSendManualHint(state: RuntimeState): void {
  if (state.stuckCounter < 3 || state.manualHints.length === 0) {
    return;
  }

  const hint = state.manualHints[state.hintIndex % state.manualHints.length];
  state.hintIndex += 1;
  state.stuckCounter = 0;

  pushSystemMessage(state, "story", "剧情", hint, "");
}

export function buildAnalysis(
  intent: ChatAnalysis["intent"],
  progressMade: boolean,
  matchedRuleId?: string
): ChatAnalysis {
  return {
    intent,
    intentLabel: INTENT_LABEL_MAP[intent],
    progressMade,
    matchedRuleId,
    hint: progressMade ? "命中了可推进案件的关键点。" : buildIntentHint(intent)
  };
}

function pushSystemMessage(
  state: RuntimeState,
  contactId: string,
  senderName: string,
  text: string,
  currentContactId: string
): void {
  const contact = state.contacts.find((item) => item.id === contactId);
  if (contact && contact.unlocked && contactId !== currentContactId) {
    contact.unreadCount += 1;
  }

  state.messagesByContact[contactId].push({
    id: randomUUID(),
    contactId,
    role: "system",
    senderName,
    text,
    timestamp: new Date().toISOString()
  });
}

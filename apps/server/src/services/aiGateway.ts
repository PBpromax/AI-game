import type {
  BreakthroughRule,
  ConclusionResponse,
  Message,
  NpcBlueprint,
  PlayerIntent,
  RuntimeNpcState
} from "../domain/types";
import { INTENT_LABEL_MAP } from "./intentClassifier";

const DEFAULT_ARK_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3";
const DEFAULT_ARK_MODEL = "ep-20260415161901-5hl7x";

export interface AiChatDecision {
  intent: PlayerIntent;
  replyText: string;
  progressMade: boolean;
  matchedRuleId?: string;
  nextAttitude?: RuntimeNpcState["attitude"];
  hint?: string;
}

export interface AiConclusionEvaluation {
  status: ConclusionResponse["status"];
  feedback: string;
  missingPoints: string[];
}

interface ChatPromptInput {
  caseTitle: string;
  caseSummary: string;
  npc: NpcBlueprint;
  npcRuntime: RuntimeNpcState;
  playerText: string;
  availableRules: BreakthroughRule[];
  conversationHistory: Message[];
  globalRecentMessages: Array<{
    contactId: string;
    senderName: string;
    role: Message["role"];
    text: string;
    timestamp: string;
  }>;
  unlockedEvidence: string[];
  unlockedDoubts: string[];
}

interface ConclusionPromptInput {
  caseTitle: string;
  caseSummary: string;
  conclusionText: string;
  unlockedEvidence: Array<{ title: string; description: string }>;
  unlockedDoubts: Array<{ title: string; description: string }>;
}

interface ChatDecisionPayload {
  intent?: unknown;
  replyText?: unknown;
  matchedRuleId?: unknown;
  nextAttitude?: unknown;
  progressMade?: unknown;
  hint?: unknown;
}

interface ConclusionPayload {
  status?: unknown;
  feedback?: unknown;
  missingPoints?: unknown;
}

export function isRealAiEnabled(): boolean {
  return process.env.AI_PROVIDER === "ark";
}

export async function generateNpcReplyWithAi(
  input: ChatPromptInput
): Promise<AiChatDecision> {
  const payload = await requestStructuredJson<ChatDecisionPayload>({
    system: buildChatSystemPrompt(),
    user: buildChatUserPrompt(input)
  });

  const intent = coerceIntent(payload.intent);
  const matchedRuleId = coerceRuleId(payload.matchedRuleId, input.availableRules);
  const nextAttitude = coerceAttitude(payload.nextAttitude);
  const replyText = coerceText(
    ensureEmotionPrefix(
      payload.replyText,
      nextAttitude ?? input.npcRuntime.attitude,
      input.npc.profile.tone
    ),
    `${pickEmotionPrefix(nextAttitude ?? input.npcRuntime.attitude, input.npc.profile.tone)}这件事我能说的先说到这里。`
  );
  const progressMade =
    typeof payload.progressMade === "boolean" ? payload.progressMade : Boolean(matchedRuleId);
  const hint =
    typeof payload.hint === "string" && payload.hint.trim().length > 0
      ? payload.hint.trim()
      : undefined;

  return {
    intent,
    replyText,
    progressMade,
    matchedRuleId,
    nextAttitude,
    hint
  };
}

export async function evaluateConclusionWithAi(
  input: ConclusionPromptInput
): Promise<AiConclusionEvaluation> {
  const payload = await requestStructuredJson<ConclusionPayload>({
    system: buildConclusionSystemPrompt(),
    user: buildConclusionUserPrompt(input)
  });

  return {
    status: coerceConclusionStatus(payload.status),
    feedback: coerceText(
      payload.feedback,
      "我已经根据当前证据评估了你的结案文本，但结果不够稳定，请补充作案者、进入方式和动机。"
    ),
    missingPoints: Array.isArray(payload.missingPoints)
      ? payload.missingPoints.filter(isNonEmptyString).map((item) => item.trim()).slice(0, 6)
      : []
  };
}

async function requestStructuredJson<T>({
  system,
  user
}: {
  system: string;
  user: string;
}): Promise<T> {
  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) {
    throw new Error("未配置 AI API Key。请在服务端环境变量中设置 ARK_API_KEY。");
  }

  const baseUrl = (process.env.ARK_BASE_URL || DEFAULT_ARK_BASE_URL).replace(/\/+$/, "");
  const model = process.env.ARK_MODEL || DEFAULT_ARK_MODEL;

  const response = await fetch(`${baseUrl}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.72,
      top_p: 0.9,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `${system}\n\n只输出合法 JSON 对象。`
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: user
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI 接口请求失败：${response.status} ${errorText}`.slice(0, 400));
  }

  const body = (await response.json()) as ResponsesApiBody;
  const text = extractResponsesText(body);

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`AI 返回的内容不是有效 JSON：${text.slice(0, 300)}`);
  }
}

function buildChatSystemPrompt(): string {
  return [
    "你是中文推理游戏后端的结构化裁判与 NPC 对话生成器。",
    "你必须只输出 JSON，不要输出代码块，不要解释。",
    "你的目标：",
    "1. 判断玩家意图 intent，只能是 ASK_FACT / PROBE / POINT_OUT_CONTRADICTION / PRESSURE / OFF_TOPIC。",
    "2. 生成符合角色设定的 npc 回复 replyText。",
    "3. 如果玩家命中了某条可击穿规则，则返回 matchedRuleId，否则返回空字符串。",
    "4. progressMade 表示本轮是否推进案件。",
    "5. nextAttitude 应优先使用当前案件里该角色已经出现过或明显合理的中文状态词，例如 友好 / 冷静 / 轻浮 / 稳重 / 神秘 / 认真 / 配合 / 兴奋 / 回忆 / 沉重 / 坦白 / 柔和 / 沉静 / 温柔 / 警惕 / 动摇。",
    "6. hint 是给开发者侧栏看的短提示，可选。",
    "严格要求：",
    "1. 不能泄露未击穿的 hiddenInfo。",
    "2. 只有当玩家问法足够贴近 availableRules 的描述和关键词时，才能命中 matchedRuleId。",
    "3. 如果 matchedRuleId 非空，replyText 应该自然地说出对应 revealText 的事实含义。",
    "4. 你要区分两种离题：轻度离题和重度离题。",
    "5. 轻度离题指：与案件主线关系弱，但仍像正常对话，例如寒暄、情绪观察、关系试探、生活化追问。",
    "6. 重度离题指：明显胡闹、恶意刷屏、完全脱离场景、无意义重复、要求 NPC 做不可能的事。",
    "7. 轻度离题时，不要机械重复“关系不大”或“与案件无关”；NPC 应先自然回应，再轻微把话题带回案件。",
    "8. 重度离题时，可以明确拒绝，但语气仍要符合角色，而不是客服模板。",
    "9. 即便 intent=OFF_TOPIC，replyText 也应尽量像真实聊天。",
    "10. soft redirect 比 hard reject 更优先。",
    "11. replyText 默认写成 2 到 4 句完整中文，长度通常控制在 45 到 120 字。",
    "12. 如果是轻度离题，推荐结构是：先接话，再补一句角色感受或态度，最后轻轻拉回案件。",
    "13. 如果命中关键推进点，回复可以稍长一些，但不要写成大段旁白。",
    "14. 少用生硬总结句，少用重复句式，避免每次都像系统提醒。",
    "15. 如果玩家连续几轮都问得比较偏，不要每轮都复读同一种提醒句，要换一种自然说法。",
    "16. replyText 必须优先像人在聊天，而不是像分类器在反馈判定。",
    "17. hint 里可以提示“本轮偏离主线，但保留了自然聊天”或“轻度离题，已柔和拉回主线”。",
    "18. 你必须参考 recentHistory 和 globalRecentMessages，保持前后说法一致，不能把每轮都当成全新对话。",
    "19. 如果玩家提到其他联系人、证物、前面对话中出现过的细节，你要利用上下文自然回应。",
    "20. 每次 replyText 开头都必须加一个圆括号包裹的短心理状态短语，例如（不屑一顾）、（突然警觉）、（明显迟疑）、（强装镇定）。",
    "21. 这个心理短语要和 nextAttitude、角色口吻、当前问话压力一致，长度控制在 2 到 6 个中文词以内，不要写成长句。",
    "22. 心理短语后直接接正常回复正文，不要换行，不要重复两个状态短语。",
    "23. 不要总在句尾用“你可以继续问”“你想先问哪个”“还有什么要问”这类明显引导玩家追问的表达，除非当前情境确实需要角色主动提出下一步建议。",
    "24. 更像自然对话收尾，可以停在回忆、判断、态度或事实本身，不必每次都抛回一个问题。",
    '25. 输出格式必须为 {"intent":"...","replyText":"...","matchedRuleId":"...","progressMade":true,"nextAttitude":"...","hint":"..."}。'
  ].join("\n");
}

function buildChatUserPrompt(input: ChatPromptInput): string {
  const recentHistory = input.conversationHistory.slice(-8).map((message) => ({
    role: message.role,
    senderName: message.senderName,
    text: message.text
  }));

  const availableRules = input.availableRules.map((rule) => ({
    id: rule.id,
    description: rule.description,
    keywords: rule.keywords,
    requiredIntents: rule.requiredIntents,
    revealText: rule.revealText,
    nextAttitude: rule.nextAttitude ?? "动摇"
  }));

  return JSON.stringify({
    caseTitle: input.caseTitle,
    caseSummary: input.caseSummary,
    playerText: input.playerText,
    npcProfile: {
      contactId: input.npc.contactId,
      roleTitle: input.npc.roleTitle,
      characterSetting: input.npc.profile.characterSetting,
      personality: input.npc.profile.personality,
      tone: input.npc.profile.tone,
      stance: input.npc.profile.stance,
      knowledgeBoundary: input.npc.profile.knowledgeBoundary
    },
    npcKnowledge: input.npc.knowledge,
    npcRuntime: input.npcRuntime,
    unlockedEvidence: input.unlockedEvidence,
    unlockedDoubts: input.unlockedDoubts,
    globalRecentMessages: input.globalRecentMessages,
    recentHistory,
    availableRules,
    replyStyleGuide: {
      preferredLength: "2-4句，45-120字，像正常微信聊天",
      softOffTopicStrategy: "先自然接话，再轻微拉回案件",
      avoid: ["机械重复关系不大", "客服式拒答", "过短的一句话打发", "大段旁白", "连续多轮复读同一句提醒"]
    }
  });
}

function buildConclusionSystemPrompt(): string {
  return [
    "你是中文推理游戏的结案评审器。",
    "你必须只输出 JSON，不要输出代码块，不要解释。",
    "请根据当前已解锁证据和疑点，评估玩家的结案文本是否足够完整。",
    "status 只能是 pass / follow_up / fail。",
    "feedback 需要是给玩家看的中文反馈。",
    "missingPoints 是缺失要点数组；pass 时可以为空数组。",
    '输出格式必须为 {"status":"pass","feedback":"...","missingPoints":["..."]}。'
  ].join("\n");
}

function buildConclusionUserPrompt(input: ConclusionPromptInput): string {
  return JSON.stringify(input);
}

interface ResponsesApiBody {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
}

function extractResponsesText(body: ResponsesApiBody): string {
  if (typeof body.output_text === "string" && body.output_text.trim().length > 0) {
    return body.output_text.trim();
  }

  const text = (body.output ?? [])
    .flatMap((item) => item.content ?? [])
    .map((content) => (typeof content.text === "string" ? content.text : ""))
    .join("")
    .trim();

  return text;
}

function coerceIntent(intent: unknown): PlayerIntent {
  if (
    intent === "ASK_FACT" ||
    intent === "PROBE" ||
    intent === "POINT_OUT_CONTRADICTION" ||
    intent === "PRESSURE" ||
    intent === "OFF_TOPIC"
  ) {
    return intent;
  }

  return "OFF_TOPIC";
}

function coerceAttitude(attitude: unknown): RuntimeNpcState["attitude"] | undefined {
  if (typeof attitude !== "string") {
    return undefined;
  }

  const normalized = attitude.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function coerceRuleId(
  matchedRuleId: unknown,
  availableRules: BreakthroughRule[]
): string | undefined {
  if (typeof matchedRuleId !== "string") {
    return undefined;
  }

  const normalized = matchedRuleId.trim();
  if (normalized.length === 0) {
    return undefined;
  }

  return availableRules.some((rule) => rule.id === normalized) ? normalized : undefined;
}

function coerceConclusionStatus(status: unknown): ConclusionResponse["status"] {
  if (status === "pass" || status === "follow_up" || status === "fail") {
    return status;
  }

  return "follow_up";
}

function coerceText(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return fallback;
}

function ensureEmotionPrefix(
  value: unknown,
  attitude: RuntimeNpcState["attitude"],
  tone: string
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return undefined;
  }

  if (/^[（(][^）)]{1,20}[）)]/.test(trimmed)) {
    return trimmed.replace(/^\(([^)]{1,20})\)/, "（$1）");
  }

  return `${pickEmotionPrefix(attitude, tone)}${trimmed}`;
}

function pickEmotionPrefix(
  attitude: RuntimeNpcState["attitude"],
  tone: string
): string {
  const normalizedTone = tone.trim();

  switch (attitude) {
    case "正常":
      return normalizedTone.includes("温和") ? "（平静回应）" : "（神色如常）";
    case "敷衍":
      return normalizedTone.includes("直接") ? "（有些不耐烦）" : "（敷衍带过）";
    case "警惕":
      return "（突然警觉）";
    case "防御":
      return "（强装镇定）";
    case "动摇":
      return "（明显迟疑）";
    default:
      return normalizedTone.includes("轻快")
        ? "（语气轻飘）"
        : normalizedTone.includes("少女")
          ? "（笑意微妙）"
          : normalizedTone.includes("严肃")
            ? "（神情凝住）"
            : "（短暂沉默）";
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export { INTENT_LABEL_MAP };

import type { PlayerIntent } from "../domain/types";

export const INTENT_LABEL_MAP: Record<PlayerIntent, string> = {
  ASK_FACT: "询问事实",
  PROBE: "试探",
  POINT_OUT_CONTRADICTION: "指出矛盾",
  PRESSURE: "施压逼问",
  OFF_TOPIC: "无效提问"
};

const CONTRADICTION_PATTERNS = [
  "矛盾",
  "前后不一致",
  "不对",
  "可是",
  "但是",
  "你刚才",
  "门禁",
  "登记",
  "记录",
  "说谎"
];

const PRESSURE_PATTERNS = [
  "老实",
  "说实话",
  "别装",
  "交代",
  "撒谎",
  "证据",
  "我已经知道",
  "别回避"
];

const PROBE_PATTERNS = ["是不是", "难道", "会不会", "该不会", "我猜", "你其实"];

const FACT_PATTERNS = [
  "谁",
  "哪里",
  "什么时候",
  "几点",
  "为什么",
  "为何",
  "怎么",
  "是否",
  "有没有",
  "吗",
  "？",
  "?"
];

export function classifyIntent(text: string): PlayerIntent {
  const normalized = normalizeText(text);

  if (matchesAny(normalized, PRESSURE_PATTERNS)) {
    return "PRESSURE";
  }

  if (matchesAny(normalized, CONTRADICTION_PATTERNS)) {
    return "POINT_OUT_CONTRADICTION";
  }

  if (matchesAny(normalized, PROBE_PATTERNS)) {
    return "PROBE";
  }

  if (matchesAny(normalized, FACT_PATTERNS)) {
    return "ASK_FACT";
  }

  return "OFF_TOPIC";
}

export function buildIntentHint(intent: PlayerIntent): string {
  switch (intent) {
    case "ASK_FACT":
      return "继续追问明确事实，比如时间、地点、谁在场。";
    case "PROBE":
      return "你的方向有可能对，但最好把猜测说得更具体。";
    case "POINT_OUT_CONTRADICTION":
      return "指出矛盾时，尽量引用证物或对方前后说法。";
    case "PRESSURE":
      return "施压最好建立在已有线索上，否则 NPC 只会更防御。";
    case "OFF_TOPIC":
      return "这句话和案件推进关系较弱，建议回到门禁、登记、奖金或署名。";
  }
}

function matchesAny(text: string, patterns: string[]): boolean {
  return patterns.some((pattern) => text.includes(pattern));
}

export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "").trim();
}

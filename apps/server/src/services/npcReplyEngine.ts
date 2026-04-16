import type {
  BreakthroughRule,
  NpcAttitude,
  NpcBlueprint,
  PlayerIntent,
  RuntimeNpcState
} from "../domain/types";
import { normalizeText } from "./intentClassifier";

export function findMatchedRule(
  npc: NpcBlueprint,
  text: string,
  intent: PlayerIntent,
  runtime: RuntimeNpcState
): BreakthroughRule | undefined {
  const normalized = normalizeText(text);

  return npc.breakthroughRules.find((rule) => {
    if (runtime.triggeredRuleIds.includes(rule.id)) {
      return false;
    }

    if (!rule.requiredIntents.includes(intent)) {
      return false;
    }

    const hitCount = rule.keywords.filter((keyword) =>
      normalized.includes(normalizeText(keyword))
    ).length;

    return hitCount >= (rule.minKeywordHits ?? 1);
  });
}

export function deriveAttitude(runtime: RuntimeNpcState): NpcAttitude {
  // 一旦命中过“动摇”类规则，就优先保留动摇态。
  if (runtime.attitude === "动摇") {
    return "动摇";
  }

  // 新案件允许自定义状态词，低压对话时尽量保留当前角色状态。
  if (runtime.pressure <= 0 && !isLegacyPressureAttitude(runtime.attitude)) {
    return runtime.attitude;
  }

  if (runtime.pressure >= 4) {
    return "防御";
  }

  if (runtime.pressure >= 2) {
    return "警惕";
  }

  if (runtime.pressure >= 1) {
    return "敷衍";
  }

  return "正常";
}

function isLegacyPressureAttitude(attitude: NpcAttitude): boolean {
  return (
    attitude === "正常" ||
    attitude === "敷衍" ||
    attitude === "警惕" ||
    attitude === "防御" ||
    attitude === "动摇"
  );
}

export function buildFallbackNpcReply(
  npc: NpcBlueprint,
  intent: PlayerIntent,
  runtime: RuntimeNpcState,
  currentAttitude: NpcAttitude
): string {
  if (runtime.triggeredRuleIds.length > 0) {
    return pickByPressure(npc.responseBank.afterBreakthrough, runtime.pressure);
  }

  switch (intent) {
    case "ASK_FACT":
      return pickByPressure(npc.responseBank.fact, runtime.pressure);
    case "PROBE":
      return pickByPressure(npc.responseBank.probe, runtime.pressure);
    case "POINT_OUT_CONTRADICTION":
      return currentAttitude === "防御"
        ? "你先拿出更硬的证据，再来谈矛盾。"
        : pickByPressure(npc.responseBank.contradiction, runtime.pressure);
    case "PRESSURE":
      return currentAttitude === "防御"
        ? "我不会因为你提高音量就改口。"
        : pickByPressure(npc.responseBank.pressure, runtime.pressure);
    case "OFF_TOPIC":
      return pickByPressure(npc.responseBank.offTopic, runtime.pressure);
  }
}

function pickByPressure(lines: string[], pressure: number): string {
  if (lines.length === 0) {
    return "……";
  }

  const index = Math.abs(pressure) % lines.length;
  return lines[index];
}

export type ContactType = "system" | "npc";
export type MessageRole = "system" | "player" | "npc";

export type PlayerIntent =
  | "ASK_FACT"
  | "PROBE"
  | "POINT_OUT_CONTRADICTION"
  | "PRESSURE"
  | "OFF_TOPIC";

export type NpcAttitude = string;

export interface MessageMeta {
  intent?: PlayerIntent;
  intentLabel?: string;
  progressMade?: boolean;
  note?: string;
  clientRequestId?: string;
}

export interface Message {
  id: string;
  contactId: string;
  role: MessageRole;
  senderName: string;
  text: string;
  timestamp: string;
  meta?: MessageMeta;
}

export interface MessageSeed {
  role: MessageRole;
  senderName: string;
  text: string;
}

export interface Contact {
  id: string;
  name: string;
  type: ContactType;
  roleTitle?: string;
  pinned: boolean;
  unlocked: boolean;
  online: boolean;
  readonly: boolean;
  unreadCount: number;
  attitude?: NpcAttitude;
  portraitByAttitude?: Record<string, string>;
  sortOrder: number;
}

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  sourceHint: string;
  canCrossCheck: boolean;
  unlocked: boolean;
  imageUrl?: string;
}

export interface DoubtItem {
  id: string;
  title: string;
  description: string;
  resolved: boolean;
  unlocked: boolean;
}

export interface TodoPlaceholder {
  id: string;
  category: string;
  title: string;
  description: string;
  suggestedLocation: string;
}

export interface RuleSystemUpdate {
  contactId: string;
  senderName: string;
  text: string;
}

export interface BreakthroughRule {
  id: string;
  description: string;
  keywords: string[];
  minKeywordHits?: number;
  requiredIntents: PlayerIntent[];
  revealText: string;
  unlockEvidenceIds?: string[];
  unlockDoubtIds?: string[];
  unlockContactIds?: string[];
  systemUpdates?: RuleSystemUpdate[];
  nextAttitude?: NpcAttitude;
}

export interface NpcBlueprint {
  contactId: string;
  roleTitle: string;
  profile: {
    characterSetting: string;
    personality: string;
    tone: string;
    stance: string;
    knowledgeBoundary: string;
  };
  knowledge: {
    publicInfo: string[];
    hiddenInfo: string[];
    breakableInfo: string[];
  };
  responseBank: {
    fact: string[];
    probe: string[];
    contradiction: string[];
    pressure: string[];
    offTopic: string[];
    afterBreakthrough: string[];
  };
  breakthroughRules: BreakthroughRule[];
}

export interface CaseTemplate {
  caseId: string;
  caseTitle: string;
  caseSummary: string;
  contacts: Contact[];
  evidence: EvidenceItem[];
  doubts: DoubtItem[];
  initialMessages: Record<string, MessageSeed[]>;
  npcs: Record<string, NpcBlueprint>;
  todoPlaceholders: TodoPlaceholder[];
  closableEvidenceIds: string[];
  manualHints: string[];
}

export interface RuntimeNpcState {
  triggeredRuleIds: string[];
  pressure: number;
  attitude: NpcAttitude;
}

export interface RuntimeState {
  caseId: string;
  caseTitle: string;
  caseSummary: string;
  contacts: Contact[];
  messagesByContact: Record<string, Message[]>;
  evidence: EvidenceItem[];
  doubts: DoubtItem[];
  todoPlaceholders: TodoPlaceholder[];
  stageLabel: string;
  canCloseCase: boolean;
  npcRuntime: Record<string, RuntimeNpcState>;
  closableEvidenceIds: string[];
  manualHints: string[];
  stuckCounter: number;
  hintIndex: number;
}

export interface GameSnapshot {
  caseId: string;
  caseTitle: string;
  caseSummary: string;
  contacts: Contact[];
  messagesByContact: Record<string, Message[]>;
  evidence: EvidenceItem[];
  doubts: DoubtItem[];
  todoPlaceholders: TodoPlaceholder[];
  stageLabel: string;
  canCloseCase: boolean;
}

export interface ChatAnalysis {
  intent: PlayerIntent;
  intentLabel: string;
  progressMade: boolean;
  matchedRuleId?: string;
  hint?: string;
}

export interface ChatExchangeResponse {
  snapshot: GameSnapshot;
  analysis: ChatAnalysis;
}

export interface ConclusionResponse {
  status: "pass" | "follow_up" | "fail";
  feedback: string;
  missingPoints: string[];
  snapshot: GameSnapshot;
}

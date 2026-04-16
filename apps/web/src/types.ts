export type ContactType = "system" | "npc";
export type PlayerIntent =
  | "ASK_FACT"
  | "PROBE"
  | "POINT_OUT_CONTRADICTION"
  | "PRESSURE"
  | "OFF_TOPIC";
export type NpcAttitude = string;
export type MessageRole = "system" | "player" | "npc";

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

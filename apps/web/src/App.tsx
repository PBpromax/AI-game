import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchBootstrap,
  markContactRead,
  resetGame,
  sendChatMessage,
  submitConclusion
} from "./api/client";
import { ContactList } from "./components/ContactList";
import { ConversationPanel } from "./components/ConversationPanel";
import { InspectorPanel } from "./components/InspectorPanel";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { ChatAnalysis, ConclusionResponse, GameSnapshot, Message } from "./types";

const DEFAULT_CONTACT_ID = "story";
const TIP_LIFETIME_MS = 3200;
const BOOTSTRAP_RETRY_DELAYS_MS = [250, 500, 1000];

interface UiTip {
  id: string;
  text: string;
}

export default function App() {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [selectedContactId, setSelectedContactId] = useState(DEFAULT_CONTACT_ID);
  const [chatInput, setChatInput] = useState("");
  const [conclusionDraft, setConclusionDraft] = useState("");
  const [lastAnalysis, setLastAnalysis] = useState<ChatAnalysis | null>(null);
  const [conclusionResult, setConclusionResult] =
    useState<ConclusionResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [pendingChatContactIds, setPendingChatContactIds] = useState<string[]>([]);
  const [pendingMessagesByContact, setPendingMessagesByContact] = useState<
    Record<string, Message[]>
  >({});
  const [errorMessage, setErrorMessage] = useState("");
  const [notes, setNotes] = useLocalStorage("deduction-notes", "");
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [uiTips, setUiTips] = useState<UiTip[]>([]);
  const previousSnapshotRef = useRef<GameSnapshot | null>(null);
  const pendingChatContactIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    void loadBootstrap();
  }, []);

  const selectedContact = useMemo(() => {
    if (!snapshot) {
      return null;
    }

    return (
      snapshot.contacts.find(
        (contact) => contact.id === selectedContactId && contact.unlocked
      ) ?? snapshot.contacts.find((contact) => contact.id === DEFAULT_CONTACT_ID) ?? null
    );
  }, [snapshot, selectedContactId]);

  const selectedMessages = useMemo(() => {
    if (!snapshot || !selectedContact) {
      return [];
    }

    const confirmedMessages = snapshot.messagesByContact[selectedContact.id] ?? [];
    const confirmedRequestIds = new Set(
      confirmedMessages
        .map((message) => message.meta?.clientRequestId)
        .filter((value): value is string => typeof value === "string" && value.length > 0)
    );

    return [
      ...confirmedMessages,
      ...(pendingMessagesByContact[selectedContact.id] ?? []).filter(
        (message) =>
          !message.meta?.clientRequestId ||
          !confirmedRequestIds.has(message.meta.clientRequestId)
      )
    ];
  }, [snapshot, selectedContact, pendingMessagesByContact]);

  function applySnapshot(
    nextSnapshot: GameSnapshot,
    options: {
      activeContactId?: string;
      enableTips?: boolean;
      enableTyping?: boolean;
    } = {}
  ) {
    const {
      activeContactId,
      enableTips = true,
      enableTyping = true
    } = options;
    const previousSnapshot = previousSnapshotRef.current;

    if (enableTips) {
      const nextTips = buildTips(previousSnapshot, nextSnapshot);
      if (nextTips.length > 0) {
        const entries = nextTips.map((text) => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          text
        }));

        setUiTips((current) => [...current, ...entries]);

        for (const entry of entries) {
          window.setTimeout(() => {
            setUiTips((current) => current.filter((tip) => tip.id !== entry.id));
          }, TIP_LIFETIME_MS);
        }
      }
    }

    setTypingMessageId(
      enableTyping
        ? findLatestIncomingMessageId(previousSnapshot, nextSnapshot, activeContactId)
        : null
    );

    previousSnapshotRef.current = nextSnapshot;
    setSnapshot(nextSnapshot);
  }

  async function loadBootstrap() {
    setBusy(true);
    setErrorMessage("");

    try {
      const data = await fetchBootstrapWithRetry();
      applySnapshot(data);
      setSelectedContactId(DEFAULT_CONTACT_ID);
    } catch (error) {
      setErrorMessage(readError(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleSelectContact(contactId: string) {
    setSelectedContactId(contactId);
    setErrorMessage("");

    try {
      const updated = await markContactRead(contactId);
      applySnapshot(updated, { enableTips: false, enableTyping: false });
    } catch (error) {
      setErrorMessage(readError(error));
    }
  }

  async function handleSendMessage() {
    if (!selectedContact || selectedContact.readonly || !chatInput.trim()) {
      return;
    }

    if (pendingChatContactIdsRef.current.has(selectedContact.id)) {
      return;
    }

    const contactId = selectedContact.id;
    const text = chatInput.trim();
    const clientRequestId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const optimisticMessage: Message = {
      id: `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      contactId,
      role: "player",
      senderName: "我",
      text,
      timestamp: new Date().toISOString()
      ,
      meta: {
        clientRequestId
      }
    };

    setErrorMessage("");
    pendingChatContactIdsRef.current.add(contactId);
    setPendingChatContactIds((current) => [...current, contactId]);
    setPendingMessagesByContact((current) => ({
      ...current,
      [contactId]: [...(current[contactId] ?? []), optimisticMessage]
    }));
    setChatInput("");

    try {
      const response = await sendChatMessage(contactId, text, clientRequestId);
      applySnapshot(response.snapshot, { activeContactId: contactId });
      setLastAnalysis(response.analysis);
    } catch (error) {
      setErrorMessage(readError(error));
      if (selectedContactId === contactId) {
        setChatInput((current) => (current.length > 0 ? current : text));
      }
    } finally {
      pendingChatContactIdsRef.current.delete(contactId);
      setPendingChatContactIds((current) => current.filter((id) => id !== contactId));
      setPendingMessagesByContact((current) => {
        const next = { ...current };
        delete next[contactId];
        return next;
      });
    }
  }

  async function handleSubmitConclusion() {
    if (!conclusionDraft.trim()) {
      return;
    }

    setBusy(true);
    setErrorMessage("");

    try {
      const response = await submitConclusion(conclusionDraft.trim());
      applySnapshot(response.snapshot);
      setConclusionResult(response);
    } catch (error) {
      setErrorMessage(readError(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleResetGame() {
    setBusy(true);
    setErrorMessage("");

    try {
      const data = await resetGame();
      applySnapshot(data, { enableTips: false, enableTyping: false });
      setSelectedContactId(DEFAULT_CONTACT_ID);
      setChatInput("");
      setConclusionDraft("");
      setConclusionResult(null);
      setLastAnalysis(null);
    } catch (error) {
      setErrorMessage(readError(error));
    } finally {
      setBusy(false);
    }
  }

  if (!snapshot || !selectedContact) {
    return <div className="boot-screen">正在加载游戏骨架...</div>;
  }

  return (
    <div className="app-shell">
      <div className="tip-stack" aria-live="polite">
        {uiTips.map((tip) => (
          <div key={tip.id} className="unlock-tip">
            {tip.text}
          </div>
        ))}
      </div>
      <ContactList
        contacts={snapshot.contacts}
        selectedContactId={selectedContact.id}
        onSelect={handleSelectContact}
        pendingContactIds={pendingChatContactIds}
      />
      <ConversationPanel
        selectedContact={selectedContact}
        messages={selectedMessages}
        typingMessageId={typingMessageId}
        caseSummary={snapshot.caseSummary}
        evidence={snapshot.evidence}
        doubts={snapshot.doubts}
        canCloseCase={snapshot.canCloseCase}
        chatInput={chatInput}
        onChatInputChange={setChatInput}
        onSendMessage={handleSendMessage}
        busy={busy}
        chatBusy={pendingChatContactIds.includes(selectedContact.id)}
        errorMessage={errorMessage}
        conclusionDraft={conclusionDraft}
        onConclusionDraftChange={setConclusionDraft}
        onSubmitConclusion={handleSubmitConclusion}
        conclusionResult={conclusionResult}
      />
      <InspectorPanel
        snapshot={snapshot}
        lastAnalysis={lastAnalysis}
        notes={notes}
        onNotesChange={setNotes}
        onResetGame={handleResetGame}
        busy={busy}
      />
    </div>
  );
}

function readError(error: unknown): string {
  return error instanceof Error ? error.message : "发生未知错误。";
}

async function fetchBootstrapWithRetry(): Promise<GameSnapshot> {
  let lastError: unknown;

  for (const delayMs of [0, ...BOOTSTRAP_RETRY_DELAYS_MS]) {
    if (delayMs > 0) {
      await delay(delayMs);
    }

    try {
      return await fetchBootstrap();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function buildTips(previousSnapshot: GameSnapshot | null, nextSnapshot: GameSnapshot): string[] {
  if (!previousSnapshot) {
    return [];
  }

  const tips: string[] = [];

  for (const contact of nextSnapshot.contacts) {
    const previousContact = previousSnapshot.contacts.find((item) => item.id === contact.id);
    if (contact.unlocked && previousContact && !previousContact.unlocked) {
      tips.push(`新联系人出现：${contact.name}`);
    }
  }

  for (const evidence of nextSnapshot.evidence) {
    const previousEvidence = previousSnapshot.evidence.find((item) => item.id === evidence.id);
    if (evidence.unlocked && previousEvidence && !previousEvidence.unlocked) {
      tips.push(`证物已录入：${evidence.title}`);
    }
  }

  for (const doubt of nextSnapshot.doubts) {
    const previousDoubt = previousSnapshot.doubts.find((item) => item.id === doubt.id);
    if (doubt.unlocked && previousDoubt && !previousDoubt.unlocked) {
      tips.push(`疑点更新：${doubt.title}`);
    }
  }

  if (!previousSnapshot.canCloseCase && nextSnapshot.canCloseCase) {
    tips.push("结案入口已开放");
  }

  return tips;
}

function findLatestIncomingMessageId(
  previousSnapshot: GameSnapshot | null,
  nextSnapshot: GameSnapshot,
  activeContactId?: string
): string | null {
  if (!previousSnapshot || !activeContactId) {
    return null;
  }

  const previousMessages = previousSnapshot.messagesByContact[activeContactId] ?? [];
  const nextMessages = nextSnapshot.messagesByContact[activeContactId] ?? [];
  const previousIds = new Set(previousMessages.map((message) => message.id));

  const latestIncoming = [...nextMessages]
    .reverse()
    .find((message) => !previousIds.has(message.id) && message.role !== "player");

  return latestIncoming?.id ?? null;
}

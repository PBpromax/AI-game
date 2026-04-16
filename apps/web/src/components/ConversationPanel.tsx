import { useEffect, useRef, useState } from "react";
import type {
  ConclusionResponse,
  Contact,
  DoubtItem,
  EvidenceItem,
  Message,
  NpcAttitude
} from "../types";

interface ConversationPanelProps {
  selectedContact: Contact;
  messages: Message[];
  typingMessageId: string | null;
  caseSummary: string;
  evidence: EvidenceItem[];
  doubts: DoubtItem[];
  canCloseCase: boolean;
  chatInput: string;
  onChatInputChange: (value: string) => void;
  onSendMessage: () => void;
  busy: boolean;
  chatBusy: boolean;
  errorMessage: string;
  conclusionDraft: string;
  onConclusionDraftChange: (value: string) => void;
  onSubmitConclusion: () => void;
  conclusionResult: ConclusionResponse | null;
}

export function ConversationPanel({
  selectedContact,
  messages,
  typingMessageId,
  caseSummary,
  evidence,
  doubts,
  canCloseCase,
  chatInput,
  onChatInputChange,
  onSendMessage,
  busy,
  chatBusy,
  errorMessage,
  conclusionDraft,
  onConclusionDraftChange,
  onSubmitConclusion,
  conclusionResult
}: ConversationPanelProps) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [previewEvidence, setPreviewEvidence] = useState<EvidenceItem | null>(null);
  const [zoomEvidence, setZoomEvidence] = useState<EvidenceItem | null>(null);
  const [previewStory, setPreviewStory] = useState<Message | null>(null);

  useEffect(() => {
    if (!messageContainerRef.current) {
      return;
    }

    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [messages, selectedContact.id, evidence, doubts, conclusionResult]);

  const unlockedEvidence = evidence.filter((item) => item.unlocked);
  const unlockedDoubts = doubts.filter((item) => item.unlocked);
  const storyIntroMessages = messages.filter((message) => isStoryIntroMessage(message.text));
  const storyFeedMessages = messages.filter((message) => !isStoryIntroMessage(message.text));
  const showMessageBubbles =
    selectedContact.id !== "story" &&
    selectedContact.id !== "evidence" &&
    selectedContact.id !== "doubts";

  return (
    <main className="center-panel">
      {selectedContact.type === "system" ? (
        <header className="chat-header">
          <div>
            <div className="chat-title">{selectedContact.name}</div>
            <div className="chat-subtitle">系统面板</div>
          </div>
          <div className="stage-badge">{selectedContact.readonly ? "只读" : "可盘问"}</div>
        </header>
      ) : null}

      {errorMessage ? <div className="error-banner">{errorMessage}</div> : null}

      <div ref={messageContainerRef} className="message-container">
        {selectedContact.type === "npc" ? (
          <NpcStageCard contact={selectedContact} />
        ) : null}

        {selectedContact.id === "story" ? (
          <StoryGrid messages={storyIntroMessages} onOpen={setPreviewStory} />
        ) : null}

        {selectedContact.id === "story"
          ? storyFeedMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                animate={typingMessageId === message.id}
              />
            ))
          : null}

        {showMessageBubbles
          ? messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                animate={typingMessageId === message.id}
              />
            ))
          : null}

        {selectedContact.id === "evidence" ? (
          <EvidenceGrid
            title="已解锁证物"
            items={unlockedEvidence}
            onPreview={setPreviewEvidence}
          />
        ) : null}

        {selectedContact.id === "doubts" ? (
          <>
            <DoubtGrid title="当前疑点" items={unlockedDoubts} />
            <section className="conclusion-card">
              <div className="info-grid-title">开放式结案</div>
              <div className="readonly-tip">
                请尽量在结论中同时写出：作案者、进入方式、动机。
              </div>
              <textarea
                className="conclusion-textarea"
                placeholder={
                  canCloseCase
                    ? "例如：我认为作案者是……她通过……离开广播室并制造了密室假象，动机是……"
                    : "还不能结案。继续击穿关键证词后，这里会开放。"
                }
                value={conclusionDraft}
                disabled={!canCloseCase || busy}
                onChange={(event) => onConclusionDraftChange(event.target.value)}
              />
              <button
                type="button"
                className="primary-button"
                onClick={onSubmitConclusion}
                disabled={!canCloseCase || busy || !conclusionDraft.trim()}
              >
                提交结论
              </button>
              {conclusionResult ? (
                <div className={`result-box ${conclusionResult.status}`}>
                  <div className="result-title">
                    {conclusionResult.status === "pass"
                      ? "结案通过"
                      : conclusionResult.status === "follow_up"
                        ? "还差一点"
                        : "结案失败"}
                  </div>
                  <div>{conclusionResult.feedback}</div>
                  {conclusionResult.missingPoints.length > 0 ? (
                    <ul className="compact-list">
                      {conclusionResult.missingPoints.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </section>
          </>
        ) : null}
      </div>

      {selectedContact.readonly ? null : (
        <div className="composer">
          <textarea
            className="composer-input"
            placeholder="输入你的盘问内容：可以询问事实、试探、指出矛盾，或施压逼问。"
            value={chatInput}
            disabled={chatBusy}
            onChange={(event) => onChatInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSendMessage();
              }
            }}
          />
          <button
            type="button"
            className="primary-button"
            onClick={onSendMessage}
            disabled={chatBusy || !chatInput.trim()}
          >
            {chatBusy ? "等待回复" : "发送"}
          </button>
        </div>
      )}

      {previewEvidence ? (
        <EvidenceDetailModal
          evidence={previewEvidence}
          onClose={() => setPreviewEvidence(null)}
          onZoom={() => previewEvidence.imageUrl && setZoomEvidence(previewEvidence)}
        />
      ) : null}

      {zoomEvidence ? (
        <EvidencePreviewModal
          evidence={zoomEvidence}
          onClose={() => setZoomEvidence(null)}
        />
      ) : null}

      {previewStory ? (
        <StoryPreviewModal
          message={previewStory}
          onClose={() => setPreviewStory(null)}
        />
      ) : null}
    </main>
  );
}

function StoryGrid({
  messages,
  onOpen
}: {
  messages: Message[];
  onOpen: (message: Message) => void;
}) {
  return (
    <section className="story-grid-section">
      <div className="story-grid">
        {messages.map((message) => {
          const title = extractStoryTitle(message.text);

          return (
            <button
              key={message.id}
              type="button"
              className="story-tile"
              onClick={() => onOpen(message)}
            >
              <span className="story-tile-label">{title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function StoryPreviewModal({
  message,
  onClose
}: {
  message: Message;
  onClose: () => void;
}) {
  const title = extractStoryTitle(message.text);
  const content = extractStoryContent(message.text);
  const paragraphs = splitStoryParagraphs(title, content);

  return (
    <div className="image-modal-backdrop" onClick={onClose}>
      <div className="story-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="image-modal-close" onClick={onClose}>
          关闭
        </button>
        <div className="story-modal-title">{title}</div>
        <div className="story-modal-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="story-modal-paragraph">
              {renderHighlightedText(paragraph)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function NpcStageCard({ contact }: { contact: Contact }) {
  const attitude = contact.attitude ?? "正常";
  const portraitUrl = getNpcPortraitUrl(contact, attitude);

  return (
    <section className="npc-stage-card">
      <div className="npc-stage-statusbar">
        <div className="npc-stage-name">{contact.name}</div>
        <div className="npc-stage-meta">
          <span>{contact.roleTitle ?? "未知身份"}</span>
          <span>{attitudeLabel(attitude)}</span>
        </div>
      </div>
      <div className="npc-stage-portrait-frame">
        {portraitUrl ? (
          <img className="npc-stage-portrait" src={portraitUrl} alt={`${contact.name}当前立绘`} />
        ) : (
          <div className="npc-stage-placeholder">
            <span className="npc-stage-placeholder-name">{contact.name}</span>
            <span className="npc-stage-placeholder-hint">后续可替换为情绪立绘</span>
          </div>
        )}
      </div>
    </section>
  );
}

function MessageBubble({
  message,
  animate
}: {
  message: Message;
  animate: boolean;
}) {
  const [visibleText, setVisibleText] = useState(animate ? "" : message.text);

  useEffect(() => {
    if (!animate) {
      setVisibleText(message.text);
      return;
    }

    setVisibleText("");
    let index = 0;
    const step = window.setInterval(() => {
      index += 1;
      setVisibleText(message.text.slice(0, index));
      if (index >= message.text.length) {
        window.clearInterval(step);
      }
    }, 18);

    return () => window.clearInterval(step);
  }, [animate, message.id, message.text]);

  return (
    <div className={`message-row ${message.role}`}>
      <div className="message-bubble">
        <div className="message-header">
          <span>{message.senderName}</span>
          <span>{formatTime(message.timestamp)}</span>
        </div>
        <div className={`message-text ${animate ? "typing" : ""}`}>
          {visibleText}
          {animate && visibleText.length < message.text.length ? (
            <span className="typing-caret" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function extractStoryTitle(text: string): string {
  const matched = text.match(/^【([^】]+)】/);
  return matched?.[1] ?? "剧情";
}

function isStoryIntroMessage(text: string): boolean {
  return /^【[^】]+】/.test(text);
}

function extractStoryContent(text: string): string {
  return text.replace(/^【[^】]+】/, "").trim();
}

function splitStoryParagraphs(title: string, text: string): string[] {
  if (title === "案件介绍") {
    return text
      .split(/(?<=。)(?=十五年前|声音明确来自广播室|从那天起)/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  if (title === "现状") {
    return text
      .split(/(?<=。)(?=众人挖出时间胶囊|更让你无法忽视的是)/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  if (title === "目标") {
    return text
      .split(/(?<=。)(?=通过他们各自掌握的事实)/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [text];
}

function renderHighlightedText(text: string) {
  const parts = text.split(HIGHLIGHT_PATTERN);

  return parts
    .filter((part) => part.length > 0)
    .map((part, index) =>
      HIGHLIGHT_TERMS.includes(part) ? (
        <strong key={`${part}-${index}`} className="story-highlight">
          {part}
        </strong>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      )
    );
}

const HIGHLIGHT_TERMS = [
  "北高",
  "毕业典礼",
  "毕业生答词",
  "《燃北》",
  "广播室",
  "广播委员会",
  "鸠村雄二",
  "志贺诚",
  "石桥",
  "支仓春美",
  "沼",
  "熊野老师",
  "时间胶囊",
  "匿名犯案声明",
  "犯人",
  "密室恶作剧",
  "作案者",
  "反锁房门",
  "动机"
];

const HIGHLIGHT_PATTERN = new RegExp(`(${HIGHLIGHT_TERMS.join("|")})`, "g");

function EvidenceGrid({
  title,
  items,
  onPreview
}: {
  title: string;
  items: EvidenceItem[];
  onPreview: (item: EvidenceItem) => void;
}) {
  return (
    <section className="info-grid-wrapper">
      <div className="info-grid-title">{title}</div>
      <div className="info-grid evidence-grid">
        {items.map((item) => (
          <article key={item.id} className="info-card evidence-card">
            <button
              type="button"
              className="evidence-title-button"
              onClick={() => onPreview(item)}
            >
              {item.title}
            </button>
            <div className="evidence-source">来源：{item.sourceHint}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidenceDetailModal({
  evidence,
  onClose,
  onZoom
}: {
  evidence: EvidenceItem;
  onClose: () => void;
  onZoom: () => void;
}) {
  return (
    <div className="image-modal-backdrop" onClick={onClose}>
      <div className="evidence-detail-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="image-modal-close" onClick={onClose}>
          关闭
        </button>
        <button
          type="button"
          className={`evidence-image-slot evidence-detail-image ${evidence.imageUrl ? "has-image" : "empty"}`}
          onClick={() => evidence.imageUrl && onZoom()}
          disabled={!evidence.imageUrl}
        >
          {evidence.imageUrl ? (
            <>
              <img className="evidence-image" src={evidence.imageUrl} alt={evidence.title} />
              <span className="evidence-image-zoom">点击放大</span>
            </>
          ) : (
            <span className="evidence-image-placeholder">预留证物图片位</span>
          )}
        </button>
        <div className="image-modal-title">{evidence.title}</div>
        <div className="image-modal-description">{evidence.description}</div>
        <div className="evidence-detail-source">来源：{evidence.sourceHint}</div>
      </div>
    </div>
  );
}

function DoubtGrid({
  title,
  items
}: {
  title: string;
  items: DoubtItem[];
}) {
  return (
    <section className="info-grid-wrapper">
      <div className="info-grid-title">{title}</div>
      <div className="info-grid">
        {items.map((item) => (
          <article key={item.id} className="info-card">
            <div className="info-card-title">{item.title}</div>
            <div className="info-card-description">{item.description}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidencePreviewModal({
  evidence,
  onClose
}: {
  evidence: EvidenceItem;
  onClose: () => void;
}) {
  return (
    <div className="image-modal-backdrop" onClick={onClose}>
      <div className="image-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="image-modal-close" onClick={onClose}>
          关闭
        </button>
        {evidence.imageUrl ? (
          <img className="image-modal-image" src={evidence.imageUrl} alt={evidence.title} />
        ) : null}
        <div className="image-modal-title">{evidence.title}</div>
        <div className="image-modal-description">{evidence.description}</div>
      </div>
    </div>
  );
}

function getNpcPortraitUrl(contact: Contact, attitude: NpcAttitude): string | undefined {
  const portraitByAttitude = contact.portraitByAttitude;
  if (!portraitByAttitude) {
    return undefined;
  }

  return (
    portraitByAttitude[attitude] ||
    portraitByAttitude.正常 ||
    undefined
  );
}

function attitudeLabel(attitude: NpcAttitude): string {
  switch (attitude) {
    case "正常":
      return "状态：平静观察";
    case "敷衍":
      return "状态：略显敷衍";
    case "警惕":
      return "状态：进入警觉";
    case "防御":
      return "状态：明显防御";
    case "动摇":
      return "状态：开始动摇";
    default:
      return `状态：${attitude}`;
  }
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

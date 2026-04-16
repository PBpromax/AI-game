import type { ChatAnalysis, GameSnapshot } from "../types";

interface InspectorPanelProps {
  snapshot: GameSnapshot;
  lastAnalysis: ChatAnalysis | null;
  notes: string;
  onNotesChange: (value: string) => void;
  onResetGame: () => void;
  busy: boolean;
}

export function InspectorPanel({
  snapshot,
  lastAnalysis,
  notes,
  onNotesChange,
  onResetGame,
  busy
}: InspectorPanelProps) {
  const unlockedEvidenceCount = snapshot.evidence.filter((item) => item.unlocked).length;
  const unlockedDoubtsCount = snapshot.doubts.filter((item) => item.unlocked).length;

  return (
    <aside className="right-panel">
      <section className="self-portrait-card">
        <div className="self-portrait-frame">
          <div className="self-portrait-placeholder">
            <span className="self-portrait-name">我</span>
            <span className="self-portrait-hint">预留头像图片位</span>
          </div>
        </div>
      </section>

      <section className="inspector-card">
        <div className="inspector-title">案件状态</div>
        <div className="stat-row">
          <span>阶段</span>
          <strong>{snapshot.stageLabel}</strong>
        </div>
        <div className="stat-row">
          <span>证物</span>
          <strong>
            {unlockedEvidenceCount} / {snapshot.evidence.length}
          </strong>
        </div>
        <div className="stat-row">
          <span>疑点</span>
          <strong>
            {unlockedDoubtsCount} / {snapshot.doubts.length}
          </strong>
        </div>
        <div className="stat-row">
          <span>结案入口</span>
          <strong>{snapshot.canCloseCase ? "已开放" : "未开放"}</strong>
        </div>
      </section>

      <section className="inspector-card">
        <div className="inspector-title">最近一次识别</div>
        {lastAnalysis ? (
          <>
            <div className="stat-row">
              <span>盘问动作</span>
              <strong>{lastAnalysis.intentLabel}</strong>
            </div>
            <div className="stat-row">
              <span>是否推进</span>
              <strong>{lastAnalysis.progressMade ? "是" : "否"}</strong>
            </div>
            {lastAnalysis.matchedRuleId ? (
              <div className="code-line">命中规则：{lastAnalysis.matchedRuleId}</div>
            ) : null}
            {lastAnalysis.hint ? <div className="helper-text">{lastAnalysis.hint}</div> : null}
          </>
        ) : (
          <div className="helper-text">你发送第一条消息后，这里会显示意图识别结果。</div>
        )}
      </section>

      <section className="inspector-card">
        <div className="inspector-title">你的笔记区</div>
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="把你现在怀疑的人、证词矛盾和推理链记在这里。"
        />
      </section>

      <button type="button" className="secondary-button" onClick={onResetGame} disabled={busy}>
        重置示例案件
      </button>
    </aside>
  );
}

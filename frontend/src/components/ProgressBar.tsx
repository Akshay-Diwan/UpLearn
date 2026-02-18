export function ProgressBar({ current, total }: {current: number, total: number}) {
  const pct = Math.round(((current+1)/total)*100);
  return (
    <div className="progress-wrapper">
      <div className="progress-row">
        <span className="progress-label">Question {current+1} of {total}</span>
        <span className="progress-pct">{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
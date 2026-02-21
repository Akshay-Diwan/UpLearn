export function ProgressBar({ current, total }: { current: number, total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div style={{ marginBottom: "1.5rem" }}>

      {/* Row: label + percentage */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "8px",
      }}>
        <span style={{
          fontSize: "0.7rem", fontWeight: 600,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.08em",
        }}>
          Question {current + 1} of {total}
        </span>
        <span style={{
          fontSize: "0.7rem", fontWeight: 700,
          color: "#00d4ff",
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.08em",
        }}>
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        width: "100%", height: "5px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "999px",
        overflow: "hidden",
      }}>
        {/* Fill */}
        <div style={{
          width: `${pct}%`, height: "100%",
          background: "linear-gradient(90deg, #00d4ff, #0055cc)",
          borderRadius: "999px",
          boxShadow: "0 0 8px rgba(0,212,255,0.5)",
          transition: "width 0.4s ease",
        }} />
      </div>

    </div>
  );
}
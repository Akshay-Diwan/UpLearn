import { useState, useEffect, useRef } from "react";

// Props:
//   onTick(formattedTime) — called every second, sends "MM:SS" to parent (App)

export default function Stopwatch({ onTick }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running) ref.current = setInterval(() => setTime(t => t + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);

  // Notify parent every tick so RightPanel session stats stay live
  useEffect(() => {
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
    const s = (time % 60).toString().padStart(2, "0");
    onTick && onTick(`${m}:${s}`);
  }, [time]);

  const fmt = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      background: "rgba(0,212,255,0.05)",
      border: "1px solid rgba(0,212,255,0.2)",
      borderRadius: "14px", padding: "8px 16px",
      backdropFilter: "blur(10px)",
    }}>
      {/* Timer display with running indicator dot */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {running && (
          <div style={{
            position: "absolute", left: "-14px",
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#00ff88", boxShadow: "0 0 8px #00ff88",
            animation: "pulse-glow 1s infinite",
          }} />
        )}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "1rem",
          color: running ? "#00d4ff" : "rgba(255,255,255,0.5)",
          letterSpacing: "0.12em", minWidth: "80px",
          transition: "color 0.3s",
        }}>{fmt(time)}</span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "6px" }}>
        {/* Play / Pause */}
        <button
          onClick={() => setRunning(r => !r)}
          style={{
            width: "30px", height: "30px", borderRadius: "8px",
            border: `1px solid ${running ? "rgba(245,158,11,0.4)" : "rgba(0,212,255,0.4)"}`,
            background: running ? "rgba(245,158,11,0.12)" : "rgba(0,212,255,0.12)",
            color: running ? "#f59e0b" : "#00d4ff",
            fontSize: "11px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >{running ? "⏸" : "▶"}</button>

        {/* Reset */}
        <button
          onClick={() => { setRunning(false); setTime(0); }}
          style={{
            width: "30px", height: "30px", borderRadius: "8px",
            border: "1px solid rgba(239,68,68,0.35)",
            background: "rgba(239,68,68,0.1)",
            color: "#ef4444", fontSize: "13px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >↺</button>
      </div>
    </div>
  );
}
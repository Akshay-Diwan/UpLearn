import { useState } from "react";

const suggestions = [
  "Explain this concept simply",
  "Create 5 practice questions",
  "Summarize the key points",
  "Compare with previous chapter",
  "Generate a study outline",
  "Common exam mistakes to avoid",
];

// Props:
//   onSuggestionClick(text) — fills ChatInterface input
//   history: [{ q, time }]  — real user queries logged by App
//   queryCount: number       — total messages sent
//   pdfCount: number         — total PDFs uploaded
//   sessionTime: string      — "MM:SS" from Stopwatch via App

export default function RightPanel({ onSuggestionClick, history = [], queryCount = 0, pdfCount = 0, sessionTime = "00:00" }) {
  const [activeTab, setActiveTab] = useState("suggestions");

  return (
    <aside style={{
      width: "235px", minWidth: "235px",
      background: "var(--panel)",
      borderLeft: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      padding: "1.2rem", gap: "1rem",
      backdropFilter: "blur(20px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Right accent bar */}
      <div style={{
        position: "absolute", right: 0, top: "20%", bottom: "20%", width: "2px",
        background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.5), transparent)",
      }} />

      {/* Tabs */}
      <div style={{
        display: "flex", gap: "3px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "10px", padding: "3px",
      }}>
        {["suggestions", "history"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: "7px", border: "none", borderRadius: "8px",
            cursor: "pointer",
            background: activeTab === tab
              ? "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,85,204,0.15))"
              : "transparent",
            color: activeTab === tab ? "var(--cyan)" : "var(--text-dim)",
            fontSize: "0.68rem", fontWeight: "600",
            fontFamily: "var(--font-body)", textTransform: "capitalize",
            transition: "all 0.2s", letterSpacing: "0.03em",
            borderTop: activeTab === tab ? "1px solid rgba(0,212,255,0.25)" : "1px solid transparent",
          }}>{tab}</button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "suggestions" ? (
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{
            fontSize: "0.6rem", color: "var(--cyan)", fontFamily: "var(--font-mono)",
            letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "2px",
          }}>Quick Prompts</p>
          {suggestions.map((s, i) => (
            <button key={i} className="prompt-btn" onClick={() => onSuggestionClick && onSuggestionClick(s)} style={{
              textAlign: "left", padding: "9px 12px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", cursor: "pointer",
              color: "rgba(255,255,255,0.6)", fontSize: "0.71rem",
              fontFamily: "var(--font-body)", lineHeight: "1.45",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ color: "var(--cyan)", fontSize: "10px", flexShrink: 0, fontFamily: "var(--font-mono)" }}>→</span>
              {s}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{
            fontSize: "0.6rem", color: "var(--cyan)", fontFamily: "var(--font-mono)",
            letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "2px",
          }}>Recent Queries</p>
          {history.length === 0 ? (
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "10px", padding: "2rem 0",
            }}>
              <div style={{ fontSize: "2rem", opacity: 0.2 }}>🔍</div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", textAlign: "center", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
                Your queries will appear here as you chat
              </p>
            </div>
          ) : (
            [...history].reverse().map((h, i) => (
              <div
                key={i}
                onClick={() => onSuggestionClick && onSuggestionClick(h.q)}
                style={{
                  padding: "9px 12px", cursor: "pointer",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px", transition: "all 0.2s",
                  animation: `fade-up 0.3s ${i * 0.04}s both`,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.07)"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <p style={{ margin: "0 0 4px", fontSize: "0.71rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {h.q}
                </p>
                <p style={{ margin: 0, fontSize: "0.6rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>◷ {h.time}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Session Stats — all real live data from App */}
      <div style={{
        padding: "12px", borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,85,204,0.05))",
        border: "1px solid rgba(0,212,255,0.15)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
        }} />
        <p style={{ margin: "0 0 10px", fontSize: "0.58rem", color: "var(--cyan)", fontFamily: "var(--font-mono)", letterSpacing: "0.18em" }}>
          SESSION STATS
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[[queryCount, "Queries"], [pdfCount, "PDFs"], [sessionTime, "Time"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "#fff", fontWeight: "700" }}>{val}</p>
              <p style={{ margin: 0, fontSize: "0.58rem", color: "var(--text-dim)", fontFamily: "var(--font-body)", marginTop: "2px" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
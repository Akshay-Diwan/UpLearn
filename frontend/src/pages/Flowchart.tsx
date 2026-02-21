// import { useState, useEffect, useRef } from "react";
// import mermaid from "mermaid";
// ─── Mermaid CDN loader ───────────────────────────────────────────────────────
// const MERMAID_CDN = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js";

// function loadMermaid(callback) {
//   if (window.mermaid) {
//     callback();
//     return;
//   }
//   const script = document.createElement("script");
//   script.src = MERMAID_CDN;
//   script.onload = callback;
//   script.onerror = () => console.error("Failed to load Mermaid from CDN");
  // document.head.appendChild(script);
// }

// function initMermaid() {
//   window.mermaid.initialize({
//     startOnLoad: false,
//     theme: "dark",
//     themeVariables: {
//       primaryColor: "#20c8b4",
//       primaryTextColor: "#c8d8e8",
//       primaryBorderColor: "#1a4a5a",
//       lineColor: "#2a5060",
//       secondaryColor: "#0f1d2e",
//       tertiaryColor: "#0b1120",
//       background: "#0d1a28",
//       mainBkg: "#0f1d2e",
//       nodeBorder: "#1a4a5a",
//       clusterBkg: "#0d1a28",
//       titleColor: "#c8d8e8",
//       edgeLabelBackground: "#0f1d2e",
//       fontFamily: "Inter, sans-serif",
//     },
//     flowchart: { curve: "basis", htmlLabels: true },
//     securityLevel: "loose",
//   });
// }

// function generateId() {
//   return Math.random().toString(36).substring(2, 12);
// }

// ─── Main App ─────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function Flowchart() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const diagramRef = useRef(null);

  // ✅ Initialize mermaid once
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      flowchart: { htmlLabels: true, curve: "basis" },
    });
  }, []);

  // ✅ Render diagram when code changes
  useEffect(() => {
    if (!mermaidCode) return;
    renderDiagram(mermaidCode);
  }, [mermaidCode]);

  // ✅ Mermaid render function
  async function renderDiagram(code) {
    if (!diagramRef.current) return;

    const id = "mermaid-" + Date.now();

    try {
      const { svg } = await mermaid.render(id, code);
      diagramRef.current.innerHTML = svg;
    } catch (err) {
      console.error(err);
      diagramRef.current.innerHTML = `
        <div style="color:#f87171">
          Invalid Mermaid syntax
          <pre>${code}</pre>
        </div>`;
    }
  }

  // ✅ Generate from FastAPI
  async function generate() {
    const message = input.trim();
    if (!message) return;

    setStatus("loading");
    setError("");
    setMermaidCode("");

    try {
      const formdata = new FormData();
      formdata.append("input", message);

      const res = await fetch("http://localhost:8000/flowchart/", {
        method: "POST",
        body: formdata,
      });

      const data = await res.json();

      let code = data.response.trim();

      // 🔥 remove ```mermaid fences if AI sends them
      code = code
        .replace(/^```mermaid/i, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

      setMermaidCode(code);
      setStatus("success");
    } catch (err) {
      setError("Server error");
      setStatus("error");
    }
  }

  function resetChat() {
    setInput("");
    setStatus("idle");
    setMermaidCode("");
    setError("");
    setShowCode(false);
    if (diagramRef.current) diagramRef.current.innerHTML = "";
  }

  const isLoading = status === "loading";
  const hasOutput = status !== "idle";


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          background: #0b1120;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(100,180,220,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .app-root {
          font-family: 'Inter', sans-serif;
          color: #c8d8e8;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 64px 20px 100px;
          position: relative;
        }

        .app-glow {
          position: fixed;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(32,200,180,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .app-header {
          text-align: center;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .app-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 18px;
          padding: 5px 15px;
          background: rgba(32,200,180,0.08);
          border: 1px solid rgba(32,200,180,0.2);
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #20c8b4;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .app-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #20c8b4;
          animation: badgePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }

        .app-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ddeeff;
          letter-spacing: -0.025em;
          line-height: 1.12;
        }

        .app-title-accent {
          background: linear-gradient(135deg, #20c8b4 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .app-subtitle {
          margin-top: 12px;
          color: #3a5568;
          font-size: 0.95rem;
        }

        .app-input-wrap {
          width: 100%;
          max-width: 680px;
          position: relative;
          z-index: 1;
        }

        .app-textarea {
          width: 100%;
          padding: 16px 20px;
          background: #0d1a28;
          border: 1px solid #1a2e42;
          border-radius: 14px;
          color: #c8d8e8;
          font-family: 'Inter', sans-serif;
          font-size: 0.97rem;
          resize: vertical;
          min-height: 120px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          line-height: 1.65;
        }

        .app-textarea:focus {
          border-color: #20c8b4;
          box-shadow: 0 0 0 3px rgba(32,200,180,0.07);
        }

        .app-textarea::placeholder { color: #1e3045; }

        .app-btn-row {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .app-btn-generate {
          flex: 1;
          padding: 13px 24px;
          border: none;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(135deg, #20c8b4, #38bdf8);
          color: #061018;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(32,200,180,0.18);
        }

        .app-btn-generate:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(32,200,180,0.28);
        }

        .app-btn-generate:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .app-btn-new {
          padding: 13px 20px;
          border: 1px solid #1a2e42;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          background: #0d1a28;
          color: #3a5568;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }

        .app-btn-new:hover {
          background: #111e2e;
          color: #6a8a9a;
          border-color: #233c52;
        }

        .app-hint {
          margin-top: 8px;
          font-size: 0.7rem;
          color: #1e3045;
          text-align: right;
        }

        .app-output {
          width: 100%;
          max-width: 900px;
          margin-top: 48px;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .app-output-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .app-output-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #1e3a4a;
          white-space: nowrap;
        }

        .app-output-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, #1a2e42, transparent);
        }

        .app-diagram-box {
          background: #0d1a28;
          border: 1px solid #1a2e42;
          border-radius: 16px;
          padding: 36px;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
          position: relative;
        }

        .app-diagram-box::before,
        .app-diagram-box::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: #20c8b4;
          border-style: solid;
          opacity: 0.25;
          pointer-events: none;
        }
        .app-diagram-box::before {
          top: 10px; left: 10px;
          border-width: 1px 0 0 1px;
        }
        .app-diagram-box::after {
          bottom: 10px; right: 10px;
          border-width: 0 1px 1px 0;
        }

        .app-loading {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #20c8b4;
          font-size: 0.92rem;
          font-weight: 500;
        }

        .app-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid #1a2e42;
          border-top-color: #20c8b4;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .app-error {
          color: #f87171;
          background: rgba(248,113,113,0.04);
          border: 1px solid rgba(248,113,113,0.18);
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 0.88rem;
          width: 100%;
          line-height: 1.6;
        }

        .app-diagram-inner { width: 100%; }
        .app-diagram-inner svg { max-width: 100%; height: auto; }

        .app-btn-toggle {
          margin-top: 12px;
          padding: 6px 14px;
          background: transparent;
          border: 1px solid #1a2e42;
          border-radius: 8px;
          color: #2a4055;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .app-btn-toggle:hover {
          background: #0d1a28;
          color: #4a7090;
          border-color: #243c52;
        }

        .app-raw-code {
          margin-top: 12px;
          background: #070e18;
          border: 1px solid #112030;
          border-radius: 12px;
          padding: 20px 22px;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          color: #2a5070;
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.75;
          animation: fadeUp 0.2s ease;
        }

        .app-mermaid-status {
          position: fixed;
          bottom: 16px;
          right: 16px;
          font-size: 0.65rem;
          color: #1a3a28;
          font-family: 'DM Mono', monospace;
          z-index: 10;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="app-root">
        <div className="app-glow" />

        {/* Header */}
        <header className="app-header">
          <div className="app-badge">
            <span className="app-badge-dot" />
            AI-Powered
          </div>
          <h1 className="app-title">
            AI <span className="app-title-accent">Flowchart</span> Generator
          </h1>
          <p className="app-subtitle">
            Describe your process or workflow and watch it come to life.
          </p>
        </header>

        {/* Input */}
        <div className="app-input-wrap">
          <textarea
            className="app-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={handleKeyDown}
            placeholder="e.g. User login process with email verification and forgot password flow..."
          />
          <div className="app-btn-row">
            {/* Only disabled while actively loading — not gated on mermaidReady */}
            <button
              className="app-btn-generate"
              onClick={generate}
              disabled={isLoading}
            >
              {isLoading ? "⏳  Generating…" : "✨  Generate Diagram"}
            </button>
            <button className="app-btn-new" onClick={resetChat}>
              ← New
            </button>
          </div>
          <p className="app-hint">Ctrl + Enter to generate</p>
        </div>

        {/* Output */}
        {hasOutput && (
          <section className="app-output">
            <div className="app-output-header">
              <span className="app-output-label">Generated Diagram</span>
              <div className="app-output-line" />
            </div>

            {/* <div className="app-diagram-box">
              {isLoading ? (
                <div className="app-loading">
                  <div className="app-spinner" />
                  Building your diagram…
                </div>
              ) : status === "error" ? (
                <div className="app-error">⚠️ {error}</div>
              ) : (
                <div className="app-diagram-inner" ref={diagramRef} />
              )}
            </div> */}
            <div className="app-diagram-box">
  {isLoading ? (
    <div className="app-loading">
      <div className="app-spinner" />
      Building your diagram…
    </div>
  ) : status === "error" ? (
    <div className="app-error">⚠️ {error}</div>
  ) : (
    <div className="app-diagram-inner" ref={diagramRef} />
  )}
</div>

            {mermaidCode && !isLoading && (
              <>
                <button
                  className="app-btn-toggle"
                  onClick={() => setShowCode((v) => !v)}
                >
                  {showCode ? "▲ Hide Mermaid Code" : "▼ Show Mermaid Code"}
                </button>
                {showCode && (
                  <pre className="app-raw-code">{mermaidCode}</pre>
                )}
              </>
            )}
          </section>
        )}

        {/* Mermaid load status indicator (bottom-right corner) */}
        <span className="app-mermaid-status">
          {/* {mermaidReady ? "● mermaid ready" : "○ loading mermaid…"} */}
        </span>
      </div>
    </>
  );
}
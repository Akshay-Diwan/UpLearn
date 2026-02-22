import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import { Link } from "react-router-dom";
export default function Header({ mermaidCode, setMermaidCode, diagramRef }) {
  const [showPopup, setShowPopup] = useState(false);
  const [flowInput, setFlowInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const wrapperRef = useRef(null);

  // 🔥 Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    }
  // ✅ Initialize mermaid once
     mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      flowchart: { htmlLabels: true, curve: "basis" },
    });
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // 🚀 Your API call
  async function generate(text) {
    if (!text.trim()) return;
    const message = text.trim();
    console.log("Generating for:", text);

    const formdata = new FormData();
    formdata.append("input", message);

    try {
      setIsGenerating(true);
      const res = await fetch("http://localhost:8000/flowchart/", {
        method: "POST",
        body: formdata,
      });
      const data = await res.json();
      console.log("Response:", data);

      let code = data.response.trim();
      // 🔥 remove ```mermaid fences if AI sends them
      code = code
        .replace(/^```mermaid/i, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

      setMermaidCode(code);
      setFlowInput("");
      setIsGenerating(false)
    } catch (err) {
      console.error("Error:", err);
    }
  }
  return (
    <header style={{
      background: "rgba(2,8,16,0.95)",
      backdropFilter: "blur(24px)",
      borderBottom: "1px solid rgba(0,212,255,0.1)",
      padding: "0 2rem", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexShrink: 0, position: "relative", zIndex: 50,
    }}>
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
      }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="glow-pulse" style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, #00d4ff 0%, #0055cc 100%)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontWeight: "700", color: "#fff",
          fontSize: "15px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
          }} />
          U
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontWeight: "700",
            fontSize: "0.95rem", color: "#fff", letterSpacing: "0.08em",
          }}>UpLearn</span>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "0.62rem",
            color: "rgba(0,212,255,0.7)", letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>by Nexus · AI Studio</span>
        </div>
      </div>

      {/* Nav links + CTA */}
      <nav style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/quiz" className="nav-link">Quiz</Link>
        <Link to="/solver" className="nav-link">Problem Solver</Link>
        <div style={{ width: "1px", height: "20px", background: "rgba(0,212,255,0.15)" }} />

            <div
        ref={wrapperRef}
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        {/* 🌟 Button */}
        <button
          onClick={() => setShowPopup((prev) => !prev)}
          style={{
            background: "linear-gradient(135deg, #00d4ff, #0055cc)",
            border: "none",
            borderRadius: "10px",
            padding: "8px 18px",
            color: "#fff",
            fontSize: "0.78rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow:
              "0 0 20px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {isGenerating ? "Generating..." : "Generate FlowChart"}
        </button>

        {/* 💬 Popup */}
        {showPopup && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              width: "300px",
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,85,204,0.08))",
              border: "1px solid rgba(0,212,255,0.25)",
              borderRadius: "14px",
              padding: "14px",
              marginTop: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              zIndex: 100,
              animation: "fadeIn 0.18s ease",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* textarea */}
            <textarea
              autoFocus
              value={flowInput}
              onChange={(e) => setFlowInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "Enter") {
                  generate(flowInput);
                  setShowPopup(false);
                }
              }}
              placeholder="Describe your flow..."
              style={{
                width: "100%",
                height: "80px",
                background: "#020617",
                border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: "8px",
                padding: "8px",
                color: "#fff",
                fontSize: "0.75rem",
                outline: "none",
                resize: "none",
              }}
            />

            {/* send button */}
            <button
              onClick={() => {
                generate(flowInput);
                setShowPopup(false);
              }}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #00d4ff, #0055cc)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Send 🚀
            </button>
          </div>
        )}
      </div>
      </nav>
    </header>
  );
}
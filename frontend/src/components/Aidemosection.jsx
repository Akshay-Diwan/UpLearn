import { useState, useEffect, useRef } from "react";

const demoMessages = [
  { role: "user", text: "I'm struggling with calculus derivatives. Can you help?" },
  { role: "ai",  text: "Of course! Let's break derivatives down step by step. A derivative measures how a function changes as its input changes. Think of it as the slope of a curve at any given point." },
  { role: "user", text: "Can you give me a simple example?" },
  { role: "ai",  text: "Sure! For f(x) = x², the derivative f'(x) = 2x. At x=3, the slope is 6. I've added 5 practice problems to your study plan based on this topic!" },
];

// Typewriter hook
function useTypewriter(text, speed = 18, active = false) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    setDisplayed(""); setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active]);
  return { displayed, done };
}

function AiMessage({ text, delay = 0 }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, []);
  const { displayed, done } = useTypewriter(text, 14, active);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
      className="chat-message">
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, #00d4ff, #0055cc)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.9rem", boxShadow: "0 0 10px rgba(0,212,255,0.3)",
      }}>🤖</div>
      <div style={{
        maxWidth: "68%", padding: "11px 15px",
        borderRadius: "18px 18px 18px 4px",
        background: "rgba(255,255,255,0.055)",
        border: "1px solid rgba(255,255,255,0.09)",
        fontSize: "0.85rem", color: "#fff",
        fontFamily: "var(--font-body)", lineHeight: 1.65,
        minHeight: "38px",
      }}>
        {active ? displayed : ""}
        {active && !done && (
          <span style={{
            display: "inline-block", width: "2px", height: "14px",
            background: "var(--cyan)", marginLeft: "2px", verticalAlign: "middle",
            animation: "typing-cursor 0.7s ease-in-out infinite",
          }} />
        )}
      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-end", gap: "10px" }}
      className="chat-message">
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.9rem",
      }}>👤</div>
      <div style={{
        maxWidth: "68%", padding: "11px 15px",
        borderRadius: "18px 18px 4px 18px",
        background: "linear-gradient(135deg, #00d4ff, #0055cc)",
        fontSize: "0.85rem", color: "#fff",
        fontFamily: "var(--font-body)", lineHeight: 1.65,
      }}>
        {text}
      </div>
    </div>
  );
}

export default function AIDemoSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const messagesRef = useRef(null);

  // Trigger animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [visible]);

  return (
    <section id="ai-demo" ref={sectionRef}
      style={{ padding: "7rem 2rem", maxWidth: "860px", margin: "0 auto" }}>

      {/* Badge */}
      <div className={`reveal ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span className="glow-badge">Live Demo</span>
      </div>

      {/* Header */}
      <div className={`reveal ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800, fontFamily: "var(--font-body)",
          letterSpacing: "-0.02em", color: "#fff",
          lineHeight: 1.15, marginBottom: "1rem",
        }}>
          See the{" "}
          <span style={{ color: "var(--cyan)", textShadow: "0 0 30px rgba(0,212,255,0.4)" }}>AI Tutor</span>
          {" "}in Action
        </h2>
        <p style={{
          fontSize: "0.97rem", color: "var(--text-dim)",
          fontFamily: "var(--font-body)", lineHeight: 1.7,
        }}>
          Experience how our AI breaks down complex topics into clear, digestible explanations.
        </p>
      </div>

      {/* Chat window */}
      <div
        className={`reveal-scale ${visible ? "visible" : ""}`}
        style={{
          background: "rgba(4,13,26,0.92)",
          border: "1px solid rgba(0,212,255,0.18)",
          borderRadius: "20px", overflow: "hidden",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 80px rgba(0,212,255,0.07)",
          position: "relative",
        }}
      >
        {/* Shimmer top border */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
        }} />

        {/* Chat header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
          background: "rgba(0,212,255,0.025)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "linear-gradient(135deg, #00d4ff, #0055cc)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", flexShrink: 0,
              boxShadow: "0 0 18px rgba(0,212,255,0.45)",
              animation: "pulse-glow 2.5s ease-in-out infinite",
            }}>🤖</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: "#fff", fontFamily: "var(--font-body)" }}>
                UpLearn AI Tutor
              </p>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#34d399", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#34d399", display: "inline-block",
                  boxShadow: "0 0 8px #34d399",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }} />
                Online now
              </p>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div ref={messagesRef} style={{
          padding: "1.5rem", display: "flex", flexDirection: "column",
          gap: "1.1rem", minHeight: "320px", overflowY: "auto",
        }}>
          {visible && (
            <>
              <UserMessage text={demoMessages[0].text} />
              <AiMessage  text={demoMessages[1].text} delay={400} />
              <UserMessage text={demoMessages[2].text} />
              <AiMessage  text={demoMessages[3].text} delay={800} />
            </>
          )}
        </div>

      </div>
    </section>
  );
}
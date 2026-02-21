import { useState, useEffect, useRef } from "react";
import Stopwatch from "./Stopwatch.jsx";
import { uploadPdfAndAsk} from "../../apis/rag.js";
const initMessages = [{
  role: "assistant",
  text: "Hello! I'm your AI Academic Ally by Nexus.\n\nUpload a PDF from the left panel, or ask me anything about your studies. I can explain concepts, generate practice questions, summarize chapters, and build personalized study plans — all tailored to how you learn best. 🚀",
}];

// Props:
//   externalInput: string       — suggestion/history text clicked in RightPanel
//   clearExternalInput()        — resets externalInput in App after we consume it
//   onMessageSent(text)         — logs user query to App → RightPanel history + stats

export default function ChatInterface({ externalInput, clearExternalInput, onMessageSent }

) {
  const [messages, setMessages] = useState(initMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState();
  const bottomRef = useRef(null);
  const fileRef = useRef(null);
  const textareaRef = useRef(null);

  // When a suggestion/history item is clicked in RightPanel, fill the input
  useEffect(() => {
    if (externalInput) {
      setInput(externalInput);
      clearExternalInput();
      textareaRef.current?.focus();
    }
  }, [externalInput]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || !attachment) return;
    const msg = { role: "user", text: input, attachment: attachment };
    setMessages(m => [...m, msg]);
    if (input.trim()) onMessageSent && onMessageSent(input.trim());
    setLoading(true);
    const data = await uploadPdfAndAsk(attachment,input.trim());
    setLoading(false);
    setInput("");
    console.log(data);
    // await new Promise(r => setTimeout(r, 1400));
    setMessages(m => [...m, {
      role: "assistant",
      text: data.answer,
      // text: `Great question about "${msg.text || "your file"}"!\n\nIn the live version, I would:\n\n• Analyze your PDF content deeply\n• Provide detailed, step-by-step explanations\n• Generate targeted practice problems\n• Create memory aids and study frameworks\n\nPowered by Nexus AI — built to help you learn smarter, not harder. 🎓`,
    }]);
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const handleFile = (e) => {
    setAttachment(e.target.files?.[0]);
  };

  const canSend = input.trim() || attachment;

  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, position: "relative" }}>

      {/* ── Top bar with session info + Stopwatch ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid rgba(0,212,255,0.08)",
        background: "rgba(2,8,16,0.7)", backdropFilter: "blur(16px)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Live status dot */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
            <div style={{ position: "absolute", width: "16px", height: "16px", borderRadius: "50%", border: "1px solid rgba(0,255,136,0.3)", animation: "pulse-glow 2s infinite" }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "0.85rem", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 600 }}>
              AI Academic Session
            </h2>
            <p style={{ margin: 0, fontSize: "0.67rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
              nexus · ready
            </p>
          </div>
        </div>
        {/* Stopwatch sits here inside the chat top bar */}
        <Stopwatch />
      </div>

      {/* ── Message list ── */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "1.5rem 1.8rem",
        display: "flex", flexDirection: "column", gap: "18px",
        background: "linear-gradient(180deg, rgba(2,8,16,0.3) 0%, transparent 100%)",
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "assistant" ? "msg-ai" : "msg-user"}
            style={{
              display: "flex",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              gap: "12px", alignItems: "flex-start",
            }}
          >
            {/* Avatar */}
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0,
              background: msg.role === "assistant"
                ? "linear-gradient(135deg, #00d4ff, #0055cc)"
                : "linear-gradient(135deg, #7c3aed, #4c1d95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px",
              boxShadow: msg.role === "assistant"
                ? "0 0 16px rgba(0,212,255,0.4)"
                : "0 0 16px rgba(124,58,237,0.4)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }} />
              {msg.role === "assistant" ? "🤖" : "🎓"}
            </div>

            {/* Bubble */}
            <div style={{
              maxWidth: "68%",
              background: msg.role === "assistant"
                ? "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,85,204,0.05))"
                : "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(76,29,149,0.1))",
              border: `1px solid ${msg.role === "assistant" ? "rgba(0,212,255,0.18)" : "rgba(124,58,237,0.28)"}`,
              borderRadius: msg.role === "assistant" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
              padding: "12px 16px",
              position: "relative", overflow: "hidden",
            }}>
              {/* Shimmer top line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: msg.role === "assistant"
                  ? "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
              }} />

              {/* Attachment chips */}
              {/* {msg.attachment && (
                <div style={{ marginBottom: "8px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <span key={msg.attachment.name} style={{
                      background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.3)",
                      borderRadius: "6px", padding: "2px 8px", fontSize: "0.63rem",
                      color: "var(--cyan)", fontFamily: "var(--font-body)",
                    }}>📎 {attachment}</span>
                </div>
              )} */}

              <p style={{
                margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.88)",
                fontFamily: "var(--font-body)", lineHeight: "1.65",
                whiteSpace: "pre-wrap", fontWeight: 400,
              }}>{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="msg-ai" style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "10px",
              background: "linear-gradient(135deg, #00d4ff, #0055cc)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", boxShadow: "0 0 16px rgba(0,212,255,0.4)",
            }}>🤖</div>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,85,204,0.05))",
              border: "1px solid rgba(0,212,255,0.18)",
              borderRadius: "4px 16px 16px 16px",
              padding: "14px 18px",
              display: "flex", gap: "5px", alignItems: "center",
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "var(--cyan)",
                  animation: `bounce-dot 1.2s ${i * 0.18}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input / Search Bar ── */}
      <div style={{
        padding: "14px 20px",
        borderTop: "1px solid rgba(0,212,255,0.08)",
        background: "rgba(2,8,16,0.92)", backdropFilter: "blur(24px)",
        flexShrink: 0, position: "relative",
      }}>
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
        }} />

        {/* Attachment chips */}
        {/* {attachment && (
          <div style={{ marginBottom: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>

              <span style={{
                background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: "8px", padding: "4px 10px",
                fontSize: "0.68rem", color: "var(--cyan)",
                fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: "5px",
              }}>
                📎 {attachment}
                <span
                  // onClick={() => setAttachment(p => p.filter((_, j) => j !== i))}
                  style={{ cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "10px" }}
                > ✕ </span>
              </span>
          </div>
        )} */}

        {/* Input row */}
        <div style={{
          display: "flex", gap: "10px", alignItems: "flex-end",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${canSend ? "rgba(0,212,255,0.35)" : "rgba(0,212,255,0.15)"}`,
          borderRadius: "16px", padding: "10px 12px",
          boxShadow: canSend ? "0 0 24px rgba(0,212,255,0.08)" : "none",
          transition: "all 0.3s",
        }}>
          {/* Attach button */}
          <button className="attach-btn" onClick={() => fileRef.current?.click()} title="Attach file" style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
            color: "var(--cyan)", cursor: "pointer", fontSize: "15px",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>📎</button>
          <input type="file" ref={fileRef} hidden multiple onChange={handleFile} />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about your study material..."
            rows={1}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#fff", fontSize: "0.85rem",
              fontFamily: "var(--font-body)", fontWeight: 400,
              resize: "none", lineHeight: "1.6", maxHeight: "120px",
            }}
          />

          {/* Send button */}
          <button
            className="send-btn"
            onClick={send}
            disabled={!canSend}
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: canSend ? "linear-gradient(135deg, #00d4ff, #0055cc)" : "rgba(255,255,255,0.04)",
              border: "none", cursor: canSend ? "pointer" : "default",
              color: "#fff", fontSize: "15px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: canSend ? "0 0 20px rgba(0,212,255,0.45), inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
              transition: "all 0.25s",
            }}
          >➤</button>
        </div>

        <p style={{
          textAlign: "center", margin: "8px 0 0",
          fontSize: "0.6rem", color: "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
        }}>
          ENTER → send &nbsp;·&nbsp; SHIFT+ENTER → new line &nbsp;·&nbsp; nexus ai v2
        </p>
      </div>
    </main>
  );
}
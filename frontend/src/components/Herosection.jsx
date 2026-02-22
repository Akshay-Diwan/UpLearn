import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";
const PHRASES = [
  "master any subject",
  "ace every exam",
  "learn smarter",
  "boost your grades",
  "study with AI",
];

function TypewriterPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed]     = useState("");
  const [phase, setPhase]             = useState("typing"); // typing | pause | deleting

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timeout;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1600);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, phraseIndex]);

  return (
    <strong style={{
      color: "var(--cyan)",
      fontWeight: 700,
      textShadow: "0 0 20px rgba(0,212,255,0.45)",
      position: "relative",
      display: "inline-block",
      minWidth: "2ch",
    }}>
      {displayed}
      {/* blinking cursor */}
      <span style={{
        display: "inline-block",
        width: "2px",
        height: "1em",
        background: "var(--cyan)",
        marginLeft: "2px",
        verticalAlign: "middle",
        borderRadius: "1px",
        animation: "typing-cursor 0.7s ease-in-out infinite",
        boxShadow: "0 0 8px rgba(0,212,255,0.8)",
      }} />
    </strong>
  );
}



export default function HeroSection() {
  const ctaRef = useRef(null);

  // Magnetic CTA button effect
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
      }
    };
    const onLeave = () => { btn.style.transform = ""; };
    window.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "8rem 1.5rem 4rem",
      position: "relative",
    }}>

      {/* Headline */}
      <h1 className="fade-up-2" style={{
        fontSize: "clamp(3rem, 7vw, 5.5rem)",
        fontWeight: 800, lineHeight: 1.08,
        fontFamily: "var(--font-body)",
        letterSpacing: "-0.03em",
        color: "#fff",
        marginBottom: "0.15em",
      }}>
        Your AI-Powered
      </h1>
      <h1 className="fade-up-3" style={{
        fontSize: "clamp(3rem, 7vw, 5.5rem)",
        fontWeight: 800, lineHeight: 1.08,
        fontFamily: "var(--font-body)",
        letterSpacing: "-0.03em",
        marginBottom: "1.6rem",
      }}>
        <span style={{
          color: "var(--cyan)",
          textShadow: "0 0 50px rgba(0,212,255,0.5)",
          WebkitTextStroke: "0px transparent",
        }}>Academic Ally</span>
      </h1>

      {/* Subheadline */}
      <p className="fade-up-4" style={{
        fontSize: "1.15rem", fontWeight: 400,
        color: "rgba(255,255,255,0.72)",
        fontFamily: "var(--font-body)",
        marginBottom: "0.5rem",
      }}>
        The smartest way to <TypewriterPhrase />
      </p>
      <p className="fade-up-4" style={{
        fontSize: "1.05rem",
        color: "rgba(255,255,255,0.52)",
        fontFamily: "var(--font-body)",
        fontWeight: 300,
        lineHeight: 1.85,
        maxWidth: "500px",
        margin: "0 auto 2.8rem",
        letterSpacing: "0.015em",
      }}>
        UpLearn by Nexus uses intelligent algorithms to create{" "}
        <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>personalized study plans</span>,
        track your performance, and adapt to{" "}
        <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>the way you learn best</span>.
      </p>

      {/* CTA button */}
      <div className="fade-up-5" style={{ marginBottom: "3.5rem" }}>
        <Link to="/quiz" style={{ textDecoration: "none" }}>
          <button
            ref={ctaRef}
            style={{
              position: "relative", overflow: "hidden",
              padding: "15px 40px", borderRadius: "14px",
              background: "linear-gradient(135deg, #00d4ff, #0055cc)",
              border: "none", color: "#fff",
              fontSize: "1rem", fontWeight: 700,
              fontFamily: "var(--font-body)", cursor: "pointer",
              boxShadow: "0 0 30px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
              letterSpacing: "0.02em",
              transition: "box-shadow 0.25s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 55px rgba(0,212,255,0.65), inset 0 1px 0 rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
            onMouseDown={e => e.currentTarget.style.transform = "translateY(0) scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"}
          >
            {/* Shimmer sweep */}
            <span style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.4s ease-in-out infinite",
              borderRadius: "inherit",
              pointerEvents: "none",
            }} />
            Get Started →
          </button>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="fade-up-5" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "28px", height: "46px", borderRadius: "14px",
          border: "1.5px solid rgba(0,212,255,0.3)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "6px",
        }}>
          <div style={{
            width: "4px", height: "10px", borderRadius: "2px",
            background: "var(--cyan)",
            animation: "scroll-bounce 1.8s ease-in-out infinite",
          }} />
        </div>
        <span style={{ fontSize: "0.65rem", color: "rgba(0,212,255,0.4)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";

const STEP_ICONS = {
  "01": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="si1" x1="0" y1="28" x2="28" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0044cc"/>
          <stop offset="100%" stopColor="#00d4ff"/>
        </linearGradient>
      </defs>
      {/* Person silhouette */}
      <circle cx="14" cy="8" r="4.5" stroke="url(#si1)" strokeWidth="1.5" fill="none"/>
      <path d="M5 24c0-5 4-8 9-8s9 3 9 8" stroke="url(#si1)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Target crosshair top-right */}
      <circle cx="22" cy="7" r="3.5" stroke="rgba(0,212,255,0.5)" strokeWidth="1" fill="none"/>
      <line x1="22" y1="4" x2="22" y2="3"   stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="22" y1="10" x2="22" y2="11" stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="19" y1="7" x2="18" y2="7"   stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="25" y1="7" x2="26" y2="7"   stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="22" cy="7" r="1.2" fill="#00d4ff" opacity="0.8"/>
    </svg>
  ),
  "02": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="si2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#0033bb"/>
        </linearGradient>
      </defs>
      {/* CPU/chip outline */}
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="url(#si2)" strokeWidth="1.5" fill="rgba(0,212,255,0.06)"/>
      {/* Inner grid dots */}
      <circle cx="12" cy="12" r="1" fill="#00d4ff" opacity="0.8"/>
      <circle cx="16" cy="12" r="1" fill="#00d4ff" opacity="0.6"/>
      <circle cx="12" cy="16" r="1" fill="#00d4ff" opacity="0.6"/>
      <circle cx="16" cy="16" r="1" fill="#00d4ff" opacity="0.9"/>
      {/* Connector pins */}
      <line x1="11" y1="8"  x2="11" y2="5"  stroke="rgba(0,212,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="8"  x2="14" y2="5"  stroke="rgba(0,212,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="17" y1="8"  x2="17" y2="5"  stroke="rgba(0,212,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11" y1="20" x2="11" y2="23" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="20" x2="14" y2="23" stroke="rgba(0,212,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="17" y1="20" x2="17" y2="23" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8"  y1="12" x2="5"  y2="12" stroke="rgba(0,212,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8"  y1="16" x2="5"  y2="16" stroke="rgba(0,212,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="12" x2="23" y2="12" stroke="rgba(0,212,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="16" x2="23" y2="16" stroke="rgba(0,212,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  "03": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="si3" x1="0" y1="28" x2="28" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0055cc"/>
          <stop offset="100%" stopColor="#00d4ff"/>
        </linearGradient>
      </defs>
      {/* Rising arrow chart */}
      <polyline points="4,22 9,16 14,11 19,7 24,4"
        stroke="url(#si3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Arrow head */}
      <path d="M20 4 L24 4 L24 8" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Data point circles */}
      <circle cx="4"  cy="22" r="1.8" fill="#00d4ff" opacity="0.5"/>
      <circle cx="9"  cy="16" r="1.8" fill="#00d4ff" opacity="0.6"/>
      <circle cx="14" cy="11" r="1.8" fill="#00d4ff" opacity="0.75"/>
      <circle cx="19" cy="7"  r="1.8" fill="#00d4ff" opacity="0.9"/>
      <circle cx="24" cy="4"  r="2.2" fill="#00d4ff"/>
      {/* Base line */}
      <line x1="3" y1="24" x2="25" y2="24" stroke="rgba(0,212,255,0.2)" strokeWidth="1" strokeLinecap="round"/>
      {/* Vertical tick marks */}
      <line x1="9"  y1="24" x2="9"  y2="23" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="24" x2="14" y2="23" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="19" y1="24" x2="19" y2="23" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
};

const steps = [
  {
    number: "01",
    title: "Share Your Goals",
    desc: "Tell us your subjects, current grades, and academic targets. Our AI builds your profile instantly.",
    align: "left",
  },
  {
    number: "02",
    title: "AI Analyzes & Plans",
    desc: "Our engine processes your data, identifies knowledge gaps, and creates a hyper-personalized study strategy.",
    align: "right",
  },
  {
    number: "03",
    title: "Watch Grades Soar",
    desc: "Follow your adaptive plan, track real-time progress, and celebrate breakthroughs as they happen.",
    align: "left",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animate the timeline line based on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0,
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.5)
      ));
      setLineHeight(progress * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef}
      style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto" }}>

      {/* Badge */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span className="glow-badge">How It Works</span>
      </div>

      {/* Header */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800, fontFamily: "var(--font-body)",
          letterSpacing: "-0.02em", color: "#fff",
          lineHeight: 1.15, marginBottom: "1rem",
        }}>
          Three Steps to{" "}
          <br />
          <span style={{ color: "var(--cyan)", textShadow: "0 0 30px rgba(0,212,255,0.4)" }}>
            Academic Excellence
          </span>
        </h2>
        <p style={{
          fontSize: "0.97rem", color: "var(--text-dim)",
          fontFamily: "var(--font-body)", lineHeight: 1.7,
        }}>
          Getting started is effortless. Our AI handles the heavy lifting so you can focus on learning.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Animated center line */}
        <div ref={lineRef} style={{
          position: "absolute", left: "50%", top: "32px", bottom: "32px",
          width: "1px", transform: "translateX(-50%)",
          background: "rgba(0,212,255,0.08)",
          overflow: "hidden",
        }}>
          {/* Fill that animates with scroll */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: `${lineHeight}%`,
            background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.6), rgba(0,212,255,0.3))",
            transition: "height 0.1s ease",
          }} />
        </div>

        {steps.map((step, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: step.align === "left" ? "row" : "row-reverse",
            alignItems: "center", gap: 0,
            marginBottom: i < steps.length - 1 ? "3.5rem" : 0,
          }}>

            {/* Text side */}
            <div
              className={step.align === "left" ? "reveal-left" : "reveal-right"}
              style={{
                flex: 1,
                textAlign: step.align === "left" ? "right" : "left",
                padding: step.align === "left" ? "0 3rem 0 0" : "0 0 0 3rem",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <p style={{
                fontSize: "0.62rem", fontWeight: 700,
                color: "var(--cyan)", fontFamily: "var(--font-mono)",
                letterSpacing: "0.2em", marginBottom: "8px",
                opacity: 0.7,
              }}>STEP {step.number}</p>
              <h3 style={{
                fontSize: "1.25rem", fontWeight: 700,
                color: "#fff", fontFamily: "var(--font-body)",
                letterSpacing: "-0.015em", marginBottom: "10px",
              }}>{step.title}</h3>
              <p style={{
                fontSize: "0.87rem", color: "var(--text-dim)",
                fontFamily: "var(--font-body)", lineHeight: 1.7,
              }}>{step.desc}</p>
            </div>

            {/* Center icon node */}
            <div
              className="reveal-scale step-icon-wrap"
              style={{
                flexShrink: 0, zIndex: 2,
                width: "64px", height: "64px", borderRadius: "16px",
                background: "rgba(4,13,26,0.97)",
                border: "1px solid rgba(0,212,255,0.28)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem",
                boxShadow: "0 0 0 4px rgba(2,8,16,1), 0 0 20px rgba(0,212,255,0.1)",
                transitionDelay: `${i * 0.12 + 0.06}s`,
              }}
            >
              {STEP_ICONS[step.number]}
              {/* Ripple ring on hover handled by CSS */}
            </div>

            {/* Empty side */}
            <div style={{ flex: 1 }} />
          </div>
        ))}
      </div>
    </section>
  );
}
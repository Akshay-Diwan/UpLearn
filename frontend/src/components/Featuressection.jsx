import { useEffect, useRef } from "react";

// ── Custom SVG icons — futuristic & techy ──────────────────────────────────
const ICONS = {
  brain: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <defs>
        <linearGradient id="ic1" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#0055cc"/>
        </linearGradient>
      </defs>
      <path d="M13 3C9.5 3 7 5.5 7 8.5c0 1.2.4 2.3 1 3.2C6.4 12.5 5 14.2 5 16.5 5 19.5 7.7 22 11 22h4c3.3 0 6-2.5 6-5.5 0-2.3-1.4-4-3-4.8.6-.9 1-2 1-3.2C19 5.5 16.5 3 13 3z" stroke="url(#ic1)" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
      <circle cx="10" cy="10" r="1.2" fill="#00d4ff"/>
      <circle cx="16" cy="10" r="1.2" fill="#00d4ff"/>
      <path d="M10 15.5 Q13 18 16 15.5" stroke="url(#ic1)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <line x1="13" y1="3" x2="13" y2="6" stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="7" y1="11.5" x2="4" y2="11.5" stroke="rgba(0,212,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="19" y1="11.5" x2="22" y2="11.5" stroke="rgba(0,212,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  analytics: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <defs>
        <linearGradient id="ic2" x1="0" y1="26" x2="26" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0055cc"/>
          <stop offset="100%" stopColor="#00d4ff"/>
        </linearGradient>
      </defs>
      <rect x="3" y="18" width="4" height="5" rx="1" fill="url(#ic2)" opacity="0.6"/>
      <rect x="9" y="13" width="4" height="10" rx="1" fill="url(#ic2)" opacity="0.8"/>
      <rect x="15" y="8" width="4" height="15" rx="1" fill="url(#ic2)"/>
      <rect x="21" y="4" width="2" height="19" rx="1" fill="#00d4ff" opacity="0.4"/>
      <path d="M5 18 L11 13 L17 8 L22 4" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="5"  cy="18" r="1.5" fill="#00d4ff"/>
      <circle cx="11" cy="13" r="1.5" fill="#00d4ff"/>
      <circle cx="17" cy="8"  r="1.5" fill="#00d4ff"/>
    </svg>
  ),
  notes: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <defs>
        <linearGradient id="ic3" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#0044bb"/>
        </linearGradient>
      </defs>
      <rect x="4" y="3" width="14" height="18" rx="2" stroke="url(#ic3)" strokeWidth="1.4" fill="none"/>
      <line x1="7" y1="8"  x2="15" y2="8"  stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.8"/>
      <line x1="7" y1="11" x2="15" y2="11" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.6"/>
      <line x1="7" y1="14" x2="12" y2="14" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
      <circle cx="19" cy="18" r="5" fill="rgba(0,212,255,0.1)" stroke="url(#ic3)" strokeWidth="1.2"/>
      <path d="M17 18 L18.5 19.5 L21.5 16.5" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  schedule: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <defs>
        <linearGradient id="ic4" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#0033aa"/>
        </linearGradient>
      </defs>
      <circle cx="13" cy="14" r="9" stroke="url(#ic4)" strokeWidth="1.4" fill="none"/>
      <line x1="13" y1="14" x2="13" y2="9"  stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="14" x2="17" y2="16" stroke="rgba(0,212,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="13" cy="14" r="1.5" fill="#00d4ff"/>
      <line x1="9"  y1="4" x2="9"  y2="7" stroke="rgba(0,212,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="17" y1="4" x2="17" y2="7" stroke="rgba(0,212,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="5"  y1="14" x2="7"  y2="14" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="19" y1="14" x2="21" y2="14" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  chat: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <defs>
        <linearGradient id="ic5" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#0044cc"/>
        </linearGradient>
      </defs>
      <path d="M4 6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6z" stroke="url(#ic5)" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
      <circle cx="9"  cy="11" r="1.3" fill="#00d4ff"/>
      <circle cx="13" cy="11" r="1.3" fill="#00d4ff" opacity="0.7"/>
      <circle cx="17" cy="11" r="1.3" fill="#00d4ff" opacity="0.4"/>
    </svg>
  ),
  exam: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <defs>
        <linearGradient id="ic6" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#0033bb"/>
        </linearGradient>
      </defs>
      <polygon points="13,2 15.5,9.5 23,9.5 17,14.5 19.5,22 13,17.5 6.5,22 9,14.5 3,9.5 10.5,9.5" stroke="url(#ic6)" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
      <polygon points="13,6 14.5,10.5 19,10.5 15.5,13.5 17,18 13,15 9,18 10.5,13.5 7,10.5 11.5,10.5" fill="rgba(0,212,255,0.12)"/>
      <circle cx="13" cy="12" r="2" fill="url(#ic6)" opacity="0.9"/>
    </svg>
  ),
};

const features = [
  {
    key: "brain",
    number: "01",
    title: "AI-Powered Study Plans",
    desc: "Personalized learning paths that adapt to your strengths, weaknesses, and schedule in real-time.",
    accent: "rgba(0,212,255,0.12)",
  },
  {
    key: "analytics",
    number: "02",
    title: "Performance Analytics",
    desc: "Deep insights into your academic performance with predictive scoring and trend analysis.",
    accent: "rgba(0,100,255,0.1)",
  },
  {
    key: "notes",
    number: "03",
    title: "Smart Note Synthesis",
    desc: "Transform your notes into organized, searchable knowledge bases with AI summarization.",
    accent: "rgba(0,180,255,0.1)",
  },
  {
    key: "schedule",
    number: "04",
    title: "Intelligent Scheduling",
    desc: "Optimal study session timing based on your energy patterns and spaced repetition science.",
    accent: "rgba(0,60,200,0.1)",
  },
  {
    key: "chat",
    number: "05",
    title: "24/7 AI Tutor",
    desc: "Get instant explanations, step-by-step solutions, and concept breakdowns anytime you need.",
    accent: "rgba(0,212,255,0.12)",
  },
  {
    key: "exam",
    number: "06",
    title: "Exam Preparation",
    desc: "AI-generated practice tests, flashcards, and targeted revision strategies for every exam.",
    accent: "rgba(0,80,220,0.1)",
  },
];

function useCardGlow(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width)  * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top)  / r.height) * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
}

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  useCardGlow(ref);

  return (
    <div
      ref={ref}
      className={`fc-card reveal delay-${(index % 3) + 1}`}
      style={{ "--mx": "50%", "--my": "50%", "--accent": feature.accent }}
    >
      {/* Top shimmer line */}
      <div className="fc-shimmer-line" />

      {/* Number + icon row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.4rem" }}>

        {/* Icon container */}
        <div className="fc-icon">
          {ICONS[feature.key]}
        </div>

        {/* Number badge */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem", fontWeight: 700,
          color: "rgba(0,212,255,0.28)",
          letterSpacing: "0.12em",
          lineHeight: 1,
          paddingTop: "3px",
        }}>{feature.number}</span>
      </div>

      {/* Title */}
      <h3 className="fc-title">{feature.title}</h3>

      {/* Desc */}
      <p className="fc-desc">{feature.desc}</p>

      {/* Bottom techy line */}
      <div className="fc-bottom-bar">
        <div className="fc-bottom-bar-fill" />
      </div>

      {/* Corner brackets */}
      <div className="fc-corner fc-tl" />
      <div className="fc-corner fc-br" />

      {/* Mouse-tracking glow overlay */}
      <div className="fc-glow-overlay" />
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal, .fc-card")
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Card base ── */
        .fc-card {
          position: relative; overflow: hidden;
          background: linear-gradient(145deg, rgba(6,18,36,0.95), rgba(3,10,24,0.98));
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 20px;
          padding: 1.8rem 1.7rem 1.6rem;
          transition:
            transform 0.38s cubic-bezier(0.22,1,0.36,1),
            border-color 0.3s ease,
            box-shadow 0.38s ease;
          cursor: default;
        }
        .fc-card:hover {
          transform: translateY(-8px) scale(1.015);
          border-color: rgba(0,212,255,0.35);
          box-shadow:
            0 24px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(0,212,255,0.08),
            0 0 40px rgba(0,212,255,0.07);
        }

        /* top shimmer line */
        .fc-shimmer-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fc-card:hover .fc-shimmer-line { opacity: 1; }

        /* mouse-track glow */
        .fc-glow-overlay {
          position: absolute; inset: 0; pointer-events: none; border-radius: 20px;
          background: radial-gradient(
            circle at var(--mx) var(--my),
            var(--accent, rgba(0,212,255,0.1)) 0%,
            transparent 60%
          );
          opacity: 0; transition: opacity 0.3s;
        }
        .fc-card:hover .fc-glow-overlay { opacity: 1; }

        /* icon */
        .fc-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(145deg, rgba(0,212,255,0.1), rgba(0,60,180,0.08));
          border: 1px solid rgba(0,212,255,0.2);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease, border-color 0.3s, background 0.3s;
          flex-shrink: 0;
        }
        .fc-icon::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
        }
        .fc-card:hover .fc-icon {
          transform: scale(1.12) rotate(-6deg);
          box-shadow: 0 0 24px rgba(0,212,255,0.3), 0 0 48px rgba(0,212,255,0.1);
          border-color: rgba(0,212,255,0.45);
          background: linear-gradient(145deg, rgba(0,212,255,0.16), rgba(0,80,200,0.12));
        }

        /* title */
        .fc-title {
          font-size: 1.02rem; font-weight: 700;
          color: #e8f4ff; font-family: var(--font-body);
          letter-spacing: -0.015em;
          margin-bottom: 0.65rem;
          transition: color 0.25s;
        }
        .fc-card:hover .fc-title { color: #fff; }

        /* desc */
        .fc-desc {
          font-size: 0.83rem; color: rgba(255,255,255,0.38);
          font-family: var(--font-body); line-height: 1.7;
          font-weight: 300; letter-spacing: 0.01em;
          transition: color 0.25s;
        }
        .fc-card:hover .fc-desc { color: rgba(255,255,255,0.55); }

        /* bottom progress bar */
        .fc-bottom-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: rgba(0,212,255,0.04);
          overflow: hidden;
        }
        .fc-bottom-bar-fill {
          height: 100%; width: 0%;
          background: linear-gradient(90deg, #00d4ff, #0055cc);
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .fc-card:hover .fc-bottom-bar-fill { width: 100%; }

        /* corner bracket accents */
        .fc-corner {
          position: absolute; width: 12px; height: 12px;
          border-color: rgba(0,212,255,0.25); border-style: solid;
          opacity: 0; transition: opacity 0.3s;
        }
        .fc-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .fc-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }
        .fc-card:hover .fc-corner { opacity: 1; }
      `}</style>

      <section id="features" ref={sectionRef}
        style={{ padding: "7rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Badge */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span className="glow-badge">Features</span>
        </div>

        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800, fontFamily: "var(--font-body)",
            letterSpacing: "-0.02em", color: "#fff",
            marginBottom: "1rem", lineHeight: 1.15,
          }}>
            Everything You Need to{" "}
            <span style={{ color: "var(--cyan)", textShadow: "0 0 30px rgba(0,212,255,0.4)" }}>Excel</span>
          </h2>
          <p style={{
            fontSize: "0.97rem", color: "var(--text-dim)",
            fontFamily: "var(--font-body)", maxWidth: "460px",
            margin: "0 auto", lineHeight: 1.75, fontWeight: 300,
          }}>
            Our AI analyzes your learning patterns and creates a personalized roadmap to academic success.
          </p>
        </div>

        {/* 3×2 grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.3rem",
        }}>
          {features.map((f, i) => (
            <FeatureCard key={f.key} feature={f} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const sections = ["features", "how-it-works", "ai-demo"];
    const onScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(2,8,16,0.95)" : "rgba(2,8,16,0.75)",
      backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${scrolled ? "rgba(0,212,255,0.14)" : "rgba(0,212,255,0.06)"}`,
      padding: "0 2.5rem", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
    }}>
      {/* Top accent shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
        opacity: scrolled ? 1 : 0.5,
        transition: "opacity 0.4s",
      }} />

      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "11px", cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={e => {
          e.currentTarget.querySelector(".lg-mark").style.transform = "scale(1.1) rotate(3deg)";
          e.currentTarget.querySelector(".lg-mark").style.filter = "drop-shadow(0 0 12px rgba(0,212,255,1)) drop-shadow(0 0 24px rgba(0,212,255,0.5))";
          e.currentTarget.querySelector(".lg-word").style.opacity = "1";
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector(".lg-mark").style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.querySelector(".lg-mark").style.filter = "drop-shadow(0 0 5px rgba(0,212,255,0.5))";
          e.currentTarget.querySelector(".lg-word").style.opacity = "0.95";
        }}
      >
        {/* Abstract geometric mark */}
        <div className="lg-mark" style={{
          width: "40px", height: "40px", flexShrink: 0,
          filter: "drop-shadow(0 0 5px rgba(0,212,255,0.5))",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease",
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#00eeff" />
                <stop offset="100%" stopColor="#0040cc" />
              </linearGradient>
              <linearGradient id="lg2" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.6"/>
              </linearGradient>
              <linearGradient id="lg3" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#0033aa" stopOpacity="0.1"/>
              </linearGradient>
            </defs>

            {/* ── Outer square rotated 45° (diamond frame) ── */}
            <rect x="5" y="5" width="30" height="30" rx="3"
              fill="none"
              stroke="rgba(0,212,255,0.18)"
              strokeWidth="0.8"
              transform="rotate(45 20 20)"
            />

            {/* ── Main upward triangle (large, solid) ── */}
            <polygon
              points="20,4 36,34 4,34"
              fill="url(#lg1)"
              opacity="0.95"
            />

            {/* ── Inverted triangle overlay (cutout feel) ── */}
            <polygon
              points="20,14 30,32 10,32"
              fill="url(#lg3)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.6"
            />

            {/* ── Small accent triangle top ── */}
            <polygon
              points="20,6 25,15 15,15"
              fill="url(#lg2)"
              opacity="0.85"
            />

            {/* ── Horizontal scan line through center ── */}
            <line x1="8" y1="24" x2="32" y2="24"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.7"
              strokeDasharray="2 3"
            />

            {/* ── Circuit corner nodes ── */}
            <circle cx="4"  cy="34" r="1.8" fill="#00d4ff" opacity="0.7"/>
            <circle cx="36" cy="34" r="1.8" fill="#00d4ff" opacity="0.4"/>
            <circle cx="20" cy="4"  r="1.5" fill="white"   opacity="0.9"/>

            {/* ── Short tick lines on base corners ── */}
            <line x1="4"  y1="34" x2="4"  y2="38" stroke="rgba(0,212,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
            <line x1="36" y1="34" x2="36" y2="38" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeLinecap="round"/>

            {/* ── Center apex glow dot ── */}
            <circle cx="20" cy="19" r="2" fill="white" opacity="0.9"/>
            <circle cx="20" cy="19" r="1" fill="#00d4ff"/>
          </svg>
        </div>

        {/* Wordmark */}
        <div className="lg-word" style={{ lineHeight: 1, opacity: 0.95, transition: "opacity 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-body)", fontWeight: 800,
              fontSize: "1.12rem", color: "#fff",
              letterSpacing: "-0.025em",
            }}>Up</span>
            <span style={{
              fontFamily: "var(--font-body)", fontWeight: 800,
              fontSize: "1.12rem", letterSpacing: "-0.025em",
              background: "linear-gradient(90deg, #00d4ff, #66e8ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Learn</span>
          </div>

          {/* Sub-label with flanking lines */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.35))" }}/>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.47rem",
              fontWeight: 700, letterSpacing: "0.28em",
              color: "rgba(0,212,255,0.4)",
              textTransform: "uppercase",
            }}>nexus</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.35))" }}/>
          </div>
        </div>
      </div>

      {/* Nav links — all three equally spaced */}
      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        {[
          { label: "Features",     href: "#features",     id: "features"     },
          { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
          { label: "Live Demo",    href: "#ai-demo",      id: "ai-demo"      },
        ].map((link) => (
          <a key={link.id} href={link.href} className="nav-link" style={{
            color: activeSection === link.id ? "var(--cyan)" : undefined,
          }}>
            {link.label}
            {activeSection === link.id && (
              <span style={{
                position: "absolute", bottom: "-6px", left: "50%",
                transform: "translateX(-50%)",
                width: "4px", height: "4px", borderRadius: "50%",
                background: "var(--cyan)",
                boxShadow: "0 0 6px var(--cyan)",
              }} />
            )}
          </a>
        ))}
      </div>

      {/* Empty right spacer to keep logo/links balanced */}
      <div style={{ width: "110px" }} />
    </nav>
  );
}
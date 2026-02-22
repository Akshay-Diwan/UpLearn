import { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("enter");   // enter → pulse → text → exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase("pulse"),   600);
    const t2 = setTimeout(() => setPhase("text"),    1400);
    const t3 = setTimeout(() => setPhase("exit"),    2800);
    const t4 = setTimeout(() => onComplete?.(),      3500);

    // Progress bar
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) { p = 100; clearInterval(interval); }
      setProgress(Math.min(p, 100));
    }, 120);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes ls-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ls-ping {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ls-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes ls-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes ls-star-twinkle {
          0%,100% { opacity: 0.04; transform: scale(1); }
          50%      { opacity: 0.14; transform: scale(1.5); }
        }
      `}</style>

      {/* Full-screen overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#020810",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.7s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: phase === "exit" ? "none" : "all",
      }}>

        {/* Background stars */}
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 13) % 100}%`,
            top:  `${(i * 53 + 7)  % 100}%`,
            width:  `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            borderRadius: "50%",
            background: i % 9 === 0 ? "#00d4ff" : "#fff",
            animation: `ls-star-twinkle ${3 + (i % 4)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
          }} />
        ))}

        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,100,200,0.12) 0%, transparent 65%)",
          borderRadius: "50%",
          animation: "ls-ping 3s ease-out infinite",
          pointerEvents: "none",
        }} />

        {/* Logo + content */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "32px",
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "scale(0.85)" : "scale(1)",
          transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}>

          {/* Logo icon with spinning ring */}
          <div style={{ position: "relative", width: "90px", height: "90px" }}>

            {/* Outer spinning dashed ring */}
            <svg style={{
              position: "absolute", inset: 0,
              animation: "ls-spin 3s linear infinite",
            }} width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="42"
                stroke="rgba(0,212,255,0.25)"
                strokeWidth="1"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner counter-spin ring */}
            <svg style={{
              position: "absolute", inset: "10px",
              animation: "ls-spin 5s linear infinite reverse",
            }} width="70" height="70" viewBox="0 0 70 70" fill="none">
              <circle cx="35" cy="35" r="32"
                stroke="rgba(0,212,255,0.12)"
                strokeWidth="1"
                strokeDasharray="4 8"
                strokeLinecap="round"
              />
            </svg>

            {/* Ping rings */}
            <div style={{
              position: "absolute", inset: "14px",
              borderRadius: "50%",
              border: "1px solid rgba(0,212,255,0.3)",
              animation: "ls-ping 2s ease-out 0.2s infinite",
            }} />
            <div style={{
              position: "absolute", inset: "14px",
              borderRadius: "50%",
              border: "1px solid rgba(0,212,255,0.15)",
              animation: "ls-ping 2s ease-out 0.9s infinite",
            }} />

            {/* Central logo mark */}
            <div style={{
              position: "absolute", inset: "18px",
              borderRadius: "14px",
              background: "linear-gradient(140deg, #00d4ff, #0040cc)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
            }}>
              {/* Abstract geometric mark — same as Navbar */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <defs>
                  <linearGradient id="ll1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
                    <stop offset="100%" stopColor="rgba(200,240,255,0.8)"/>
                  </linearGradient>
                  <linearGradient id="ll2" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgba(0,212,255,0.4)"/>
                    <stop offset="100%" stopColor="rgba(0,50,180,0.2)"/>
                  </linearGradient>
                </defs>
                {/* Outer diamond frame */}
                <rect x="5" y="5" width="30" height="30" rx="3"
                  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"
                  transform="rotate(45 20 20)"/>
                {/* Main triangle */}
                <polygon points="20,4 36,34 4,34" fill="url(#ll1)" opacity="0.92"/>
                {/* Inner inverted triangle */}
                <polygon points="20,14 30,32 10,32" fill="url(#ll2)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                {/* Top accent triangle */}
                <polygon points="20,6 25,15 15,15" fill="white" opacity="0.8"/>
                {/* Dashed scan line */}
                <line x1="8" y1="24" x2="32" y2="24" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="2 3"/>
                {/* Corner nodes */}
                <circle cx="4"  cy="34" r="1.8" fill="rgba(0,212,255,0.9)"/>
                <circle cx="36" cy="34" r="1.8" fill="rgba(0,212,255,0.5)"/>
                <circle cx="20" cy="4"  r="1.5" fill="white" opacity="0.9"/>
                {/* Center core */}
                <circle cx="20" cy="19" r="2" fill="white" opacity="0.9"/>
                <circle cx="20" cy="19" r="1" fill="#00d4ff"/>
              </svg>
            </div>
          </div>

          {/* Wordmark — fades in during "text" phase */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
            opacity: phase === "text" || phase === "exit" ? 1 : 0,
            transform: phase === "text" || phase === "exit" ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: "2rem", color: "#fff", letterSpacing: "-0.03em",
              }}>Up</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: "2rem", letterSpacing: "-0.03em",
                background: "linear-gradient(90deg, #00d4ff, #66e8ff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Learn</span>
            </div>

            {/* BY NEXUS with flanking lines */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.4))" }}/>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.3em", color: "rgba(0,212,255,0.45)",
                textTransform: "uppercase",
              }}>by nexus</span>
              <div style={{ width: "28px", height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.4))" }}/>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            width: "180px",
            opacity: phase === "text" || phase === "exit" ? 1 : 0,
            transition: "opacity 0.4s ease 0.2s",
          }}>
            {/* Track */}
            <div style={{
              height: "2px", background: "rgba(0,212,255,0.1)",
              borderRadius: "100px", overflow: "hidden",
            }}>
              {/* Fill */}
              <div style={{
                height: "100%", borderRadius: "100px",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0044cc, #00d4ff)",
                transition: "width 0.15s ease",
                boxShadow: "0 0 8px rgba(0,212,255,0.6)",
              }} />
            </div>
            {/* Label */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginTop: "8px",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem", color: "rgba(0,212,255,0.35)",
                letterSpacing: "0.1em",
              }}>INITIALIZING</span>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem", color: "rgba(0,212,255,0.5)",
                letterSpacing: "0.05em",
              }}>{Math.round(progress)}%</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
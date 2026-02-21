export function QuizContainer({ children, title }: { children: React.ReactElement, title: string }) {
  return (
    <main style={{
      minHeight: "100vh", width: "100vw", maxWidth: "100%",
      overflow: "hidden",
      background: "#020810",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "3rem 1rem", margin: 0,
      position: "relative",
    }}>

      {/* Background glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", left: "20%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(0,100,200,0.1) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "15%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        {/* Stars */}
        {[...Array(40)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            background: i % 7 === 0 ? "#00d4ff" : "#fff",
            borderRadius: "50%",
            opacity: ((i % 5) + 1) * 0.07,
          }} />
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: "672px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <header style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "9px",
              background: "linear-gradient(135deg, #00d4ff, #0055cc)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(0,212,255,0.4)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
              }} />
              <svg style={{ width: "16px", height: "16px", color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span style={{
              fontSize: "1rem", fontWeight: 700,
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
            }}>{title}</span>
          </div>
          <p style={{
            color: "rgba(255,255,255,0.35)", fontSize: "0.82rem",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Test your knowledge, one question at a time.
          </p>
        </header>

        {/* Card */}
        <div style={{
          background: "rgba(4,13,26,0.85)",
          borderRadius: "20px",
          border: "1px solid rgba(0,212,255,0.15)",
          padding: "2rem",
          backdropFilter: "blur(20px)",
          position: "relative", overflow: "hidden",
          boxShadow: "0 0 40px rgba(0,212,255,0.05)",
        }}>
          {/* Top shimmer line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
          }} />

          {children}
        </div>

      </div>
    </main>
  );
}
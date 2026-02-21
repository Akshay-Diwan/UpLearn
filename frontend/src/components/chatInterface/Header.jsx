export default function Header() {
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
        {["Dashboard", "Progress", "Sessions"].map(item => (
          <a key={item} href="#" className="nav-link">{item}</a>
        ))}
        <div style={{ width: "1px", height: "20px", background: "rgba(0,212,255,0.15)" }} />
        <button style={{
          background: "linear-gradient(135deg, #00d4ff, #0055cc)",
          border: "none", borderRadius: "10px", padding: "8px 18px",
          color: "#fff", fontSize: "0.78rem", fontWeight: "600",
          fontFamily: "var(--font-body)", cursor: "pointer",
          boxShadow: "0 0 20px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          letterSpacing: "0.02em",
        }}>Generate FlowChart</button>
      </nav>
    </header>
  );
}
import type { Question } from '../../types/interface'

const InstructionCard = ({ question }: { question: Question }) => {
  return (
    <section
      aria-label="Question card"
      style={{
        background: "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,85,204,0.05))",
        border: "1px solid rgba(0,212,255,0.18)",
        borderRadius: "16px",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top shimmer line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
      }} />

      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "15%", bottom: "15%", width: "2px",
        background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.6), transparent)",
        borderRadius: "2px",
      }} />

      {/* "Question" label */}
      <p style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "#00d4ff",
        fontFamily: "'Space Mono', monospace",
        marginBottom: "0.75rem",
        marginLeft: "0.5rem",
      }}>
        📋 Instruction
      </p>

      {/* Question text */}
      <h2 style={{
        fontSize: "1.05rem",
        fontWeight: 500,
        color: "rgba(255,255,255,0.88)",
        lineHeight: 1.7,
        fontFamily: "'DM Sans', sans-serif",
        marginLeft: "0.5rem",
        marginBottom: 0,
      }}>
        {question.question}
      </h2>
    </section>
  )
}

export default InstructionCard


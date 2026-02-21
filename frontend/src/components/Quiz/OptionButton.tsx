interface OptionButtonProps {
  option: string,
  index: number,
  isSelected: boolean
  onSelect: (option: string) => void
}

export function OptionButton({ option, index, isSelected, onSelect }: OptionButtonProps) {
  const labels = ["A", "B", "C", "D"];
  return (
    <button
      onClick={() => onSelect(option)}
      aria-pressed={isSelected}
      style={{
        width: "100%", textAlign: "left",
        display: "flex", alignItems: "center", gap: "16px",
        padding: "14px 20px", borderRadius: "12px",
        border: isSelected ? "1px solid rgba(0,212,255,0.55)" : "1px solid rgba(255,255,255,0.07)",
        background: isSelected
          ? "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,85,204,0.08))"
          : "rgba(255,255,255,0.025)",
        boxShadow: isSelected ? "0 0 16px rgba(0,212,255,0.15)" : "none",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.border = "1px solid rgba(0,212,255,0.3)";
          e.currentTarget.style.background = "rgba(0,212,255,0.05)";
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
          e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        }
      }}
    >
      {/* Top shimmer line when selected */}
      {isSelected && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
        }} />
      )}

      {/* Label badge A/B/C/D */}
      <span style={{
        flexShrink: 0,
        width: "32px", height: "32px", borderRadius: "8px",
        fontSize: "0.8rem", fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Mono', monospace",
        background: isSelected
          ? "linear-gradient(135deg, #00d4ff, #0055cc)"
          : "rgba(255,255,255,0.06)",
        color: isSelected ? "#fff" : "rgba(255,255,255,0.45)",
        boxShadow: isSelected ? "0 0 12px rgba(0,212,255,0.4)" : "none",
        transition: "all 0.2s",
      }}>
        {labels[index]}
      </span>

      {/* Option text */}
      <span style={{
        fontSize: "0.9rem",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: isSelected ? 500 : 400,
        color: isSelected ? "#fff" : "rgba(255,255,255,0.65)",
        transition: "color 0.2s",
      }}>
        {option}
      </span>
    </button>
  );
}
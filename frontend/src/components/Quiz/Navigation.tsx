export function NavigationButtons(
    { isFirst, isLast, canProceed, onPrev, onNext, onSubmit }:
    {isFirst: boolean, isLast: boolean, canProceed: boolean, onPrev: () => void, onNext: () => void , onSubmit: ()=> void}
) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginTop: "2.5rem", paddingTop: "1.5rem",
      borderTop: "1px solid rgba(0,212,255,0.12)",
    }}>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 20px", borderRadius: "12px",
          fontSize: "0.85rem", fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          border: isFirst ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,212,255,0.2)",
          background: isFirst ? "transparent" : "rgba(0,212,255,0.06)",
          color: isFirst ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
          cursor: isFirst ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { if (!isFirst) { e.currentTarget.style.background = "rgba(0,212,255,0.12)"; e.currentTarget.style.color = "#fff"; }}}
        onMouseLeave={e => { if (!isFirst) { e.currentTarget.style.background = "rgba(0,212,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Next / Submit Button */}
      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={!canProceed}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", borderRadius: "12px",
            fontSize: "0.85rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            border: "none",
            background: canProceed
              ? "linear-gradient(135deg, #00d4ff, #0055cc)"
              : "rgba(255,255,255,0.06)",
            color: canProceed ? "#fff" : "rgba(255,255,255,0.25)",
            cursor: canProceed ? "pointer" : "not-allowed",
            boxShadow: canProceed ? "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (canProceed) e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          onMouseLeave={e => { if (canProceed) e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
        >
          Submit Quiz
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", borderRadius: "12px",
            fontSize: "0.85rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            border: "none",
            background: canProceed
              ? "linear-gradient(135deg, #00d4ff, #0055cc)"
              : "rgba(255,255,255,0.06)",
            color: canProceed ? "#fff" : "rgba(255,255,255,0.25)",
            cursor: canProceed ? "pointer" : "not-allowed",
            boxShadow: canProceed ? "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (canProceed) e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          onMouseLeave={e => { if (canProceed) e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

    </div>
  );
}

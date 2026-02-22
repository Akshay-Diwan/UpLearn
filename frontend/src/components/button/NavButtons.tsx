import { Link } from "react-router-dom"

const NavButton = () => {
  return (
    <Link to="/dashboard">
             <button
        //   onClick={onSubmit}
        //   disabled={!canProceed}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", borderRadius: "12px",
            fontSize: "0.85rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            border: "none",
            background: "linear-gradient(135deg, #00d4ff, #0055cc)",
            color: "#fff" ,
            cursor:  "pointer" ,
            boxShadow: "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            transition: "all 0.2s",
          }}
        //   onMouseEnter={e => { if (canProceed) e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
        //   onMouseLeave={e => { if (canProceed) e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
        >
          Start Studying
          {/* <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg> */}
        </button>
      </Link>
  )
}

export default NavButton

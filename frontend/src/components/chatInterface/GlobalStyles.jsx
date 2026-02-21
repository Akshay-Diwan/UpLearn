export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --cyan: #00d4ff;
        --cyan-dim: rgba(0,212,255,0.15);
        --cyan-glow: rgba(0,212,255,0.35);
        --blue: #0066ff;
        --dark: #020810;
        --dark2: #040d1a;
        --panel: rgba(4,13,26,0.85);
        --border: rgba(0,212,255,0.12);
        --border-bright: rgba(0,212,255,0.4);
        --text: rgba(255,255,255,0.88);
        --text-dim: rgba(255,255,255,0.4);
        --font-mono: 'Space Mono', monospace;
        --font-body: 'DM Sans', sans-serif;
      }

      body { background: var(--dark); color: var(--text); font-family: var(--font-body); }

      ::-webkit-scrollbar { width: 3px; height: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(0,212,255,0.6); }

      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 8px rgba(0,212,255,0.3), 0 0 20px rgba(0,212,255,0.1); }
        50% { box-shadow: 0 0 16px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.2); }
      }
      @keyframes bounce-dot {
        0%, 80%, 100% { transform: translateY(0) scale(0.8); opacity: 0.3; }
        40% { transform: translateY(-8px) scale(1); opacity: 1; }
      }
      @keyframes slide-in-left {
        from { opacity: 0; transform: translateX(-12px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slide-in-right {
        from { opacity: 0; transform: translateX(12px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }

      .msg-ai  { animation: slide-in-left  0.3s ease forwards; }
      .msg-user { animation: slide-in-right 0.3s ease forwards; }
      .fade-up  { animation: fade-up 0.4s ease forwards; }

      textarea::placeholder { color: rgba(255,255,255,0.28); }
      textarea { scrollbar-width: none; }
      textarea::-webkit-scrollbar { display: none; }

      .nav-link {
        color: var(--text-dim); text-decoration: none; font-size: 0.8rem;
        font-family: var(--font-body); font-weight: 500; letter-spacing: 0.02em;
        padding: 6px 2px; position: relative; transition: color 0.2s;
      }
      .nav-link::after {
        content: ''; position: absolute; bottom: 0; left: 0; right: 0;
        height: 1px; background: var(--cyan); transform: scaleX(0);
        transition: transform 0.2s; transform-origin: left;
      }
      .nav-link:hover { color: var(--cyan); }
      .nav-link:hover::after { transform: scaleX(1); }

      .pdf-card:hover {
        background: rgba(0,212,255,0.08) !important;
        border-color: rgba(0,212,255,0.35) !important;
        transform: translateX(3px);
      }
      .pdf-card { transition: all 0.2s ease !important; }

      .prompt-btn:hover {
        background: rgba(0,212,255,0.1) !important;
        border-color: rgba(0,212,255,0.35) !important;
        color: #fff !important;
        transform: translateX(4px);
      }
      .prompt-btn { transition: all 0.2s ease !important; }

      .send-btn:hover  { transform: scale(1.08); }
      .send-btn        { transition: all 0.2s ease !important; }

      .attach-btn:hover { background: rgba(0,212,255,0.2) !important; transform: scale(1.05); }
      .attach-btn       { transition: all 0.2s ease !important; }

      .glow-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }
      .float      { animation: float 3s ease-in-out infinite; }
    `}</style>
  );
}

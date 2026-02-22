export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --cyan: #00d4ff;
        --cyan-glow: rgba(0,212,255,0.35);
        --blue: #0066ff;
        --dark: #020810;
        --panel: rgba(4,13,26,0.85);
        --border: rgba(0,212,255,0.12);
        --text: rgba(255,255,255,0.88);
        --text-dim: rgba(255,255,255,0.45);
        --font-mono: 'Space Mono', monospace;
        --font-body: 'DM Sans', sans-serif;
      }

      html { scroll-behavior: smooth; }
      body { background: var(--dark); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 10px; }

      /* ── Core animations ── */
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes fade-left {
        from { opacity: 0; transform: translateX(-28px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes fade-right {
        from { opacity: 0; transform: translateX(28px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes scale-in {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse-glow {
        0%,100% { box-shadow: 0 0 8px rgba(0,212,255,0.3), 0 0 20px rgba(0,212,255,0.1); }
        50%      { box-shadow: 0 0 22px rgba(0,212,255,0.7), 0 0 45px rgba(0,212,255,0.25); }
      }
      @keyframes float {
        0%,100% { transform: translateY(0px) rotate(0deg); }
        33%      { transform: translateY(-8px) rotate(1deg); }
        66%      { transform: translateY(-4px) rotate(-1deg); }
      }
      @keyframes scan {
        0%   { transform: translateY(-100vh); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
      @keyframes scroll-bounce {
        0%,100% { transform: translateY(0); opacity: 1; }
        50%      { transform: translateY(8px); opacity: 0.3; }
      }
      @keyframes star-twinkle {
        0%,100% { opacity: var(--star-opacity); transform: scale(1); }
        50%      { opacity: calc(var(--star-opacity) * 3); transform: scale(1.4); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes border-flow {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes typing-cursor {
        0%,100% { opacity: 1; }
        50%      { opacity: 0; }
      }
      @keyframes message-in {
        from { opacity: 0; transform: translateY(10px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes progress-fill {
        from { width: 0%; }
        to   { width: var(--target-width); }
      }
      @keyframes icon-bounce {
        0%,100% { transform: scale(1); }
        40%      { transform: scale(1.18); }
        60%      { transform: scale(0.95); }
      }
      @keyframes line-grow {
        from { scaleY: 0; }
        to   { scaleY: 1; }
      }
      @keyframes glow-breathe {
        0%,100% { opacity: 0.4; }
        50%      { opacity: 0.9; }
      }
      @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      /* ── Utility animation classes ── */
      .fade-up-1 { animation: fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
      .fade-up-2 { animation: fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s  both; }
      .fade-up-3 { animation: fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
      .fade-up-4 { animation: fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.5s  both; }
      .fade-up-5 { animation: fade-up 0.75s cubic-bezier(0.22,1,0.36,1) 0.65s both; }

      .glow-pulse  { animation: pulse-glow 2.5s ease-in-out infinite; }
      .float-anim  { animation: float 5s ease-in-out infinite; }

      /* ── Scroll-reveal base ── */
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                    transform 0.7s cubic-bezier(0.22,1,0.36,1);
      }
      .reveal.visible        { opacity: 1; transform: translateY(0); }
      .reveal-left {
        opacity: 0; transform: translateX(-28px);
        transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                    transform 0.7s cubic-bezier(0.22,1,0.36,1);
      }
      .reveal-left.visible   { opacity: 1; transform: translateX(0); }
      .reveal-right {
        opacity: 0; transform: translateX(28px);
        transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                    transform 0.7s cubic-bezier(0.22,1,0.36,1);
      }
      .reveal-right.visible  { opacity: 1; transform: translateX(0); }
      .reveal-scale {
        opacity: 0; transform: scale(0.9);
        transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1),
                    transform 0.6s cubic-bezier(0.22,1,0.36,1);
      }
      .reveal-scale.visible  { opacity: 1; transform: scale(1); }

      .delay-1 { transition-delay: 0.08s !important; }
      .delay-2 { transition-delay: 0.16s !important; }
      .delay-3 { transition-delay: 0.24s !important; }
      .delay-4 { transition-delay: 0.32s !important; }
      .delay-5 { transition-delay: 0.40s !important; }
      .delay-6 { transition-delay: 0.48s !important; }

      /* ── Navbar ── */
      .nav-link {
        color: rgba(255,255,255,0.5); text-decoration: none;
        font-size: 0.88rem; font-family: var(--font-body); font-weight: 500;
        padding: 6px 2px; position: relative; transition: color 0.25s ease;
      }
      .nav-link::after {
        content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
        height: 1px; background: var(--cyan);
        transform: scaleX(0); transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        transform-origin: left;
      }
      .nav-link:hover { color: var(--cyan); }
      .nav-link:hover::after { transform: scaleX(1); }

      .nav-cta-btn {
        display: flex; align-items: center; gap: 7px;
        padding: 9px 20px; border-radius: 10px;
        background: linear-gradient(135deg, #00d4ff, #0055cc);
        border: none; color: #fff;
        font-size: 0.82rem; font-weight: 700;
        font-family: var(--font-body); cursor: pointer;
        box-shadow: 0 0 20px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
        letter-spacing: 0.01em;
        transition: transform 0.2s cubic-bezier(0.22,1,0.36,1),
                    box-shadow 0.2s ease, opacity 0.2s;
      }
      .nav-cta-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 32px rgba(0,212,255,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
      }
      .nav-cta-btn:active { transform: translateY(0); }

      /* ── Feature cards ── */
      .feature-card {
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 16px; padding: 1.75rem;
        transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                    background 0.3s ease, border-color 0.3s ease,
                    box-shadow 0.35s ease;
        position: relative; overflow: hidden; cursor: default;
      }
      .feature-card::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(0,212,255,0), transparent);
        transition: background 0.4s ease;
      }
      .feature-card::after {
        content: ''; position: absolute; inset: 0; border-radius: 16px;
        background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,212,255,0.06) 0%, transparent 60%);
        opacity: 0; transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .feature-card:hover {
        background: rgba(0,212,255,0.05);
        border-color: rgba(0,212,255,0.28);
        transform: translateY(-6px);
        box-shadow: 0 20px 50px rgba(0,212,255,0.1);
      }
      .feature-card:hover::before {
        background: linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent);
      }
      .feature-card:hover::after { opacity: 1; }

      .feature-icon-wrap {
        width: 46px; height: 46px; border-radius: 12px;
        background: rgba(0,212,255,0.08);
        border: 1px solid rgba(0,212,255,0.18);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.35rem; margin-bottom: 1.1rem;
        box-shadow: 0 0 16px rgba(0,212,255,0.1);
        transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                    box-shadow 0.3s ease, background 0.3s ease;
      }
      .feature-card:hover .feature-icon-wrap {
        transform: scale(1.12) rotate(-4deg);
        box-shadow: 0 0 28px rgba(0,212,255,0.28);
        background: rgba(0,212,255,0.14);
        animation: icon-bounce 0.4s ease;
      }

      /* ── Step cards (HowItWorks) ── */
      .step-icon-wrap {
        flexShrink: 0; z-index: 2;
        width: 64px; height: 64px; border-radius: 16px;
        background: rgba(4,13,26,0.95);
        border: 1px solid rgba(0,212,255,0.25);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 0 0 rgba(0,212,255,0);
        transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                    box-shadow 0.35s ease, border-color 0.3s;
        cursor: default;
      }
      .step-icon-wrap:hover {
        transform: scale(1.15) rotate(6deg);
        box-shadow: 0 0 32px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.15);
        border-color: rgba(0,212,255,0.7);
      }

      /* ── Chat ── */
      .chat-message { animation: message-in 0.45s cubic-bezier(0.22,1,0.36,1) both; }

      .chat-input-wrap {
        flex: 1; background: transparent; border: none; outline: none;
        color: #fff; font-size: 0.85rem; font-family: var(--font-body);
        transition: opacity 0.2s;
      }

      .chat-send-btn {
        width: 38px; height: 38px; border-radius: 10px;
        background: linear-gradient(135deg, #00d4ff, #0055cc);
        border: none; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 14px rgba(0,212,255,0.35);
        font-size: 1rem;
        transition: transform 0.2s cubic-bezier(0.22,1,0.36,1),
                    box-shadow 0.2s ease;
      }
      .chat-send-btn:hover {
        transform: scale(1.1) rotate(-8deg);
        box-shadow: 0 0 26px rgba(0,212,255,0.6);
      }
      .chat-send-btn:active { transform: scale(0.95); }

      /* ── Shimmer text ── */
      .shimmer-text {
        background: linear-gradient(
          90deg,
          var(--cyan) 0%,
          #fff 40%,
          var(--cyan) 60%,
          var(--cyan) 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 3s linear infinite;
      }

      /* ── Glow badge ── */
      .glow-badge {
        display: inline-block; padding: 6px 18px; border-radius: 999px;
        background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.25);
        font-size: 0.78rem; font-weight: 600; color: var(--cyan);
        font-family: var(--font-body); letter-spacing: 0.04em;
        position: relative; overflow: hidden;
        transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
      }
      .glow-badge:hover {
        background: rgba(0,212,255,0.14);
        border-color: rgba(0,212,255,0.5);
        box-shadow: 0 0 20px rgba(0,212,255,0.2);
      }
      .glow-badge::after {
        content: '';
        position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        animation: shimmer 2.5s ease-in-out infinite;
      }
    `}</style>
  );
}
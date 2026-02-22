import { useEffect, useRef } from "react";

const STARS = Array.from({ length: 90 }, (_, i) => ({
  left:            `${(i * 37 + 13) % 100}%`,
  top:             `${(i * 53 + 7)  % 100}%`,
  size:            (i % 3) + 1,
  color:           i % 9 === 0 ? "#00d4ff" : i % 5 === 0 ? "#a78bfa" : "#fff",
  opacity:         ((i % 5) + 1) * 0.05,
  twinkleDuration: `${3 + (i % 5)}s`,
  twinkleDelay:    `${(i % 9) * 0.35}s`,
}));

const SHOOTING_STARS = Array.from({ length: 6 }, (_, i) => ({
  top:      `${8 + i * 14}%`,
  delay:    `${i * 3.2}s`,
  duration: `${2.4 + (i % 3) * 0.6}s`,
  width:    `${80 + (i % 3) * 40}px`,
}));

const ORBS = [
  { top: "-18%",  left: "18%",   w: 820, h: 820, color: "rgba(0,100,200,0.11)",  duration: "20s", delay: "0s"   },
  { top: "28%",   right: "-6%",  w: 580, h: 580, color: "rgba(0,55,180,0.08)",   duration: "26s", delay: "-9s"  },
  { bottom:"-12%",left: "28%",   w: 660, h: 460, color: "rgba(0,45,150,0.07)",   duration: "30s", delay: "-16s" },
  { top: "8%",    right: "12%",  w: 320, h: 320, color: "rgba(0,212,255,0.045)", duration: "14s", delay: "-4s"  },
  { top: "55%",   left: "2%",    w: 260, h: 260, color: "rgba(0,80,200,0.07)",   duration: "18s", delay: "-7s"  },
];

const RINGS = [
  { top: "20%", left: "75%", size: 180, duration: "12s", delay: "0s",  opacity: 0.07 },
  { top: "60%", left: "15%", size: 240, duration: "16s", delay: "-5s", opacity: 0.05 },
  { top: "80%", left: "60%", size: 140, duration: "10s", delay: "-3s", opacity: 0.06 },
];

const DOTS = Array.from({ length: 18 }, (_, i) => ({
  left:     `${(i * 41 + 7) % 95 + 2}%`,
  top:      `${(i * 29 + 11) % 90 + 5}%`,
  size:     2 + (i % 2),
  duration: `${6 + (i % 5) * 2}s`,
  delay:    `${(i % 7) * 0.9}s`,
  opacity:  0.12 + (i % 4) * 0.04,
}));

const HEXAGONS = Array.from({ length: 8 }, (_, i) => ({
  left:     `${10 + (i % 4) * 25}%`,
  top:      `${15 + Math.floor(i / 4) * 50}%`,
  size:     30 + (i % 3) * 10,
  duration: `${8 + i * 1.5}s`,
  delay:    `${i * 0.7}s`,
  opacity:  0.04 + (i % 3) * 0.015,
}));

export default function Background() {
  const canvasRef = useRef(null);

  // Animated particle network on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 38 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r:  Math.random() * 1.4 + 0.4,
    }));

    const CONNECT_DIST = 155;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.11;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,180,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,200,255,0.16)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes orb-drift {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(18px, -22px) scale(1.04); }
          66%      { transform: translate(-12px, 14px) scale(0.97); }
        }
        @keyframes ring-pulse {
          0%,100% { transform: translate(-50%,-50%) scale(0.88); opacity: var(--rop); }
          50%      { transform: translate(-50%,-50%) scale(1.14); opacity: calc(var(--rop) * 0.35); }
        }
        @keyframes dot-float {
          0%,100% { transform: translateY(0px);   opacity: var(--dop); }
          50%      { transform: translateY(-13px); opacity: calc(var(--dop) * 0.4); }
        }
        @keyframes shoot {
          0%   { transform: translateX(-140px) translateY(0); opacity: 0; }
          6%   { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translateX(115vw) translateY(55px); opacity: 0; }
        }
        @keyframes hex-rotate {
          from { transform: translate(-50%,-50%) rotate(0deg);   }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes hex-glow {
          0%,100% { opacity: var(--hop); }
          50%      { opacity: calc(var(--hop) * 3); }
        }
        @keyframes grid-pan {
          0%   { background-position: 0px 0px; }
          100% { background-position: 60px 60px; }
        }
        @keyframes h-sweep {
          0%   { transform: translateX(-110%); opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:1; }
          100% { transform: translateX(110%);  opacity:0; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>

        {/* Particle network */}
        <canvas ref={canvasRef} style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", opacity: 0.5,
        }} />

        {/* Ambient orbs */}
        {ORBS.map((o, i) => (
          <div key={`orb-${i}`} style={{
            position: "absolute",
            ...(o.top    ? { top:    o.top    } : {}),
            ...(o.bottom ? { bottom: o.bottom } : {}),
            ...(o.left   ? { left:   o.left   } : {}),
            ...(o.right  ? { right:  o.right  } : {}),
            width: `${o.w}px`, height: `${o.h}px`,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 65%)`,
            borderRadius: "50%",
            animation: `orb-drift ${o.duration} ease-in-out ${o.delay} infinite`,
          }} />
        ))}

        {/* Pulsing rings */}
        {RINGS.map((r, i) => (
          <div key={`ring-${i}`} style={{
            position: "absolute",
            left: r.left, top: r.top,
            width: `${r.size}px`, height: `${r.size}px`,
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "50%",
            "--rop": r.opacity,
            animation: `ring-pulse ${r.duration} ease-in-out ${r.delay} infinite`,
          }}>
            <div style={{
              position: "absolute", inset: "22%",
              border: "1px solid rgba(0,212,255,0.1)",
              borderRadius: "50%",
              animation: `ring-pulse ${r.duration} ease-in-out calc(${r.delay} - 1.5s) infinite`,
              "--rop": r.opacity * 0.7,
            }} />
          </div>
        ))}

        {/* Hexagon wireframes */}
        {HEXAGONS.map((h, i) => (
          <div key={`hex-${i}`} style={{
            position: "absolute",
            left: h.left, top: h.top,
            width: `${h.size}px`, height: `${h.size}px`,
            border: "1px solid rgba(0,212,255,0.18)",
            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            "--hop": h.opacity,
            animation: `hex-rotate ${h.duration} linear ${h.delay} infinite, hex-glow ${parseFloat(h.duration) * 0.7}s ease-in-out ${h.delay} infinite`,
          }} />
        ))}

        {/* Floating dots */}
        {DOTS.map((d, i) => (
          <div key={`dot-${i}`} style={{
            position: "absolute",
            left: d.left, top: d.top,
            width: `${d.size}px`, height: `${d.size}px`,
            borderRadius: "50%",
            background: i % 3 === 0
              ? "rgba(0,212,255,0.55)"
              : i % 2 === 0
              ? "rgba(100,150,255,0.45)"
              : "rgba(255,255,255,0.3)",
            "--dop": d.opacity,
            animation: `dot-float ${d.duration} ease-in-out ${d.delay} infinite`,
            filter: "blur(0.4px)",
          }} />
        ))}

        {/* Shooting stars */}
        {SHOOTING_STARS.map((s, i) => (
          <div key={`shoot-${i}`} style={{
            position: "absolute",
            top: s.top, left: 0,
            width: `${s.width}px`, height: "1.5px",
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.7), rgba(255,255,255,0.95), transparent)",
            animation: `shoot ${s.duration} linear ${s.delay} infinite`,
            filter: "blur(0.4px)",
            borderRadius: "2px",
          }} />
        ))}

        {/* Animated grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "grid-pan 14s linear infinite",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)",
        }} />

        {/* Twinkling stars */}
        {STARS.map((s, i) => (
          <div key={`star-${i}`} style={{
            position: "absolute",
            left: s.left, top: s.top,
            width: `${s.size}px`, height: `${s.size}px`,
            background: s.color,
            borderRadius: "50%",
            "--star-opacity": s.opacity,
            animation: `star-twinkle ${s.twinkleDuration} ease-in-out ${s.twinkleDelay} infinite`,
          }} />
        ))}

        {/* Horizontal sweep lines */}
        {[18, 52, 78].map((pct, i) => (
          <div key={`sweep-${i}`} style={{
            position: "absolute", top: `${pct}%`, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.07), rgba(0,212,255,0.12), rgba(0,212,255,0.07), transparent)",
            animation: `h-sweep ${16 + i * 5}s linear ${i * 6}s infinite`,
          }} />
        ))}

        {/* Vertical scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.04), rgba(0,212,255,0.09), rgba(0,212,255,0.04), transparent)",
          animation: "scan 20s linear infinite",
          filter: "blur(1px)",
        }} />

        {/* Vignette — keeps edges dark */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(2,8,16,0.75) 100%)",
        }} />

      </div>
    </>
  );
}
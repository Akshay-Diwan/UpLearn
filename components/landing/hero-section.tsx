"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Lightbulb,
  Target,
  Award,
  BrainCircuit,
  Atom,
  ArrowRight,
} from "lucide-react";

const floatingIcons = [
  { Icon: BookOpen, delay: 0, x: "8%", y: "22%" },
  { Icon: GraduationCap, delay: 0.8, x: "88%", y: "18%" },
  { Icon: TrendingUp, delay: 1.6, x: "78%", y: "72%" },
  { Icon: Lightbulb, delay: 0.4, x: "12%", y: "74%" },
  { Icon: Target, delay: 1.2, x: "92%", y: "48%" },
  { Icon: Award, delay: 2, x: "4%", y: "48%" },
  { Icon: BrainCircuit, delay: 0.6, x: "20%", y: "35%" },
  { Icon: Atom, delay: 1.4, x: "80%", y: "35%" },
];

const typingTexts = [
  "improve your grades",
  "master any subject",
  "ace your exams",
  "build study habits",
  "unlock your potential",
];

/* ---------- small exhaust spark ---------- */
function ExhaustSpark({ delay, offsetX }: { delay: number; offsetX: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/60"
      style={{
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: `calc(50% + ${offsetX}px)`,
        bottom: "-8px",
      }}
      initial={{ opacity: 0.9, y: 0, scale: 1 }}
      animate={{
        opacity: [0.9, 0.4, 0],
        y: [0, 40 + Math.random() * 60],
        x: [0, offsetX * 1.5],
        scale: [1, 0.3],
      }}
      transition={{
        duration: 0.6 + Math.random() * 0.4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 0.3,
        ease: "easeOut",
      }}
    />
  );
}

interface HeroSectionProps {
  onLogoLanded: () => void;
}

export function HeroSection({ onLogoLanded }: HeroSectionProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phase, setPhase] = useState<
    "idle" | "reveal" | "hover" | "launch" | "fly" | "landed"
  >("idle");
  const [contentVisible, setContentVisible] = useState(false);
  const [showTrail, setShowTrail] = useState(false);
  const logoControls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  // typing effect
  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) setCharIndex((c) => c + 1);
          else setTimeout(() => setIsDeleting(true), 1500);
        } else {
          if (charIndex > 0) setCharIndex((c) => c - 1);
          else {
            setIsDeleting(false);
            setTextIndex((t) => (t + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  /* ---- rocket-style launch sequence ---- */
  const runSequence = useCallback(async () => {
    // 1. fade in at center
    setPhase("reveal");
    await logoControls.start({
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 160, damping: 14, delay: 0.2 },
    });

    // 2. hover / rumble
    setPhase("hover");
    setShowTrail(true);
    await logoControls.start({
      y: [0, -6, 2, -8, 4, -3, 0],
      transition: { duration: 1.2, ease: "easeInOut" },
    });

    // 3. launch straight up first
    setPhase("launch");
    await logoControls.start({
      y: -180,
      scale: 0.7,
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    });

    // 4. arc into the top-left corner
    setPhase("fly");
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetX = -(vw / 2) + 52;
    const targetY = -(vh * 0.42) + 34;

    await logoControls.start({
      x: targetX,
      y: targetY,
      scale: 0.32,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    // 5. disappear & signal navbar
    setShowTrail(false);
    await logoControls.start({
      opacity: 0,
      transition: { duration: 0.12 },
    });

    setPhase("landed");
    onLogoLanded();
    setContentVisible(true);
  }, [logoControls, onLogoLanded]);

  useEffect(() => {
    runSequence();
  }, [runSequence]);

  const isMoving = phase === "launch" || phase === "fly";

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* -------- ambient orbs -------- */}
      <motion.div
        className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]"
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 60, 0], scale: [1, 1.3, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]"
        animate={{ x: [0, -80, 60, 0], y: [0, 60, -80, 0], scale: [1, 0.8, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]"
        animate={{ x: [0, 40, -60, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* -------- floating icons -------- */}
      {floatingIcons.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={contentVisible ? { opacity: 0.12, scale: 1 } : {}}
          transition={{ delay: delay * 0.3, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-8 w-8 text-primary lg:h-10 lg:w-10" />
          </motion.div>
        </motion.div>
      ))}

      {/* ======== ROCKET LOGO ======== */}
      {phase !== "landed" && (
        <motion.div
          className="absolute left-1/2 top-[42%] z-50 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={logoControls}
        >
          {/* exhaust trail (visible during hover & launch) */}
          {showTrail && (
            <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2">
              {/* main flame */}
              <motion.div
                className="relative mx-auto w-5 origin-top"
                animate={
                  isMoving
                    ? { scaleY: [1, 2.4, 1.6], opacity: [0.9, 1, 0.8] }
                    : { scaleY: [0.5, 0.9, 0.5], opacity: [0.4, 0.7, 0.4] }
                }
                transition={{ duration: isMoving ? 0.15 : 0.4, repeat: Infinity }}
              >
                <div className="mx-auto h-16 w-3 rounded-b-full bg-gradient-to-b from-primary via-primary/60 to-transparent blur-[2px]" />
                <div className="mx-auto -mt-14 h-12 w-1.5 rounded-b-full bg-gradient-to-b from-primary-foreground/80 via-primary/40 to-transparent" />
              </motion.div>

              {/* sparks */}
              {Array.from({ length: 10 }).map((_, i) => (
                <ExhaustSpark key={i} delay={i * 0.08} offsetX={(Math.random() - 0.5) * 24} />
              ))}
            </div>
          )}

          {/* orbiting ring (only while centered) */}
          <motion.div
            className="absolute h-[280px] w-[280px] rounded-full border border-primary/10"
            style={{ left: "-140px", top: "-140px" }}
            animate={
              phase === "reveal" || phase === "hover"
                ? { rotate: -360, opacity: 1 }
                : { opacity: 0, scale: 0.3 }
            }
            transition={
              phase === "reveal" || phase === "hover"
                ? { rotate: { duration: 30, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }
                : { duration: 0.3 }
            }
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary/40" />
            <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent/30" />
          </motion.div>

          {/* outer ring */}
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full border border-primary/5"
            style={{ left: "-200px", top: "-200px" }}
            animate={
              phase === "reveal" || phase === "hover"
                ? { rotate: 360, opacity: 1 }
                : { opacity: 0, scale: 0.3 }
            }
            transition={
              phase === "reveal" || phase === "hover"
                ? { rotate: { duration: 50, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }
                : { duration: 0.3 }
            }
          >
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary/20" />
          </motion.div>

          {/* pulsing glow */}
          <motion.div
            className="absolute h-36 w-36 rounded-full bg-primary/20 blur-2xl"
            style={{ left: "-72px", top: "-72px" }}
            animate={
              phase === "reveal" || phase === "hover"
                ? { scale: [1, 1.8, 1], opacity: [0.3, 0.6, 0.3] }
                : { opacity: 0 }
            }
            transition={
              phase === "reveal" || phase === "hover"
                ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.25 }
            }
          />

          {/* logo image */}
          <div className="relative" style={{ marginLeft: "-56px", marginTop: "-56px" }}>
            <motion.div
              animate={
                isMoving
                  ? { boxShadow: ["0 0 30px oklch(0.65 0.2 250 / 0.5)", "0 0 60px oklch(0.65 0.2 250 / 0.8)", "0 0 30px oklch(0.65 0.2 250 / 0.5)"] }
                  : {}
              }
              transition={{ duration: 0.3, repeat: Infinity }}
              className="rounded-full"
            >
              <Image
                src="/images/logo.png"
                alt="UpLearn by Nexus"
                width={112}
                height={112}
                className="rounded-full shadow-2xl shadow-primary/30"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ======== HERO CONTENT ======== */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={contentVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block"
          >
            Your AI-Powered
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={contentVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glow-text inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]"
          >
            Academic Ally
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 text-lg text-muted-foreground md:text-2xl"
        >
          <span>{"The smartest way to "}</span>
          <span className="inline-block min-w-[180px] text-left font-semibold text-foreground md:min-w-[280px]">
            {typingTexts[textIndex].slice(0, charIndex)}
            <motion.span
              className="inline-block h-5 w-0.5 translate-y-0.5 bg-primary md:h-6"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={contentVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          UpLearn by Nexus uses intelligent algorithms to create personalized
          study plans, track your performance, and adapt to the way you learn best.
        </motion.p>

        {/* Get Started button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Link href="/get-started">
              <Button
                size="lg"
                className="relative overflow-hidden bg-primary px-10 py-6 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              >
                {/* shimmer sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={contentVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
          className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={contentVisible ? { opacity: 1, y: [0, 10, 0] } : {}}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { delay: 1.5, duration: 2, repeat: Infinity },
        }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-primary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

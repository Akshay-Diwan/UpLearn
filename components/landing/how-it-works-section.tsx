"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Share Your Goals",
    description:
      "Tell us your subjects, current grades, and academic targets. Our AI builds your profile instantly.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analyzes & Plans",
    description:
      "Our engine processes your data, identifies knowledge gaps, and creates a hyper-personalized study strategy.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Watch Grades Soar",
    description:
      "Follow your adaptive plan, track real-time progress, and celebrate breakthroughs as they happen.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="relative px-6 py-24 md:py-32"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm text-accent"
        >
          How It Works
        </motion.span>
        <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
          Three Steps to{" "}
          <span className="text-accent">Academic Excellence</span>
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Getting started is effortless. Our AI handles the heavy lifting so you
          can focus on learning.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-5xl">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.3,
                type: "spring",
                stiffness: 80,
              }}
              className={`flex items-center gap-8 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`flex-1 ${
                  i % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <span className="mb-2 block font-mono text-sm text-primary">
                  Step {step.step}
                </span>
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Center icon */}
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card"
                  animate={{
                    boxShadow: [
                      "0 0 0px oklch(0.65 0.2 250 / 0)",
                      "0 0 30px oklch(0.65 0.2 250 / 0.3)",
                      "0 0 0px oklch(0.65 0.2 250 / 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <step.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              </motion.div>

              {/* Spacer */}
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

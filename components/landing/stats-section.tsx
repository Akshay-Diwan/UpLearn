"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { target: 50000, label: "Students Empowered", suffix: "+", prefix: "" },
  { target: 94, label: "Grade Improvement", suffix: "%", prefix: "" },
  { target: 2, label: "Study Hours Saved Daily", suffix: "h+", prefix: "" },
  { target: 150, label: "Universities Covered", suffix: "+", prefix: "" },
];

function AnimatedCounter({
  target,
  suffix,
  prefix,
  inView,
}: {
  target: number;
  suffix: string;
  prefix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {prefix}
      {target >= 1000
        ? `${Math.floor(count / 1000)}K`
        : count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="stats"
      className="relative px-6 py-24 md:py-32"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary"
          >
            Impact
          </motion.span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
            Proven <span className="text-primary">Results</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, y: 0, scale: 1 } : {}
              }
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm md:p-8"
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/20"
                animate={
                  isInView
                    ? {
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0, 0.5],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />

              <div className="relative">
                <div className="mb-2 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    inView={isInView}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

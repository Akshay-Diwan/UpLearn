"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  "Harvard",
  "Stanford",
  "MIT",
  "Oxford",
  "Cambridge",
  "Yale",
  "Princeton",
  "Columbia",
  "Caltech",
  "UC Berkeley",
];

export function LogoMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative overflow-hidden px-6 py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center"
      >
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Trusted by students at top universities
        </p>
      </motion.div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 gap-12 pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center justify-center"
              >
                <span className="whitespace-nowrap text-xl font-bold tracking-tight text-muted-foreground/40 transition-colors hover:text-muted-foreground/70">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

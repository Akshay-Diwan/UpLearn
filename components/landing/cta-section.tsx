"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-6 py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/50"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-accent/10 animate-gradient bg-[length:300%_300%]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.65 0.2 250 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 250 / 0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-6 inline-block"
          >
            <Sparkles className="h-10 w-10 text-primary" />
          </motion.div>

          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
            Ready to Transform Your
            <br />
            <span className="glow-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Academic Future?
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-muted-foreground">
            Join students already using UpLearn by Nexus to study smarter,
            score higher, and stress less.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
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
        </div>
      </motion.div>
    </section>
  );
}

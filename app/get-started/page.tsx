"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Tell Us Your Goals",
    description:
      "Share your subjects, target grades, and learning style so we can build around you.",
  },
  {
    icon: Brain,
    title: "AI Builds Your Plan",
    description:
      "Our AI analyzes your profile and creates a personalized study roadmap.",
  },
  {
    icon: Calendar,
    title: "Study Smarter Daily",
    description:
      "Follow adaptive daily tasks, quizzes, and revision sessions curated just for you.",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description:
      "Watch your performance improve with real-time analytics and insights.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function GetStartedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-12">
      {/* ambient orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/6 blur-[100px]"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-accent/6 blur-[100px]"
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="relative mb-6"
          >
            <Image
              src="/images/logo.png"
              alt="UpLearn by Nexus"
              width={80}
              height={80}
              className="rounded-full shadow-lg shadow-primary/20"
            />
            <motion.div
              className="absolute -inset-2 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>

          <h1 className="mb-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Get Started with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              UpLearn
            </span>
          </h1>
          <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Four simple steps to transform the way you study. Our AI adapts to
            you from day one.
          </p>
        </motion.div>

        {/* steps */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-14 flex flex-col gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={item}
              className="group relative flex items-start gap-5 rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              {/* step number */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
              <motion.div
                className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/0 transition-colors group-hover:text-primary/60"
                initial={false}
              >
                <CheckCircle2 className="h-5 w-5" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center"
        >
          <p className="mb-6 text-sm text-muted-foreground">
            Ready to begin your journey?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-primary px-10 py-6 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative">Launch My Study Plan</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  BarChart3,
  BookMarked,
  Calendar,
  MessageSquareText,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Study Plans",
    description:
      "Personalized learning paths that adapt to your strengths, weaknesses, and schedule in real-time.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Deep insights into your academic performance with predictive scoring and trend analysis.",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: BookMarked,
    title: "Smart Note Synthesis",
    description:
      "Transform your notes into organized, searchable knowledge bases with AI summarization.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Calendar,
    title: "Intelligent Scheduling",
    description:
      "Optimal study session timing based on your energy patterns and spaced repetition science.",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: MessageSquareText,
    title: "24/7 AI Tutor",
    description:
      "Get instant explanations, step-by-step solutions, and concept breakdowns anytime you need.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    title: "Exam Preparation",
    description:
      "AI-generated practice tests, flashcards, and targeted revision strategies for every exam.",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30 lg:p-8"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.65 0.2 250 / 0.06), transparent 60%)",
        }}
      />

      {/* Scanner line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100 animate-scanner" />

      <div
        className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3`}
      >
        <motion.div
          whileHover={{ rotate: 15, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
        </motion.div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>

      {/* Animated corner accent */}
      <motion.div
        className="absolute -bottom-1 -right-1 h-20 w-20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute bottom-2 right-2 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-primary/30" />
      </motion.div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative px-6 py-24 md:py-32" ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary"
        >
          Features
        </motion.span>
        <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
          Everything You Need to{" "}
          <span className="text-primary">Excel</span>
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Our AI analyzes your learning patterns and creates a personalized
          roadmap to academic success.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

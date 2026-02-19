"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

const chatMessages = [
  {
    role: "user" as const,
    text: "I'm struggling with calculus derivatives. Can you help?",
  },
  {
    role: "ai" as const,
    text: "Of course! Let's break derivatives down step by step. A derivative measures how a function changes as its input changes. Think of it as the slope of a curve at any given point.",
  },
  {
    role: "user" as const,
    text: "Can you give me a simple example?",
  },
  {
    role: "ai" as const,
    text: "Sure! For f(x) = x\u00B2, the derivative f'(x) = 2x. At x=3, the slope is 6. I've added 5 practice problems to your study plan based on this topic!",
  },
];

export function AIDemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleMessages((v) => {
        if (v >= chatMessages.length) {
          clearInterval(interval);
          return v;
        }
        return v + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="relative px-6 py-24 md:py-32" ref={ref}>
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
          Live Demo
        </motion.span>
        <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
          See the <span className="text-primary">AI Tutor</span> in Action
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Experience how our AI breaks down complex topics into clear,
          digestible explanations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto max-w-2xl"
      >
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border/50 px-6 py-4">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="h-4 w-4 text-primary" />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">
                UpLearn AI Tutor
              </p>
              <div className="flex items-center gap-1">
                <motion.div
                  className="h-2 w-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs text-muted-foreground">
                  Online now
                </span>
              </div>
            </div>
            <motion.div
              className="ml-auto"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-primary/50" />
            </motion.div>
          </div>

          {/* Chat messages */}
          <div className="flex h-80 flex-col gap-4 overflow-y-auto p-6 md:h-96">
            <AnimatePresence>
              {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      msg.role === "ai"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "ai"
                        ? "rounded-tl-sm bg-secondary text-secondary-foreground"
                        : "rounded-tr-sm bg-primary text-primary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {visibleMessages < chatMessages.length && visibleMessages > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex gap-1 rounded-2xl bg-secondary px-4 py-3">
                  {[0, 1, 2].map((j) => (
                    <motion.div
                      key={j}
                      className="h-2 w-2 rounded-full bg-muted-foreground/50"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: j * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-border/50 px-6 py-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3">
              <span className="flex-1 text-sm text-muted-foreground">
                Ask anything about your studies...
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science, MIT",
    quote:
      "My GPA went from 3.2 to 3.8 in one semester. The AI study plans are incredibly precise and adapt as I learn.",
    rating: 5,
    initials: "SC",
  },
  {
    name: "James Rodriguez",
    role: "Pre-Med, Stanford",
    quote:
      "The 24/7 AI tutor saved me during organic chemistry. It explains concepts better than most textbooks.",
    rating: 5,
    initials: "JR",
  },
  {
    name: "Priya Patel",
    role: "Engineering, UC Berkeley",
    quote:
      "I used to study 10 hours a day. Now I study 6 and get better results. The smart scheduling is a game-changer.",
    rating: 5,
    initials: "PP",
  },
  {
    name: "Marcus Williams",
    role: "Business, NYU",
    quote:
      "Exam preparation mode helped me score in the top 5% of my cohort. The practice tests are spot-on.",
    rating: 5,
    initials: "MW",
  },
  {
    name: "Elena Kowalski",
    role: "Psychology, Columbia",
    quote:
      "The performance analytics showed me exactly where I was losing marks. Within weeks, everything clicked.",
    rating: 5,
    initials: "EK",
  },
  {
    name: "David Kim",
    role: "Mathematics, Caltech",
    quote:
      "This platform is like having a personal academic coach. The note synthesis feature is worth the subscription alone.",
    rating: 5,
    initials: "DK",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 80,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
    >
      {/* Quote icon */}
      <motion.div
        className="absolute -right-2 -top-2 text-primary/10"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Quote className="h-16 w-16" />
      </motion.div>

      {/* Stars */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
          >
            <Star className="h-4 w-4 fill-primary text-primary" />
          </motion.div>
        ))}
      </div>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
          whileHover={{ scale: 1.1 }}
        >
          {testimonial.initials}
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>

      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.2 250 / 0.1), transparent, oklch(0.7 0.18 180 / 0.1))",
        }}
      />
    </motion.div>
  );
}

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="relative px-6 py-24 md:py-32"
      ref={ref}
    >
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
          Testimonials
        </motion.span>
        <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
          Loved by <span className="text-accent">Students</span> Everywhere
        </h2>
        <p className="text-pretty text-lg text-muted-foreground">
          Join thousands of students already transforming their academic journey.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>
    </section>
  );
}

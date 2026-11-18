"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
  /**
   * Use for content that is already in the first viewport on load. Renders a
   * plain element with the same entrance animation driven by CSS, so it is
   * painted without waiting for JS hydration (framer-motion renders it at
   * opacity:0 until React hydrates). Below-the-fold content keeps scroll reveal.
   */
  immediate?: boolean;
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 20,
  as = "div",
  immediate = false,
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (immediate) {
    const Tag = as === "li" ? "li" : "div";
    return (
      <Tag
        className={`hero-reveal ${className}`}
        style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as React.CSSProperties}
      >
        {children}
      </Tag>
    );
  }

  const variants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

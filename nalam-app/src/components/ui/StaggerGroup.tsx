"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
  staggerDelay?: number;
}

const container = (staggerChildren: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren },
  },
});

export function StaggerGroup({
  children,
  className = "",
  as = "div",
  staggerDelay = 0.1,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = container(shouldReduceMotion ? 0 : staggerDelay);

  if (as === "ul") {
    return (
      <motion.ul
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={variants}
      >
        {children}
      </motion.ul>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function getStaggerItem(shouldReduceMotion: boolean | null): Variants {
  if (shouldReduceMotion) {
    return { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

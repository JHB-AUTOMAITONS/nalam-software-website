"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getStaggerItem } from "@/components/ui/StaggerGroup";

interface WhyCardProps {
  title: string;
  description: string;
  index: number;
}

export function WhyCard({ title, description, index }: WhyCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={getStaggerItem(shouldReduceMotion)}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className="list-none rounded-2xl border border-teal-400/15 bg-white/[0.05] p-7 shadow-soft backdrop-blur-sm"
    >
      <span className="font-mono text-xs text-teal-400">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 font-display text-xl font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist-100/70">{description}</p>
    </motion.li>
  );
}

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
      className="glass-surface min-w-0 list-none rounded-2xl border border-ice-500/15 p-5 shadow-soft backdrop-blur-sm xs:p-7"
    >
      <span className="font-mono text-xs text-emerald-onlight">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 font-display text-xl font-medium text-navy-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </motion.li>
  );
}

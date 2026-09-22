"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getStaggerItem } from "@/components/ui/StaggerGroup";

interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={getStaggerItem(shouldReduceMotion)}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-surface glass-surface-hover flex list-none flex-col gap-2 rounded-2xl border border-ice-500/15 p-6 backdrop-blur-sm transition-colors hover:border-ice-500/35 hover:shadow-soft"
    >
      <h3 className="font-display text-base font-medium text-navy-950">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </motion.li>
  );
}

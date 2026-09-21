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
      className="flex list-none flex-col gap-2 rounded-2xl border border-teal-400/15 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:border-teal-400/30 hover:bg-white/[0.09] hover:shadow-soft"
    >
      <h3 className="font-display text-base font-medium text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-mist-100/70">{description}</p>
    </motion.li>
  );
}

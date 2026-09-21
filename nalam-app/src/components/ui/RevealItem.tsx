"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { getStaggerItem } from "./StaggerGroup";

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

export function RevealItem({ children, className = "" }: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li variants={getStaggerItem(shouldReduceMotion)} className={className}>
      {children}
    </motion.li>
  );
}

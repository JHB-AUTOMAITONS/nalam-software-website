"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getStaggerItem } from "@/components/ui/StaggerGroup";

interface ClientCardProps {
  name: string;
  subtitle?: string;
  logoSrc: string;
}

export function ClientCard({ name, subtitle, logoSrc }: ClientCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={getStaggerItem(shouldReduceMotion)}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className="flex list-none flex-col items-center gap-4 rounded-2xl border border-teal-400/15 bg-white/[0.05] p-6 text-center shadow-soft backdrop-blur-sm"
    >
      <span className="flex h-20 w-full items-center justify-center rounded-xl bg-white/95 p-3">
        <Image
          src={logoSrc}
          alt={`${name} logo`}
          width={0}
          height={0}
          sizes="140px"
          className="h-full w-auto max-w-full object-contain"
        />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-white">{name}</p>
        {subtitle ? <p className="text-xs text-mist-100/60">{subtitle}</p> : null}
      </div>
    </motion.li>
  );
}

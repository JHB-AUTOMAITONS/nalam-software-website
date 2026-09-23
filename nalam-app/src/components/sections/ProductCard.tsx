"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getStaggerItem } from "@/components/ui/StaggerGroup";
import type { Product } from "@/lib/constants";

const accentStyles: Record<Product["accent"], { ring: string; badge: string; icon: string; text: string }> = {
  teal: {
    ring: "hover:ring-teal-400/35 hover:shadow-glow-teal",
    badge: "bg-teal-500/10 text-emerald-onlight",
    icon: "bg-teal-500/12 text-emerald-onlight",
    text: "text-emerald-onlight",
  },
  navy: {
    ring: "hover:ring-ice-500/40 hover:shadow-glow-ice",
    badge: "bg-ice-500/12 text-ice-700",
    icon: "bg-ice-500/12 text-ice-700",
    text: "text-ice-700",
  },
  coral: {
    ring: "hover:ring-clinic-jade/40 hover:shadow-glow-teal",
    badge: "bg-clinic-jade/10 text-clinic-jade",
    icon: "bg-clinic-jade/12 text-clinic-jade",
    text: "text-clinic-jade",
  },
};

export function ProductCard({ product }: { product: Product }) {
  const styles = accentStyles[product.accent];
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={getStaggerItem(shouldReduceMotion)}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`glass-surface-strong group flex h-full min-w-0 flex-col gap-5 rounded-3xl border border-ice-500/20 p-5 shadow-soft ring-1 ring-transparent backdrop-blur-sm transition-shadow duration-300 xs:p-6 sm:gap-6 sm:p-8 ${styles.ring}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <span
          className={`inline-flex max-w-full items-center rounded-full px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] [overflow-wrap:anywhere] ${styles.badge}`}
        >
          {product.eyebrow}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-medium text-navy-950">{product.fullName}</h3>
        <p className={`text-sm font-medium ${styles.text}`}>{product.positioning}</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>

      <ul className="flex flex-col gap-2.5">
        {product.features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-2.5 text-sm text-navy-800">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="mt-0.5 shrink-0 text-emerald-onlight"
            >
              <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {feature.title}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4 border-t border-mist-200 pt-5 sm:pt-6">
        <p className="text-sm font-medium text-navy-950">{product.valueStatement}</p>
        <Link
          href={product.landingSlug}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight"
        >
          {product.ctaLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

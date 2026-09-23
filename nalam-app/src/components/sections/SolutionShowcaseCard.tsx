"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getStaggerItem } from "@/components/ui/StaggerGroup";
import type { Product } from "@/lib/constants";
import type { ShowcaseInfoChip } from "@/lib/solutions-content";

interface SolutionShowcaseCardProps {
  product: Product;
  chips: ShowcaseInfoChip[];
  /** Loads eagerly for the first (above-the-fold-ish) card; others lazy-load. */
  priority?: boolean;
}

const accentText: Record<Product["accent"], string> = {
  teal: "text-emerald-onlight",
  navy: "text-ice-700",
  coral: "text-clinic-jade",
};

const accentIcon: Record<Product["accent"], string> = {
  teal: "bg-teal-500/12 text-emerald-onlight",
  navy: "bg-ice-500/12 text-ice-700",
  coral: "bg-clinic-jade/12 text-clinic-jade",
};

const accentRing: Record<Product["accent"], string> = {
  teal: "hover:ring-teal-400/35 hover:shadow-glow-teal",
  navy: "hover:ring-ice-500/40 hover:shadow-glow-ice",
  coral: "hover:ring-clinic-jade/40 hover:shadow-glow-teal",
};

// Small dot icon shared by every chip — keeps the floating cards compact and
// consistent rather than needing a bespoke icon per label.
function ChipDot({ className }: { className: string }) {
  return <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${className}`} />;
}

export function SolutionShowcaseCard({ product, chips, priority = false }: SolutionShowcaseCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={getStaggerItem(shouldReduceMotion)}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`glass-surface-strong group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-ice-500/20 shadow-soft ring-1 ring-transparent backdrop-blur-sm transition-shadow duration-300 ${accentRing[product.accent]}`}
    >
      {/* Photo, with floating info chips over it and a bottom fade into the text area below. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
        <Image
          src={product.photoSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 35%, rgba(245,250,250,0.75) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(200deg, rgba(224,249,251,0.28) 0%, transparent 45%)",
          }}
        />

        <div className="absolute inset-3 flex flex-col justify-between xs:inset-4">
          <div className="flex justify-start">
            <motion.div
              className="flex items-center gap-2 rounded-xl px-3 py-2 shadow-soft"
              style={{
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
              animate={shouldReduceMotion ? { y: 0 } : { y: [0, -4, 0] }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <ChipDot className={accentIcon[product.accent].split(" ")[0]} />
              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold leading-tight text-navy-950">{chips[0].label}</p>
                {chips[0].sublabel ? (
                  <p className="text-[0.6rem] leading-tight text-slate-600">{chips[0].sublabel}</p>
                ) : null}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-end gap-2 self-end">
            {chips.slice(1).map((chip, index) => (
              <motion.div
                key={chip.label}
                className="flex items-center gap-2 rounded-xl px-3 py-2 shadow-soft"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, -4, 0] }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 5 + index * 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4 + index * 0.5,
                      }
                }
              >
                <div className="min-w-0 text-right">
                  <p className="text-[0.7rem] font-semibold leading-tight text-navy-950">{chip.label}</p>
                  {chip.sublabel ? (
                    <p className="text-[0.6rem] leading-tight text-slate-600">{chip.sublabel}</p>
                  ) : null}
                </div>
                <ChipDot className={accentIcon[product.accent].split(" ")[0]} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 xs:p-6 sm:p-7">
        <span
          className={`inline-flex w-fit max-w-full items-center rounded-full px-3 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] [overflow-wrap:anywhere] ${accentIcon[product.accent]}`}
        >
          {product.eyebrow}
        </span>

        <h3 className="text-balance font-display text-xl font-medium leading-tight text-navy-950 xs:text-2xl">
          {product.fullName}
        </h3>

        <p className={`text-balance text-sm font-semibold leading-snug ${accentText[product.accent]}`}>
          {product.positioning}
        </p>

        <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
          <Link
            href={product.landingSlug}
            className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Talk to Our Team
          </Link>
          <Link
            href={`${product.landingSlug}#features`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-950 transition-colors hover:text-emerald-onlight"
          >
            View Features
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

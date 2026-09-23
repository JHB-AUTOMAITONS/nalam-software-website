"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface HeroChip {
  label: string;
  sublabel: string;
}

interface SolutionHeroMediaProps {
  photoSrc: string;
  /** Meaningful alt text for the photo. */
  alt: string;
  chips: HeroChip[];
}

const chipPositions = [
  "left-2 top-4 xs:left-4 xs:top-6 lg:-left-6 lg:top-10",
  "right-2 top-1/2 -translate-y-1/2 xs:right-4 lg:right-4 lg:top-[38%]",
  "left-4 bottom-4 xs:left-8 xs:bottom-8 lg:left-2 lg:bottom-10",
];

/**
 * Hero visual for each dedicated solution page — a full-bleed photo behind
 * the entire hero at every breakpoint (never a separate image block), with
 * feathered edges (CSS mask-image) so it reads as one composition with the
 * text over it. A few small floating glass chips reinforce the product's
 * key capabilities on desktop, where there's room for them without covering
 * the subject or the text.
 */
export function SolutionHeroMedia({ photoSrc, alt, chips }: SolutionHeroMediaProps) {
  const shouldReduceMotion = useReducedMotion();
  const mask = "radial-gradient(ellipse 92% 95% at 72% 48%, black 58%, transparent 100%)";

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="relative h-full w-full overflow-hidden"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={photoSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(221,247,250,0.22) 0%, transparent 55%)",
          }}
        />
      </motion.div>

      {chips.map((chip, index) => (
        <motion.div
          key={chip.label}
          className={`absolute z-10 hidden max-w-[9.5rem] items-center gap-2 rounded-[14px] px-3 py-2 xs:max-w-[11rem] lg:flex ${chipPositions[index]}`}
          style={{
            background: "rgba(235,250,252,0.68)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(130,220,225,0.35)",
            boxShadow: "0 12px 40px rgba(40,150,150,0.08)",
          }}
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 5 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
          }
        >
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold leading-tight text-navy-950">{chip.label}</p>
            {chip.sublabel ? (
              <p className="text-[0.58rem] leading-tight text-slate-600">{chip.sublabel}</p>
            ) : null}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

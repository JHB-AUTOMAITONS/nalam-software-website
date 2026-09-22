"use client";

import { motion, useReducedMotion } from "framer-motion";

const chips = [
  { id: "ai", label: "AI", top: "10%", left: "8%", delay: 0 },
  { id: "data", label: "Data", top: "14%", left: "62%", delay: 1.6 },
  { id: "automation", label: "Automation", top: "70%", left: "6%", delay: 0.8 },
  { id: "integration", label: "Integration", top: "74%", left: "58%", delay: 2.4 },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-[4/3.2] w-[280px] max-w-full xs:w-[300px] sm:w-[360px] lg:w-[440px]"
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[26px]"
        style={{
          background:
            "linear-gradient(155deg, rgba(255, 255, 255, 0.6) 0%, rgba(224, 249, 251, 0.4) 100%)",
          border: "1px solid rgba(5, 213, 213, 0.2)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          boxShadow: "var(--shadow-glass)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 0%, transparent 65%)",
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-28 sm:w-28"
            style={{
              background:
                "radial-gradient(circle, rgba(5,213,213,0.28) 0%, rgba(25,200,120,0.12) 55%, transparent 75%)",
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.7 }
                : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.08, 1] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-full sm:h-[4.75rem] sm:w-[4.75rem]"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(5,213,213,0.35)",
              boxShadow: "0 8px 24px -8px rgba(5,213,213,0.35), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3v18M3 12h18"
                stroke="var(--color-teal-500)"
                strokeWidth={2.75}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {chips.map((chip) => (
          <motion.div
            key={chip.id}
            className="absolute rounded-xl px-3 py-1.5 text-[10px] font-medium tracking-wide text-navy-800/80 sm:text-xs"
            style={{
              top: chip.top,
              left: chip.left,
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(5,213,213,0.22)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 6px 16px -8px rgba(16,35,27,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { y: [0, -6, 0], opacity: [0.75, 1, 0.75] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: chip.delay,
                  }
            }
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-teal-500 align-middle" />
            {chip.label}
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
        Independent by design. Connected on demand.
      </p>
    </div>
  );
}

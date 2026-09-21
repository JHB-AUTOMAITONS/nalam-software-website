"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const exchanges = [
  { q: "How many patients visited today?", a: "42 patients checked in today across 3 doctors." },
  { q: "Which treatments were completed this month?", a: "128 treatments completed, led by dental cleaning and physiotherapy." },
  { q: "Show pending payments.", a: "7 invoices are pending, totaling ₹48,200." },
  { q: "How many patients are waiting for follow-up?", a: "15 patients have a follow-up due within 7 days." },
  { q: "Which medicines are running low?", a: "Amoxicillin and Paracetamol are below reorder level." },
];

export function KKAiChatDemo() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.18 } },
  };

  const item: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-[28px] border border-teal-400/20 bg-white/[0.04] p-5 shadow-glow-teal backdrop-blur-md sm:p-6"
    >
      <div className="flex items-center gap-2.5 border-b border-teal-400/15 pb-4">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 font-mono text-xs font-semibold text-teal-400">
          KK
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-teal-400 ring-2 ring-navy-950"
          />
        </span>
        <div>
          <p className="text-sm font-medium text-white">KK AI</p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-mist-100/50">
            Clinic Assistant
          </p>
        </div>
      </div>

      <div
        className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1"
        tabIndex={0}
        role="log"
        aria-label="Example conversation with KK AI"
      >
        {exchanges.map((exchange) => (
          <motion.div key={exchange.q} variants={item} className="flex flex-col gap-2">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-teal-500 px-4 py-2.5 text-sm text-navy-950">
              {exchange.q}
            </div>
            <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-sm text-mist-100">
              {exchange.a}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

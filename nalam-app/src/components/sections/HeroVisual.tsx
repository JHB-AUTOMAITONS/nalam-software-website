"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "lab", label: "LAB", sub: "LMS", cy: 64, color: "var(--color-teal-400)" },
  { id: "hospital", label: "HOSPITAL", sub: "HMS", cy: 184, color: "var(--color-teal-400)" },
  { id: "clinic", label: "CLINIC", sub: "CMS", cy: 304, color: "var(--color-clinic-jade)" },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div
        className="rounded-[30px] p-5 sm:p-8"
        style={{
          background:
            "linear-gradient(155deg, rgba(255, 255, 255, 0.58) 0%, rgba(240, 253, 253, 0.42) 100%)",
          border: "1px solid rgba(5, 213, 213, 0.22)",
          backdropFilter: "blur(26px) saturate(150%)",
          WebkitBackdropFilter: "blur(26px) saturate(150%)",
          boxShadow: "var(--shadow-glass)",
        }}
      >
        <svg viewBox="0 0 420 368" className="h-auto w-full" role="presentation">
          <defs>
            <linearGradient id="hub-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-ice-500)" />
              <stop offset="100%" stopColor="var(--color-ice-700)" />
            </linearGradient>
          </defs>

          {nodes.map((node, index) => {
            // Curves terminate at x=254 (the hub's glow-circle edge, cx=300 r=44 minus a small gap)
            // so every connector — including the hospital node's flat, same-height line — stays visible
            // instead of disappearing under the opaque hub circle.
            const pathD = `M 96 ${node.cy} C 170 ${node.cy}, 200 184, 254 184`;
            return (
              <motion.path
                key={node.id}
                d={pathD}
                fill="none"
                stroke="var(--color-ice-500)"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 0.55 : 0 }}
                whileInView={{ pathLength: 1, opacity: 0.55 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  delay: shouldReduceMotion ? 0 : index * 0.22,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            );
          })}

          {nodes.map((node, index) => (
            <g key={node.id}>
              <motion.circle
                cx={96}
                cy={node.cy}
                r={7}
                fill={node.color}
                initial={{ scale: shouldReduceMotion ? 1 : 0.6, opacity: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : 0.3 + index * 0.22,
                }}
                style={{ transformOrigin: `96px ${node.cy}px` }}
              />
              <text
                x={40}
                y={node.cy - 14}
                textAnchor="middle"
                className="fill-navy-950/85 font-mono text-[11px] tracking-[0.12em]"
              >
                {node.label}
              </text>
              <text
                x={40}
                y={node.cy + 22}
                textAnchor="middle"
                className="fill-slate-500 text-[10px]"
              >
                {node.sub}
              </text>
            </g>
          ))}

          <motion.circle
            cx={300}
            cy={184}
            r={44}
            fill="url(#hub-glow)"
            fillOpacity={0.14}
            stroke="url(#hub-glow)"
            strokeOpacity={0.6}
            strokeWidth={1.5}
            animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.05, 1] }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "300px 184px" }}
          />
          <circle cx={300} cy={184} r={30} fill="var(--color-surface-raised)" stroke="var(--color-teal-500)" strokeWidth={1} />
          <text
            x={300}
            y={180}
            textAnchor="middle"
            className="fill-navy-950 font-display text-[13px] font-medium"
          >
            Nalam
          </text>
          <text
            x={300}
            y={196}
            textAnchor="middle"
            className="fill-emerald-onlight font-mono text-[9px] uppercase tracking-[0.14em]"
          >
            Platform
          </text>
        </svg>
      </div>

      <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
        Independent by design. Connected on demand.
      </p>
    </div>
  );
}

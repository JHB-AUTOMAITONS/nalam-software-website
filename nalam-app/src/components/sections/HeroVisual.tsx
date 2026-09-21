"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "lab", label: "LAB", sub: "Nalam LMS", cy: 64, color: "var(--color-teal-400)" },
  { id: "hospital", label: "HOSPITAL", sub: "Nalam HMS", cy: 184, color: "var(--color-cyan-300)" },
  { id: "clinic", label: "CLINIC", sub: "Nalam CMS", cy: 304, color: "var(--color-clinic-jade)" },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div
        className="rounded-[28px] p-5 shadow-elevated backdrop-blur-md sm:p-8"
        style={{
          background: "rgba(8, 25, 18, 0.58)",
          border: "1px solid rgba(156, 255, 208, 0.30)",
        }}
      >
        <svg viewBox="0 0 420 368" className="h-auto w-full" role="presentation">
          <defs>
            <linearGradient id="hub-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-teal-400)" />
              <stop offset="100%" stopColor="var(--color-cyan-300)" />
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
                stroke={node.color}
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
                className="fill-white/85 font-mono text-[11px] tracking-[0.12em]"
              >
                {node.label}
              </text>
              <text
                x={40}
                y={node.cy + 22}
                textAnchor="middle"
                className="fill-white/50 text-[10px]"
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
          <circle cx={300} cy={184} r={30} fill="var(--color-navy-950)" stroke="var(--color-teal-400)" strokeWidth={1} />
          <text
            x={300}
            y={180}
            textAnchor="middle"
            className="fill-white font-display text-[13px] font-medium"
          >
            Nalam
          </text>
          <text
            x={300}
            y={196}
            textAnchor="middle"
            className="fill-teal-400 font-mono text-[9px] uppercase tracking-[0.14em]"
          >
            Platform
          </text>
        </svg>
      </div>

      <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-mist-100/50">
        Independent by design. Connected on demand.
      </p>
    </div>
  );
}

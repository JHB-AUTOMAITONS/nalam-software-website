"use client";

import { motion, useReducedMotion } from "framer-motion";

const stages = [
  { id: "clinic", label: "CLINIC", color: "var(--color-clinic-jade)" },
  { id: "lab", label: "LAB", color: "var(--color-teal-400)" },
  { id: "hospital", label: "HOSPITAL", color: "var(--color-cyan-300)" },
  { id: "record", label: "PATIENT RECORD", final: true, color: "var(--color-teal-400)" },
];

const stageGap = 96;
const startY = 40;

export function ConnectedDiagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] border border-teal-400/20 bg-navy-950/60 p-8 shadow-elevated backdrop-blur-md">
      <svg
        viewBox={`0 0 240 ${startY * 2 + stageGap * (stages.length - 1)}`}
        className="h-auto w-full"
        role="img"
        aria-label="Diagram showing Clinic, Lab and Hospital data connecting into one Patient Record"
      >
        {stages.slice(0, -1).map((stage, index) => {
          const y1 = startY + index * stageGap + 22;
          const y2 = startY + (index + 1) * stageGap - 22;
          return (
            <motion.line
              key={`line-${index}`}
              x1={120}
              y1={y1}
              x2={120}
              y2={y2}
              stroke={stage.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeOpacity={0.45}
              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                delay: shouldReduceMotion ? 0 : index * 0.25 + 0.2,
              }}
            />
          );
        })}

        {stages.map((stage, index) => {
          const y = startY + index * stageGap;
          return (
            <g key={stage.id}>
              <motion.circle
                cx={120}
                cy={y}
                r={stage.final ? 26 : 20}
                fill="var(--color-navy-950)"
                stroke={stage.color}
                strokeWidth={stage.final ? 2 : 1.5}
                initial={{ scale: shouldReduceMotion ? 1 : 0.6, opacity: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.25,
                }}
                style={{ transformOrigin: `120px ${y}px` }}
              />
              {stage.final ? (
                <motion.circle
                  cx={120}
                  cy={y}
                  r={34}
                  fill="none"
                  stroke="var(--color-teal-400)"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 0.35 }
                      : { scale: [1, 1.15, 1], opacity: [0.35, 0.05, 0.35] }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  }
                  style={{ transformOrigin: `120px ${y}px` }}
                />
              ) : null}
              <text
                x={120}
                y={y + (stage.final ? 45 : 38)}
                textAnchor="middle"
                className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                  stage.final ? "fill-white font-medium" : "fill-mist-100/60"
                }`}
              >
                {stage.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

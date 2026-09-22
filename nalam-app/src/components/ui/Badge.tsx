import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "teal" | "navy" | "coral" | "onDark" | "ice";
  className?: string;
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  teal: "bg-teal-500/10 text-emerald-onlight ring-1 ring-inset ring-teal-500/25",
  navy: "bg-navy-800/8 text-navy-800 ring-1 ring-inset ring-navy-800/15",
  coral: "bg-clinic-jade/10 text-clinic-jade ring-1 ring-inset ring-clinic-jade/25",
  onDark: "bg-white/70 text-emerald-onlight ring-1 ring-inset ring-teal-500/25 backdrop-blur-sm",
  ice: "bg-ice-500/10 text-ice-700 ring-1 ring-inset ring-ice-500/25",
};

export function Badge({ children, tone = "teal", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full px-2.5 py-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] xs:px-3.5 xs:text-[0.7rem] xs:tracking-[0.16em] ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

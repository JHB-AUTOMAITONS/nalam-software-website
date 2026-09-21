import type { ReactNode } from "react";
import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h1";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = tone === "dark" ? "text-white" : "text-navy-950";
  const descColor = tone === "dark" ? "text-mist-100/80" : "text-slate-600";

  return (
    <RevealOnScroll
      className={`flex max-w-3xl flex-col gap-4 ${alignClass} ${className}`}
    >
      {eyebrow ? (
        <span
          className={`font-mono text-xs font-medium uppercase tracking-[0.2em] ${
            tone === "dark" ? "text-teal-400" : "text-emerald-onlight"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={`text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`text-balance text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </RevealOnScroll>
  );
}

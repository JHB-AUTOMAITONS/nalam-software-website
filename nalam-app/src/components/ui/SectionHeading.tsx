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
  const titleColor = "text-navy-950";
  const descColor = "text-slate-600";

  return (
    <RevealOnScroll
      className={`flex min-w-0 max-w-3xl flex-col gap-4 ${alignClass} ${className}`}
    >
      {eyebrow ? (
        <span
          className={`font-mono text-xs font-medium uppercase tracking-[0.2em] ${
            tone === "dark" ? "text-emerald-onlight" : "text-emerald-onlight"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={`min-w-0 max-w-full text-balance font-display text-2xl font-medium leading-[1.15] tracking-tight xs:text-3xl xs:leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`min-w-0 max-w-full text-balance text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </RevealOnScroll>
  );
}

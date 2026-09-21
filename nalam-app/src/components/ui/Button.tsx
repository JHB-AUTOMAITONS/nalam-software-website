"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "glass";
type Size = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-teal-400 text-navy-950 shadow-soft hover:bg-teal-600 hover:shadow-glow-teal",
  secondary:
    "bg-white text-navy-950 ring-1 ring-inset ring-navy-900/15 hover:ring-teal-500/50 hover:text-emerald-onlight",
  ghost: "text-navy-800 hover:text-emerald-onlight",
  onDark: "bg-white text-navy-950 hover:bg-teal-400 hover:text-navy-950 shadow-elevated",
  glass:
    "bg-[linear-gradient(135deg,rgba(25,200,120,0.22),rgba(57,255,136,0.10))] text-white ring-1 ring-inset ring-teal-400/40 backdrop-blur-sm hover:ring-teal-400/60 hover:shadow-glow-teal",
};

const sizeStyles: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const TAP_TRANSITION = { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const };
const HOVER_TRANSITION = { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const MotionLink = motion.create(Link);

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...anchorProps } = props;
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ y: -2, transition: HOVER_TRANSITION }}
          whileTap={{ scale: 0.97, y: 0, transition: TAP_TRANSITION }}
          {...anchorProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <MotionLink
        href={href}
        className={classes}
        whileHover={{ y: -2, transition: HOVER_TRANSITION }}
        whileTap={{ scale: 0.97, y: 0, transition: TAP_TRANSITION }}
        {...anchorProps}
      >
        {children}
      </MotionLink>
    );
  }

  const buttonProps = props as Omit<ButtonAsButton, "href">;
  return (
    <motion.button
      className={classes}
      whileHover={{ y: -2, transition: HOVER_TRANSITION }}
      whileTap={{ scale: 0.97, y: 0, transition: TAP_TRANSITION }}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}

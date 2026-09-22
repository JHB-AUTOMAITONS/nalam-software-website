"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "glass";
type Size = "md" | "lg";

const baseStyles =
  "inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-teal-500 text-white shadow-soft hover:bg-ice-600 hover:shadow-glow-ice",
  secondary:
    "bg-white text-navy-950 ring-1 ring-inset ring-ice-500/35 hover:ring-ice-500/60 hover:text-ice-700",
  ghost: "text-navy-800 hover:text-ice-700",
  onDark: "bg-teal-500 text-white hover:bg-ice-600 shadow-elevated",
  glass:
    "bg-[rgba(221,247,250,0.55)] text-navy-950 ring-1 ring-inset ring-teal-500/40 backdrop-blur-sm hover:bg-[rgba(221,247,250,0.75)] hover:ring-teal-500/60 hover:shadow-[0_0_0_1px_rgba(24,200,120,0.25),0_10px_26px_-8px_rgba(24,200,120,0.4)]",
};

const sizeStyles: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm xs:px-5",
  lg: "px-5 py-3 text-sm xs:px-7 xs:py-3.5 xs:text-base",
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

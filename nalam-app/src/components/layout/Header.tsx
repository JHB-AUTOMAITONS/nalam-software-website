"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/lib/constants";

function getPrefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const GLASS_TOP = {
  background: "rgba(6, 20, 15, 0.68)",
  backdropFilter: "blur(20px) saturate(140%)",
  WebkitBackdropFilter: "blur(20px) saturate(140%)",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
};

const GLASS_SCROLLED = {
  background: "rgba(5, 17, 13, 0.95)",
  backdropFilter: "blur(26px) saturate(140%)",
  WebkitBackdropFilter: "blur(26px) saturate(140%)",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.32)",
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(getPrefersReducedMotion);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setShouldReduceMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const barTransition = { duration: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.header
      className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="mx-auto w-full max-w-[1400px] rounded-[20px] border border-teal-400/20"
        initial={false}
        animate={scrolled ? GLASS_SCROLLED : GLASS_TOP}
        transition={barTransition}
      >
        <div
          className={`flex w-full items-center justify-between px-5 transition-[padding] duration-300 sm:px-7 lg:px-8 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white"
          >
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/15 font-mono text-sm font-bold text-teal-400 ring-1 ring-inset ring-teal-400/30"
            >
              N
            </span>
            Nalam Software
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.main.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="group relative"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-mist-100/90 transition-colors hover:text-teal-400"
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                    onClick={() => setSolutionsOpen(true)}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      aria-hidden
                      className="mt-px transition-transform group-hover:rotate-180"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                      >
                        <div
                          className="overflow-hidden rounded-2xl border border-teal-400/20 p-2 shadow-elevated"
                          style={GLASS_SCROLLED}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-4 py-3 text-sm font-medium text-mist-100/90 transition-colors hover:bg-white/[0.06] hover:text-teal-400"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-mist-100/90 transition-colors hover:text-teal-400"
                >
                  {item.label}
                  {isActivePath(pathname, item.href) ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-0.5 h-px rounded-full bg-teal-400 shadow-[0_0_8px_rgba(57,255,136,0.8)]"
                    />
                  ) : null}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="md" variant="glass">
              Talk to Us
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/[0.14] lg:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pb-6 pt-4 sm:px-7">
                {navigation.main.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-medium text-white"
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <div className="ml-3 flex flex-col gap-1 border-l border-white/[0.14] pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-2 py-2 text-sm text-mist-100/75 hover:text-teal-400"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
                <Button
                  href="/contact"
                  variant="glass"
                  className="mt-3 w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Talk to Us
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

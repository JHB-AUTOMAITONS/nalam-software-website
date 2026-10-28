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
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/lib/constants";
import { countryPageList } from "@/lib/country-pages";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  /** Omitted for dropdown-only items such as Countries (there is no overview page). */
  href?: string;
  children?: NavChild[];
}

const countriesItem: NavItem = {
  label: "Countries",
  children: countryPageList.map((country) => ({ label: country.country, href: country.path })),
};

/** Existing primary navigation with the Countries dropdown placed after Solutions. */
const navItems: NavItem[] = (navigation.main as NavItem[]).flatMap((item) =>
  item.label === "Solutions" ? [item, countriesItem] : [item]
);

function getPrefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const GLASS_TOP = {
  background:
    "linear-gradient(155deg, rgba(221, 247, 250, 0.62) 0%, rgba(189, 239, 244, 0.48) 100%)",
  backdropFilter: "blur(18px) saturate(140%)",
  WebkitBackdropFilter: "blur(18px) saturate(140%)",
  borderColor: "rgba(255, 255, 255, 0.65)",
  boxShadow:
    "0 12px 36px rgba(34, 207, 227, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.65)",
};

const GLASS_SCROLLED = {
  background:
    "linear-gradient(155deg, rgba(221, 247, 250, 0.82) 0%, rgba(189, 239, 244, 0.7) 100%)",
  backdropFilter: "blur(22px) saturate(150%)",
  WebkitBackdropFilter: "blur(22px) saturate(150%)",
  borderColor: "rgba(255, 255, 255, 0.65)",
  boxShadow:
    "0 12px 36px rgba(34, 207, 227, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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

  // Desktop dropdowns: close on Escape (returning focus to the trigger) and on outside click.
  useEffect(() => {
    if (!openMenu) return;
    const menu = openMenu;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      document.querySelector<HTMLElement>(`[data-menu="${menu}"] button`)?.focus();
    }
    function handlePointerDown(event: PointerEvent) {
      if (!(event.target as Element).closest(`[data-menu="${menu}"]`)) setOpenMenu(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openMenu]);

  const barTransition = { duration: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.header
      className="fixed inset-x-2 top-2 z-50 xs:inset-x-3 xs:top-3 sm:inset-x-5 sm:top-5"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="mx-auto w-full max-w-[1120px] rounded-[26px] border"
        initial={false}
        animate={scrolled ? GLASS_SCROLLED : GLASS_TOP}
        transition={barTransition}
      >
        <div
          className={`flex w-full min-w-0 items-center justify-between gap-2 px-3 transition-[padding] duration-300 xs:px-5 sm:px-7 lg:px-8 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Link href="/" className="relative flex min-w-0 shrink items-center overflow-hidden rounded-[15px] sm:rounded-[20px]">
            <Logo className="h-7 w-auto xs:h-9 sm:h-10" priority />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  data-menu={item.label}
                  className="group relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setOpenMenu(item.label)}
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
                  {/* Always in the DOM (hidden with CSS) so the links are crawlable and
                      server-rendered; `invisible` also removes them from the tab order while closed. */}
                  <div
                    id={`menu-${item.label}`}
                    className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${
                      openMenu === item.label
                        ? "visible translate-y-0 opacity-100"
                        : "invisible pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <div
                      className="overflow-hidden rounded-2xl border border-ice-500/20 p-2 shadow-elevated"
                      style={GLASS_SCROLLED}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          onClick={() => setOpenMenu(null)}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-navy-800 transition-colors hover:bg-ice-500/[0.08] hover:text-teal-600 focus-visible:bg-ice-500/[0.08] focus-visible:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href as string}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:text-teal-600"
                >
                  {item.label}
                  {isActivePath(pathname, item.href as string) ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-0.5 h-px rounded-full bg-teal-500 shadow-[0_0_8px_rgba(25,200,120,0.5)]"
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-navy-800 xs:h-10 xs:w-10 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setMobileOpen((v) => !v);
              setMobileExpanded(null);
            }}
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
              className="overflow-hidden border-t border-navy-900/10 lg:hidden"
            >
              <nav
                aria-label="Mobile"
                className="flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-3 pb-4 pt-3 xs:px-5 sm:px-7 sm:pb-6 sm:pt-4"
              >
                {navItems.map((item) =>
                  item.href ? (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-base font-medium text-navy-950"
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
                        <div className="ml-3 flex flex-col gap-1 border-l border-navy-900/10 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-lg px-2 py-2 text-sm text-navy-800/80 hover:text-teal-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div key={item.label}>
                      <button
                        type="button"
                        aria-expanded={mobileExpanded === item.label}
                        aria-controls={`mobile-${item.label}`}
                        onClick={() => setMobileExpanded((v) => (v === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50"
                      >
                        {item.label}
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 10 6"
                          aria-hidden
                          className={`shrink-0 transition-transform motion-reduce:transition-none ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                      </button>
                      {/* Links stay in the DOM; `hidden` collapses them. */}
                      <div
                        id={`mobile-${item.label}`}
                        hidden={mobileExpanded !== item.label}
                        className="ml-3 flex flex-col gap-1 border-l border-navy-900/10 pl-4"
                      >
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-2 py-3 text-sm text-navy-800/80 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                )}
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

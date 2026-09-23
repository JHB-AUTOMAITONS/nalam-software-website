"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLeadForm } from "@/components/sections/ExternalLeadForm";
import { requirementsFormStore } from "@/lib/requirementsFormStore";

export function RequirementsPopup() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(() => requirementsFormStore.isPopupOpen());
  const formId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const isContactPage = pathname === "/contact";

  useEffect(() => {
    return requirementsFormStore.subscribeOpen(setOpen);
  }, []);

  useEffect(() => {
    if (isContactPage) return;
    requirementsFormStore.scheduleInitialTimer();
    return () => requirementsFormStore.clearTimer();
  }, [isContactPage]);

  useEffect(() => {
    if (isContactPage && requirementsFormStore.isPopupOpen()) {
      requirementsFormStore.closePopup();
    }
  }, [isContactPage]);

  useEffect(() => {
    if (!open) return;
    triggerElementRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      triggerElementRef.current?.focus?.();
    };
  }, [open]);

  function closePopup() {
    requirementsFormStore.closePopup();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      closePopup();
      return;
    }

    if (event.key !== "Tab") return;

    const container = dialogRef.current;
    if (!container) return;

    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (isContactPage) return null;

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 xs:p-3.5 sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[rgba(16,35,27,0.35)] backdrop-blur-[5px]"
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            onClick={closePopup}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${formId}-title`}
            onKeyDown={handleKeyDown}
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.94, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 12 }
            }
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[min(78vh,calc(100dvh-24px))] w-full max-w-[400px] flex-col overflow-hidden rounded-[18px] xs:rounded-[24px] sm:max-w-none sm:w-[min(90vw,620px)] sm:max-h-[min(80vh,calc(100dvh-24px))] sm:rounded-[28px]"
            style={{
              background:
                "linear-gradient(160deg, rgba(225, 247, 251, 0.82) 0%, rgba(205, 239, 246, 0.68) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(22px) saturate(140%)",
              WebkitBackdropFilter: "blur(22px) saturate(140%)",
              boxShadow:
                "0 24px 70px -20px rgba(34, 207, 227, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
            }}
          >
            {/* Compact sticky header — stays put while the form area below scrolls on its own. */}
            <div
              className="relative shrink-0 border-b border-white/40 px-3.5 py-3 xs:px-6 xs:py-3.5 sm:px-8 sm:py-4"
              style={{
                background:
                  "linear-gradient(160deg, rgba(225, 247, 251, 0.6) 0%, rgba(205, 239, 246, 0.4) 100%)",
                backdropFilter: "blur(18px) saturate(140%)",
                WebkitBackdropFilter: "blur(18px) saturate(140%)",
              }}
            >
              <div className="pr-9 xs:pr-10">
                <h2
                  id={`${formId}-title`}
                  className="text-balance font-display font-semibold leading-[1.08] text-navy-950"
                  style={{ fontSize: "clamp(1.625rem, 5.5vw, 2rem)" }}
                >
                  Tell Us What You Need
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closePopup}
                aria-label="Close requirements popup"
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 shrink-0 items-center justify-center rounded-full border border-white/60 bg-[rgba(221,247,250,0.35)] text-navy-800 backdrop-blur-sm transition-[color,box-shadow,border-color] hover:border-teal-500/40 hover:text-emerald-onlight hover:shadow-[0_0_0_1px_rgba(24,200,120,0.2),0_6px_18px_-6px_rgba(24,200,120,0.4)] xs:right-3 xs:h-10 xs:w-10"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* The ONLY scrollable area in the popup — the iframe below has a
                fixed height taller than its content, so it never scrolls
                internally and this stays the single scrollbar. */}
            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <ExternalLeadForm onSubmitDetected={() => requirementsFormStore.markCompleted()} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

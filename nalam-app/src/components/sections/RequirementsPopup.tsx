"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { organizationTypes, siteConfig } from "@/lib/constants";
import { popupFormSchema, type PopupFormFieldErrors } from "@/lib/validation";
import { PopupSelect } from "@/components/ui/PopupSelect";
import type { ContactApiResponse } from "@/types/forms";

const POPUP_INTERVAL_MS = 10_000;
const SESSION_KEY = "nalam_requirement_popup_submitted";

type Status = "idle" | "submitting" | "success" | "error";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const initialValues = {
  name: "",
  phone: "",
  organization: "",
  organizationType: "hospital" as const,
  requirements: "",
  website: "",
};

function getSessionAlreadySubmitted() {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function RequirementsPopup() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(getSessionAlreadySubmitted);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<PopupFormFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const formId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const isContactPage = pathname === "/contact";

  useEffect(() => {
    if (hasSubmitted || isContactPage) return;

    const interval = window.setInterval(() => {
      setOpen(true);
    }, POPUP_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [hasSubmitted, isContactPage]);

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
    setOpen(false);
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
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
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

  function updateField<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = popupFormSchema.safeParse(values);
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      const nextErrors: PopupFormFieldErrors = {};
      (Object.keys(flattened) as (keyof typeof flattened)[]).forEach((key) => {
        const message = flattened[key]?.[0];
        if (message) nextErrors[key as keyof PopupFormFieldErrors] = message;
      });
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields.");
      return;
    }

    if (isStaticExport) {
      const data = parsed.data;
      const body = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Organization: ${data.organization || "Not provided"}`,
        `Organization type: ${data.organizationType ?? "Not provided"}`,
        "",
        data.requirements || "Not provided",
      ].join("\n");
      window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Requirements from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("idle");
      setStatusMessage(null);
      return;
    }

    setStatus("submitting");
    setStatusMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        setStatusMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setValues(initialValues);
      setHasSubmitted(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage unavailable (private mode / disabled) — the in-memory
        // hasSubmitted flag still stops the popup from reopening this session.
      }
    } catch {
      setStatus("error");
      setStatusMessage("We couldn't reach the server. Please check your connection and try again.");
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
            className="relative flex w-full max-w-[420px] flex-col overflow-hidden rounded-[18px] xs:rounded-[24px] sm:max-w-none sm:w-[min(92vw,560px)] sm:rounded-[30px]"
            style={{
              maxHeight: "88vh",
              background:
                "linear-gradient(160deg, rgba(225, 247, 251, 0.82) 0%, rgba(205, 239, 246, 0.68) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(22px) saturate(140%)",
              WebkitBackdropFilter: "blur(22px) saturate(140%)",
              boxShadow:
                "0 24px 70px -20px rgba(34, 207, 227, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePopup}
              aria-label="Close requirements popup"
              className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-[rgba(221,247,250,0.35)] text-navy-800 backdrop-blur-sm transition-[color,box-shadow,border-color] hover:border-teal-500/40 hover:text-emerald-onlight hover:shadow-[0_0_0_1px_rgba(24,200,120,0.2),0_6px_18px_-6px_rgba(24,200,120,0.4)] xs:right-4 xs:top-4 xs:h-11 xs:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="overflow-y-auto px-3.5 pb-4 pt-4 xs:px-6 xs:pb-7 xs:pt-6 sm:px-9 sm:pb-9 sm:pt-7" style={{ maxHeight: "88vh" }}>
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 text-emerald-onlight">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 id={`${formId}-title`} className="font-display text-2xl font-medium text-navy-950">
                    Requirements Received
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-slate-600">
                    Thank you. Our team will review your requirements and get back to you.
                  </p>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="mt-2 rounded-full bg-teal-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="pr-6 xs:pr-8">
                    <h2
                      id={`${formId}-title`}
                      className="text-balance font-display text-xl font-semibold leading-[1.15] text-navy-950 xs:text-2xl sm:text-[1.75rem]"
                    >
                      Tell Us What You Need
                    </h2>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-3 flex flex-col gap-3 xs:mt-4 xs:gap-4"
                    aria-describedby={statusMessage ? `${formId}-status` : undefined}
                  >
                    <input
                      type="text"
                      name="website"
                      value={values.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="grid gap-3 xs:gap-4 sm:grid-cols-2">
                      <PopupField id={`${formId}-name`} label="Name *" error={errors.name}>
                        <input
                          id={`${formId}-name`}
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={values.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={inputClasses(Boolean(errors.name))}
                          aria-invalid={Boolean(errors.name)}
                        />
                      </PopupField>

                      <PopupField id={`${formId}-phone`} label="Phone Number *" error={errors.phone}>
                        <input
                          id={`${formId}-phone`}
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={values.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className={inputClasses(Boolean(errors.phone))}
                          aria-invalid={Boolean(errors.phone)}
                        />
                      </PopupField>

                      <PopupField
                        id={`${formId}-organization`}
                        label="Organization Name"
                        error={errors.organization}
                      >
                        <input
                          id={`${formId}-organization`}
                          name="organization"
                          type="text"
                          autoComplete="organization"
                          value={values.organization}
                          onChange={(e) => updateField("organization", e.target.value)}
                          className={inputClasses(Boolean(errors.organization))}
                          aria-invalid={Boolean(errors.organization)}
                        />
                      </PopupField>

                      <PopupField
                        id={`${formId}-org-type`}
                        label="Organization Type"
                        error={errors.organizationType}
                      >
                        <PopupSelect
                          id={`${formId}-org-type`}
                          value={values.organizationType}
                          options={organizationTypes}
                          onChange={(next) =>
                            updateField("organizationType", next as typeof values.organizationType)
                          }
                          hasError={Boolean(errors.organizationType)}
                        />
                      </PopupField>

                      <div className="sm:col-span-2">
                        <PopupField
                          id={`${formId}-requirements`}
                          label="Requirements"
                          error={errors.requirements}
                        >
                          <textarea
                            id={`${formId}-requirements`}
                            name="requirements"
                            rows={3}
                            value={values.requirements}
                            onChange={(e) => updateField("requirements", e.target.value)}
                            placeholder="Tell us briefly about your workflow or what you want to improve..."
                            className={`${inputClasses(Boolean(errors.requirements))} h-16 resize-none xs:h-auto`}
                            aria-invalid={Boolean(errors.requirements)}
                          />
                        </PopupField>
                      </div>
                    </div>

                    <AnimatePresence>
                      {statusMessage && status === "error" ? (
                        <motion.p
                          id={`${formId}-status`}
                          role="alert"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="rounded-xl bg-signal-coral/10 px-4 py-3 text-sm text-signal-coral"
                        >
                          {statusMessage}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-500 text-sm font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-teal-600 hover:shadow-glow-teal disabled:cursor-not-allowed disabled:opacity-60 xs:h-[50px]"
                    >
                      {status === "submitting" ? (
                        "Sending…"
                      ) : (
                        <>
                          Send My Requirements
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function inputClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-[rgba(255,255,255,0.55)] px-3.5 text-sm text-navy-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-teal-500/55 focus-visible:ring-[3px] focus-visible:ring-teal-500/[0.14] min-h-[40px] py-2 xs:min-h-[46px] xs:py-2.5 ${
    hasError ? "border-signal-coral/60" : "border-ice-500/25"
  }`;
}

function PopupField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-navy-800/80">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-signal-coral" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

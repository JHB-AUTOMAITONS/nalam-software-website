"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { organizationTypes, interestedSystems, siteConfig } from "@/lib/constants";
import { contactFormSchema, type ContactFormFieldErrors } from "@/lib/validation";
import { PopupSelect } from "@/components/ui/PopupSelect";
import type { ContactApiResponse } from "@/types/forms";

const POPUP_INTERVAL_MS = 10_000;
const SESSION_KEY = "nalam_requirement_popup_submitted";

type Status = "idle" | "submitting" | "success" | "error";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  organizationType: "hospital" as const,
  interestedSystem: "hms" as const,
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
  const [errors, setErrors] = useState<ContactFormFieldErrors>({});
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

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      const nextErrors: ContactFormFieldErrors = {};
      (Object.keys(flattened) as (keyof typeof flattened)[]).forEach((key) => {
        const message = flattened[key]?.[0];
        if (message) nextErrors[key as keyof ContactFormFieldErrors] = message;
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
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Organization: ${data.organization}`,
        `Organization type: ${data.organizationType}`,
        `Interested system: ${data.interestedSystem}`,
        "",
        data.requirements,
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[rgba(2,10,7,0.55)] backdrop-blur-[5px]"
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
            className="relative flex w-full flex-col overflow-hidden rounded-[24px] border border-teal-400/25 bg-[rgba(7,25,18,0.96)] shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:w-[min(92vw,560px)]"
            style={{ maxHeight: "88vh" }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePopup}
              aria-label="Close requirements popup"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-teal-400/20 bg-white/[0.06] text-mist-100/80 backdrop-blur-sm transition-colors hover:border-teal-400/40 hover:text-teal-400"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="overflow-y-auto px-6 py-7 sm:px-9 sm:py-9" style={{ maxHeight: "88vh" }}>
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 id={`${formId}-title`} className="font-display text-2xl font-medium text-white">
                    Requirements Received
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-mist-100/70">
                    Thank you. Our team will review your requirements and get back to you.
                  </p>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="mt-2 rounded-full bg-teal-400 px-6 py-2.5 text-sm font-medium text-navy-950 transition-colors hover:bg-teal-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2 pr-8">
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-400">
                      Let&apos;s Build Your Workflow
                    </span>
                    <h2
                      id={`${formId}-title`}
                      className="text-balance font-display text-[1.75rem] font-medium leading-tight text-white sm:text-[2rem]"
                    >
                      Tell Us What You Need
                    </h2>
                    <p className="text-sm leading-relaxed text-mist-100/70">
                      Tell us a little about your organization and we&apos;ll help you find the
                      right Nalam solution.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-6 flex flex-col gap-4"
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <PopupField id={`${formId}-name`} label="Name" error={errors.name}>
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

                      <PopupField id={`${formId}-email`} label="Work Email" error={errors.email}>
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className={inputClasses(Boolean(errors.email))}
                          aria-invalid={Boolean(errors.email)}
                        />
                      </PopupField>

                      <PopupField id={`${formId}-phone`} label="Phone Number" error={errors.phone}>
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
                          required
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

                      <PopupField
                        id={`${formId}-system`}
                        label="Interested In"
                        error={errors.interestedSystem}
                      >
                        <PopupSelect
                          id={`${formId}-system`}
                          value={values.interestedSystem}
                          options={interestedSystems}
                          onChange={(next) =>
                            updateField("interestedSystem", next as typeof values.interestedSystem)
                          }
                          hasError={Boolean(errors.interestedSystem)}
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
                            required
                            rows={3}
                            value={values.requirements}
                            onChange={(e) => updateField("requirements", e.target.value)}
                            placeholder="Tell us briefly about your workflow or what you want to improve..."
                            className={`${inputClasses(Boolean(errors.requirements))} resize-none`}
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
                      className="mt-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-teal-400 text-sm font-semibold text-navy-950 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-teal-300 hover:shadow-glow-teal disabled:cursor-not-allowed disabled:opacity-60"
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
  return `w-full rounded-xl border bg-white/[0.05] px-3.5 text-sm text-white shadow-sm transition-colors placeholder:text-mist-100/40 focus-visible:outline-none focus-visible:border-teal-400/55 focus-visible:ring-[3px] focus-visible:ring-teal-400/[0.08] min-h-[46px] py-2.5 ${
    hasError ? "border-signal-coral/60" : "border-[rgba(150,220,190,0.20)]"
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
      <label htmlFor={id} className="text-xs font-medium text-mist-100/70">
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

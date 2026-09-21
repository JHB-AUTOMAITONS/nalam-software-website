"use client";

import { useId, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { organizationTypes, interestedSystems, siteConfig } from "@/lib/constants";
import { contactFormSchema, type ContactFormFieldErrors } from "@/lib/validation";
import type { ContactApiResponse } from "@/types/forms";

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

export function RequirementsForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactFormFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const formId = useId();

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
    } catch {
      setStatus("error");
      setStatusMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-3xl border border-teal-500/20 bg-teal-500/5 px-8 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 text-emerald-onlight">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="font-display text-2xl font-medium text-navy-950">
          Requirements received
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-slate-600">
          Thank you for sharing your requirements. Our team will review the
          details and get back to you shortly.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another requirement
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" aria-describedby={statusMessage ? `${formId}-status` : undefined}>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          error={errors.name}
        >
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
        </Field>

        <Field id={`${formId}-email`} label="Email" error={errors.email}>
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
        </Field>

        <Field id={`${formId}-phone`} label="Phone Number" error={errors.phone}>
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
        </Field>

        <Field
          id={`${formId}-organization`}
          label="Organization / Hospital / Lab / Clinic Name"
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
        </Field>

        <Field id={`${formId}-org-type`} label="Organization Type" error={errors.organizationType}>
          <select
            id={`${formId}-org-type`}
            name="organizationType"
            value={values.organizationType}
            onChange={(e) => updateField("organizationType", e.target.value as typeof values.organizationType)}
            className={inputClasses(Boolean(errors.organizationType))}
          >
            {organizationTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${formId}-system`}
          label="Which Nalam system are you interested in?"
          error={errors.interestedSystem}
        >
          <select
            id={`${formId}-system`}
            name="interestedSystem"
            value={values.interestedSystem}
            onChange={(e) => updateField("interestedSystem", e.target.value as typeof values.interestedSystem)}
            className={inputClasses(Boolean(errors.interestedSystem))}
          >
            {interestedSystems.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={`${formId}-requirements`} label="Requirements" error={errors.requirements}>
        <textarea
          id={`${formId}-requirements`}
          name="requirements"
          required
          rows={5}
          value={values.requirements}
          onChange={(e) => updateField("requirements", e.target.value)}
          placeholder="Tell us about your workflow, departments, integrations or anything specific you need."
          className={inputClasses(Boolean(errors.requirements))}
          aria-invalid={Boolean(errors.requirements)}
        />
      </Field>

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

      {isStaticExport && (
        <p className="text-sm text-slate-600">
          This opens your email app with your requirements filled in. Press Send
          in your email app to submit, or email {siteConfig.contact.email} directly.
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-fit">
        {status === "submitting" ? "Sending…" : isStaticExport ? "Continue in Email App" : "Send Requirements"}
      </Button>
    </form>
  );
}

function inputClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-950 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 ${
    hasError ? "border-signal-coral/60" : "border-mist-200 focus:border-teal-500/50"
  }`;
}

function Field({
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
      <label htmlFor={id} className="text-sm font-medium text-navy-800">
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

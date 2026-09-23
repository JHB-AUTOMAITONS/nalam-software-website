"use client";

import { useCallback, useSyncExternalStore, useState, type FormEvent } from "react";
import {
  requirementsFormSchema,
  type RequirementsFormFieldErrors,
} from "@/lib/validation";
import { requirementsFormStore } from "@/lib/requirementsFormStore";
import { siteConfig } from "@/lib/constants";
import type { ContactApiResponse } from "@/types/forms";

export type FormStatus = "idle" | "submitting" | "success" | "error";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

// Shared submit + validation logic consumed by both the Contact-page form
// and the automatic popup, so there is exactly one implementation of
// "what happens when the requirements form is submitted."
export function useRequirementsForm(source: "popup" | "contact_page" = "contact_page") {
  const values = useSyncExternalStore(
    requirementsFormStore.subscribe,
    requirementsFormStore.getValues,
    () => requirementsFormStore.getValues()
  );
  const [errors, setErrors] = useState<RequirementsFormFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const updateField = useCallback(
    <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
      requirementsFormStore.updateField(key, value);
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const parsed = requirementsFormSchema.safeParse({ ...values, source });
      if (!parsed.success) {
        const flattened = parsed.error.flatten().fieldErrors;
        const nextErrors: RequirementsFormFieldErrors = {};
        (Object.keys(flattened) as (keyof typeof flattened)[]).forEach((key) => {
          const message = flattened[key]?.[0];
          if (message) nextErrors[key as keyof RequirementsFormFieldErrors] = message;
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
        requirementsFormStore.resetValues();
        requirementsFormStore.markCompleted();
      } catch {
        setStatus("error");
        setStatusMessage("We couldn't reach the server. Please check your connection and try again.");
      }
    },
    [values, source]
  );

  const resetStatus = useCallback(() => {
    setStatus("idle");
    setStatusMessage(null);
  }, []);

  return {
    values,
    errors,
    status,
    statusMessage,
    updateField,
    handleSubmit,
    resetStatus,
  };
}

"use client";

import { ExternalLeadForm } from "@/components/sections/ExternalLeadForm";
import { requirementsFormStore } from "@/lib/requirementsFormStore";

export function RequirementsForm() {
  return (
    <ExternalLeadForm onSubmitDetected={() => requirementsFormStore.markCompleted()} />
  );
}

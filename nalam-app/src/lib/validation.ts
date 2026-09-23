import { z } from "zod";

// Single shared schema for both the Contact-page form and the automatic
// requirements popup — they represent the same lead-capture form and must
// stay in lockstep. Exactly four fields: Name, Phone (required), Organization
// Type and Requirements (optional).
export const requirementsFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .refine((value) => /^[+()\-\s\d]+$/.test(value), {
      message: "Enter a valid phone number.",
    }),
  organizationType: z
    .enum(["hospital", "laboratory", "clinic", "hospital_lab", "clinic_lab", "other"])
    .optional(),
  requirements: z
    .string()
    .trim()
    .max(4000, "Requirements are too long.")
    .optional()
    .default(""),
  source: z.enum(["popup", "contact_page"]).optional().default("contact_page"),
  website: z.string().max(0, "Invalid submission.").optional().default(""),
});

export type RequirementsFormValues = z.infer<typeof requirementsFormSchema>;

export type RequirementsFormFieldErrors = Partial<
  Record<keyof RequirementsFormValues, string>
>;

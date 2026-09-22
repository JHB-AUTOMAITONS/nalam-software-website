import { z } from "zod";

// Single shared schema for both the Contact-page form and the automatic
// requirements popup — they represent the same lead-capture form and must
// stay in lockstep. Email is optional since the popup's quicker flow may
// be filled without it; every other required rule matches the main form.
export const requirementsFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .max(160, "Email is too long.")
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "Enter a valid email address.",
    })
    .optional()
    .default(""),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .refine((value) => /^[+()\-\s\d]+$/.test(value), {
      message: "Enter a valid phone number.",
    }),
  organization: z
    .string()
    .trim()
    .max(160, "Organization name is too long.")
    .optional()
    .default(""),
  organizationType: z
    .enum(["hospital", "laboratory", "clinic", "hospital_lab", "clinic_lab", "other"])
    .optional(),
  interestedSystem: z.enum(["lms", "hms", "cms", "multiple", "custom"]).optional(),
  requirements: z
    .string()
    .trim()
    .max(4000, "Requirements are too long.")
    .optional()
    .default(""),
  website: z.string().max(0, "Invalid submission.").optional().default(""),
});

export type RequirementsFormValues = z.infer<typeof requirementsFormSchema>;

export type RequirementsFormFieldErrors = Partial<
  Record<keyof RequirementsFormValues, string>
>;

// Legacy aliases kept so any other existing references keep working while
// both the Contact page and the popup now share requirementsFormSchema.
export const contactFormSchema = requirementsFormSchema;
export type ContactFormValues = RequirementsFormValues;
export type ContactFormFieldErrors = RequirementsFormFieldErrors;

export const popupFormSchema = requirementsFormSchema;
export type PopupFormValues = RequirementsFormValues;
export type PopupFormFieldErrors = RequirementsFormFieldErrors;

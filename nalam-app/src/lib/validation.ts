import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number is too long."),
  organization: z
    .string()
    .trim()
    .min(2, "Enter your organization name.")
    .max(160, "Organization name is too long."),
  organizationType: z.enum([
    "hospital",
    "laboratory",
    "clinic",
    "hospital_lab",
    "clinic_lab",
    "other",
  ]),
  interestedSystem: z.enum(["lms", "hms", "cms", "multiple", "custom"]),
  requirements: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your requirements.")
    .max(4000, "Requirements are too long."),
  website: z.string().max(0, "Invalid submission.").optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

// Short lead-capture schema used only by the 45-second requirements popup.
// Only Name and Phone are required there; every other field is optional so
// the popup can submit a minimal lead without the full Contact-page form's
// requirements. The Contact page keeps using contactFormSchema, unchanged.
export const popupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number is too long."),
  organization: z.string().trim().max(160, "Organization name is too long.").optional().default(""),
  organizationType: z
    .enum(["hospital", "laboratory", "clinic", "hospital_lab", "clinic_lab", "other"])
    .optional(),
  requirements: z.string().trim().max(4000, "Requirements are too long.").optional().default(""),
  website: z.string().max(0, "Invalid submission.").optional().default(""),
});

export type PopupFormValues = z.infer<typeof popupFormSchema>;

export type PopupFormFieldErrors = Partial<
  Record<keyof PopupFormValues, string>
>;

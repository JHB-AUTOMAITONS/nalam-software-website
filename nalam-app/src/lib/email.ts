import { Resend } from "resend";
import { siteConfig } from "./constants";
import type { ContactFormValues } from "./validation";

const organizationTypeLabels: Record<
  Exclude<ContactFormValues["organizationType"], undefined>,
  string
> = {
  hospital: "Hospital",
  laboratory: "Laboratory",
  clinic: "Clinic",
  hospital_lab: "Hospital + Laboratory",
  clinic_lab: "Clinic + Laboratory",
  other: "Other",
};

const interestedSystemLabels: Record<
  Exclude<ContactFormValues["interestedSystem"], undefined>,
  string
> = {
  lms: "LMS — Lab Management",
  hms: "HMS — Hospital Management",
  cms: "CMS — Clinic Management",
  multiple: "Multiple Systems",
  custom: "Custom Solution",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The full Contact-page form always sends every field; the short popup form
// only guarantees name + phone, so every other field arrives possibly empty
// or undefined here — read defensively rather than assuming ContactFormValues'
// stricter shape.
type NotificationPayload = Omit<
  ContactFormValues,
  "email" | "organizationType" | "interestedSystem"
> & {
  email?: string;
  organizationType?: ContactFormValues["organizationType"];
  interestedSystem?: ContactFormValues["interestedSystem"];
};

export async function sendContactNotification(data: NotificationPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_NOTIFICATION_EMAIL ?? siteConfig.contact.email;
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "Nalam Software <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not configured. Skipping email delivery; submission logged only."
    );
    console.info("[contact] Submission received:", data);
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);

  const organizationTypeLabel = data.organizationType
    ? organizationTypeLabels[data.organizationType]
    : "Not provided";
  const interestedSystemLabel = data.interestedSystem
    ? interestedSystemLabels[data.interestedSystem]
    : "Not provided";
  const email = data.email?.trim() || "";
  const organization = data.organization?.trim() || "Not provided";
  const requirements = data.requirements?.trim() || "Not provided";

  const html = `
    <h2>New requirements submission — Nalam Software</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tbody>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email ? escapeHtml(email) : "Not provided"}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td><strong>Organization</strong></td><td>${escapeHtml(organization)}</td></tr>
        <tr><td><strong>Organization type</strong></td><td>${escapeHtml(organizationTypeLabel)}</td></tr>
        <tr><td><strong>Interested system</strong></td><td>${escapeHtml(interestedSystemLabel)}</td></tr>
        <tr><td valign="top"><strong>Requirements</strong></td><td>${escapeHtml(requirements).replace(/\n/g, "<br />")}</td></tr>
      </tbody>
    </table>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    ...(email ? { replyTo: email } : {}),
    subject: `New requirements from ${data.name} — ${organizationTypeLabel}`,
    html,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send email via Resend.");
  }

  return { delivered: true as const };
}

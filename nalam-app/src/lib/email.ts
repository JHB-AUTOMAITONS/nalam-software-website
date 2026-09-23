import { Resend } from "resend";
import { siteConfig } from "./constants";
import type { RequirementsFormValues } from "./validation";

const organizationTypeLabels: Record<
  Exclude<RequirementsFormValues["organizationType"], undefined>,
  string
> = {
  hospital: "Hospital",
  laboratory: "Laboratory",
  clinic: "Clinic",
  hospital_lab: "Hospital + Laboratory",
  clinic_lab: "Clinic + Laboratory",
  other: "Other",
};

const sourceLabels: Record<Exclude<RequirementsFormValues["source"], undefined>, string> = {
  popup: "Popup",
  contact_page: "Contact Page",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactNotification(data: RequirementsFormValues) {
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
  const sourceLabel = sourceLabels[data.source ?? "contact_page"];
  const requirements = data.requirements?.trim() || "Not provided";

  const html = `
    <h2>New requirements submission — Nalam Software</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tbody>
        <tr><td><strong>Timestamp</strong></td><td>${escapeHtml(new Date().toISOString())}</td></tr>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td><strong>Organization type</strong></td><td>${escapeHtml(organizationTypeLabel)}</td></tr>
        <tr><td valign="top"><strong>Requirements</strong></td><td>${escapeHtml(requirements).replace(/\n/g, "<br />")}</td></tr>
        <tr><td><strong>Source</strong></td><td>${escapeHtml(sourceLabel)}</td></tr>
      </tbody>
    </table>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    subject: `New requirements from ${data.name} — ${organizationTypeLabel}`,
    html,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send email via Resend.");
  }

  return { delivered: true as const };
}

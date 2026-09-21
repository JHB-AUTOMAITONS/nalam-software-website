import { Resend } from "resend";
import { siteConfig } from "./constants";
import type { ContactFormValues } from "./validation";

const organizationTypeLabels: Record<ContactFormValues["organizationType"], string> = {
  hospital: "Hospital",
  laboratory: "Laboratory",
  clinic: "Clinic",
  hospital_lab: "Hospital + Laboratory",
  clinic_lab: "Clinic + Laboratory",
  other: "Other",
};

const interestedSystemLabels: Record<ContactFormValues["interestedSystem"], string> = {
  lms: "Nalam LMS — Lab Management",
  hms: "Nalam HMS — Hospital Management",
  cms: "Nalam CMS — Clinic Management",
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

export async function sendContactNotification(data: ContactFormValues) {
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

  const html = `
    <h2>New requirements submission — Nalam Software</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tbody>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td><strong>Organization</strong></td><td>${escapeHtml(data.organization)}</td></tr>
        <tr><td><strong>Organization type</strong></td><td>${organizationTypeLabels[data.organizationType]}</td></tr>
        <tr><td><strong>Interested system</strong></td><td>${interestedSystemLabels[data.interestedSystem]}</td></tr>
        <tr><td valign="top"><strong>Requirements</strong></td><td>${escapeHtml(data.requirements).replace(/\n/g, "<br />")}</td></tr>
      </tbody>
    </table>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: data.email,
    subject: `New requirements from ${data.name} — ${organizationTypeLabels[data.organizationType]}`,
    html,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send email via Resend.");
  }

  return { delivered: true as const };
}

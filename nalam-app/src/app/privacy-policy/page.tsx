import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactDetails,
  LegalDocument,
  LegalPlaceholder,
  type LegalSection,
} from "@/components/sections/LegalDocument";
import { routes, siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Nalam Software",
  description:
    "How Nalam Software collects, uses and protects the information you share through this website, including enquiries and analytics data.",
  path: routes.privacy,
  absoluteTitle: true,
});

const siteHost = new URL(siteConfig.url).host;

// Every data practice described below reflects what the website code actually
// does today (requirements form fields in src/lib/validation.ts, email delivery
// in src/lib/email.ts, analytics tags in src/components/analytics/Analytics.tsx,
// browser storage in src/lib/requirementsFormStore.ts). Update this page if any
// of those change.
const sections: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    body: (
      <p>
        This Privacy Policy explains how {siteConfig.name}, a Thukal Innovatives LLP company
        (&ldquo;Nalam&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), collects,
        uses and protects information when you visit {siteHost} (the &ldquo;Website&rdquo;) or
        contact us through it. This policy covers the Website only; data processed within
        Nalam&apos;s hospital, laboratory and clinic software for customers is governed by the
        relevant customer agreement. <LegalPlaceholder>confirm scope statement</LegalPlaceholder>
      </p>
    ),
  },
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: (
      <>
        <p>
          <strong className="font-medium text-navy-950">Information you give us.</strong> When you
          submit the requirements form on our contact page or in the requirements pop-up, we
          collect:
        </p>
        <ul>
          <li>your name;</li>
          <li>your phone number;</li>
          <li>your organization type (optional); and</li>
          <li>any requirements or message you choose to share (optional).</li>
        </ul>
        <p>
          If you email or call us directly, we receive the information you include in that
          communication.
        </p>
        <p>
          <strong className="font-medium text-navy-950">Information collected automatically.</strong>{" "}
          The Website uses analytics and advertising tools — Google Analytics, Google Ads, Meta
          Pixel and Microsoft Clarity — which may collect information such as the pages you visit,
          how you interact with them, your device and browser type, and approximate location
          derived from your IP address.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    heading: "How We Use Information",
    body: (
      <>
        <p>We use the information described above to:</p>
        <ul>
          <li>respond to your enquiry and follow up about your requirements;</li>
          <li>understand how visitors use the Website so we can improve it; and</li>
          <li>measure the effectiveness of our advertising.</li>
        </ul>
        <p>
          <LegalPlaceholder>confirm lawful basis / consent requirements for each purpose</LegalPlaceholder>
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "How Information Is Shared",
    body: (
      <>
        <p>
          Form submissions are delivered to our team by email using a third-party email delivery
          service. Analytics and advertising data is processed by the providers named above under
          their own privacy policies. The Website is hosted by a third-party hosting provider.
        </p>
        <p>
          We do not sell the personal information you submit through the Website.{" "}
          <LegalPlaceholder>confirm this commitment and any other disclosures</LegalPlaceholder>
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-storage",
    heading: "Cookies and Browser Storage",
    body: (
      <>
        <p>
          The analytics and advertising tools listed above use cookies and similar technologies.
          In addition, the Website stores a small amount of information in your browser:
        </p>
        <ul>
          <li>
            a flag in local storage recording that you have already submitted the requirements
            form, so the pop-up does not keep appearing; and
          </li>
          <li>
            the contents of a requirements form you have started but not yet sent, kept in
            session storage so it is not lost while you browse, and cleared when you submit or
            close the browser session.
          </li>
        </ul>
        <p>
          You can clear or block cookies and browser storage in your browser settings. Some
          Website features may not work as intended if you do.{" "}
          <LegalPlaceholder>confirm cookie consent requirements</LegalPlaceholder>
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "Data Retention",
    body: (
      <p>
        We keep enquiry information for as long as needed to respond to you and for our
        legitimate business records. <LegalPlaceholder>specify retention period</LegalPlaceholder>
      </p>
    ),
  },
  {
    id: "security",
    heading: "Data Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to protect the information you
        share with us. No method of transmission over the internet is completely secure, so we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights and Choices",
    body: (
      <p>
        You may contact us to request access to, correction of or deletion of the personal
        information you have submitted through the Website.{" "}
        <LegalPlaceholder>confirm applicable data protection law, user rights and grievance officer details</LegalPlaceholder>
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. The updated version will be posted
        on this page with a revised &ldquo;Last updated&rdquo; date. See also our{" "}
        <Link href={routes.terms} className="text-emerald-onlight hover:underline">
          Terms and Conditions
        </Link>
        .
      </p>
    ),
  },
  {
    id: "contact-information",
    heading: "Contact Information",
    body: (
      <>
        <p>For questions about this Privacy Policy or your information, please contact us:</p>
        <LegalContactDetails />
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      path={routes.privacy}
      intro={
        <p>
          Your privacy matters to us. This policy explains what information the {siteConfig.name}{" "}
          website collects and how it is used.
        </p>
      }
      sections={sections}
    />
  );
}

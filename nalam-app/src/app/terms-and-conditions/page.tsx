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
  title: "Terms and Conditions | Nalam Software",
  description:
    "The terms and conditions that apply to your use of the Nalam Software website, operated by Nalam Software, a Thukal Innovatives LLP company.",
  path: routes.terms,
  absoluteTitle: true,
});

const siteHost = new URL(siteConfig.url).host;

const sections: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    body: (
      <>
        <p>
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
          website at {siteHost} (the &ldquo;Website&rdquo;), operated by {siteConfig.name}, a
          Thukal Innovatives LLP company (&ldquo;Nalam&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or
          &ldquo;our&rdquo;).
        </p>
        <p>
          By accessing or using the Website, you agree to be bound by these Terms. If you do not
          agree, please do not use the Website.
        </p>
      </>
    ),
  },
  {
    id: "use-of-the-website",
    heading: "Use of the Website",
    body: (
      <>
        <p>You agree to use the Website only for lawful purposes. In particular, you agree not to:</p>
        <ul>
          <li>use the Website in any way that breaches applicable law or regulation;</li>
          <li>attempt to gain unauthorized access to the Website, its servers or related systems;</li>
          <li>submit false, misleading or malicious information through any form on the Website;</li>
          <li>interfere with the normal operation or security of the Website.</li>
        </ul>
      </>
    ),
  },
  {
    id: "product-information",
    heading: "Information About Our Products",
    body: (
      <>
        <p>
          The Website describes Nalam&apos;s Hospital Management System, Laboratory Management
          System, Clinic Management System and custom healthcare software development services
          for general information purposes. Descriptions, features and examples on the Website —
          including illustrative examples such as sample KK AI conversations — do not form a
          contractual offer.
        </p>
        <p>
          Pricing is available on request based on each organization&apos;s requirements. The
          supply of any Nalam software or service is governed by a separate written agreement
          between you and Nalam. <LegalPlaceholder>confirm wording on separate service agreements</LegalPlaceholder>
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    heading: "Enquiries and Requirement Submissions",
    body: (
      <>
        <p>
          When you submit your details or requirements through the Website (for example, through
          the contact page or the requirements pop-up), you confirm that the information you
          provide is accurate and that you are authorized to share it. Submitting an enquiry does
          not create a contract or oblige either party to proceed.
        </p>
        <p>
          How we handle the information you submit is described in our{" "}
          <Link href={routes.privacy} className="text-emerald-onlight hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: (
      <p>
        Unless otherwise stated, the content of the Website — including text, graphics, logos,
        product names and design — is owned by or licensed to Nalam and is protected by
        applicable intellectual property laws. You may view and print pages for your own
        reference, but you may not reproduce, distribute or modify Website content for
        commercial purposes without our prior written permission. Client names and logos shown
        on the Website remain the property of their respective owners.
      </p>
    ),
  },
  {
    id: "third-party-links",
    heading: "Third-Party Links and Services",
    body: (
      <p>
        The Website may link to, or use services provided by, third parties. We are not
        responsible for the content, policies or practices of third-party websites or services,
        and your use of them is subject to their own terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    heading: "Disclaimer",
    body: (
      <p>
        We aim to keep the Website accurate and available, but it is provided on an &ldquo;as
        is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, to the
        extent permitted by law. <LegalPlaceholder>confirm disclaimer scope and wording</LegalPlaceholder>
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    heading: "Limitation of Liability",
    body: (
      <p>
        To the extent permitted by law, Nalam will not be liable for any indirect or
        consequential loss arising from your use of, or inability to use, the Website.{" "}
        <LegalPlaceholder>confirm limitation of liability terms</LegalPlaceholder>
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. The updated version will be posted on this
        page with a revised &ldquo;Last updated&rdquo; date. Continued use of the Website after
        changes are posted means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law and Jurisdiction",
    body: (
      <p>
        These Terms are governed by the laws of <LegalPlaceholder>governing law</LegalPlaceholder>,
        and any disputes will be subject to the jurisdiction of the courts at{" "}
        <LegalPlaceholder>jurisdiction / venue</LegalPlaceholder>.
      </p>
    ),
  },
  {
    id: "contact-information",
    heading: "Contact Information",
    body: (
      <>
        <p>If you have any questions about these Terms, please contact us:</p>
        <LegalContactDetails />
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      title="Terms and Conditions"
      path={routes.terms}
      intro={
        <p>
          Please read these terms carefully. They explain the rules for using the {siteConfig.name}{" "}
          website.
        </p>
      }
      sections={sections}
    />
  );
}

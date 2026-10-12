import type { Metadata } from "next";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { RelatedArticlesSection } from "@/components/sections/RelatedArticlesSection";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { SolutionPageTemplate } from "@/components/sections/SolutionPageTemplate";
import { cmsFaqs, products } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { showcaseInfoChips, solutionContent } from "@/lib/solutions-content";
import { buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Clinic Management System Software | Nalam Software",
  description:
    "Clinic management system software from Nalam: manage appointments, consultations, procedures, treatment plans, pharmacy and billing in one platform.",
  path: products.cms.landingSlug,
  absoluteTitle: true,
  keywords: [
    "Clinic Management System Software",
    "Clinic Management System",
    "Clinic Management Software",
    "Clinic Software",
  ],
});

export default function ClinicManagementSystemPage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(cmsFaqs)} />
      <SolutionPageTemplate
        product={products.cms}
        content={solutionContent.cms}
        heroEyebrow="Clinic Management System"
        heroMedia={
          <SolutionHeroMedia
            photoSrc={products.cms.photoSrc}
            alt="Doctor consulting a patient beside a screen showing Nalam clinic management system software with patient records"
            chips={showcaseInfoChips.cms}
          />
        }
        extraSections={
          <>
            <RelatedArticlesSection
              title="Guides to Clinic Management Software"
              description="Read more on appointment scheduling and on digital patient records and billing for clinics."
              articles={[
                {
                  title: "How Clinic Management Software Streamlines Appointment Scheduling and Daily Operations",
                  description:
                    "How clinic management software in India handles booking, doctor availability, walk-ins and check-in.",
                  slug: "clinic-appointment-scheduling-software",
                },
                {
                  title: "How Digital Patient Records and Billing Software Help Clinics Work More Efficiently",
                  description:
                    "How clinic patient management software connects records, prescriptions, treatment plans and billing.",
                  slug: "clinic-patient-records-and-billing",
                },
              ]}
            />
            <SolutionFaqSection
              title="Clinic Management System FAQ"
              description="Common questions about appointments, treatment plans and customization for Nalam's Clinic Management System."
              items={cmsFaqs}
            />
          </>
        }
      />
    </>
  );
}

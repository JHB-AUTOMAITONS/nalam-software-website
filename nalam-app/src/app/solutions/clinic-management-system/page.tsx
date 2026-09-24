import type { Metadata } from "next";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { SolutionPageTemplate } from "@/components/sections/SolutionPageTemplate";
import { cmsFaqs, products } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { showcaseInfoChips, solutionContent } from "@/lib/solutions-content";
import { buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Clinic Management Software | Nalam Software",
  description:
    "Nalam Clinic Management Software connects appointments, consultations, procedures, treatment plans, pharmacy, billing and patient history in one intelligent clinic platform.",
  path: products.cms.landingSlug,
  absoluteTitle: true,
  keywords: [
    "Clinic Management Software",
    "Clinic Management System Software",
    "Clinic Management System",
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
            alt="Clinic Management Software for connected patient care"
            chips={showcaseInfoChips.cms}
          />
        }
        extraSections={
          <SolutionFaqSection
            title="Clinic Management System FAQ"
            description="Common questions about appointments, treatment plans and customization for Nalam's Clinic Management System."
            items={cmsFaqs}
          />
        }
      />
    </>
  );
}

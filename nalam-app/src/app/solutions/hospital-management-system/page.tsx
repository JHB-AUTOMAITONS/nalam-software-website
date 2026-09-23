import type { Metadata } from "next";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { SolutionPageTemplate } from "@/components/sections/SolutionPageTemplate";
import { hmsFaqs, products } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { showcaseInfoChips, solutionContent } from "@/lib/solutions-content";
import { buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Hospital Management System | Nalam Software",
  description:
    "Nalam Hospital Management System connects appointments, patient care, inpatient services, laboratory, radiology, pharmacy, billing and hospital operations in one connected platform.",
  path: products.hms.landingSlug,
  absoluteTitle: true,
  keywords: [
    "Hospital Management System",
    "Hospital Management Software",
    "Hospital Management System Software",
    "Hospital Software",
  ],
});

export default function HospitalManagementSystemPage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(hmsFaqs)} />
      <SolutionPageTemplate
        product={products.hms}
        content={solutionContent.hms}
        heroMedia={
          <SolutionHeroMedia
            photoSrc={products.hms.photoSrc}
            alt="Hospital Management System software for connected patient care"
            chips={showcaseInfoChips.hms}
          />
        }
        extraSections={
          <SolutionFaqSection
            title="Hospital Management System FAQ"
            description="Common questions about admissions, departments, billing and customization for Nalam's Hospital Management System."
            items={hmsFaqs}
          />
        }
      />
    </>
  );
}

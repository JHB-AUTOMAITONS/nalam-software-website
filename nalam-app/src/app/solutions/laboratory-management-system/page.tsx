import type { Metadata } from "next";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { LmsEfficiencySection } from "@/components/sections/LmsEfficiencySection";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { SolutionPageTemplate } from "@/components/sections/SolutionPageTemplate";
import { lmsFaqs, products } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { showcaseInfoChips, solutionContent } from "@/lib/solutions-content";
import { buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Laboratory Management System Software | Nalam Software",
  description:
    "Laboratory management system software from Nalam: manage test orders, barcode sample tracking, lab machine integration, validation and reports in one platform.",
  path: products.lms.landingSlug,
  absoluteTitle: true,
  keywords: [
    "Laboratory Management System Software",
    "Laboratory Management System",
    "Laboratory Software",
    "Laboratory Management Software",
  ],
});

export default function LaboratoryManagementSystemPage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(lmsFaqs)} />
      <SolutionPageTemplate
        product={products.lms}
        content={solutionContent.lms}
        heroMedia={
          <SolutionHeroMedia
            photoSrc={products.lms.photoSrc}
            alt="Laboratory technician pipetting a sample beside a lab analyzer, illustrating Nalam laboratory management system software for sample processing"
            chips={showcaseInfoChips.lms}
          />
        }
        extraSections={
          <>
            <LmsEfficiencySection />
            <SolutionFaqSection
              title="Laboratory Management System FAQ"
              description="Common questions about sample tracking, lab machine integration, reporting and customization for Nalam's Laboratory Management System."
              items={lmsFaqs}
            />
          </>
        }
      />
    </>
  );
}

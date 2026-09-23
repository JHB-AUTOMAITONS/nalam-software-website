import type { Metadata } from "next";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { SolutionPageTemplate } from "@/components/sections/SolutionPageTemplate";
import { lmsFaqs, products } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { showcaseInfoChips, solutionContent } from "@/lib/solutions-content";
import { buildFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Laboratory Management System | Nalam Software",
  description:
    "Nalam Laboratory Management System connects test registration, sample collection, lab machine integration, validation, authorization, reporting, inventory and patient history in one platform.",
  path: products.lms.landingSlug,
  absoluteTitle: true,
  keywords: [
    "Laboratory Management System",
    "Laboratory Management System Software",
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
            alt="Laboratory Management System software with laboratory workflow and sample processing"
            chips={showcaseInfoChips.lms}
          />
        }
        extraSections={
          <SolutionFaqSection
            title="Laboratory Management System FAQ"
            description="Common questions about sample tracking, lab machine integration, reporting and customization for Nalam's Laboratory Management System."
            items={lmsFaqs}
          />
        }
      />
    </>
  );
}

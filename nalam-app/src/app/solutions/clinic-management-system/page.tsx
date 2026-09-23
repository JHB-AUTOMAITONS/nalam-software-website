import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { KKAiChatDemo } from "@/components/sections/KKAiChatDemo";
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

/**
 * KK AI section for the CMS page. Copy is adapted from the homepage
 * KKAiSection — no capabilities beyond what that section already states.
 */
function KKAiDetailSection() {
  return (
    <section
      id="kk-ai"
      className="scroll-mt-32 relative overflow-hidden border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14"
    >
      <Container className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
        <RevealOnScroll className="flex min-w-0 flex-col gap-5">
          <Badge tone="ice" className="self-start">
            CMS · Intelligent Assistant
          </Badge>
          <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
            <span className="text-emerald-onlight">KK AI</span> — Your Clinic&apos;s Intelligent Assistant
          </h2>
          <p className="text-balance text-base leading-relaxed text-slate-600">
            KK AI is built into Nalam&apos;s Clinic Management System. Ask questions about your
            clinic in simple language and get answers from your own clinic data — without
            searching through multiple screens or reports.
          </p>
          <p className="text-balance text-base leading-relaxed text-slate-600">
            Because KK AI works from the same platform that runs your appointments,
            consultations, procedures, treatment plans, pharmacy and billing, the answers come
            from the records your clinic already keeps.
          </p>
          <p className="text-sm text-slate-500">
            KK AI answers using your clinic&apos;s own records. Responses reflect the data
            available in your CMS account. The conversation shown is an illustrative example.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="min-w-0">
          <KKAiChatDemo />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export default function ClinicManagementSystemPage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(cmsFaqs)} />
      <SolutionPageTemplate
        product={products.cms}
        content={solutionContent.cms}
        heroMedia={
          <SolutionHeroMedia
            photoSrc={products.cms.photoSrc}
            alt="Clinic Management Software for connected patient care"
            chips={showcaseInfoChips.cms}
          />
        }
        extraSections={
          <>
            <KKAiDetailSection />
            <SolutionFaqSection
              title="Clinic Management System FAQ"
              description="Common questions about appointments, treatment plans, KK AI and customization for Nalam's Clinic Management System."
              items={cmsFaqs}
            />
          </>
        }
      />
    </>
  );
}

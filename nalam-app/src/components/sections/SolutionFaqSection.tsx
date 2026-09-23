import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "./FaqAccordion";

interface SolutionFaqSectionProps {
  title: string;
  description: string;
  items: { question: string; answer: string }[];
}

/** Sitewide section rhythm — matches SolutionPageTemplate's sectionClass. */
const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

export function SolutionFaqSection({ title, description, items }: SolutionFaqSectionProps) {
  return (
    <section id="faq" className={`scroll-mt-32 ${sectionClass}`}>
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow="Support" title={title} description={description} />

        <div className="mx-auto w-full max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}

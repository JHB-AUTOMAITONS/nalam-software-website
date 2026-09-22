import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/constants";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-32 bg-white/40 py-14 backdrop-blur-sm sm:py-16 lg:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Common Questions About Nalam Software"
          description="Answers about our hospital, laboratory and clinic management software, and how Nalam systems can be customized and connected."
          tone="dark"
        />

        <div className="mx-auto w-full max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RequirementsForm } from "./RequirementsForm";

export function RequirementsSection() {
  return (
    <section id="requirements" className="scroll-mt-32 bg-navy-950/55 py-11 backdrop-blur-sm sm:py-16 lg:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Tell Us What You Need"
          title="Tell Us What You Need"
          description="Already have a specific workflow in mind? Tell us your requirements. We can customize Nalam around your organization."
          tone="dark"
        />

        <RevealOnScroll className="mx-auto w-full max-w-3xl rounded-[28px] border border-teal-400/20 bg-white/95 p-6 shadow-elevated backdrop-blur-sm sm:p-10">
          <RequirementsForm />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

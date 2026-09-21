import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { WhyCard } from "./WhyCard";

const reasons = [
  { title: "Connected", description: "Bring departments and workflows together." },
  { title: "Customizable", description: "Adapt the system around your actual requirements." },
  { title: "Intelligent", description: "Use automation, analytics and AI-assisted workflows." },
  { title: "Scalable", description: "Designed to grow with your organization." },
  { title: "Simple", description: "Powerful features without unnecessary complexity." },
  { title: "Healthcare Focused", description: "Built around real healthcare workflows." },
];

export function WhyNalam() {
  return (
    <section className="bg-navy-950/55 py-11 backdrop-blur-sm sm:py-16 lg:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Why Nalam"
          title="Why Healthcare Teams Choose Nalam"
          tone="dark"
        />

        <StaggerGroup as="ul" className="grid gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:gap-4" staggerDelay={0.08}>
          {reasons.map((reason, index) => (
            <WhyCard key={reason.title} index={index} {...reason} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

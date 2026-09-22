import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { FeatureCard } from "./FeatureCard";

const features = [
  { title: "Patient Management", description: "Centralized patient records across every visit and department." },
  { title: "Appointment Management", description: "Scheduling that reduces no-shows and keeps calendars organized." },
  { title: "Doctor Management", description: "Doctor availability, consultations and workload in one view." },
  { title: "Laboratory Management", description: "Test orders, sample tracking and report delivery, fully digitized." },
  { title: "Pharmacy Management", description: "Prescriptions, dispensing and stock movement kept in sync." },
  { title: "Inventory Management", description: "Track stock, reagents and consumables with expiry visibility." },
  { title: "Billing", description: "Transparent, itemized billing across consultations, tests and procedures." },
  { title: "Insurance", description: "Insurance workflows built into the billing and claims process." },
  { title: "Reports", description: "Operational and clinical reports generated without manual compilation." },
  { title: "Analytics", description: "Visibility into patient volume, revenue and department performance." },
  { title: "Role & Access Management", description: "Granular permissions so every user sees only what they need." },
  { title: "Workflow Automation", description: "Reduce repetitive steps across registration, care and billing." },
  { title: "Machine Integration", description: "Direct integration with laboratory instruments and devices." },
  { title: "Patient History", description: "A complete, chronological record of care across every system." },
  { title: "Customization", description: "Screens, fields and workflows adapted to how your team works." },
  { title: "AI Assistance", description: "Ask questions about your data and get answers in plain language." },
];

export function FeatureGrid() {
  return (
    <section className="bg-white/40 py-11 backdrop-blur-sm sm:py-16 lg:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title="Everything You Need to Run Healthcare Smarter"
          description="A complete set of capabilities shared across LMS, HMS and CMS — configured to match how your organization operates."
          tone="dark"
        />

        <StaggerGroup
          as="ul"
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4"
          staggerDelay={0.04}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

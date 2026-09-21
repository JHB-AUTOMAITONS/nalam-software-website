import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ConnectedDiagram } from "./ConnectedDiagram";

const combinations = [
  {
    title: "Hospital + Laboratory",
    description:
      "Hospital doctors can order laboratory tests and laboratory results can flow back into the patient's hospital record.",
  },
  {
    title: "Clinic + Laboratory",
    description:
      "Clinic consultations and prescriptions can connect with laboratory workflows and reports.",
  },
  {
    title: "Hospital + Clinic + Laboratory",
    description:
      "Create a unified healthcare ecosystem where patient information and workflows can move between connected departments and systems.",
  },
];

export function ConnectedSystems() {
  return (
    <section
      id="connected-systems"
      className="scroll-mt-32 bg-navy-950/55 py-11 backdrop-blur-sm sm:py-16 lg:py-20"
    >
      <Container className="flex flex-col gap-9">
        <SectionHeading
          eyebrow="Nalam Connected Healthcare"
          title="Connect Your Hospital, Clinic and Laboratory"
          description="Nalam Software can combine multiple systems according to your requirements — so information moves with the patient, not just within one department."
          tone="dark"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
          <ConnectedDiagram />

          <div className="flex flex-col gap-6">
            {combinations.map((combo, index) => (
              <RevealOnScroll key={combo.title} delay={index * 0.08}>
                <div className="flex gap-5 rounded-2xl border border-teal-400/15 bg-white/[0.06] p-6 shadow-soft backdrop-blur-sm">
                  <span className="font-mono text-sm text-teal-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-lg font-medium text-white">{combo.title}</h3>
                    <p className="text-sm leading-relaxed text-mist-100/70">{combo.description}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            <RevealOnScroll delay={0.3} className="rounded-2xl border border-teal-400/25 bg-navy-950/70 p-6">
              <p className="font-display text-xl font-medium text-white">
                One patient. Connected departments. One intelligent ecosystem.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}

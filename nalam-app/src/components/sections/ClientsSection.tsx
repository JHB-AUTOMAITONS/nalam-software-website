import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { ClientCard } from "./ClientCard";

const clients = [
  {
    id: "maruthu",
    name: "Maruthu Surgicals",
    subtitle: "Coimbatore",
    logoSrc: "/images/clients/maruthu-surgicals.jpg",
  },
  {
    id: "surecare",
    name: "SureCare Lab",
    logoSrc: "/images/clients/surecare.png",
  },
  {
    id: "variyar",
    name: "Variyar",
    subtitle: "School of Rehabilitation and Behavioral Sciences",
    logoSrc: "/images/clients/variyar.png",
  },
  {
    id: "salem-cosmetic",
    name: "Salem Cosmetic Clinic",
    logoSrc: "/images/clients/salem-cosmetic.jpg",
  },
];

export function ClientsSection() {
  return (
    <section className="bg-white/40 py-14 backdrop-blur-sm sm:py-16 lg:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow="Trusted By" title="Our Valuable Clients" tone="dark" />

        <StaggerGroup
          as="ul"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-4"
          staggerDelay={0.08}
        >
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              subtitle={client.subtitle}
              logoSrc={client.logoSrc}
            />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

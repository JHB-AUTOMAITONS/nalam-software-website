import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { WhyNalam } from "@/components/sections/WhyNalam";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Nalam Software",
  description:
    "Nalam Software builds connected healthcare management software — Hospital Management System, Lab Management System and Clinic Management System — customized around how healthcare teams actually work.",
  path: "/about",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-[#F5F8F6] pt-32 pb-20 sm:pt-40 sm:pb-24">
        <Container>
          <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
              A Healthcare Technology Company, Built Around Connection
            </h1>
            <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              Nalam Software provides hospital, laboratory and clinic
              management software designed to work independently or together
              — so healthcare teams spend less time moving between systems
              and more time with patients.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll className="flex flex-col gap-4">
            <SectionHeading
              align="left"
              eyebrow="What We Build"
              title="Three Systems. One Design Philosophy."
            />
            <p className="text-base leading-relaxed text-slate-600">
              Hospital Management System, Lab Management System
              and Clinic Management System are each built to run
              independently for a single hospital, laboratory or clinic — or
              to connect together into one unified healthcare platform. That
              design decision shapes everything: shared patient records,
              consistent interfaces and workflows that can be customized
              without rebuilding the system from scratch.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex flex-col gap-4">
            <SectionHeading
              align="left"
              eyebrow="How We Work"
              title="Software Shaped by Real Healthcare Workflows"
            />
            <p className="text-base leading-relaxed text-slate-600">
              We work directly with hospital administrators, laboratory
              managers and clinic owners to understand how their teams
              actually operate, then configure Nalam Software around those
              workflows — including custom screens, reports, roles and
              integrations where needed.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <WhyNalam />
      <FinalCta />
    </>
  );
}

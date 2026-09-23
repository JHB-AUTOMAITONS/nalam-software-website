import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { customizationOptions, products, routes, siteConfig, type ProductId } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

const pagePath = routes.customSolutions;

export const metadata: Metadata = buildMetadata({
  title: "Custom Healthcare Software Development | Nalam Software",
  description:
    "Nalam provides custom healthcare software development and custom healthcare solutions designed around your organization's workflows, integrations, reports and operational requirements.",
  path: pagePath,
  absoluteTitle: true,
  keywords: [
    "Custom Healthcare Software Development",
    "Custom Healthcare Software",
    "Custom Healthcare Solutions",
  ],
});

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Custom Solutions", path: pagePath },
];

/**
 * One-line explanations for each option in `customizationOptions`
 * (constants.ts). Keyed by the exact option label so the list itself stays
 * shared with the homepage CustomizationSection.
 */
const customizationDetails: Record<(typeof customizationOptions)[number], string> = {
  "Custom workflows":
    "Shape the software around the order in which your teams already work, instead of changing your process to fit the software.",
  "Custom screens":
    "Arrange screens around the information your staff use most, so everyday tasks take fewer steps.",
  "Custom reports":
    "Build reports around the figures your management team actually needs to review.",
  "Custom fields":
    "Capture the additional details your organization records that a standard form doesn't include.",
  "Custom roles & permissions":
    "Define who can see and do what, so every user sees only what they need.",
  "Custom integrations":
    "Plan integrations around the specific systems and devices your workflow depends on, as part of your requirements.",
  "Custom dashboards":
    "Bring the numbers that matter to your hospital, laboratory or clinic into one view.",
  "Custom automation":
    "Reduce repetitive steps across registration, care and billing.",
  "Custom billing workflows":
    "Arrange billing around how your organization bills consultations, tests, procedures and packages.",
  "Custom patient workflows":
    "Shape the patient journey around how patients actually move through your organization.",
};

const systemCustomization: { id: ProductId; body: string }[] = [
  {
    id: "hms",
    body: "Adapt the hospital journey — registration, admission, treatment, discharge and billing — and the screens, reports and permissions each department works with.",
  },
  {
    id: "lms",
    body: "Shape the laboratory workflow from test order to final report, along with the reports, dashboards and roles your lab team relies on.",
  },
  {
    id: "cms",
    body: "Tailor consultations, treatment plans, packages, pharmacy and billing to the way your clinic runs, with KK AI working from your own clinic data.",
  },
];

// Adapted from the About page ("How We Work") — no new process claims.
const steps = [
  {
    title: "Tell Us Your Requirements",
    body: "Share how your hospital, laboratory or clinic operates today and what you need your software to do.",
  },
  {
    title: "We Understand Your Workflow",
    body: "We work directly with hospital administrators, laboratory managers and clinic owners to understand how their teams actually operate.",
  },
  {
    title: "We Configure Nalam Around It",
    body: "We then configure Nalam Software around those workflows — including custom screens, reports, roles and integrations where needed — without rebuilding the system from scratch.",
  },
];

const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

export default function CustomHealthcareSoftwarePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Custom Healthcare Software Development",
          serviceType: "Custom Healthcare Software Development",
          description:
            "Customization of Nalam's hospital, laboratory and clinic management software around an organization's workflows, screens, reports, roles, integrations, dashboards, automation and billing.",
          url: `${siteConfig.url}${pagePath}`,
          provider: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <PageBackdrop />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Built Around You"
        title="Custom Healthcare Software Development"
        tagline="Your Healthcare Workflow Is Unique. Your Software Should Be Too."
        actions={
          <>
            <Button href={routes.contact} size="lg" variant="primary" className="w-full sm:w-auto">
              Discuss Your Requirements
            </Button>
            <Button href="#what-we-customize" size="lg" variant="ghost" className="w-full sm:w-auto">
              What We Can Customize
            </Button>
          </>
        }
      >
        <p className="text-balance">
          Nalam offers custom healthcare software development built on our Hospital, Laboratory
          and Clinic Management Systems. We don&apos;t believe every hospital, laboratory or clinic
          should be forced into the same workflow — so Nalam Software can be customized around your
          operational requirements.
        </p>
        <p className="text-balance">
          You focus on healthcare. We take care of the technology. Powered by our infrastructure
          and technology team, we shape Nalam to fit your business logic, workflows and
          requirements.
        </p>
      </PageHero>

      <section id="what-we-customize" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="What We Can Customize"
            title="Custom Healthcare Solutions, Down to the Detail"
            description="Customization isn't a single setting. These are the areas where Nalam can be shaped around how your organization works."
          />

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5">
            {customizationOptions.map((option, index) => (
              <RevealOnScroll
                as="li"
                key={option}
                delay={0.04 + (index % 5) * 0.04}
                className="glass-surface glass-surface-hover flex min-w-0 flex-col gap-2 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft"
              >
                <h3 className="font-display text-base font-medium text-navy-950">{option}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{customizationDetails[option]}</p>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Across Every System"
            title="Custom Healthcare Software for Hospitals, Laboratories and Clinics"
            description="Customization works on top of each Nalam system — on its own, or across a connected combination of systems."
          />

          <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {systemCustomization.map((item, index) => {
              const product = products[item.id];
              return (
                <RevealOnScroll as="li" key={item.id} delay={0.05 + index * 0.05} className="min-w-0">
                  <Link
                    href={product.landingSlug}
                    className="glass-surface group flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft sm:p-6"
                  >
                    <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-emerald-onlight">
                      {product.eyebrow}
                    </span>
                    <h3 className="font-display text-lg font-medium text-navy-950">{product.fullName}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight">
                      Explore our {product.fullName}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="shrink-0 transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="How We Work"
            title="Software Shaped by Real Healthcare Workflows"
          />

          <ol className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <RevealOnScroll
                as="li"
                key={step.title}
                delay={0.05 + index * 0.05}
                className="flex min-w-0 flex-col gap-2 rounded-2xl border border-teal-500/15 bg-white/75 p-5 sm:p-6"
              >
                <span className="font-mono text-xs text-emerald-onlight">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium text-navy-950">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.body}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </Container>
      </section>

      <section className={`${sectionClass} overflow-hidden`}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-500/12 blur-3xl"
        />
        <Container className="relative">
          <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
              Let&apos;s Shape Nalam Around Your Workflow
            </h2>
            <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              Already have a specific workflow in mind? Tell us your requirements, and our team
              will follow up on how Nalam can be customized around your organization.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={routes.contact} size="lg" variant="primary" className="w-full sm:w-auto">
                Talk to Our Team
              </Button>
              <Button href={routes.solutions} size="lg" variant="secondary" className="w-full sm:w-auto">
                View All Solutions
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}

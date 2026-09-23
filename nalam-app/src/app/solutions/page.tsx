import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/ProductCard";
import { productList, products, routes, siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Healthcare Management Solutions | Nalam Software",
  description:
    "Explore Nalam's Hospital, Laboratory and Clinic Management Systems — healthcare management solutions that run on their own or connect into one platform.",
  path: routes.solutions,
  absoluteTitle: true,
  keywords: [
    "healthcare management solutions",
    "Hospital Management System",
    "Laboratory Management System",
    "Clinic Management System",
  ],
});

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Solutions", path: routes.solutions },
];

// Each combination below restates an existing FAQ answer in constants.ts.
const combinations = [
  {
    title: "Hospital + Laboratory",
    body: "When HMS and LMS are connected, hospital doctors can order laboratory tests directly, and laboratory results flow back into the patient's hospital record.",
    links: [products.hms, products.lms],
  },
  {
    title: "Clinic + Laboratory",
    body: "CMS can be connected with LMS so that clinic consultations and prescriptions link with laboratory workflows and reports — a single view of patient investigations without switching systems.",
    links: [products.cms, products.lms],
  },
  {
    title: "One Connected Ecosystem",
    body: "HMS, LMS and CMS can be combined into a single connected healthcare ecosystem, so patient information and workflows move between hospital, clinic and laboratory departments.",
    links: [products.hms, products.lms, products.cms],
  },
];

const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

export default function SolutionsPage() {
  return (
    <>
      <PageBackdrop />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Our Solutions"
        title={siteConfig.tagline}
        tagline="Healthcare Management Solutions for Hospitals, Laboratories and Clinics"
        actions={
          <>
            <Button href="#systems" size="lg" variant="primary" className="w-full sm:w-auto">
              View the Systems
            </Button>
            <Button href={routes.contact} size="lg" variant="ghost" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
          </>
        }
      >
        <p className="text-balance">
          Nalam provides healthcare management solutions for hospitals, diagnostic laboratories
          and clinics: a Hospital Management System, a Laboratory Management System and a Clinic
          Management System.
        </p>
        <p className="text-balance">
          Each system is built to run independently for a single hospital, laboratory or clinic
          — or to connect with the others into one unified healthcare platform, with shared
          patient records and consistent workflows.
        </p>
      </PageHero>

      <section id="systems" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8 sm:gap-9">
          <SectionHeading
            eyebrow="Choose Your System"
            title="Find the Right System for Your Organization"
            description="Pick the system that fits your organization today. Each one can be customized around your workflow."
          />

          <StaggerGroup as="div" className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3" staggerDelay={0.12}>
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Better Together"
            title="Connect Systems as Your Organization Grows"
            description="Nalam systems share one design, so hospital, clinic and laboratory workflows can be connected instead of kept apart."
          />

          <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {combinations.map((combination, index) => (
              <RevealOnScroll
                as="li"
                key={combination.title}
                delay={0.05 + index * 0.05}
                className="glass-surface flex min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm sm:p-6"
              >
                <h3 className="font-display text-lg font-medium text-navy-950">{combination.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{combination.body}</p>
                <ul className="mt-auto flex flex-col gap-1.5 pt-2">
                  {combination.links.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={product.landingSlug}
                        className="text-sm font-medium text-emerald-onlight underline-offset-4 hover:underline"
                      >
                        {product.fullName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container>
          <RevealOnScroll className="glass-surface-strong mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-[28px] border border-teal-500/20 p-6 text-center shadow-soft backdrop-blur-md sm:p-10">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-onlight">
              Built Around You
            </span>
            <h2 className="text-balance font-display text-2xl font-medium leading-tight text-navy-950 sm:text-3xl">
              Your Healthcare Workflow Is Unique. Your Software Should Be Too.
            </h2>
            <p className="max-w-2xl text-balance text-base leading-relaxed text-slate-600">
              Every Nalam system can be customized around your operational requirements — from
              custom screens, reports and fields to roles and permissions, integrations,
              dashboards, automation and billing workflows.
            </p>
            <Button href={routes.customSolutions} size="lg" variant="primary" className="w-full sm:w-auto">
              Explore Custom Healthcare Software Development
            </Button>
          </RevealOnScroll>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

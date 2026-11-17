import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { products, routes, siteConfig } from "@/lib/constants";
import {
  batchExpiry,
  benefits,
  billing,
  comparison,
  faqs,
  featuresSection,
  finalCta,
  heroChips,
  heroIntro,
  heroPhotoAlt,
  heroPhotoPublicPath,
  heroTagline,
  introduction,
  inventory,
  opdIpd,
  pharmacyFeatures,
  pharmacyMeta,
  pharmacyPagePath,
  purchasing,
  setups,
  whatIs,
  whyNalam,
  workflow,
} from "@/lib/pharmacy-page-content";
import { buildMetadata } from "@/lib/seo";
import { buildFaqSchema } from "@/lib/structured-data";

const base = buildMetadata({
  title: pharmacyMeta.title,
  description: pharmacyMeta.description,
  path: pharmacyPagePath,
  absoluteTitle: true,
  keywords: [...pharmacyMeta.keywords],
});

export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, locale: "en_IN" },
};

// Rendered at build time: use the photo only once the file has been added.
const heroPhoto = existsSync(path.join(process.cwd(), "public", heroPhotoPublicPath))
  ? heroPhotoPublicPath
  : undefined;

const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Solutions", path: routes.solutions },
  { name: "Pharmacy Management System", path: pharmacyPagePath },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NALAM Pharmacy Management System",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Hospital Pharmacy Management Software",
  operatingSystem: "Web",
  description: pharmacyMeta.description,
  url: `${siteConfig.url}${pharmacyPagePath}`,
  inLanguage: "en-IN",
  provider: { "@id": `${siteConfig.url}/#organization` },
  isRelatedTo: [products.hms, products.cms].map((p) => ({
    "@type": "SoftwareApplication",
    name: p.fullName,
    url: `${siteConfig.url}${p.landingSlug}`,
  })),
};

function Paragraphs({ items }: { items: string[] }) {
  return (
    <RevealOnScroll className="flex flex-col gap-4 text-base leading-relaxed text-slate-600">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </RevealOnScroll>
  );
}

function Block({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-32 ${sectionClass}`}>
      <Container className="flex max-w-4xl flex-col gap-6">
        <SectionHeading align="left" title={title} />
        {children}
      </Container>
    </section>
  );
}

function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.title}
          className="flex min-w-0 flex-col gap-2 rounded-2xl border border-teal-500/15 bg-white/75 p-5"
        >
          <h3 className="font-display text-lg font-medium text-navy-950">{item.title}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function WorkflowDiagram() {
  return (
    <figure className="flex flex-col gap-4">
      <ol
        aria-label="Pharmacy workflow from prescription to inventory update"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {workflow.steps.map((step, i) => (
          <li
            key={step}
            className="relative flex min-w-0 flex-col gap-1 rounded-2xl border border-teal-500/20 bg-white/80 p-4"
          >
            <span className="font-mono text-xs text-emerald-onlight">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-base font-medium text-navy-950">{step}</span>
          </li>
        ))}
      </ol>
      <figcaption className="grid gap-2 text-sm leading-relaxed text-slate-600 sm:grid-cols-2">
        <p>{workflow.outpatient}</p>
        <p>{workflow.inpatient}</p>
      </figcaption>
    </figure>
  );
}

export default function PharmacyManagementSystemPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={buildFaqSchema(faqs)} />
      <PageBackdrop />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Hospital Pharmacy Software"
        title={pharmacyMeta.h1}
        tagline={heroTagline}
        media={
          <SolutionHeroMedia
            photoSrc={heroPhoto}
            alt={heroPhotoAlt}
            chips={heroPhoto ? heroChips : []}
            priority
          />
        }
        actions={
          <>
            <Button href={routes.contact} size="lg" variant="primary" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
            <Button href="#features" size="lg" variant="ghost" className="w-full sm:w-auto">
              View Features
            </Button>
          </>
        }
      >
        <p className="text-balance">{heroIntro}</p>
      </PageHero>

      <Block title={introduction.title}>
        <Paragraphs items={introduction.paragraphs} />
      </Block>

      <Block title={whatIs.title}>
        <Paragraphs items={whatIs.paragraphs} />
        <CardGrid items={whatIs.covers} />
      </Block>

      <section id="features" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Key Features"
            title={featuresSection.title}
            description={featuresSection.description}
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {pharmacyFeatures.map((f, i) => (
              <li
                key={f.title}
                className="glass-surface flex min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-emerald-onlight">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.status === "confirm" ? (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.7rem] font-medium text-slate-600">
                      Scoped in demo
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-lg font-medium leading-snug text-navy-950">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Block title={opdIpd.title}>
        <Paragraphs items={opdIpd.paragraphs} />

      </Block>

      <Block title={inventory.title}>
        <Paragraphs items={inventory.paragraphs} />
      </Block>

      <Block title={batchExpiry.title}>
        <Paragraphs items={batchExpiry.paragraphs} />
      </Block>

      <Block title={purchasing.title}>
        <Paragraphs items={purchasing.paragraphs} />
      </Block>

      <Block title={billing.title}>
        <Paragraphs items={billing.paragraphs} />
      </Block>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-6">
          <SectionHeading title={workflow.title} description={workflow.intro} />
          <WorkflowDiagram />
        </Container>
      </section>

      <section id="integrated-or-standalone" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title={setups.title} />
          <div className="grid gap-4 lg:grid-cols-2">
            {[setups.integrated, setups.standalone].map((opt) => (
              <div key={opt.title} className="flex flex-col gap-3 rounded-2xl border border-teal-500/15 bg-white/75 p-5 sm:p-6">
                <h3 className="font-display text-xl font-medium text-navy-950">{opt.title}</h3>
                {opt.paragraphs.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-slate-600">{p}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Pharmacy is part of the platform in the{" "}
            <Link href={products.cms.landingSlug} className="font-medium text-navy-950 underline underline-offset-2 hover:text-emerald-onlight">
              Clinic Management System
            </Link>
            . For hospitals, see the{" "}
            <Link href={products.hms.landingSlug} className="font-medium text-navy-950 underline underline-offset-2 hover:text-emerald-onlight">
              Hospital Management System
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title={benefits.title} />
          <CardGrid items={benefits.items} />
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title={whyNalam.title} />
          <CardGrid items={whyNalam.items} />
        </Container>
      </section>

      <section className={sectionClass}>
        <Container className="flex flex-col gap-6">
          <SectionHeading title={comparison.title} />
          <div className="overflow-x-auto rounded-2xl border border-teal-500/15 bg-white/80">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Manual versus digital pharmacy management</caption>
              <thead>
                <tr className="bg-teal-500/[0.06] text-navy-950">
                  <th scope="col" className="p-3 font-medium">Area</th>
                  <th scope="col" className="p-3 font-medium">Manual</th>
                  <th scope="col" className="p-3 font-medium">Digital</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {comparison.rows.map(([area, manual, digital]) => (
                  <tr key={area} className="border-t border-teal-500/10 align-top">
                    <th scope="row" className="p-3 font-medium text-navy-900">{area}</th>
                    <td className="p-3">{manual}</td>
                    <td className="p-3">{digital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">{comparison.note}</p>
        </Container>
      </section>

      <SolutionFaqSection
        title="Hospital Pharmacy Software FAQ"
        description="Answers to common questions about pharmacy management systems in hospitals."
        items={faqs}
        renderAllAnswers
      />

      <section className={`${sectionClass} overflow-hidden`}>
        <Container className="relative">
          <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
              {finalCta.title}
            </h2>
            <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              {finalCta.description}
            </p>
            <Button href={routes.contact} size="lg" variant="primary" className="w-full sm:w-auto">
              Book a Free Demo
            </Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}

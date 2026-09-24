import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { products, routes, type Product } from "@/lib/constants";
import type { SolutionPageContent } from "@/lib/solutions-content";
import { buildSoftwareApplicationSchema } from "@/lib/structured-data";

interface SolutionPageTemplateProps {
  product: Product;
  content: SolutionPageContent;
  /** Optional product-specific section(s), rendered after the feature grid. */
  extraSections?: ReactNode;
  /** Optional hero visual (see SolutionHeroMedia) — a full-bleed background at every breakpoint. */
  heroMedia?: ReactNode;
  /**
   * Overrides the small label shown above the hero H1, without changing
   * `product.eyebrow` used elsewhere (homepage cards, /solutions, structured
   * data). Defaults to `product.eyebrow` when omitted.
   */
  heroEyebrow?: string;
}

const accentText: Record<Product["accent"], string> = {
  teal: "text-emerald-onlight",
  navy: "text-ice-700",
  coral: "text-clinic-jade",
};

const accentBorder: Record<Product["accent"], string> = {
  teal: "border-teal-500/20",
  navy: "border-ice-500/25",
  coral: "border-clinic-jade/20",
};

const accentGlow: Record<Product["accent"], string> = {
  teal: "shadow-[0_0_90px_rgba(25,200,120,0.05)]",
  navy: "shadow-[0_0_90px_rgba(5,213,213,0.06)]",
  coral: "shadow-[0_0_90px_rgba(15,157,110,0.05)]",
};

/** Sitewide section rhythm — matches ProductDetail/FeatureGrid/FaqSection. */
const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

function ArrowIcon() {
  return (
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
  );
}

export function SolutionPageTemplate({
  product,
  content,
  extraSections,
  heroMedia,
  heroEyebrow,
}: SolutionPageTemplateProps) {
  const otherProducts = Object.values(products).filter((item) => item.id !== product.id);
  const breadcrumbs = [
    { name: "Home", path: routes.home },
    { name: "Solutions", path: routes.solutions },
    { name: product.fullName, path: product.landingSlug },
  ];

  return (
    <>
      <JsonLd data={buildSoftwareApplicationSchema(product)} />
      <PageBackdrop />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={heroEyebrow ?? product.eyebrow}
        title={content.h1}
        tagline={product.positioning}
        media={heroMedia}
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
        {/* Hero shows only the first, keyword-bearing intro paragraph — kept
            short per the compact hero requirement. Remaining intro paragraphs
            move into the Overview section below instead of stacking in the hero. */}
        <p className="text-balance">{content.intro[0]}</p>
      </PageHero>

      {/* Overview */}
      <section className={sectionClass}>
        <Container className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <SectionHeading align="left" eyebrow="Overview" title={content.overviewTitle} />
            <RevealOnScroll className="flex flex-col gap-4 text-base leading-relaxed text-slate-600">
              {[...content.intro.slice(1), ...content.overview].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            delay={0.1}
            className={`glass-surface-strong relative flex min-w-0 flex-col gap-5 rounded-[28px] border p-5 backdrop-blur-md xs:p-6 sm:p-8 ${accentBorder[product.accent]} ${accentGlow[product.accent]}`}
          >
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-emerald-onlight">
                Built For
              </p>
              <p className="mt-2 font-display text-xl font-medium text-navy-950">{product.audience}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{content.audience}</p>
            </div>
            <div className="rounded-2xl border border-teal-500/15 bg-teal-500/[0.04] p-5">
              <p className="font-display text-lg font-medium text-navy-950">{product.closingStatement}</p>
              <p className={`mt-1 text-sm font-medium ${accentText[product.accent]}`}>
                {product.valueStatement}
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Key Features"
            title={content.featuresTitle}
            description={content.featuresDescription}
          />

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {product.features.map((feature, index) => (
              <RevealOnScroll
                as="li"
                key={feature.title}
                delay={0.05 + (index % 3) * 0.05}
                className="glass-surface glass-surface-hover flex min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft sm:p-6"
              >
                <span className="font-mono text-xs text-emerald-onlight">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium leading-snug text-navy-950">
                  {feature.title}
                </h3>
                {content.featureDetails[feature.title] ? (
                  <p className="text-sm leading-relaxed text-slate-600">
                    {content.featureDetails[feature.title]}
                  </p>
                ) : null}
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      {extraSections}

      {/* Benefits — elaborates product.valueStatement */}
      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Why It Matters" title={content.benefitsTitle} />

          <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {content.benefits.map((benefit, index) => (
              <RevealOnScroll
                as="li"
                key={benefit.title}
                delay={0.05 + index * 0.05}
                className="flex min-w-0 flex-col gap-2 rounded-2xl border border-teal-500/15 bg-white/75 p-5 sm:p-6"
              >
                <h3 className={`font-display text-xl font-medium ${accentText[product.accent]}`}>
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{benefit.body}</p>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      {/* Connected systems + custom solutions (internal linking) */}
      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Connected & Customizable"
            title={content.connectedTitle}
            description={content.connectedIntro}
          />

          <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {otherProducts.map((other, index) => (
              <RevealOnScroll
                as="li"
                key={other.id}
                delay={0.05 + index * 0.05}
                className="min-w-0"
              >
                <Link
                  href={other.landingSlug}
                  className="glass-surface group flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft sm:p-6"
                >
                  <span className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] ${accentText[other.accent]}`}>
                    {other.eyebrow}
                  </span>
                  <h3 className="font-display text-lg font-medium text-navy-950">{other.fullName}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {content.connectWith[other.id] ?? other.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight">
                    Explore our {other.fullName}
                    <ArrowIcon />
                  </span>
                </Link>
              </RevealOnScroll>
            ))}

            <RevealOnScroll as="li" delay={0.15} className="min-w-0">
              <Link
                href={routes.customSolutions}
                className="group flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-teal-500/25 bg-teal-500/[0.05] p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-teal-500/45 hover:shadow-soft sm:p-6"
              >
                <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-emerald-onlight">
                  Built Around You
                </span>
                <h3 className="font-display text-lg font-medium text-navy-950">Custom Healthcare Software</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  The {product.fullName} can be customized around your workflow — custom screens,
                  reports, fields, roles and permissions, integrations, dashboards, automation and
                  billing workflows.
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight">
                  Explore custom healthcare software development
                  <ArrowIcon />
                </span>
              </Link>
            </RevealOnScroll>
          </ul>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className={`${sectionClass} overflow-hidden`}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-500/12 blur-3xl"
        />
        <Container className="relative">
          <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
              {product.closingStatement}
            </h2>
            <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              {content.closing}
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

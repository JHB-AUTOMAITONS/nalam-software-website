import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedArticlesSection } from "@/components/sections/RelatedArticlesSection";
import { RequirementsForm } from "@/components/sections/RequirementsForm";
import { SolutionFaqSection } from "@/components/sections/SolutionFaqSection";
import { SolutionHeroMedia } from "@/components/sections/SolutionHeroMedia";
import { countryPageList, countryTransparencyNote, countryWhyConsider, type CountryPage } from "@/lib/country-pages";
import { productList, routes } from "@/lib/constants";

/** Sitewide section rhythm — matches SolutionPageTemplate's sectionClass. */
const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

/** Country-qualified link text for each product, so anchors differ from the product pages' own wording. */
const productLinkText: Record<string, (country: string) => string> = {
  hms: (country) => `Hospital management system for ${country}`,
  lms: (country) => `Laboratory management software for ${country}`,
  cms: (country) => `Clinic management software for ${country}`,
};

export function CountryLandingPage({ page }: { page: CountryPage }) {
  const breadcrumbs = [
    { name: "Home", path: routes.home },
    { name: `Hospital Management Software in ${page.country}`, path: page.path },
  ];
  const otherCountries = countryPageList.filter((item) => item.slug !== page.slug);

  return (
    <>
      <PageBackdrop />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page.eyebrow}
        title={page.h1}
        media={<SolutionHeroMedia photoSrc={page.heroImage.src} alt={page.heroImage.alt} chips={[]} />}
        actions={
          <>
            <Button href="#book-demo" size="lg" variant="primary" className="w-full sm:w-auto">
              Book a Demo
            </Button>
            <Button href={routes.solutions} size="lg" variant="ghost" className="w-full sm:w-auto">
              Explore Healthcare Solutions
            </Button>
          </>
        }
      >
        <p className="text-balance">{page.heroIntro}</p>
        <p className="text-balance text-sm text-slate-600">{page.heroSupport}</p>
      </PageHero>

      {/* Challenges — numbered card grid */}
      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Operational Context" title={page.challengesTitle} description={page.challengesIntro} />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {page.challenges.map((item, index) => (
              <RevealOnScroll
                as="li"
                key={item.title}
                delay={0.05 + (index % 2) * 0.05}
                className="glass-surface flex min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm sm:p-6"
              >
                <span className="font-mono text-xs text-emerald-onlight">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-medium leading-snug text-navy-950">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      {/* How Nalam helps — intro column beside accent-ruled capability list */}
      <section className={sectionClass}>
        <Container className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-12">
          <SectionHeading align="left" eyebrow="How Nalam Helps" title={page.helpsTitle} description={page.helpsIntro} />
          <ul className="flex flex-col gap-3 sm:gap-4">
            {page.helps.map((item, index) => (
              <RevealOnScroll
                as="li"
                key={item.title}
                delay={0.05 + index * 0.05}
                className="min-w-0 rounded-2xl border border-teal-500/15 border-l-4 border-l-teal-500 bg-white/75 p-5 sm:p-6"
              >
                <h3 className="font-display text-lg font-medium text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      {/* Product solutions — links to the existing product pages */}
      <section id="solutions" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Relevant Solutions"
            title={`Hospital, Laboratory and Clinic Management for ${page.country}`}
            description={page.solutionsIntro}
          />
          <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {productList.map((product, index) => (
              <RevealOnScroll as="li" key={product.id} delay={0.05 + index * 0.05} className="min-w-0">
                <Link
                  href={product.landingSlug}
                  className="glass-surface group flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-ice-500/35 hover:shadow-soft sm:p-6"
                >
                  <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-emerald-onlight">
                    {product.eyebrow}
                  </span>
                  <h3 className="font-display text-lg font-medium text-navy-950">{product.fullName}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
                  <span className="mt-auto pt-2 text-sm font-semibold text-navy-950 transition-colors group-hover:text-emerald-onlight">
                    {productLinkText[product.id](page.country)} &rarr;
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </section>

      {/* Implementation and regulatory considerations */}
      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Before You Decide" title={page.contextTitle} description={page.contextIntro} />

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
            <ul className="flex flex-col gap-3 sm:gap-4">
              {page.considerations.map((item, index) => (
                <RevealOnScroll
                  as="li"
                  key={item.title}
                  delay={0.05 + index * 0.04}
                  className="min-w-0 rounded-2xl border border-ice-500/15 bg-white/75 p-5 sm:p-6"
                >
                  <h3 className="font-display text-lg font-medium text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </RevealOnScroll>
              ))}
            </ul>

            <RevealOnScroll
              delay={0.1}
              className="glass-surface-strong flex min-w-0 flex-col gap-5 rounded-[28px] border border-teal-500/20 p-5 backdrop-blur-md sm:p-8"
            >
              <div>
                <h3 className="font-display text-lg font-medium text-navy-950">Official sources</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{page.sourcesNote}</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {page.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-onlight underline-offset-2 [overflow-wrap:anywhere] hover:underline"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-teal-500/15 bg-teal-500/[0.04] p-4">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-onlight">
                  Transparency
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{countryTransparencyNote}</p>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Why consider */}
      <section className={sectionClass}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Why Consider Nalam" title={`What You Can Evaluate in a ${page.country} Demo`} />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {countryWhyConsider.map((item, index) => (
              <RevealOnScroll
                as="li"
                key={item.title}
                delay={0.05 + (index % 2) * 0.05}
                className="flex min-w-0 flex-col gap-2 rounded-2xl border border-teal-500/15 bg-white/75 p-5 sm:p-6"
              >
                <h3 className="font-display text-lg font-medium text-emerald-onlight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
              </RevealOnScroll>
            ))}
          </ul>
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-slate-600">
            Want to go further? Nalam can also be{" "}
            <Link href={routes.customSolutions} className="font-medium text-emerald-onlight hover:underline">
              customized through custom healthcare software development
            </Link>
            . Pricing is based on your requirements.
          </p>
        </Container>
      </section>

      {page.relatedArticles ? (
        <RelatedArticlesSection
          title={`Guides for ${page.country}`}
          description="Further reading to help you evaluate software for your organization."
          articles={page.relatedArticles}
        />
      ) : null}

      <SolutionFaqSection
        title={`Questions From ${page.country} Healthcare Providers`}
        description="Straight answers on fit, local requirements and what we do and do not claim."
        items={page.faqs}
      />

      {/* Conversion CTA — reuses the site's lead form */}
      <section id="book-demo" className={`scroll-mt-32 overflow-hidden ${sectionClass}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-500/12 blur-3xl"
        />
        <Container className="relative flex flex-col gap-8">
          <SectionHeading
            eyebrow="Next Step"
            title={`Book a Demo for Your ${page.country} Organization`}
            description="Tell us your organization type, size and workflow. Our team will follow up to discuss fit, walk through the relevant system, and answer your questions on implementation, support and data handling for your location."
          />
          <RevealOnScroll className="glass-surface-strong mx-auto w-full max-w-3xl rounded-[28px] border border-ice-500/20 p-6 shadow-elevated backdrop-blur-sm sm:p-10">
            <RequirementsForm />
          </RevealOnScroll>
        </Container>
      </section>

      {/* Country navigation */}
      <section className="border-t border-teal-500/15 bg-white/40 py-8 backdrop-blur-sm">
        <Container>
          <nav aria-label="Healthcare software by country" className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-onlight">
              Healthcare software in other countries
            </h2>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              {otherCountries.map((item) => (
                <li key={item.slug}>
                  <Link href={item.path} className="text-slate-600 transition-colors hover:text-navy-950">
                    Hospital management software in {item.country}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
}

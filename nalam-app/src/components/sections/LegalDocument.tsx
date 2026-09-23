import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageBackdrop } from "@/components/sections/PageBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { routes, siteConfig } from "@/lib/constants";

/**
 * Visible inline marker for text that must be reviewed by legal counsel
 * before launch. Search the codebase for "LegalPlaceholder" to find every
 * outstanding item.
 */
export function LegalPlaceholder({ children }: { children?: ReactNode }) {
  return (
    <mark className="rounded bg-signal-amber/15 px-1 py-0.5 font-medium text-signal-amber ring-1 ring-inset ring-signal-amber/30">
      [Placeholder — confirm with legal{children ? <>: {children}</> : null}]
    </mark>
  );
}

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

interface LegalDocumentProps {
  title: string;
  path: string;
  intro: ReactNode;
  sections: LegalSection[];
}

/** Company contact block shared by both legal documents (facts from siteConfig). */
export function LegalContactDetails() {
  return (
    <address className="not-italic">
      <strong className="font-medium text-navy-950">{siteConfig.name}</strong>
      <br />
      A Thukal Innovatives LLP company
      <br />
      {siteConfig.contact.address}
      <br />
      Email:{" "}
      <a href={`mailto:${siteConfig.contact.email}`} className="text-emerald-onlight hover:underline">
        {siteConfig.contact.email}
      </a>
      <br />
      Phone:{" "}
      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
        className="text-emerald-onlight hover:underline"
      >
        {siteConfig.contact.phone}
      </a>
    </address>
  );
}

export function LegalDocument({ title, path, intro, sections }: LegalDocumentProps) {
  return (
    <>
      <PageBackdrop />

      <PageHero
        breadcrumbs={[
          { name: "Home", path: routes.home },
          { name: title, path },
        ]}
        eyebrow="Legal"
        title={title}
      >
        <p className="text-sm text-slate-500">
          Last updated: <LegalPlaceholder>effective date</LegalPlaceholder>
        </p>
        <div className="text-balance">{intro}</div>
      </PageHero>

      <section className="border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14">
        <Container className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
          <nav
            aria-label={`${title} sections`}
            className="glass-surface min-w-0 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm lg:sticky lg:top-32"
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-onlight">
              On This Page
            </p>
            <ol className="mt-3 flex flex-col gap-2 text-sm">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-slate-600 transition-colors hover:text-navy-950">
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="glass-surface-strong flex min-w-0 flex-col gap-8 rounded-[28px] border border-ice-500/20 p-5 text-base leading-relaxed text-slate-600 shadow-soft xs:p-6 sm:p-10">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="font-display text-xl font-medium text-navy-950 sm:text-2xl">
                  {index + 1}. {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3 [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:marker:text-emerald-onlight">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

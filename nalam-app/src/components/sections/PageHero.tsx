import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface PageHeroProps {
  breadcrumbs: { name: string; path: string }[];
  eyebrow?: string;
  /** Rendered as the page's single H1. */
  title: ReactNode;
  /** Short positioning line shown under the H1 (not a heading). */
  tagline?: ReactNode;
  /** Lead paragraph(s). The first paragraph should carry the page's primary keyword. */
  children?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  /**
   * Optional visual composition, rendered as a full-bleed background layer
   * behind the text at every breakpoint — one hero, one image, one
   * composition, never a separate image block. When omitted, the hero stays
   * single-column as before.
   */
  media?: ReactNode;
}

/**
 * Shared hero for inner pages. Top padding clears the fixed glass header and
 * mirrors the homepage Hero scale (pt-24 / xs:pt-26 / sm:pt-32 / lg:pt-36).
 * When `media` is passed, the image becomes a full-bleed background layer for
 * the whole hero and the text sits on top of it with a gradient scrim behind
 * it (one composition), instead of a second column beside the text.
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  tagline,
  children,
  actions,
  align = "left",
  media,
}: PageHeroProps) {
  const alignClass = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";

  const textColumn = (
    <RevealOnScroll className={`mt-5 flex min-w-0 max-w-3xl flex-col gap-5 sm:mt-6 sm:gap-6 ${alignClass}`}>
      {eyebrow ? <Badge tone="teal">{eyebrow}</Badge> : null}

      <h1 className="min-w-0 max-w-full text-balance font-display text-[clamp(1.85rem,7vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      {tagline ? (
        <p className="text-balance font-display text-xl font-medium leading-snug tracking-tight text-emerald-onlight sm:text-2xl">
          {tagline}
        </p>
      ) : null}

      {children ? (
        <div className="flex min-w-0 max-w-2xl flex-col gap-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {children}
        </div>
      ) : null}

      {actions ? (
        <div
          className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${
            align === "center" ? "sm:justify-center" : ""
          }`}
        >
          {actions}
        </div>
      ) : null}
    </RevealOnScroll>
  );

  if (media) {
    return (
      <section className="relative isolate overflow-hidden pt-32 pb-10 xs:pt-36 sm:pt-40 sm:pb-12 lg:pt-40 lg:pb-14">
        {/* Full-bleed image behind the whole hero at every breakpoint — one
            composition, never a separate image block. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {media}
        </div>

        {/* Mobile/tablet: soft ice-blue vertical scrim over the whole image so
            text stays readable while the photo remains visible through it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(239,250,248,0.88) 0%, rgba(239,250,248,0.72) 45%, rgba(239,250,248,0.9) 100%)",
          }}
        />

        {/* Desktop: horizontal scrim behind the text only, fading smoothly
            into the photo on the right rather than a visible rectangle. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,248,246,0.97) 0%, rgba(245,248,246,0.92) 30%, rgba(245,248,246,0.6) 52%, rgba(245,248,246,0.1) 72%, transparent 88%)",
          }}
        />

        <Container className="relative">
          <Breadcrumbs items={breadcrumbs} variant="inline" />

          <RevealOnScroll className="mt-4 flex min-w-0 max-w-[620px] flex-col gap-4 sm:mt-5">
            {eyebrow ? <Badge tone="teal">{eyebrow}</Badge> : null}

            <h1 className="min-w-0 max-w-full text-balance font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-navy-950 lg:text-[3.75rem]">
              {title}
            </h1>

            {tagline ? (
              <p className="text-balance font-display text-lg font-medium leading-snug tracking-tight text-emerald-onlight sm:text-xl">
                {tagline}
              </p>
            ) : null}

            {children ? (
              <div className="flex min-w-0 max-w-xl flex-col gap-3 text-base leading-relaxed text-slate-600">
                {children}
              </div>
            ) : null}

            {actions ? (
              <div className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">{actions}</div>
            ) : null}
          </RevealOnScroll>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-8 xs:pt-26 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(57,255,136,0.08), transparent 45%), radial-gradient(circle at 88% 70%, rgba(5,213,213,0.08), transparent 42%)",
        }}
      />

      <Container className="relative">
        <Breadcrumbs
          items={breadcrumbs}
          variant="inline"
          className={align === "center" ? "flex justify-center" : undefined}
        />

        {textColumn}
      </Container>
    </section>
  );
}

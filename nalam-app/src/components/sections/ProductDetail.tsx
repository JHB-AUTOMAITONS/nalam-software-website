import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Product } from "@/lib/constants";

interface ProductDetailProps {
  product: Product;
  reverse?: boolean;
  index: number;
}

const accentText: Record<Product["accent"], string> = {
  teal: "text-emerald-onlight",
  navy: "text-ice-700",
  coral: "text-clinic-jade",
};

const accentBadge: Record<Product["accent"], string> = {
  teal: "border-teal-500/30 bg-teal-500/[0.08] text-emerald-onlight shadow-[0_0_20px_rgba(25,200,120,0.06)]",
  navy: "border-ice-500/30 bg-ice-500/[0.08] text-ice-700 shadow-[0_0_20px_rgba(5,213,213,0.08)]",
  coral: "border-clinic-jade/30 bg-clinic-jade/[0.08] text-clinic-jade shadow-[0_0_20px_rgba(15,157,110,0.06)]",
};

const accentGlow: Record<Product["accent"], string> = {
  teal: "shadow-[0_0_90px_rgba(25,200,120,0.05)]",
  navy: "shadow-[0_0_90px_rgba(5,213,213,0.06)]",
  coral: "shadow-[0_0_90px_rgba(15,157,110,0.05)]",
};

const accentBorder: Record<Product["accent"], string> = {
  teal: "border-teal-500/20",
  navy: "border-ice-500/25",
  coral: "border-clinic-jade/20",
};

const accentNumber: Record<Product["accent"], string> = {
  teal: "text-emerald-onlight/70",
  navy: "text-ice-700/70",
  coral: "text-clinic-jade/70",
};

export function ProductDetail({ product, reverse = false, index }: ProductDetailProps) {
  return (
    <section
      id={product.id}
      className="scroll-mt-32 relative isolate overflow-hidden border-t border-teal-500/15 bg-white/40 py-14 backdrop-blur-sm sm:py-16 lg:py-20"
    >
      {/* Directional fade at the section edges so LMS/HMS/CMS read as distinct
          showcases against their neighbours, without hiding the global backdrop mid-section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/45 to-transparent sm:h-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/45 to-transparent sm:h-24"
      />

      <Container>
        <RevealOnScroll
          className={`relative isolate overflow-hidden rounded-[28px] border p-4 backdrop-blur-md xs:p-6 sm:p-8 lg:p-10 ${accentBorder[product.accent]} ${accentGlow[product.accent]}`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-white/78 backdrop-blur-md"
          />

          <div
            className={`grid min-w-0 grid-cols-1 items-center gap-9 lg:grid-cols-2 lg:gap-12 ${
              reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="flex min-w-0 flex-col gap-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`font-mono text-xs tracking-[0.18em] ${accentNumber[product.accent]}`}>
                  {String(index).padStart(2, "0")} — NALAM {product.id.toUpperCase()}
                </span>
              </div>

              <Badge
                tone={product.accent === "coral" ? "coral" : product.accent === "navy" ? "ice" : "teal"}
                className={`border ${accentBadge[product.accent]} tracking-[0.2em]`}
              >
                {product.eyebrow}
              </Badge>
              <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
                {product.fullName}
              </h2>
              <p
                className={`text-lg font-medium ${accentText[product.accent]}`}
              >
                {product.positioning}
              </p>
              <p className="text-balance text-base leading-relaxed text-slate-600">
                {product.description}
              </p>

              <div className="rounded-2xl border border-teal-500/15 bg-teal-500/[0.04] p-5">
                <p className="font-display text-lg font-medium text-navy-950">{product.closingStatement}</p>
                <p className="mt-1 text-sm text-slate-600">{product.valueStatement}</p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button href="/#requirements" size="lg" className="w-full sm:w-auto">
                  Tell Us Your Requirements
                </Button>
                <Button href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto">
                  Talk to Our Team
                </Button>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {product.features.map((feature, featureIndex) => (
                <RevealOnScroll
                  as="li"
                  key={feature.title}
                  delay={0.1 + featureIndex * 0.05}
                  className="flex flex-col gap-2 rounded-2xl border border-teal-500/15 bg-white/75 p-5 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/40 hover:bg-white hover:shadow-soft"
                >
                  <span className="font-mono text-xs text-emerald-onlight">
                    {String(featureIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug text-navy-950">
                    {feature.title}
                  </span>
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

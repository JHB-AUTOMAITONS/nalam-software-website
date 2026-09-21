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
  teal: "text-teal-400",
  navy: "text-cyan-300",
  coral: "text-clinic-jade",
};

const accentBadge: Record<Product["accent"], string> = {
  teal: "border-teal-400/30 bg-teal-500/[0.08] text-teal-400 shadow-[0_0_20px_rgba(25,200,120,0.1)]",
  navy: "border-cyan-300/30 bg-cyan-300/[0.08] text-cyan-300 shadow-[0_0_20px_rgba(156,255,208,0.1)]",
  coral: "border-clinic-jade/30 bg-clinic-jade/[0.08] text-clinic-jade shadow-[0_0_20px_rgba(47,224,168,0.1)]",
};

const accentGlow: Record<Product["accent"], string> = {
  teal: "shadow-[0_0_90px_rgba(25,200,120,0.07)]",
  navy: "shadow-[0_0_90px_rgba(156,255,208,0.06)]",
  coral: "shadow-[0_0_90px_rgba(47,224,168,0.07)]",
};

const accentBorder: Record<Product["accent"], string> = {
  teal: "border-teal-400/20",
  navy: "border-cyan-300/20",
  coral: "border-clinic-jade/20",
};

const accentNumber: Record<Product["accent"], string> = {
  teal: "text-teal-400/70",
  navy: "text-cyan-300/70",
  coral: "text-clinic-jade/70",
};

export function ProductDetail({ product, reverse = false, index }: ProductDetailProps) {
  return (
    <section
      id={product.id}
      className="scroll-mt-24 relative isolate overflow-hidden border-t border-teal-400/15 bg-navy-950/55 py-12 backdrop-blur-sm sm:py-16 lg:py-20"
    >
      {/* Directional fade at the section edges so LMS/HMS/CMS read as distinct, cinematic
          showcases against their neighbours, without hiding the global video mid-section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-navy-950/45 to-transparent sm:h-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-950/45 to-transparent sm:h-24"
      />

      <Container>
        <RevealOnScroll
          className={`relative isolate overflow-hidden rounded-[28px] border p-6 backdrop-blur-md sm:p-8 lg:p-10 ${accentBorder[product.accent]} ${accentGlow[product.accent]}`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(5,20,15,0.78)] backdrop-blur-md"
          />

          <div
            className={`grid items-center gap-9 lg:grid-cols-2 lg:gap-12 ${
              reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs tracking-[0.18em] ${accentNumber[product.accent]}`}>
                  {String(index).padStart(2, "0")} — NALAM {product.id.toUpperCase()}
                </span>
              </div>

              <Badge
                tone={product.accent === "coral" ? "coral" : product.accent === "navy" ? "onDark" : "teal"}
                className={`border ${accentBadge[product.accent]} tracking-[0.2em]`}
              >
                {product.eyebrow}
              </Badge>
              <h2 className="text-balance font-display text-3xl font-medium leading-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.25)] sm:text-4xl">
                {product.fullName}
              </h2>
              <p
                className={`text-lg font-medium ${accentText[product.accent]} [text-shadow:0_0_18px_rgba(57,255,136,0.12)]`}
              >
                {product.positioning}
              </p>
              <p className="text-balance text-base leading-relaxed text-mist-100/80">
                {product.description}
              </p>

              <div className="rounded-2xl border border-teal-400/15 bg-white/[0.05] p-5">
                <p className="font-display text-lg font-medium text-white">{product.closingStatement}</p>
                <p className="mt-1 text-sm text-mist-100/70">{product.valueStatement}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/#requirements" size="lg">
                  Tell Us Your Requirements
                </Button>
                <Button href="/contact" size="lg" variant="secondary">
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
                  className="flex flex-col gap-2 rounded-2xl border border-[rgba(190,255,220,0.22)] bg-[rgba(10,30,23,0.7)] p-5 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-400/45 hover:bg-[rgba(15,45,33,0.82)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.18)]"
                >
                  <span className="font-mono text-xs text-teal-400">
                    {String(featureIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug text-white">
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

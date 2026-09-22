import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-white/40 py-11 backdrop-blur-sm sm:py-14 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-500/12 blur-3xl"
      />
      <Container className="relative">
        <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
            Let&apos;s Build the Right Healthcare System for You
          </h2>
          <p className="text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you need a laboratory management system, hospital
            management system, clinic management system or a connected
            combination of multiple systems, Nalam can be customized around
            your requirements.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact" size="lg" variant="primary" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
            <Button href="/#requirements" size="lg" variant="ghost" className="w-full sm:w-auto">
              Send Your Requirements
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

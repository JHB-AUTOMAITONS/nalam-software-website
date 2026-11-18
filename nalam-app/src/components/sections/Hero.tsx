import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVideoBackground } from "./HeroVideoBackground";

/**
 * Entrance is CSS-driven (.hero-item in globals.css) with the same timing as the
 * framer-motion stagger it replaces: 0.1s initial delay, 0.12s between items,
 * 0.7s each, 18px rise. The hero text is therefore painted without waiting for
 * JS hydration.
 */
const itemDelay = (index: number) =>
  ({ "--reveal-delay": `${(0.1 + index * 0.12).toFixed(2)}s` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F5F8F6] pt-24 pb-8 xs:pt-26 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
      <HeroVideoBackground />

      <Container className="relative z-10 flex flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-7">
          <div className="hero-item" style={itemDelay(0)}>
            <Badge tone="teal" size="md">AI-Powered HealthTech</Badge>
          </div>

          <h1 className="hero-item text-balance font-display text-[clamp(1.85rem,7vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl" style={itemDelay(1)}>
            Healthcare Management Software{" "}
            <span className="text-emerald-onlight">Built Around Your Workflow</span>
          </h1>

          <p className="hero-item text-balance font-display text-xl font-medium leading-snug tracking-tight text-navy-950/80 sm:text-2xl" style={itemDelay(2)}>
            Your Data. In Your Hands. In Your Brand.
          </p>

          <p className="hero-item max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg" style={itemDelay(3)}>
            Nalam Software is a healthcare management software platform for
            hospitals, laboratories and clinics. Our healthcare software
            solutions connect workflows, teams and patient information with
            AI-powered intelligence and automated WhatsApp communication.
          </p>

          <p className="hero-item max-w-xl text-balance text-sm leading-relaxed text-slate-500" style={itemDelay(4)}>
            Powered by our infrastructure &amp; technology team. You focus on
            healthcare — we take care of the technology. Customize Nalam to
            fit your business logic, workflows and requirements.
          </p>

          <div className="hero-item flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row" style={itemDelay(5)}>
            <Button href="/#solutions" size="lg" variant="primary" className="w-full sm:w-auto">
              Explore Our Solutions
            </Button>
            <Button href="/contact" size="lg" variant="ghost" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

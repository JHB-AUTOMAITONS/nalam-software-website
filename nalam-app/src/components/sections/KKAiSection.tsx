import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { KKAiChatDemo } from "./KKAiChatDemo";

export function KKAiSection() {
  return (
    <section className="overflow-hidden bg-navy-950/55 py-10 backdrop-blur-sm sm:py-14 lg:py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <RevealOnScroll className="flex flex-col gap-5">
          <Badge tone="onDark">Nalam CMS · Intelligent Assistant</Badge>
          <h2 className="text-balance font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
            Meet <span className="text-teal-400">KK AI</span>
          </h2>
          <p className="text-lg font-medium text-teal-400">
            Your Clinic&apos;s Intelligent Assistant
          </p>
          <p className="text-balance text-base leading-relaxed text-mist-100/80">
            Ask questions about your clinic in simple language and get answers
            from your own clinic data — without searching through multiple
            screens or reports.
          </p>
          <p className="text-sm text-mist-100/55">
            KK AI answers using your clinic&apos;s own records. Responses reflect
            the data available in your Nalam CMS account.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <KKAiChatDemo />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

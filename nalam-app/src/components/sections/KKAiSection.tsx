import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { KKAiChatDemo } from "./KKAiChatDemo";

export function KKAiSection() {
  return (
    <section className="overflow-hidden bg-white/40 py-10 backdrop-blur-sm sm:py-10 lg:py-12">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <RevealOnScroll className="flex flex-col gap-5">
          <Badge tone="ice">CMS · Intelligent Assistant</Badge>
          <h2 className="text-balance font-display text-3xl font-medium leading-tight text-navy-950 sm:text-4xl">
            Meet <span className="text-emerald-onlight">KK AI</span>
          </h2>
          <p className="text-lg font-medium text-emerald-onlight">
            Your Clinic&apos;s Intelligent Assistant
          </p>
          <p className="text-balance text-base leading-relaxed text-slate-600">
            Ask questions about your clinic in simple language and get answers
            from your own clinic data — without searching through multiple
            screens or reports.
          </p>
          <p className="text-sm text-slate-500">
            KK AI answers using your clinic&apos;s own records. Responses reflect
            the data available in your CMS account.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <KKAiChatDemo />
        </RevealOnScroll>
      </Container>
    </section>
  );
}

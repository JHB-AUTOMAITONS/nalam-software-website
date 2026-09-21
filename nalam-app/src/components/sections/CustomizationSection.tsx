"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { RevealItem } from "@/components/ui/RevealItem";

const customizationExamples = [
  "Custom workflows",
  "Custom screens",
  "Custom reports",
  "Custom fields",
  "Custom roles & permissions",
  "Custom integrations",
  "Custom dashboards",
  "Custom automation",
  "Custom billing workflows",
  "Custom patient workflows",
];

export function CustomizationSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="customization"
      className="scroll-mt-24 relative isolate overflow-hidden bg-navy-950/55 py-10 backdrop-blur-sm sm:py-14 lg:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(57,255,136,0.08), transparent 45%), radial-gradient(circle at 82% 78%, rgba(57,255,136,0.06), transparent 40%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-teal-400/10 blur-[110px]"
        animate={
          shouldReduceMotion
            ? { opacity: 0.7, scale: 1 }
            : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-400/10 blur-[120px]"
        animate={
          shouldReduceMotion
            ? { opacity: 0.6, scale: 1 }
            : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
        }
      />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <SectionHeading
          eyebrow="Built Around You"
          title={
            <>
              Your Healthcare Workflow Is Unique.{" "}
              <span className="text-teal-400">Your Software Should Be Too.</span>
            </>
          }
          description="We don't believe every hospital, laboratory or clinic should be forced into the same workflow. Nalam Software can be customized around your operational requirements."
          tone="dark"
        />

        <StaggerGroup
          as="ul"
          className="flex flex-wrap justify-center gap-3"
          staggerDelay={0.05}
        >
          {customizationExamples.map((item) => (
            <RevealItem key={item} className="list-none">
              <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-white/[0.04] px-4 py-2 text-sm text-mist-100/90">
                {item}
              </span>
            </RevealItem>
          ))}
        </StaggerGroup>

        <Button href="/contact" size="lg" variant="onDark">
          Discuss Your Requirements
        </Button>
      </Container>
    </section>
  );
}

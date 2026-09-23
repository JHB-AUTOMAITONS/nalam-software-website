"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { RevealItem } from "@/components/ui/RevealItem";
import { customizationOptions, routes } from "@/lib/constants";

export function CustomizationSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="customization"
      className="scroll-mt-32 relative isolate overflow-hidden bg-white/40 py-10 backdrop-blur-sm sm:py-10 lg:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(57,255,136,0.07), transparent 45%), radial-gradient(circle at 82% 78%, rgba(5,213,213,0.07), transparent 40%)",
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
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ice-500/10 blur-[120px]"
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
          {customizationOptions.map((item) => (
            <RevealItem key={item} className="list-none">
              <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-white/60 px-4 py-2 text-sm text-navy-800">
                {item}
              </span>
            </RevealItem>
          ))}
        </StaggerGroup>

        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href="/contact" size="lg" variant="primary" className="w-full sm:w-auto">
            Discuss Your Requirements
          </Button>
          <Button
            href={routes.customSolutions}
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Explore Custom Healthcare Software
          </Button>
        </div>
      </Container>
    </section>
  );
}

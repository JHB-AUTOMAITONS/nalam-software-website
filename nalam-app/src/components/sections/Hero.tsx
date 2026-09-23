"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVideoBackground } from "./HeroVideoBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12, delayChildren: shouldReduceMotion ? 0 : 0.1 },
    },
  };

  const item: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section className="relative isolate overflow-hidden bg-[#F5F8F6] pt-24 pb-8 xs:pt-26 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
      <HeroVideoBackground />

      <Container className="relative z-10 flex flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        <motion.div
          className="flex flex-col items-center gap-6 text-center sm:gap-7"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={item}>
            <Badge tone="teal" size="md">AI-Powered HealthTech</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-display text-[clamp(1.85rem,7vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl"
          >
            Healthcare Management Software{" "}
            <span className="text-emerald-onlight">Built Around Your Workflow</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-balance font-display text-xl font-medium leading-snug tracking-tight text-navy-950/80 sm:text-2xl"
          >
            Your Data. In Your Hands. In Your Brand.
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Nalam Software is a healthcare management software platform for
            hospitals, laboratories and clinics. Our healthcare software
            solutions connect workflows, teams and patient information with
            AI-powered intelligence and automated WhatsApp communication.
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-balance text-sm leading-relaxed text-slate-500"
          >
            Powered by our infrastructure &amp; technology team. You focus on
            healthcare — we take care of the technology. Customize Nalam to
            fit your business logic, workflows and requirements.
          </motion.p>

          <motion.div
            variants={item}
            className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button href="/#solutions" size="lg" variant="primary" className="w-full sm:w-auto">
              Explore Our Solutions
            </Button>
            <Button href="/contact" size="lg" variant="ghost" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

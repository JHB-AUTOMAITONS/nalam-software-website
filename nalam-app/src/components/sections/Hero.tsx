"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "./HeroVisual";
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
    <section className="relative isolate overflow-hidden bg-[#F5F8F6] pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
      <HeroVideoBackground />

      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <motion.div
          className="flex flex-col items-start gap-7"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={item}>
            <Badge tone="teal">AI-Powered HealthTech</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-display text-[clamp(1.85rem,7vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl"
          >
            Your Data. In Your Hands.{" "}
            <span className="text-emerald-onlight">In Your Brand.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-balance font-display text-xl font-medium leading-snug tracking-tight text-navy-950/80 sm:text-2xl"
          >
            Powered by Our Infrastructure &amp; Technology Team.
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Smart healthcare software with AI-powered intelligence, automated
            WhatsApp communication and free machine integrations — designed
            to work the way your organization works.
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-balance text-sm leading-relaxed text-slate-500"
          >
            You focus on healthcare. We take care of the technology.
            Customize Nalam to fit your business logic, workflows and
            requirements.
          </motion.p>

          <motion.div variants={item} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/#solutions" size="lg" variant="primary" className="w-full sm:w-auto">
              Explore Our Solutions
            </Button>
            <Button href="/contact" size="lg" variant="ghost" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-6 grid grid-cols-3 gap-3 border-t border-navy-900/10 pt-6 xs:gap-6 sm:gap-10"
          >
            <div className="min-w-0">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-500 xs:text-[0.65rem] xs:tracking-[0.14em]">
                Systems
              </dt>
              <dd className="mt-1 font-display text-lg font-medium text-navy-950 sm:text-2xl">3</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-500 xs:text-[0.65rem] xs:tracking-[0.14em]">
                Connected
              </dt>
              <dd className="mt-1 font-display text-lg font-medium text-navy-950 sm:text-2xl">
                Fully
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-500 xs:text-[0.65rem] xs:tracking-[0.14em]">
                Customizable
              </dt>
              <dd className="mt-1 font-display text-lg font-medium text-navy-950 sm:text-2xl">
                Always
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}

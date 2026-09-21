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
    <section className="relative isolate overflow-hidden bg-navy-950 pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
      <HeroVideoBackground />

      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <motion.div
          className="flex flex-col items-start gap-7"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={item}>
            <Badge tone="onDark">Nalam Software</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            One Healthcare Platform.{" "}
            <span className="text-teal-400">Three Powerful Systems.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-balance text-base leading-relaxed text-mist-100/85 sm:text-lg"
          >
            Smart software for hospitals, laboratories and clinics — designed
            to simplify operations, connect teams and improve patient care.
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Button href="/#solutions" size="lg" variant="onDark">
              Explore Our Solutions
            </Button>
            <Button href="/contact" size="lg" variant="ghost" className="text-white hover:text-teal-400">
              Talk to Our Team
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-6 grid grid-cols-3 gap-6 border-t border-white/10 pt-6 sm:gap-10"
          >
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mist-100/60">
                Systems
              </dt>
              <dd className="mt-1 font-display text-2xl font-medium text-white">3</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mist-100/60">
                Connected
              </dt>
              <dd className="mt-1 font-display text-2xl font-medium text-white">
                Fully
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mist-100/60">
                Customizable
              </dt>
              <dd className="mt-1 font-display text-2xl font-medium text-white">
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const steps = [
  "Patient Registration",
  "Appointment",
  "Consultation",
  "Investigation",
  "Laboratory / Radiology",
  "Treatment",
  "Pharmacy",
  "Billing",
  "Discharge",
  "Follow-up",
];

export function WorkflowTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-navy-950/55 py-9 backdrop-blur-sm sm:py-12 lg:py-14">
      <Container className="flex flex-col gap-7 sm:gap-8 lg:gap-9">
        <SectionHeading
          eyebrow="End-to-End"
          title="How Nalam Connects Your Healthcare Workflow"
          description="One continuous flow of information — from the moment a patient registers to the moment they return for follow-up care."
          tone="dark"
        />

        <div className="relative mx-auto w-full max-w-3xl">
          {/* Central connected path: soft fade top/bottom so it reads as one
              continuous patient journey rather than a hard-edged ruler line. */}
          <div
            aria-hidden
            className="absolute left-[15px] top-1 bottom-1 w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(57,255,136,0.1), rgba(57,255,136,0.35) 12%, rgba(57,255,136,0.35) 88%, rgba(57,255,136,0.1))",
            }}
          />

          {/* Slow single pulse traveling down the path on first view — a subtle
              "one connected patient journey" cue, not a looping animation. */}
          {!shouldReduceMotion ? (
            <motion.div
              aria-hidden
              className="absolute left-[15px] z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-teal-400 sm:left-1/2"
              style={{ boxShadow: "0 0 10px rgba(57,255,136,0.7)" }}
              initial={{ top: "0%", opacity: 0 }}
              whileInView={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 2.6, ease: "easeInOut", delay: 0.3 }}
            />
          ) : null}

          <ol className="flex flex-col gap-1.5 sm:gap-2">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const alignRight = index % 2 === 0;

              return (
                <RevealOnScroll
                  as="li"
                  key={step}
                  delay={index * 0.04}
                  y={14}
                  className="relative flex items-center gap-3 sm:justify-center"
                >
                  <span
                    className={`relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-medium tracking-tight sm:absolute sm:left-1/2 sm:-translate-x-1/2 ${
                      isLast
                        ? "border border-teal-400/50 bg-teal-500/15 text-teal-400 shadow-[0_0_14px_rgba(57,255,136,0.25)]"
                        : "border border-teal-400/30 bg-[rgba(10,30,23,0.85)] text-cyan-300"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={`group flex min-h-[46px] w-full items-center gap-2.5 rounded-2xl border border-[rgba(190,255,220,0.18)] bg-[rgba(10,30,23,0.68)] px-4 py-2.5 shadow-soft backdrop-blur-sm transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:border-teal-400/40 hover:bg-[rgba(15,45,33,0.85)] hover:shadow-[0_8px_30px_rgba(25,200,120,0.08)] sm:w-[calc(50%-2.75rem)] ${
                      alignRight
                        ? "sm:mr-auto sm:flex-row-reverse sm:text-right"
                        : "sm:ml-auto"
                    } ${isLast ? "border-teal-400/30" : ""}`}
                  >
                    <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-400/70 sm:inline">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-snug text-white">
                      {step}
                    </span>
                  </span>
                </RevealOnScroll>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

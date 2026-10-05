import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "How Laboratory Management Software Improves Lab Efficiency" — section of
 * the LMS service page. Copy only restates documented LMS capabilities
 * (barcode sample management, direct lab machine integration, validation and
 * authorization, lab dashboard, patient history, reagent/stock tracking).
 */

/** Sitewide section rhythm — matches SolutionPageTemplate's sectionClass. */
const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

const linkClass = "font-medium text-emerald-onlight underline-offset-4 hover:underline";

const improvements = [
  {
    title: "Faster Sample Processing",
    body: "Samples are identified with barcodes at collection and tracked through processing, and results are captured from connected lab machines, so bench work keeps moving without stopping for manual lookups or re-entry.",
  },
  {
    title: "Streamlined Laboratory Workflows",
    body: "Registration, sample collection, processing, validation, authorization and report delivery run as one continuous workflow, so every test follows the same clear path from order to report.",
  },
  {
    title: "Reduced Manual Errors",
    body: "Direct lab machine integration reduces manual result entry, barcodes keep each sample matched to the right patient and test, and results pass through validation and authorization before they are released.",
  },
  {
    title: "Better Test and Report Management",
    body: "The status of each test stays visible, and reports are produced from results that have already been validated and authorized instead of being assembled by hand.",
  },
  {
    title: "Easier Sample Tracking",
    body: "Barcode identification lets your team trace a sample from collection through processing, so questions about where a sample is or which patient it belongs to have a quick answer.",
  },
  {
    title: "Improved Staff Productivity",
    body: "When results flow in from instruments and tests are not re-keyed, laboratory staff spend less time on repeat data entry and status checks, and more time on testing.",
  },
  {
    title: "Centralized Laboratory Data",
    body: "Test orders, results, patient history and reagent stock live in one platform, and the lab dashboard gives managers an overview of laboratory activity in one place.",
  },
  {
    title: "Faster Report Delivery",
    body: "With results moving from instruments through validation and authorization in a single system, reports can be delivered to patients and doctors sooner.",
  },
];

export function LmsEfficiencySection() {
  return (
    <section id="lab-efficiency" className={`scroll-mt-32 ${sectionClass}`}>
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Lab Efficiency"
          title="How Laboratory Management Software Improves Lab Efficiency"
          description="Laboratory management software saves time by removing repeated typing, manual follow-up and scattered records. With Nalam's LMS, a test moves from order to final report in one connected system, and each stage builds on the one before it."
        />

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {improvements.map((item, index) => (
            <RevealOnScroll
              as="li"
              key={item.title}
              delay={0.05 + (index % 2) * 0.05}
              className="glass-surface flex min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm sm:p-6"
            >
              <h3 className="font-display text-lg font-medium leading-snug text-navy-950">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
            </RevealOnScroll>
          ))}
        </ul>

        <RevealOnScroll className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-600">
          <p>
            Want to go deeper? Read our guide to the{" "}
            <Link href="/blog/laboratory-management-system-key-features" className={linkClass}>
              key features every modern lab needs
            </Link>
            , or see what to look for when{" "}
            <Link href="/blog/lab-management-software-key-features" className={linkClass}>
              evaluating lab management software
            </Link>
            .
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

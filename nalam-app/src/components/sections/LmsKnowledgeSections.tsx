import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/constants";

/**
 * Educational and buyer-guidance sections for the Laboratory Management System
 * page. Every NALAM capability stated here is already documented elsewhere in
 * the site (constants.ts / solutions-content.ts): test order to report
 * workflow, barcode sample tracking, direct lab machine integration,
 * validation and authorization, reagent/stock/expiry visibility, lab dashboard
 * and patient history, customization, and HMS/CMS connection.
 *
 * Deliberately NOT claimed (not documented for NALAM): QC charts or automated
 * QC, audit trails/revision history, certifications or regulatory compliance,
 * backup/security standards, multi-branch management, automated alerts,
 * instrument monitoring, supported analyser models or protocols.
 */

/** Sitewide section rhythm — matches SolutionPageTemplate's sectionClass. */
const sectionClass =
  "relative border-t border-teal-500/15 bg-white/40 py-10 backdrop-blur-sm sm:py-12 lg:py-14";

const linkClass = "font-medium text-emerald-onlight underline-offset-4 hover:underline";

const cardClass =
  "glass-surface flex min-w-0 flex-col gap-3 rounded-2xl border border-ice-500/15 p-5 backdrop-blur-sm sm:p-6";

function ProseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-32 ${sectionClass}`}>
      <Container className="flex flex-col gap-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <RevealOnScroll className="mx-auto flex w-full max-w-3xl flex-col gap-4 text-base leading-relaxed text-slate-600">
          {children}
        </RevealOnScroll>
      </Container>
    </section>
  );
}

function CardGrid({
  items,
  columns = "sm:grid-cols-2",
}: {
  items: { title: string; body: string }[];
  columns?: string;
}) {
  return (
    <ul className={`grid grid-cols-1 gap-3 sm:gap-4 ${columns}`}>
      {items.map((item, index) => (
        <RevealOnScroll
          as="li"
          key={item.title}
          delay={0.05 + (index % 3) * 0.05}
          className={cardClass}
        >
          <h3 className="font-display text-lg font-medium leading-snug text-navy-950">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
        </RevealOnScroll>
      ))}
    </ul>
  );
}

const workflowSteps = [
  {
    title: "Register the test order",
    body: "Patient and test details are entered once, or arrive from a connected hospital or clinic system, and become the start of a single record for that test.",
  },
  {
    title: "Collect and label the sample",
    body: "A barcode ties the sample to the right patient and test, so identification does not depend on handwriting or memory.",
  },
  {
    title: "Process on the instrument",
    body: "Results are captured from connected lab machines instead of being typed in by hand.",
  },
  {
    title: "Validate and authorize",
    body: "Results are reviewed and approved before a report is released, giving the laboratory a consistent checkpoint.",
  },
  {
    title: "Deliver the report",
    body: "The report is produced from authorized results, and each result joins the patient's history for future reference.",
  },
];

/** Sections that sit before the existing "Lab Efficiency" section. */
export function LmsKnowledgeSections() {
  return (
    <>
      <ProseSection
        id="what-is-laboratory-management-system-software"
        eyebrow="The Basics"
        title="What Is Laboratory Management System Software?"
      >
        <p>
          Laboratory management system software is a digital system that records and controls the
          work a laboratory does on each test: the order, the sample, the instrument result, the
          review and the final report. It replaces paper registers and scattered spreadsheets with
          one record per patient and test, so staff and managers are always looking at the same
          information.
        </p>
        <p>
          You will also see it called laboratory management software, LIMS software or a laboratory
          information management system, and in diagnostic settings it overlaps with what many
          people call a lab information system. For a diagnostic or pathology laboratory, the useful
          question is not the label but whether the software covers registration, sample tracking,
          results, validation and reporting. Nalam&apos;s Laboratory Management System is built
          around that diagnostic workflow.
        </p>
      </ProseSection>

      <section id="how-it-works" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="How It Works"
            title="How Does a Laboratory Management System Work?"
            description="It follows each test through five stages while keeping one record that every stage adds to, instead of starting a new record at each hand-off."
          />
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <RevealOnScroll
                as="li"
                key={step.title}
                delay={0.05 + (index % 3) * 0.05}
                className={cardClass}
              >
                <span className="font-mono text-xs text-emerald-onlight">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium leading-snug text-navy-950">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.body}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </Container>
      </section>

      <ProseSection
        id="workflow-management"
        eyebrow="Workflow Control"
        title="Complete Laboratory Workflow Management"
      >
        <p>
          Laboratory workflow management is about control between the steps, not only the steps
          themselves. When every test stays in one system, a manager can see which stage a test has
          reached and what is waiting, instead of asking around the bench. Because registration,
          collection, processing, validation, authorization and reporting are connected, a test does
          not need to be re-keyed when it moves from one stage to the next.
        </p>
        <p>
          For laboratories that serve a hospital or clinic, orders can be connected with Nalam&apos;s{" "}
          <Link href="/solutions/hospital-management-system" className={linkClass}>
            Hospital Management System
          </Link>{" "}
          and{" "}
          <Link href="/solutions/clinic-management-system" className={linkClass}>
            Clinic Management System
          </Link>
          , so test orders and results move between departments without being re-entered.
        </p>
      </ProseSection>

      <ProseSection
        id="quality-control"
        eyebrow="Quality"
        title="Laboratory Quality Control and Quality Assurance"
      >
        <p>
          Quality in a laboratory has two layers. Analytical quality control checks that instruments
          and methods perform as expected. Workflow quality assurance checks that the right sample,
          result and report reach the right patient. Good laboratory quality control software should
          support both, and a buyer should ask to see each one demonstrated against their own
          procedures.
        </p>
        <p>
          In Nalam&apos;s Laboratory Management System, the workflow layer is built in: barcodes keep
          samples matched to the right patient and test, direct machine integration reduces manual
          transcription, and results pass through validation and authorization before a report is
          released. If your laboratory follows specific quality procedures, the system can be
          customized around your workflow.
        </p>
      </ProseSection>

      <ProseSection
        id="machine-integration"
        eyebrow="Integration"
        title="Laboratory Machine Integration and Automation"
      >
        <p>
          Instrument results are where much of a laboratory&apos;s typing happens, and where
          transcription mistakes start. Nalam&apos;s LMS supports direct lab machine integration, so
          results come from the instrument into the system instead of being keyed by hand. This is
          the practical meaning of laboratory automation software: fewer manual hand-offs, with
          captured results flowing into validation and authorization and then into the report.
        </p>
        <p>
          Analysers and connection methods differ from one laboratory to another, so check that your
          specific instrument models are covered before you commit. Our team can walk through this
          against your equipment list.
        </p>
      </ProseSection>

      <ProseSection
        id="reporting-turnaround-time"
        eyebrow="Reporting"
        title="Laboratory Reporting and Turnaround Time Management"
      >
        <p>
          Turnaround time is the gap between the order and the report, and it is shaped by every
          hand-off along the way. When each test&apos;s status stays visible and reports are produced
          from results that have already been validated and authorized, delays become easier to spot
          and explain. Laboratory reporting software that works from authorized results also avoids
          assembling reports by hand.
        </p>
        <p>
          The lab dashboard gives managers an overview of laboratory activity, so they can follow
          progress without chasing status updates.
        </p>
      </ProseSection>

      <ProseSection
        id="inventory-reagents"
        eyebrow="Inventory"
        title="Laboratory Inventory and Reagent Management"
      >
        <p>
          A test cannot run without the right reagent, so stock problems often show up as late
          reports. Nalam&apos;s LMS tracks reagents, stock and consumables with expiry visibility, so
          your team knows what is available and what needs attention before it affects testing.
          Seeing stock beside test workload in the same platform makes it easier to plan purchases
          around real demand.
        </p>
      </ProseSection>

      <ProseSection
        id="data-security-audit"
        eyebrow="Data"
        title="Laboratory Data Management, Security and Audit Trails"
      >
        <p>
          Laboratory records are sensitive personal health data, so ask any vendor how access,
          backups, change history and record retention are handled, and ask for the answers in
          writing. In Nalam&apos;s LMS, test orders, results, patient history and reagent stock live
          in one platform rather than in separate files, and roles and permissions can be customized
          around your team.
        </p>
      </ProseSection>

      <ProseSection
        id="dashboard-analytics"
        eyebrow="Dashboard"
        title="Smart Laboratory Dashboard and Performance Analytics"
      >
        <p>
          The lab dashboard gives managers an overview of laboratory activity in one place, and each
          patient&apos;s history keeps past tests and results available for reference. Use the
          dashboard to review the workload in front of the team, and use patient history to compare
          earlier results when following up on a new test.
        </p>
      </ProseSection>
    </>
  );
}

const stakeholderBenefits = [
  {
    title: "For laboratory staff",
    body: "Less repeated data entry and clearer sample identification, so more of the day goes to testing.",
  },
  {
    title: "For lab managers and owners",
    body: "One view of laboratory activity, stock and reports in progress, instead of separate registers.",
  },
  {
    title: "For doctors",
    body: "Reports built from authorized results, and connected test ordering where the laboratory is linked to a hospital or clinic system.",
  },
  {
    title: "For patients",
    body: "A consistent path from sample to report, with fewer manual mix-ups along the way.",
  },
];

const whoNeeds = [
  {
    title: "Standalone diagnostic and pathology laboratories",
    body: "Labs that run the full order-to-report cycle on their own and want one system for registration, samples, results and reports.",
  },
  {
    title: "Hospital laboratories",
    body: "Laboratories inside a hospital that need orders and results to move between the ward, doctor and lab, connected with Nalam's Hospital Management System.",
  },
  {
    title: "Clinic-linked laboratories",
    body: "Clinics with their own testing, where consultations and prescriptions link to lab workflows, connected with Nalam's Clinic Management System.",
  },
  {
    title: "Growing labs outgrowing paper and spreadsheets",
    body: "Teams where registers and spreadsheets are slowing reports down or making it hard to see what is pending.",
  },
];

const chooseChecklist = [
  "Does it cover your whole order-to-report workflow, not just one stage?",
  "Does it connect to your own instruments? Ask for your specific models by name.",
  "How are result validation and authorization handled before a report is released?",
  "Can it track reagents, stock and expiry?",
  "How are access, backups and change history handled? Ask for the answer in writing.",
  "Can it be customized around your workflow and connected to hospital or clinic systems?",
  "What support and training are included?",
  "Will the vendor demonstrate it using your own tests and workflows?",
];

const capabilities = [
  {
    title: "Test order to final report",
    body: "Registration, sample collection, processing, validation, authorization and report delivery in one continuous workflow.",
  },
  {
    title: "Direct lab machine integration",
    body: "Results captured from the instrument instead of typed in by hand.",
  },
  {
    title: "Barcode sample management",
    body: "Samples identified and tracked from collection through processing.",
  },
  {
    title: "Validation and authorization",
    body: "A controlled review step before results reach patients and doctors.",
  },
  {
    title: "Reagent, stock and expiry",
    body: "Visibility of reagents, stock and consumables, with expiry awareness.",
  },
  {
    title: "Dashboard and patient history",
    body: "A manager's overview of laboratory activity, and past results at hand.",
  },
  {
    title: "Customization",
    body: "Screens, reports, fields, roles and permissions, integrations, dashboards and automation shaped around your workflow.",
  },
  {
    title: "Connected systems",
    body: "Runs on its own, or connects with Nalam's Hospital and Clinic Management Systems.",
  },
];

/** Sections that sit after the existing "Lab Efficiency" section, before the FAQ. */
export function LmsBuyerSections() {
  return (
    <>
      <section id="benefits-of-laboratory-management-software" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of Laboratory Management Software"
            description="The gains show up differently depending on who you ask, from the bench to the doctor and the patient."
          />
          <CardGrid items={stakeholderBenefits} columns="sm:grid-cols-2 lg:grid-cols-4" />
        </Container>
      </section>

      <section id="who-needs-laboratory-management-software" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Who It Is For"
            title="Who Needs Laboratory Management Software?"
            description="Any laboratory where tests, samples and reports are tracked by hand is a candidate. These are the most common cases."
          />
          <CardGrid items={whoNeeds} />
        </Container>
      </section>

      <ProseSection
        id="how-to-choose"
        eyebrow="Buying Guide"
        title="How to Choose the Right Laboratory Management System?"
      >
        <p>
          Compare systems on how they behave in your laboratory, not on the length of the feature
          list. A short checklist to take into every demonstration:
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          {chooseChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          For a deeper comparison, read our guides to the{" "}
          <Link href="/blog/laboratory-management-system-key-features" className={linkClass}>
            key features of a laboratory management system
          </Link>
          ,{" "}
          <Link href="/blog/lab-management-software-key-features" className={linkClass}>
            lab management software features to look for
          </Link>{" "}
          and{" "}
          <Link href="/blog/pathology-lab-software-guide" className={linkClass}>
            choosing pathology lab software
          </Link>
          .
        </p>
      </ProseSection>

      <section id="product-capabilities" className={`scroll-mt-32 ${sectionClass}`}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Why Nalam"
            title="NALAM Laboratory Management System: Product Capabilities and Differentiation"
            description="Built for diagnostic laboratories, running on its own or connected with hospital and clinic systems, and customizable around how your lab works."
          />
          <CardGrid items={capabilities} columns="sm:grid-cols-2 lg:grid-cols-4" />
          <RevealOnScroll className="mx-auto flex flex-col items-center gap-4 text-center">
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">
              Share how your laboratory works today and we will show you how the system fits, using
              your own tests and instruments.
            </p>
            <Button href={routes.contact} size="lg" variant="primary" className="w-full sm:w-auto">
              Talk to Our Team
            </Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}

import type { ProductId } from "./constants";

/**
 * Long-form copy for the dedicated solution pages.
 *
 * Content rule: every sentence here elaborates on facts that already exist
 * elsewhere in the project — the product definitions in constants.ts
 * (positioning, description, features, valueStatement, closingStatement,
 * audience), the FAQ answers, the homepage FeatureGrid copy and the
 * About page. Do not add new named features, integrations, figures or claims
 * here without confirming them with the product team first.
 */
export interface SolutionPageContent {
  /** Exact H1 for the page (primary keyword). */
  h1: string;
  /** Hero lead paragraphs. The first paragraph must contain the primary keyword. */
  intro: string[];
  overviewTitle: string;
  overview: string[];
  /** Who the system is for — shown alongside `product.audience`. */
  audience: string;
  featuresTitle: string;
  featuresDescription: string;
  /** Keyed by the exact `product.features[].title` strings in constants.ts. */
  featureDetails: Record<string, string>;
  benefitsTitle: string;
  /** Titles are the parts of `product.valueStatement`, in order. */
  benefits: { title: string; body: string }[];
  connectedTitle: string;
  connectedIntro: string;
  /** How this system connects with each of the other two Nalam systems. */
  connectWith: Partial<Record<ProductId, string>>;
  closing: string;
}

export const solutionContent: Record<ProductId, SolutionPageContent> = {
  hms: {
    h1: "Hospital Management System",
    intro: [
      "Nalam's Hospital Management System is hospital management software that manages the complete patient journey — from registration and appointments to consultation, admission, treatment, discharge and follow-up — through one connected hospital platform.",
      "Instead of separate tools for each department, registration, consultation, laboratory, radiology, pharmacy and billing work from the same patient record. The result: less repeated work, faster patient care and better control over how your hospital runs.",
    ],
    overviewTitle: "One Connected Platform for Your Entire Hospital",
    overview: [
      "A hospital runs on handoffs. A patient who registers at the front desk is seen by a doctor, may be admitted, sent for tests, treated, billed and followed up — and every step depends on information captured at the step before. When each department keeps its own records, the same details are entered again and again, and no one has the complete picture.",
      "Nalam's hospital management system software brings these steps onto one platform. Information captured at registration carries through appointments, consultation, admission, treatment and discharge, and the complete patient history stays available to the teams who need it. Hospital owners and administrators get a clear overview of the hospital, with reports generated without manual compilation.",
    ],
    audience:
      "The Hospital Management System can run on its own for a single hospital, or connect with Nalam's laboratory and clinic systems as part of one unified healthcare platform — including multi-specialty hospitals and connected hospital-laboratory operations.",
    featuresTitle: "Hospital Management Software Features",
    featuresDescription:
      "Six connected capabilities that cover the patient journey and the hospital operations behind it.",
    featureDetails: {
      "From Appointment to Discharge":
        "Manage every stage of the patient journey in sequence — registration, appointments, consultation, admission, treatment, discharge and follow-up. Each stage picks up where the last one left off, so patient details don't need to be re-entered as the patient moves through the hospital.",
      "Complete Doctor & Patient Care":
        "Doctors see the patient's information and history in one place during consultation, and the care they provide is recorded against the same record the rest of the hospital uses. Doctor availability, consultations and workload are visible in one view.",
      "Complete Inpatient, Emergency & Surgery Management":
        "Inpatient admissions, emergency cases and surgeries are managed inside the same hospital software rather than in separate registers, so the care delivered in each area becomes part of the patient's complete history.",
      "Laboratory, Radiology & Pharmacy — All Connected":
        "Laboratory, radiology and pharmacy are connected to the rest of the hospital, so orders, results, prescriptions, dispensing and stock movement stay in sync across departments instead of travelling on paper.",
      "Billing, Insurance & Hospital Stock":
        "Billing, insurance and hospital stock are handled in the same system that records patient care. Billing is transparent and itemized across consultations, tests and procedures, insurance workflows are built into the billing and claims process, and stock is tracked with expiry visibility.",
      "Complete Patient History & Hospital Overview":
        "Every visit, treatment, lab result and prescription is kept in a complete, chronological patient history that doctors can review at any time. Management gets visibility into patient volume, revenue and department performance from one hospital overview.",
    },
    benefitsTitle: "Why Hospitals Choose a Connected Hospital Management System",
    benefits: [
      {
        title: "Less Repeated Work",
        body: "Information captured once — at registration, in consultation or at billing — is available to every department that needs it, and repetitive steps across registration, care and billing can be automated.",
      },
      {
        title: "Faster Patient Care",
        body: "When doctors, laboratory, radiology and pharmacy work from the same patient record, information doesn't have to be chased between departments before care can continue.",
      },
      {
        title: "Better Hospital Control",
        body: "Administrators see what is happening across departments from one hospital overview, with role and access management so every user sees only what they need.",
      },
    ],
    connectedTitle: "Connect Your Hospital with Other Nalam Systems",
    connectedIntro:
      "The Hospital Management System works on its own, and it also connects with the other Nalam systems when your organization needs more than one.",
    connectWith: {
      lms: "When HMS and LMS are connected, hospital doctors can order laboratory tests directly, and laboratory results flow back into the patient's hospital record.",
      cms: "HMS, LMS and CMS can be combined into one connected healthcare ecosystem, so patient information and workflows move between hospital, clinic and laboratory.",
    },
    closing:
      "Tell us how your hospital works today. Our team will walk you through how the Hospital Management System fits your workflow — and what can be customized around it.",
  },

  lms: {
    h1: "Laboratory Management System",
    intro: [
      "Nalam's Laboratory Management System is laboratory management software that manages your entire laboratory workflow — from test registration and sample collection to processing, validation, authorization and final report delivery.",
      "With direct lab machine integration, smart sample and barcode management and built-in reagent and stock control, it is designed around one outcome: less manual entry, faster reports and better lab control.",
    ],
    overviewTitle: "Your Entire Lab Workflow on One Platform",
    overview: [
      "A diagnostic laboratory handles a long chain of steps for every test: an order is registered, a sample is collected and labelled, the test is processed, results are validated and authorized, and a report is delivered. When those steps rely on manual entry and separate records, reports take longer and lab managers lose sight of what is happening.",
      "Nalam's laboratory management system software connects each of these steps. Test orders move through sample collection, processing, validation and authorization to the final report without being re-keyed, results are captured from connected lab machines, and every result becomes part of the patient's history. Lab managers get a dashboard view of the laboratory instead of chasing status updates.",
    ],
    audience:
      "The Laboratory Management System runs independently for a standalone diagnostic lab, and connects with Nalam's hospital and clinic systems for connected hospital-laboratory or clinic-laboratory operations.",
    featuresTitle: "Laboratory Management Software Features",
    featuresDescription:
      "Everything a diagnostic laboratory needs to move a test from order to authorized report — in one connected system.",
    featureDetails: {
      "Test Order to Final Report":
        "Follow every test from the moment it is ordered to the moment the report is delivered. Registration, sample collection, processing, validation, authorization and report delivery are handled as one continuous workflow, so each test's status is always clear.",
      "Direct Lab Machine Integration":
        "Connect laboratory instruments directly to the system so results are captured from the machine rather than typed in by hand. Reducing manual result entry helps laboratories deliver faster, more accurate reports.",
      "Smart Sample & Barcode Management":
        "Samples are identified and tracked with barcodes from collection through processing, helping your team keep every sample matched to the right patient and the right test.",
      "Result Validation & Authorization":
        "Results pass through validation and authorization before a report is released, giving your laboratory a controlled review step before results reach patients and doctors.",
      "Reagent, Stock & Expiry Management":
        "Track reagents, stock and consumables with expiry visibility, so your team knows what is available and what needs attention before it affects testing.",
      "Lab Dashboard & Patient History":
        "A lab dashboard gives managers an overview of laboratory activity, while each patient's history keeps past tests and results available for reference.",
    },
    benefitsTitle: "Less Manual Entry. Faster Reports. Better Lab Control.",
    benefits: [
      {
        title: "Less Manual Entry",
        body: "Direct machine integration and a single connected workflow reduce how much your team has to type in by hand — from test registration to the final report.",
      },
      {
        title: "Faster Reports",
        body: "With results captured from instruments and moved through validation and authorization in one system, reports can be delivered to patients and doctors sooner.",
      },
      {
        title: "Better Lab Control",
        body: "Barcode sample tracking, reagent and expiry visibility and a lab dashboard give lab managers a clear view of what is happening across the laboratory.",
      },
    ],
    connectedTitle: "Connect Your Laboratory with Hospitals and Clinics",
    connectedIntro:
      "The Laboratory Management System works on its own for a standalone lab, and connects with Nalam's hospital and clinic systems when your laboratory serves them.",
    connectWith: {
      hms: "When LMS is connected with HMS, hospital doctors can order laboratory tests directly, and results flow back into the patient's hospital record.",
      cms: "When LMS is connected with CMS, clinic consultations and prescriptions link with laboratory workflows and reports — without switching systems.",
    },
    closing:
      "Share how your laboratory works today, and our team will walk you through how the Laboratory Management System fits your workflow — from sample to report.",
  },

  cms: {
    h1: "Clinic Management System",
    intro: [
      "Nalam's clinic management software manages appointments, consultations, procedures, treatment plans, pharmacy, billing and complete patient history through one intelligent clinic platform.",
      "Every step of the clinic journey — from appointment to billing — runs on the same connected system, so staff spend less time switching between screens and patient information never ends up scattered.",
    ],
    overviewTitle: "Everything Your Clinic Runs On, in One Place",
    overview: [
      "A clinic handles a lot in a single day: booking appointments, running consultations, carrying out procedures, managing treatment plans and packages, dispensing medicines and collecting payments. When those tasks live in different tools, staff spend their time switching between screens and patient information ends up scattered.",
      "Nalam's clinic management system software brings the whole clinic journey — from appointment to billing — onto one platform, with a complete Patient 360 view so everyone in the clinic works from the same picture of each patient.",
    ],
    audience:
      "The Clinic Management System is built for single-location and multi-location clinics, and connects with Nalam's laboratory system for connected clinic-laboratory operations.",
    featuresTitle: "Clinic Management System Features",
    featuresDescription:
      "The clinic software capabilities that take a patient from appointment to billing, all on one connected platform.",
    featureDetails: {
      "Appointment to Billing":
        "Manage the full clinic visit — appointment, consultation, procedures, pharmacy and billing — as one connected flow, so each step builds on the information captured before it.",
      "Smart Procedures & Surgery":
        "Manage the procedures and surgeries carried out in your clinic within the same system as consultations and billing, so they become part of each patient's history.",
      "Smart Packages & Treatment Plans":
        "Set up treatment plans and packages for patients whose care spans multiple visits, and keep each plan connected to the patient's consultations and billing.",
      "Predefined Consultation Presets":
        "Use predefined consultation presets for routine consultations, so doctors spend less time on repetitive entry and more time with patients.",
      "Integrated Pharmacy & Inventory":
        "Pharmacy and inventory are integrated with consultations and billing, keeping prescriptions, dispensing and stock movement in sync.",
      "Complete Patient 360":
        "See each patient's complete history — visits, treatments, prescriptions and results — in one view, so every consultation starts with the full picture.",
    },
    benefitsTitle: "Less Switching. Faster Consultations. Total Clarity.",
    benefits: [
      {
        title: "Less Switching",
        body: "Appointments, consultations, procedures, pharmacy and billing all run on the same platform, so staff aren't moving between separate tools to get through a visit.",
      },
      {
        title: "Faster Consultations",
        body: "Predefined consultation presets and a connected patient record mean doctors spend less time on repetitive entry and more time with patients.",
      },
      {
        title: "Total Clarity",
        body: "With appointments, procedures, treatment plans, pharmacy, billing and patient history on one platform, clinic owners have a clear view of how the clinic is running.",
      },
    ],
    connectedTitle: "Connect Your Clinic with Other Nalam Systems",
    connectedIntro:
      "The Clinic Management System works on its own, and it connects with the other Nalam systems when your clinic needs more.",
    connectWith: {
      lms: "CMS can be connected with LMS so that clinic consultations and prescriptions link with laboratory workflows and reports, giving you a single view of patient investigations without switching systems.",
      hms: "HMS, LMS and CMS can be combined into one connected healthcare ecosystem, so patient information and workflows move between clinic, hospital and laboratory.",
    },
    closing:
      "Tell us how your clinic runs today, and our team will walk you through how the Clinic Management System fits your workflow.",
  },
};

export interface ShowcaseInfoChip {
  label: string;
  sublabel: string;
}

/**
 * Floating info-chip labels shown over each product's photo in the homepage
 * showcase (SolutionShowcaseCard). Drawn from each product's existing
 * features/positioning in constants.ts — no new capabilities introduced.
 */
export const showcaseInfoChips: Record<ProductId, ShowcaseInfoChip[]> = {
  hms: [
    { label: "Patient Care", sublabel: "Connected & Simplified" },
    { label: "Appointments", sublabel: "From Registration to Discharge" },
    { label: "All Departments", sublabel: "One Unified Platform" },
  ],
  lms: [
    { label: "Test Processing", sublabel: "Accurate & Reliable" },
    { label: "Smart Sample", sublabel: "Management" },
    { label: "Final Reports", sublabel: "Faster Delivery" },
  ],
  cms: [
    { label: "Appointments", sublabel: "Simple & Efficient" },
    { label: "Smart Consultation", sublabel: "Better Patient Care" },
    { label: "Complete Patient 360", sublabel: "" },
  ],
};

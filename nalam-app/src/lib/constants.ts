export const siteConfig = {
  name: "Nalam Software",
  legalName: "Nalam Software",
  tagline: "One Healthcare Platform. Three Powerful Systems.",
  description:
    "Nalam Software provides modern hospital, laboratory and clinic management software designed to connect healthcare workflows, automate operations and support customized healthcare solutions.",
  url: "https://www.nalamsoftware.com",
  ogImage: "/images/og-default.jpg",
  contact: {
    email: "info@nalam.care",
    phone: "+91 86087 92718",
    address: "2nd Floor, DNO: 30, Indira Nagar, Narasothipatti, Salem, Tamil Nadu 636004",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/nalam-software",
    twitter: "https://twitter.com/nalamsoftware",
  },
} as const;

export type ProductId = "lms" | "hms" | "cms";

export interface ProductFeature {
  title: string;
}

export interface Product {
  id: ProductId;
  shortName: string;
  fullName: string;
  slug: string;
  landingSlug: string;
  positioning: string;
  description: string;
  features: ProductFeature[];
  valueStatement: string;
  closingStatement: string;
  ctaLabel: string;
  audience: string;
  eyebrow: string;
  accent: "teal" | "navy" | "coral";
  /** Real photo used in the homepage showcase card and the solution page hero. */
  photoSrc: string;
}

export const products: Record<ProductId, Product> = {
  lms: {
    id: "lms",
    shortName: "LMS",
    fullName: "Laboratory Management System",
    slug: "lms",
    landingSlug: "/solutions/laboratory-management-system",
    positioning: "From Sample to Report — Fully Connected.",
    description:
      "Manage your entire laboratory workflow from test registration and sample collection to processing, validation, authorization and final report delivery.",
    features: [
      { title: "Test Order to Final Report" },
      { title: "Direct Lab Machine Integration" },
      { title: "Smart Sample & Barcode Management" },
      { title: "Result Validation & Authorization" },
      { title: "Reagent, Stock & Expiry Management" },
      { title: "Lab Dashboard & Patient History" },
    ],
    valueStatement: "Less Manual Entry. Faster Reports. Better Lab Control.",
    closingStatement: "Run Your Entire Laboratory from One Smart Platform.",
    ctaLabel: "Explore Laboratory Management System",
    audience: "Diagnostic laboratory owners and lab managers",
    eyebrow: "Laboratory Management Software",
    accent: "teal",
    photoSrc: "/images/solutions/laboratory.png",
  },
  hms: {
    id: "hms",
    shortName: "HMS",
    fullName: "Hospital Management System",
    slug: "hms",
    landingSlug: "/solutions/hospital-management-system",
    positioning: "One Patient. One Hospital Journey. Everything Connected.",
    description:
      "Manage the complete patient journey from registration and appointments to consultation, admission, treatment, discharge and follow-up through one connected hospital platform.",
    features: [
      { title: "From Appointment to Discharge" },
      { title: "Complete Doctor & Patient Care" },
      { title: "Complete Inpatient, Emergency & Surgery Management" },
      { title: "Laboratory, Radiology & Pharmacy — All Connected" },
      { title: "Billing, Insurance & Hospital Stock" },
      { title: "Complete Patient History & Hospital Overview" },
    ],
    valueStatement: "Less Repeated Work. Faster Patient Care. Better Hospital Control.",
    closingStatement: "Run Your Entire Hospital from One Simple, Connected Platform.",
    ctaLabel: "Explore Hospital Management System",
    audience: "Hospital owners and hospital administrators",
    eyebrow: "Hospital Management Software",
    accent: "navy",
    photoSrc: "/images/solutions/hospital.png",
  },
  cms: {
    id: "cms",
    shortName: "CMS",
    fullName: "Clinic Management System",
    slug: "cms",
    landingSlug: "/solutions/clinic-management-system",
    positioning: "One Platform. One Patient Journey. One Intelligent Assistant.",
    description:
      "Manage appointments, consultations, procedures, treatment plans, pharmacy, billing and complete patient history through one intelligent clinic platform.",
    features: [
      { title: "Appointment to Billing" },
      { title: "Smart Procedures & Surgery" },
      { title: "Smart Packages & Treatment Plans" },
      { title: "Predefined Consultation Presets" },
      { title: "Integrated Pharmacy & Inventory" },
      { title: "Complete Patient 360" },
    ],
    valueStatement: "One Assistant. Instant Answers. Total Clarity.",
    closingStatement: "Run Your Entire Clinic from One Intelligent Platform.",
    ctaLabel: "Explore Clinic Management System",
    audience: "Clinic owners and medical management teams",
    eyebrow: "Clinic Management Software",
    accent: "coral",
    photoSrc: "/images/solutions/clinic.png",
  },
};

export const productList = Object.values(products);

export const navigation = {
  main: [
    { label: "Home", href: "/" },
    {
      // Parent href is used by the mobile accordion (rendered as a Link there).
      // On desktop, Header.tsx renders parents-with-children as a hover/click
      // dropdown trigger, so the overview page is reached from the mobile menu,
      // the footer, breadcrumbs and in-page links.
      label: "Solutions",
      href: "/solutions",
      children: [
        { label: "Hospital Management System", href: "/solutions/hospital-management-system" },
        { label: "Laboratory Management System", href: "/solutions/laboratory-management-system" },
        { label: "Clinic Management System", href: "/solutions/clinic-management-system" },
      ],
    },
    { label: "Custom Solutions", href: "/custom-healthcare-software-development" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

/**
 * Customization options offered across HMS, LMS and CMS. Shared by the
 * homepage CustomizationSection and the Custom Healthcare Software
 * Development page so both always list the same options.
 */
export const customizationOptions = [
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
] as const;

/** Canonical paths for the site's top-level marketing routes. */
export const routes = {
  home: "/",
  solutions: "/solutions",
  customSolutions: "/custom-healthcare-software-development",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",
} as const;

export const organizationTypes = [
  { value: "hospital", label: "Hospital" },
  { value: "laboratory", label: "Laboratory" },
  { value: "clinic", label: "Clinic" },
  { value: "hospital_lab", label: "Hospital + Laboratory" },
  { value: "clinic_lab", label: "Clinic + Laboratory" },
  { value: "other", label: "Other" },
] as const;

/**
 * Homepage FAQ — kept to 5 questions about the overall Nalam platform.
 * Solution-specific questions live in hmsFaqs/lmsFaqs/cmsFaqs instead, on
 * their own dedicated pages.
 */
export const faqs = [
  {
    question: "What is Nalam Software?",
    answer:
      "Nalam Software is a healthcare management software company providing connected Hospital, Laboratory and Clinic Management Systems that can run independently or together as one unified healthcare platform.",
  },
  {
    question: "Can Nalam connect hospital, laboratory and clinic workflows?",
    answer:
      "Yes. Nalam's Hospital, Laboratory and Clinic Management Systems can be combined into a single connected healthcare ecosystem, so patient information and workflows move between hospital, clinic and laboratory departments instead of staying siloed in separate tools.",
  },
  {
    question: "Can Nalam Software be customized for our organization?",
    answer:
      "Yes. Nalam Software can be customized around your organization's workflow, including custom screens, reports, fields, roles and permissions, integrations, dashboards, automation and billing workflows, so the software matches how your team actually works.",
  },
  {
    question: "Does Nalam support integrations and automated communication?",
    answer:
      "Yes. Nalam supports direct lab machine integration for laboratories, and automated WhatsApp communication is built into the platform so your organization can reach patients without switching tools.",
  },
  {
    question: "Can we start with one Nalam system and add other systems later?",
    answer:
      "Yes. Each Nalam system — Hospital, Laboratory and Clinic Management — runs independently on its own, and can be connected with the other systems later as one unified healthcare platform when your organization needs it.",
  },
];

/** Hospital Management System page FAQ — hospital-specific questions only. */
export const hmsFaqs = [
  {
    question: "What is the Hospital Management System?",
    answer:
      "The Hospital Management System (HMS) is hospital management software that connects the complete patient journey — registration, appointments, consultation, admission, treatment, discharge and follow-up — along with laboratory, radiology, pharmacy, billing and insurance, all on one connected hospital platform.",
  },
  {
    question: "Does HMS manage appointments, admissions and discharge?",
    answer:
      "Yes. HMS manages every stage of the patient journey in sequence — registration, appointments, consultation, admission, treatment, discharge and follow-up — so patient details don't need to be re-entered as the patient moves through the hospital.",
  },
  {
    question: "Can HMS handle inpatient, emergency and surgery management?",
    answer:
      "Yes. Inpatient admissions, emergency cases and surgeries are managed inside the same hospital software rather than in separate registers, so the care delivered in each area becomes part of the patient's complete history.",
  },
  {
    question: "Are laboratory, radiology and pharmacy connected within HMS?",
    answer:
      "Yes. Laboratory, radiology and pharmacy are connected to the rest of the hospital, so orders, results, prescriptions, dispensing and stock movement stay in sync across departments instead of travelling on paper.",
  },
  {
    question: "Does HMS handle billing and insurance?",
    answer:
      "Yes. Billing and insurance are handled in the same system that records patient care — billing is transparent and itemized across consultations, tests and procedures, and insurance workflows are built into the billing and claims process.",
  },
  {
    question: "Is complete patient history available in HMS?",
    answer:
      "Yes. Every visit, treatment, lab result and prescription is kept in a complete, chronological patient history that doctors can review at any time, alongside a hospital overview for management.",
  },
  {
    question: "Can HMS be customized for how our hospital works?",
    answer:
      "Yes. HMS can be customized around your hospital's workflow, including custom screens, reports, fields, roles and permissions, integrations, dashboards, automation and billing workflows.",
  },
];

/** Laboratory Management System page FAQ — laboratory-specific questions only. */
export const lmsFaqs = [
  {
    question: "What is the Laboratory Management System?",
    answer:
      "The Laboratory Management System (LMS) is laboratory management software that manages the full lab workflow, from test order and sample collection to processing, result validation, authorization and report delivery, with direct lab machine integration and reagent stock management.",
  },
  {
    question: "Does LMS support sample and barcode management?",
    answer:
      "Yes. Samples are identified and tracked with barcodes from collection through processing, helping your team keep every sample matched to the right patient and the right test.",
  },
  {
    question: "Does Nalam support laboratory machine integration?",
    answer:
      "Yes. LMS supports direct lab machine integration, so results are captured from the instrument rather than typed in by hand, reducing manual result entry and helping laboratories deliver faster, more accurate reports.",
  },
  {
    question: "How does result validation and authorization work in LMS?",
    answer:
      "Results pass through validation and authorization before a report is released, giving your laboratory a controlled review step before results reach patients and doctors.",
  },
  {
    question: "Can LMS help manage reporting and turnaround time?",
    answer:
      "Yes. Test orders move through sample collection, processing, validation and authorization to the final report without being re-keyed, and a lab dashboard gives managers a real-time view of laboratory activity instead of chasing status updates.",
  },
  {
    question: "Does LMS track reagents and stock?",
    answer:
      "Yes. LMS tracks reagents, stock and consumables with expiry visibility, so your team knows what is available and what needs attention before it affects testing.",
  },
  {
    question: "Can LMS be customized for our laboratory?",
    answer:
      "Yes. LMS can be customized around your laboratory's workflow, including custom screens, reports, fields, roles and permissions, integrations, dashboards and automation.",
  },
];

/** Clinic Management System page FAQ — clinic-specific questions only. */
export const cmsFaqs = [
  {
    question: "What is the Clinic Management System?",
    answer:
      "The Clinic Management System (CMS) is clinic management software that handles appointments, consultations, procedures, treatment plans, pharmacy and billing through one intelligent clinic platform.",
  },
  {
    question: "Does CMS manage appointments and consultations?",
    answer:
      "Yes. CMS manages the full clinic visit — appointment, consultation, procedures, pharmacy and billing — as one connected flow, so each step builds on the information captured before it.",
  },
  {
    question: "Can CMS handle treatment plans and packages?",
    answer:
      "Yes. CMS lets you set up treatment plans and packages for patients whose care spans multiple visits, keeping each plan connected to the patient's consultations and billing.",
  },
  {
    question: "Does CMS support procedures and pharmacy/inventory?",
    answer:
      "Yes. Procedures and surgeries carried out in your clinic are managed within the same system as consultations and billing, and pharmacy and inventory are integrated so prescriptions, dispensing and stock movement stay in sync.",
  },
  {
    question: "Does CMS provide a complete view of each patient?",
    answer:
      "Yes. CMS provides a complete Patient 360 view — visits, treatments, prescriptions and results — in one place, so every consultation starts with the full picture.",
  },
  {
    question: "What is KK AI in the Clinic Management System?",
    answer:
      "KK AI is your clinic's intelligent assistant, built into CMS. It answers questions about your clinic in simple language, using your own clinic data, instead of you having to search through multiple screens or reports.",
  },
  {
    question: "Can CMS be customized for our clinic?",
    answer:
      "Yes. CMS can be customized around your clinic's workflow, including custom screens, reports, fields, roles and permissions, integrations, dashboards and automation.",
  },
];

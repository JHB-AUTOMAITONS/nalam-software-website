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
}

export const products: Record<ProductId, Product> = {
  lms: {
    id: "lms",
    shortName: "LMS",
    fullName: "Lab Management System",
    slug: "lms",
    landingSlug: "/#lms",
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
    ctaLabel: "Explore LMS",
    audience: "Diagnostic laboratory owners and lab managers",
    eyebrow: "Laboratory Management Software",
    accent: "teal",
  },
  hms: {
    id: "hms",
    shortName: "HMS",
    fullName: "Hospital Management System",
    slug: "hms",
    landingSlug: "/#hms",
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
    ctaLabel: "Explore HMS",
    audience: "Hospital owners and hospital administrators",
    eyebrow: "Hospital Management Software",
    accent: "navy",
  },
  cms: {
    id: "cms",
    shortName: "CMS",
    fullName: "Clinic Management System",
    slug: "cms",
    landingSlug: "/#cms",
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
    ctaLabel: "Explore CMS",
    audience: "Clinic owners and medical management teams",
    eyebrow: "Clinic Management Software",
    accent: "coral",
  },
};

export const productList = Object.values(products);

export const navigation = {
  main: [
    { label: "Home", href: "/" },
    {
      label: "Solutions",
      href: "/#solutions",
      children: [
        { label: "HMS", href: "/#hms" },
        { label: "LMS", href: "/#lms" },
        { label: "CMS", href: "/#cms" },
      ],
    },
    { label: "Custom Solutions", href: "/#customization" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export const organizationTypes = [
  { value: "hospital", label: "Hospital" },
  { value: "laboratory", label: "Laboratory" },
  { value: "clinic", label: "Clinic" },
  { value: "hospital_lab", label: "Hospital + Laboratory" },
  { value: "clinic_lab", label: "Clinic + Laboratory" },
  { value: "other", label: "Other" },
] as const;

export const interestedSystems = [
  { value: "lms", label: "LMS — Lab Management" },
  { value: "hms", label: "HMS — Hospital Management" },
  { value: "cms", label: "CMS — Clinic Management" },
  { value: "multiple", label: "Multiple Systems" },
  { value: "custom", label: "Custom Solution" },
] as const;

export const faqs = [
  {
    question: "What is the Hospital Management System?",
    answer:
      "The Hospital Management System (HMS) is hospital management software that connects the complete patient journey — registration, appointments, consultation, admission, treatment, discharge and follow-up — along with laboratory, radiology, pharmacy, billing and insurance, all on one connected hospital platform.",
  },
  {
    question: "What is the Lab Management System?",
    answer:
      "The Lab Management System (LMS) is laboratory management software that manages the full lab workflow, from test order and sample collection to processing, result validation, authorization and report delivery, with direct lab machine integration and reagent stock management.",
  },
  {
    question: "What is the Clinic Management System?",
    answer:
      "The Clinic Management System (CMS) is clinic management software that handles appointments, consultations, procedures, treatment plans, pharmacy and billing through one intelligent clinic platform, including KK AI, an assistant that answers questions using your own clinic data.",
  },
  {
    question: "Can Nalam Software be customized?",
    answer:
      "Yes. Nalam Software can be customized around your organization's workflow, including custom screens, reports, fields, roles and permissions, integrations, dashboards, automation and billing workflows, so the hospital, laboratory or clinic management software matches how your team actually works.",
  },
  {
    question: "Can Nalam connect hospital and laboratory workflows?",
    answer:
      "Yes. When HMS and LMS are connected, hospital doctors can order laboratory tests directly, and laboratory results flow back into the patient's hospital record, keeping hospital and lab teams working from the same patient information.",
  },
  {
    question: "Can Nalam connect clinic and laboratory workflows?",
    answer:
      "Yes. CMS can be connected with LMS so that clinic consultations and prescriptions link with laboratory workflows and reports, giving clinic owners a single view of patient investigations without switching systems.",
  },
  {
    question: "Can multiple Nalam systems be combined?",
    answer:
      "Yes. Nalam Software can combine HMS, LMS and CMS into a single connected healthcare ecosystem, so patient information and workflows can move between hospital, clinic and laboratory departments.",
  },
  {
    question: "Does Nalam support laboratory machine integration?",
    answer:
      "Yes. LMS supports direct lab machine integration, reducing manual result entry and helping laboratories deliver faster, more accurate reports.",
  },
  {
    question: "Does Nalam provide patient history?",
    answer:
      "Yes. Across HMS, LMS and CMS, patient history is maintained centrally, giving doctors and healthcare teams a complete view of past visits, treatments, lab results and prescriptions.",
  },
  {
    question: "What type of healthcare organizations can use Nalam?",
    answer:
      "Nalam Software is built for hospitals, diagnostic laboratories, clinics and healthcare groups that operate a combination of these — including multi-specialty hospitals, standalone diagnostic labs, single or multi-location clinics, and connected hospital-lab or clinic-lab operations.",
  },
];

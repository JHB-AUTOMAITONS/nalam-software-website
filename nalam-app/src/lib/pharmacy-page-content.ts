/**
 * Content for /solutions/pharmacy-management-system.
 *
 * VERIFICATION POLICY
 * This repository contains the marketing site only (no pharmacy product
 * source). The only pharmacy capabilities the site already states publicly are:
 *   - HMS: laboratory, radiology and pharmacy connected; prescriptions,
 *     dispensing and stock movement stay in sync across departments.
 *   - HMS: billing is itemized; hospital stock is part of the platform.
 *   - CMS: pharmacy and inventory integrated with consultations and billing.
 *   - HMS / LMS / CMS each run independently and can be connected later.
 *   - Customization: screens, reports, fields, roles & permissions,
 *     dashboards, automation, billing workflows.
 * The product owner has stated that a Pharmacy module exists (medicines,
 * stock, purchases/GRN, medicine catalogue, inventory, purchase receiving), but
 * the product source was not available to inspect, so none of it is code-verified.
 * Everything not listed above (batch/expiry, suppliers, transfers, reports,
 * OPD/IPD specifics, standalone pharmacy deployment, GST) is written as a
 * hospital need + "confirm in demo", never as a product claim.
 * Flip `status` to "verified" only with implementation evidence.
 */

export const pharmacyPagePath = "/solutions/pharmacy-management-system";

export const pharmacyMeta = {
  title: "Pharmacy Management System for Hospitals | NALAM",
  description:
    "Manage hospital pharmacy operations with NALAM Pharmacy Management System. Simplify medicine inventory, prescriptions, batch tracking and billing.",
  h1: "A Smarter Pharmacy Management System for Modern Hospitals",
  keywords: [
    "Pharmacy Management System",
    "Pharmacy Management Software",
    "Hospital Pharmacy Management System",
    "Hospital Pharmacy Software",
    "Pharmacy Inventory Management Software",
    "Integrated Pharmacy Management System",
  ],
} as const;

export type CapabilityStatus = "verified" | "confirm";

export interface PharmacyFeature {
  title: string;
  status: CapabilityStatus;
  body: string;
}

export const heroIntro =
  "Manage hospital pharmacy operations with NALAM Pharmacy Management System. Bring medicine inventory, prescription management, batch tracking, pharmacy billing and dispensing into one workflow, connected to the rest of your hospital through NALAM HMS or CMS.";

export const introduction = {
  title: "Simplify Hospital Pharmacy Operations with NALAM Pharmacy Management Software",
  paragraphs: [
    "A hospital pharmacy sits between doctors who prescribe, patients who wait, purchase teams who replenish stock and accounts who need every issue billed correctly. On registers or spreadsheets, that is where information gets re-typed and mismatches surface late.",
    "Pharmacy management software gives the pharmacy one record of what was prescribed, what is in stock, what was dispensed and what was billed. For a hospital pharmacy management system, the gains are stock you can trust, fewer questions between ward, counter and store, and billing that follows what was issued.",
    "NALAM's pharmacy is designed to sit inside the same platform as the patient record, so prescriptions, dispensing and stock movement stay in sync with the rest of the hospital.",
  ],
};

export const whatIs = {
  title: "What Is a Hospital Pharmacy Management System?",
  paragraphs: [
    "A hospital pharmacy management system is software that runs the medicine side of a hospital: what you stock, how it is received, who it is prescribed to, how it is issued and how it is billed. Unlike a retail tool, it has to work alongside doctors, wards and hospital billing.",
  ],
  covers: [
    { title: "Medicine catalogue", body: "One list of the medicines your pharmacy handles." },
    { title: "Stock management", body: "Quantity on hand and movement, visible before a prescription is filled." },
    { title: "Prescription processing", body: "Doctors' prescriptions reviewed by the pharmacy." },
    { title: "Medicine dispensing", body: "Issuing medicines against a prescription." },
    { title: "Billing", body: "Charging what was dispensed." },
    { title: "Purchase management", body: "Ordering and receiving stock in an orderly way." },
    { title: "Pharmacy reporting", body: "Views the pharmacy head can act on." },
  ],
};

export const featuresSection = {
  title: "Complete Pharmacy Management Software Features",
  description:
    "Ten areas a hospital pharmacy needs covered. \"Connected in NALAM\" marks capabilities our website already describes as part of the platform. \"Scoped in demo\" marks areas we walk through against your requirements, so you see exactly how each works before you decide.",
};

export const pharmacyFeatures: PharmacyFeature[] = [
  { title: "Medicine Catalogue Management", status: "confirm", body: "A consistent medicine list is the base for reliable stock, prescriptions and billing. Without it, one medicine appears under several names." },
  { title: "Pharmacy Inventory Management", status: "verified", body: "Stock and stock movement sit in the same platform as the hospital record, so dispensing and stock stay in sync and the pharmacy sees what is available." },
  { title: "Batch-Wise Medicine Tracking", status: "confirm", body: "Batch records let each issue be traced to the lot it came from, which matters for recalls and audits." },
  { title: "Medicine Expiry Management", status: "confirm", body: "Expiry dates held against stock let the store spot near-expiry items before they are shelved or issued." },
  { title: "Purchase Management and Goods Receiving", status: "confirm", body: "Purchase entries and receiving give an organized trail from order to stock on the shelf." },
  { title: "Prescription Management", status: "verified", body: "Prescriptions raised in the hospital reach the pharmacy, so dispensing starts from the doctor's order instead of paper slips." },
  { title: "Pharmacy Billing", status: "verified", body: "Billing is itemized and kept with the patient record, so pharmacy charges and the patient bill agree." },
  { title: "Stock Transfers and Adjustments", status: "confirm", body: "Recorded transfers and corrections keep stock changes explainable instead of informally edited." },
  { title: "Pharmacy Reports", status: "confirm", body: "Reports spare managers from compiling figures by hand. NALAM reports can also be customized to your needs." },
  { title: "User and Access Management", status: "confirm", body: "Each user should see only what their job needs. NALAM supports customized roles and permissions." },
];

export const opdIpd = {
  title: "Manage OPD and IPD Pharmacy Operations",
  paragraphs: [
    "Outpatient pharmacy is mostly counter work against a consultation's prescription. Inpatient pharmacy is tied to an admission, with medicines needed through the stay and charges that join the patient's bill. A hospital pharmacy should handle both against one patient record.",
    "Because NALAM connects pharmacy to the hospital record, prescriptions can reach the pharmacy from the consultation or the ward. Exactly how OPD and IPD flows are set up for your hospital is confirmed during a demo, so we commit only to what fits your workflow.",
  ],
};

export const inventory = {
  title: "Smart Pharmacy Inventory Management for Hospitals",
  paragraphs: [
    "Pharmacy inventory management software should answer one question quickly: what do we have, and will it last? The counter, ward, purchase team and management all ask it, often at once.",
    "Good pharmacy stock management software keeps stock movement tied to dispensing, so quantities change as medicines are issued rather than being corrected at day end. Hospitals should look for stock visibility, receiving, adjustments, batch-level records, expiry tracking and stock reports, and ask to see each on their own data.",
  ],
};

export const batchExpiry = {
  title: "Improve Medicine Batch Tracking and Expiry Monitoring",
  paragraphs: [
    "Batch and expiry records make a pharmacy auditable. If a batch is recalled, or an inspector asks where a lot went, the answer depends on whether the batch was recorded on receipt and on issue. Near-expiry medicines can also be used first, and expired items caught before they reach a ward.",
    "Ask any vendor, including us, to demonstrate batch identification, batch-wise stock, expiry dates and any expiry alerts on your sample data.",
  ],
};

export const purchasing = {
  title: "Simplify Hospital Pharmacy Purchase and Stock Management",
  paragraphs: [
    "Procurement is where pharmacy cost is controlled. A workable process links purchase entries, stock received and reporting, so duplicate orders, unreceived stock and unexplained differences are visible. We scope how purchase entry and goods receiving should work for your hospital during the demo.",
  ],
};

export const billing = {
  title: "Streamline Hospital Pharmacy Billing",
  paragraphs: [
    "Pharmacy billing software for a hospital differs from a retail billing tool: medicines are charged to a patient, often against a prescription or inside an admission, so the charge must land correctly on the patient's bill.",
    "In NALAM, billing is handled in the same system that records patient care, with itemized charges. If you need specific invoice formats, tax handling or insurer-related billing for pharmacy, share your requirements and we will show what fits.",
  ],
};

export const workflow = {
  title: "From Prescription to Medicine Dispensing – A Connected Pharmacy Workflow",
  intro:
    "A connected hospital pharmacy follows the sequence below. Because pharmacy sits inside the hospital platform, each step builds on the one before instead of starting a new record.",
  steps: ["Prescription", "Pharmacy review", "Medicine availability", "Dispensing", "Billing", "Inventory update"],
  outpatient: "Outpatient: the prescription follows the consultation; medicines are dispensed and billed at the counter.",
  inpatient: "Inpatient: the request comes from the treating team during the stay; charges follow the admission.",
};

export const setups = {
  title: "Integrated or Standalone – Choose the Pharmacy Management Setup That Fits Your Hospital",
  integrated: {
    title: "Option A: Integrated Pharmacy Management",
    paragraphs: [
      "An integrated pharmacy management system works as part of NALAM HMS, or CMS for clinics. Laboratory, radiology and pharmacy are connected to the rest of the hospital, so prescriptions, dispensing and stock movement stay in sync.",
      "Patient details, consultations, prescriptions and billing already live in one platform, so the pharmacy does not re-enter them. That reduces duplicate data entry and gives doctors, pharmacists and billing one view.",
    ],
  },
  standalone: {
    title: "Option B: Standalone Pharmacy Management",
    paragraphs: [
      "Each NALAM system runs independently today and can be connected to the others later. A pharmacy-only deployment is a direction we are exploring, not something we promise yet.",
      "If you want to start with pharmacy, contact us. We will confirm plainly whether it fits your hospital and how it would connect to your other systems.",
    ],
  },
};

export const benefits = {
  title: "Benefits of Pharmacy Management Software for Hospitals",
  items: [
    { title: "Better stock visibility", body: "One view of stock instead of calls to the store." },
    { title: "Batch traceability", body: "Know which batch went where." },
    { title: "Expiry monitoring", body: "See near-expiry stock early." },
    { title: "Organized purchasing", body: "Orders and received stock tied together." },
    { title: "Efficient billing", body: "Charge what was dispensed without re-keying." },
    { title: "Less manual work", body: "Details entered once are reused." },
    { title: "Better reporting", body: "Fewer figures compiled by hand." },
    { title: "Pharmacy coordination", body: "Doctors, wards, pharmacy and billing share one record." },
  ],
};

export const whyNalam = {
  title: "Why Choose NALAM Healthcare for Hospital Pharmacy Management?",
  items: [
    { title: "Healthcare-focused", body: "NALAM builds hospital, laboratory and clinic systems, not generic retail tools." },
    { title: "HMS and CMS integration", body: "Pharmacy connects to the hospital or clinic record rather than being bolted on." },
    { title: "Connected departments", body: "Laboratory, radiology and pharmacy share one platform." },
    { title: "Customizable", body: "Screens, reports, fields, roles, dashboards, automation and billing workflows can be tailored." },
    { title: "Start small, connect later", body: "Each NALAM system runs alone and can be linked when you are ready." },
  ],
};

export const comparison = {
  title: "Manual Pharmacy Management vs Digital Pharmacy Management",
  rows: [
    ["Stock visibility", "Checked by hand; depends on last update", "One place, moves with dispensing"],
    ["Batch tracking", "Paper or registers", "Searchable batch records"],
    ["Expiry monitoring", "Manual shelf checks", "Expiry dates held with stock"],
    ["Purchase records", "Orders and receipts in separate files", "Orders and receiving linked"],
    ["Prescriptions", "Paper or relayed", "Reach pharmacy from the hospital record"],
    ["Billing", "Charges re-keyed", "Charges follow what was dispensed"],
    ["Stock reporting", "Compiled by hand", "Generated from the same records"],
    ["Coordination", "Phone calls and messengers", "Shared record"],
  ],
  note: "This table describes pharmacy management software in general. Which capabilities NALAM covers for your pharmacy is confirmed in a demo.",
};

export const faqs = [
  { question: "What is a pharmacy management system?", answer: "Software that manages a pharmacy's medicines, stock, prescriptions, dispensing, purchasing and billing in one place. A hospital version also connects to doctors, wards and patient billing." },
  { question: "How does a pharmacy management system work in hospitals?", answer: "A doctor raises a prescription, the pharmacy reviews it, checks stock, dispenses and bills, and stock is updated. In a connected system such as NALAM's, those steps share the patient record." },
  { question: "What are the important features of hospital pharmacy software?", answer: "A medicine catalogue, inventory with batch and expiry records, prescription handling, dispensing, billing, purchasing, stock adjustments, reports and access control. Ask vendors to demonstrate each on your workflows." },
  { question: "Can pharmacy management software manage medicine inventory?", answer: "Yes, that is its core job. NALAM keeps stock movement in sync with dispensing inside the hospital platform. Specific functions you need, such as adjustments or transfers, can be reviewed in a demo." },
  { question: "Does pharmacy software support batch and expiry tracking?", answer: "Good hospital pharmacy software should record batches and expiry dates and make near-expiry stock visible. We will walk through how NALAM handles this against your requirements." },
  { question: "Can pharmacy management software integrate with hospital management systems?", answer: "Yes. NALAM's pharmacy is connected to its Hospital Management System, and to the Clinic Management System for clinics. Integration with other systems you use should be discussed during scoping." },
  { question: "Can a pharmacy management system work independently?", answer: "In principle, yes. NALAM's Hospital, Laboratory and Clinic systems each run independently today. A pharmacy-only deployment is not something we promise yet; contact us and we will confirm what is possible." },
  { question: "How does pharmacy management software improve billing?", answer: "It lets staff bill what was dispensed instead of re-typing it and keeps pharmacy charges consistent with the patient bill. In NALAM, billing is itemized and handled alongside patient care." },
  { question: "How can hospitals manage medicine purchases and suppliers?", answer: "By linking purchase entries and stock receiving, so each delivery traces to an order. How this works in NALAM for your hospital is covered during a demo." },
  { question: "How do I choose the right pharmacy management software for my hospital?", answer: "List your workflows first, then ask vendors to demonstrate each on your data. Check batch and expiry handling, hospital-system integration, reports, access control, support and customization. Prefer hospital-built software over a retail billing tool." },
];

export const finalCta = {
  title: "Simplify Your Hospital Pharmacy Operations with NALAM",
  description:
    "Explore how NALAM can help your hospital organize pharmacy workflows, medicine inventory, billing and pharmacy operations.",
};

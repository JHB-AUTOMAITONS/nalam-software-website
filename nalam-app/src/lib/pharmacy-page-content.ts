/**
 * Content for /solutions/pharmacy-management-system.
 *
 * VERIFICATION POLICY
 * Capability statements below were checked by static review of the product
 * repository thukal/Nalam-CMS (the Clinic Management System, which contains the
 * Pharmacy module): route table, request-validation schemas and service
 * comments under nalam-cms-backend/src/modules/pharmacy/. Evidence per feature
 * is listed in PHARMACY-MANAGEMENT-SYSTEM-SEO-IMPLEMENTATION-REPORT.md.
 * The code was NOT executed. The module lives in the CMS product; no HMS code,
 * IPD/ward workflow, weighted-average costing or standalone deployment was
 * found, so those are never claimed here. `status: "confirm"` marks any card
 * that cannot be tied to code (none at present).
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

export const heroTagline = "Simplify Hospital Pharmacy Operations. Improve Medicine Management.";

export const heroIntro =
  "NALAM Pharmacy Management System helps hospitals manage pharmacy operations through a connected platform, supporting medicine management, inventory visibility, pharmacy billing and integration with hospital workflows.";

/** Hero photo, served from /public. Add the licensed photo here to enable it. */
export const heroPhotoPublicPath = "/images/solutions/pharmacy-hero.webp";
export const heroPhotoAlt =
  "Pharmacist checking medicines on organized shelves in a hospital pharmacy";

/** Floating hero chips: only capabilities verified in the product code. */
export const heroChips = [
  { label: "Medicine Stock", sublabel: "Batch-Wise Visibility" },
  { label: "Batch & Expiry", sublabel: "Tracked on Every Entry" },
  { label: "Pharmacy Billing", sublabel: "Stock Updated on Finalize" },
];

export const introduction = {
  title: "Simplify Hospital Pharmacy Operations with NALAM Pharmacy Management Software",
  paragraphs: [
    "A hospital pharmacy sits between doctors who prescribe, patients who wait, purchase teams who replenish stock and accounts who need every issue billed correctly. On registers or spreadsheets, that is where information gets re-typed and mismatches surface late.",
    "Pharmacy management software gives the pharmacy one record of what was prescribed, what is in stock, what was dispensed and what was billed. For a hospital pharmacy management system, the gains are stock you can trust, fewer questions between ward, counter and store, and billing that follows what was issued.",
    "NALAM's pharmacy sits inside the same platform as prescriptions and billing, so stock moves as bills are finalized instead of being reconciled afterwards.",
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
    "Ten areas a hospital pharmacy needs covered, each available in NALAM's pharmacy module today. Ask for a demo to see them on your own medicines and workflow.",
};

export const pharmacyFeatures: PharmacyFeature[] = [
  { title: "Medicine Catalogue Management", status: "verified", body: "Record each medicine once with generic name, company, category, strength, HSN code, GST rate, purchase and selling price, dispensing unit and strip or box packaging, and classify it as for-sale or consumable." },
  { title: "Pharmacy Inventory Management", status: "verified", body: "Stock is held batch by batch for each branch and for a central pharmacy hub, with low-stock views and a movement ledger showing every stock-in and stock-out." },
  { title: "Batch-Wise Medicine Tracking", status: "verified", body: "Every stock entry carries a batch number with manufacturing and expiry dates, and each medicine has a batch drill-down, so an issue can be traced to its lot." },
  { title: "Medicine Expiry Management", status: "verified", body: "Expiry is held per batch. Expired batches are excluded from sales, and near-expiry and expired stock can be reviewed and exported." },
  { title: "Purchase Management and Goods Receiving", status: "verified", body: "Receive stock vendor-first: choose a vendor, add many medicine lines with batch, expiry, quantity, free quantity, cost, MRP and discounts, plus invoice number, date and payment terms. Vendor bills track payments, and vendor returns can record credit notes." },
  { title: "Prescription Management", status: "verified", body: "Doctors choose medicines from the same pharmacy catalogue while prescribing, with stock status visible, and the prescription feeds the bill." },
  { title: "Pharmacy Billing", status: "verified", body: "Consultation bills and walk-in pharmacy bills draw stock automatically when finalized, earliest expiry first. Cancelling a finalized bill restores the stock." },
  { title: "Stock Transfers and Adjustments", status: "verified", body: "The hub ships stock to branches (ready, ship, receive, partial receive), branches raise stock requests, and manual adjustments require a recorded reason." },
  { title: "Pharmacy Reports and Exports", status: "verified", body: "A hub dashboard with analytics, reconciliation and low-stock suggestions, plus CSV exports for stock, receipts, near-expiry stock, expired stock and vendor bills." },
  { title: "User and Access Management", status: "verified", body: "Permission-based roles, including a pharmacy hub manager role that has no clinical or patient access. Key actions are audit-logged." },
];

export const opdIpd = {
  title: "OPD and IPD Pharmacy: What Is Supported Today",
  paragraphs: [
    "Outpatient pharmacy follows the consultation. The doctor prescribes from the catalogue, reception creates the bill, and stock is drawn when the bill is finalized. Walk-in pharmacy sales can also be billed directly.",
    "Inpatient pharmacy, meaning ward medicine requests, issues and returns against an admission, is not a workflow we describe here. If your hospital needs it, tell us during scoping and we will say plainly what fits.",
  ],
};

export const inventory = {
  title: "Smart Pharmacy Inventory Management for Hospitals",
  paragraphs: [
    "Pharmacy inventory management software should answer one question quickly: what do we have, and will it last? The counter, ward, purchase team and management all ask it, often at once.",
    "Good pharmacy stock management software keeps stock movement tied to billing, so quantities change as medicines are issued rather than being corrected at day end. In NALAM, stock is held per batch for each branch and a central hub, with receiving, adjustments, low-stock views, expiry review and a movement ledger.",
  ],
};

export const batchExpiry = {
  title: "Improve Medicine Batch Tracking and Expiry Monitoring",
  paragraphs: [
    "Batch and expiry records make a pharmacy auditable. If a batch is recalled, or an inspector asks where a lot went, the answer depends on whether the batch was recorded on receipt and on issue.",
    "NALAM records the batch and expiry on every stock entry, deducts the earliest-expiring batch first, skips expired batches, and lets the hub review near-expiry and expired stock. Ask us to demonstrate it on your sample data.",
  ],
};

export const purchasing = {
  title: "Simplify Hospital Pharmacy Purchase and Stock Management",
  paragraphs: [
    "Procurement is where pharmacy cost is controlled. NALAM links vendor records, purchase receipts with batch and expiry, vendor bills and payments, and vendor returns, so every delivery traces to a vendor and an invoice. Duplicate orders, unreceived stock and unexplained differences become easier to spot.",
  ],
};

export const billing = {
  title: "Streamline Hospital Pharmacy Billing",
  paragraphs: [
    "Pharmacy billing software for a hospital differs from a retail billing tool: medicines are charged to a patient, often from a prescription, so the charge must land correctly on the patient's bill.",
    "In NALAM, a consultation bill reads the prescription, and a walk-in pharmacy bill is created directly. Finalizing either deducts stock automatically from the earliest-expiring batches. If you need specific invoice formats, tax handling or insurer billing for pharmacy, share your requirements and we will show what fits.",
  ],
};

export const workflow = {
  title: "From Prescription to Medicine Dispensing – A Connected Pharmacy Workflow",
  intro:
    "This is the flow as NALAM's pharmacy runs it today. Because pharmacy sits inside the same platform as consultations and billing, each step builds on the one before instead of starting a new record.",
  steps: ["Doctor prescribes", "Stock status checked", "Bill created", "Bill finalized", "Stock deducted"],
  outpatient: "Consultation: the prescription flows from the doctor to the bill, and stock is deducted when the bill is finalized, earliest expiry first.",
  inpatient: "Walk-in: a pharmacy bill is created directly and stock is deducted when it is finalized.",
};

export const setups = {
  title: "Integrated or Standalone – Choose the Pharmacy Management Setup That Fits Your Hospital",
  integrated: {
    title: "Option A: Integrated Pharmacy Management",
    paragraphs: [
      "An integrated pharmacy management system keeps pharmacy on the same platform as prescriptions and billing. In NALAM's Clinic Management System, doctors prescribe from the pharmacy catalogue and bills draw stock automatically, so nothing is entered twice.",
      "For hospitals running NALAM HMS, how pharmacy connects to your hospital setup is confirmed with you during scoping.",
    ],
  },
  standalone: {
    title: "Option B: Standalone Pharmacy Management",
    paragraphs: [
      "Pharmacy currently runs as a module inside the NALAM platform. A pharmacy hub role can work without any clinical or patient access, but a separate pharmacy-only deployment is not available today and we do not promise it yet.",
      "If you want to start with pharmacy, contact us. We will confirm plainly whether it fits your hospital.",
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
    { title: "Part of the patient workflow", body: "Prescriptions, billing and stock sit on one platform rather than in a separate tool." },
    { title: "Central hub and branches", body: "Receive vendor stock at a hub and send it to branches with a recorded trail." },
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
  note: "The digital column describes pharmacy management software in general; NALAM capabilities are listed in the features section above.",
};

export const faqs = [
  { question: "What is a pharmacy management system?", answer: "Software that manages a pharmacy's medicines, stock, prescriptions, dispensing, purchasing and billing in one place. A hospital version also connects to doctors and patient billing." },
  { question: "How does a pharmacy management system work in hospitals?", answer: "A doctor prescribes, the pharmacy checks stock, the bill is created and finalized, and stock is deducted. In NALAM, those steps share one platform, so details are not re-entered." },
  { question: "What are the important features of hospital pharmacy software?", answer: "A medicine catalogue, batch and expiry records, prescription handling, billing, purchasing and vendor records, stock transfers and adjustments, reports and access control. Ask vendors to demonstrate each on your workflows." },
  { question: "Can pharmacy management software manage medicine inventory?", answer: "Yes, that is its core job. NALAM holds stock batch by batch per branch and hub, with low-stock views and a movement ledger of every stock-in and stock-out." },
  { question: "Does pharmacy software support batch and expiry tracking?", answer: "NALAM records a batch number with manufacturing and expiry dates on every stock entry, excludes expired batches from sales, and lets you review and export near-expiry and expired stock." },
  { question: "Can pharmacy management software integrate with hospital management systems?", answer: "In NALAM's Clinic Management System, pharmacy is part of the same platform as consultations, prescriptions and billing. For hospitals on NALAM HMS, we confirm how pharmacy connects during scoping." },
  { question: "Can a pharmacy management system work independently?", answer: "Pharmacy currently runs as a module inside the NALAM platform. A pharmacy-only deployment is not available today and we do not promise it yet. Contact us and we will confirm what fits your hospital." },
  { question: "How does pharmacy management software improve billing?", answer: "Staff bill what was prescribed or sold without re-typing it, and stock is deducted automatically when the bill is finalized. Cancelling a finalized bill restores the stock." },
  { question: "How can hospitals manage medicine purchases and suppliers?", answer: "By receiving stock against a vendor and invoice with batch and expiry on each line. NALAM also tracks vendor bills, payments, payment terms and vendor returns with credit notes." },
  { question: "How do I choose the right pharmacy management software for my hospital?", answer: "List your workflows first, then ask vendors to demonstrate each on your data. Check batch and expiry handling, billing links, reports, access control, support and customization. Prefer hospital-built software over a retail billing tool." },
];

export const finalCta = {
  title: "Simplify Your Hospital Pharmacy Operations with NALAM",
  description:
    "Explore how NALAM can help your hospital organize pharmacy workflows, medicine inventory, billing and pharmacy operations.",
};

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
 * Everything else (batch/expiry, purchasing, suppliers, transfers, reports,
 * OPD/IPD specifics, standalone pharmacy deployment, GST) is NOT verified.
 * Those areas are written as hospital needs + "confirm in demo", never as
 * product claims. Flip `status` to "verified" only after product-owner sign-off.
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
  does: string;
  staff: string;
  problem: string;
  benefit: string;
}

export const heroIntro =
  "Manage hospital pharmacy operations with NALAM Pharmacy Management System. Bring medicine inventory, prescription management, batch tracking, pharmacy billing and dispensing into one workflow, connected to the rest of your hospital through NALAM HMS or CMS.";

export const introduction = {
  title: "Simplify Hospital Pharmacy Operations with NALAM Pharmacy Management Software",
  paragraphs: [
    "A hospital pharmacy sits at the meeting point of clinical and commercial work. Doctors prescribe, nurses and patients wait for medicines, the purchase team replenishes stock, and accounts needs every issue billed correctly. When those steps run on registers, spreadsheets or a standalone billing tool, the pharmacy becomes the place where information is re-typed and where mismatches surface late.",
    "Pharmacy management software replaces that patchwork with one record of what was prescribed, what is in stock, what was dispensed and what was billed. For a hospital pharmacy management system, the practical gains are stock you can trust, fewer questions between the ward, the counter and the store, and billing that follows what was actually issued.",
    "NALAM's pharmacy workflows are built to sit inside the same platform as the patient record, so prescriptions, dispensing and stock movement stay in sync with the rest of the hospital.",
  ],
};

export const whatIs = {
  title: "What Is a Hospital Pharmacy Management System?",
  paragraphs: [
    "A hospital pharmacy management system is software that runs the medicine side of a hospital: what you stock, how it is received, who it is prescribed to, how it is issued and how it is billed. Unlike a retail pharmacy tool, it has to work alongside doctors, wards and hospital billing, not just a sales counter.",
  ],
  covers: [
    { title: "Medicine catalogue", body: "A single list of medicines, with the details your pharmacy uses to identify and price them." },
    { title: "Stock management", body: "Quantity on hand, received stock and movement, so availability is known before a prescription is filled." },
    { title: "Prescription processing", body: "Prescriptions from doctors reviewed and acted on by the pharmacy." },
    { title: "Medicine dispensing", body: "Issuing medicines against a prescription, to an outpatient or an inpatient." },
    { title: "Billing", body: "Charging what was dispensed, so the patient bill and the pharmacy record agree." },
    { title: "Purchase management", body: "Ordering and receiving stock from suppliers so shelves are replenished in an orderly way." },
    { title: "Pharmacy reporting", body: "Views of stock, movement and sales that the pharmacy head and management can act on." },
  ],
};

export const featuresSection = {
  title: "Complete Pharmacy Management Software Features",
  description:
    "Eleven areas a hospital pharmacy needs covered. Items marked \"Connected in NALAM\" are part of the platform today. Items marked \"Scoped in demo\" are areas we walk through against your requirements, so you see exactly how they work for your pharmacy before you decide.",
};

export const pharmacyFeatures: PharmacyFeature[] = [
  {
    title: "Medicine Catalogue Management",
    status: "confirm",
    does: "Keeps one structured list of the medicines your pharmacy handles.",
    staff: "Pharmacy staff look up and maintain items instead of re-describing them on every entry.",
    problem: "The same medicine recorded under different names makes stock and billing hard to reconcile.",
    benefit: "A consistent catalogue is the base for reliable stock, prescriptions and reports.",
  },
  {
    title: "Pharmacy Inventory Management",
    status: "verified",
    does: "Tracks stock and stock movement inside the same platform as the hospital record, so dispensing and stock stay in sync.",
    staff: "The pharmacy checks availability and sees stock change as medicines are dispensed.",
    problem: "Stock registers drift from what is actually on the shelf.",
    benefit: "Fewer surprises at the counter and a clearer picture of what to reorder.",
  },
  {
    title: "Batch-Wise Medicine Tracking",
    status: "confirm",
    does: "Records stock by batch, so each issue can be traced to the lot it came from.",
    staff: "Staff identify the batch when receiving and issuing medicines.",
    problem: "Without batch records, a recall or a quality query means searching paper.",
    benefit: "Traceability that supports patient safety and audits.",
  },
  {
    title: "Medicine Expiry Management",
    status: "confirm",
    does: "Keeps expiry dates against stock so near-expiry items can be seen early.",
    staff: "The store team reviews what is approaching expiry and acts on it.",
    problem: "Expired stock is discovered late, after it has been paid for and shelved.",
    benefit: "Less wastage and fewer expired items near patients.",
  },
  {
    title: "Purchase Management",
    status: "confirm",
    does: "Supports purchase entries and receiving of stock against supplier orders.",
    staff: "The purchase team raises orders and the store records what arrives.",
    problem: "Orders, deliveries and stock entries kept in separate places.",
    benefit: "An organized trail from order to stock on the shelf.",
  },
  {
    title: "Supplier Management",
    status: "confirm",
    does: "Holds supplier records alongside the purchases made from them.",
    staff: "Purchase staff pick a supplier from the record rather than re-entering details.",
    problem: "Supplier details and history scattered across files and phones.",
    benefit: "Easier follow-up and comparison across suppliers.",
  },
  {
    title: "Prescription Management",
    status: "verified",
    does: "Connects prescriptions raised in the hospital to the pharmacy, so dispensing starts from the doctor's order.",
    staff: "Pharmacists work from the prescription on screen instead of paper slips.",
    problem: "Handwritten or relayed prescriptions cause delays and misreads.",
    benefit: "Faster, clearer handoff between doctor and pharmacy.",
  },
  {
    title: "Pharmacy Billing",
    status: "verified",
    does: "Bills medicines through the hospital's billing, where charges are itemized and kept with the patient record.",
    staff: "Billing staff charge what was dispensed rather than re-keying it.",
    problem: "Pharmacy charges missing from, or different on, the patient bill.",
    benefit: "One consistent bill and fewer disputes at discharge or payment.",
  },
  {
    title: "Stock Transfers and Adjustments",
    status: "confirm",
    does: "Records movement between locations and corrections to stock.",
    staff: "Store staff log transfers and adjustments instead of editing figures informally.",
    problem: "Untracked transfers and corrections undermine stock accuracy.",
    benefit: "Stock changes that can be explained and audited.",
  },
  {
    title: "Pharmacy Reports and Analytics",
    status: "confirm",
    does: "Gives the pharmacy head views of stock, movement and sales. NALAM reports can also be customized.",
    staff: "Managers review reports rather than compiling them by hand.",
    problem: "Month-end reporting built manually from several sources.",
    benefit: "Quicker, better-informed purchasing and control decisions.",
  },
  {
    title: "Pharmacy User and Access Management",
    status: "confirm",
    does: "Controls who can do what. NALAM supports customized roles and permissions.",
    staff: "Administrators give each user only the access their job needs.",
    problem: "Everyone able to edit stock and prices.",
    benefit: "Accountability and a safer pharmacy.",
  },
];

export const opdIpd = {
  title: "Manage OPD and IPD Pharmacy Operations",
  intro:
    "Outpatient and inpatient pharmacy work differently, and a hospital pharmacy management system should reflect that. NALAM connects pharmacy to the patient record, so a prescription reaches the pharmacy from the consultation or the ward. How each flow is configured for your hospital is confirmed during a demo.",
  opd: {
    title: "OPD pharmacy",
    points: [
      "Outpatient prescriptions reach the pharmacy from the consultation.",
      "Medicines are dispensed against the prescription.",
      "Pharmacy billing happens at the point of dispensing.",
      "Stock updates as medicines are issued.",
    ],
  },
  ipd: {
    title: "IPD pharmacy",
    points: [
      "Inpatient medication needs come from the treating team.",
      "Wards or departments request medicines from the pharmacy.",
      "Issues and returns are recorded against the patient.",
      "Charges follow the patient's admission bill.",
    ],
  },
  note: "Inpatient requests, returns and patient-linked dispensing are areas we show against your own ward workflow, so we only commit to what fits how your hospital works.",
};

export const inventory = {
  title: "Smart Pharmacy Inventory Management for Hospitals",
  paragraphs: [
    "Good pharmacy inventory management software answers one question quickly: what do we have, where, and will it last? In a hospital that question is asked by the counter, the ward, the purchase team and management, usually at the same time.",
    "A connected system keeps stock movement tied to dispensing, so quantities change as medicines are issued instead of being corrected at the end of the day. Hospitals should look for stock visibility, stock receiving, adjustments, batch-level records, expiry tracking and stock reports, and ask to see each one working on their own data.",
  ],
  items: [
    "Stock visibility across the pharmacy",
    "Receiving stock against purchases",
    "Recorded adjustments instead of informal edits",
    "Batch-level inventory and expiry tracking",
    "Stock movement history",
    "Stock reports for the pharmacy head",
  ],
};

export const batchExpiry = {
  title: "Improve Medicine Batch Tracking and Expiry Monitoring",
  paragraphs: [
    "Batch and expiry records are what make a pharmacy auditable. If a batch is recalled, or an inspector asks where a lot went, the answer depends on whether the batch was recorded when stock arrived and when it was issued.",
    "Accurate batch-level records also protect patients and margins: near-expiry medicines can be used or returned first, and expired items are caught before they reach a ward. Ask any vendor, including us, to demonstrate batch identification, batch-wise stock, expiry dates, and any expiry alerts on your own sample data.",
  ],
};

export const purchasing = {
  title: "Simplify Hospital Pharmacy Purchase and Stock Management",
  paragraphs: [
    "Procurement is where pharmacy costs are controlled. A workable process links the supplier record, the purchase entry, the stock received and, where needed, the return of damaged or short-dated items, and reports on all of it.",
    "Those links are what stop duplicate orders, unreceived stock and unexplained differences. We scope how supplier records, purchase entries, receiving, purchase returns and purchase reporting should work for your hospital as part of the demo.",
  ],
};

export const billing = {
  title: "Streamline Hospital Pharmacy Billing",
  paragraphs: [
    "Pharmacy billing software for a hospital has a different job from a retail billing tool. Medicines are charged to a patient, often against a prescription and sometimes inside an admission, so the pharmacy charge must land correctly on the patient's bill.",
    "In NALAM, billing is handled in the same system that records patient care, with itemized charges. That keeps pharmacy charges consistent with the patient record. If you need specific invoice formats, tax handling or insurer-related billing for pharmacy, tell us your requirements and we will show what fits, since those depend on your setup.",
  ],
};

export const workflow = {
  title: "From Prescription to Medicine Dispensing – A Connected Pharmacy Workflow",
  intro:
    "The flow below is the sequence a connected hospital pharmacy follows. Because NALAM keeps pharmacy inside the hospital platform, each step builds on the one before instead of starting a new record.",
  steps: [
    "Prescription",
    "Pharmacy review",
    "Medicine availability",
    "Dispensing",
    "Billing",
    "Inventory update",
  ],
  outpatient:
    "Outpatient: the prescription follows the consultation, medicines are dispensed and billed at the counter.",
  inpatient:
    "Inpatient: the request comes from the treating team during the stay, and charges follow the patient's admission.",
};

export const setups = {
  title: "Integrated or Standalone – Choose the Pharmacy Management Setup That Fits Your Hospital",
  integrated: {
    title: "Option A: Integrated Pharmacy Management",
    paragraphs: [
      "An integrated pharmacy management system works as part of NALAM HMS (or CMS for clinics). Laboratory, radiology and pharmacy are connected to the rest of the hospital, so prescriptions, dispensing and stock movement stay in sync across departments.",
      "Because patient details, consultations, prescriptions and billing already live in one platform, the pharmacy does not need to re-enter them. That cuts duplicate data entry and gives doctors, pharmacists and billing the same view.",
    ],
  },
  standalone: {
    title: "Option B: Standalone Pharmacy Management",
    paragraphs: [
      "Each NALAM system runs independently today and can be connected to the others later, so you can start with one and grow. Hospitals that want to begin with the pharmacy before adopting the full platform should talk to us about it.",
      "Whether a pharmacy-only deployment fits your hospital, and how it would connect to other systems you already use, is confirmed with you during scoping. We would rather tell you plainly than promise a setup that does not suit you.",
    ],
  },
};

export const benefits = {
  title: "Benefits of Pharmacy Management Software for Hospitals",
  items: [
    { title: "Better stock visibility", body: "One view of what is in stock, so teams stop phoning the store to check." },
    { title: "Improved batch traceability", body: "Know which batch went to which patient, when it matters." },
    { title: "Expiry monitoring", body: "See near-expiry stock early enough to act on it." },
    { title: "Organized purchasing", body: "Orders, suppliers and received stock tied together." },
    { title: "More efficient billing", body: "Charge what was dispensed without re-keying it." },
    { title: "Less repetitive manual work", body: "Details entered once at the patient record are reused." },
    { title: "Better reporting", body: "Stock and movement reports without manual compilation." },
    { title: "Improved coordination", body: "Doctors, wards, pharmacy and billing work from the same record." },
  ],
};

export const whyNalam = {
  title: "Why Choose NALAM Healthcare for Hospital Pharmacy Management?",
  items: [
    { title: "Healthcare-focused software", body: "NALAM builds hospital, laboratory and clinic management systems, not generic retail tools." },
    { title: "HMS and CMS integration", body: "Pharmacy is connected to the hospital or clinic record rather than bolted on." },
    { title: "Connected hospital departments", body: "Laboratory, radiology and pharmacy share one platform with the rest of the hospital." },
    { title: "Customizable around your workflow", body: "Screens, reports, fields, roles and permissions, dashboards, automation and billing workflows can be tailored." },
    { title: "Start with one system, connect later", body: "Each NALAM system runs on its own and can be linked to the others when you are ready." },
  ],
};

export const comparison = {
  title: "Manual Pharmacy Management vs Digital Pharmacy Management",
  rows: [
    ["Stock visibility", "Counted or checked by hand; accuracy depends on the last update", "Stock is visible in one place and moves with dispensing"],
    ["Batch tracking", "Batch details kept on paper or in registers", "Batch-level records can be searched"],
    ["Expiry monitoring", "Needs regular manual shelf checks", "Expiry dates held with stock for review"],
    ["Purchase records", "Orders and receipts in separate files", "Orders, suppliers and receiving linked"],
    ["Prescription processing", "Paper or relayed prescriptions", "Prescription reaches the pharmacy from the hospital record"],
    ["Billing", "Charges re-keyed onto the bill", "Charges follow what was dispensed"],
    ["Stock reporting", "Compiled by hand for each period", "Generated from the same records"],
    ["Coordination", "Depends on phone calls and messengers", "Departments share one record"],
  ],
  note: "Digital capabilities in this table describe what pharmacy management software can do in general. Which of them NALAM covers for your pharmacy is confirmed in a demo.",
};

export const faqs = [
  {
    question: "What is a pharmacy management system?",
    answer:
      "A pharmacy management system is software that manages a pharmacy's medicines, stock, prescriptions, dispensing, purchasing and billing in one place. A hospital version also connects to doctors, wards and patient billing.",
  },
  {
    question: "How does a pharmacy management system work in hospitals?",
    answer:
      "A prescription is raised by the doctor, reviewed by the pharmacy, checked against available stock, dispensed, billed to the patient, and the stock is updated. In a connected system such as NALAM's, those steps share the patient record rather than being re-entered.",
  },
  {
    question: "What are the important features of hospital pharmacy software?",
    answer:
      "Look for a medicine catalogue, inventory with batch and expiry records, prescription handling, dispensing, billing, purchase and supplier management, stock transfers and adjustments, reports, and user access control. Ask each vendor to demonstrate these on your own workflows.",
  },
  {
    question: "Can pharmacy management software manage medicine inventory?",
    answer:
      "Yes, that is its core job: tracking what is in stock and how it moves. NALAM keeps stock movement in sync with dispensing inside the hospital platform. Specific inventory functions you need, such as adjustments or transfers, can be reviewed in a demo.",
  },
  {
    question: "Does pharmacy software support batch and expiry tracking?",
    answer:
      "Good hospital pharmacy software should record batches and expiry dates and make near-expiry stock visible. Ask any vendor to show batch-wise stock and expiry handling on sample data. We will walk through this for NALAM against your requirements.",
  },
  {
    question: "Can pharmacy management software integrate with hospital management systems?",
    answer:
      "Yes. NALAM's pharmacy is connected to its Hospital Management System, so prescriptions, dispensing and stock movement stay in sync across departments, and to the Clinic Management System for clinics. Integration with other systems you already use should be discussed during scoping.",
  },
  {
    question: "Can a pharmacy management system work independently?",
    answer:
      "Pharmacy software can in principle run on its own. NALAM's Hospital, Laboratory and Clinic Management Systems each run independently and connect later. If you want to start with pharmacy alone, contact us and we will confirm what is possible for your hospital.",
  },
  {
    question: "How does pharmacy management software improve billing?",
    answer:
      "It lets staff bill what was dispensed instead of re-typing it, and keeps pharmacy charges consistent with the patient's bill. In NALAM, billing is itemized and handled alongside patient care. If you need specific tax or insurance handling, raise it in your demo.",
  },
  {
    question: "How can hospitals manage medicine purchases and suppliers?",
    answer:
      "By linking supplier records, purchase entries and stock receiving, so every delivery can be traced to an order and a supplier. The details of how this works in NALAM for your hospital are covered during a demo.",
  },
  {
    question: "How do I choose the right pharmacy management software for my hospital?",
    answer:
      "List your own workflows first: OPD, IPD, purchasing, billing. Then ask vendors to demonstrate each on your data. Check batch and expiry handling, integration with your hospital system, reports, user access, support, and how the software can be customized. Prefer a system built for hospitals over a retail billing tool.",
  },
];

export const finalCta = {
  title: "Simplify Your Hospital Pharmacy Operations with NALAM",
  description:
    "Explore how NALAM can help your hospital organize pharmacy workflows, medicine inventory, billing and pharmacy operations.",
};

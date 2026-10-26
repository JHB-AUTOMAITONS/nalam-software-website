/**
 * Country landing pages (/hospital-management-software-{country}).
 *
 * SEO role: each page targets country-qualified search intent ("hospital
 * management software {country}"). The generic product terms ("hospital
 * management software", "laboratory management system", "clinic management
 * system") stay owned by the three /solutions/* pages — country pages link to
 * them for module detail and never restate their copy.
 *
 * Content rules (same spirit as solutions-content.ts):
 *  - Product capability statements must restate facts already in constants.ts
 *    (products, faqs, hmsFaqs, lmsFaqs, cmsFaqs) or solutions-content.ts.
 *  - No local customers, offices, partners, certifications, regulatory
 *    approvals, government integrations, payment gateways, currencies,
 *    pricing or compliance claims. Regulations are described as things the
 *    reader should check, never as something Nalam satisfies.
 *  - Legal/regulatory facts below were checked against the sources listed in
 *    each page's `sources` (official first; a few are marked secondary) in
 *    October 2026. Re-verify before changing them — several of these regimes
 *    are mid-rollout.
 *  - Do NOT add FAQPage JSON-LD for these pages: Google retired FAQ rich
 *    results in May 2026, so it would add markup with no benefit.
 */

export type CountrySlug = "sri-lanka" | "malaysia" | "singapore" | "south-africa" | "nigeria";

export interface CountryCard {
  title: string;
  body: string;
}

export interface CountrySource {
  label: string;
  url: string;
}

export interface CountryPage {
  slug: CountrySlug;
  country: string;
  /** Route path, e.g. /hospital-management-software-sri-lanka */
  path: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  /** First hero paragraph — contains the primary keyword. */
  heroIntro: string;
  heroSupport: string;
  heroImage: { src: string; alt: string };
  challengesTitle: string;
  challengesIntro: string;
  challenges: CountryCard[];
  helpsTitle: string;
  helpsIntro: string;
  helps: CountryCard[];
  solutionsIntro: string;
  contextTitle: string;
  contextIntro: string;
  /** Implementation / regulatory considerations — things to confirm, not claims. */
  considerations: CountryCard[];
  sourcesNote: string;
  sources: CountrySource[];
  faqs: { question: string; answer: string }[];
  /** Optional supporting blog articles (slugs must exist in blog.ts). */
  relatedArticles?: { title: string; description: string; slug: string }[];
}

export const countryBrandName = "Nalam Software";

/** Shown on every country page — Nalam's real footprint, stated plainly. */
export const countryTransparencyNote =
  "Nalam Software is based in Salem, Tamil Nadu, India. We do not claim a local office, local support team, local partners or country-specific certifications on this page. Deployment, data hosting, language support, training and support arrangements for your location should be confirmed with our team in writing before you decide.";

export const countryWhyConsider: CountryCard[] = [
  {
    title: "Hospital, laboratory and clinic in one family",
    body: "The Hospital, Laboratory and Clinic Management Systems each run on their own and can be connected later, so you can start with the area that needs attention first.",
  },
  {
    title: "Built around the patient journey",
    body: "Registration, appointments, consultation, admission, laboratory, pharmacy and billing work from the same patient record instead of separate registers.",
  },
  {
    title: "Customizable to your workflow",
    body: "Screens, reports, fields, roles and permissions, integrations, dashboards, automation and billing workflows can be customized around how your organization works.",
  },
  {
    title: "Laboratory machine integration and WhatsApp communication",
    body: "Laboratories can capture results directly from connected instruments, and automated WhatsApp communication is built into the platform for reaching patients.",
  },
];

export const countryPages: Record<CountrySlug, CountryPage> = {
  "sri-lanka": {
    slug: "sri-lanka",
    country: "Sri Lanka",
    path: "/hospital-management-software-sri-lanka",
    primaryKeyword: "Hospital Management Software Sri Lanka",
    relatedKeywords: [
      "Hospital Management System Sri Lanka",
      "Healthcare Management Software Sri Lanka",
      "Laboratory Management Software Sri Lanka",
      "Clinic Management Software Sri Lanka",
    ],
    seoTitle: "Hospital Management Software in Sri Lanka | Nalam Software",
    metaDescription:
      "Hospital, laboratory and clinic management software for Sri Lankan providers: one patient record, itemized billing, lab workflows. Request a demo.",
    h1: "Hospital Management Software in Sri Lanka, Built Around Your Workflow",
    eyebrow: "Sri Lanka",
    heroIntro:
      "Nalam Software provides connected hospital, laboratory and clinic management software. For private hospitals, laboratories and clinics in Sri Lanka, it brings registration, consultation, admission, laboratory, pharmacy and billing onto a single patient record.",
    heroSupport:
      "This page is written for owners and administrators comparing hospital management software in Sri Lanka, and covers what to evaluate and which local requirements to check before a demo.",
    heroImage: {
      src: "/images/solutions/hospital.png",
      alt: "Doctor reviewing patient information on a tablet beside a hospital bed, illustrating connected hospital patient care",
    },
    challengesTitle: "Operational Challenges Sri Lankan Healthcare Providers Weigh Up",
    challengesIntro:
      "These are workflow problems that organizations of this kind commonly describe, not statistics about the national health system.",
    challenges: [
      {
        title: "Records split between OPD, wards, laboratory and pharmacy",
        body: "When each department keeps its own register, the same patient details are typed again and again and nobody sees the full history during a consultation.",
      },
      {
        title: "Billing patients can follow",
        body: "Where patients and families settle bills directly, itemized charges across consultations, tests, procedures and pharmacy need to be accurate and easy to explain. If you also handle insurer claims, that adds a second workflow.",
      },
      {
        title: "Laboratory turnaround and traceability",
        body: "Hand-typed results and unlabelled samples slow reports down and make errors harder to trace, especially when a laboratory serves a hospital and outside doctors at once.",
      },
      {
        title: "Patients and staff working in more than one language",
        body: "Sri Lanka's patients and staff may use Sinhala, Tamil and English. Prescriptions, reports and patient messages are worth checking against your own language needs before you choose a system.",
      },
    ],
    helpsTitle: "How Nalam Healthcare Software Helps Sri Lankan Hospitals, Labs and Clinics",
    helpsIntro:
      "These capabilities come from Nalam's existing Hospital, Laboratory and Clinic Management Systems. Which modules you need, and how they are set up, is agreed per organization.",
    helps: [
      {
        title: "One record from registration to discharge",
        body: "Information captured at registration carries through appointments, consultation, admission, treatment and discharge into one chronological patient history, so departments stop re-entering details.",
      },
      {
        title: "Billing and insurance in the same system as care",
        body: "Billing is itemized across consultations, tests and procedures, and insurance workflows are part of the billing and claims process, with hospital stock tracked with expiry visibility.",
      },
      {
        title: "Laboratory workflow from order to authorized report",
        body: "Barcode sample tracking, result validation and authorization, and direct lab machine integration help a laboratory reduce manual entry before reports are released.",
      },
      {
        title: "Management visibility",
        body: "A hospital overview and a lab dashboard give managers a view of patient volume, department activity and laboratory status without compiling reports by hand.",
      },
    ],
    solutionsIntro:
      "Detailed module information lives on our product pages. Choose the one closest to your organization.",
    contextTitle: "Sri Lanka: Requirements and Implementation Points to Check",
    contextIntro:
      "These are considerations, not statements of compliance. Nalam does not claim approval or compliance under any Sri Lankan regulation.",
    considerations: [
      {
        title: "Registration of private medical institutions",
        body: "Under the Private Medical Institutions Registration Act, No. 21 of 2006, a private medical institution may not be established or operated without a Certificate of Registration, and applications go to the Private Health Services Regulatory Council through the Provincial Director of Health Services. Confirm which registration applies to your hospital, laboratory or clinic, and whether any record-keeping it expects affects how you configure software.",
      },
      {
        title: "Personal data protection",
        body: "The Personal Data Protection Act, No. 9 of 2022 established a Data Protection Authority and is being brought into operation in stages. Published commencement dates for the remaining parts have changed, and the Authority's own background page may lag behind, so confirm the current position with the Authority and ask any vendor how access control, storage and breach handling would be handled for patient data.",
      },
      {
        title: "National digital health direction",
        body: "The Ministry of Health's 2023 Digital Health Blueprint centres on a National Electronic Health Record, and the Ministry's companion National Digital Health Guidelines and Standards describe an API for electronic medical record systems to communicate with it. Those guidelines say private institutions follow them on an opt-in basis, while adherence is mandatory in the Ministry's own software enlisting process. Nalam makes no claim of enlistment or integration with any national system, so check which of these applies to you and raise it early.",
      },
      {
        title: "Language, hosting, training and support",
        body: "Ask which languages patient-facing documents and reports can use, where data is hosted, and how onboarding, training and support would work for your location and time zone. Settle these in writing.",
      },
    ],
    sourcesNote: "Check current requirements directly with these official sources:",
    sources: [
      {
        label: "Private Medical Institutions Registration Act, No. 21 of 2006 (Sri Lanka Law)",
        url: "https://www.srilankalaw.lk/revised-statutes/alphabetical-list-of-statutes/938-private-medical-institutions-registration-act.html",
      },
      { label: "Data Protection Authority of Sri Lanka", url: "https://dpa.gov.lk/" },
      {
        label: "Sri Lanka Digital Health Blueprint (Ministry of Health, 2023)",
        url: "https://www.health.gov.lk/wp-content/uploads/2022/08/Digital-Health-Blue-Print-Full-Book-01.11.2023-Final.pdf",
      },
      {
        label: "National Digital Health Guidelines and Standards (Ministry of Health)",
        url: "https://www.health.gov.lk/wp-content/uploads/2023/11/NDHGS-v2.pdf",
      },
      { label: "Ministry of Health, Sri Lanka", url: "https://www.health.gov.lk/" },
    ],
    faqs: [
      {
        question: "Does Nalam have an office or support team in Sri Lanka?",
        answer:
          "We do not claim one. Nalam Software is based in Salem, Tamil Nadu, India. How implementation, training and support would work for your location is something to confirm with our team before you commit.",
      },
      {
        question: "Can one system cover a hospital with its own laboratory and pharmacy?",
        answer:
          "Yes. The Hospital Management System connects laboratory, radiology and pharmacy to the rest of the hospital, and the Laboratory Management System can be connected to it so test orders and results move without being re-keyed.",
      },
      {
        question: "We are a standalone laboratory. Do we need the hospital system?",
        answer:
          "No. The Laboratory Management System runs independently and can be connected to hospital or clinic systems later if your organization needs it.",
      },
      {
        question: "Will it work in Sinhala or Tamil?",
        answer:
          "We have not verified language support for Sinhala or Tamil on this page, so we do not promise it. Share the languages you need for screens, prescriptions and reports, and ask our team to confirm in writing what is supported.",
      },
      {
        question: "Does the software make us compliant with Sri Lankan data protection law?",
        answer:
          "No software does that by itself. Compliance depends on how your organization collects, stores and protects data. Nalam makes no compliance claim for Sri Lanka; take legal advice on your obligations and ask us how access controls and data handling would be set up.",
      },
    ],
  },

  malaysia: {
    slug: "malaysia",
    country: "Malaysia",
    path: "/hospital-management-software-malaysia",
    primaryKeyword: "Hospital Management Software Malaysia",
    relatedKeywords: [
      "Hospital Management System Malaysia",
      "Healthcare Management Software Malaysia",
      "Clinic Management Software Malaysia",
      "Laboratory Management Software Malaysia",
    ],
    seoTitle: "Hospital Management Software in Malaysia | Nalam Software",
    metaDescription:
      "Connected hospital, clinic and laboratory software for Malaysian providers. See operational needs, PDPA and licensing points to check, and request a demo.",
    h1: "Hospital Management Software in Malaysia for Hospitals, Clinics and Labs",
    eyebrow: "Malaysia",
    heroIntro:
      "Nalam Software provides hospital, clinic and laboratory management software that keeps appointments, consultations, treatment, pharmacy, laboratory and billing on one connected patient record. This page is for private healthcare organizations in Malaysia evaluating hospital management software.",
    heroSupport:
      "It focuses on operational needs for clinics and hospitals, and flags the data protection and licensing points worth confirming before you shortlist a vendor.",
    heroImage: {
      src: "/images/solutions/clinic.png",
      alt: "Doctor consulting a patient beside a screen showing clinic management software with patient records and appointments",
    },
    challengesTitle: "Operational Challenges for Malaysian Hospitals, Clinics and Laboratories",
    challengesIntro:
      "Workflow problems that multi-doctor clinics, specialist centres and hospital laboratories tend to share. No market statistics are claimed.",
    challenges: [
      {
        title: "Busy clinics juggling consultations, procedures and pharmacy",
        body: "Clinics that offer procedures, treatment plans and dispensing under one roof need each step to build on the previous one, instead of switching between tools.",
      },
      {
        title: "Insurer and corporate billing alongside self-pay",
        body: "If you bill insurers or corporate accounts as well as self-paying patients, billing needs to stay itemized and traceable to the consultation, test or procedure behind each charge. Which claim formats you must support depends on the payers you work with.",
      },
      {
        title: "Treatment that spans several visits",
        body: "Packages and multi-visit treatment plans are hard to manage on paper or spreadsheets, and the patient's history is often scattered by the time they return.",
      },
      {
        title: "Growing data protection expectations",
        body: "Malaysia's data protection law has recently been amended, which raises the bar on how patient information is protected and how incidents are handled.",
      },
    ],
    helpsTitle: "How Nalam Healthcare Software Helps Clinics and Hospitals in Malaysia",
    helpsIntro:
      "Capabilities listed here already exist in Nalam's product pages. Availability can vary by deployment and customization.",
    helps: [
      {
        title: "Appointment to billing in one flow",
        body: "The Clinic Management System manages appointment, consultation, procedures, pharmacy and billing as one connected flow, with predefined consultation presets to speed up common visits.",
      },
      {
        title: "Packages and treatment plans",
        body: "Set up treatment plans and packages for patients whose care spans multiple visits, connected to their consultations and billing.",
      },
      {
        title: "Complete patient view",
        body: "Patient 360 brings visits, treatments, prescriptions and results into one place, so every consultation starts with the full picture.",
      },
      {
        title: "Hospital and laboratory connected",
        body: "For hospitals, admissions, emergency, surgery, laboratory, radiology, pharmacy and billing share one record, and the laboratory system adds sample tracking and result validation.",
      },
    ],
    solutionsIntro:
      "Start with the product page that matches your organization, then ask us how the systems can connect.",
    contextTitle: "Malaysia: Requirements and Implementation Points to Check",
    contextIntro:
      "These are considerations, not statements of compliance. Nalam does not claim compliance or approval under any Malaysian regulation.",
    considerations: [
      {
        title: "Personal Data Protection Act 2010, as amended in 2024",
        body: "The 2024 amendments introduced duties such as appointing a data protection officer and notifying the regulator of data breaches, with provisions taking effect in stages during 2025. Confirm what applies to your organization with the Personal Data Protection Department, and ask any vendor how patient data access, storage and incident handling work.",
      },
      {
        title: "Licensing of private healthcare facilities",
        body: "Private healthcare facilities and services are licensed by the Ministry of Health under the Private Healthcare Facilities and Services Act 1998 (Act 586). We could not confirm from official text which licence category applies to every laboratory or clinic type, so confirm yours with the Ministry, along with any record-keeping it expects.",
      },
      {
        title: "Payers, claims and reporting",
        body: "List the insurers, corporate accounts and any government reporting you handle, and ask exactly which formats or submissions you need. Nalam does not claim any payer or government integration in Malaysia.",
      },
      {
        title: "Language, hosting, training and support",
        body: "Check whether you need patient documents in Bahasa Malaysia as well as English, where data would be hosted, and how onboarding, training and support would be handled for your location and hours.",
      },
    ],
    sourcesNote: "Check current requirements directly with these official sources:",
    sources: [
      { label: "Personal Data Protection Department, Malaysia", url: "https://www.pdp.gov.my/" },
      { label: "Ministry of Health Malaysia", url: "https://www.moh.gov.my/" },
    ],
    faqs: [
      {
        question: "We run a busy multi-doctor clinic. Is the clinic system or the hospital system the better fit?",
        answer:
          "For appointments, consultations, procedures, pharmacy and billing without inpatient care, the Clinic Management System is usually the closer fit. If you admit patients or run emergency and surgery, look at the Hospital Management System. Our team can help you decide based on your workflow.",
      },
      {
        question: "Can we manage treatment packages that span several visits?",
        answer:
          "Yes. The Clinic Management System supports treatment plans and packages connected to the patient's consultations and billing.",
      },
      {
        question: "Does Nalam integrate with Malaysian insurers or government systems?",
        answer:
          "We do not claim any such integration. If you need data exchange with a specific payer or system, tell us which one and ask the team to confirm in writing whether and how it could be supported.",
      },
      {
        question: "Does the software make us PDPA-compliant?",
        answer:
          "No software does that on its own. Compliance depends on your policies and how the system is configured and used. Nalam makes no compliance claim for Malaysia; ask us how access control and data handling would work and take legal advice on your obligations.",
      },
      {
        question: "How would support work from India?",
        answer:
          "Nalam Software is based in Salem, Tamil Nadu, India, and we do not claim a Malaysian office or support team. Support hours, channels, training and response expectations for Malaysia should be agreed and confirmed in writing.",
      },
    ],
  },

  singapore: {
    slug: "singapore",
    country: "Singapore",
    path: "/hospital-management-software-singapore",
    primaryKeyword: "Hospital Management Software Singapore",
    relatedKeywords: [
      "Hospital Management System Singapore",
      "Healthcare Management Software Singapore",
      "Clinic Management Software Singapore",
      "Laboratory Management Software Singapore",
    ],
    seoTitle: "Hospital Management Software in Singapore | Nalam Software",
    metaDescription:
      "Hospital, clinic and lab management software for Singapore providers needing clear records and controlled access. See HCSA, PDPA and NEHR points to check.",
    h1: "Hospital Management Software in Singapore: Connected Care, Clear Records",
    eyebrow: "Singapore",
    heroIntro:
      "Nalam Software provides hospital, clinic and laboratory management software with a single patient record behind registration, consultation, laboratory, pharmacy and billing. This page is for healthcare organizations in Singapore looking at hospital management software and the regulatory points that come with it.",
    heroSupport:
      "Singapore providers work under licensing, data protection and health-record rules that are actively changing, so this page highlights what to verify rather than what to assume.",
    heroImage: {
      src: "/images/solutions/laboratory.png",
      alt: "Laboratory technician pipetting a sample beside a laboratory analyzer, illustrating connected laboratory workflows",
    },
    challengesTitle: "Operational Challenges for Singapore Clinics, Laboratories and Hospitals",
    challengesIntro:
      "Workflow and governance pressures common to licensed providers. We cite no local market figures.",
    challenges: [
      {
        title: "Documentation expectations that keep rising",
        body: "Licensed providers need to show who did what and when. Paper registers and disconnected tools make that harder than a single, role-controlled system.",
      },
      {
        title: "Laboratory traceability and report control",
        body: "Laboratories need every sample matched to the right patient and test, with a validation and authorization step before reports are released.",
      },
      {
        title: "Records that must be shared appropriately",
        body: "Care often crosses clinics, laboratories and hospitals. Providers need to think about how patient information is contributed and accessed in a controlled way, particularly as national health-record rules change.",
      },
      {
        title: "Government-linked billing schemes",
        body: "Practices that handle claims under national healthcare financing schemes or insurer billing need billing that stays tied to the consultation, test or procedure behind it.",
      },
    ],
    helpsTitle: "How Nalam Healthcare Software Helps Singapore Providers",
    helpsIntro:
      "These capabilities already appear on Nalam's product pages. Fit for a Singapore deployment should be validated in a demo using your own workflow.",
    helps: [
      {
        title: "Role and access management",
        body: "The Hospital Management System includes role and access management so every user sees only what they need. Ask for a walk-through of how roles would map to your team.",
      },
      {
        title: "Test order to authorized report",
        body: "The Laboratory Management System follows a test from order through sample collection, processing, validation and authorization to the final report, with barcode sample tracking.",
      },
      {
        title: "Complete patient history",
        body: "Visits, treatments, lab results and prescriptions sit in a chronological history that doctors can review at any time.",
      },
      {
        title: "Billing connected to care",
        body: "Itemized billing across consultations, tests and procedures, with insurance workflows built into the billing and claims process.",
      },
    ],
    solutionsIntro:
      "For module detail, use the product pages below. Laboratories can also read our guide to pathology report software for Singapore.",
    relatedArticles: [
      {
        title: "Pathology Report Software in Singapore: A Guide for Diagnostic Laboratories",
        description:
          "Features to look for, what to check before you choose, and how a laboratory management system fits the reporting workflow.",
        slug: "pathology-report-software-singapore",
      },
    ],
    contextTitle: "Singapore: Requirements and Implementation Points to Check",
    contextIntro:
      "These are considerations, not statements of compliance. Nalam does not claim licensing, certification or compliance under any Singapore law, and does not claim integration with NEHR.",
    considerations: [
      {
        title: "Healthcare Services Act licensing",
        body: "Healthcare services in Singapore are licensed under the Healthcare Services Act 2020, and clinical laboratory service has its own licence. Confirm which licences apply to your organization and how record-keeping requirements affect system configuration.",
      },
      {
        title: "Personal Data Protection Act 2012",
        body: "Organizations that handle personal data in Singapore have obligations under the PDPA, overseen by the Personal Data Protection Commission. Ask any vendor in detail how access, storage, backups and incident response are handled.",
      },
      {
        title: "Health Information Act and NEHR",
        body: "The Health Information Act 2026 was passed in January 2026 and comes into operation on a date the Minister appoints by gazette notice; Singapore Statutes Online listed it as uncommenced when we last checked. In Parliament, MOH said the Act would require all licensed healthcare providers to contribute to the National Electronic Health Record and that it planned to commence the Act from early 2027; later published summaries describe phased deadlines and differ on scope, and cybersecurity and breach-notification duties also apply. Confirm timing and scope with MOH, and raise any NEHR integration need with us explicitly, because we do not claim one.",
      },
      {
        title: "Hosting, support and onboarding",
        body: "Ask where data would be hosted, who supports the system and during which hours, and how training and migration from existing records would work.",
      },
    ],
    sourcesNote: "Check current requirements directly with these official sources:",
    sources: [
      { label: "Ministry of Health, Singapore", url: "https://www.moh.gov.sg/" },
      { label: "Personal Data Protection Commission, Singapore", url: "https://www.pdpc.gov.sg/" },
      {
        label: "Health Information Act 2026, as published (Singapore Statutes Online)",
        url: "https://sso.agc.gov.sg/Acts-Supp/1-2026/Published/20260212?DocDate=20260212",
      },
      {
        label: "MOH second reading speech, Health Information Bill",
        url: "https://www.moh.gov.sg/newsroom/health-information-bill-second-reading-opening-speech-for-sms-tan-kiat-how/",
      },
      {
        label: "Clinical Laboratory Service licensing (Healthcare Services Act)",
        url: "https://www.hcsa.gov.sg/clinical-support-services/clinical-laboratory-service/",
      },
    ],
    faqs: [
      {
        question: "Is Nalam integrated with NEHR?",
        answer:
          "We do not claim any NEHR integration. If connecting to national health-record systems is a requirement for you, tell us early so the team can assess what would be needed.",
      },
      {
        question: "Does using Nalam satisfy the Healthcare Services Act or the PDPA?",
        answer:
          "No software satisfies licensing or data protection obligations by itself. Those depend on how your organization operates. Nalam makes no compliance claim for Singapore; confirm requirements with MOH and the PDPC or your advisers.",
      },
      {
        question: "Can a laboratory use Nalam without a hospital system?",
        answer:
          "Yes. The Laboratory Management System runs independently and can be connected to hospital or clinic systems later. Our guide to pathology report software for Singapore laboratories explains what to look for.",
      },
      {
        question: "How are user permissions handled?",
        answer:
          "The platform includes role and access management so users see only what they need. Ask for a demonstration mapped to your own staff roles, and ask about audit capabilities specifically.",
      },
      {
        question: "Where would our data be hosted and who supports us?",
        answer:
          "That needs to be confirmed in writing during evaluation. Nalam Software is based in Salem, Tamil Nadu, India, and we do not claim a Singapore office or local support team.",
      },
    ],
  },

  "south-africa": {
    slug: "south-africa",
    country: "South Africa",
    path: "/hospital-management-software-south-africa",
    primaryKeyword: "Hospital Management Software South Africa",
    relatedKeywords: [
      "Hospital Management System South Africa",
      "Healthcare Management Software South Africa",
      "Clinic Management Software South Africa",
      "Laboratory Management Software South Africa",
    ],
    seoTitle: "Hospital Management Software in South Africa | Nalam Software",
    metaDescription:
      "Hospital, clinic and lab management software for South African providers: records, billing and lab workflows. Check POPIA points and request a demo.",
    h1: "Hospital Management Software in South Africa for Connected Care and Billing",
    eyebrow: "South Africa",
    heroIntro:
      "Nalam Software provides hospital, clinic and laboratory management software that connects registration, consultation, treatment, laboratory, pharmacy and billing. This page is for private hospitals, group practices and laboratories in South Africa comparing hospital management software.",
    heroSupport:
      "Health information is treated as special personal information under South African law, so we pay particular attention to data handling and to what you should ask any vendor.",
    heroImage: {
      src: "/images/solutions/hospital.png",
      alt: "Doctor discussing patient information on a tablet with a patient in a hospital bed, illustrating connected hospital care",
    },
    challengesTitle: "Operational Challenges for South African Hospitals, Practices and Laboratories",
    challengesIntro:
      "Operational themes that private providers tend to raise. No national statistics are quoted.",
    challenges: [
      {
        title: "Medical scheme billing and claims",
        body: "Private providers often bill medical schemes as well as patients directly. Claims depend on correct patient, service and coding information being captured at the point of care, so billing disconnected from clinical records creates rework.",
      },
      {
        title: "Handling sensitive health information",
        body: "Under POPIA, health information falls into a protected category. Every provider needs to know who can see patient records, where they are stored and how they are protected.",
      },
      {
        title: "Multi-department coordination",
        body: "Wards, theatre, laboratory, radiology and pharmacy each need to see the right information at the right time without chasing paper or phone calls.",
      },
      {
        title: "Keeping operations running through disruption",
        body: "If your sites experience power or connectivity interruptions, continuity should be a vendor question from day one. We make no offline-operation claim here.",
      },
    ],
    helpsTitle: "How Nalam Healthcare Software Helps South African Providers",
    helpsIntro:
      "Capabilities listed here are described on Nalam's existing product pages. Fit for your environment needs to be confirmed in a demo.",
    helps: [
      {
        title: "Billing, insurance and hospital stock together",
        body: "Billing is itemized across consultations, tests and procedures, and insurance workflows are built into the billing and claims process alongside stock tracking with expiry visibility.",
      },
      {
        title: "Inpatient, emergency and surgery in the same record",
        body: "Admissions, emergency cases and surgeries are managed in the same system rather than in separate registers, becoming part of the patient's complete history.",
      },
      {
        title: "Laboratory, radiology and pharmacy connected",
        body: "Orders, results, prescriptions, dispensing and stock movement stay in sync across departments instead of travelling on paper.",
      },
      {
        title: "Roles, access and management reporting",
        body: "Role and access management limits what each user sees, and management gets visibility into patient volume, revenue and department performance from one overview.",
      },
    ],
    solutionsIntro:
      "Hospitals, group practices and standalone laboratories can each start with the product page that fits best.",
    contextTitle: "South Africa: Requirements and Implementation Points to Check",
    contextIntro:
      "These are considerations, not statements of compliance. Nalam does not claim compliance, approval or accreditation under any South African law or scheme.",
    considerations: [
      {
        title: "Protection of Personal Information Act (POPIA)",
        body: "POPIA, regulated by the Information Regulator, generally prohibits processing health information (section 26) but provides an exception for healthcare institutions and professionals where processing is necessary for treatment and care or for administering the practice (section 32). The Regulator published draft regulations on processing health information for comment in September 2025, and we could not confirm their final status. Under section 72, the transfer of personal information outside South Africa is restricted in defined circumstances. Ask where data would be hosted, and take legal advice on your obligations.",
      },
      {
        title: "Patient record-keeping",
        body: "The Health Professions Council of South Africa publishes guidance on keeping patient records. Confirm retention and security expectations with the Council and ensure any system supports them.",
      },
      {
        title: "Medical schemes and the changing funding landscape",
        body: "Medical schemes are regulated by the Council for Medical Schemes. The National Health Insurance Act was signed in May 2024, and its implementation has been subject to court challenges, with reports of a pause pending Constitutional Court proceedings. Confirm the current position rather than planning around assumptions. Nalam does not claim integration with medical schemes, switching houses or any government system.",
      },
      {
        title: "Language, hosting, training and support",
        body: "South Africa has multiple official languages. Check which languages you need for patient-facing documents, where data is hosted, and how onboarding, training and support would run across your sites and time zone.",
      },
    ],
    sourcesNote: "Check current requirements directly with these official sources:",
    sources: [
      { label: "Information Regulator (South Africa)", url: "https://inforegulator.org.za/" },
      {
        label: "Protection of Personal Information Act 4 of 2013 (Department of Justice)",
        url: "https://www.justice.gov.za/legislation/acts/2013-004.pdf",
      },
      { label: "National Department of Health", url: "https://www.health.gov.za/" },
      { label: "Health Professions Council of South Africa", url: "https://www.hpcsa.co.za/" },
      { label: "Council for Medical Schemes", url: "https://www.medicalschemes.co.za/" },
    ],
    faqs: [
      {
        question: "Does Nalam support medical scheme claims?",
        answer:
          "The platform includes billing and insurance workflows within its billing and claims process. We do not claim integration with any South African medical scheme, administrator or switching house, so list the claim formats you need and we can confirm what is possible.",
      },
      {
        question: "Is health data protected under POPIA, and does Nalam make us compliant?",
        answer:
          "POPIA places health information in a special category, but software cannot make an organization compliant by itself. Nalam makes no POPIA compliance claim. Ask us how access control and data handling would be set up, and take legal advice on your obligations.",
      },
      {
        question: "Can the laboratory run separately from a hospital system?",
        answer:
          "Yes. The Laboratory Management System runs independently and can later be connected with hospital or clinic systems.",
      },
      {
        question: "What about power cuts and connectivity?",
        answer:
          "We have not verified any offline-operation capability for this page. If continuity matters, ask for details about how the system behaves during interruptions and get the answer in writing.",
      },
      {
        question: "Is there local support in South Africa?",
        answer:
          "We do not claim any. Nalam Software is based in Salem, Tamil Nadu, India. Support hours, channels and onboarding for South African sites should be agreed in writing.",
      },
    ],
  },

  nigeria: {
    slug: "nigeria",
    country: "Nigeria",
    path: "/hospital-management-software-nigeria",
    primaryKeyword: "Hospital Management Software Nigeria",
    relatedKeywords: [
      "Hospital Management System Nigeria",
      "Healthcare Management Software Nigeria",
      "Clinic Management Software Nigeria",
      "Laboratory Management Software Nigeria",
    ],
    seoTitle: "Hospital Management Software in Nigeria | Nalam Software",
    metaDescription:
      "Connected hospital, clinic and lab software for Nigerian providers, from registration to report. See NDPA and NHIA points to check and request a demo.",
    h1: "Hospital Management Software in Nigeria, From Registration to Lab Report",
    eyebrow: "Nigeria",
    heroIntro:
      "Nalam Software provides hospital, clinic and laboratory management software that follows the patient from registration to consultation, laboratory, pharmacy and billing. This page is for hospitals, clinics and diagnostic laboratories in Nigeria exploring hospital management software.",
    heroSupport:
      "It explains where a connected system can help, and which Nigerian data protection, laboratory registration and health insurance points deserve a check before a demo.",
    heroImage: {
      src: "/images/solutions/clinic.png",
      alt: "Doctor speaking with a patient in a clinic beside a monitor displaying clinic management software",
    },
    challengesTitle: "Operational Challenges for Nigerian Hospitals, Clinics and Laboratories",
    challengesIntro:
      "Workflow problems that providers tend to describe. This section makes no claims about the national health system as a whole.",
    challenges: [
      {
        title: "Paper records and repeated data entry",
        body: "Where registration, consultation, laboratory and pharmacy keep separate paper or spreadsheet records, details are re-entered and histories are hard to retrieve.",
      },
      {
        title: "Mixed payment routes",
        body: "Providers often serve self-paying patients alongside health insurance and HMO-covered patients. Billing needs to remain itemized and tied to the underlying service, and each payer may need different documentation.",
      },
      {
        title: "Laboratory accuracy and turnaround",
        body: "Manual transcription from analyzers and poorly tracked samples slow reports and increase the risk of mismatches.",
      },
      {
        title: "Multiple sites and uneven infrastructure",
        body: "Organizations running more than one site, or sites with unreliable power or connectivity, should ask any vendor precisely how the system behaves in those conditions. We make no offline-operation or multi-branch claim here.",
      },
    ],
    helpsTitle: "How Nalam Healthcare Software Helps Nigerian Providers",
    helpsIntro:
      "These capabilities appear on Nalam's existing product pages. Fit for your sites and infrastructure should be tested in a demo.",
    helps: [
      {
        title: "Appointment to billing in one place",
        body: "Registration, appointment, consultation, procedures, pharmacy and billing run as one connected flow in the Clinic Management System, with a complete Patient 360 view.",
      },
      {
        title: "Direct lab machine integration",
        body: "The Laboratory Management System captures results from connected instruments rather than hand-typing them, then routes them through validation and authorization.",
      },
      {
        title: "Automated WhatsApp communication",
        body: "WhatsApp messaging is built into the platform so your organization can reach patients without switching tools.",
      },
      {
        title: "Billing, insurance and stock",
        body: "Billing across consultations, tests and procedures, insurance workflows in the billing and claims process, and stock tracking with expiry visibility.",
      },
    ],
    solutionsIntro:
      "Pick the product page closest to your organization to see the modules in detail.",
    contextTitle: "Nigeria: Requirements and Implementation Points to Check",
    contextIntro:
      "These are considerations, not statements of compliance. Nalam does not claim compliance, approval, accreditation or integration under any Nigerian law, regulator or insurer.",
    considerations: [
      {
        title: "Nigeria Data Protection Act 2023",
        body: "The Act, enforced by the Nigeria Data Protection Commission, defines health status as sensitive personal data (section 30 sets conditions for processing it) and requires data controllers and processors of major importance to register with the Commission (section 44). The Commission's General Application and Implementation Directive 2025 includes a schedule that places hospitals providing secondary or tertiary care, primary health centres and independent medical laboratories in registration categories; published summaries report it took effect in September 2025. Confirm with the Commission whether and how your organization must register, and ask vendors how patient data is protected.",
      },
      {
        title: "Laboratory registration",
        body: "The Medical Laboratory Science Council of Nigeria registers medical laboratories, and its published guidelines for setting up a laboratory ask for items such as a quality manual and standard operating procedures. Confirm current requirements with the Council before configuring laboratory records and reports.",
      },
      {
        title: "Health insurance and HMOs",
        body: "The National Health Insurance Authority Act 2022 established the NHIA, which works with health care providers. Confirm whether you need accreditation to serve enrolees, and list each HMO or insurer you bill and the documentation each requires. Nalam does not claim any insurer or NHIA integration.",
      },
      {
        title: "Federal and state differences, hosting and support",
        body: "Health regulation in Nigeria can involve both federal and state authorities, so check requirements for your state. Also confirm where data would be hosted, and how onboarding, training and support would work for your sites.",
      },
    ],
    sourcesNote: "Check current requirements directly with these official sources:",
    sources: [
      {
        label: "Nigeria Data Protection Act 2023 (Nigeria Data Protection Commission)",
        url: "https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf",
      },
      { label: "National Health Insurance Authority (NHIA)", url: "https://nhia.gov.ng/" },
      {
        label: "General Application and Implementation Directive 2025 (Nigeria Data Protection Commission)",
        url: "https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf",
      },
      { label: "Medical Laboratory Science Council of Nigeria", url: "https://mlscn.gov.ng/" },
      { label: "Federal Ministry of Health and Social Welfare", url: "https://health.gov.ng/" },
    ],
    faqs: [
      {
        question: "Can Nalam handle HMO and insurer billing?",
        answer:
          "Insurance workflows are part of the billing and claims process in the Hospital Management System. We do not claim integration with any Nigerian HMO or the NHIA, so tell us which payers you bill and what each requires.",
      },
      {
        question: "We are a diagnostic laboratory, not a hospital. Is there a fit?",
        answer:
          "Yes. The Laboratory Management System covers test orders, barcode sample tracking, lab machine integration, validation and authorization, and reagent and stock management, and runs independently of the hospital system.",
      },
      {
        question: "Will it work if our power or internet is unreliable?",
        answer:
          "We have not verified any offline-operation capability for this page. Ask for specifics about how the system behaves during outages and get the answer in writing before you decide.",
      },
      {
        question: "Does the software make us compliant with the Nigeria Data Protection Act?",
        answer:
          "No software does that by itself. Nalam makes no compliance claim for Nigeria. Confirm your obligations, including any registration with the Commission, with it or your advisers, and ask us how access control and data handling would be configured.",
      },
      {
        question: "Do you have a Nigerian office or local partners?",
        answer:
          "We do not claim any. Nalam Software is based in Salem, Tamil Nadu, India. Implementation, training and support arrangements for Nigeria should be confirmed in writing.",
      },
    ],
  },
};

export const countryPageList: CountryPage[] = Object.values(countryPages);

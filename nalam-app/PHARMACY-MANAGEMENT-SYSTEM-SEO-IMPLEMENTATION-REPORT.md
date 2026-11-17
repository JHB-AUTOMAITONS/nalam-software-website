# Pharmacy Management System SEO Landing Page: Implementation Report

Status: implemented locally on branch `claude/trusting-ritchie-s4pg7g`. Not deployed. **Not ready to publish until the product-owner items in section 17 are answered.**

New URL: `/solutions/pharmacy-management-system` (canonical `https://nalam.care/solutions/pharmacy-management-system`)

---

## 1. Existing website audit

- **Stack:** Next.js 16.3.5 App Router, React 19, Tailwind 4, framer-motion. Static pages; contact form posts to `/api/contact` (Resend / Google Apps Script). Deployed via Netlify/Hostinger configs.
- **Repo scope (important):** this repository is the **marketing website only**. It contains no pharmacy product source, schema or approved product documentation. Pharmacy capabilities could therefore only be verified against what the site already states publicly.
- **Solution pages:** `/solutions/hospital-management-system`, `/clinic-management-system`, `/laboratory-management-system` use `SolutionPageTemplate` + `buildMetadata` (self-referencing canonical, absolute title for HMS). Country pages (`/hospital-management-software-*`) and 20 blog posts exist.
- **Schema:** Organization + WebSite sitewide (layout), SoftwareApplication per solution (template), FAQPage on solution pages, BreadcrumbList emitted by `Breadcrumbs` (used inside `PageHero`).
- **Sitemap/robots:** `sitemap.ts` is explicit (no auto-discovery), so the new page needed a manual entry. `robots.ts` allows all except `/api/`.
- **Enquiry flow:** `/contact` (RequirementsForm). All demo/talk CTAs route there.
- **Brand note:** site brand string is "Nalam Software" with title template `%s | Nalam Software`. The approved title ends in "| NALAM", so the page uses `absoluteTitle` (same approach as the HMS page). Body copy follows the brief's "NALAM" in headings.
- **Existing pharmacy mentions:** only as bullets inside HMS/CMS content (`constants.ts`, `solutions-content.ts`, `country-pages.ts`, blog posts). No page targets "pharmacy management system".
- **Cannibalization:** low. HMS/CMS target "hospital/clinic management system". Pharmacy appears only as a feature there. Risk to watch: HMS FAQ answer on "pharmacy connected" and CMS "Integrated Pharmacy & Inventory", which this page links to rather than duplicates.

## 2. Competitor analysis

Fetched live via web reads, paraphrased only. Schema was not checkable (the fetch tool strips scripts).

| | DocPulse | Healthray (2 pages) | RedSail |
|---|---|---|---|
| H1 | "Pharmacy Management System for Clinics and Hospitals" | "AI-powered pharmacy software that actually saves you time" / "Best Pharmacy Management Software in India" | "Pharmacy Management Systems" |
| Depth | ~900 words | ~1,900 / ~1,300 | ~850 |
| Structure | Audiences, 6 features, 6-step workflow, manual vs digital table, FAQ | Very deep: 12 feature blocks, retail vs hospital setup, compliance badges, deployment, 9 FAQs. Second page is thin keyword-repeating copy | Directory of 4 US products, 4 FAQs |
| Hospital workflows | OPD counters, IPD wards, OT stores, EMR to dispensing queue | Ward indents, unit-dose, charges to patient bill, EMR link | None (US retail/LTC) |
| CTA | "Book a Free Demo" ×2 to contact | 3 forms, mismatched hospital forms on pharmacy page | None in body |
| Trust | Logos, stats, 4.5 widget | Badges, ratings, outcome metrics, testimonials | Brand claims only |
| Gaps | No HMS mention, FAQ questions are images, no regulatory/security detail | No pricing, unsourced metrics, duplicated definitions, mismatched CTAs | No demo CTA, US-only, typos |

**Takeaway for NALAM:** the winning angle is hospital-specific, honest and connected-to-HMS. Competitors lean on unsourced stats and badges, which this page deliberately does not copy.

## 3. Keyword research (Ubersuggest India snapshot, as provided)

| Keyword | Vol | SD |
|---|---:|---:|
| Pharmacy Management System | 590 | 23 |
| Pharmacy Management Software | 590 | 23 |
| Pharmacy Billing Software | 1300 | 24 |
| Pharmacy Stock Management Software | 170 | 17 |
| Pharmacy Inventory Management Software | 110 | 23 |
| Hospital Pharmacy Software | 90 | 17 |
| Medicine Inventory Management System | 90 | 16 |
| Hospital Pharmacy Management System | 30 | 20 |
| Integrated Pharmacy Management System | 0 | 4 |

Snapshots, not guarantees. Billing stays a section, not the focus, because of retail intent.

## 4. Keyword placement mapping

| Keyword | Vol / SD | Assigned | Actual placement | Natural? | Cannibalization |
|---|---|---|---|---|---|
| Pharmacy Management System | 590 / 23 | URL, title, H1, hero | URL, `<title>`, H1, hero paragraph | Yes | None |
| Hospital Pharmacy Management System | 30 / 20 | Introduction | Intro copy + "What Is a Hospital Pharmacy Management System?" H2 | Yes | Low |
| Pharmacy Management Software | 590 / 23 | Features | Intro H2 and "Complete Pharmacy Management Software Features" H2 | Yes | Low |
| Pharmacy Inventory Management Software | 110 / 23 | Inventory | Inventory section body (H2 reads "Smart Pharmacy Inventory Management for Hospitals" per brief) | Yes | Low |
| Pharmacy Stock Management Software | 170 / 17 | Stock | **Gap:** exact phrase not used. Covered by "Purchase and Stock Management" H2 and stock wording. See 17 | n/a | None |
| Pharmacy Billing Software | 1300 / 24 | Billing | Billing body ("Pharmacy billing software for a hospital...") | Yes | Low |
| Integrated Pharmacy Management System | 0 / 4 | Integration | Setups section body, Option A | Yes | None |
| Hospital Pharmacy Software | 90 / 17 | FAQ | FAQ H2 and answers | Yes | None |
| Medicine Inventory Management System | 90 / 16 | Supporting | **Not used** (kept out to avoid forcing) | n/a | None |

No keyword is repeated mechanically. No density targets were applied.

## 5. Final page content

Source: `src/lib/pharmacy-page-content.ts` (all copy) rendered by `src/app/solutions/pharmacy-management-system/page.tsx`. All 16 sections and the 10 FAQs are implemented as briefed. Main-content length measured at about **2,800 words** (rendered, excluding header/footer). That is above the 1,500-2,000 target, mostly due to the 11 four-part feature cards. Trim if you want it tighter.

## 6. SEO metadata

- Title: `Pharmacy Management System for Hospitals | NALAM`
- Description: as approved (verified in built HTML).
- Canonical self-referencing; robots `index, follow`; OG url/title/locale `en_IN`; OG/Twitter image is the sitewide default `og-default.jpg`.
- Page `<html lang>` stays `en` (sitewide layout, not changed). `inLanguage: en-IN` is set in the page's SoftwareApplication schema.

## 7. Heading hierarchy

One H1 (approved text, unchanged). 16 content H2s matching the brief order (plus sitewide footer H2s). H3s are feature, option and card titles. Verified in the rendered DOM.

## 8. Internal linking

Implemented from the new page: links to HMS and CMS in the "Integrated or Standalone" section, breadcrumb to Home/Solutions, CTAs to `/contact`.

**Proposed, NOT applied** (per brief, awaiting approval):
1. HMS page: add a contextual link in the "Laboratory, Radiology & Pharmacy" feature text, anchor "Pharmacy Management System".
2. CMS page: same, on "Integrated Pharmacy & Inventory", anchor "Pharmacy Management Software".
3. `/solutions` overview: add a card, and add the page to header Solutions dropdown/footer.
4. Optional: HMS blog posts mentioning pharmacy, anchor "Hospital Pharmacy Software".

## 9. Structured data

On the page: `SoftwareApplication` (no offers, ratings, reviews or certifications; related to HMS/CMS), `FAQPage` (all 10 answers are visible on the page), `BreadcrumbList` (from `PageHero`). Organization/WebSite come from the layout, so there is no duplicate. All blocks parsed as valid JSON in the build output. Not run through Google's Rich Results test (needs a live URL).

## 10. UI/UX

Reuses `PageHero`, `SectionHeading`, `Container`, `Button`, `SolutionFaqSection`, existing tokens and section rhythm. New: a simple semantic ordered-list workflow diagram, a responsive accessible comparison table (`caption`, `scope`), and capability tags. No redesign, no new dependencies.

**No product screenshots are used.** The repository holds none for pharmacy, and the brief forbids generic stock dashboards as NALAM screenshots. Real pharmacy screenshots should be supplied and added with descriptive alt text.

## 11. Technical SEO validation

| Check | Result |
|---|---|
| Unique title/description, single H1, canonical, robots | Pass |
| Sitemap inclusion | Pass (`/sitemap.xml` contains the URL) |
| OG metadata | Pass (default image; a pharmacy-specific OG image would be better) |
| Responsive 1440 / 820 / 390 | No horizontal overflow at any width |
| Console errors | 0 at all three widths |
| Internal links | 16 distinct internal links, all return 200 |
| Images | Page has no images of its own. One lazy header logo reported incomplete before scroll (sitewide, not from this change) |
| Core Web Vitals, formal accessibility audit, Rich Results test | **Not run** (no Lighthouse/live URL in this environment) |

## 12. Ranking protection comparison

Production build before vs after, comparing title, meta description, canonical, H1, JSON-LD and internal hrefs on: home, `/solutions`, HMS, CMS, LMS, contact, about, custom solutions. **All SAME.** Only changes to existing files: one added sitemap entry. No redirects added. Existing keyword targeting untouched.

## 13. Files modified

- Added `src/app/solutions/pharmacy-management-system/page.tsx`
- Added `src/lib/pharmacy-page-content.ts`
- Modified `src/app/sitemap.ts` (import + one entry)
- Added this report

## 14. Tests performed

`next build` (before and after), `tsc --noEmit`, ESLint on changed files, route generation, built-HTML SEO extraction, Playwright render at three widths with console/overflow/link checks. The repo has no automated test suite.

## 15. Verified product capabilities

Only what the existing site already states publicly:
- Pharmacy is connected within HMS; prescriptions, dispensing and stock movement stay in sync (HMS content).
- CMS has integrated pharmacy and inventory (CMS content).
- Billing is itemized and recorded with patient care (HMS content).
- HMS, LMS and CMS each run independently and can be connected later.
- Customization of reports, roles and permissions, screens, dashboards, automation, billing workflows.

These are tagged "Connected in NALAM" on the page (Inventory, Prescription, Billing).

## 16. Unverified features (written as needs / "Scoped in demo", not as claims)

Medicine catalogue, batch tracking, expiry management and alerts, purchase management, supplier management, stock transfers/adjustments, pharmacy reports, pharmacy-specific user access, OPD/IPD pharmacy specifics (ward requests, returns, patient-linked issue), purchase returns, stock deduction after billing, GST, insurance, **standalone pharmacy deployment**, implementation/support specifics.

## 17. Pending approvals / product-owner questions

1. Confirm each item in section 16. For each confirmed, change `status` to `"verified"` in `pharmacy-page-content.ts` and tighten the copy.
2. **Standalone pharmacy:** the brief's positioning requires it, but no evidence exists. Option B is deliberately non-committal. Needs a decision.
3. Provide real pharmacy screenshots and a pharmacy OG image.
4. Decide on the "Connected in NALAM / Scoped in demo" tags. They are honest but may be removed once everything is confirmed.
5. Approve the proposed internal link changes (section 8) and nav/footer addition.
6. "Pharmacy Stock Management Software" (170/mo) has no exact-phrase placement. Approve adding it once stock features are confirmed.
7. Brand: "NALAM" vs the site's "Nalam Software" naming.
8. Run Lighthouse/Core Web Vitals and Rich Results tests on staging; request indexing after launch. No ranking claims are made.

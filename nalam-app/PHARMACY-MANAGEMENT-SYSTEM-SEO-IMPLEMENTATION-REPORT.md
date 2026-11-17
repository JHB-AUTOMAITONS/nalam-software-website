# Pharmacy Management System SEO Landing Page: Final Pre-Publication Report

Page: `/solutions/pharmacy-management-system` (canonical `https://nalam.care/solutions/pharmacy-management-system`)
Branch: `claude/trusting-ritchie-s4pg7g` (the commit hash is reported in the delivery message; a file cannot contain its own hash).
**Production was NOT deployed. Nothing was pushed to any branch other than the one above.**

---

## 0. What changed in this revision

1. **Product verification done** against the product source (`thukal/Nalam-CMS`, commit `d926f52a`). Access was granted via the session's repository tool. A shell `git clone` was denied by the permission classifier, so I did not clone. I read files through the GitHub read tool and code search instead. No permissions were bypassed or changed.
2. **Page copy rewritten from evidence.** Ten feature cards now describe what the code implements. Unsupported claims were removed or qualified.
3. **Internal links applied** on HMS, CMS, `/solutions` and the footer (no metadata or schema changed).
4. **Measured:** main content 1,940 words; all checks below re-run.

## 1. Product verification matrix

**Method and limits.** Static review of: the pharmacy route table, request-validation schemas, service comments, file listings and code search results in `thukal/Nalam-CMS`. **The code was not executed, no running instance was available, and I did not read every service function body.** Old docs (`docs/PHARMACY_*.md`) were used only as pointers, never as sole evidence; "Strong" = route + validation schema both present, "Moderate" = implementation file and tests located but body not line-reviewed.

**Important finding:** the pharmacy module lives in the **Clinic Management System** (CMS) repository, not an HMS. No HMS, IPD, ward or admission code was found in the repositories reachable to this session.

Paths below are under `nalam-cms-backend/src/modules/pharmacy/` unless stated.

### A. Verified and implemented

| # | Capability | Strength | Evidence |
|---|---|---|---|
| 1 | Medicine catalogue (create/list/edit). Fields: generic name, company, category, strength, **HSN**, **GST rate**, purchase and selling price, dispensing unit, strip/box packaging, for-sale vs consumable | Strong | `pharmacy.routes.js`: `POST/GET /medicines`, `GET/PUT /medicines/:id`. `pharmacy.dto.js`: `createMedicineSchema` (`hsn`, `gstRate`, `purchasePrice`, `sellingPrice`, `genericName`, `baseUnit`, `packageType`, `unitsPerStrip`, `stripsPerBox`, `itemType`) |
| 2 | Inventory per batch, per branch and a central pharmacy hub; low-stock view; stock-movement ledger | Strong | `pharmacy.routes.js`: `POST/GET /inventory`, `GET /inventory/low-stock`, `GET /movements`, `GET /hub/stock`; `pharmacy.dto.js`: `addStockSchema`, `inventoryQuerySchema`, `branchMovementsQuerySchema` |
| 3 | Batch tracking: batch number, manufacturing and expiry date on every entry; auto-generated batch numbers on single entry; per-medicine batch drill-down | Strong | `pharmacy.dto.js`: `addStockSchema` (`batchNo` optional, auto-generated), `hubReceiveItemSchema` (`batchNo`, `expiryDate` required); `batchNumber.js`; route `GET /medicines/:id/batches` |
| 4 | Expiry handling: expiry per batch; expired batches excluded from sale; near-expiry and expired stock review/export | Strong (sale exclusion: Moderate) | `pharmacy.dto.js`: `expiringBefore`; routes `GET /hub/export/near-expiry.csv`, `/hub/export/expired-stock.csv`; `selfUse.service.js` and `b2bSales.service.js` document the shared FIFO consumer throwing `INSUFFICIENT_SELLABLE_STOCK` for expired-only stock; `stockTransfer.service.js` orders by expiry ascending |
| 5 | Purchase / goods receiving (GRN): vendor-first, multi-line, batch, expiry, quantity, **free quantity**, unit cost, **MRP**, product and bill discounts, invoice number/date, payment terms | Strong | routes `POST/GET /hub/receipts`; `pharmacy.dto.js`: `hubReceiveSchema`, `hubReceiveItemSchema` |
| 6 | Vendor bills with payments, due dates and cancellation; vendor returns with credit notes | Strong | routes `/hub/vendor-bills*`, `/hub/vendor-bills/:id/payments`, `/hub/vendor-bills/:purchaseId/returns`, `/hub/vendor-returns/:id/credit-received`; `vendorBills.service.js`, `vendorReturns.service.js` exist |
| 7 | Vendor (supplier) records: create, update, activate/deactivate | Strong | routes `/suppliers`, `/suppliers/:id`, `/deactivate`, `/activate`; `createSupplierSchema`, `updateSupplierSchema` |
| 8 | Stock transfers hub to branch (ready, ship, receive, partial receive, cancel); branch stock requests; manual adjustments with required reason | Strong | routes `/transfers*`, `/stock-requests*`, `POST /inventory/adjust`, `POST /hub/inventory/:inventoryId/adjust`; `stockTransfer.service.js`; `hubAdjustStockSchema` |
| 9 | Hub dashboard, analytics, reconciliation, low-stock suggestions, saved views, CSV exports (stock, receipts, near-expiry, expired, vendor bills) | Strong for existence; analytics content not reviewed | routes `/hub/dashboard`, `/hub/analytics`, `/hub/reconciliation/*`, `/hub/low-stock-suggestions`, `/hub/export/*.csv`; `hubDashboard.repo.js` / `.service.js` |
| 10 | Role-based access with a pharmacy hub manager role (no clinical/patient access) | Strong | `requirePermission('pharmacy:*')` on every route in `pharmacy.routes.js`; route comments on `pharmacy_hub_manager`; `tests/pharmacyHub/permissionMatrix.test.js` located |
| 11 | Prescription picks medicines from the pharmacy catalogue with stock status | Moderate | `nalam-cms-frontend/src/pages/App/components/PrescriptionEditor.jsx`, `nalam-cms-backend/src/modules/consultation/consultation.service.js`, `src/__tests__/PrescriptionDispensingUnit.test.jsx` located; function bodies not line-reviewed |
| 12 | Billing draws stock FIFO by expiry on finalization; walk-in pharmacy bills; stock restored on cancel | Moderate | `nalam-cms-backend/src/modules/billing/billing.routes.js` (`billing:pharmacy_manual`), `billing.service.js`, `tests/billing/billing.exactBatchAttribution.test.js`; `b2bSales.service.js` and `selfUse.service.js` call `pharmacy.consumeForBill` |
| 13 | Dispensing-unit and conversion model (UOM, units per strip, strips per box, strip price) | Strong | `uom.js` (`DISPENSING_UNITS`), `pharmacy.dto.js` (`unitsPerStrip`, `stripsPerBox`, `stripPrice`) |
| 14 | Shared inventory: tenant-wide medicine masters; stock per branch and hub | Strong | `pharmacy.dto.js` (`medicineQuerySchema` comment: masters tenant-wide, branch-scoped rollups); `/hub/*` and `/transfers` routes |
| 15 | Also implemented (not used on the page): B2B sales, customer damage returns, self-use register, consumable-usage tracking | Strong | routes `/b2b-*`, `/damage-returns*`, `/self-use*`, `/consumable-usage*` |

### B. Partially implemented

| Capability | What exists | What does not |
|---|---|---|
| Vendor GSTIN verification | `gst.provider.js` calls a third-party GST search API; route `POST /suppliers/gstin/verify` | Works only when `ENABLE_SANDBOX_GST` and API credentials are configured |
| Tax on bills | Per-line tax rate/amount migrations (`20260529120000_billing_tax_percentage`, `20260601120000_billing_item_tax_and_options`); `billing.service.js` references tax | GST invoice formats, GST returns and insurer billing not verified. Page makes no GST claim |
| MRP | Captured on each receipt line (`hubReceiveItemSchema.mrp`, `addStockSchema.mrp`) | Not a medicine-master field |
| Cost | `purchasePrice` on master, `unitCost` on each receipt | See weighted-average below |
| Expiry alerts | Low-stock alert events exist; near-expiry/expired are views and exports | Automatic expiry-date alert notifications not confirmed; page does not claim them |

### C. Planned / incomplete (per product docs only; code not confirmed)

`docs/PHARMACY_MANAGEMENT.md` section 11 (dated 2026-05, may be stale) lists: barcode scan at receive/dispense, stock reservation at prescription time, strip-wise prescription and billing, GST line detail on the bill PDF. Strip pricing exists at master level (`stripPrice`), but strip-wise prescribing was not confirmed. None are on the page.

### D. Not found / not supported

| Capability | Result |
|---|---|
| **Weighted-average stock ledger / costing** | Code searches for `weightedAverage`, `averageCost`, `avgCost`: no matches. A movement ledger exists (row 2) but not average costing. Not claimed |
| **IPD / ward / admission pharmacy** (ward requests, issue and return against an admission) | No matches in the repository. Not claimed. Page says inpatient pharmacy is scoped separately |
| **Business GST registrations** (tenant-level GST registration records) | Not found; only vendor `gstin`. Not claimed |

### E. Requires product-owner confirmation

| Item | Why |
|---|---|
| **HMS integration** | Pharmacy code is in the CMS repo; no HMS code was reachable. The HMS page on the site says pharmacy is connected. That claim is not backed by anything I could inspect. Page now says the connection scope is confirmed during scoping |
| **Standalone pharmacy deployment** | The pharmacy router requires the shared app authentication and tenant context, and billing consumes pharmacy stock, so it runs as a CMS module. A hub role without clinical access exists, but no separate deployment exists. Page states it is not available and not promised |
| Moderate-evidence rows 11 and 12 | Function bodies were not line-reviewed or executed; owner/QA should confirm before publishing |
| Whether pharmacy is sold to hospitals as part of CMS or HMS | Affects positioning of the "for hospitals" H1 |

## 2. Landing page content

- H1 unchanged: "A Smarter Pharmacy Management System for Modern Hospitals".
- Title, description and canonical unchanged (verified in built HTML).
- Main content: **1,940 words** (rendered `<main>`, excludes header/footer). Target 1,500-2,000.
- Key changes: ten feature cards rewritten from the matrix; supplier/purchase and expiry statements now supported; OPD/IPD section renamed "OPD and IPD Pharmacy: What Is Supported Today" with IPD explicitly out of scope; workflow reduced to the verified five steps (prescribe, stock check, bill, finalize, stock deducted); Option A is tied to CMS and defers HMS to scoping; Option B states pharmacy-only deployment is not available.
- Competitor differentiation kept: hub-and-branch stock model with a recorded trail, no unsourced stats or badges, no US retail framing.

## 3. Keyword placement (measured, main content)

| Keyword | Vol / SD | Placement | Count |
|---|---|---|---|
| Pharmacy Management System | 590 / 23 | URL, title, H1, hero, intro, headings | 10 |
| Hospital Pharmacy Management System | 30 / 20 | Intro and "What Is..." H2 | 3 |
| Pharmacy Management Software | 590 / 23 | Intro H2, Features H2 | 9 |
| Pharmacy Inventory Management Software | 110 / 23 | Inventory section | 1 |
| Pharmacy Stock Management Software | 170 / 17 | Inventory section | 1 |
| Pharmacy Billing Software | 1300 / 24 | Billing section | 1 |
| Integrated Pharmacy Management System | 0 / 4 | Option A | 1 |
| Hospital Pharmacy Software | 90 / 17 | FAQ H2 and answers | 3 |
| Medicine Inventory Management System | 90 / 16 | Not used (not forced) | 0 |

Natural usage; no density targets. Cannibalization risk with HMS/CMS: low (pharmacy appears there only as a feature).

## 4. Internal links added

| From | Link | Anchor |
|---|---|---|
| `/solutions/hospital-management-system` | `/solutions/pharmacy-management-system` | "Hospital Pharmacy Software" (callout above the articles section) |
| `/solutions/clinic-management-system` | same | "Pharmacy Management System page" |
| `/solutions` | same | "Pharmacy Management System" (callout between systems and "Better Together") |
| Footer (all pages) | same | "Pharmacy Management System" (Solutions list) |
| New page to HMS and CMS | `/solutions/hospital-management-system`, `/solutions/clinic-management-system` | "Hospital Management System", "Clinic Management System" |

Not applied: header Solutions dropdown (would add a top-level nav entry sitewide; left as a decision). Blog posts untouched.

## 5. Structured data

On the page: `SoftwareApplication` (no offers, ratings, reviews or certifications), `FAQPage` (all 10 answers visible), `BreadcrumbList` (from `PageHero`). Organization and WebSite remain sitewide only (no duplicates). All four JSON-LD blocks parse as valid JSON in the built HTML. Not tested with Google's Rich Results tool (needs a public URL).

## 6. Visual assets

- No product screenshots are used. None exist in this repo and no authorized running environment was available. The product repo has `docs/SCREENSHOT_CHECKLIST.md`, which could guide a capture session.
- No new Open Graph image was created: the only brand asset available is the sitewide `og-default.jpg`, which the page uses. A pharmacy-specific OG image needs real branding/screenshot assets. **Missing assets are documented here, nothing was fabricated.**

## 7. Technical validation (this revision)

| Check | Result |
|---|---|
| `next build` | Pass; route `/solutions/pharmacy-management-system` generated |
| `tsc --noEmit` | Pass |
| ESLint (`src`) | Pass |
| Metadata/canonical/robots | Title, description, canonical as approved; `robots: index, follow`; OG locale `en_IN` |
| Headings | One H1; 16 content H2s in the briefed order |
| Sitemap | `https://nalam.care/solutions/pharmacy-management-system` present in `/sitemap.xml` |
| Responsive (1440 / 820 / 390 px) | No horizontal overflow; 0 console errors; 0 failing requests on a fresh server |
| Internal links | 17 distinct internal links on the page checked, all return 200 |
| Existing-page SEO comparison | Production build before vs after on home, `/solutions`, HMS, CMS, LMS, contact, about, custom solutions, blog: **title, description, canonical, H1 and JSON-LD identical on all nine**. The only link difference on each is the added link to the new page (footer, plus callouts on the three pages above) |
| Image check | The only incomplete image on the page is the lazy header logo (sitewide, pre-existing). The page has no images of its own |
| Lighthouse / Core Web Vitals / Rich Results / formal accessibility audit | **Not run: needs a staging URL** |

Note: one run showed a stale 500 error from an old server still on the test port; it was reproduced as a stale process, and a clean server had no failures.

## 8. Files changed (this branch vs the original site)

- Added `src/app/solutions/pharmacy-management-system/page.tsx`
- Added `src/lib/pharmacy-page-content.ts`
- Added `src/components/sections/PharmacyLinkCallout.tsx`
- Modified `src/app/sitemap.ts` (1 entry)
- Modified `src/components/layout/Footer.tsx` (1 link)
- Modified `src/app/solutions/hospital-management-system/page.tsx` (callout only)
- Modified `src/app/solutions/clinic-management-system/page.tsx` (callout only)
- Modified `src/app/solutions/page.tsx` (callout only)
- Added/updated this report

## 9. Remaining blockers and approvals

1. **Owner sign-off on public claims**, especially rows 11 and 12 (moderate evidence) and the statements about hub transfers and vendor bills.
2. **HMS integration**: confirm what pharmacy provides for NALAM HMS customers. The site's HMS page already says pharmacy is connected; I could not verify that, and the new page is deliberately more cautious than the HMS page. Consider aligning the two.
3. **Standalone deployment**: needs an architecture decision before the wording can change.
4. **Inpatient/IPD pharmacy** and **weighted-average costing**: not implemented; confirm roadmap before any mention.
5. **Real pharmacy screenshots** and a pharmacy OG image.
6. Decide on adding the page to the header Solutions menu.
7. On staging: Lighthouse and Core Web Vitals, Rich Results test, accessibility audit.
8. No ranking improvement is claimed; no ranking data was available.

## 10. Confirmation

Production was **not** deployed. Work stays on `claude/trusting-ritchie-s4pg7g`. No other branch was pushed. No product code was modified, and the product repository was only read.

---

## 11. Update: hero layout and Solutions navigation

**Hero.** The pharmacy hero now uses the same `PageHero` + `SolutionHeroMedia` composition as the Clinic Management System page (full-bleed photo on the right, feathered edges, light aqua scrim, three floating chips on desktop). Supporting headline, description and the two CTAs ("Talk to Our Team", "View Features") are as requested. The H1, SEO title, meta description and canonical are unchanged. Chips use only code-verified capabilities: Medicine Stock (batch-wise visibility), Batch & Expiry (tracked on every entry), Pharmacy Billing (stock updated on finalize).

**Hero photo: NOT YET ADDED (blocker).** I cannot generate images, and the licensed-photo source I tried (Unsplash) is behind a browser bot-check that I did not try to bypass. No clinic or generic image was substituted, and no product UI was fabricated. Until a photo is supplied the hero renders a clean aqua gradient and the chips are hidden. To enable the photo, add a licensed, optimized file at `nalam-app/public/images/solutions/pharmacy-hero.webp` (about 1536x1024 or larger, a pharmacist in a hospital pharmacy with shelves or a workstation, subject on the right). The page detects it at build time and then applies the alt text "Pharmacist checking medicines on organized shelves in a hospital pharmacy", `next/image` responsive sizing and LCP priority, plus the chips. A candidate that appeared free to use under the Unsplash License is the National Cancer Institute photo "Pharmacist reaching for medication on shelf" on Unsplash, but I could not open the page or download it, so its license and suitability need checking by a person.

**Navigation.** "Pharmacy Management System" added as the 4th item of the Solutions dropdown (`navigation.main` in `src/lib/constants.ts`), after Hospital, Laboratory and Clinic. Desktop and mobile menus both read this list, so both show it with the existing styling. No links removed; the new link appears once per menu.

**Files modified in this update:** `src/lib/constants.ts`, `src/lib/pharmacy-page-content.ts`, `src/app/solutions/pharmacy-management-system/page.tsx`, `src/components/sections/SolutionHeroMedia.tsx` (photo made optional, optional `priority`; other pages unchanged).

**Validation:** `tsc --noEmit`, ESLint and `next build` pass. At 1440, 820 and 390 px: no horizontal overflow, no console errors, no failed requests. Desktop dropdown lists the four items in order with correct hrefs; the mobile menu lists them too. Existing pages' title, description, canonical, H1 and JSON-LD are identical to the original build; the only change is the added nav link. Image loading and layout-shift behavior with a real photo are untested because no photo exists yet.

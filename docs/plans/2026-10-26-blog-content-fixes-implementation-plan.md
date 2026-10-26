# Innrly Blog Content Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remediate 21 published blog posts according to the exact find-and-replace specifications in `innrly-blog-fixes-final` (covering P0 partner/legal guardrails, P1 accuracy & calculation corrections, and P2 metadata & date synchronization), updating both the MySQL database and the frontend static fallback code and SEO definitions.

**Architecture:** 
- The live Innrly blog architecture is dual-layered: blog posts are stored dynamically in the MySQL `blogs` table (`backend/app.py`), and pre-baked fallbacks are compiled in the frontend (`frontend/src/routes/blog.$slug.tsx`, `frontend/src/routes/blog.index.tsx`, and `frontend/src/lib/seo.ts`).
- An idempotent Python migration script (`backend/scripts/apply_blog_fixes.py`) reads the exact find-and-replace mappings directly from `innrly-blog-fixes-final/INNRLY_Blog_Exact_Replacements_2026-10-24.docx` and updates all 21 database records transactionally.
- The corresponding TypeScript route files and SEO dictionaries will be updated in lockstep so database, SSR responses, client-side routing, and structured data remain 100% synchronized.
- Zero URLs will be renamed or deleted.

**Tech Stack:** Python (FastAPI, mysql.connector, python-docx / xml.etree), TypeScript (TanStack Router, React), Vite, MySQL.

---

### Phase 1: Pre-Execution Setup & Database Backup

#### Task 1.1: Database Backup
**Files:**
- Create: `backend/backups/backup_blogs_pre_content_fixes.json`
- Script: `backend/scripts/backup_blogs.py`

**Step 1: Write backup script**
Export current state of all 31 database blog records (`id`, `title`, `slug`, `summary`, `content`, `meta_title`, `meta_description`, `created_at`, `updated_at`) to a timestamped JSON file.

**Step 2: Run backup script**
Command: `python backend/scripts/backup_blogs.py`
Expected: "Backed up 31 blog posts to backend/backups/backup_blogs_pre_content_fixes.json"

**Step 3: Verify backup file exists and has non-zero size**

---

### Phase 2: P0 Fixes — Partner & Legal Guardrails

#### Task 2.1: Page 1 — `/blog/innrly-vs-inn-flow` Full Rewrite to Partner Overview
**Files:**
- Modify: MySQL Database (`blogs` where `slug = 'innrly-vs-inn-flow'`)
- Modify: `frontend/src/routes/blog.$slug.tsx:436-457`
- Modify: `frontend/src/routes/blog.index.tsx`
- Modify: `frontend/src/lib/seo.ts:645-657`

**Actions:**
1. Replace entire article body with approved partner overview:
   - Title: `Innrly + Inn-Flow: The Automation Layer for Your Inn-Flow GL`
   - Frame Inn-Flow as an accounting partner and system of record, not a competitor.
   - Remove unverified competitor claims: `$400-$700/property`, `6-12 week onboarding`, `one-way QuickBooks`, `no real trial`.
   - Update integration roadmap statement: "A proposed Innrly integration is on the roadmap; confirm availability, supported data and workflow before planning deployment."
2. Update metadata in `seo.ts`:
   - Title: `Innrly + Inn-Flow: The Automation Layer | Innrly Blog` (52 chars)
   - Description: `Innrly + Inn-Flow: How Innrly provides the pre-GL automation layer for invoice capture, night audit, and reconciliation alongside your Inn-Flow accounting system.` (154 chars)

#### Task 2.2: Page 2 to 6 — M3 Associate Partner Status Correction Across 6 Articles
**Files:**
- Modify: MySQL Database (`blogs` where `slug` in `['ap-automation-hotels', 'hotel-back-office-automation', 'innrly-vs-inn-flow', 'multi-property-accounting-software', 'multi-property-hotel-accounting-software', 'night-audit-automation']`)
- Modify: `frontend/src/routes/blog.$slug.tsx`
- Modify: `frontend/src/lib/seo.ts`

**Actions:**
1. Search and replace every instance of:
   - "certified M3 partner" -> "M3 Associate Partner"
   - "officially certified M3 partner" -> "M3 Associate Partner"
   - "certified integration" -> "Associate Partner integration"
2. Narrow integration descriptions to pushing approved, GL-coded invoices into M3 (do not state general night-audit journal posting is live).
3. Update metadata and structured data in `seo.ts` and `blog.$slug.tsx`.

#### Task 2.3: Page 7 — `/blog/hyperpersonalization-20-leveraging-ai-and-biometric-data-for-bespoke-guest-experiences`
**Files:**
- Modify: MySQL Database (`blogs` where `slug = 'hyperpersonalization-20-leveraging-ai-and-biometric-data-for-bespoke-guest-experiences'`)
- Modify: `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Delete any claim that Innrly provides the data foundation for guest sleep, stress, health, or biometric personalization (upholding approved no-PHI policy).
2. Refactor into industry commentary regarding consent-based, non-sensitive guest preferences without Innrly capability linkages.

#### Task 2.4: Pages 8 & 9 — Timeclock & Labor Claims Qualification
**Files:**
- Modify: MySQL Database (`blogs` where `slug` in `['smarter-timeclock-system-innrly', 'labor-cost-blind-spots']`)
- Modify: `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Remove unsupported absolute claims: "tamper-proof Face ID", "complete elimination of buddy punching", "95% reduction in timesheet errors", "5-15% labor cost reduction".
2. Replace with qualified standard:
   *"Innrly Shift uses Face-ID timeclock punches to help reduce unauthorized clock-ins and support labor reporting. Employers must configure lawful timekeeping practices and obtain required employee notices and consent before biometric enrollment."*
3. Clarify Face ID is on-device facial verification; do not imply Apple Face ID certification or biometric fingerprinting.

---

### Phase 3: P1 Fixes — Calculations, Benchmarks & Claim Normalization

#### Task 3.1: Page 10 — `/blog/hotel-labor-cost-percentage` Formula & Revenue Guidance
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Correct the formula to include the percentage multiplier: `Labor cost % = (total labor cost / total revenue) x 100`.
2. Clarify that revenue definition depends on accounting policy (gross vs net, wages-only vs fully loaded benefits).
3. Label all benchmark ranges and savings figures as illustrative.
4. Replace absolute geofence statements with: *"location checks reduce, but do not establish, employee identity."*

#### Task 3.2: Page 11 — `/blog/mpor-explained` Metric Definition & Benchmarks
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Distinguish between *occupied room-nights* vs *rooms cleaned* (noting they differ when stayovers are unserviced).
2. Label the 3,840 / 120 = 32 calculation as an explicit hypothetical example.
3. Delete uncited industry benchmark tables and the 8%-15% overpayment claim.

#### Task 3.3: Page 6 — `/blog/night-audit-automation` HotSOS Reclassification
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Move HotSOS out of the PMS list and describe it as operations / service-optimization software.
2. Remove universal export format generalizations; state only documented formats for supported connections.

#### Task 3.4: Page 4 — `/blog/multi-property-accounting-software` Otelier Scope
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Reclassify Otelier as hotel finance, reconciliation, BI, and planning software that integrates with an accounting system, rather than a general ledger suite.
2. Remove cost, timeline, and property-count cutoff generalizations.

#### Task 3.5: Page 12 — `/blog/backofhouse-robotics-solving-labor-shortages-with-ai-chefs-and-automated-housekeeping`
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Delete robotics integration claim.
2. Qualify 24/7 robot claims with charging, maintenance, safety, and human supervision requirements.
3. Replace 1.2M labor deficit claim with AHLA 2025 verified data (65% of surveyed hotels reported staffing shortages, averaging 6-7 open positions).

#### Task 3.6: Pages 13, 14 & 15 — OTA Commission & Dispute Rules
**Files:**
- Modify: MySQL Database (`blogs` where `slug` in `['ota-commission-audit', 'ota-reconciliation-guide', 'hotel-ota-commission-reconciliation']`)
- Modify: `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Remove universal 30-day dispute deadline and 80%+ dispute success claims.
2. State deadlines and rights follow each channel's active merchant agreement.
3. Frame variance detection as a review flag rather than guaranteed recovery.

#### Task 3.7: Pages 16, 17 & 18 — Unsubstantiated "Real Results" Statistics
**Files:**
- Modify: MySQL Database (`blogs` where `slug` in `['hotels-losing-thousands-clc-mistakes', 'ditching-excel-budgeting-software', 'select-service-back-office-savings', 'ap-automation-hotels', 'hotel-back-office-automation']`)
- Modify: `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Remove or label as hypothetical: "90% less data entry", "40% fewer disputes", "15% more commissions", "180+ hours saved", "70% faster", "88% spreadsheet error study", "40-180 hours/month".
2. Add standard disclaimer: *"Results vary by property and existing process. We recommend a measured pilot."*

#### Task 3.8: Page 19 — `/blog/hospitality-accounting-services-vs-software`
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Remove unsourced $800–$1,500/property competitor price ranges and 15–20 day close claims.
2. Compare scope objectively between outsourced agency services and automation software.

#### Task 3.9: Page 20 — `/blog/regenerative-tourism-sustainability`
**Files:**
- Modify: MySQL Database & `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Frame the article as general industry commentary. Remove claims that Innrly provides carbon/biodiversity tracking.
2. Remove duplicate step in the recommendations list.

#### Task 3.10: Page 21 — `/blog/us-hospitality-2025` & Trend Posts
**Files:**
- Modify: MySQL Database (`blogs` where `slug` in `['us-hospitality-2025', 'labor-shortages-urban-revitalization', 'future-of-hospitality-accounting']`)
- Modify: `frontend/src/routes/blog.$slug.tsx`

**Actions:**
1. Add visible editor's note: *"Editor's note: This article was written as a 2025 outlook and is preserved as an archive of industry perspectives."*
2. Update title to `Where US Hospitality Was Headed in 2025 (Outlook Archive)`.

---

### Phase 4: P2 Housekeeping — Dates, Short Posts & Metadata Synchronization

#### Task 4.1: Publication Date Normalization & Updated Timestamps
**Files:**
- Modify: MySQL Database (`blogs.created_at`, `blogs.updated_at`)
- Modify: `frontend/src/routes/blog.$slug.tsx` & `blog.index.tsx`

**Actions:**
1. Update posts showing identical bulk "August 20, 2026" timestamps to their realistic historical publication dates.
2. Set `updated_at` to current date (`2026-10-26`) on all 21 modified posts.

#### Task 4.2: Short Post Verification
**Files:**
- Inspect: `/blog/best-hotel-accounting-software`, `/blog/hospitality-accounting-services-vs-software`, `/blog/quickbooks-for-hotels-limits`
- Ensure full comprehensive article text is present in both DB and static code.

#### Task 4.3: Synchronize Blog Index & SEO Dictionaries
**Files:**
- Modify: `frontend/src/routes/blog.index.tsx`
- Modify: `frontend/src/lib/seo.ts`

**Actions:**
1. Update card titles and summaries on `blog.index.tsx` for every post whose title or positioning changed.
2. Synchronize `defaultSeoData` in `seo.ts` so all meta titles, descriptions, and Open Graph tags reflect the updated content.

---

### Phase 5: Verification, Build & Testing

#### Task 5.1: Prohibited Term Scan Script
**Files:**
- Create: `backend/scripts/verify_blog_content_audit.py`

**Test Cases:**
1. Zero occurrences of forbidden phrases across entire DB and code:
   - "certified M3" / "officially certified M3"
   - "tamper-proof"
   - "complete elimination of buddy punching"
   - "95% reduction in timesheet errors"
   - "Studies show 88% of spreadsheets"
   - "40-180 hours"
2. Verify `/blog/innrly-vs-inn-flow` contains "Automation Layer" and zero competitor "competes for the same buyer" wording.
3. Verify structured data (`Article`, `BreadcrumbList`, `FAQPage`) parses valid JSON-LD on all 21 pages.

#### Task 5.2: Production Build & SSR Restart
**Commands:**
```powershell
cd frontend
npm run build
```
Verify build succeeds with exit code 0. Restart SSR daemon and run HTTP checks against `http://localhost:3000/blog/:slug`.

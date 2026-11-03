# Required Changes as per Client Document (v2 - Nov 1, 2026)

**Reference Document:** `innrly-final-site-fix-v2-2026-11-01/DEVELOPER-FIND-REPLACE-v2.docx`  
**Client Communication:** Email dated Sun, 01 Nov 2026 ("Read Review and DISCUSS!!!!!")  
**Status:** Review complete. **NO CODE CHANGES MADE** (pending review/approval).

---

## 1. Executive Summary & Client Instructions

The client provided a strict **Find-and-Replace** guide based on an audit of the live production site (`innrly.com`). 

> **Important client rules:**
> 1. **Do NOT copy over old files or previous ZIP files** — the live site contains updates that could be overwritten.
> 2. Perform **exact string replacements** directly in the source code.
> 3. Covers **5 specific items**:
>    - Pricing page accounting card
>    - Trust strip uptime text
>    - Security page uptime SLA FAQ line
>    - Security page DPA/BAA FAQ answer
>    - Compare page card titles and description
> 4. Update **both visible text AND hidden search metadata (JSON-LD structured data)** that Google reads.
> 5. Post-deployment: Clear site/CDN cache, capture screenshots of `/pricing`, `/security`, and `/compare`, and send to client for verification.

---

## 2. Detailed Breakdown of the 5 Items

---

### Item 1: Pricing Page (`/pricing`) — Accounting Integration Card

* **Target Page:** `/pricing`
* **Source File:** `frontend/src/routes/pricing.tsx` (Line ~287)
* **Location in Code:** Inside `bentoFeatures` array, object with `id: "accounting"`
* **Current Text (`FIND`):**
  ```
  Two-way sync with Sage Intacct, QuickBooks, M3.
  ```
* **Required Replacement (`REPLACE`):**
  ```
  Sync with QuickBooks and Sage Intacct; push to M3 as an M3 Associate Partner.
  ```
* **Current Code Reference:**
  ```tsx
  {
    id: "accounting",
    title: "Accounting Integration",
    blurb: "Two-way sync with Sage Intacct, QuickBooks, M3.", // <--- REPLACE THIS
    icon: BarChart3,
    inPlan: "pro",
    span: "md:col-span-3 md:row-span-2",
    feature: true,
    color: "emerald",
  }
  ```

---

### Item 2: Trust Strip (Shows on `/pricing` and other pages)

* **Target Component:** Trust Strip / Bar
* **Source File:** `frontend/src/components/site/TrustBar.tsx` (Line ~7)
* **Location in Code:** Inside `ITEMS` array
* **Current Text (`FIND`):**
  ```
  99.9% uptime target
  ```
* **Required Replacement (`REPLACE`):**
  ```
  Continuously monitored
  ```
* **Current Code Reference:**
  ```tsx
  const ITEMS = [
    { icon: ShieldCheck, label: "SOC 2 aligned" },
    { icon: Lock, label: "Bank-grade encryption" },
    { icon: Building2, label: "Trusted across hotel portfolios" },
    { icon: Activity, label: "99.9% uptime target" }, // <--- REPLACE THIS
  ];
  ```

---

### Item 3: Security Page (`/security`) — Data Backup FAQ Answer

* **Target Page:** `/security`
* **Source File:** `frontend/src/routes/security.tsx` (Line ~77)
* **Location in Code:** Inside `faqs` array, answer for `"What is your document retention and backup schedule?"`
* **Requirement:** Must update **BOTH** the visible page text and the FAQ structured data (`application/ld+json`).
* **Current Text (`FIND`):**
  ```
  We maintain automated daily geo-redundant backups with a 99.9% uptime SLA and customizable data retention periods to match your audit requirements.
  ```
* **Required Replacement (`REPLACE`):**
  ```
  We maintain automated daily geo-redundant backups and customizable data retention periods to match your audit requirements.
  ```
* **Current Code Reference:**
  ```tsx
  {
    q: "What is your document retention and backup schedule?",
    a: "Night-audit packs, OCR invoices, and GL reconciliation logs are stored with AES-256 encryption. We maintain automated daily geo-redundant backups with a 99.9% uptime SLA and customizable data retention periods to match your audit requirements.", // <--- REPLACE SLA PHRASE HERE
  }
  ```
  *(Note: Because lines 99–107 map `faqs` directly into the JSON-LD `FAQPage` schema, changing the string in `faqs` updates both the visible accordion and the hidden schema for Google automatically).*

---

### Item 4: Security Page (`/security`) — DPA / BAA FAQ Answer

* **Target Page:** `/security`
* **Source File:** `frontend/src/routes/security.tsx` (Line ~81)
* **Location in Code:** Inside `faqs` array, answer for `"Can I get a custom DPA or BAA?"`
* **Requirement:** Must update **BOTH** the visible page text and the FAQ structured data (`application/ld+json`).
* **Current Text (`FIND`):**
  ```
  Yes. We sign standard data processing agreements and accommodate enterprise legal review on request.
  ```
* **Required Replacement (`REPLACE`):**
  ```
  We sign standard data processing agreements and accommodate enterprise legal review on request. Innrly is not built for health data, so we do not sign BAAs.
  ```
* **Current Code Reference:**
  ```tsx
  {
    q: "Can I get a custom DPA or BAA?",
    a: "Yes. We sign standard data processing agreements and accommodate enterprise legal review on request.", // <--- REPLACE THIS
  }
  ```
  *(Note: Updates both visible content and JSON-LD schema via the `faqs` array).*

---

### Item 5: Compare Page (`/compare`) — Card Titles & Description

* **Target Page:** `/compare`
* **Source File:** `frontend/src/routes/compare.index.tsx`
* **Requirement:** Must update **BOTH** the visible card headings (`<h2>`) and the page's search metadata (`application/ld+json` "name" and "description" fields).

#### 5A. Description Change:
* **Location:** `compare.index.tsx` (Line ~118) in JSON-LD `description` field
* **Current Text (`FIND`):**
  ```
  Side-by-side comparisons positioning Innrly as an alternative to leading hotel back-office platforms.
  ```
* **Required Replacement (`REPLACE`):**
  ```
  Side-by-side comparisons of Innrly with hotel back-office platforms, plus how Innrly works with partners M3 and Inn-flow.
  ```

#### 5B. Card Titles Mapping (Visible Cards & Search Metadata):
Currently, the codebase dynamically sets the title using template string `Innrly: alternative to ${c.competitor}` (in JSON-LD line 121 and in the card header line 161).  
The client requested explicit distinct titles for each card:

| Competitor (`c.competitor`) | Current Generated Title (`FIND`) | Required New Title (`REPLACE`) |
| :--- | :--- | :--- |
| **M3** | `Innrly: alternative to M3` | `Innrly + M3` |
| **Inn-flow** | `Innrly: alternative to Inn-flow` | `Innrly + Inn-flow` |
| **QuickBooks** | `Innrly: alternative to QuickBooks` | `Innrly + QuickBooks` |
| **Otelier** | `Innrly: alternative to Otelier` | `Innrly vs Otelier` |
| **Hotel Effectiveness** | `Innrly: alternative to Hotel Effectiveness` | `Innrly vs Hotel Effectiveness` |
| **Actabl / Hotel Effectiveness** | `Innrly: alternative to Actabl / Hotel Effectiveness` | `Innrly vs Actabl / Hotel Effectiveness` |
| **Nimble Property** | `Innrly: alternative to Nimble Property` | `Innrly vs Nimble Property` |
| **Aptech** | `Innrly: alternative to Aptech` | `Innrly vs Aptech` |
| **ProfitSage** | `Innrly: alternative to ProfitSage` | `Innrly vs ProfitSage` |

* **Code Implementation Note:**
  In `frontend/src/routes/compare.index.tsx`:
  Add a `title` field to each item in the `comparisons` array (e.g. `title: "Innrly + M3"`, `title: "Innrly vs Otelier"`, etc.), and then render `{c.title}` in both:
  1. The JSON-LD schema (`name: c.title`)
  2. The visible card header (`<h2 ...>{c.title}</h2>`)

---

## 3. Supplementary Codebase Observation (For Information)

* In `frontend/src/components/site/CompareLayout.tsx`:
  - Lines 52, 75, 145 contain template strings:
    - Line 52: `{ name: \`Innrly: alternative to \${competitorName}\` }` (Breadcrumb)
    - Line 75: `title={\`Innrly: alternative to \${competitorName} — at a glance.\`}` (Section heading)
    - Line 145: `title={\`Questions about Innrly: alternative to \${competitorName}.\`}` (FAQ section heading)
  - The client specifically stated they are checking only `/pricing`, `/security`, and `/compare` (card titles). If desired, we can keep these as-is or adjust if the client later requests sub-page changes.

---

## 4. Post-Change Verification & Deployment Steps

Once you give the approval to execute the code changes:
1. **Apply the replacements** across the 4 identified files:
   - `frontend/src/routes/pricing.tsx`
   - `frontend/src/components/site/TrustBar.tsx`
   - `frontend/src/routes/security.tsx`
   - `frontend/src/routes/compare.index.tsx`
2. **Build and test** the frontend (`npm run build` or `pnpm build`) to verify there are no TypeScript or compilation errors.
3. **Deploy** to production server and clear CDN/cache.
4. **Capture screenshots** of:
   - `https://innrly.com/pricing` (Trust bar & Accounting Integration card)
   - `https://innrly.com/security` (Backup FAQ & BAA FAQ)
   - `https://innrly.com/compare` (All 9 card titles and page metadata)
5. **Notify the client/owner** that only these 5 items are ready for recheck.


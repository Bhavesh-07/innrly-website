# Innrly Final Site Fix v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the 5 exact find-and-replace updates specified in the client's `DEVELOPER-FIND-REPLACE-v2.docx` handoff document across `/pricing`, the TrustBar component, `/security`, and `/compare` (both visible UI and Schema.org JSON-LD structured data), followed by TypeScript validation, build testing, and screenshot verification.

**Architecture:** Frontend content & structured data remediation across TanStack Start / React 19 route files (`pricing.tsx`, `security.tsx`, `compare.index.tsx`) and shared UI components (`TrustBar.tsx`). No backend database migrations or API contract changes required.

**Tech Stack:** React 19, TanStack Start / TanStack Router, TypeScript 5.9, Tailwind CSS, Schema.org JSON-LD.

---

## 📋 Task Overview & File Mapping

| Task # | Component / Route | Target File | Current Text (`FIND`) | Required Replacement (`REPLACE`) |
| :--- | :--- | :--- | :--- | :--- |
| **Task 1** | **Pricing Page** (`/pricing`) | `frontend/src/routes/pricing.tsx:285-293` | `Two-way sync with Sage Intacct, QuickBooks, M3.` | `Sync with QuickBooks and Sage Intacct; push to M3 as an M3 Associate Partner.` |
| **Task 2** | **Trust Strip** (Global component) | `frontend/src/components/site/TrustBar.tsx:3-8` | `99.9% uptime target` | `Continuously monitored` |
| **Task 3** | **Security Page** (`/security`) — Data Backup FAQ | `frontend/src/routes/security.tsx:75-78` | `We maintain automated daily geo-redundant backups with a 99.9% uptime SLA and customizable data retention periods to match your audit requirements.` | `We maintain automated daily geo-redundant backups and customizable data retention periods to match your audit requirements.` |
| **Task 4** | **Security Page** (`/security`) — DPA / BAA FAQ | `frontend/src/routes/security.tsx:80-82` | `Yes. We sign standard data processing agreements and accommodate enterprise legal review on request.` | `We sign standard data processing agreements and accommodate enterprise legal review on request. Innrly is not built for health data, so we do not sign BAAs.` |
| **Task 5** | **Compare Page** (`/compare`) — Card Titles & Description | `frontend/src/routes/compare.index.tsx:6-125, 160-163` | **Description:** `Side-by-side comparisons positioning Innrly as an alternative to leading hotel back-office platforms.`<br><br>**9 Titles:** `Innrly: alternative to ${c.competitor}` | **Description:** `Side-by-side comparisons of Innrly with hotel back-office platforms, plus how Innrly works with partners M3 and Inn-flow.`<br><br>**9 Titles:** Distinct partner (`+`) and competitor (`vs`) titles. |
| **Task 6** | **Build & Verification Test** | Workspace test scripts | N/A | Execute TypeScript check, production build, and automated string assertions. |
| **Task 7** | **Deployment & Client Evidence Capture** | Server / CDN cache | N/A | Clear site/CDN cache, capture screenshots of `/pricing`, `/security`, and `/compare`, and report to owner. |

---

## 🛠️ Detailed Implementation Tasks

### Task 1: Update Accounting Integration Card on Pricing Page

**Files:**
- Modify: `frontend/src/routes/pricing.tsx:285-293`

**Step 1: Locate the target block in `pricing.tsx`**
In `frontend/src/routes/pricing.tsx`, find the `bentoFeatures` array entry for `id: "accounting"`:

```tsx
  {
    id: "accounting",
    title: "Accounting Integration",
    blurb: "Two-way sync with Sage Intacct, QuickBooks, M3.",
    icon: BarChart3,
    inPlan: "pro",
    span: "md:col-span-3 md:row-span-2",
    feature: true,
    color: "emerald",
  },
```

**Step 2: Apply the minimal exact replacement**
Update `blurb` to the exact string requested by the client:

```tsx
  {
    id: "accounting",
    title: "Accounting Integration",
    blurb: "Sync with QuickBooks and Sage Intacct; push to M3 as an M3 Associate Partner.",
    icon: BarChart3,
    inPlan: "pro",
    span: "md:col-span-3 md:row-span-2",
    feature: true,
    color: "emerald",
  },
```

**Step 3: Verify no other occurrences exist**
Run PowerShell:
```powershell
Select-String -Path frontend\src\routes\pricing.tsx -Pattern "Sage Intacct"
```
Expected output: Only line 287 with the new replacement text.

**Step 4: Commit**
```bash
git add frontend/src/routes/pricing.tsx
git commit -m "fix(pricing): update accounting card blurb for M3 partner status"
```

---

### Task 2: Update Trust Strip Uptime Line in `TrustBar.tsx`

**Files:**
- Modify: `frontend/src/components/site/TrustBar.tsx:3-8`

**Step 1: Locate `ITEMS` in `TrustBar.tsx`**
In `frontend/src/components/site/TrustBar.tsx`, lines 3–8:

```tsx
const ITEMS = [
  { icon: ShieldCheck, label: "SOC 2 aligned" },
  { icon: Lock, label: "Bank-grade encryption" },
  { icon: Building2, label: "Trusted across hotel portfolios" },
  { icon: Activity, label: "99.9% uptime target" },
];
```

**Step 2: Apply the exact replacement**
Replace `"99.9% uptime target"` with `"Continuously monitored"`:

```tsx
const ITEMS = [
  { icon: ShieldCheck, label: "SOC 2 aligned" },
  { icon: Lock, label: "Bank-grade encryption" },
  { icon: Building2, label: "Trusted across hotel portfolios" },
  { icon: Activity, label: "Continuously monitored" },
];
```

**Step 3: Verify string replacement**
Run PowerShell:
```powershell
Select-String -Path frontend\src\components\site\TrustBar.tsx -Pattern "Continuously monitored"
```
Expected output: Line 7 matches `"Continuously monitored"`.

**Step 4: Commit**
```bash
git add frontend/src/components/site/TrustBar.tsx
git commit -m "fix(trust): update uptime label to continuously monitored in TrustBar"
```

---

### Task 3: Update Data Retention/Backup FAQ on Security Page

**Files:**
- Modify: `frontend/src/routes/security.tsx:75-78`

**Step 1: Locate the FAQ in `security.tsx`**
In `frontend/src/routes/security.tsx`, lines 75–78:

```tsx
  {
    q: "What is your document retention and backup schedule?",
    a: "Night-audit packs, OCR invoices, and GL reconciliation logs are stored with AES-256 encryption. We maintain automated daily geo-redundant backups with a 99.9% uptime SLA and customizable data retention periods to match your audit requirements.",
  },
```

**Step 2: Apply the exact replacement**
Remove `with a 99.9% uptime SLA` from the answer:

```tsx
  {
    q: "What is your document retention and backup schedule?",
    a: "Night-audit packs, OCR invoices, and GL reconciliation logs are stored with AES-256 encryption. We maintain automated daily geo-redundant backups and customizable data retention periods to match your audit requirements.",
  },
```

*Note on JSON-LD:* Lines 96–107 dynamically map `faqs` into the `FAQPage` Schema.org script (`acceptedAnswer: { "@type": "Answer", text: f.a }`). Updating `a` in `faqs` automatically satisfies the client's requirement to update **both visible text and JSON-LD search data**.

**Step 3: Verify string replacement**
Run PowerShell:
```powershell
Select-String -Path frontend\src\routes\security.tsx -Pattern "geo-redundant backups"
```
Expected output: Answer without `with a 99.9% uptime SLA`.

**Step 4: Commit**
```bash
git add frontend/src/routes/security.tsx
git commit -m "fix(security): remove 99.9% uptime SLA from backup FAQ answer"
```

---

### Task 4: Update DPA / BAA FAQ on Security Page

**Files:**
- Modify: `frontend/src/routes/security.tsx:80-82`

**Step 1: Locate the BAA FAQ in `security.tsx`**
In `frontend/src/routes/security.tsx`, lines 80–82:

```tsx
  {
    q: "Can I get a custom DPA or BAA?",
    a: "Yes. We sign standard data processing agreements and accommodate enterprise legal review on request.",
  },
```

**Step 2: Apply the exact replacement**
Update the answer to include the BAA health data exclusion statement:

```tsx
  {
    q: "Can I get a custom DPA or BAA?",
    a: "We sign standard data processing agreements and accommodate enterprise legal review on request. Innrly is not built for health data, so we do not sign BAAs.",
  },
```

*Note on JSON-LD:* As with Task 3, updating `a` updates both the visible accordion and the Schema.org JSON-LD output automatically.

**Step 3: Verify string replacement**
Run PowerShell:
```powershell
Select-String -Path frontend\src\routes\security.tsx -Pattern "so we do not sign BAAs"
```
Expected output: Line 81 matches with new string.

**Step 4: Commit**
```bash
git add frontend/src/routes/security.tsx
git commit -m "fix(security): clarify BAA policy in FAQ answer and JSON-LD"
```

---

### Task 5: Update Compare Page Card Titles and Description

**Files:**
- Modify: `frontend/src/routes/compare.index.tsx:6-125, 160-163`

**Step 1: Update the `comparisons` data structure with explicit `title` fields**
Currently, `compare.index.tsx` generates card titles dynamically via ``Innrly: alternative to ${c.competitor}``.  
Add an explicit `title` property to each entry in `comparisons` to reflect the client's distinction between partner integrations (`+`) and competitor comparisons (`vs`):

```tsx
const comparisons = [
  {
    to: "/compare/innrly-vs-otelier",
    competitor: "Otelier",
    title: "Innrly vs Otelier",
    tagline: "Single platform vs a multi-module suite of acquired products.",
    readTime: "7 min read",
    highlights: ["One login, one data model", "Transparent $199/mo pricing", "2–4 week onboarding"],
    available: true,
  },
  {
    to: "/compare/innrly-vs-hotel-effectiveness",
    competitor: "Hotel Effectiveness",
    title: "Innrly vs Hotel Effectiveness",
    tagline: "Face-ID TimeClock, scheduling, and MPOR inside a full back office — vs a dedicated labor platform.",
    readTime: "6 min read",
    highlights: ["Native Face-ID TimeClock", "Labor + back office in one login", "Published per-property pricing"],
    available: true,
  },
  {
    to: "/integrations/m3",
    competitor: "M3",
    title: "Innrly + M3",
    tagline: "How Innrly + M3 work together — capture, code, and push invoices into M3.",
    readTime: "5 min read",
    highlights: ["M3 Associate Partner", "Push-only invoice sync", "M3 stays your GL"],
    available: true,
  },
  {
    to: "/integrations/inn-flow",
    competitor: "Inn-flow",
    title: "Innrly + Inn-flow",
    tagline:
      "How Innrly + Inn-flow work together — night audit, OTA reconciliation, and invoice capture pushing clean entries into Inn-flow.",
    readTime: "5 min read",
    highlights: ["Partner integration", "Night audit automation", "Inn-flow stays your GL"],
    available: true,
  },
  {
    to: "/integrations/quickbooks",
    competitor: "QuickBooks",
    title: "Innrly + QuickBooks",
    tagline:
      "Two-way QuickBooks sync — see how Innrly extends what QuickBooks alone can't do for hotels.",
    readTime: "4 min read",
    highlights: ["Two-way sync", "Hotel-aware GL coding", "OTA reconciliation built in"],
    available: true,
  },
  {
    to: "/compare/innrly-vs-nimble",
    competitor: "Nimble Property",
    title: "Innrly vs Nimble Property",
    tagline:
      "Published pricing, faster deployment, and native housekeeping productivity vs Nimble's quote-based model.",
    readTime: "6 min read",
    highlights: ["$199/mo published pricing", "2–4 week deployment", "Face-ID TimeClock built in"],
    available: true,
  },
  {
    to: "/compare/innrly-vs-aptech",
    competitor: "Aptech",
    title: "Innrly vs Aptech",
    tagline:
      "One platform vs Profitvue + Execuvue + Targetvue — three products licensed and onboarded separately.",
    readTime: "7 min read",
    highlights: ["One login, one data model", "No multi-module licensing", "2–4 week deployment"],
    available: true,
  },
  {
    to: "/compare/innrly-vs-profitsage",
    competitor: "ProfitSage",
    title: "Innrly vs ProfitSage",
    tagline:
      "Same BI surface — plus the A/P, audit, OTA, TimeClock, and payroll layers ProfitSage doesn't cover natively.",
    readTime: "6 min read",
    highlights: [
      "BI on the same data model",
      "A/P + audit + labor included",
      "Native TimeClock + MPOR",
    ],
    available: true,
  },
  {
    to: "/compare/innrly-vs-actabl",
    competitor: "Actabl / Hotel Effectiveness",
    title: "Innrly vs Actabl / Hotel Effectiveness",
    tagline:
      "Keep your existing TimeClock, get scheduling + MPOR + payroll export — at a fraction of Actabl's per-module labor pricing.",
    readTime: "7 min read",
    highlights: [
      "Works with your existing clock",
      "Face-ID is the upgrade, not required",
      "$149/mo per property, all-in",
    ],
    available: true,
  },
] as const;
```

**Step 2: Update the Schema.org JSON-LD description and `hasPart` names**
In `head` script (lines 117–123):
Replace:
```tsx
          name: "Innrly Comparisons",
          description:
            "Side-by-side comparisons positioning Innrly as an alternative to leading hotel back-office platforms.",
          hasPart: comparisons.map((c) => ({
            "@type": "WebPage",
            name: `Innrly: alternative to ${c.competitor}`,
            url: c.to,
          })),
```
With:
```tsx
          name: "Innrly Comparisons",
          description:
            "Side-by-side comparisons of Innrly with hotel back-office platforms, plus how Innrly works with partners M3 and Inn-flow.",
          hasPart: comparisons.map((c) => ({
            "@type": "WebPage",
            name: c.title,
            url: c.to,
          })),
```

**Step 3: Update the visible `<h2>` card header in `Page()`**
In `compare.index.tsx` line 160–162:
Replace:
```tsx
              <h2 className="mt-3 text-xl font-semibold text-foreground">
                Innrly: alternative to {c.competitor}
              </h2>
```
With:
```tsx
              <h2 className="mt-3 text-xl font-semibold text-foreground">
                {c.title}
              </h2>
```

**Step 4: Verify all 9 titles match client specifications**
Run PowerShell:
```powershell
Select-String -Path frontend\src\routes\compare.index.tsx -Pattern 'title: "Innrly'
```
Expected output: 9 lines matching the exact replacement titles.

**Step 5: Commit**
```bash
git add frontend/src/routes/compare.index.tsx
git commit -m "fix(compare): update card titles and JSON-LD schema to match client v2 guide"
```

---

### Task 6: Build Verification & Automated Text Assertion

**Step 1: Run TypeScript compiler and production build**
In `frontend`:
```powershell
cd frontend
npm run build
```
Expected: Build succeeds with 0 errors.

**Step 2: Automated assertion test script**
Create temporary verification script `scratch/verify_v2_replacements.ps1`:
```powershell
$checks = @(
    @{ File = "frontend\src\routes\pricing.tsx"; Find = "Two-way sync with Sage Intacct, QuickBooks, M3."; Replace = "Sync with QuickBooks and Sage Intacct; push to M3 as an M3 Associate Partner." },
    @{ File = "frontend\src\components\site\TrustBar.tsx"; Find = "99.9% uptime target"; Replace = "Continuously monitored" },
    @{ File = "frontend\src\routes\security.tsx"; Find = "with a 99.9% uptime SLA"; Replace = "automated daily geo-redundant backups and customizable data retention" },
    @{ File = "frontend\src\routes\security.tsx"; Find = "Yes. We sign standard data processing agreements"; Replace = "Innrly is not built for health data, so we do not sign BAAs." },
    @{ File = "frontend\src\routes\compare.index.tsx"; Find = "positioning Innrly as an alternative to leading"; Replace = "Side-by-side comparisons of Innrly with hotel back-office platforms, plus how Innrly works with partners M3 and Inn-flow." },
    @{ File = "frontend\src\routes\compare.index.tsx"; Find = 'Innrly: alternative to ${c.competitor}'; Replace = "Innrly + M3" },
    @{ File = "frontend\src\routes\compare.index.tsx"; Find = "Innrly: alternative to Inn-flow"; Replace = "Innrly + Inn-flow" },
    @{ File = "frontend\src\routes\compare.index.tsx"; Find = "Innrly: alternative to QuickBooks"; Replace = "Innrly + QuickBooks" },
    @{ File = "frontend\src\routes\compare.index.tsx"; Find = "Innrly: alternative to Otelier"; Replace = "Innrly vs Otelier" }
)

$pass = $true
foreach ($c in $checks) {
    $content = Get-Content $c.File -Raw
    if ($content.Contains($c.Find)) {
        Write-Error "FAIL: Old text still found in $($c.File): '$($c.Find)'"
        $pass = $false
    }
    if (-not $content.Contains($c.Replace)) {
        Write-Error "FAIL: New replacement text NOT found in $($c.File): '$($c.Replace)'"
        $pass = $false
    }
}
if ($pass) { Write-Host "ALL 5 ITEMS VERIFIED PASS!" -ForegroundColor Green }
```
Execute:
```powershell
powershell -ExecutionPolicy Bypass -File scratch\verify_v2_replacements.ps1
```
Expected: `ALL 5 ITEMS VERIFIED PASS!`

---

### Task 7: Production Deployment, Cache Clearing & Screenshot Capture

**Step 1: Restart SSR server**
On production server:
Restart PM2 / IIS process:
```powershell
pm2 restart innrly-frontend
# or restart IIS / Node service
```

**Step 2: Clear Site and CDN Cache**
- Clear Cloudflare / CDN cache for:
  - `https://innrly.com/pricing`
  - `https://innrly.com/security`
  - `https://innrly.com/compare`
- Clear browser cache.

**Step 3: Capture Verification Evidence (Screenshots)**
Capture full-page or section screenshots of:
1. `https://innrly.com/pricing` showing:
   - Trust strip with `"Continuously monitored"`
   - Accounting card with `"Sync with QuickBooks and Sage Intacct; push to M3 as an M3 Associate Partner."`
2. `https://innrly.com/security` showing:
   - Document retention FAQ without SLA phrase
   - DPA/BAA FAQ with BAA exclusion sentence
   - Google Rich Results Test or DevTools Elements showing updated `<script type="application/ld+json">`
3. `https://innrly.com/compare` showing:
   - All 9 updated card headers (`Innrly + M3`, `Innrly vs Otelier`, etc.)
   - DevTools Elements showing updated `CollectionPage` description & item names.

**Step 4: Notify Client / Founder**
Inform the owner with the screenshots attached:
> *"The 5 find-and-replace items from the Nov 1 v2 guide have been published, and site/CDN cache has been cleared. The 5 items are ready for your recheck."*


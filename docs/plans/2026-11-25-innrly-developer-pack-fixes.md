# Innrly Developer Pack Fixes Implementation Plan

> **For Claude / Agent:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement all 17 prioritized client developer fixes (D1 through D17) from the November 24, 2026 Developer Pack for innrly.com, verify every fix using the client's automated curl/grep commands, and update `Dev-Ticket-Checklist.xlsx` with real test evidence.

**Architecture:** The application comprises a TanStack Start / React 19 SSR frontend (`frontend/src` built with Vite and served by `frontend/run-server.mjs`), a Python FastAPI backend (`backend/app.py`), and a MySQL 8.4 database (`innrly_leads`). Fixes include database content corrections, routing/redirect rules (SSR & IIS), schema JSON-LD updates, copy compliance, component styling refactoring, dynamic RSS feed generation, and sitemap/crawler configuration.

**Tech Stack:** React 19, TanStack Start & Router, TypeScript, Tailwind CSS, Node.js SSR, Python 3.14, FastAPI, MySQL 8.4, openpyxl.

---

### Non-Negotiable Copy & Scope Rules
1. **Official Address:** `4276 Hwy 51, LaPlace, LA 70068`. Use NO phone number anywhere on the site.
2. **Pricing Rules:**
   - Starter: `$199` per property per month, plus `$299` one-time setup fee.
   - Professional: `$299/month` (do NOT write per property until Vimal confirms).
   - Annual billing saves 25% and waives setup.
   - Innrly Shift: `$149` per-property-per-month add-on. Labor is NOT included in Starter or Professional.
3. **Competitor Framing:** Hotel Effectiveness is a competitor, NOT an integration. Delete it from integration strips/tiles, but keep comparison pages (`/compare/innrly-vs-hotel-effectiveness` and Shift FAQ).
4. **Crawlers:** AI crawlers are explicitly allowed.
5. **Pending Vimal Confirmations (Do not publish yet):**
   - Professional unit: write `$299/month` only.
   - Go-live time: do NOT make any timing promises (e.g. "one business day", "2–4 weeks") in new copy.
6. **After GSC Scope:** Do NOT merge or redirect any overlapping blog posts yet.
7. **Do Not Create:** Do NOT create the 3 draft permalinks (`connected-hotel-back-office-automation`, `hotel-accounting-ap-automation`, `modern-hotel-night-audit-automation`).

---

## Phase 1: Critical P0 High-Impact Routing & Content Fixes (D1 – D5)

### Task 1: Fix 2 Broken Blog Links (Ticket D1 · P0)

**Files:**
- Database: `innrly_leads.blogs` table (`id: 56` and any matching select-service post)
- Modify: `frontend/run-server.mjs:32-60` (safety-net 301 redirects)
- Modify: `web.config:40-70` (IIS safety-net rewrite rules)

**Step 1: Check existing broken links in database and files**
- Run query on `blogs` for `ota-reconciliation` and `Select-Service`.
- Verify `../blog/ota-reconciliation` in post `exception-based-hotel-back-office-automation`.

**Step 2: Update database records**
- In `blogs` table, replace `href="../blog/ota-reconciliation"` with `href="/blog/ota-reconciliation-guide"`.
- If `Select-Service%20Hotels` or `Select-Service Hotels` exists in post content, replace with `href="/industries/select-service"`.

**Step 3: Add safety-net 301 redirects in `run-server.mjs` and `web.config`**
- In `frontend/run-server.mjs` under `REDIRECTS`:
  ```javascript
  '/blog/ota-reconciliation': '/blog/ota-reconciliation-guide',
  '/blog/ota-reconciliation/': '/blog/ota-reconciliation-guide',
  '/blog/Select-Service%20Hotels': '/industries/select-service',
  '/blog/Select-Service Hotels': '/industries/select-service',
  ```
- In `web.config`:
  ```xml
  <rule name="old-ota-rec" stopProcessing="true">
    <match url="^blog/ota-reconciliation/?$" />
    <action type="Redirect" url="/blog/ota-reconciliation-guide" redirectType="Permanent" />
  </rule>
  <rule name="old-select-service-blog" stopProcessing="true">
    <match url="^blog/Select-Service%20Hotels/?$" />
    <action type="Redirect" url="/industries/select-service" redirectType="Permanent" />
  </rule>
  ```

**Step 4: Verify with exact client command**
```bash
curl -s http://localhost:3000/blog/exception-based-hotel-back-office-automation | grep -c 'ota-reconciliation"'
# Expected: 0
curl -s http://localhost:3000/blog/select-service-revenue-protection | grep -c 'Select-Service%20'
# Expected: 0
```

---

### Task 2: Fix /privacy 404 & Aliases + Create /rss.xml (Ticket D2 · P0)

**Files:**
- Modify: `frontend/run-server.mjs:32-75` (301 redirect map & `/rss.xml` handler)
- Modify: `web.config:40-80` (IIS rewrite rules)
- Modify: `frontend/src/routes/blog.index.tsx` & `blog.$slug.tsx` (add RSS autodiscovery `<link>`)

**Step 1: Add 301 alias redirects**
- In `frontend/run-server.mjs` `REDIRECTS`:
  ```javascript
  '/privacy': '/legal/privacy',
  '/privacy/': '/legal/privacy',
  '/terms': '/legal/terms',
  '/terms/': '/legal/terms',
  '/login': 'https://app.innrly.com/',
  '/login/': 'https://app.innrly.com/',
  '/feed': '/rss.xml',
  '/feed/': '/rss.xml',
  ```
- In `web.config`:
  ```xml
  <rule name="alias-privacy" stopProcessing="true">
    <match url="^privacy/?$" />
    <action type="Redirect" url="/legal/privacy" redirectType="Permanent" />
  </rule>
  <rule name="alias-terms" stopProcessing="true">
    <match url="^terms/?$" />
    <action type="Redirect" url="/legal/terms" redirectType="Permanent" />
  </rule>
  <rule name="alias-login" stopProcessing="true">
    <match url="^login/?$" />
    <action type="Redirect" url="https://app.innrly.com/" redirectType="Permanent" />
  </rule>
  <rule name="alias-feed" stopProcessing="true">
    <match url="^feed/?$" />
    <action type="Redirect" url="/rss.xml" redirectType="Permanent" />
  </rule>
  ```

**Step 2: Implement dynamic `/rss.xml` endpoint in `run-server.mjs`**
- When `pathname === '/rss.xml'`, fetch active blogs from backend API or database.
- Construct valid RSS 2.0 XML:
  - `<rss version="2.0"><channel><title>Innrly Blog</title><link>https://innrly.com/blog</link><description>Hotel back-office automation insights</description>...<item><title>...</title><link>https://innrly.com/blog/slug</link><pubDate>...</pubDate><description>...</description></item></channel></rss>`
  - Serve with header `'Content-Type': 'application/rss+xml; charset=utf-8'`.

**Step 3: Add RSS autodiscovery in blog layout**
- Add `<link rel="alternate" type="application/rss+xml" title="Innrly Blog" href="/rss.xml" />` into the head/meta of `frontend/src/routes/blog.index.tsx` and `blog.$slug.tsx`.

**Step 4: Verify with exact client command**
```bash
for p in privacy terms login feed; do curl -s -o /dev/null -w "$p %{http_code} %{redirect_url}\n" http://localhost:3000/$p; done
# Expected: 301 redirects to target destinations
curl -sI http://localhost:3000/rss.xml
# Expected: HTTP 200 with Content-Type: application/rss+xml
```

---

### Task 3: Remove Hotel Effectiveness from Integration Lists (Ticket D3 · P0)

**Files:**
- Modify: `frontend/src/components/site/LogosStrip.tsx:32-39`
- Modify: `frontend/src/data/integrations.ts:140-148`
- Modify: `frontend/src/routes/llms-full[.]txt.ts:43`
- Database: Delete `Hotel Effectiveness` row from `innrly_leads.integrations` table (`id: 34`)

**Step 1: Update LogosStrip component**
- In `frontend/src/components/site/LogosStrip.tsx`, remove `"Hotel Effectiveness"` from `ADDITIVE`:
  ```typescript
  const ADDITIVE: string[] = [
    "Plaid",
    "Repay",
    "Medallia",
    "Revinate",
    "Kipsu",
  ];
  ```

**Step 2: Update `frontend/src/data/integrations.ts`**
- Remove the `"Hotel Effectiveness"` object from the exported integrations array.

**Step 3: Update LLMs full text**
- In `frontend/src/routes/llms-full[.]txt.ts`, remove `Hotel Effectiveness` from `- **Payroll & TimeClock**: ADP, Paychex...`

**Step 4: Remove from database `integrations` table**
- Run `DELETE FROM integrations WHERE name = 'Hotel Effectiveness' AND category = 'payroll'`.

**Step 5: Verify preservation of competitor comparison pages**
- Ensure `/compare/innrly-vs-hotel-effectiveness` and `/solutions/innrly-shift` competitor FAQ remain completely intact.

**Step 6: Verify with exact client command**
```bash
for p in '' pricing contact integrations; do echo $p $(curl -s http://localhost:3000/$p | grep -c 'Hotel Effectiveness'); done
# Expected: 0 for all pages
```

---

### Task 4: Fix 'Labor Included' Claims on /compare Pages (Ticket D4 · P0)

**Files:**
- Modify: `frontend/src/routes/compare.index.tsx:83`
- Modify: `frontend/src/routes/compare.innrly-vs-actabl.tsx:153`
- Modify: `frontend/src/routes/compare.innrly-vs-aptech.tsx:128`

**Step 1: Update `compare.index.tsx`**
- Replace `"A/P + audit + labor included"` with:
  `"A/P + audit in one platform; labor via the Innrly Shift add-on"`

**Step 2: Update `compare.innrly-vs-actabl.tsx`**
- Replace `"You want published, predictable pricing: labor included in the back-office price, not billed per module."` with:
  `"You want published, predictable pricing: back office from $199 per property per month, labor as a $149-per-property add-on."`

**Step 3: Update `compare.innrly-vs-aptech.tsx`**
- Replace `"You want a 2–4 week deployment with budgeting, BI, A/P, and labor included from day one."` with:
  `"You want BI, A/P and night audit on top of your existing GL, with labor available as an add-on."`

**Step 4: Verify with exact client command**
```bash
for p in compare compare/innrly-vs-actabl compare/innrly-vs-aptech; do echo $p $(curl -s http://localhost:3000/$p | grep -ci 'labor included'); done
# Expected: all 0
```

---

### Task 5: Update /onboarding Setup-Fee & Timing Copy (Ticket D5 · P0)

**Files:**
- Modify: `frontend/src/routes/onboarding.tsx:35-60, 400, 1132`
- Modify: `frontend/src/lib/seo.ts:151-163`

**Step 1: Update visible FAQ and FAQ schema in `onboarding.tsx`**
- Replace setup fee question and answer:
  ```typescript
  {
    q: "Is there a setup fee?",
    a: "There is a $299 one-time setup fee on monthly plans. Annual plans waive the setup fee and save 25%. Every plan includes a 90-day free trial.",
  }
  ```
- Remove all mentions of "zero setup fees".

**Step 2: Remove unconfirmed timing promises on `/onboarding`**
- Line 400: Change `"Takes about 5 minutes. You'll be live on Innrly within one business day."` to:
  `"Takes about 5 minutes. Start your Innrly 90-day free trial."`
- Line 1132: Change `"our onboarding team will reach out within one business day to schedule kickoff"` to:
  `"our onboarding team will reach out to schedule kickoff and confirm your PMS integration."`

**Step 3: Update meta description in `seo.ts`**
- Change description for `/onboarding` to:
  `"Start your Innrly 90-day free trial. Add your company, users and properties; our team pairs your PMS and maps your chart of accounts."`
- Update `ogDescription` accordingly.

**Step 4: Verify with exact client command**
```bash
curl -s http://localhost:3000/onboarding | grep -ci 'zero setup'
# Expected: 0
curl -s http://localhost:3000/onboarding | grep -ci 'one business day'
# Expected: 0
```

---

## Phase 2: Priority P1 SEO, Schema, Crawler & Core Layout Fixes (D6 – D12)

### Task 6: Modernize Homepage + /pricing JSON-LD (Ticket D6 · P1)

**Files:**
- Modify: `frontend/src/routes/__root.tsx:145-180`
- Modify: `frontend/src/routes/index.tsx:48-75`
- Modify: `frontend/src/routes/pricing.tsx:55-80`
- Asset check: `frontend/public/innrly-logo.png`

**Step 1: Replace Organization & WebSite schemas in `__root.tsx`**
- Use Blocks 1 & 2 from `schema-jsonld-snippets.html`.
- Set logo to `https://innrly.com/innrly-logo.png` (512x512).
- Add full `PostalAddress` (`4276 Hwy 51, LaPlace, LA 70068, US`).
- Remove `SearchAction` pointing to `/glossary?q=`.
- Do NOT include any telephone property.

**Step 2: Update `SoftwareApplication` in `index.tsx`**
- Use Block 3 from `schema-jsonld-snippets.html`.
- Remove `"price": "0"`.
- Define offers for Starter (`$199` per property/mo), Professional (`$299` per month), and Innrly Shift add-on (`$149` per property/mo).

**Step 3: Update `Product` schema in `pricing.tsx`**
- Use Block 4 from `schema-jsonld-snippets.html`.
- Include Starter, Professional, and Innrly Shift add-on with `UnitPriceSpecification`.

**Step 4: Verify with exact client command**
```bash
curl -s http://localhost:3000/ | grep -o '"price":"[0-9]*"'
# Expected: no "0"
curl -s http://localhost:3000/ | grep -c 'favicon.svg in ld+json'
# Expected: 0
curl -s http://localhost:3000/ | grep -c 'SearchAction'
# Expected: 0
```

---

### Task 7: Blog Article Schema Dates & Absolute Breadcrumb URLs (Ticket D7 · P1)

**Files:**
- Modify: `frontend/src/routes/blog.$slug.tsx:695-750`
- Modify: `frontend/src/routes/compare.index.tsx:120-140`

**Step 1: Update `Article` schema in `blog.$slug.tsx`**
- Use Block 5 from `schema-jsonld-snippets.html`.
- Dynamic `dateModified`: `loaderData.post.updated_at || loaderData.post.date`.
- Ensure publisher references `@id: "https://innrly.com/#organization"`.

**Step 2: Update `BreadcrumbList` in `blog.$slug.tsx`**
- Use absolute URLs:
  - Position 1: `item: "https://innrly.com/"`
  - Position 2: `item: "https://innrly.com/blog"`
  - Position 3: `item: `https://innrly.com/blog/${loaderData.slug}``

**Step 3: Update `CollectionPage` in `compare.index.tsx`**
- In `hasPart.map`:
  - `url: `https://innrly.com${c.to}`` (making relative URLs absolute).

**Step 4: Verify with exact client command**
```bash
curl -s http://localhost:3000/blog/mpor-explained | grep -o '"date[A-Za-z]*":"[^"]*"'
# Expected: Valid dates reflecting publish and modification
```

---

### Task 8: Official Address in Footer, /contact and Verify Zero Phone Numbers (Ticket D8 · P1)

**Files:**
- Modify: `frontend/src/components/site/Footer.tsx:100-140`
- Modify: `frontend/src/routes/contact.tsx:100-250`

**Step 1: Add official address to `Footer.tsx`**
- Add clean address text above copyright line:
  `Innrly, 4276 Hwy 51, LaPlace, LA 70068 · contact@innrly.com`
- Verify no phone number or `tel:` link is added.

**Step 2: Verify `/contact` page copy and schema**
- Ensure address is `4276 Hwy 51, LaPlace, LA 70068` and email is `contact@innrly.com`.
- Confirm 0 phone numbers and 0 `tel:` links.

**Step 3: Verify with exact client command**
```bash
curl -s http://localhost:3000/contact | grep -c '4276 Hwy 51'
# Expected: >= 1
curl -s http://localhost:3000/ | grep -c 'tel:'
# Expected: 0
```

---

### Task 9: Move AuroraReveal CSS out of Homepage H1 (Ticket D9 · P1)

**Files:**
- Modify: `frontend/src/components/site/AuroraReveal.tsx`
- Modify: `frontend/src/styles.css`

**Step 1: Move CSS rules to `frontend/src/styles.css`**
- Append `.aurora-reveal::after`, `.aurora-reveal.is-revealed::after`, `@keyframes aurora-reveal-sweep`, and `@media (prefers-reduced-motion)` to `styles.css`.

**Step 2: Clean `AuroraReveal.tsx`**
- Remove `<style>{...}</style>` from inside the JSX return.
- Ensure the component renders pure `<span className={cn("aurora-reveal relative inline-block", revealed && "is-revealed", className)}>{children}</span>`.

**Step 3: Verify with exact client command**
```bash
curl -s http://localhost:3000/ | python3 -c "import re,sys;h=sys.stdin.read();print('<style' in re.search(r'<h1.*?</h1>',h,re.S).group(0))"
# Expected: False
```

---

### Task 10: Configure app.innrly.com robots.txt & Headers (Ticket D10 · P1)

**Files:**
- Reference: `Innrly-Developer-Pack-2026-11-24/01-Developer/robots.txt-app.innrly.com.txt`
- Create / verify: `app.innrly.com` deployment documentation and `web.config` template.

**Step 1: Prepare `robots.txt` for `app.innrly.com`**
- Content:
  ```txt
  User-agent: *
  Allow: /$
  Allow: /signin$
  Allow: /login$
  Disallow: /
  ```

**Step 2: Add IIS web.config rules for `app.innrly.com`**
- Static MIME map for `.txt` as `text/plain`.
- Custom HTTP header `X-Robots-Tag: noindex, nofollow`.
- Exclude real files from Angular/SPA rewrite rule:
  `<conditions><add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /></conditions>`
- Add `<meta name="robots" content="noindex, nofollow">` to app root `index.html`.

---

### Task 11: Deploy Final robots.txt & llms.txt (AI Crawlers Allowed) (Ticket D11 · P1)

**Files:**
- Source: `Innrly-Developer-Pack-2026-11-24/01-Developer/robots.txt-innrly.com.txt`
- Source: `Innrly-Developer-Pack-2026-11-24/01-Developer/llms.txt`
- Target: `frontend/public/robots.txt`
- Target: `frontend/public/llms.txt`
- Database: `innrly_leads.site_settings` table (keys `robots_txt` and `llms_txt`)

**Step 1: Copy file assets to `frontend/public`**
- Overwrite `frontend/public/robots.txt` with `robots.txt-innrly.com.txt`.
- Overwrite `frontend/public/llms.txt` with `llms.txt`.

**Step 2: Update MySQL `site_settings` table**
- Update `setting_value` for `robots_txt` with the full content of `robots.txt-innrly.com.txt`.
- Update `setting_value` for `llms_txt` with the full content of `llms.txt`.

**Step 3: Verify with exact client command**
```bash
curl -s http://localhost:3000/robots.txt | grep -c GPTBot
# Expected: 1
curl -s http://localhost:3000/llms.txt | grep -c llmstxtgenerate
# Expected: 0
curl -s http://localhost:3000/llms.txt | grep -c '4276 Hwy 51'
# Expected: 1
```

---

### Task 12: Add /hotel-back-office-automation to sitemap.xml (Ticket D12 · P1)

**Files:**
- Modify: `frontend/src/routes/sitemap[.]xml.ts:20-55`
- Modify: `frontend/public/sitemap.xml`

**Step 1: Update `sitemap[.]xml.ts`**
- In `defaultEntries`, add:
  ```typescript
  { path: "/hotel-back-office-automation", changefreq: "monthly", priority: "0.85", lastmod: "2026-11-24" },
  ```

**Step 2: Update static `frontend/public/sitemap.xml`**
- Insert `<url><loc>https://innrly.com/hotel-back-office-automation</loc><lastmod>2026-11-24</lastmod></url>`.

**Step 3: Verify with exact client command**
```bash
curl -s http://localhost:3000/sitemap.xml | grep -c 'innrly.com/hotel-back-office-automation<'
# Expected: 1
```

---

## Phase 3: Priority P2 & P3 Enhancements, Cleanup & Checklist Tracking (D13 – D17)

### Task 13: Duplicate GA4 IDs Audit & Unification (Ticket D13 · P2)

**Files:**
- Modify / verify: `frontend/src/lib/scripts.ts:10`
- Modify / verify: `frontend/run-server.mjs:285`
- Documentation: Add clarification note for Vimal / GTM Admin.

**Step 1: Audit GA4 IDs in code**
- `G-TJZT02L07P` is configured as primary measurement ID in `scripts.ts` and `run-server.mjs`.
- If GTM container `GTM-NF2VZN8` also fires `G-670BJCN7K6`, document for client that `G-670BJCN7K6` should be paused in GTM to prevent duplicate pageviews.

---

### Task 14: Footer 'Compare' & 'Works With' Columns + Topic-Aware Related Posts (Ticket D14 · P2)

**Files:**
- Modify: `frontend/src/components/site/Footer.tsx:35-65`
- Modify: `frontend/src/routes/blog.$slug.tsx:765-840`

**Step 1: Update Footer columns in `Footer.tsx`**
- Rename column containing integration links (M3, QuickBooks) to `"Works with"`.
- Add a new `"Compare"` column:
  - vs Actabl (`/compare/innrly-vs-actabl`)
  - vs Otelier (`/compare/innrly-vs-otelier`)
  - vs Hotel Effectiveness (`/compare/innrly-vs-hotel-effectiveness`)
  - vs Aptech (`/compare/innrly-vs-aptech`)
  - vs Nimble (`/compare/innrly-vs-nimble`)
  - vs ProfitSage (`/compare/innrly-vs-profitsage`)
  - All comparisons (`/compare`)

**Step 2: Implement topic-aware related block in `blog.$slug.tsx`**
- In fallback logic when post slug is not explicitly mapped in `RELATED_BY_SLUG`:
  - Detect topic by post category / tags / title keywords:
    - Labor: link `/solutions/innrly-shift`
    - AP: link `/solutions/innrly-pay` and `/integrations/m3`
    - Night audit: link `/solutions/operations-automation`

**Step 3: Verify with exact client command**
```bash
curl -s http://localhost:3000/ | grep -c 'compare/innrly-vs-hotel-effectiveness'
# Expected: >= 1 (present in footer)
```

---

### Task 15: Starter 'per property' Label on /pricing (Ticket D15 · P2)

**Files:**
- Modify: `frontend/src/routes/pricing.tsx:510-520`

**Step 1: Update pricing card unit label**
- In `pricing.tsx` line 513:
  ```tsx
  <span className="text-xs text-muted-foreground">
    {p === "starter" ? "/property/mo" : "/mo"}
  </span>
  ```
- Leave Professional as `/mo` until Vimal confirms unit.

**Step 2: Verify with exact client command**
```bash
curl -s http://localhost:3000/pricing | grep -ci 'per property'
# Expected: Match count found
```

---

### Task 16: Sitemap lastmod / Priority Normalization (Ticket D16 · P2)

**Files:**
- Modify: `frontend/src/routes/sitemap[.]xml.ts:15-60`
- Modify: `frontend/public/sitemap.xml`

**Step 1: Update lastmod in `sitemap[.]xml.ts`**
- Replace hardcoded `legalDate = "2026-06-06"` with `"2026-11-24"`.
- Keep realistic priority and changefreq values.

**Step 2: Update `frontend/public/sitemap.xml`**
- Replace legacy `2026-06-06` dates with `2026-11-24`.

**Step 3: Verify with exact client command**
- Spot-check 3 URLs in `/sitemap.xml`: verify `lastmod = 2026-11-24`.

---

### Task 17: Mobile LCP Optimization (Ticket D17 · P3)

**Files:**
- Modify: `frontend/src/routes/__root.tsx` (preload hero assets & font-display optimization)

**Step 1: Add preloads for LCP assets**
- In `__root.tsx`, add `<link rel="preload">` for the hero typography/assets where appropriate.
- Verify production build bundle splitting with `npm run build` in `frontend/`.

---

### Task 18: Build, Test & Update Dev-Ticket-Checklist.xlsx

**Files:**
- Modify: `D:\python project\innrly-git\Innrly-Developer-Pack-2026-11-24\Dev-Ticket-Checklist.xlsx`

**Step 1: Build & restart local servers**
- In `frontend/`: run `npm run build`.
- Restart SSR server `node run-server.mjs`.

**Step 2: Run all verification commands**
- Run a PowerShell/bash automated test suite verifying every ticket from D1 to D17.

**Step 3: Update `Dev-Ticket-Checklist.xlsx` using `openpyxl`**
- Mark each ticket (D1–D17) as **Done** in the "Status" column.
- Fill the "Owner" column as **Developer**.
- Record real verification outputs.
- Save workbook preserving formatting, data validation dropdowns, and existing sheets.

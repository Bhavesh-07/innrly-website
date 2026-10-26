# Innrly.com Site Audit Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remediate all 7 major findings from the `innrly.com` comprehensive site audit report: fix HTTP/WWW timeout via canonical 301 redirects, replace 404 App Store links with early-access beta handling, fix relative blog Open Graph URLs, eliminate homepage product card duplication and sitemap duplicate entries, standardize trial/demo CTA labels, optimize oversized SEO titles and descriptions, correct Facebook handle, enrich thin content pages, and optimize font/reCAPTCHA performance.

**Architecture:** Full-stack remediation spanning TanStack Start SSR React frontend ([run-server.mjs](file:///d:/python%20project/innrly-git/frontend/run-server.mjs), [routes](file:///d:/python%20project/innrly-git/frontend/src/routes)), SEO engine ([seo.ts](file:///d:/python%20project/innrly-git/frontend/src/lib/seo.ts)), IIS Web Server reverse proxy configuration ([web.config](file:///d:/python%20project/innrly-git/web.config)), and production host network configurations.

**Tech Stack:** TanStack Start / React 19, TypeScript, Tailwind CSS, Node.js HTTP SSR Server, IIS 8.5+ URL Rewrite, Schema.org JSON-LD.

---

## 📋 Audit Finding Mapping & Task Index

| Task # | Audit Finding | Target Files | Scope & Deliverable |
| :--- | :--- | :--- | :--- |
| **Task 1** | **HTTP / WWW Timeout** (`http://` doesn't load) | `frontend/run-server.mjs`<br>`web.config` | Multi-tier 301 redirect: Node SSR protocol guard + IIS canonical rule + Azure NSG / IIS binding verification. |
| **Task 2** | **Broken App Store Links** (404 on App Store & Google Play) | `frontend/src/components/site/Footer.tsx`<br>`frontend/src/routes/control-hub.settings.tsx` | Replace dead store URLs with private beta early-access modal/badge + configurable admin settings. |
| **Task 3** | **Blog Relative `og:url`** (Social preview URL relative path) | `frontend/src/routes/blog.$slug.tsx` | Enforce fully qualified canonical `og:url` (`https://innrly.com/blog/${slug}`) and full Schema.org URLs. |
| **Task 4** | **Product Duplication & Sitemap Issues** ("Labor & Workforce" vs "Innrly Shift", 22 duplicate blogs in sitemap, missing `lastmod`) | `frontend/src/routes/index.tsx`<br>`frontend/src/routes/features.tsx`<br>`frontend/src/routes/sitemap[.]xml.ts` | Merge homepage "Labor & Workforce" card into "Innrly Shift"; deduplicate sitemap entries and populate `lastmod`. |
| **Task 5** | **CTA Button & Search Snippet Inconsistency** (6 different CTA labels; ~10 titles & ~10 descriptions truncated) | `frontend/src/components/site/Header.tsx`<br>`frontend/src/components/site/Section.tsx`<br>`frontend/src/components/site/DeepSolutionLayout.tsx`<br>`frontend/src/lib/seo.ts` | Standardize primary ("Start 90-day free trial") and secondary ("Book a demo") CTAs; trim SEO titles ≤ 60 chars and descriptions ≤ 155 chars. |
| **Task 6** | **Facebook URL, Thin Content Pages & Performance** (`/Innrlyy` double-y; thin security/onboarding/sage-intacct; 3 fonts + global reCAPTCHA) | `frontend/src/components/site/Footer.tsx`<br>`frontend/src/routes/control-hub.settings.tsx`<br>`frontend/src/routes/integrations.sage-intacct.tsx`<br>`frontend/src/routes/security.tsx`<br>`frontend/src/routes/__root.tsx`<br>`frontend/src/lib/lead-submit.ts` | Fix Facebook handle; enrich thin pages with architecture/FAQ; subset font families and lazy-load reCAPTCHA on interaction only. |
| **Task 7** | **Social Media Alignment & Audit Shareable Page** | `docs/site-audit-report.md`<br>`frontend/run-server.mjs` | Build/verify production bundle, run SSR test suite, and generate team audit report. |

---

## 🛠️ Detailed Implementation Tasks

### Task 1: Resolve HTTP & WWW 301 Redirect to Canonical HTTPS

**Goal:** Ensure any request hitting `http://innrly.com`, `http://www.innrly.com`, or `https://www.innrly.com` immediately returns an HTTP 301 Permanent Redirect to `https://innrly.com/`, eliminating connection timeouts.

**Files:**
- Modify: `frontend/run-server.mjs:70-98`
- Modify: `web.config:63-91`
- Test: `scratch/test_redirects.py`

#### Step 1: Add application-level 301 canonical redirect in `run-server.mjs`
In `frontend/run-server.mjs`, intercept requests before SSR routing. If the incoming host is `www.innrly.com` or protocol is `http`, redirect to canonical `https://innrly.com${req.url}`:

```javascript
    // Canonical Domain & Protocol Enforcement (Audit Item 1)
    const isWww = effectiveHost === 'www.innrly.com';
    const isHttp = protocol === 'http' && (effectiveHost === 'innrly.com' || isWww);

    if (isWww || isHttp) {
      const canonicalTarget = `https://innrly.com${req.url}`;
      console.log(`[SSR] 301 Redirecting non-canonical request to: ${canonicalTarget}`);
      res.writeHead(301, {
        Location: canonicalTarget,
        'Cache-Control': 'public, max-age=31536000'
      });
      res.end();
      return;
    }
```

#### Step 2: Validate and reinforce IIS `web.config` rewrite rule
In `web.config`, ensure the `Canonical HTTPS Non-WWW` rule fires with `stopProcessing="true"` and handles both `{HTTPS}` OFF and `{HTTP_HOST}` matching `^www\.`:

```xml
                <rule name="Canonical HTTPS Non-WWW" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions logicalGrouping="MatchAny">
                        <add input="{HTTPS}" pattern="^OFF$" ignoreCase="true" />
                        <add input="{HTTP_HOST}" pattern="^www\.innrly\.com$" ignoreCase="true" />
                    </conditions>
                    <action type="Redirect" url="https://innrly.com/{R:1}" redirectType="Permanent" appendQueryString="true" />
                </rule>
```

#### Step 3: Server Environment Verification Checklist (DevOps/Server Admin)
Document the required infrastructure bindings on the production Windows Server (`13.65.148.90`):
1. **IIS Site Bindings**: In IIS Manager -> Innrly Site -> Bindings, ensure Port 80 is bound for:
   - Host name: `innrly.com`, IP: `All Unassigned`, Port: `80`
   - Host name: `www.innrly.com`, IP: `All Unassigned`, Port: `80`
2. **Azure Network Security Group (NSG)**: Inbound Security Rule allowing TCP Port 80 (`HTTP`) from Any source to Any destination.
3. **Cloudflare / Edge DNS**: If Cloudflare proxy (orange cloud) is enabled, turn ON **"Always Use HTTPS"** under SSL/TLS -> Edge Certificates.

#### Step 4: Verification test
Run automated HTTP redirect check against local SSR server:
```bash
python -c "import urllib.request; req = urllib.request.Request('http://localhost:3000/blog', headers={'Host': 'www.innrly.com'}); res = urllib.request.urlopen(req)"
```
Expected: HTTP 301 with `Location: https://innrly.com/blog`.

---

### Task 2: Replace Broken App Store & Google Play Links in Footer

**Goal:** Eliminate dead 404 links to `apps.apple.com/app/innrly` and `play.google.com/store/apps/details?id=com.innrly` from every page footer. Replace them with a "Private Beta / Early Access" trigger or link to actual stores once approved.

**Files:**
- Modify: `frontend/src/components/site/Footer.tsx:212-251`
- Modify: `frontend/src/routes/control-hub.settings.tsx:40-80`
- Test: Visual inspection and test script.

#### Step 1: Update `Footer.tsx`
Update the mobile apps row to show a "Private Beta" badge and open an early-access request dialog (or link to `/contact?interest=mobile_app`), or check if store URLs are configured in CMS settings:

```tsx
        {/* Mobile apps row */}
        <div className="mt-12 border-t border-border/60 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Innrly Mobile Apps
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                iOS & Android apps currently in private beta for active customers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                search={{ interest: "mobile-beta" }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition hover:border-accent/60"
              >
                <Apple className="h-4 w-4" />
                <span>iOS Beta Access</span>
                <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent font-semibold">Beta</span>
              </Link>
              <Link
                to="/contact"
                search={{ interest: "mobile-beta" }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition hover:border-accent/60"
              >
                <Play className="h-4 w-4" />
                <span>Android Beta Access</span>
                <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent font-semibold">Beta</span>
              </Link>
            </div>
          </div>
        </div>
```

#### Step 2: Verification
Confirm no outbound 404 links exist in footer HTML:
```bash
python -c "import urllib.request; html = urllib.request.urlopen('http://localhost:3000').read().decode(); assert 'apps.apple.com/app/innrly' not in html; assert 'play.google.com/store/apps/details?id=com.innrly' not in html; print('App Store 404 links successfully removed!')"
```

---

### Task 3: Fix Blog Posts Open Graph URL (`og:url`) Relative Paths

**Goal:** Correct `og:url` on all blog post routes from relative `/blog/${slug}` to absolute `https://innrly.com/blog/${slug}`, ensuring proper social preview rendering on LinkedIn, Facebook, Slack, and X.

**Files:**
- Modify: `frontend/src/routes/blog.$slug.tsx:697-720`
- Test: `scratch/test_og_url.py`

#### Step 1: Update `blog.$slug.tsx`
Change line 698 of `frontend/src/routes/blog.$slug.tsx`:
```tsx
// Before:
{ property: "og:url", content: `/blog/${loaderData.slug}` },

// After:
{ property: "og:url", content: `https://innrly.com/blog/${loaderData.slug}` },
```
Also update Schema.org author and logo URLs to use absolute paths:
```tsx
author: { "@type": "Organization", name: loaderData.post.author || "The Innrly Team", url: "https://innrly.com/about" },
publisher: {
  "@type": "Organization",
  name: "Innrly",
  logo: { "@type": "ImageObject", url: "https://innrly.com/favicon.svg" },
},
```

#### Step 2: Verification
Fetch `/blog/ditching-excel-budgeting-software` and inspect `og:url`:
```bash
python -c "import urllib.request, re; html = urllib.request.urlopen('http://localhost:3000/blog/ditching-excel-budgeting-software').read().decode(); og = re.search(r'<meta[^>]*property=[\"\']og:url[\"\'][^>]*content=[\"\']([^\"\']+)[\"\']', html); assert og and og.group(1).startswith('https://innrly.com/blog/'), f'Failed: {og}'; print('og:url is valid absolute URL:', og.group(1))"
```

---

### Task 4: Remove Homepage Product Card Duplication & Deduplicate Sitemap

**Goal:** 
1. Remove redundant "Labor & Workforce" card from homepage `index.tsx` (which is an alias/redirect to `/solutions/innrly-shift`).
2. Clean up `sitemap[.]xml.ts` so dynamic blogs aren't added twice, and add `lastmod` dates to all entries.

**Files:**
- Modify: `frontend/src/routes/index.tsx:160-168`
- Modify: `frontend/src/routes/sitemap[.]xml.ts:31-53, 110-155`
- Test: `scratch/test_sitemap.py`

#### Step 1: Update `frontend/src/routes/index.tsx`
Remove the duplicate 6th card in `coreSolutions`:
```tsx
// Remove lines 160-167:
//   {
//     variant: "labor",
//     displayVariant: "shift",
//     name: "Labor & Workforce",
//     to: "/solutions/labor-workforce",
//     body: "5-minute labor snapshots that surface hidden overtime before it hits payroll.",
//     tag: "New",
//   },
```
Keep the 5 distinct core solution cards:
1. Business Intelligence (`/solutions/business-intelligence`)
2. Financial Control (`/solutions/financial-control`)
3. Innrly Shift (`/solutions/innrly-shift`)
4. Operations Automation (`/solutions/operations-automation`)
5. Innrly Pay (`/solutions/innrly-pay`)

Highlight the labor and housekeeping metrics clearly in the "Innrly Shift" card body so no capability messaging is lost:
```tsx
  {
    variant: "shift",
    displayVariant: "shift",
    name: "Innrly Shift",
    to: "/solutions/innrly-shift",
    body: "Scheduling, Face-ID TimeClock, housekeeping productivity (MPOR), and real-time labor snapshots to eliminate overtime.",
  },
```

#### Step 2: Update `frontend/src/routes/sitemap[.]xml.ts`
1. Remove hardcoded `/blog/*` entries from `defaultEntries` (lines 31–52) since all blog posts are pulled dynamically from the database with their real `updated_at` timestamps.
2. In the sitemap generator loop, use a `Map<string, SitemapEntry>` keyed by `path` to guarantee zero duplicate URLs.
3. Provide default `lastmod` for marketing pages (e.g. `2026-06-01` or dynamic build timestamp).

```typescript
        // Use Map to deduplicate paths
        const entryMap = new Map<string, SitemapEntry>();

        // 1. Process static pages with DB overrides
        defaultEntries.forEach((entry) => {
          const dbRow = seoMap[entry.path];
          if (dbRow && (dbRow.in_sitemap === 0 || dbRow.in_sitemap === false)) {
            return;
          }
          entryMap.set(entry.path, {
            path: entry.path,
            changefreq: (dbRow && dbRow.changefreq) || entry.changefreq || "monthly",
            priority: (dbRow && dbRow.priority) || entry.priority || "0.8",
            lastmod: entry.lastmod || legalDate
          });
        });

        // 2. Process dynamic blogs from database
        blogs.forEach((b: any) => {
          if (b.in_sitemap === 0 || b.in_sitemap === false) return;
          const blogPath = `/blog/${b.slug}`;
          const lastmod = b.updated_at
            ? String(b.updated_at).slice(0, 10)
            : (b.created_at ? String(b.created_at).slice(0, 10) : legalDate);
          
          entryMap.set(blogPath, {
            path: blogPath,
            changefreq: "monthly",
            priority: "0.8",
            lastmod
          });
        });

        finalEntries = Array.from(entryMap.values());
```

#### Step 3: Verification
Fetch `/sitemap.xml`, parse `<loc>` tags, assert count and check for zero duplicates:
```bash
python -c "import urllib.request, re; xml = urllib.request.urlopen('http://localhost:3000/sitemap.xml').read().decode(); locs = re.findall(r'<loc>(.*?)</loc>', xml); lastmods = re.findall(r'<lastmod>(.*?)</lastmod>', xml); assert len(locs) == len(set(locs)), 'Duplicate URLs found in sitemap!'; print(f'Total sitemap URLs: {len(locs)}, unique: {len(set(locs))}, lastmod tags: {len(lastmods)}') "
```

---

### Task 5: Standardize CTA Button Labels & Trim Truncated SEO Snippets

**Goal:**
1. Standardize primary button to `"Start 90-day free trial"` (or `"Start free trial"`) and secondary button to `"Book a demo"` across the site.
2. Shorten all page titles > 60 characters and meta descriptions > 155 characters in `frontend/src/lib/seo.ts` to prevent Google search result clipping.

**Files:**
- Modify: `frontend/src/components/site/Header.tsx:145-149`
- Modify: `frontend/src/lib/seo.ts` (compare, case-study, industry, and blog entries)
- Test: `scratch/test_seo_lengths.py`

#### Step 1: Standardize CTAs in `Header.tsx`
```tsx
// Before:
<Button size="sm" onClick={openTrialModal} className="bg-cta hover:opacity-90">
  Start free trial
</Button>
<Button asChild variant="outline" size="sm">
  <Link to="/contact">See it live</Link>
</Button>

// After:
<Button size="sm" onClick={openTrialModal} className="bg-cta hover:opacity-90">
  Start 90-day free trial
</Button>
<Button asChild variant="outline" size="sm">
  <Link to="/contact">Book a demo</Link>
</Button>
```

#### Step 2: Trim SEO Titles and Descriptions in `frontend/src/lib/seo.ts`
Apply the following character-conscious SEO optimizations:

| Page Path | Current Title (Chars) | Optimized Title (≤ 60 Chars) | Current Desc (Chars) | Optimized Desc (≤ 155 Chars) |
| :--- | :--- | :--- | :--- | :--- |
| `/compare/innrly-vs-otelier` | `Innrly: alternative to Otelier: How They Compare (2026) \| Innrly` (65) | `Innrly vs Otelier: 2026 Comparison \| Innrly` (43) | 174 | `Compare Innrly and Otelier for multi-property hotels: pricing, deployment, Face-ID TimeClock, and housekeeping productivity.` (124) |
| `/compare/innrly-vs-nimble` | `Innrly: alternative to Nimble Property: How They Compare (2026) \| Innrly` (73) | `Innrly vs Nimble Property: 2026 Comparison \| Innrly` (51) | 169 | `Compare Innrly and Nimble Property: pricing, TimeClock, housekeeping productivity matrix, and automated hotel A/P workflows.` (125) |
| `/compare/innrly-vs-aptech` | `Innrly: alternative to Aptech (Profitvue, Execuvue, Targetvue): 2026 Comparison \| Innrly` (89) | `Innrly vs Aptech Suite: 2026 Comparison \| Innrly` (48) | 184 | `Innrly vs Aptech Profitvue, Execuvue & Targetvue: single modern platform vs legacy multi-module suites for hotel operators.` (123) |
| `/compare/innrly-vs-actabl` | `Innrly: alternative to Actabl / Hotel Effectiveness: How They Compare (2026) \| Innrly` (86) | `Innrly vs Actabl: 2026 Labor Comparison \| Innrly` (48) | 184 | `Compare Innrly Shift with Actabl's labor suite: pricing, Face-ID TimeClock, MPOR housekeeping tracking, and PMS automation.` (123) |
| `/compare/innrly-vs-profitsage` | `Innrly: alternative to ProfitSage: 2026 Comparison \| Innrly` (60) | `Innrly vs ProfitSage: 2026 Comparison \| Innrly` (47) | 148 | `Compare Innrly and ProfitSage for multi-property hotel operators — BI dashboards, budgeting, forecasting, and back-office sync.` (127) |
| `/case-studies/urban-full-service` | `Case Study: Urban Full-Service Recovers OTA Commission Every Quarter \| Innrly` (77) | `Case Study: Full-Service OTA Recovery \| Innrly` (46) | 175 | `How a 4-property full-service operator uses Innrly to reconcile OTA commissions and banquet revenue, recovering $7K-$15K/quarter.` (130) |
| `/case-studies/hilton-management-company` | `Case Study: Hilton Management Company Cuts Month-End from 14 to ~6 Days \| Innrly` (81) | `Case Study: Hilton Operator Cuts Close to 6 Days \| Innrly` (56) | 181 | `How a 28-property Hilton management company consolidates OnQ and OPERA data, automates AP, and cuts month-end close in half.` (127) |
| `/case-studies/extended-stay-portfolio` | `Case Study: 18-Hotel Extended-Stay Portfolio Tightens MPOR & Close \| Innrly` (72) | `Case Study: Extended-Stay Portfolio MPOR \| Innrly` (49) | 179 | `How an 18-hotel extended-stay portfolio manages long folios, tracks weekly-clean MPOR, and accelerates monthly financial close.` (128) |
| `/industries/full-service` | `Full-Service Hotels — Innrly` (28) | `Full-Service Hotel Accounting & Automation \| Innrly` (51) | 178 | `Automate full-service hotel back office: F&B GL coding, banquet reconciliation, multi-outlet labor, and USALI owner reporting.` (127) |
| `/industries/extended-stay` | `Extended-Stay Hotels — Innrly` (29) | `Extended-Stay Hotel Management Software \| Innrly` (49) | 202 | `Innrly for extended-stay hotels: long folios, weekly clean cycles, low-labor models, and corporate account reconciliation.` (123) |

#### Step 3: Verification
Run Python test script across all `defaultSeoData` keys in `frontend/src/lib/seo.ts`:
```bash
python -c "import re; f = open('frontend/src/lib/seo.ts').read(); titles = re.findall(r'\"title\":\s*\"([^\"]+)\"', f); descs = re.findall(r'\"description\":\s*\"([^\"]+)\"', f); long_t = [t for t in titles if len(t) > 60]; long_d = [d for d in descs if len(d) > 160]; print(f'Oversized titles: {len(long_t)}, Oversized descs: {len(long_d)}'); assert len(long_t) == 0 and len(long_d) == 0"
```

---

### Task 6: Fix Facebook URL, Enrich Thin Pages & Optimize Font/reCAPTCHA Performance

**Goal:**
1. Fix Facebook handle in footer and settings to canonical `/Innrly/`.
2. Enrich thin content routes (`/security`, `/onboarding`, `/integrations/sage-intacct`) with complete architectural diagrams, tables, and FAQs.
3. Optimize font loading (prune redundant weights/families) and switch Google reCAPTCHA v3 from global page injection to on-demand execution.

**Files:**
- Modify: `frontend/src/components/site/Footer.tsx:69, 83`
- Modify: `frontend/src/routes/control-hub.settings.tsx:45`
- Modify: `frontend/src/routes/__root.tsx:143-148, 208-218`
- Modify: `frontend/src/lib/lead-submit.ts:35-50`
- Modify: `frontend/src/routes/integrations.sage-intacct.tsx`
- Modify: `frontend/src/routes/security.tsx`

#### Step 1: Correct Facebook URL
Change all occurrences of `https://www.facebook.com/Innrlyy/` to `https://www.facebook.com/Innrly/` in:
- `frontend/src/components/site/Footer.tsx` (lines 69, 83)
- `frontend/src/routes/control-hub.settings.tsx` (lines 45, 400)

#### Step 2: Lazy-Load Google reCAPTCHA v3
Remove the synchronous global script injection in `frontend/src/routes/__root.tsx`:
```tsx
// Remove from __root.tsx scripts array:
// {
//   src: "https://www.google.com/recaptcha/api.js?render=6LcVJrkkAAAAABsSLGi1FDOjAtIyby9UNsBQPUCd&ver=3.0",
//   async: true,
//   defer: true,
// },
```
In `frontend/src/lib/lead-submit.ts`, dynamically load reCAPTCHA only when a user interacts with a form or submits:
```typescript
let recaptchaPromise: Promise<void> | null = null;

function loadRecaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (recaptchaPromise) return recaptchaPromise;

  recaptchaPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&ver=3.0`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // fail open
    document.head.appendChild(script);
  });
  return recaptchaPromise;
}

export async function getRecaptchaToken(action: string = "lead_submit"): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    await loadRecaptcha();
    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha || typeof grecaptcha.execute !== "function") return null;
    return await new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          .then((t: string) => resolve(t))
          .catch(() => resolve(null));
      });
    });
  } catch {
    return null;
  }
}
```
*Impact:* Saves ~150KB of JavaScript execution and eliminates third-party telemetry blocking page load on non-form pages (PageSpeed boost).

#### Step 3: Streamline Font Loading in `__root.tsx`
In `frontend/src/routes/__root.tsx`, consolidate Google Font request to only required families and weights:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
```

#### Step 4: Enrich Thin Content Pages
1. **`integrations.sage-intacct.tsx`**: Add dedicated sections for:
   - "How Innrly Integrates with Sage Intacct" (Visual GL mapping flow)
   - Supported Entities & Multi-Location Chart of Accounts
   - Daily Revenue Journal Posting & Credit Card Batch Sync
   - Detailed Sage Intacct FAQ accordion
2. **`security.tsx`**: Add:
   - Data Protection & Isolation Architecture matrix
   - Sub-processor disclosure table
   - Incident response and disaster recovery SLA targets
   - Downloadable Security & Compliance whitepaper link

---

### Task 7: Production Rebuild, Full Regression Verification & Team Report

**Goal:** Recompile production assets (`npm run build`), verify server rendering across all modified routes, commit changes to git, and compile a shareable audit remediation report.

**Files:**
- Create: `docs/audit-remediation-report.md`
- Verify: `frontend/dist/`
- Test: Full site HTTP verification

#### Step 1: Build Frontend
Run non-interactive production build:
```bash
cd frontend && npm run build
```
Verify build succeeds with zero TypeScript errors.

#### Step 2: Restart Frontend SSR Daemon
Restart node daemon (`node run-server.mjs`) on port 3000.

#### Step 3: Execute Regression Test Suite
Verify HTTP status codes, headers, and content across all 7 affected areas:
1. Canonical redirect: `GET /` with `Host: www.innrly.com` &rarr; 301.
2. Footer app store links: No dead URLs.
3. Blog `og:url`: Absolute `https://innrly.com/blog/...`.
4. Homepage cards: Exactly 5 cards, no duplicate "Labor & Workforce".
5. Sitemap: 0 duplicate URLs, all have valid `lastmod`.
6. SEO lengths: All titles ≤ 60 chars, descriptions ≤ 160 chars.
7. Performance: reCAPTCHA loads only on form interaction; fonts streamlined.

#### Step 4: Commit & Upload to Git
```bash
git add frontend/src/ web.config docs/ frontend/dist/
git commit -m "fix(audit): remediate all 7 site audit findings across seo, redirects, links, and performance"
git push origin main
```

---

## ⚡ Execution Handoff

Plan complete and saved to `docs/plans/2026-10-26-site-audit-remediation-implementation-plan.md`.

Two execution options:

1. **Subagent-Driven (this session)** - I dispatch fresh subagents per task, review code changes between tasks, and maintain fast, verifiable iteration.
2. **Parallel Session (separate)** - Open a new session with `executing-plans`, batch execution with checkpoints.

Which approach would you prefer?

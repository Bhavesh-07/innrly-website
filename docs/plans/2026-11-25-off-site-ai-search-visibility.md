# Off-Site Fixes & AI Search Visibility Implementation Plan

> **For Claude / Agent:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Correct all off-site entity citations, app store developer profiles, directory listings, and company locations across external platforms to eliminate outdated addresses (Lakeview Dr, Texas) and stale phone numbers, establishing consistent $199/property pricing and powering authoritative AI search visibility (ChatGPT Search, Perplexity, Google AI Overviews).

**Architecture:** External platform entity alignment covering App Store Connect, Google Play Console, LinkedIn Organization, B2B software directories (Hotel Tech Report, G2, Capterra), and customer review workflows using standardized company metadata (LaPlace, LA HQ, zero phone numbers, unified pricing).

**Tech Stack:** App Store Connect, Google Play Console, LinkedIn Admin, B2B Review Platforms (HTR, G2, Capterra), LLM / GEO Search Evaluation tools.

---

### Non-Negotiable Citation & Brand Rules
1. **Official Physical Address:** `4276 Hwy 51, LaPlace, LA 70068`.
2. **Forbidden Legacy Address:** `173 W Lakeview Dr, La Place, LA 70068` (and references to Mystic Solutions LLC as public entity).
3. **Phone Number Policy:** Strict ZERO phone numbers across all public profiles and directories.
4. **Official Contact Email:** `contact@innrly.com`.
5. **Pricing Matrix:**
   - **Starter:** `$199` per property per month + `$299` one-time setup fee.
   - **Professional:** `$299/month` + `$299` setup fee (never write per property until confirmed by Vimal).
   - **Annual Billing:** 25% discount, setup fee waived.
   - **Innrly Shift Add-on:** `$149` per property per month.
   - **Legacy $149 Rate:** Strictly eliminate and update across the 3 directories still showing $149.
6. **Competitor Status:** Hotel Effectiveness is a **competitor**, never list as an integration.

---

## Phase 1: Mobile App Store Developer Metadata (Task 1)

### Task 1: Update Google Play & Apple App Store Listings

**Objective:** Prevent AI search engines from scraping the old `173 W Lakeview Dr` address and `+1 504-251-8314` phone number from mobile store developer listings.

**Target Systems:**
- Apple App Store Connect (`appstoreconnect.apple.com`)
- Google Play Console (`play.google.com/console`)

**Step 1: Audit Live App Store Listings**
- Inspect current Google Play Store developer address & support fields.
- Inspect Apple App Store developer information, privacy URL, and support URL.
- Record existing displayed metadata:
  ```text
  Existing Address: 173 W Lakeview Dr, La Place, LA 70068
  Existing Phone: +1 504-251-8314
  Existing Privacy URL: Check whether pointing to 404 /privacy
  ```

**Step 2: Update Apple App Store Connect**
- Navigate to: **App Store Connect > Apps > Innrly > General > App Information**
- Update **Privacy Policy URL** to: `https://innrly.com/legal/privacy` (or `https://innrly.com/privacy`).
- Navigate to **App Review Information / Developer Contact Information**:
  - Address Line 1: `4276 Hwy 51`
  - City: `LaPlace`
  - State: `LA`
  - Postal Code: `70068`
  - Country: `United States`
  - Email: `contact@innrly.com`
  - Phone: Remove where non-mandatory, or restrict to non-public internal review contact.
- Submit metadata changes for App Store review.

**Step 3: Update Google Play Console**
- Navigate to: **Google Play Console > Developer Account > About you / Developer profile**
- Update **Physical Contact Address**:
  - Street: `4276 Hwy 51`
  - City: `LaPlace`
  - State: `LA`
  - ZIP Code: `70068`
  - Country: `United States`
- Navigate to: **Store presence > Store settings > App contact details**
  - Email: `contact@innrly.com`
  - Phone: Leave empty / uncheck public display if required verification allows.
  - Website: `https://innrly.com`
- Navigate to: **Policy and programs > App content > Privacy policy**
  - URL: `https://innrly.com/legal/privacy`
- Save and submit changes for Google Play review.

**Step 4: Verify Store Listings Propagation**
- Test Apple Store listing over web:
  ```bash
  curl -sL https://apps.apple.com/app/innrly | grep -c 'Lakeview'
  # Expected: 0
  ```
- Test Google Play listing over web:
  ```bash
  curl -sL https://play.google.com/store/apps/details?id=com.innrly.app | grep -c 'Lakeview'
  # Expected: 0
  ```

---

## Phase 2: Corporate Social & Professional Identity (Task 2)

### Task 2: Standardize LinkedIn Company Page Entity

**Objective:** Align LinkedIn's corporate knowledge graph with the official LaPlace headquarters and remove all outdated Texas references and phone numbers.

**Target System:**
- LinkedIn Organization Page (`linkedin.com/company/innrly`)

**Step 1: Audit Current LinkedIn Page Details**
- Check current HQ location, website link, phone number, and tagline.

**Step 2: Update Headquarters Location & Contact**
- Navigate to: **LinkedIn Page Admin > Edit Page > Locations**
- Edit Primary Location:
  - Country: `United States`
  - Street address: `4276 Hwy 51`
  - City: `LaPlace`
  - State: `Louisiana`
  - Postal code: `70068`
  - Location name: `Headquarters`
- Remove any existing secondary location in **Texas**.
- Navigate to: **Overview / Contact Details**:
  - Phone: Clear the phone number field (ensure blank).
  - Website: `https://innrly.com`
  - Company Size & Industry: Verify Hospitality / Software Development.
- Click **Save**.

**Step 3: Verify Public Graph Output**
- Check public profile without login:
  - Verify HQ displays: **LaPlace, Louisiana**
  - Verify Zero phone number visible.

---

## Phase 3: B2B Review Platforms & Software Directories (Task 3)

### Task 3: Claim, Update & Normalize B2B Directory Profiles

**Objective:** Direct AI search crawlers (Perplexity, ChatGPT Search, Gemini) to authoritative, updated directory profiles that cite accurate $199 pricing and exclude competitor-as-integration errors.

**Target Systems:**
1. **Hotel Tech Report** (`hoteltechreport.com`)
2. **G2** (`g2.com`)
3. **Capterra / Gartner Digital Markets** (`capterra.com`, `getapp.com`, `softwareadvice.com`)
4. The **3 Unnamed Legacy Directories** showing $149 pricing.

**Step 1: Identify Directories Displaying $149 Pricing**
- Run web search audit to locate the 3 legacy profiles:
  ```text
  Query: "Innrly" "$149" -site:innrly.com
  Query: "Innrly" "149" "hotel" directory
  ```
- Catalog the exact profile URLs requiring correction.

**Step 2: Create / Claim Profile on Hotel Tech Report (HTR)**
- Hotel Tech Report is the #1 cited source by AI engines for hospitality tech.
- Create/Claim Vendor Account:
  - Product Name: **Innrly**
  - Category: **Hotel Accounting Software / Back Office Automation**
  - Pricing Model:
    - Starter: `$199 / property / month`
    - Setup Fee: `$299` one-time setup fee
    - Add-ons: Innrly Shift at `$149 / property / month`
    - Free Trial: `90-day free trial`
  - Integrations: Plaid, Repay, Medallia, Revinate, Kipsu, Cloudbeds, Mews, Opera, QuickBooks, Sage Intacct, M3.
  - **Important:** Ensure **Hotel Effectiveness is NOT** listed under integrations (listed under Competitors/Alternatives).
  - HQ Address: `4276 Hwy 51, LaPlace, LA 70068`.

**Step 3: Create / Claim Profile on G2 & Gartner Capterra**
- Claim G2 listing under *Hotel Management Software / Hospitality Accounting*.
- Claim Capterra / Gartner listing via *Gartner Digital Markets Vendor Portal*.
- Standardize description, official address, zero phone, and $199 pricing.

**Step 4: Verify Directory Content & Consistency**
- Verify each directory page displays:
  - Starting Price: `$199/month` or `$199/property/month`
  - Setup Fee: `$299`
  - Address: `4276 Hwy 51, LaPlace, LA 70068`
  - Zero phone numbers.

---

## Phase 4: Customer Review Acquisition Campaign (Task 4)

### Task 4: Execute Customer Review Outreach (Ticket 15)

**Objective:** Build genuine verified review volume on Hotel Tech Report and G2 to boost organic rank and AI recommendation confidence.

**Assets:**
- Template: `08-Review-Request-Template.docx`
- Direct review submission links (HTR, G2)

**Step 1: Prepare Outreach Template with Direct Review Links**
- Open `08-Review-Request-Template.docx`.
- Customize placeholders with direct one-click review URLs:
  - Hotel Tech Report review link
  - G2 review link
- Emphasize review incentives where allowed by platform rules (e.g., $25 gift card or charity donation).

**Step 2: Segment Active Hotel General Managers & Controllers**
- Target 10–20 active, satisfied hotel managers using Innrly.
- Personalize email opening referencing their specific property / portfolio.

**Step 3: Schedule Outreach & Track Submissions**
- Send batch 1 (initial 5 clients).
- Track reviews as they appear on Hotel Tech Report and G2.
- Maintain a minimum 4.5+ star rating benchmark.

---

## Phase 5: AI Engine Citation & Knowledge Graph Verification (Task 5)

### Task 5: Verify AI Search Answers Across Major LLM Engines

**Objective:** Audit AI search answers across ChatGPT Search, Perplexity, Google AI Overviews, and Claude to confirm the eradication of stale address and phone citations.

**Evaluation Prompts:**
1. `"What is Innrly?"`
2. `"Where is Innrly located and what is their address?"`
3. `"How much does Innrly cost per property?"`
4. `"What are the key integrations and competitors of Innrly?"`

**Success Criteria:**
- **Address Citation:** Explicitly states `4276 Hwy 51, LaPlace, LA 70068`. Zero mention of `173 W Lakeview Dr` or `Texas`.
- **Phone Citation:** No phone numbers returned.
- **Pricing Citation:** States `$199 per property per month` (with $299 setup fee). Zero mention of `$149`.
- **Competitor Citation:** Names Hotel Effectiveness, Actabl, and Otelier as competitors/alternatives, not integrations.

---

## Execution Checklist & Ownership

| Task | Description | Primary Owner | Target Completion | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Task 1** | Update Apple App Store & Google Play listings | Vimal / Mobile Admin | Week 1 | Pending Login |
| **Task 2** | Standardize LinkedIn company page location to LaPlace, LA | Page Admin | Week 1 | Pending Admin |
| **Task 3A** | Search and identify the 3 directories showing $149 | Marketing / Dev | Week 1 | Ready to Search |
| **Task 3B** | Claim / update Hotel Tech Report, G2 & Capterra profiles | Marketing | Week 2 | In Progress |
| **Task 4** | Launch customer review campaign via `08-Review-Request-Template.docx` | Account Management | Week 2–3 | Planned |
| **Task 5** | Run automated AI search audit prompts and log results | Developer | Week 3 | Standby |

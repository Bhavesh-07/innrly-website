import sys
sys.path.append('backend')
from app import get_db_connection

# Full HTML for best-hotel-accounting-software
best_html = """
<p>There is no single "best hotel accounting software" — there are best fits for different portfolio sizes, brand mixes, and operating models. This guide walks the real options multi-property operators evaluate in 2026, where each one wins, where each one struggles, and where a PMS-agnostic automation layer fits on top of whichever GL you pick.</p>

<h2><strong>Two layers, not one</strong></h2>
<p>Before comparing products, separate two things that the category routinely conflates. The accounting system is the system of record for your books — the general ledger, AP/AR sub-ledgers, payroll, bank reconciliation, and the financial statements your owners and lenders read. The automation layer is everything that prepares the data before it hits the GL — pulling night-audit packs from every PMS, normalizing across brands, reconciling OTA statements, capturing and coding invoices, and pushing clean journals into the accounting system. The accounting system is permanent. The automation layer is what makes the accounting system useful at multi-property scale.</p>

<h2><strong>The accounting systems operators actually use</strong></h2>
<ul>
<li><strong>M3</strong> — The dominant choice for hospitality. Hotel-specific chart of accounts, USALI-aligned reports out of the box, deep brand integrations. Best fit for 10–100+ property portfolios that want a single system covering GL, AP, and reporting. Pricing scales by property.</li>
<li><strong>Sage Intacct</strong> — A general-purpose cloud GL with strong multi-entity dimensions. Popular with ownership groups that operate hotels alongside other asset classes. Requires a hospitality overlay (chart of accounts, USALI mapping) to feel native — most operators add one.</li>
<li><strong>Inn-Flow</strong> — A full hospitality accounting suite (GL, AP, AR, payroll, bank rec, financials) plus its own labor and sales modules. Best fit for branded operators who want a single hospitality-native suite.</li>
<li><strong>Aptech</strong> — Long-standing hospitality accounting and BI platform (Profitvue, Webvue, Targetvue). Strong in owned-asset and ownership-group reporting. Often paired with a separate AP automation layer.</li>
<li><strong>QuickBooks Online</strong> — Fine for 1–3 hotels. Becomes painful around property 4–5, when the class/location dimension stops scaling, PMS reconciliation goes manual, and USALI reporting requires custom templates. Many operators keep QuickBooks and add an automation layer rather than migrating.</li>
<li><strong>ProfitSage / Otelier</strong> — Reporting and BI layers that sit on top of an accounting system, not a replacement for one. Worth knowing if BI is the gap you're solving for, not GL.</li>
</ul>

<h2><strong>How to pick the GL</strong></h2>
<p><strong>Portfolio size and growth plan.</strong> Under 5 properties: QuickBooks usually still works. 5–15 properties: M3 or Sage Intacct become worth the migration. 15+ properties: M3, Sage Intacct, or Inn-Flow's suite — pick based on whether you want a hospitality-native GL (M3, Inn-Flow) or a general-purpose GL with hospitality overlays (Sage Intacct).</p>
<p><strong>Brand mix.</strong> Single-brand operators get more out of a hospitality-native GL with deep brand integrations. Multi-brand operators care more about the PMS-agnostic automation layer above the GL, because the GL is going to look the same regardless of brand once the data is normalized.</p>
<p><strong>Internal vs outsourced accounting.</strong> If you run an in-house accounting team, the GL is theirs to live in — pick what they'll be productive in. If you outsource, ask your firm which GL they're fastest in.</p>
<p><strong>Onboarding tolerance.</strong> Full-suite platforms like M3, Inn-Flow, and Sage Intacct typically involve longer, structured implementations. QuickBooks is days. Plan the migration window honestly.</p>

<h2><strong>Where the automation layer fits</strong></h2>
<p>Whichever GL you pick, it does not know how to fetch a night-audit pack from OnQ, normalize it against an Opera property and a Cloudbeds property, line-match an Expedia statement, or capture and code 300 vendor invoices a month across 12 properties. That work has to happen before the journal entry reaches the GL — and it's the work that eats most of a corporate accounting team's week.</p>
<p>Innrly is the automation layer. It sits between every PMS in your portfolio and whichever accounting system you run — M3 (Associate Partner integration), QuickBooks (two-way sync), Sage Intacct, and Inn-Flow (integration on the roadmap). It pulls and normalizes night-audit packs across brands, runs OTA reconciliation, captures and GL-codes invoices, handles Bill Pay, tracks labor and MPOR across properties, and pushes clean journals into the GL. The GL stays the system of record. Innrly makes it operate at multi-property speed.</p>

<h2><strong>Comparison shortcuts</strong></h2>
<p>Honest head-to-heads we maintain: Innrly: alternative to Otelier, Innrly: alternative to Aptech, Innrly: alternative to Nimble, Innrly: alternative to ProfitSage, Innrly: alternative to QuickBooks, and Innrly: alternative to Actabl. M3 and Inn-Flow are partner GLs, not competitors — Innrly is an M3 Associate Partner, and the Inn-Flow integration is on the roadmap. See Innrly + M3 and Innrly + Inn-Flow integration for how the data flows in.</p>

<h2><strong>What to ask any vendor</strong></h2>
<ol>
<li>Are you the GL, or do you sit on top of one? If both, which mode are you selling me?</li>
<li>Which PMSes do you pull from directly, and which require a file drop?</li>
<li>Show me the chart-of-accounts mapping from one of my brands to the GL before I sign.</li>
<li>Itemize per-property pricing — every module, every fee, implementation included.</li>
<li>Week-by-week onboarding plan for property 1, property 5, and property 10.</li>
<li>Three customer references at my portfolio size and brand mix.</li>
</ol>

<h2><strong>Where Innrly fits in your stack</strong></h2>
<p>Innrly is not a hotel GL. It is the PMS-agnostic automation layer that makes whichever GL you pick — M3, Sage Intacct, QuickBooks, Inn-Flow, or Aptech — actually keep up with multi-property operations. Transparent pricing at $199 per property per month. 90-day free trial on your real data. 2–4 week onboarding because it's one product, not a suite.</p>

<h2><strong>FAQ</strong></h2>
<p><strong>What is the best hotel accounting software in 2026?</strong><br>It depends on portfolio size and brand mix. M3 is the most common choice for 10+ property hospitality-native operators. Sage Intacct is common for ownership groups with mixed asset classes. Inn-Flow is a full hospitality suite for branded operators. QuickBooks still works for 1–3 hotels. Whichever you pick, add a PMS-agnostic automation layer above it.</p>
<p><strong>Is Innrly hotel accounting software?</strong><br>No. Innrly is the automation layer that sits between your PMSes and your accounting system. It does not replace M3, Sage Intacct, QuickBooks, or Inn-Flow — it feeds them clean, GL-coded data so the GL stays the system of record.</p>
<p><strong>Can I use QuickBooks for a multi-property hotel portfolio?</strong><br>Up to 3 hotels, usually yes. Beyond that, the property dimension, PMS reconciliation, and USALI reporting gaps cost more in manual work than upgrading the GL would. See our QuickBooks for hotels guide.</p>
<p><strong>Does Innrly integrate with M3, Sage Intacct, Inn-Flow, and QuickBooks?</strong><br>M3 via Associate Partner integration. QuickBooks via two-way sync. Sage Intacct via supported integration. Inn-Flow integration is on the roadmap — talk to us if you're an Inn-Flow customer interested in early access.</p>
<p><strong>How much does hotel accounting software cost?</strong><br>Wide range. QuickBooks Online is $30–$200 per company per month. M3 and Inn-Flow are quote-based, with pricing that varies by portfolio size and modules. Sage Intacct varies by entity count. Innrly's automation layer is $199 per property per month on top of whichever GL you run.</p>
"""

# Full HTML for quickbooks-for-hotels-limits
qb_html = """
<p>QuickBooks works fine for one or two hotels. Plenty of independent operators run it for years without a real problem. The pain starts somewhere between the third and fifth property — and it's almost always the same three things.</p>

<h2><strong>1. The property dimension problem</strong></h2>
<p>QuickBooks Online treats properties as classes or locations, which is fine until you need a true portfolio P&L with property-level departmentalization. The reports get long, the consolidations get manual, and the moment ownership asks for a USALI-aligned summary, you're rebuilding in Excel.</p>

<h2><strong>2. PMS reconciliation is your problem, not QuickBooks'</strong></h2>
<p>QuickBooks doesn't know what room nights, OTA commissions, or settlement batches are. Every nightly revenue post requires a journal entry built from your PMS extract — done manually or via a third-party connector that always seems to break on a holiday weekend.</p>

<h2><strong>3. USALI reporting requires templates</strong></h2>
<p>There's no native USALI report in QuickBooks. You either build a custom report template (and rebuild it every time the chart of accounts changes) or export to Excel for every monthly ownership package.</p>

<h2><strong>What multi-property operators move to</strong></h2>
<p>Most operators don't fully replace QuickBooks — they keep it as the GL and add a PMS-agnostic accounting layer on top. The accounting layer handles nightly revenue posting, OTA reconciliation, bank matching, and A/P automation, then syncs clean journals to QuickBooks. QuickBooks becomes the system of record; the accounting layer becomes the workflow.</p>

<h2><strong>When to make the switch</strong></h2>
<p>Rule of thumb: if month-end close is taking more than 7 business days, or if your controller spends more than half their time on data movement instead of analysis, the QuickBooks-alone setup is costing you more than the software would.</p>

<h2><strong>How Innrly fits</strong></h2>
<p>Innrly is the PMS-agnostic accounting layer described above. It connects with QuickBooks (two-way sync), Sage Intacct, and M3 (Associate Partner push integration), so you don't have to migrate your GL to get the workflow upgrade. Talk to us about a walkthrough on your stack.</p>
"""

conn = get_db_connection()
cursor = conn.cursor()
cursor.execute("UPDATE blogs SET content = %s, updated_at = '2026-10-26 15:30:00' WHERE slug = 'best-hotel-accounting-software'", (best_html.strip(),))
cursor.execute("UPDATE blogs SET content = %s, updated_at = '2026-10-26 15:30:00' WHERE slug = 'quickbooks-for-hotels-limits'", (qb_html.strip(),))
conn.commit()
cursor.close()
conn.close()

print("Restored full rich content for best-hotel-accounting-software and quickbooks-for-hotels-limits in MySQL!")

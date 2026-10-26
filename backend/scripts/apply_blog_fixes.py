import sys, json, re
from datetime import datetime
sys.path.append('backend')
from app import get_db_connection

def clean_dashes(text):
    if not text:
        return text
    return text.replace('\u2013', '-').replace('\u2014', '-').replace('\xa0', ' ').replace('\x96', '-').replace('\x97', '-')

def find_in_html(content, find_text):
    if find_text in content:
        return find_text
    
    norm_c = clean_dashes(content)
    norm_f = clean_dashes(find_text)
    if norm_f in norm_c:
        esc = re.escape(norm_f).replace(r'\-', r'[-\u2013\u2014\x96]')
        m = re.search(esc, content)
        if m:
            return m.group(0)

    tokens = [re.escape(clean_dashes(w)) for w in find_text.split()]
    if tokens:
        pattern = r'\s*(?:<[^>]+>\s*)*'.join(tokens)
        pattern = pattern.replace(r'\-', r'[-\u2013\u2014\x96]')
        m = re.search(pattern, content)
        if m:
            return m.group(0)

    return None

def apply_fixes_to_blog(slug, p, blog_dict):
    content = blog_dict['content'] or ''
    title = blog_dict['title'] or ''
    meta_title = blog_dict['meta_title'] or ''
    meta_description = blog_dict['meta_description'] or ''
    summary = blog_dict['summary'] or ''
    
    # Page 1 Full Rewrite
    if slug == 'innrly-vs-inn-flow':
        new_body = (
            "<p>Inn-Flow is an established hotel accounting and back-office platform, and many multi-property operators already run their books on it. Innrly is not a replacement for Inn-Flow. Innrly is an automation layer that can sit alongside the accounting system a hotel group already uses.</p>\n"
            "<h2><strong>How the two fit together</strong></h2>\n"
            "<ul>\n"
            "<li>Inn-Flow remains the accounting system of record.</li>\n"
            "<li>Innrly focuses on the work that happens before entries reach the books: invoice capture, GL-coding suggestions, approval routing, OTA reconciliation flags and portfolio reporting.</li>\n"
            "<li>Your accounting team keeps its existing chart of accounts, close process and controls in Inn-Flow.</li>\n"
            "</ul>\n"
            "<h2><strong>Integration status</strong></h2>\n"
            "<p>A proposed Innrly integration with Inn-Flow is on our roadmap. It is not live today. Before planning a deployment, contact us to confirm availability, the data that will be supported and the workflow for your properties.</p>\n"
            "<h2><strong>Who this is for</strong></h2>\n"
            "<p>Hotel groups that use Inn-Flow and want to explore extra automation for accounts payable, reconciliation or reporting, without changing their accounting system.</p>\n"
            "<h2><strong>Next step</strong></h2>\n"
            "<p>Talk to our team about your current Inn-Flow setup and which workflows you want to automate. We will tell you plainly what is available now and what is still on the roadmap.</p>\n"
            "<h2><strong>FAQ</strong></h2>\n"
            "<p><strong>Q: Is Innrly a competitor to Inn-Flow?</strong><br>A: No. We position Innrly as an automation layer that works alongside your accounting system. Inn-Flow stays your system of record.</p>\n"
            "<p><strong>Q: Is the Inn-Flow integration available now?</strong><br>A: Not yet. It is on our roadmap. Contact us to confirm current status before planning a rollout.</p>\n"
            "<p><strong>Q: Do I need to change accounting systems to use Innrly?</strong><br>A: No. Innrly is designed to work with the accounting system you already use.</p>\n"
            "<p><strong>Q: Where can I learn more?</strong><br>A: See the Inn-Flow integration page at <a href=\"/integrations/inn-flow\">/integrations/inn-flow</a>.</p>"
        )
        return {
            'title': "Innrly + Inn-Flow: How the Automation Layer Fits",
            'meta_title': "Innrly + Inn-Flow: How the Automation Layer Fits | Innrly",
            'meta_description': "Inn-Flow stays your accounting system of record. See how Innrly's automation layer fits alongside it and the current status of the planned integration.",
            'summary': "Inn-Flow stays your accounting system of record. See how Innrly's automation layer fits alongside it and the current status of the planned integration.",
            'content': new_body
        }

    # Handle Table Deletions and Special Insertions
    if slug == 'hotel-back-office-automation':
        content = re.sub(r"<h2><strong>Portfolio</strong></h2>[\s\S]*?<h2><strong>60,000\+</strong></h2>", "", content)
    elif slug == 'multi-property-accounting-software':
        content = re.sub(
            r"<h2><strong>Software</strong></h2>[\s\S]*?<h2><strong>\$245K\+</strong></h2>",
            "<p>Cost varies widely by portfolio size, modules and implementation. Request written quotes for your property count and transaction volume.</p>",
            content
        )
    elif slug == 'hotel-labor-cost-percentage':
        content = re.sub(
            r"<h2><strong>Segment</strong></h2>[\s\S]*?<h2><strong>36%[-\u2013\u2014\x96]42%</strong></h2>",
            "<p>Every hotel has its own target based on service level, amenities and local wage rates. Set a baseline from your own history rather than an unverified industry average.</p>",
            content
        )
    elif slug == 'mpor-explained':
        content = re.sub(
            r"<h2><strong>Segment</strong></h2>[\s\S]*?<h2><strong>50[-\u2013\u2014\x96]70 min</strong></h2>",
            "<p>Set targets from your own history, brand standards and room mix, then investigate properties that move well above their own target.</p>",
            content
        )
    elif slug == 'us-hospitality-2025':
        if not content.startswith("<p><em>Editor's note:"):
            content = "<p><em>Editor's note: This article was written as a 2025 outlook and is kept for reference. Some trends and figures may have changed.</em></p>\n" + content

    for r in p['rows']:
        f = r['find'].strip()
        rep = r['replace'].strip()
        
        if rep == 'No change needed, keep.':
            continue
        if 'The whole' in f and 'table' in f:
            continue
        if f.startswith('(add where the table was)'):
            continue
            
        if f == '(add right after the features list)':
            note = "<p>Innrly Shift uses Face-ID timeclock punches to help reduce unauthorized clock-ins and support labor reporting. Employers must configure lawful timekeeping practices and obtain required employee notices and consent before biometric enrollment.</p>"
            if note not in content:
                content = re.sub(r"(</ul>\s*<h2><strong>The Real-World Financial Impact</strong></h2>)", f"{note}\n\\1", content)
            continue
            
        if f == '(add right after the formula)':
            if slug == 'hotel-labor-cost-percentage':
                note = "<p>Whether you use gross revenue or net room revenue, and whether labor includes benefits and payroll taxes or wages only, depends on your internal accounting policy. Apply the same definition consistently across every property.</p>"
                if note not in content:
                    content = re.sub(r"(<p>Labor Cost % = \(Total Labor Cost / Total Revenue\)[^<]*</p>)", f"\\1\n{note}", content)
            elif slug == 'mpor-explained':
                note = "<p>Note: Occupied room-nights and rooms cleaned are not always equal. If stayover guests decline service, rooms cleaned will be lower than occupied room-nights. State which denominator your portfolio uses so properties are evaluated on the same basis.</p>"
                if note not in content:
                    content = re.sub(r"(<p>Choose one denominator[^<]*</p>)", f"\\1\n{note}", content)
            continue
            
        if f == '(add after the list)':
            if slug == 'hotels-losing-thousands-clc-mistakes':
                note = "<p>Results vary by property and process. We recommend a measured pilot on your own data.</p>"
                if note not in content:
                    content = re.sub(r"(Less time spent on monthly reconciliation</li>\s*</ul>)", f"\\1\n{note}", content)
            elif slug == 'select-service-back-office-savings':
                note = "<p>Your results depend on volume and current process. Measure today's hours and compare after a pilot.</p>"
                if note not in content:
                    content = re.sub(r"(OTA commission auditing:[^\n]*?</li>\s*</ul>)", f"\\1\n{note}", content)
            continue

        if f == '(add at the very top, above the H1)':
            continue
            
        replacement_val = "" if rep == 'DELETE' else rep
        
        # Check in content
        matched_str = find_in_html(content, f)
        if matched_str:
            content = content.replace(matched_str, replacement_val, 1)
        elif find_in_html(title, f):
            title = title.replace(find_in_html(title, f), replacement_val)
            if meta_title and find_in_html(meta_title, f):
                meta_title = meta_title.replace(find_in_html(meta_title, f), replacement_val)
        else:
            print(f"Warning: could not find '{f[:60]}' in {slug}")

    # Specific metadata updates from docx
    if slug == 'night-audit-automation':
        title = "Night Audit Automation: Replace the 2 AM Excel Marathon"
        meta_title = "Night Audit Automation: Replace the 2 AM Excel Marathon | Innrly"
    elif slug == 'hyperpersonalization-20-leveraging-ai-and-biometric-data-for-bespoke-guest-experiences':
        title = "Guest Personalization and Biometric Data: Opportunities and Privacy Limits"
        meta_title = "Guest Personalization and Biometric Data: Opportunities and Privacy Limits | Innrly"
        meta_description = "An industry look at AI personalization, why biometric and health data need explicit consent, and where hotels should draw the line."
        summary = meta_description
    elif slug == 'hotel-ota-commission-reconciliation':
        title = "Hotel OTA Commission Reconciliation: How to Find and Review Variances"
        meta_title = "Hotel OTA Commission Reconciliation: How to Find and Review Variances | Innrly"
        meta_description = "How multi-property hotel operators identify OTA commission variances, line-match statements to PMS folios, and submit timely dispute claims."
        summary = meta_description
    elif slug == 'select-service-back-office-savings':
        title = "Select-Service Hotel Back-Office Savings: Where the Hours Go"
        meta_title = "Select-Service Hotel Back-Office Savings: Where the Hours Go | Innrly"
    elif slug == 'us-hospitality-2025':
        title = "Where US Hospitality Was Headed in 2025 (Outlook Archive)"
        meta_title = "Where US Hospitality Was Headed in 2025 (Outlook Archive) | Innrly"
    elif slug == 'backofhouse-robotics-solving-labor-shortages-with-ai-chefs-and-automated-housekeeping':
        summary = "Hotels continue to report staffing shortages. In an AHLA survey released in February 2025, 65% of responding hotels said they were experiencing staffing shortages."
        if meta_description:
            meta_description = summary

    return {
        'title': title,
        'meta_title': meta_title,
        'meta_description': meta_description,
        'summary': summary,
        'content': content
    }

def run_migration(dry_run=False):
    with open('backend/scripts/parsed_replacements.json', encoding='utf-8') as f:
        pages = json.load(f)

    conn = get_db_connection()
    conn.autocommit = False
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT id, slug, title, content, summary, meta_title, meta_description, created_at, updated_at FROM blogs")
    blogs = {r['slug']: dict(r) for r in cursor.fetchall()}

    staggered_dates = {
        'innrly-vs-inn-flow': '2026-05-20 10:00:00',
        'hotel-back-office-automation': '2026-05-25 10:00:00',
        'ota-reconciliation-guide': '2026-05-18 10:00:00',
        'night-audit-automation': '2026-05-24 10:00:00',
        'multi-property-accounting-software': '2026-05-23 10:00:00',
        'ap-automation-hotels': '2026-05-22 10:00:00',
        'mpor-explained': '2026-05-15 10:00:00',
        'hotel-labor-cost-percentage': '2026-05-21 10:00:00',
        'hotel-night-audit-checklist': '2026-05-28 10:00:00',
        'pms-vs-back-office-automation': '2026-05-26 10:00:00',
        'hotel-ota-commission-reconciliation': '2026-05-27 10:00:00',
        'hotel-night-audit-software-guide': '2026-05-14 10:00:00',
        'multi-property-hotel-accounting-software': '2026-05-08 10:00:00',
        'hotel-budgeting-software-2026': '2026-05-19 10:00:00',
        'select-service-back-office-savings': '2026-05-17 10:00:00',
        'quickbooks-for-hotels-limits': '2026-05-11 10:00:00',
        'hospitality-accounting-services-vs-software': '2026-05-09 10:00:00',
        'best-hotel-accounting-software': '2026-06-06 10:00:00',
        'five-back-office-wins': '2026-05-12 10:00:00',
        'labor-cost-blind-spots': '2026-04-28 10:00:00',
        'ota-commission-audit': '2026-04-04 10:00:00',
    }
    current_updated_at = '2026-10-26 15:30:00'

    print("Beginning migration" + (" (DRY RUN)" if dry_run else "") + "...")

    for p in pages:
        slug = p['slug']
        if slug not in blogs:
            print(f"Skipping {slug} (not in DB)")
            continue
        
        orig = blogs[slug]
        res = apply_fixes_to_blog(slug, p, orig)
        
        new_created_at = staggered_dates.get(slug, orig['created_at'])
        
        cursor.execute("""
            UPDATE blogs 
            SET title = %s,
                meta_title = %s,
                summary = %s,
                meta_description = %s,
                content = %s,
                created_at = %s,
                updated_at = %s
            WHERE slug = %s
        """, (
            res['title'],
            res['meta_title'],
            res['summary'],
            res['meta_description'],
            res['content'],
            new_created_at,
            current_updated_at,
            slug
        ))
        print(f"Updated {slug}")

    # Update labor-shortages-urban-revitalization
    print("\nProcessing trend post: labor-shortages-urban-revitalization")
    cursor.execute("SELECT content, summary, title FROM blogs WHERE slug = 'labor-shortages-urban-revitalization'")
    urban_row = cursor.fetchone()
    if urban_row:
        urban_content = urban_row['content'] or ''
        urban_content = re.sub(r'1\.2\s*million unfilled positions nationwide', 'Persistent unfilled positions nationwide', urban_content)
        urban_content = re.sub(r'1\.2\s*million', 'staffing shortages', urban_content)
        if not urban_content.startswith("<p><em>Editor's note:"):
            urban_content = "<p><em>Editor's note: This article was written as a market outlook and is kept for reference. Some trends and figures may have changed.</em></p>\n" + urban_content
        cursor.execute("UPDATE blogs SET content = %s, updated_at = %s WHERE slug = 'labor-shortages-urban-revitalization'", (urban_content, current_updated_at))
        print("Updated labor-shortages-urban-revitalization")

    # Prohibited words check across all blogs in MySQL
    print("\n--- RUNNING PROHIBITED WORD SCAN ON DATABASE ---")
    cursor.execute("SELECT id, slug, title, content, meta_title, meta_description, summary FROM blogs")
    all_rows = cursor.fetchall()

    prohibited_terms = [
        "certified M3",
        "officially certified",
        "M3 certified",
        "M3 (certified)",
        "certified push",
        "tamper-proof",
        "Complete elimination",
        "eliminates buddy",
        "ensure compliance",
        "1.2 million",
        "Real Results",
        "88% of spreadsheets",
        "Innrly vs Inn-Flow",
        "Honest 2026 Comparison",
        "40-180 Hours"
    ]

    violations = []
    for row in all_rows:
        text_corpus = f"{row['title']} {row['content']} {row['meta_title']} {row['meta_description']} {row['summary']}"
        for term in prohibited_terms:
            if re.search(r'\b' + re.escape(term) + r'\b', text_corpus, re.IGNORECASE):
                violations.append((row['slug'], term))

    if violations:
        print(f"CRITICAL: Found {len(violations)} prohibited term violations!")
        for slug, term in violations:
            print(f"  Violation: {slug} contains '{term}'")
        conn.rollback()
        cursor.close()
        conn.close()
        raise RuntimeError("Prohibited term scan failed. Rolled back transaction.")
    
    print("ALL PROHIBITED TERM CHECKS PASSED WITH ZERO VIOLATIONS!")

    if dry_run:
        print("\nDRY RUN complete. Rolling back transaction.")
        conn.rollback()
    else:
        conn.commit()
        print("\nMIGRATION COMMITTED TO DATABASE SUCCESSFULLY!")

    cursor.close()
    conn.close()

if __name__ == '__main__':
    dry_run = '--dry-run' in sys.argv
    run_migration(dry_run=dry_run)

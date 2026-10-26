import sys, json, re, html
from datetime import datetime
sys.path.append('backend')
from app import get_db_connection

def clean_word(w):
    w = w.replace('\u2013', '-').replace('\u2014', '-').replace('\xa0', ' ').replace('\x96', '-').replace('\x97', '-')
    w = w.replace('&ndash;', '-').replace('&mdash;', '-').replace('&times;', 'x').replace('&nbsp;', ' ')
    w = w.replace('\u00d7', 'x')
    return w

def make_word_pattern(word):
    esc = re.escape(clean_word(word))
    esc = esc.replace(r'\-', r'(?:-|&ndash;|&mdash;|\u2013|\u2014|\x96)')
    esc = esc.replace(r'x', r'(?:x|&times;|\u00d7)')
    return esc

def find_in_html(content, find_text):
    if not find_text:
        return None
    if find_text in content:
        return find_text
        
    words = find_text.split()
    if not words:
        return None
        
    word_patterns = [make_word_pattern(w) for w in words]
    pattern = r'\s*(?:<[^>]+>\s*)*'.join(word_patterns)
    try:
        m = re.search(pattern, content)
        if m:
            return m.group(0)
    except Exception:
        pass

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
            'title': "Innrly + Inn-Flow: How the Automation Layer Fits Alongside Hotel ERP",
            'meta_title': "Innrly + Inn-Flow: How the Automation Layer Fits Alongside Hotel ERP | Innrly",
            'meta_description': "Inn-Flow stays your accounting system of record. See how Innrly's automation layer fits alongside it and the current status of the planned integration.",
            'summary': "Inn-Flow stays your accounting system of record. See how Innrly's automation layer fits alongside it and the current status of the planned integration.",
            'content': new_body
        }

    # Handle Table Deletions and Special Insertions
    if slug == 'hotel-back-office-automation':
        content = re.sub(r"<h2><strong>Portfolio</strong></h2>[\s\S]*?<h2><strong>60,000\+</strong></h2>", "", content)
        content = re.sub(
            r"<p>At a fully loaded back-office cost of ~\$45/hour[\s\S]*?</p>",
            "<p>The hours and dollar amounts you can recover depend on your property count, transaction volume and current manual process. Measure your team's current hours to set an accurate baseline before evaluating software.</p>",
            content
        )
    elif slug == 'multi-property-accounting-software':
        content = re.sub(
            r"<h2><strong>(?:Total cost of ownership by stack|Stack)</strong></h2>[\s\S]*?Get quotes for your portfolio\.\)</p>",
            "<p>Cost varies widely by portfolio size, modules and implementation. Request written quotes for your property count and transaction volume.</p>",
            content
        )
    elif slug == 'hotel-labor-cost-percentage':
        content = re.sub(
            r"<h2><strong>Segment</strong></h2>[\s\S]*?<h2><strong>36%[-\u2013\u2014\x96&;ndash;]+42%</strong></h2>",
            "<p>Every hotel has its own target based on service level, amenities and local wage rates. Set a baseline from your own history rather than an unverified industry average.</p>",
            content
        )
    elif slug == 'mpor-explained':
        content = re.sub(
            r"<h2><strong>Segment</strong></h2>[\s\S]*?<h2><strong>50[-\u2013\u2014\x96&;ndash;]+70 min</strong></h2>",
            "<p>Set targets from your own history, brand standards and room mix, then investigate properties that move well above their own target.</p>",
            content
        )
    elif slug == 'us-hospitality-2025':
        if not content.startswith("<p><em>Editor's note:"):
            content = "<p><em>Editor's note: This article was written as a 2025 outlook and is kept for reference. Some trends and figures may have changed.</em></p>\n" + content

    if p and 'rows' in p:
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
                pass

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
        title = "Select-Service Hotel Back-Office Savings: Where Portfolios Save Time & Cost"
        meta_title = "Select-Service Hotel Back-Office Savings: Where Portfolios Save Time & Cost | Innrly"
        meta_description = "Realistic analysis of back-office time savings across select-service hotel portfolios. Where document capture, audit automation, and time tracking reduce manual hours."
        summary = meta_description
    elif slug == 'backofhouse-robotics-solving-labor-shortages-with-ai-chefs-and-automated-housekeeping':
        meta_description = "The U.S. hospitality industry faces substantial staffing shortages. Learn how automation and robotics are transforming hotel back-of-house operations."
        summary = meta_description

    # Universal Post-Processing Cleanup for Prohibited and Overreaching Claims
    content = re.sub(
        r"<p>Does it push directly to M3\?[\s\S]*?(?:officially certified|officially|certified)?\s*M3 Associate Partner[\s\S]*?automatically\.</p>",
        "<p>Does it push directly to M3? Innrly is an M3 Associate Partner and pushes GL-coded invoices into M3. Contact us to confirm whether night audit journal entries are supported for your setup.</p>",
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r"<p>Does it work with M3\? Yes[\s\S]*?intact\.</p>",
        "<p>Does it work with M3? Innrly is an M3 Associate Partner. Invoices push directly with GL coding intact.</p>",
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r"Innrly is the single-platform option\.\s*Officially\s*(?:certified\s*)?M3 Associate Partner",
        "Innrly is the single-platform option. M3 Associate Partner",
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r"Innrly is an officially\s*(?:certified\s*)?M3 Associate Partner",
        "Innrly is an M3 Associate Partner",
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r"Accounting integration\s*&mdash;\s*is it\s*(?:certified by\s*)?M3(?: Associate Partner)?",
        "Accounting integration &mdash; is it integrated with M3",
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r"front of M3 Associate Partner",
        "alongside M3",
        content
    )
    content = re.sub(
        r"push to M3 Associate Partner",
        "push to M3",
        content
    )
    
    # Specific prohibited phrases replacement
    content = content.replace("officially certified M3", "M3")
    content = content.replace("officially certified", "integrated")
    content = content.replace("certified M3", "M3")
    content = content.replace("M3 certified", "M3-compatible")
    content = content.replace("M3 (certified)", "M3")
    content = content.replace("certified push", "automated push")
    content = content.replace("tamper-proof", "secure")
    content = content.replace("tamper proof", "secure")
    content = content.replace("Complete elimination", "Significant reduction")
    content = content.replace("eliminates buddy", "reduces buddy")
    content = content.replace("ensure compliance", "support compliance")
    content = content.replace("1.2 million", "substantial")
    content = content.replace("Real Results", "What Teams Experience")
    content = content.replace("88% of spreadsheets", "many spreadsheets")
    content = content.replace("40-180 Hours", "Valuable Hours")
    content = content.replace("40 to 180 hours", "valuable hours")
    content = content.replace("40-180 hours", "valuable hours")
    
    title = title.replace("40-180 Hours", "Time & Cost")
    title = title.replace("40-180 hours", "Time & Cost")
    if meta_title:
        meta_title = meta_title.replace("40-180 Hours", "Time & Cost")
        meta_title = meta_title.replace("40-180 hours", "Time & Cost")

    return {
        'title': title,
        'meta_title': meta_title,
        'meta_description': meta_description,
        'summary': summary,
        'content': content
    }

PROHIBITED_TERMS = [
    "certified M3",
    "officially certified",
    "M3 certified",
    "M3 (certified)",
    "certified push",
    "tamper-proof",
    "tamper proof",
    "Complete elimination",
    "eliminates buddy",
    "ensure compliance",
    "1.2 million",
    "Real Results",
    "88% of spreadsheets",
    "Innrly vs Inn-Flow",
    "Honest 2026 Comparison",
    "40-180 Hours",
    "40 to 180 hours",
    "40-180 hours",
]

def run_migration(dry_run=False):
    with open('backend/scripts/parsed_replacements.json', 'r', encoding='utf-8') as f:
        parsed_data = json.load(f)

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM blogs ORDER BY id ASC")
    blogs = cursor.fetchall()
    
    slug_to_blog = {b['slug']: b for b in blogs}
    
    print("Beginning migration...")
    
    # Process 21 audited blogs from docx
    for p in parsed_data:
        slug = p['slug']
        if slug not in slug_to_blog:
            print(f"Warning: slug {slug} not found in database!")
            continue
            
        b = slug_to_blog[slug]
        updated = apply_fixes_to_blog(slug, p, b)
        
        sql = """
            UPDATE blogs 
            SET title = %s, meta_title = %s, meta_description = %s, summary = %s, content = %s, updated_at = %s
            WHERE slug = %s
        """
        now = "2026-10-26 15:30:00"
        cursor.execute(sql, (
            updated['title'],
            updated['meta_title'],
            updated['meta_description'],
            updated['summary'],
            updated['content'],
            now,
            slug
        ))
        print(f"Updated {slug}")
        
    # Also process trend post labor-shortages-urban-revitalization
    trend_slug = 'labor-shortages-urban-revitalization'
    if trend_slug in slug_to_blog:
        tb = slug_to_blog[trend_slug]
        t_content = tb['content'] or ''
        t_content = t_content.replace('1.2 million', 'substantial')
        cursor.execute(
            "UPDATE blogs SET content = %s, updated_at = '2026-10-26 15:30:00' WHERE slug = %s",
            (t_content, trend_slug)
        )
        print(f"Updated {trend_slug}")

    # PROHIBITED WORD SCAN
    cursor.execute("SELECT id, slug, title, content FROM blogs")
    all_blogs = cursor.fetchall()
    violations = []
    for b in all_blogs:
        for t in PROHIBITED_TERMS:
            c = b['content'] or ''
            ti = b['title'] or ''
            if re.search(re.escape(t), c, re.IGNORECASE) or re.search(re.escape(t), ti, re.IGNORECASE):
                violations.append((b['slug'], t))
                
    if violations:
        print("\nCRITICAL: Found violations:")
        for v in violations:
            print(f"  Violation: {v[0]} contains '{v[1]}'")
        conn.rollback()
        cursor.close()
        conn.close()
        sys.exit(1)
        
    print("\nPASSED: 0 prohibited terms in database!")
    conn.commit()
    cursor.close()
    conn.close()
    print("Database migration committed successfully!")

if __name__ == "__main__":
    run_migration()

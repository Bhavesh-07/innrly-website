import os, sys, re, json, urllib.request
sys.path.append('backend')
from app import get_db_connection

def run_verification():
    print("==================================================")
    print("INNRLY BLOG AUDIT & VERIFICATION SUITE")
    print("==================================================")

    # 1. Database Check
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, slug, title, content, summary, meta_title, meta_description, created_at, updated_at FROM blogs")
    blogs = cursor.fetchall()
    cursor.close()
    conn.close()

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
        "40-180 Hours",
        "40 to 180 hours"
    ]

    print(f"\n[Test 1] Scanning {len(blogs)} database records for prohibited terms...")
    db_violations = []
    for r in blogs:
        corpus = f"{r['title']} {r['content']} {r['summary']} {r['meta_title']} {r['meta_description']}"
        for term in prohibited_terms:
            if re.search(r'\b' + re.escape(term) + r'\b', corpus, re.IGNORECASE):
                db_violations.append((r['slug'], term))

    if db_violations:
        print(f"FAILED: Found {len(db_violations)} violations in database:")
        for slug, term in db_violations:
            print(f"  - {slug}: {term}")
    else:
        print("PASSED: 0 prohibited terms found in MySQL database.")

    # 2. Frontend Source Check
    print("\n[Test 2] Scanning frontend/src for prohibited terms...")
    frontend_violations = []
    for root, dirs, files in os.walk('frontend/src'):
        for f in files:
            if f.endswith(('.tsx', '.ts', '.jsx', '.js', '.json')):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                for term in prohibited_terms:
                    for m in re.finditer(r'\b' + re.escape(term) + r'\b', content, re.IGNORECASE):
                        line_no = content[:m.start()].count('\n') + 1
                        frontend_violations.append((path, line_no, term))

    if frontend_violations:
        print(f"FAILED: Found {len(frontend_violations)} violations in frontend/src:")
        for path, line_no, term in frontend_violations:
            print(f"  - {path}:{line_no} [{term}]")
    else:
        print("PASSED: 0 prohibited terms found in frontend/src.")

    # 3. Check /blog/innrly-vs-inn-flow specifics
    print("\n[Test 3] Verifying /blog/innrly-vs-inn-flow partner positioning...")
    p1 = next((b for b in blogs if b['slug'] == 'innrly-vs-inn-flow'), None)
    if not p1:
        print("FAILED: /blog/innrly-vs-inn-flow not found in DB!")
    else:
        if "competes for the same buyer" in p1['content']:
            print("FAILED: Old competitor text 'competes for the same buyer' found in innrly-vs-inn-flow!")
        elif "Automation Layer" not in p1['title']:
            print("FAILED: Title does not contain 'Automation Layer'!")
        else:
            print("PASSED: innrly-vs-inn-flow correctly positioned as Automation Layer partner.")

    # 4. Check Date Normalization
    print("\n[Test 4] Verifying publication dates...")
    aug_20_count = sum(1 for b in blogs if b['created_at'] and b['created_at'].strftime('%Y-%m-%d') == '2026-08-20')
    print(f"Posts remaining on bulk August 20, 2026: {aug_20_count} (expected: 0)")
    if aug_20_count == 0:
        print("PASSED: All bulk August 20 posts normalized to realistic historical dates.")
    else:
        print(f"WARNING: {aug_20_count} posts still show 2026-08-20.")

    # 5. Check seo_settings table
    print("\n[Test 5] Scanning seo_settings table for prohibited terms...")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT page_path, title, description, og_title, og_description FROM seo_settings")
    seo_rows = cursor.fetchall()
    cursor.close()
    conn.close()

    seo_violations = []
    for r in seo_rows:
        corpus = f"{r.get('title', '')} {r.get('description', '')} {r.get('og_title', '')} {r.get('og_description', '')}"
        for term in prohibited_terms:
            if re.search(r'\b' + re.escape(term) + r'\b', corpus, re.IGNORECASE):
                seo_violations.append((r.get('page_path'), term))

    if seo_violations:
        print(f"FAILED: Found {len(seo_violations)} violations in seo_settings:")
        for path, term in seo_violations:
            print(f"  - {path}: {term}")
    else:
        print(f"PASSED: 0 prohibited terms found in {len(seo_rows)} seo_settings records.")

    # Summary
    if not db_violations and not frontend_violations and not seo_violations and p1 and "Automation Layer" in p1['title'] and aug_20_count == 0:
        print("\n==================================================")
        print("ALL VERIFICATION SUITE CHECKS PASSED (100% CLEAN)")
        print("==================================================")
        return True
    else:
        print("\nVERIFICATION FAILED")
        return False

if __name__ == '__main__':
    success = run_verification()
    sys.exit(0 if success else 1)

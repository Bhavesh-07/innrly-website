import sys
sys.path.append('backend')
from app import get_db_connection

DATES = {
    # Posts with dates defined in STATIC_POSTS
    'hotel-night-audit-checklist': '2026-05-28 10:00:00',
    'hotel-ota-commission-reconciliation': '2026-05-27 10:00:00',
    'pms-vs-back-office-automation': '2026-05-26 10:00:00',
    'hotel-back-office-automation': '2026-05-25 10:00:00',
    'night-audit-automation': '2026-05-24 10:00:00',
    'multi-property-accounting-software': '2026-05-23 10:00:00',
    'ap-automation-hotels': '2026-05-22 10:00:00',
    'hotel-labor-cost-percentage': '2026-05-21 10:00:00',
    'innrly-vs-inn-flow': '2026-05-20 10:00:00',
    'hotel-budgeting-software-2026': '2026-05-19 10:00:00',
    'ota-reconciliation-guide': '2026-05-18 10:00:00',
    'select-service-back-office-savings': '2026-05-17 10:00:00',
    'mpor-explained': '2026-05-15 10:00:00',
    'hotel-night-audit-software-guide': '2026-05-14 10:00:00',
    'five-back-office-wins': '2026-05-12 10:00:00',
    'quickbooks-for-hotels-limits': '2026-05-11 10:00:00',
    'hospitality-accounting-services-vs-software': '2026-05-09 10:00:00',
    'multi-property-hotel-accounting-software': '2026-05-08 10:00:00',
    'labor-cost-blind-spots': '2026-04-28 10:00:00',
    'ota-commission-audit': '2026-04-04 10:00:00',
    'best-hotel-accounting-software': '2026-06-06 10:00:00',
    
    # Older/Trend posts staggered across March - April 2026
    'hotels-losing-thousands-clc-mistakes': '2026-04-22 10:00:00',
    'smarter-timeclock-system-innrly': '2026-04-18 10:00:00',
    'ditching-excel-budgeting-software': '2026-04-15 10:00:00',
    'lean-teams-smart-software-hotel-profits': '2026-04-10 10:00:00',
    'future-hospitality-accounting-software': '2026-04-01 10:00:00',
    'backofhouse-robotics-solving-labor-shortages-with-ai-chefs-and-automated-housekeeping': '2026-03-25 10:00:00',
    'regenerative-tourism-sustainability': '2026-03-18 10:00:00',
    'hyperpersonalization-20-leveraging-ai-and-biometric-data-for-bespoke-guest-experiences': '2026-03-12 10:00:00',
    'labor-shortages-urban-revitalization': '2026-03-05 10:00:00',
    'us-hospitality-2025': '2026-02-15 10:00:00',
}

def normalize_dates():
    conn = get_db_connection()
    cursor = conn.cursor()
    count = 0
    for slug, d in DATES.items():
        cursor.execute("UPDATE blogs SET created_at = %s WHERE slug = %s", (d, slug))
        count += 1
        print(f"Set created_at = {d} for {slug}")
    conn.commit()
    cursor.close()
    conn.close()
    print(f"All {count} dates normalized.")

if __name__ == "__main__":
    normalize_dates()

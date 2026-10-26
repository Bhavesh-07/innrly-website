import sys
sys.path.append('backend')
from app import get_db_connection

dates = {
    'hotel-night-audit-checklist': '2026-05-28 10:00:00',
    'pms-vs-back-office-automation': '2026-05-26 10:00:00',
    'hotel-night-audit-software-guide': '2026-05-14 10:00:00',
    'hotel-budgeting-software-2026': '2026-05-19 10:00:00',
    'quickbooks-for-hotels-limits': '2026-05-11 10:00:00',
    'best-hotel-accounting-software': '2026-06-06 10:00:00',
    'five-back-office-wins': '2026-05-12 10:00:00',
}

conn = get_db_connection()
cursor = conn.cursor()
for slug, d in dates.items():
    cursor.execute("UPDATE blogs SET created_at = %s WHERE slug = %s", (d, slug))
    print(f"Set created_at = {d} for {slug}")
conn.commit()
cursor.close()
conn.close()
print("All remaining 7 dates normalized.")

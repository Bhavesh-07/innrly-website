import sys
import os
import json
from pathlib import Path

# Add backend directory to sys.path so we can import app and db_config
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from app import get_db_connection

def backup_blogs():
    backup_dir = backend_dir / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)
    backup_file = backup_dir / "backup_blogs_pre_content_fixes.json"

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM blogs ORDER BY id ASC")
    rows = cursor.fetchall()

    # Convert datetime objects to string
    for r in rows:
        if r.get("created_at"):
            r["created_at"] = str(r["created_at"])
        if r.get("updated_at"):
            r["updated_at"] = str(r["updated_at"])

    with open(backup_file, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=2, ensure_ascii=False)

    print(f"Backed up {len(rows)} blog posts to {backup_file}")
    cursor.close()
    conn.close()

if __name__ == "__main__":
    backup_blogs()

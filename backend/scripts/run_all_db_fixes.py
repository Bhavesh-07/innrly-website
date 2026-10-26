import subprocess
import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parent.parent

SCRIPTS = [
    ("backend/scripts/apply_blog_fixes.py", "Applying exact blog content replacements"),
    ("backend/scripts/restore_short_posts_db.py", "Restoring full comprehensive guides"),
    ("backend/scripts/normalize_remaining_dates.py", "Normalizing publication dates"),
    ("backend/scripts/update_seo_settings.py", "Updating SEO settings table"),
    ("backend/scripts/verify_blog_content_audit.py", "Running verification suite"),
]

def run_all():
    print("==================================================")
    print("RUNNING ALL DATABASE CONTENT FIXES")
    print("==================================================")
    for script, desc in SCRIPTS:
        print(f"\n--> {desc} ({script})...")
        proc = subprocess.run([sys.executable, script], cwd=str(backend_dir.parent), capture_output=True, text=True)
        print(proc.stdout)
        if proc.stderr:
            print("STDERR:", proc.stderr)
        if proc.returncode != 0:
            print(f"FAILED on {script} with code {proc.returncode}")
            sys.exit(proc.returncode)
            
    print("\n==================================================")
    print("ALL DATABASE FIXES SUCCESSFULLY APPLIED & VERIFIED!")
    print("==================================================")

if __name__ == "__main__":
    run_all()

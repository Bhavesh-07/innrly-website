import os
import subprocess
import glob
import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))
import app

MYSQL_EXE = r"C:\wamp64\bin\mysql\mysql8.4.7\bin\mysql.exe"
DUMP_DIR = r"D:\python project\innrly-git\Dump20261026"
DB_NAME = "innrly_leads"

def import_dump_files():
    sql_files = sorted(glob.glob(os.path.join(DUMP_DIR, "*.sql")))
    print(f"Found {len(sql_files)} SQL files to import in {DUMP_DIR}")
    
    for sql_file in sql_files:
        filename = os.path.basename(sql_file)
        print(f"Importing {filename}...")
        
        with open(sql_file, "rb") as f:
            proc = subprocess.run(
                [
                    MYSQL_EXE,
                    "-h", "127.0.0.1",
                    "-P", "3306",
                    "-u", "root",
                    "--default-character-set=utf8mb4",
                    DB_NAME
                ],
                stdin=f,
                capture_output=True
            )
            
        if proc.returncode != 0:
            print(f"ERROR importing {filename}:")
            print(proc.stderr.decode('utf-8', errors='ignore'))
            sys.exit(1)
        else:
            print(f"  -> Successfully imported {filename}")
            
    print("\n--- Verifying Imported Tables in innrly_leads ---")
    conn = app.get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SHOW TABLES")
    tables = [list(r.values())[0] for r in cursor.fetchall()]
    
    for t in tables:
        cursor.execute(f"SELECT COUNT(*) as cnt FROM `{t}`")
        cnt = cursor.fetchone()["cnt"]
        print(f"Table `{t}`: {cnt} rows")
        
    cursor.close()
    conn.close()
    print("\nAll dump files imported successfully!")

if __name__ == "__main__":
    import_dump_files()

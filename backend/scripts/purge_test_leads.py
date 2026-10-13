import os
import sys
import mysql.connector

# Configurations to attempt (local development port 3307 / 3306)
configs = [
    {"host": "127.0.0.1", "port": 3307, "user": "root", "password": "", "database": "innrly_leads"},
    {"host": "127.0.0.1", "port": 3306, "user": "bhavik", "password": "33jain33", "database": "innrly_leads"},
    {"host": "127.0.0.1", "port": 3306, "user": "root", "password": "", "database": "innrly_leads"},
]

# From .env if defined
env_port = int(os.environ.get("DB_PORT", 3306))
env_host = os.environ.get("DB_HOST", "127.0.0.1")
env_user = os.environ.get("DB_USER", "bhavik")
env_pass = os.environ.get("DB_PASSWORD", "33jain33")
env_name = os.environ.get("DB_NAME", "innrly_leads")

configs.insert(0, {"host": env_host, "port": env_port, "user": env_user, "password": env_pass, "database": env_name})

test_emails = ("x@x.com", "live.test@hilton.com")

def purge_database():
    connected_any = False
    for cfg in configs:
        try:
            conn = mysql.connector.connect(**cfg)
            connected_any = True
            print(f"Purging on {cfg['host']}:{cfg['port']} as user '{cfg['user']}'...")
            cur = conn.cursor(dictionary=True)
            cur.execute("SHOW TABLES")
            tables = [list(r.values())[0] for r in cur.fetchall()]
            total_deleted = 0
            for tbl in tables:
                cur.execute(f"DESCRIBE `{tbl}`")
                cols = [c["Field"] for c in cur.fetchall()]
                email_cols = [c for c in cols if "email" in c.lower()]
                for eco in email_cols:
                    cur.execute(f"SELECT COUNT(*) as cnt FROM `{tbl}` WHERE `{eco}` IN (%s, %s)", test_emails)
                    cnt = cur.fetchone()["cnt"]
                    if cnt > 0:
                        print(f"  Found {cnt} test rows in table '{tbl}' (column '{eco}')")
                        cur.execute(f"DELETE FROM `{tbl}` WHERE `{eco}` IN (%s, %s)", test_emails)
                        conn.commit()
                        print(f"  Deleted {cnt} rows from '{tbl}'")
                        total_deleted += cnt
            print(f"Completed purge on {cfg['port']}. Total rows deleted: {total_deleted}\n")
            cur.close()
            conn.close()
        except Exception as e:
            # Expected if port/credential doesn't match this running instance
            continue

    if not connected_any:
        print("Warning: Could not connect to any local MySQL instance. Check DB service status.")

if __name__ == "__main__":
    purge_database()

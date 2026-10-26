import sys
import os

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

import app

UPDATES = [
    {
        "page_path": "/blog/innrly-vs-inn-flow",
        "title": "Innrly + Inn-Flow: How the Automation Layer Fits Alongside Hotel ERP",
        "og_title": "Innrly + Inn-Flow: How the Automation Layer Fits Alongside Hotel ERP",
        "description": "How Innrly automated document capture, night audit processing, and time tracking work alongside Inn-Flow's hotel accounting ERP.",
        "og_description": "How Innrly automated document capture, night audit processing, and time tracking work alongside Inn-Flow's hotel accounting ERP."
    },
    {
        "page_path": "/blog/select-service-back-office-savings",
        "title": "Select-Service Hotel Back-Office Savings: Where Portfolios Save Time & Cost",
        "og_title": "Select-Service Hotel Back-Office Savings: Where Portfolios Save Time & Cost",
        "description": "Realistic analysis of back-office time savings across select-service hotel portfolios. Where document capture, audit automation, and time tracking reduce manual hours.",
        "og_description": "Realistic analysis of back-office time savings across select-service hotel portfolios. Where document capture, audit automation, and time tracking reduce manual hours."
    },
    {
        "page_path": "/blog/night-audit-automation",
        "title": "Night Audit Automation: Replace the 2 AM Excel Marathon",
        "og_title": "Night Audit Automation: Replace the 2 AM Excel Marathon",
        "description": "Every night, in every hotel in your portfolio, night audit data is extracted and reconciled. Learn how automation replaces manual Excel marathon sessions.",
        "og_description": "Every night, in every hotel in your portfolio, night audit data is extracted and reconciled. Learn how automation replaces manual Excel marathon sessions."
    },
    {
        "page_path": "/blog/backofhouse-robotics-solving-labor-shortages-with-ai-chefs-and-automated-housekeeping",
        "description": "The U.S. hospitality industry faces substantial staffing shortages. Learn how automation and robotics are transforming hotel back-of-house operations.",
        "og_description": "The U.S. hospitality industry faces substantial staffing shortages. Learn how automation and robotics are transforming hotel back-of-house operations."
    },
    {
        "page_path": "/hotel-back-office-automation",
        "description": "Automate your hotel group's night audit, accounts payable capture, OTA reconciliation, and labor tracking. Reclaim valuable hours across your properties each month.",
        "og_description": "Automate your hotel group's night audit, accounts payable capture, OTA reconciliation, and labor tracking. Reclaim valuable hours across your properties each month."
    }
]

def update_seo_settings():
    conn = app.get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    for item in UPDATES:
        path = item["page_path"]
        fields = []
        params = []
        for k, v in item.items():
            if k == "page_path":
                continue
            fields.append(f"{k} = %s")
            params.append(v)
        params.append(path)
        sql = f"UPDATE seo_settings SET {', '.join(fields)} WHERE page_path = %s"
        cursor.execute(sql, tuple(params))
        print(f"Updated {path}: {cursor.rowcount} row(s) affected")
        
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    update_seo_settings()

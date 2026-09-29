# Security & Privacy Risk Remediation Implementation Plan

> **For Claude / Developers / DevOps:** Implementation plan for remediating all 11 security and privacy risk findings from `risk_findings_2026-09-18_16-24-13.xlsx` across the `innrly-git` application and hosting infrastructure.

**Goal:** Implement Google Consent Mode v2, Global Privacy Control (GPC) signal detection, persistent cookie preferences, IIS HSTS and security headers, and harden server network ports (FTP, MS SQL, MySQL, and subdomain HTTPS enforcement).

**Architecture:** Multi-tier remediation covering TanStack React SSR Frontend ([run-server.mjs](file:///d:/python%20project/innrly-git/frontend/run-server.mjs)), IIS 8.5+ Web Server ([web.config](file:///d:/python%20project/innrly-git/web.config)), Windows Server (`13.65.148.90`), Linux Server (`144.76.101.11`), and Cloudflare / Edge DNS.

---

## 📋 Remediation Overview & Finding Mapping

| Task # | Category | Finding(s) Resolved | Target Component / Host | Responsible Role |
| :--- | :--- | :--- | :--- | :--- |
| **Task 1** | Frontend / Analytics | **#1, #7, #9** (Risky Tracking, Missing Banner, Instant Cookies) | `frontend/run-server.mjs`<br>`frontend/src/routes/__root.tsx` | Web Developer |
| **Task 2** | Frontend / Privacy | **#8, #11** (No GPC, Website May Ignore GPC) | `frontend/src/components/site/CookieConsent.tsx`<br>`frontend/src/lib/analytics.ts` | Web Developer |
| **Task 3** | Frontend / UI | **#6** (Missing Do Not Sell / Opt-Out Link) | `frontend/src/components/site/Footer.tsx`<br>`frontend/src/components/site/CookieConsent.tsx` | Web Developer |
| **Task 4** | Web Server / Config | **#5 (Header)** (HSTS & Security Headers) | `web.config` | Web Developer / DevOps |
| **Task 5** | Network / Server | **#3** (FTP without SSL/TLS on 7 hosts) | `13.65.148.90` (Windows Server) | DevOps / Server Admin |
| **Task 6** | Database / Port | **#2** (Microsoft SQL Exposed on Port 1433) | `13.65.148.90` (Azure Windows Server) | DevOps / DBA |
| **Task 7** | Database / Port | **#4** (MySQL Exposed on Port 3306) | `144.76.101.11` (Linux Server) | DevOps / DBA |
| **Task 8** | Web / Edge SSL | **#5 (Endpoint)** (HTTP without SSL on Subdomains) | Cloudflare / Edge DNS / IIS | DevOps / Web Admin |

---

## 🛠️ Phase 1: Application & Frontend Codebase Remediations

### Task 1: Implement Google Consent Mode v2 & Pre-Consent Blocking

**Goal:** Stop Google Analytics (`G-TJZT02L07P`) and Google Tag Manager from setting tracking cookies before the user grants explicit consent.

#### Step 1.1: Update `frontend/run-server.mjs`
Update the HTML injection logic in `run-server.mjs` to define Google Consent Mode v2 with default `'denied'` state before the Google Tag script runs.

```javascript
// In frontend/run-server.mjs
const GA_ID = process.env.VITE_GA_MEASUREMENT_ID || 'G-TJZT02L07P';

if (contentType.includes('text/html')) {
  const text = await webResponse.text();
  const consentSnippet = `<!-- Google Consent Mode v2 -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  gtag('js', new Date());
  gtag('config', '${GA_ID}', { send_page_view: false });
</script>
</head>`;

  let modifiedText = text;
  if (!text.includes(GA_ID)) {
    modifiedText = text.replace('</head>', consentSnippet);
  }
```

#### Step 1.2: Update `frontend/src/routes/__root.tsx`
Ensure `dynamicScripts` defines Consent Mode defaults before any GA/GTM snippet:

```typescript
// In frontend/src/routes/__root.tsx
// 1. Consent Mode v2 default initialization
dynamicScripts.push({
  children: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  `,
});
```

#### Step 1.3: Update Consent State in `CookieConsent.tsx`
When the user clicks "Accept" or "Reject", call `gtag('consent', 'update', ...)`:

```typescript
export function updateGoogleConsent(status: "accepted" | "rejected") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status === "accepted" ? "granted" : "denied",
      ad_storage: status === "accepted" ? "granted" : "denied",
      ad_user_data: status === "accepted" ? "granted" : "denied",
      ad_personalization: status === "accepted" ? "granted" : "denied",
    });
  }
}
```

#### Verification Step:
1. Open Chrome in Incognito mode.
2. Open DevTools ➔ **Application** ➔ **Cookies**.
3. Load `http://localhost:3000` (or live site).
4. Verify `_ga` and `_ga_*` cookies are **not created** until clicking "Accept".

---

### Task 2: Implement Global Privacy Control (GPC) Signal Detection

**Goal:** Automatically honor the browser's `navigator.globalPrivacyControl` signal and treat it as an opt-out.

#### Step 2.1: Update `frontend/src/components/site/CookieConsent.tsx`
Add detection for the GPC browser property:

```typescript
function checkGpcSignal(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as { globalPrivacyControl?: boolean | string };
  return (
    nav.globalPrivacyControl === true ||
    nav.globalPrivacyControl === "1" ||
    (window as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}
```

#### Step 2.2: Apply GPC Automatically on Mount
```typescript
useEffect(() => {
  const isGpc = checkGpcSignal();
  if (isGpc) {
    // Automatically apply rejected consent when GPC signal is active
    updateGoogleConsent("rejected");
    try {
      localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {}
    setVisible(false);
    return;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Choice | null;
    if (stored) {
      updateGoogleConsent(stored);
    } else {
      setVisible(true);
    }
  } catch {
    setVisible(true);
  }
}, []);
```

#### Verification Step:
Run in DevTools Console:
```javascript
Object.defineProperty(navigator, 'globalPrivacyControl', { value: true, configurable: true });
```
Refresh the page and verify that consent is automatically set to `denied` and no analytics tracking occurs.

---

### Task 3: Add Interactive "Cookie Preferences" Link in Footer

**Goal:** Allow users to reopen the consent banner to change or revoke their consent choices at any time (CCPA / CPRA compliance).

#### Step 3.1: Add Custom Event Dispatcher in `CookieConsent.tsx`
```typescript
useEffect(() => {
  const handleOpen = () => setVisible(true);
  window.addEventListener("open-cookie-preferences", handleOpen);
  return () => window.removeEventListener("open-cookie-preferences", handleOpen);
}, []);
```

#### Step 3.2: Update `frontend/src/components/site/Footer.tsx`
Add the "Cookie Preferences" link to the Legal column or bottom copyright bar:

```tsx
<button
  type="button"
  onClick={() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  }}
  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline text-left cursor-pointer"
>
  Cookie Preferences
</button>
```

#### Verification Step:
1. Accept or reject the initial banner (banner disappears).
2. Scroll to the footer and click **Cookie Preferences**.
3. Verify the cookie consent banner re-appears immediately.

---

### Task 4: Enforce HSTS and Security Response Headers in `web.config`

**Goal:** Add HTTP Strict Transport Security (HSTS) and standard defensive headers to IIS `web.config`.

#### Step 4.1: Update `web.config`
Add `<httpProtocol>` with `<customHeaders>` inside `<system.webServer>`:

```xml
<!-- Security Response Headers (with duplicate removal safeguard) -->
<httpProtocol>
    <customHeaders>
        <remove name="Strict-Transport-Security" />
        <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains; preload" />
        <remove name="X-Content-Type-Options" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <remove name="X-Frame-Options" />
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <remove name="Referrer-Policy" />
        <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
    </customHeaders>
</httpProtocol>
```

#### Verification Step:
Execute via PowerShell:
```powershell
$res = Invoke-WebRequest -Uri "https://innrly.com" -Method Head
$res.Headers["Strict-Transport-Security"]
$res.Headers["X-Content-Type-Options"]
```
Expected output: `max-age=31536000; includeSubDomains; preload` and `nosniff`.

---

## 🖥️ Phase 2: Server & Infrastructure Hardening

### Task 5: Disable Plain FTP (Port 21) on Windows Server (`13.65.148.90`)

**Goal:** Close unencrypted FTP (Port 21) across all 7 affected hosts (`innrly.com`, `www.innrly.com`, `demo2.innrly.com`, `qhotels.co`, etc.).

#### Step 5.1: Execute PowerShell on `13.65.148.90` (Run as Administrator)
```powershell
# 1. Stop and permanently disable Microsoft FTP Service
Stop-Service -Name "ftpsvc" -ErrorAction SilentlyContinue
Set-Service -Name "ftpsvc" -StartupType Disabled -ErrorAction SilentlyContinue

# 2. Add Windows Defender Firewall Inbound Block for Port 21
New-NetFirewallRule -DisplayName "Block Plain FTP (Port 21)" `
    -Direction Inbound `
    -LocalPort 21 `
    -Protocol TCP `
    -Action Block
```

#### Verification Step:
From an external computer:
```powershell
Test-NetConnection -ComputerName innrly.com -Port 21
Test-NetConnection -ComputerName 13.65.148.90 -Port 21
```
Expected output: `TcpTestSucceeded : False`.

---

### Task 6: Restrict Microsoft SQL Port 1433 on `13.65.148.90`

**Goal:** Prevent public internet scanners from accessing MS SQL Port 1433 while ensuring legitimate applications continue to connect uninterrupted.

#### Step 6.1: Identify Active Connecting IPs in SQL Server Management Studio (SSMS)
```sql
SELECT 
    client_net_address AS [Connecting_IP],
    COUNT(*) AS [Active_Connections]
FROM sys.dm_exec_connections
WHERE client_net_address IS NOT NULL AND client_net_address != '<local machine>'
GROUP BY client_net_address;
```

#### Step 6.2: Restrict Inbound Port 1433 in Azure NSG & Windows Firewall
1. In **Azure Portal** ➔ VM `13.65.148.90` ➔ **Networking** ➔ **Inbound Port Rules**:
   - Edit Port 1433 Rule: Change Source from `Any` (`*`) to `IP Addresses` (enter specific web server IP list).
2. In **Windows Defender Firewall** on `13.65.148.90`:
```powershell
# Block public 0.0.0.0/0 on 1433 while allowing localhost/internal subnet
New-NetFirewallRule -DisplayName "Restrict Public MS SQL (Port 1433)" `
    -Direction Inbound `
    -LocalPort 1433 `
    -Protocol TCP `
    -RemoteAddress 127.0.0.1, 10.0.0.0/8, 192.168.0.0/16 `
    -Action Allow
```

#### Verification Step:
From an unauthorized external IP:
```powershell
Test-NetConnection -ComputerName 13.65.148.90 -Port 1433
```
Expected output: `TcpTestSucceeded : False`.

---

### Task 7: Bind MySQL to Localhost & Block Port 3306 on Linux Server (`144.76.101.11`)

**Goal:** Secure MySQL on the secondary backend host (`144.76.101.11`).

#### Step 7.1: Bind MySQL to `127.0.0.1` and Block Inbound Port 3306
SSH into `144.76.101.11` and execute:
```bash
# 1. Ensure MySQL listens only on localhost
sudo sed -i 's/^bind-address.*/bind-address = 127.0.0.1/' /etc/mysql/mysql.conf.d/mysqld.cnf 2>/dev/null || true
sudo sed -i 's/^bind-address.*/bind-address = 127.0.0.1/' /etc/mysql/my.cnf 2>/dev/null || true
sudo systemctl restart mysql || sudo systemctl restart mariadb

# 2. Block external Port 3306 in UFW firewall
sudo ufw deny 3306/tcp
sudo ufw reload
```

#### Verification Step:
```bash
# Verify MySQL is listening only on 127.0.0.1
sudo netstat -tlpn | grep 3306
# From external machine:
nc -zv 144.76.101.11 3306
```
Expected: Connection refused / timed out.

---

### Task 8: Enforce 301 HTTPS Redirection Across Subdomains

**Goal:** Ensure all 10 Innrly subdomains (`ob.innrly.com`, `scheduler.innrly.com`, `api.innrly.com`, `demo.innrly.com`, `timeclock.innrly.com`, etc.) automatically redirect unencrypted HTTP traffic to HTTPS.

#### Step 8.1: Cloudflare Edge SSL Redirection (If DNS is managed via Cloudflare)
1. Navigate to **Cloudflare Dashboard** ➔ `innrly.com` ➔ **SSL/TLS** ➔ **Edge Certificates**.
2. Toggle **Always Use HTTPS** to **ON**.
3. Toggle **Automatic HTTPS Rewrites** to **ON**.

#### Step 8.2: Verification Script
```powershell
$subdomains = @(
    "innrly.com", "www.innrly.com", "ob.innrly.com", "scheduler.innrly.com",
    "demo.innrly.com", "demoapi.innrly.com", "demo2.innrly.com",
    "api.innrly.com", "timeclock.innrly.com", "h2pdf.innrly.com"
)

foreach ($sub in $subdomains) {
    try {
        $res = Invoke-WebRequest -Uri "http://$sub" -MaximumRedirection 0 -ErrorAction SilentlyContinue
        Write-Host "$sub : HTTP $($res.StatusCode) -> $($res.Headers.Location)" -ForegroundColor Green
    } catch {
        Write-Host "$sub : Handled" -ForegroundColor Yellow
    }
}
```
Expected: Status `301` or `308` redirecting to `https://...`.

---

## 📋 Execution Checklist & Tracking

```markdown
- [x] Task 1: Add Google Consent Mode v2 default denial in run-server.mjs and __root.tsx [Web Developer]
- [x] Task 2: Implement navigator.globalPrivacyControl signal handling in CookieConsent.tsx [Web Developer]
- [x] Task 3: Add "Cookie Preferences" modal reopen link in Footer.tsx [Web Developer]
- [x] Task 4: Add Strict-Transport-Security (HSTS) and security headers in web.config [Web Developer / DevOps]
- [ ] Task 5: Stop ftpsvc & block Port 21 in Windows Firewall on 13.65.148.90 [DevOps / Infrastructure]
- [ ] Task 6: Restrict Port 1433 in Azure NSG and Windows Firewall on 13.65.148.90 [DevOps / DBA]
- [ ] Task 7: Bind MySQL to 127.0.0.1 & block Port 3306 in UFW on 144.76.101.11 [DevOps / Infrastructure]
- [ ] Task 8: Enable Cloudflare "Always Use HTTPS" across all Innrly subdomains [DevOps / Edge DNS]
```

INNRLY.COM DEVELOPER PACK (final, Nov 24, 2026; updated 11 AM CT with Vimal's answers)
Every item was rechecked on the live site over HTTPS on Nov 24, 2026 (morning, Central time). Nothing was changed on the site by us.

Dev-Ticket-Checklist.xlsx        All tickets in priority order: problem, URL, exact fix, verify command, owner, status (dropdown).
                                 Sheet 2 lists items already fixed or dropped (incl. the HTTP 500 false positive).
                                 Sheet 3 lists Vimal's 6 decisions and which tickets they change. New tickets: D18 (go-live claims), D19 (phone support).
robots.txt-innrly.com.txt        Deploy as https://innrly.com/robots.txt (text/plain). Allows all search and AI crawlers.
robots.txt-app.innrly.com.txt    Deploy as https://app.innrly.com/robots.txt (text/plain) + X-Robots-Tag: noindex, nofollow.
llms.txt                         Deploy as https://innrly.com/llms.txt (text/plain, UTF-8). Every link returns 200 today.
schema-jsonld-snippets.html      JSON-LD blocks to paste: Organization, WebSite (no SearchAction), SoftwareApplication, Product, BlogPosting, BreadcrumbList.
Redirect-404-Map.csv             301s/new files to add now, URLs NOT to create, and the "after GSC" merge list (do not do those yet).

Decided (Vimal, Nov 24):
- Starter $199 and Professional $299 are both PER PROPERTY per month (+$299 setup on monthly; annual saves 25% and waives setup).
- Go-live is 2–4 weeks. Every "one business day" / "less than 14 days" / similar go-live claim becomes 2–4 weeks (D5, D18).
- /login 301 -> https://app.innrly.com (D2).
- Website: no phone number, except the support number 833-311-0777 on /pricing for the package(s) that include phone support (D19).
Still open with Vimal: which GA4 ID to keep (D13/V3); which package(s) include phone support (D19/V4).

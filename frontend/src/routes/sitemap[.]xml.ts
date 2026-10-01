import { createFileRoute } from "@tanstack/react-router";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" | string;
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const base = (process.env.SITE_URL || "https://innrly.com").replace(/\/+$/, "");
        const legalDate = "2026-06-06";

        // Default static entries
        const defaultEntries: SitemapEntry[] = [
          // Core Marketing Pages
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/features", changefreq: "monthly", priority: "0.9" },
          { path: "/pricing", changefreq: "monthly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.9" },
          { path: "/onboarding", changefreq: "monthly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/security", changefreq: "monthly", priority: "0.7" },
          { path: "/developers", changefreq: "monthly", priority: "0.6" },
          { path: "/roi-calculator", changefreq: "monthly", priority: "0.8" },
          { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/blog/innrly-joins-m3-partner-ecosystem-hotel-accounting-automation", changefreq: "monthly", priority: "0.9", lastmod: "2026-09-30" },
          { path: "/blog/best-hotel-accounting-software", changefreq: "monthly", priority: "0.9", lastmod: "2026-06-06" },
          { path: "/blog/hotel-back-office-automation", changefreq: "monthly", priority: "0.85", lastmod: "2026-05-25" },
          { path: "/blog/night-audit-automation", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-24" },
          { path: "/blog/multi-property-accounting-software", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-23" },
          { path: "/blog/ap-automation-hotels", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-22" },
          { path: "/blog/hotel-labor-cost-percentage", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-21" },
          { path: "/blog/innrly-vs-inn-flow", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-20" },
          { path: "/blog/hotel-budgeting-software-2026", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-19" },
          { path: "/blog/ota-reconciliation-guide", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-18" },
          { path: "/blog/select-service-back-office-savings", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-17" },
          { path: "/blog/mpor-explained", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-15" },
          { path: "/blog/hotel-night-audit-software-guide", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-14" },
          { path: "/blog/five-back-office-wins", changefreq: "yearly", priority: "0.6", lastmod: "2026-05-12" },
          { path: "/blog/quickbooks-for-hotels-limits", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-11" },
          { path: "/blog/hospitality-accounting-services-vs-software", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-09" },
          { path: "/blog/multi-property-hotel-accounting-software", changefreq: "monthly", priority: "0.8", lastmod: "2026-05-08" },
          { path: "/blog/labor-cost-blind-spots", changefreq: "yearly", priority: "0.6", lastmod: "2026-04-28" },
          { path: "/blog/ota-commission-audit", changefreq: "yearly", priority: "0.6", lastmod: "2026-04-04" },
          { path: "/blog/pms-vs-back-office-automation", changefreq: "monthly", priority: "0.85", lastmod: "2026-05-26" },
          { path: "/blog/hotel-night-audit-checklist", changefreq: "monthly", priority: "0.85", lastmod: "2026-05-28" },
          { path: "/blog/hotel-ota-commission-reconciliation", changefreq: "monthly", priority: "0.85", lastmod: "2026-05-27" },

          // Comparison Pages
          { path: "/compare", changefreq: "monthly", priority: "0.7" },
          { path: "/compare/innrly-vs-otelier", changefreq: "monthly", priority: "0.8" },
          { path: "/compare/innrly-vs-nimble", changefreq: "monthly", priority: "0.8" },
          { path: "/compare/innrly-vs-aptech", changefreq: "monthly", priority: "0.8" },
          { path: "/compare/innrly-vs-profitsage", changefreq: "monthly", priority: "0.8" },
          { path: "/compare/innrly-vs-actabl", changefreq: "monthly", priority: "0.8" },
          { path: "/compare/innrly-vs-hotel-effectiveness", changefreq: "monthly", priority: "0.8" },

          // Solutions
          { path: "/solutions/document-vault", changefreq: "monthly", priority: "0.8" },
          { path: "/solutions/expense-entries", changefreq: "monthly", priority: "0.8" },
          { path: "/solutions/business-intelligence", changefreq: "monthly", priority: "0.85" },
          { path: "/solutions/financial-control", changefreq: "monthly", priority: "0.85" },
          { path: "/solutions/operations-automation", changefreq: "monthly", priority: "0.85" },
          { path: "/solutions/innrly-pay", changefreq: "monthly", priority: "0.85" },
          { path: "/solutions/innrly-shift", changefreq: "monthly", priority: "0.85" },
          { path: "/solutions/reconciliation", changefreq: "monthly", priority: "0.9" },
          { path: "/solutions/labor-workforce", changefreq: "monthly", priority: "0.85" },

          // Services
          { path: "/services/accountability-pack", changefreq: "monthly", priority: "0.8" },

          // Integrations
          { path: "/integrations", changefreq: "monthly", priority: "0.85" },
          { path: "/integrations/m3", changefreq: "monthly", priority: "0.9" },
          { path: "/integrations/quickbooks", changefreq: "monthly", priority: "0.9" },
          { path: "/integrations/sage-intacct", changefreq: "monthly", priority: "0.8" },
          { path: "/integrations/inn-flow", changefreq: "monthly", priority: "0.9" },
          { path: "/integrations/opera", changefreq: "monthly", priority: "0.85" },
          { path: "/integrations/cloudbeds", changefreq: "monthly", priority: "0.8" },
          { path: "/integrations/mews", changefreq: "monthly", priority: "0.8" },

          // Industries
          { path: "/industries/select-service", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/full-service", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/extended-stay", changefreq: "monthly", priority: "0.8" },

          // Case Studies
          { path: "/case-studies/midwest-portfolio", changefreq: "yearly", priority: "0.75" },
          { path: "/case-studies/urban-full-service", changefreq: "yearly", priority: "0.75" },
          { path: "/case-studies/hilton-management-company", changefreq: "yearly", priority: "0.75" },
          { path: "/case-studies/extended-stay-portfolio", changefreq: "yearly", priority: "0.75" },
          { path: "/case-studies/boutique-group", changefreq: "yearly", priority: "0.75" },

          // Glossary
          { path: "/glossary", changefreq: "monthly", priority: "0.7" },

          // Legal
          { path: "/legal/privacy", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
          { path: "/legal/terms", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
          { path: "/legal/subscription", changefreq: "yearly", priority: "0.4", lastmod: legalDate },
          { path: "/legal/security", changefreq: "yearly", priority: "0.4", lastmod: legalDate },
          { path: "/legal/cookies", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
          { path: "/legal/accessibility", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
        ];

        let finalEntries: SitemapEntry[] = [];

        try {
          const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8005";
          const res = await fetch(`${backendUrl}/api/sitemap-entries`);
          if (res.ok) {
            const data = await res.json();
            const seoMap = data.seo_map || {};
            const blogs = data.blogs || [];

            // 1. Process static pages with DB overrides
            defaultEntries.forEach((entry) => {
              const dbRow = seoMap[entry.path];
              // If DB row exists and in_sitemap is false (0 or false), exclude
              if (dbRow && (dbRow.in_sitemap === 0 || dbRow.in_sitemap === false)) {
                return; // Excluded by admin
              }

              finalEntries.push({
                path: entry.path,
                changefreq: (dbRow && dbRow.changefreq) || entry.changefreq,
                priority: (dbRow && dbRow.priority) || entry.priority,
                lastmod: entry.lastmod
              });
            });

            // 2. Process dynamic blogs from database
            blogs.forEach((b: any) => {
              if (b.in_sitemap === 0 || b.in_sitemap === false) {
                return; // Excluded by admin
              }
              const lastmod = b.updated_at ? String(b.updated_at).slice(0, 10) : (b.created_at ? String(b.created_at).slice(0, 10) : undefined);
              finalEntries.push({
                path: `/blog/${b.slug}`,
                changefreq: "monthly",
                priority: "0.8",
                lastmod
              });
            });
          } else {
            finalEntries = defaultEntries;
          }
        } catch (e) {
          finalEntries = defaultEntries;
        }

        const urls = finalEntries.map((e) =>
          [
            `  <url>`,
            `    <loc>${base}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

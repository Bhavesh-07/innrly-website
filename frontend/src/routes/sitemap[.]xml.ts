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

        // Default static marketing entries (blogs are dynamically loaded from DB)
        const defaultEntries: SitemapEntry[] = [
          // Core Marketing Pages
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: legalDate },
          { path: "/features", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/pricing", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/contact", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/onboarding", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/about", changefreq: "monthly", priority: "0.7", lastmod: legalDate },
          { path: "/security", changefreq: "monthly", priority: "0.7", lastmod: legalDate },
          { path: "/developers", changefreq: "monthly", priority: "0.6", lastmod: legalDate },
          { path: "/roi-calculator", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/case-studies", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: legalDate },

          // Comparison Pages
          { path: "/compare", changefreq: "monthly", priority: "0.7", lastmod: legalDate },
          { path: "/compare/innrly-vs-otelier", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/compare/innrly-vs-nimble", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/compare/innrly-vs-aptech", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/compare/innrly-vs-profitsage", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/compare/innrly-vs-actabl", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/compare/innrly-vs-hotel-effectiveness", changefreq: "monthly", priority: "0.8", lastmod: legalDate },

          // Solutions
          { path: "/solutions/document-vault", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/solutions/expense-entries", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/solutions/business-intelligence", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/solutions/financial-control", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/solutions/operations-automation", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/solutions/innrly-pay", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/solutions/innrly-shift", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/solutions/reconciliation", changefreq: "monthly", priority: "0.9", lastmod: legalDate },

          // Services
          { path: "/services/accountability-pack", changefreq: "monthly", priority: "0.8", lastmod: legalDate },

          // Integrations
          { path: "/integrations", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/integrations/m3", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/integrations/quickbooks", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/integrations/sage-intacct", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/integrations/inn-flow", changefreq: "monthly", priority: "0.9", lastmod: legalDate },
          { path: "/integrations/opera", changefreq: "monthly", priority: "0.85", lastmod: legalDate },
          { path: "/integrations/cloudbeds", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/integrations/mews", changefreq: "monthly", priority: "0.8", lastmod: legalDate },

          // Industries
          { path: "/industries/select-service", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/industries/full-service", changefreq: "monthly", priority: "0.8", lastmod: legalDate },
          { path: "/industries/extended-stay", changefreq: "monthly", priority: "0.8", lastmod: legalDate },

          // Case Studies
          { path: "/case-studies/midwest-portfolio", changefreq: "yearly", priority: "0.75", lastmod: legalDate },
          { path: "/case-studies/urban-full-service", changefreq: "yearly", priority: "0.75", lastmod: legalDate },
          { path: "/case-studies/hilton-management-company", changefreq: "yearly", priority: "0.75", lastmod: legalDate },
          { path: "/case-studies/extended-stay-portfolio", changefreq: "yearly", priority: "0.75", lastmod: legalDate },
          { path: "/case-studies/boutique-group", changefreq: "yearly", priority: "0.75", lastmod: legalDate },

          // Glossary
          { path: "/glossary", changefreq: "monthly", priority: "0.7", lastmod: legalDate },

          // Legal
          { path: "/legal/privacy", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
          { path: "/legal/terms", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
          { path: "/legal/subscription", changefreq: "yearly", priority: "0.4", lastmod: legalDate },
          { path: "/legal/security", changefreq: "yearly", priority: "0.4", lastmod: legalDate },
          { path: "/legal/cookies", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
          { path: "/legal/accessibility", changefreq: "yearly", priority: "0.3", lastmod: legalDate },
        ];

        const entryMap = new Map<string, SitemapEntry>();

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

              entryMap.set(entry.path, {
                path: entry.path,
                changefreq: (dbRow && dbRow.changefreq) || entry.changefreq,
                priority: (dbRow && dbRow.priority) || entry.priority,
                lastmod: entry.lastmod || legalDate
              });
            });

            // 2. Process dynamic blogs from database
            blogs.forEach((b: any) => {
              if (b.in_sitemap === 0 || b.in_sitemap === false) {
                return; // Excluded by admin
              }
              const lastmod = b.updated_at ? String(b.updated_at).slice(0, 10) : (b.created_at ? String(b.created_at).slice(0, 10) : legalDate);
              const blogPath = `/blog/${b.slug}`;
              entryMap.set(blogPath, {
                path: blogPath,
                changefreq: "monthly",
                priority: "0.8",
                lastmod
              });
            });
          } else {
            defaultEntries.forEach((entry) => {
              entryMap.set(entry.path, { ...entry, lastmod: entry.lastmod || legalDate });
            });
          }
        } catch (e) {
          defaultEntries.forEach((entry) => {
            entryMap.set(entry.path, { ...entry, lastmod: entry.lastmod || legalDate });
          });
        }

        const finalEntries = Array.from(entryMap.values());

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

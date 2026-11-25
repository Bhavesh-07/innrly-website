-- =============================================================================
-- Innrly Production Database Migration: Developer Pack Fixes (2026-11-25)
-- Corresponding to Client Developer Pack 2026-11-24 (Tickets D1, D3, D5, D11)
-- =============================================================================

USE innrly_leads;

-- D1: Fix broken relative blog link in exception-based-hotel-back-office-automation
UPDATE blogs 
SET content = REPLACE(content, '../blog/ota-reconciliation', '/blog/ota-reconciliation-guide')
WHERE id = 56;

UPDATE blogs 
SET content = REPLACE(content, '/blog/ota-reconciliation"', '/blog/ota-reconciliation-guide"')
WHERE id = 56;

-- D1: Fix broken relative link in select-service-revenue-protection
UPDATE blogs 
SET content = REPLACE(content, 'href="Select-Service%20Hotels"', 'href="/industries/select-service"')
WHERE content LIKE '%Select-Service%20Hotels%';

UPDATE blogs 
SET content = REPLACE(content, 'href="Select-Service Hotels"', 'href="/industries/select-service"')
WHERE content LIKE '%Select-Service Hotels%';

-- D3: Remove Hotel Effectiveness from integrations list (competitor, not integration)
DELETE FROM integrations 
WHERE name = 'Hotel Effectiveness' OR slug = 'hotel-effectiveness';

-- D5: Update /onboarding SEO meta description to remove timing promises
UPDATE seo_settings 
SET description = 'Start your Innrly 90-day free trial. Add your company, users and properties; our team pairs your PMS and maps your chart of accounts.',
    og_description = 'Start your Innrly 90-day free trial. Add your company, users and properties; our team pairs your PMS and maps your chart of accounts.'
WHERE page_path = '/onboarding';

-- D11: Update robots_txt in site_settings to allow AI crawlers
UPDATE site_settings
SET value = 'User-agent: *\nAllow: /\n\n# AI Crawlers explicitly allowed\nUser-agent: Google-Extended\nAllow: /\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: CCBot\nAllow: /\nUser-agent: Applebot-Extended\nAllow: /\nUser-agent: Amazonbot\nAllow: /\n\nDisallow: /admin/\nDisallow: /control-hub/\nDisallow: /api/\n\nSitemap: https://innrly.com/sitemap.xml\n'
WHERE `key` = 'robots_txt';

-- Verify results
SELECT id, slug, title FROM blogs WHERE id = 56;
SELECT id, name, slug FROM integrations WHERE name = 'Hotel Effectiveness';
SELECT page_path, description FROM seo_settings WHERE page_path = '/onboarding';
SELECT `key`, length(value) FROM site_settings WHERE `key` = 'robots_txt';

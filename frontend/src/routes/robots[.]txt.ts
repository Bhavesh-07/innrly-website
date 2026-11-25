import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        let content = `# robots.txt for https://innrly.com
User-agent: *
Allow: /
Disallow: /control-hub
Disallow: /control-hub/
Disallow: /api/admin/

User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Bingbot
User-agent: Applebot
User-agent: DuckAssistBot
Allow: /
Disallow: /control-hub
Disallow: /control-hub/
Disallow: /api/admin/

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
Allow: /
Disallow: /control-hub
Disallow: /control-hub/
Disallow: /api/admin/

Sitemap: https://innrly.com/sitemap.xml
`;

        try {
          const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8005";
          const res = await fetch(`${backendUrl}/api/robots-txt`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.content) {
              content = data.content;
            }
          }
        } catch (e) {
          // Fallback to default
        }

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

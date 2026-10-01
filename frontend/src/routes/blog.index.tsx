import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { ArrowRight } from "lucide-react";
import { defaultSeoData, fetchSeoData, getMetaTags } from "@/lib/seo";

interface BlogPostItem {
  id?: number | string;
  title: string;
  slug: string;
  summary: string;
  created_at: string;
}

const STATIC_POSTS: BlogPostItem[] = [
  {
    slug: "innrly-joins-m3-partner-ecosystem-hotel-accounting-automation",
    title: "INNRLY Joins M3's Partner Ecosystem: What It Means for Hotel Accounting Automation",
    created_at: "2026-09-30",
    summary: "INNRLY is now an M3 Associate Partner. Here's how the M3 Accounting Core integration brings invoice capture and automatic GL coding to hotel back-office workflows.",
  },
  {
    slug: "best-hotel-accounting-software",
    title: "Best Hotel Accounting Software for Multi-Property Operators (2026)",
    created_at: "2026-06-06",
    summary: "An honest 2026 buyer's guide to hotel accounting software — M3, Sage Intacct, QuickBooks, Inn-Flow, Aptech — and where a PMS-agnostic automation layer like Innrly fits on top.",
  },
  {
    slug: "hotel-back-office-automation",
    title: "Hotel Back-Office Automation: The Complete 2026 Guide",
    created_at: "2026-05-25",
    summary: "What hotel back-office automation actually replaces, how much time it saves per property, and how to evaluate platforms across multi-property portfolios.",
  },
  {
    slug: "night-audit-automation",
    title: "Night Audit Automation: Eliminate the 2 AM Excel Marathon",
    created_at: "2026-05-24",
    summary: "What night audit automation replaces, how it normalizes data across Choice, Wyndham, Hilton, and IHG, and how to deploy across a multi-brand portfolio.",
  },
  {
    slug: "multi-property-accounting-software",
    title: "Multi-Property Hotel Accounting Software: The 2026 Buyer's Guide",
    created_at: "2026-05-23",
    summary: "M3 vs Sage Intacct vs QuickBooks vs all-in-one suites — a real evaluation framework for portfolios of 5, 15, and 25+ properties.",
  },
  {
    slug: "ap-automation-hotels",
    title: "A/P Automation for Hotels: Capture, Code, Approve, Pay",
    created_at: "2026-05-22",
    summary: "How hotel A/P automation captures invoices across email, paper, and portals — coding, approval routing, and ACH/check pay with full audit trail.",
  },
  {
    slug: "hotel-labor-cost-percentage",
    title: "Hotel Labor Cost Percentage: Benchmarks, Formula, and How to Lower It",
    created_at: "2026-05-21",
    summary: "Benchmarks by segment, the formula that actually matters, and the five levers that reliably move hotel labor cost percentage down 2–5 points.",
  },
  {
    slug: "innrly-vs-inn-flow",
    title: "Innrly + Inn-Flow: The Automation Layer for Your Inn-Flow GL",
    created_at: "2026-05-20",
    summary: "How Innrly sits in front of Inn-Flow as the automation layer — invoice capture, OTA reconciliation, night audit, and labor — while Inn-Flow stays your accounting system of record.",
  },
  {
    slug: "hotel-night-audit-checklist",
    title: "The Hotel Night Audit Checklist Every Multi-Property Operator Should Use",
    created_at: "2026-05-28",
    summary: "An 8-step night audit checklist that works across OnQ, Opera, choiceADVANTAGE, Cloudbeds, and Mews — and how to automate it across the portfolio.",
  },
  {
    slug: "hotel-ota-commission-reconciliation",
    title: "Hotel OTA Commission Reconciliation: Recover 1–3% of Revenue You're Already Owed",
    created_at: "2026-05-27",
    summary: "Where Expedia, Booking.com, and Hotels.com routinely overcharge — and how to line-match statements to PMS reservations to recover what you're owed.",
  },
  {
    slug: "pms-vs-back-office-automation",
    title: "Hotel PMS vs Back-Office Automation: What's the Difference?",
    created_at: "2026-05-26",
    summary: "A Property Management System runs the front desk. Back-office automation runs the money. Here's how the two layers fit together — and why hotel management software shoppers need both.",
  },
  {
    slug: "hotel-budgeting-software-2026",
    title: "Hotel Budgeting Software: The 2026 Buyer's Guide",
    created_at: "2026-05-19",
    summary: "What multi-property hotel operators should look for in budgeting software in 2026 — variance tracking, USALI alignment, and PMS-agnostic forecasting.",
  },
  {
    slug: "select-service-back-office-savings",
    title: "How Select-Service Portfolios Save 5–15 Hours and $200–500 Per Hotel Each Week",
    created_at: "2026-05-17",
    summary: "What changes when night-audit packs get reviewed automatically for anomalies and the transactions that need attention surface in one queue.",
  },
  {
    slug: "mpor-explained",
    title: "MPOR Explained: The Labor Metric Hotel GMs Should Track Daily",
    created_at: "2026-05-15",
    summary: "Minutes per occupied room is the labor metric that actually maps to housekeeping reality — here's how to track and act on it.",
  },
  {
    slug: "quickbooks-for-hotels-limits",
    title: "QuickBooks for Hotels: Why Multi-Property Operators Outgrow It",
    created_at: "2026-05-11",
    summary: "QuickBooks is fine for one or two hotels. Beyond that, the property dimension, PMS reconciliation, and USALI reporting gaps start to hurt.",
  },
  {
    slug: "hospitality-accounting-services-vs-software",
    title: "Hospitality Accounting Services vs Software: Which Saves More?",
    created_at: "2026-05-09",
    summary: "Outsourced hospitality accounting services or PMS-agnostic software — a real cost comparison for portfolios of 3, 10, and 25+ properties.",
  },
  {
    slug: "ota-reconciliation-guide",
    title: "OTA Reconciliation: How to Catch Commission Errors Automatically",
    created_at: "2026-05-18",
    summary: "A complete guide to OTA commission reconciliation — what to match, what to flag, and how multi-property hotels recover 1–3% of OTA revenue.",
  },
  {
    slug: "hotel-night-audit-software-guide",
    title: "Hotel Night Audit Software: A 2026 Buyer's Guide",
    created_at: "2026-05-14",
    summary: "What to look for in hotel night audit software when you operate 5, 20, or 100 properties across multiple PMSes and brands.",
  },
  {
    slug: "multi-property-hotel-accounting-software",
    title: "Multi-Property Hotel Accounting Software: PMS-Agnostic Workflows",
    created_at: "2026-05-08",
    summary: "Why multi-property hotel accounting breaks at scale — and the workflow changes that fix it without forcing a single PMS.",
  },
  {
    slug: "five-back-office-wins",
    title: "Five back-office wins for hotel operators in 2026",
    created_at: "2026-05-12",
    summary: "Quick wins that take a week to implement and pay back inside a month.",
  },
  {
    slug: "labor-cost-blind-spots",
    title: "The three labor-cost blind spots eating your margin",
    created_at: "2026-04-28",
    summary: "Why MPOR matters more than your PMS dashboard says it does.",
  },
  {
    slug: "ota-commission-audit",
    title: "How to audit OTA commissions without spreadsheets",
    created_at: "2026-04-04",
    summary: "A repeatable monthly process for catching the errors that always slip through.",
  },
];

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    let posts: BlogPostItem[] = [];
    try {
      const baseUrl = typeof window === "undefined" ? (process.env.BACKEND_URL || "http://127.0.0.1:8005") : "/api";
      const res = await fetch(`${baseUrl}/blog`);
      if (res.ok) {
        const data = await res.json();
        const dbPosts = (data || [])
          .filter((p: any) => p.status === 'published')
          .map((p: any) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            summary: p.summary || "",
            created_at: p.created_at,
          }));
        if (dbPosts.length > 0) {
          const dbSlugs = new Set(dbPosts.map((p: any) => p.slug));
          const remainingStatic = STATIC_POSTS.filter(s => !dbSlugs.has(s.slug));
          posts = [...dbPosts, ...remainingStatic];
        }
      }
    } catch (e) {
      console.error("Failed to fetch blogs", e);
    }
    if (posts.length === 0) {
      posts = STATIC_POSTS;
    }
    const seo = await fetchSeoData("/blog");
    return { posts, seo };
  },
  component: BlogIndex,
  head: ({ loaderData }) => ({
    meta: [
      ...getMetaTags(
        loaderData?.seo || null,
        defaultSeoData["/blog"],
        "/blog"
      ),
    ],
    links: [{ rel: "canonical", href: "https://innrly.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Innrly Blog",
          url: "https://innrly.com/blog",
          description: "Operator-focused writing on hotel finance, labor, and analytics.",
          publisher: { "@type": "Organization", name: "Innrly" },
        }),
      },
    ],
  }),
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            From the <span className="text-gradient">Innrly team.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Operator-focused writing on hotel finance, labor, and analytics.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading title="Latest posts" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No published posts found.
            </div>
          ) : (
            posts.map((p) => (
              <article key={p.slug} className="aurora-card rounded-2xl p-6 flex flex-col">
                <time className="text-xs text-muted-foreground" dateTime={p.created_at}>
                  {new Date(p.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.summary}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  Read post <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))
          )}
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">
          More posts coming soon. Have a topic you want covered?{" "}
          <Link to="/contact" className="text-accent underline">
            Tell us
          </Link>
          .
        </p>
        <div className="mx-auto mt-16 max-w-2xl">
          <NewsletterSignup source="blog-index" />
        </div>
      </Section>
    </div>
  );
}

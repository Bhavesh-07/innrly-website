import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lock,
  ShieldCheck,
  KeyRound,
  FileSearch,
  Database,
  BellRing,
  ServerCog,
  Users,
} from "lucide-react";
import { Section, SectionHeading, CtaBand } from "@/components/site/Section";
import { defaultSeoData, fetchSeoData, getMetaTags, breadcrumbLd } from "@/lib/seo";

const pillars = [
  {
    icon: Lock,
    t: "Encryption everywhere",
    b: "TLS 1.2+ in transit. AES-256 at rest on every data store, backup, and replica.",
  },
  {
    icon: KeyRound,
    t: "Identity & access",
    b: "SSO (SAML/OIDC), enforced MFA, scoped roles per property and per module.",
  },
  {
    icon: FileSearch,
    t: "Full audit trail",
    b: "Every login, change, and export is recorded with actor, time, and source IP — exportable for SOC 1 / SOX review.",
  },
  {
    icon: Database,
    t: "Encrypted backups",
    b: "Encrypted daily backups with point-in-time recovery across geographically separate regions.",
  },
  {
    icon: ServerCog,
    t: "Tier-1 infrastructure",
    b: "Hosted on a top-tier cloud provider with isolated tenants, network segmentation, and DDoS protection.",
  },
  {
    icon: BellRing,
    t: "24/7 monitoring",
    b: "Continuous logging, anomaly detection, and a documented incident response plan with defined SLAs.",
  },
  {
    icon: Users,
    t: "Vendor management",
    b: "Every sub-processor reviewed for security, confidentiality, and data residency before going live.",
  },
  {
    icon: ShieldCheck,
    t: "Responsible disclosure",
    b: "Coordinated disclosure program. Report vulnerabilities to security@innrly.com — we respond within one business day.",
  },
];

const faqs = [
  {
    q: "Where is data hosted?",
    a: "Innrly runs on a tier-1 US cloud provider with multi-region replication and isolated tenant storage. Data residency can be discussed for enterprise portfolios.",
  },
  {
    q: "What compliance frameworks do you map to?",
    a: "Our controls are aligned with SOC 2 and PCI-DSS principles. We share our security documentation under NDA — email security@innrly.com.",
  },
  {
    q: "How do you handle PII?",
    a: "Guest PII stays within the PMS unless explicitly required. Innrly minimizes the PII surface and never sells or shares your data with third parties.",
  },
  {
    q: "How does Innrly protect biometric Face-ID timeclock data?",
    a: "Innrly never stores raw employee facial photos or images on the device or server. Instead, our on-device algorithm generates an encrypted mathematical vector hash that cannot be reverse-engineered into an image, complying with strict state biometric privacy regulations (including BIPA).",
  },
  {
    q: "What is your document retention and backup schedule?",
    a: "Night-audit packs, OCR invoices, and GL reconciliation logs are stored with AES-256 encryption. We maintain automated daily geo-redundant backups with a 99.9% uptime SLA and customizable data retention periods to match your audit requirements.",
  },
  {
    q: "Can I get a custom DPA or BAA?",
    a: "Yes. We sign standard data processing agreements and accommodate enterprise legal review on request.",
  },
];

export const Route = createFileRoute("/security")({
  component: Page,
  loader: async () => {
    const seo = await fetchSeoData("/security");
    return { seo };
  },
  head: ({ loaderData }) => ({
    meta: [
      ...getMetaTags(loaderData?.seo || null, defaultSeoData["/security"], "/security"),
    ],
    links: [{ rel: "canonical", href: "https://innrly.com/security" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Security", url: "/security" },
      ]),
    ],
  }),
});

function Page() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-90" aria-hidden />
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cta">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" aria-hidden />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">
            Security & trust
          </p>
          <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
            Hotel financial data deserves <span className="text-gradient">enterprise-grade</span>{" "}
            security.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            How Innrly protects every invoice, folio, payroll record, and bank deposit — across
            every property in your portfolio.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Eight pillars" title="How we protect your data." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.t} className="aurora-card rounded-2xl p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cta">
                <p.icon className="h-5 w-5 text-primary-foreground" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-12 border-t border-border/40">
        <SectionHeading
          eyebrow="Data Architecture"
          title="Tenant isolation & cryptographic controls."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="aurora-card rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground">Logical & Cryptographic Tenant Isolation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every hotel management company and property operates in isolated data partitions. Cross-tenant access is structurally barred at the database query layer through row-level security and strict tenant context verification on every API request.
            </p>
          </div>
          <div className="aurora-card rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground">Zero-Trust Network & Secret Management</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All internal services communicate over encrypted mTLS networks. Database credentials, API tokens for PMS connections, and sensitive encryption keys are rotated automatically and managed in dedicated hardware security modules (HSM).
            </p>
          </div>
          <div className="aurora-card rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground">Continuous Vulnerability Scanning & Pen-Testing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Innrly codebases undergo automated static analysis (SAST), software composition analysis (SCA) for dependencies, and dynamic vulnerability assessment. Third-party independent penetration tests are conducted annually.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-12 border-t border-border/40">
        <SectionHeading
          eyebrow="Governance"
          title="Compliance alignment & trusted infrastructure."
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Domain / Provider</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4">Security Certification</th>
                  <th className="px-6 py-4">Data Residency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-6 py-4 font-medium">Cloud Infrastructure (AWS / Azure)</td>
                  <td className="px-6 py-4 text-muted-foreground">Application hosting, distributed database, and object storage</td>
                  <td className="px-6 py-4 text-muted-foreground">SOC 1, SOC 2 Type II, ISO 27001, FedRAMP</td>
                  <td className="px-6 py-4 text-muted-foreground">United States (Multi-Region)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">OCR & Document Processing</td>
                  <td className="px-6 py-4 text-muted-foreground">Automated invoice and night audit document parsing</td>
                  <td className="px-6 py-4 text-muted-foreground">SOC 2 Type II, HIPAA, ISO 27001</td>
                  <td className="px-6 py-4 text-muted-foreground">United States (Zero Retention)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Transactional Email & Notifications</td>
                  <td className="px-6 py-4 text-muted-foreground">System alerts, audit summaries, and MFA verification</td>
                  <td className="px-6 py-4 text-muted-foreground">SOC 2 Type II, GDPR, CCPA Compliant</td>
                  <td className="px-6 py-4 text-muted-foreground">United States</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Telemetry & Error Monitoring</td>
                  <td className="px-6 py-4 text-muted-foreground">Real-time application performance and error diagnostics</td>
                  <td className="px-6 py-4 text-muted-foreground">SOC 2 Type II, ISO 27001</td>
                  <td className="px-6 py-4 text-muted-foreground">United States (PII Scrubbed)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section className="py-12 border-t border-border/40">
        <SectionHeading eyebrow="FAQ" title="What security teams ask us." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="aurora-card rounded-2xl p-6">
              <p className="text-sm font-semibold text-foreground">{f.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Have a security question or need our documentation? Email{" "}
          <a href="mailto:security@innrly.com" className="text-accent hover:underline">
            security@innrly.com
          </a>{" "}
          or read our{" "}
          <Link to="/legal/security" className="text-accent hover:underline">
            security overview
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title="Need our security pack?"
        subtitle="SOC 2 mapping, sub-processor list, and DPA template — available under NDA."
        primary={{ to: "/contact", label: "Request documentation" }}
        secondary={{ to: "/legal/security", label: "Read security overview" }}
      />
    </div>
  );
}

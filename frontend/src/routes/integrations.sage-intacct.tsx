import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, defaultSeoData, fetchSeoData, getMetaTags } from "@/lib/seo";
import { IntegrationLayout } from "@/components/site/IntegrationLayout";

const faqs = [
  {
    q: "How does Innrly integrate with Sage Intacct?",
    a: "Innrly connects with Sage Intacct to streamline back-office accounts payable, daily night audits, and bank reconciliations. Invoices auto-coded in Innrly push cleanly into your Sage Intacct General Ledger with all required multi-entity and dimension tags.",
  },
  {
    q: "Does Innrly support multi-entity Sage Intacct environments?",
    a: "Yes. Multi-property hotel management companies with multiple legal entities and shared charts of accounts can map each property's PMS, invoices, and bank feeds to its corresponding Sage Intacct entity, maintaining strict inter-company separation.",
  },
  {
    q: "Which dimensions can be mapped from Innrly to Sage Intacct?",
    a: "Innrly supports Sage Intacct standard and custom dimensions including Location, Department, Class, and Vendor, ensuring your management reporting and USALI financial statements remain fully synchronized and audit-ready.",
  },
  {
    q: "What stays in Sage Intacct versus Innrly?",
    a: "Sage Intacct remains your core system of record for the General Ledger, balance sheets, and tax reporting. Innrly operates in front of Sage Intacct as the back-office automation engine: OCR invoice extraction, night audit exception checks, OTA commission audits, and Face-ID labor tracking.",
  },
  {
    q: "How long does Sage Intacct integration take to set up?",
    a: "Standard Sage Intacct connection and chart of accounts mapping typically takes 1 to 2 weeks for multi-property portfolios, guided by our dedicated implementation team.",
  },
];

export const Route = createFileRoute("/integrations/sage-intacct")({
  component: Page,
  loader: async () => {
    const seo = await fetchSeoData("/integrations/sage-intacct");
    return { seo };
  },
  head: ({ loaderData }) => ({
    meta: [
      ...getMetaTags(
        loaderData?.seo || null,
        defaultSeoData["/integrations/sage-intacct"] || {
          title: "Innrly + Sage Intacct Integration | Innrly",
          description: "Connect Sage Intacct to Innrly for automated hotel GL coding, multi-entity accounting, night audit journals, and AP automation.",
        },
        "/integrations/sage-intacct"
      ),
      {
        property: "og:image:alt",
        content: "Innrly + Sage Intacct hotel back-office automation integration.",
      },
    ],
    links: [{ rel: "canonical", href: "https://innrly.com/integrations/sage-intacct" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Innrly + Sage Intacct",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://innrly.com/integrations/sage-intacct",
          offers: { "@type": "Offer", priceCurrency: "USD" },
        }),
      },
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
        { name: "Integrations", url: "/integrations" },
        { name: "Sage Intacct", url: "/integrations/sage-intacct" },
      ]),
    ],
  }),
});

function Page() {
  return (
    <IntegrationLayout
      partnerName="Sage Intacct"
      eyebrow="Integration · Sage Intacct"
      title={
        <>
          Innrly + Sage Intacct: <span className="text-gradient">Automated GL & AP</span> for multi-property hotels.
        </>
      }
      intro="Innrly works alongside Sage Intacct as your cloud accounting system of record. Auto-capture invoices, tag multi-entity dimensions, reconcile night audits, and push clean batches directly into your General Ledger."
      direction="push-only"
      directionLabel="Push-only · Invoices & Journals → Sage Intacct"
      whatItDoes={[
        {
          heading: "Capture & Auto-Code with Dimensions",
          body: "Invoices arrive via OCR and email-in. Innrly extracts line items and automatically applies your Sage Intacct chart of accounts and dimension tags (Location, Department, Class).",
        },
        {
          heading: "Multi-Entity Hotel Routing",
          body: "Support multi-property portfolios with distinct legal entities. Innrly maps property-level operational expenses to corresponding corporate entities without manual spreadsheet reconciliation.",
        },
        {
          heading: "Audit-Ready General Ledger Sync",
          body: "Push approved invoices, credit card expense tickets, and consolidated night-audit journals into Sage Intacct for effortless month-end closes.",
        },
      ]}
      flow={{
        from: "Invoices, Night Audits & OTA Statements arrive in Innrly",
        via: "OCR parsing, dimension tagging, and automated approval workflows",
        to: "Sync clean journal entries & bills into Sage Intacct GL",
      }}
      inScope={[
        "OCR invoice capture and line-item coding",
        "Automated dimension tagging (Location, Department, Class)",
        "Multi-entity chart of accounts mapping",
        "Pre-GL night audit and OTA variance auditing",
        "Approval hierarchies with full audit trails",
        "Face-ID labor tracking and MPOR analytics",
      ]}
      staysIn={{
        system: "Sage Intacct",
        items: [
          "General Ledger and core financial reporting",
          "Consolidated trial balances, P&L, and balance sheet statements",
          "Vendor check runs, ACH disbursements, and bank reconciliation",
          "Corporate tax compliance and financial records of record",
        ],
      }}
      faqs={faqs}
    />
  );
}

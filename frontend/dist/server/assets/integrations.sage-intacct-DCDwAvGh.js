import { t as faqs } from "./integrations.sage-intacct-DyiMTSgW.js";
import { t as IntegrationLayout } from "./IntegrationLayout-CvEzAAaS.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/integrations.sage-intacct.tsx?tsr-split=component
function Page() {
	return /* @__PURE__ */ jsx(IntegrationLayout, {
		partnerName: "Sage Intacct",
		eyebrow: "Integration · Sage Intacct",
		title: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Innrly + Sage Intacct: ",
			/* @__PURE__ */ jsx("span", {
				className: "text-gradient",
				children: "Automated GL & AP"
			}),
			" for multi-property hotels."
		] }),
		intro: "Innrly works alongside Sage Intacct as your cloud accounting system of record. Auto-capture invoices, tag multi-entity dimensions, reconcile night audits, and push clean batches directly into your General Ledger.",
		direction: "push-only",
		directionLabel: "Push-only · Invoices & Journals → Sage Intacct",
		whatItDoes: [
			{
				heading: "Capture & Auto-Code with Dimensions",
				body: "Invoices arrive via OCR and email-in. Innrly extracts line items and automatically applies your Sage Intacct chart of accounts and dimension tags (Location, Department, Class)."
			},
			{
				heading: "Multi-Entity Hotel Routing",
				body: "Support multi-property portfolios with distinct legal entities. Innrly maps property-level operational expenses to corresponding corporate entities without manual spreadsheet reconciliation."
			},
			{
				heading: "Audit-Ready General Ledger Sync",
				body: "Push approved invoices, credit card expense tickets, and consolidated night-audit journals into Sage Intacct for effortless month-end closes."
			}
		],
		flow: {
			from: "Invoices, Night Audits & OTA Statements arrive in Innrly",
			via: "OCR parsing, dimension tagging, and automated approval workflows",
			to: "Sync clean journal entries & bills into Sage Intacct GL"
		},
		inScope: [
			"OCR invoice capture and line-item coding",
			"Automated dimension tagging (Location, Department, Class)",
			"Multi-entity chart of accounts mapping",
			"Pre-GL night audit and OTA variance auditing",
			"Approval hierarchies with full audit trails",
			"Face-ID labor tracking and MPOR analytics"
		],
		staysIn: {
			system: "Sage Intacct",
			items: [
				"General Ledger and core financial reporting",
				"Consolidated trial balances, P&L, and balance sheet statements",
				"Vendor check runs, ACH disbursements, and bank reconciliation",
				"Corporate tax compliance and financial records of record"
			]
		},
		faqs
	});
}
//#endregion
export { Page as component };

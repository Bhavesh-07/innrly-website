import { i as getMetaTags, n as defaultSeoData, r as fetchSeoData } from "./seo-nXsTEiul.js";
import { t as fetchTestimonials } from "./testimonials-CodjVg-4.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/pricing.tsx
var $$splitComponentImporter = () => import("./pricing-Dqrk0wix.js");
var Route = createFileRoute("/pricing")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return {
			seo: await fetchSeoData("/pricing"),
			testimonials: await fetchTestimonials()
		};
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/pricing"], "/pricing"), {
			property: "og:image:alt",
			content: "Priced per door, not per seat. No per-user fees. 90-day trial."
		}],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/pricing"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Product",
				name: "Innrly Hotel Back-Office Platform",
				brand: {
					"@type": "Brand",
					name: "Innrly"
				},
				description: "Cloud-based hotel back-office automation and business intelligence.",
				offers: [
					{
						"@type": "Offer",
						name: "Starter",
						price: "199",
						priceCurrency: "USD",
						url: "https://innrly.com/pricing",
						description: "Starter plan, $199 per property per month. One-time $299 setup fee on monthly billing; setup waived and 25% saved on annual billing. 90-day free trial.",
						priceSpecification: {
							"@type": "UnitPriceSpecification",
							price: "199",
							priceCurrency: "USD",
							billingDuration: "P1M",
							unitText: "per property per month",
							referenceQuantity: {
								"@type": "QuantitativeValue",
								value: 1,
								unitText: "property"
							}
						}
					},
					{
						"@type": "Offer",
						name: "Professional",
						price: "299",
						priceCurrency: "USD",
						url: "https://innrly.com/pricing",
						description: "Professional plan, $299 per property per month. One-time $299 setup fee on monthly billing; setup waived and 25% saved on annual billing. 90-day free trial.",
						priceSpecification: {
							"@type": "UnitPriceSpecification",
							price: "299",
							priceCurrency: "USD",
							billingDuration: "P1M",
							unitText: "per property per month",
							referenceQuantity: {
								"@type": "QuantitativeValue",
								value: 1,
								unitText: "property"
							}
						}
					},
					{
						"@type": "Offer",
						name: "Innrly Shift add-on",
						price: "149",
						priceCurrency: "USD",
						url: "https://innrly.com/pricing",
						description: "Labor add-on for Starter or Professional: scheduling, Face-ID TimeClock, housekeeping productivity and payroll export. $149 per property per month.",
						priceSpecification: {
							"@type": "UnitPriceSpecification",
							price: "149",
							priceCurrency: "USD",
							billingDuration: "P1M",
							unitText: "per property per month",
							referenceQuantity: {
								"@type": "QuantitativeValue",
								value: 1,
								unitText: "property"
							}
						}
					}
				]
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: [
					{
						"@type": "Question",
						name: "What does the setup fee cover?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Onboarding, PMS and accounting connections, chart-of-accounts mapping, and a guided launch with a dedicated implementation specialist."
						}
					},
					{
						"@type": "Question",
						name: "Is there a minimum portfolio size?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "No — Starter works for a single property. Most operators start with 1–5 hotels and expand from there."
						}
					},
					{
						"@type": "Question",
						name: "Can I cancel anytime?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Monthly plans have no annual contract — cancel anytime. Annual plans get a 25% discount (and Innrly Pay included free on Professional) in exchange for a 12-month commitment."
						}
					},
					{
						"@type": "Question",
						name: "Do I need to change my PMS or accounting system?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "No. Innrly sits on top of your existing stack — you keep your PMS, accounting, payroll, and credentials."
						}
					}
				]
			})
		}]
	})
});
//#endregion
export { Route as t };

import { i as getMetaTags, n as defaultSeoData, r as fetchSeoData } from "./seo-nXsTEiul.js";
import { t as fetchTestimonials } from "./testimonials-CodjVg-4.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-DlipRaNs.js");
var Route = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return {
			seo: await fetchSeoData("/"),
			testimonials: await fetchTestimonials()
		};
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/"], "/"), {
			property: "og:image:alt",
			content: "You sleep. Innrly works. — back-office automation for 200+ hotels."
		}],
		links: [{
			rel: "canonical",
			href: "https://innrly.com"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				"@id": "https://innrly.com/#software",
				name: "Innrly",
				url: "https://innrly.com/",
				applicationCategory: "BusinessApplication",
				applicationSubCategory: "Hotel back-office software",
				operatingSystem: "Web, iOS, Android",
				description: "Hotel back-office automation and business intelligence for multi-property operators. Works with the hotel's existing PMS and accounting system (M3, QuickBooks, Sage Intacct).",
				publisher: { "@id": "https://innrly.com/#organization" },
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
						name: "Is the platform name spelled Innrly or Innerly?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The official spelling is Innrly (without the 'e'). While it is sometimes searched for or misspelled as 'Innerly', the platform is called Innrly, representing inn automation done early."
						}
					},
					{
						"@type": "Question",
						name: "How long does onboarding take with Innrly?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Onboarding is fully guided by our team and typically takes 2–4 weeks. We connect to your PMS, accounting systems, and bank feeds for you, ensuring a seamless transition with zero disruption to your daily operations."
						}
					},
					{
						"@type": "Question",
						name: "Which hotel systems and accounting platforms does Innrly integrate with?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Innrly integrates with all major Property Management Systems (PMS) like Marriott, Hilton, IHG, Opera, Cloudbeds, and Mews, as well as leading back-office financial platforms including M3, Sage Intacct, and QuickBooks."
						}
					}
				]
			})
		}]
	})
});
//#endregion
export { Route as t };

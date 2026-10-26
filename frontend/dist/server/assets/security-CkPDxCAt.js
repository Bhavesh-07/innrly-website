//#region src/routes/security.tsx?tsr-shared=1
var faqs = [
	{
		q: "Where is data hosted?",
		a: "Innrly runs on a tier-1 US cloud provider with multi-region replication and isolated tenant storage. Data residency can be discussed for enterprise portfolios."
	},
	{
		q: "What compliance frameworks do you map to?",
		a: "Our controls are aligned with SOC 2 and PCI-DSS principles. We share our security documentation under NDA — email security@innrly.com."
	},
	{
		q: "How do you handle PII?",
		a: "Guest PII stays within the PMS unless explicitly required. Innrly minimizes the PII surface and never sells or shares your data with third parties."
	},
	{
		q: "How does Innrly protect biometric Face-ID timeclock data?",
		a: "Innrly never stores raw employee facial photos or images on the device or server. Instead, our on-device algorithm generates an encrypted mathematical vector hash that cannot be reverse-engineered into an image, complying with strict state biometric privacy regulations (including BIPA)."
	},
	{
		q: "What is your document retention and backup schedule?",
		a: "Night-audit packs, OCR invoices, and GL reconciliation logs are stored with AES-256 encryption. We maintain automated daily geo-redundant backups with a 99.9% uptime SLA and customizable data retention periods to match your audit requirements."
	},
	{
		q: "Can I get a custom DPA or BAA?",
		a: "Yes. We sign standard data processing agreements and accommodate enterprise legal review on request."
	}
];
//#endregion
export { faqs as t };

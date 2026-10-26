import { i as SectionHeading, r as Section, t as CtaBand } from "./Section-D2XWIGS_.js";
import { t as faqs } from "./security-CkPDxCAt.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BellRing, Database, FileSearch, KeyRound, Lock, ServerCog, ShieldCheck, Users } from "lucide-react";
//#region src/routes/security.tsx?tsr-split=component
var pillars = [
	{
		icon: Lock,
		t: "Encryption everywhere",
		b: "TLS 1.2+ in transit. AES-256 at rest on every data store, backup, and replica."
	},
	{
		icon: KeyRound,
		t: "Identity & access",
		b: "SSO (SAML/OIDC), enforced MFA, scoped roles per property and per module."
	},
	{
		icon: FileSearch,
		t: "Full audit trail",
		b: "Every login, change, and export is recorded with actor, time, and source IP — exportable for SOC 1 / SOX review."
	},
	{
		icon: Database,
		t: "Encrypted backups",
		b: "Encrypted daily backups with point-in-time recovery across geographically separate regions."
	},
	{
		icon: ServerCog,
		t: "Tier-1 infrastructure",
		b: "Hosted on a top-tier cloud provider with isolated tenants, network segmentation, and DDoS protection."
	},
	{
		icon: BellRing,
		t: "24/7 monitoring",
		b: "Continuous logging, anomaly detection, and a documented incident response plan with defined SLAs."
	},
	{
		icon: Users,
		t: "Vendor management",
		b: "Every sub-processor reviewed for security, confidentiality, and data residency before going live."
	},
	{
		icon: ShieldCheck,
		t: "Responsible disclosure",
		b: "Coordinated disclosure program. Report vulnerabilities to security@innrly.com — we respond within one business day."
	}
];
function Page() {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 bg-hero opacity-90",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "pointer-events-none absolute inset-0 opacity-30",
						"aria-hidden": true,
						children: [/* @__PURE__ */ jsx("div", { className: "absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent blur-3xl" })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cta",
								children: /* @__PURE__ */ jsx(ShieldCheck, {
									className: "h-7 w-7 text-primary-foreground",
									"aria-hidden": true
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-xs font-semibold uppercase tracking-widest text-accent",
								children: "Security & trust"
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-3 text-4xl font-bold text-foreground sm:text-5xl",
								children: [
									"Hotel financial data deserves ",
									/* @__PURE__ */ jsx("span", {
										className: "text-gradient",
										children: "enterprise-grade"
									}),
									" ",
									"security."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-lg text-muted-foreground",
								children: "How Innrly protects every invoice, folio, payroll record, and bank deposit — across every property in your portfolio."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "Eight pillars",
				title: "How we protect your data."
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
				children: pillars.map((p) => /* @__PURE__ */ jsxs("div", {
					className: "aurora-card rounded-2xl p-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cta",
							children: /* @__PURE__ */ jsx(p.icon, {
								className: "h-5 w-5 text-primary-foreground",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-4 text-base font-semibold text-foreground",
							children: p.t
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: p.b
						})
					]
				}, p.t))
			})] }),
			/* @__PURE__ */ jsxs(Section, {
				className: "py-12 border-t border-border/40",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Data Architecture",
					title: "Tenant isolation & cryptographic controls."
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-10 grid gap-6 md:grid-cols-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "aurora-card rounded-2xl p-6",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-base font-semibold text-foreground",
								children: "Logical & Cryptographic Tenant Isolation"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Every hotel management company and property operates in isolated data partitions. Cross-tenant access is structurally barred at the database query layer through row-level security and strict tenant context verification on every API request."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "aurora-card rounded-2xl p-6",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-base font-semibold text-foreground",
								children: "Zero-Trust Network & Secret Management"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "All internal services communicate over encrypted mTLS networks. Database credentials, API tokens for PMS connections, and sensitive encryption keys are rotated automatically and managed in dedicated hardware security modules (HSM)."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "aurora-card rounded-2xl p-6",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-base font-semibold text-foreground",
								children: "Continuous Vulnerability Scanning & Pen-Testing"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Innrly codebases undergo automated static analysis (SAST), software composition analysis (SCA) for dependencies, and dynamic vulnerability assessment. Third-party independent penetration tests are conducted annually."
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				className: "py-12 border-t border-border/40",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Governance",
					title: "Compliance alignment & trusted infrastructure."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-10 overflow-hidden rounded-2xl border border-border bg-card",
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Domain / Provider"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Purpose"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Security Certification"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-6 py-4",
										children: "Data Residency"
									})
								] })
							}), /* @__PURE__ */ jsxs("tbody", {
								className: "divide-y divide-border text-foreground",
								children: [
									/* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 font-medium",
											children: "Cloud Infrastructure (AWS / Azure)"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "Application hosting, distributed database, and object storage"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "SOC 1, SOC 2 Type II, ISO 27001, FedRAMP"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "United States (Multi-Region)"
										})
									] }),
									/* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 font-medium",
											children: "OCR & Document Processing"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "Automated invoice and night audit document parsing"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "SOC 2 Type II, HIPAA, ISO 27001"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "United States (Zero Retention)"
										})
									] }),
									/* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 font-medium",
											children: "Transactional Email & Notifications"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "System alerts, audit summaries, and MFA verification"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "SOC 2 Type II, GDPR, CCPA Compliant"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "United States"
										})
									] }),
									/* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 font-medium",
											children: "Telemetry & Error Monitoring"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "Real-time application performance and error diagnostics"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "SOC 2 Type II, ISO 27001"
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-muted-foreground",
											children: "United States (PII Scrubbed)"
										})
									] })
								]
							})]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				className: "py-12 border-t border-border/40",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "FAQ",
						title: "What security teams ask us."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 grid gap-4 md:grid-cols-2",
						children: faqs.map((f) => /* @__PURE__ */ jsxs("div", {
							className: "aurora-card rounded-2xl p-6",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold text-foreground",
								children: f.q
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: f.a
							})]
						}, f.q))
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-10 text-center text-sm text-muted-foreground",
						children: [
							"Have a security question or need our documentation? Email",
							" ",
							/* @__PURE__ */ jsx("a", {
								href: "mailto:security@innrly.com",
								className: "text-accent hover:underline",
								children: "security@innrly.com"
							}),
							" ",
							"or read our",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/legal/security",
								className: "text-accent hover:underline",
								children: "security overview"
							}),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(CtaBand, {
				title: "Need our security pack?",
				subtitle: "SOC 2 mapping, sub-processor list, and DPA template — available under NDA.",
				primary: {
					to: "/contact",
					label: "Request documentation"
				},
				secondary: {
					to: "/legal/security",
					label: "Read security overview"
				}
			})
		]
	});
}
//#endregion
export { Page as component };

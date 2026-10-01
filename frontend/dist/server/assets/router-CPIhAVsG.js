import { t as Button } from "./button-Dkpg6g2Z.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { n as trackPageView, t as track } from "./analytics-P7BrM78M.js";
import { i as submitLead, n as honeypotFieldProps, r as useFormGuard, t as isDisposableEmail } from "./disposable-domains-DZR436L9.js";
import { t as Wordmark } from "./Wordmark-Ba3HVvRF.js";
import { n as fetchSiteScripts, t as defaultSiteScripts } from "./scripts-4H9uFc5I.js";
import { i as getMetaTags, n as defaultSeoData, r as fetchSeoData, t as breadcrumbLd } from "./seo-CwFDKIJD.js";
import { t as Route$51 } from "./routes-Ca8x36GR.js";
import { t as terms } from "./glossary-DiPGO34Z.js";
import { t as Route$52 } from "./pricing-yGYk8Eyt.js";
import { t as faqs$1 } from "./roi-calculator-DIoMuPOX.js";
import { t as faqs$2 } from "./security-CQ0Ukxey.js";
import { n as Route$53 } from "./NewsletterSignup-DyLN3CAY.js";
import { t as Route$54 } from "./case-studies.index-CMXFz2l4.js";
import { t as Route$55 } from "./case-studies.boutique-group-BlWHPRv3.js";
import { t as Route$56 } from "./case-studies.extended-stay-portfolio-CNzTCtMJ.js";
import { t as Route$57 } from "./case-studies.hilton-management-company-BiQh6seU.js";
import { t as Route$58 } from "./case-studies.midwest-portfolio-BUgkfuVR.js";
import { t as Route$59 } from "./case-studies.urban-full-service-D4W4Se_B.js";
import { t as comparisons } from "./compare.index-oHiZRbYN.js";
import { t as faqs$3 } from "./compare.innrly-vs-actabl-CnBKAidq.js";
import { t as faqs$4 } from "./compare.innrly-vs-aptech-D0QVvAuc.js";
import { t as faqs$5 } from "./compare.innrly-vs-hotel-effectiveness-SruBlAPW.js";
import { t as faqs$6 } from "./compare.innrly-vs-nimble-Di92EaL-.js";
import { t as faqs$7 } from "./compare.innrly-vs-otelier-DmKynTaL.js";
import { t as faqs$8 } from "./compare.innrly-vs-profitsage-8CuAZhlA.js";
import { n as Route$60 } from "./control-hub.index-LTTd0Neq.js";
import { t as Route$61 } from "./industries.extended-stay-DYSJzcnG.js";
import { t as Route$62 } from "./industries.full-service-D2Qsz-8N.js";
import { t as Route$63 } from "./industries.select-service-Cne8eMlr.js";
import { t as faqs$9 } from "./integrations.cloudbeds-DLhc_SHq.js";
import { t as faqs$10 } from "./integrations.inn-flow-zpQAjcso.js";
import { t as faqs$11 } from "./integrations.m3-DvB059Sh.js";
import { t as faqs$12 } from "./integrations.mews-D63SJpnf.js";
import { t as faqs$13 } from "./integrations.opera-B6uL2STH.js";
import { t as faqs$14 } from "./integrations.quickbooks-Cz_PrNX_.js";
import { t as Route$64 } from "./solutions.business-intelligence-BPY_XXmQ.js";
import { t as Route$65 } from "./solutions.document-vault-D2-XtEbQ.js";
import { t as Route$66 } from "./solutions.expense-entries-DuzIP5DX.js";
import { t as Route$67 } from "./solutions.financial-control-D2qXq1AG.js";
import { t as Route$68 } from "./solutions.innrly-pay-2hXEvRm_.js";
import { t as Route$69 } from "./solutions.innrly-shift-CYp4R98X.js";
import { t as Route$70 } from "./solutions.operations-automation-CeFRsczs.js";
import { t as Route$71 } from "./solutions.reconciliation-BzXCBnVK.js";
import { useEffect, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, notFound, redirect, useLocation, useRouter, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Clock, CreditCard, Loader2, Mail, Menu, Sparkles, X } from "lucide-react";
import { z } from "zod";
import { Toaster, toast } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-CtUlK1yc.css";
//#endregion
//#region src/components/site/TrialModal.tsx
var SESSION_KEY = "innrly_trial_modal_seen";
var schema = z.object({
	name: z.string().trim().min(1, "Required").max(100),
	email: z.string().trim().email("Enter a valid work email").max(255).refine((val) => !isDisposableEmail(val), { message: "Please enter a valid work email (temporary/disposable inboxes not accepted)" }),
	company: z.string().trim().min(1, "Required").max(150),
	role: z.string().trim().min(1, "Required").max(100),
	phone: z.string().trim().min(7, "Enter a valid phone").max(30),
	properties: z.string().trim().min(1, "Required").max(20),
	pms: z.string().trim().max(100).optional()
});
var benefits = [
	"Full platform access — BI, A/P automation, night audit, labor",
	"Connect your PMS, accounting, and payroll in days",
	"Dedicated onboarding specialist for your portfolio",
	"No credit card. No contract. Cancel anytime."
];
function TrialModal() {
	const [open, setOpen] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const guard = useFormGuard(2500);
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (sessionStorage.getItem(SESSION_KEY)) return;
		const t = setTimeout(() => {
			setOpen(true);
			sessionStorage.setItem(SESSION_KEY, "1");
		}, 600);
		return () => clearTimeout(t);
	}, []);
	useEffect(() => {
		const handler = () => setOpen(true);
		window.addEventListener("innrly:open-trial", handler);
		return () => window.removeEventListener("innrly:open-trial", handler);
	}, []);
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);
	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	if (!open) return null;
	async function onSubmit(e) {
		e.preventDefault();
		if (!guard.check().ok) {
			setDone(true);
			return;
		}
		const fd = new FormData(e.currentTarget);
		fd.delete("company_website");
		const raw = Object.fromEntries(fd.entries());
		const parsed = schema.safeParse(raw);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
			return;
		}
		setSubmitting(true);
		const res = await submitLead({
			...parsed.data,
			source: "trial"
		});
		setSubmitting(false);
		if (!res.ok) {
			toast.error(res.error ?? "Could not submit — please try again");
			return;
		}
		setDone(true);
	}
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-3 backdrop-blur-md animate-in fade-in duration-200 sm:p-6",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "trial-modal-title",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative grid w-full max-w-5xl max-h-[92dvh] grid-cols-1 overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card shadow-elevated animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 md:grid-cols-2 md:max-h-[90dvh]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setOpen(false),
					"aria-label": "Close",
					className: "absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
					children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative hidden overflow-hidden bg-hero p-8 md:flex md:flex-col md:justify-between md:p-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "absolute inset-0 opacity-60",
							"aria-hidden": true,
							children: [/* @__PURE__ */ jsx("div", { className: "absolute left-10 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent",
									children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), " Limited launch offer"]
								}),
								/* @__PURE__ */ jsxs("h2", {
									id: "trial-modal-title",
									className: "mt-5 text-3xl font-bold leading-tight text-foreground",
									children: [
										"Try Innrly free for",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gradient",
											children: "90 days."
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Full platform. Every property. Zero risk. See what your back office looks like when the spreadsheets are gone."
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-6 space-y-3",
									children: benefits.map((b) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2.5 text-sm text-foreground/90",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cta",
											children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 text-primary-foreground" })
										}), b]
									}, b))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] font-bold uppercase tracking-widest text-accent",
										children: "New in Innrly"
									}), /* @__PURE__ */ jsxs("div", {
										className: "mt-2 grid gap-2",
										children: [/* @__PURE__ */ jsxs(Link, {
											to: "/solutions/innrly-shift",
											target: "_blank",
											rel: "noopener",
											className: "group flex items-center gap-3 rounded-lg border border-border/40 bg-surface/40 p-3 transition-colors hover:border-accent/40 hover:bg-surface/60",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "inline-flex h-8 w-8 flex-none items-center justify-center rounded-md bg-accent/15 text-accent",
													children: /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" })
												}),
												/* @__PURE__ */ jsxs("span", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ jsxs("span", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-sm font-semibold text-foreground",
															children: "Innrly Shift"
														}), /* @__PURE__ */ jsx("span", {
															className: "rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-success",
															children: "Included"
														})]
													}), /* @__PURE__ */ jsx("span", {
														className: "block truncate text-[11px] text-muted-foreground",
														children: "Face-ID labor in 5 minutes"
													})]
												}),
												/* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent" })
											]
										}), /* @__PURE__ */ jsxs(Link, {
											to: "/solutions/innrly-pay",
											target: "_blank",
											rel: "noopener",
											className: "group flex items-center gap-3 rounded-lg border border-border/40 bg-surface/40 p-3 transition-colors hover:border-accent/40 hover:bg-surface/60",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "inline-flex h-8 w-8 flex-none items-center justify-center rounded-md bg-accent/15 text-accent",
													children: /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4" })
												}),
												/* @__PURE__ */ jsxs("span", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ jsxs("span", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-sm font-semibold text-foreground",
															children: "Innrly Pay"
														}), /* @__PURE__ */ jsx("span", {
															className: "rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent",
															children: "Add-on"
														})]
													}), /* @__PURE__ */ jsx("span", {
														className: "block truncate text-[11px] text-muted-foreground",
														children: "Virtual Cards + ACH, no bank logins"
													})]
												}),
												/* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent" })
											]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative mt-6 rounded-xl border border-border/40 bg-surface/40 p-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Trusted across"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-lg font-bold text-foreground",
								children: "200+ hotels · 17,000+ rooms · 1,500+ users"
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-col bg-card p-6 sm:p-10",
					children: done ? /* @__PURE__ */ jsxs("div", {
						className: "flex flex-1 flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-cta",
								children: /* @__PURE__ */ jsx(Check, { className: "h-7 w-7 text-primary-foreground" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-5 text-xl font-semibold text-foreground",
								children: "You're in. Welcome to Innrly."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-sm text-sm text-muted-foreground",
								children: "Our team will reach out within one business day to schedule your onboarding and activate your 90-day trial."
							}),
							/* @__PURE__ */ jsx(Button, {
								className: "mt-6 bg-cta hover:opacity-90",
								onClick: () => setOpen(false),
								children: "Close"
							})
						]
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "md:hidden",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent",
									children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), " 90-day free trial"]
								}),
								/* @__PURE__ */ jsxs("h2", {
									className: "mt-3 text-2xl font-bold text-foreground",
									children: [
										"Try Innrly free for",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-gradient",
											children: "90 days."
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ jsxs(Link, {
										to: "/solutions/innrly-shift",
										target: "_blank",
										rel: "noopener",
										onClick: () => setOpen(false),
										className: "flex items-start gap-2 rounded-lg border border-border/60 bg-surface/50 p-2.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-accent/15 text-accent",
											children: /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ jsxs("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsx("span", {
												className: "block text-[12px] font-semibold text-foreground",
												children: "Innrly Shift"
											}), /* @__PURE__ */ jsx("span", {
												className: "mt-0.5 inline-block rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-success",
												children: "Included"
											})]
										})]
									}), /* @__PURE__ */ jsxs(Link, {
										to: "/solutions/innrly-pay",
										target: "_blank",
										rel: "noopener",
										onClick: () => setOpen(false),
										className: "flex items-start gap-2 rounded-lg border border-border/60 bg-surface/50 p-2.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-accent/15 text-accent",
											children: /* @__PURE__ */ jsx(CreditCard, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ jsxs("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsx("span", {
												className: "block text-[12px] font-semibold text-foreground",
												children: "Innrly Pay"
											}), /* @__PURE__ */ jsx("span", {
												className: "mt-0.5 inline-block rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent",
												children: "Add-on"
											})]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "hidden text-xl font-semibold text-foreground md:block",
							children: "Start your 90-day trial"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Tell us about your portfolio — we'll set you up with full access."
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit,
							className: "mt-5 grid gap-3.5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx("input", {
									ref: guard.honeypotRef,
									...honeypotFieldProps
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Full name",
									name: "name",
									placeholder: "Jane Patel"
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Work email",
									name: "email",
									type: "email",
									placeholder: "jane@hotelco.com"
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Company",
									name: "company",
									placeholder: "Hotel Co."
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Phone",
									name: "phone",
									type: "tel",
									placeholder: "(555) 123-4567"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ jsx(Field, {
										label: "# of properties",
										name: "properties",
										type: "number",
										placeholder: "12",
										min: "1"
									})
								}),
								showMore ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Field, {
									label: "Your role",
									name: "role",
									placeholder: "VP of Operations"
								}), /* @__PURE__ */ jsx(Field, {
									label: "Current PMS (optional)",
									name: "pms",
									placeholder: "Opera, Choice Advantage, etc."
								})] }) : /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowMore(true),
									className: "text-left text-xs font-semibold text-accent hover:underline sm:col-span-2",
									children: "+ Add role & current PMS (optional)"
								}),
								/* @__PURE__ */ jsx(Button, {
									type: "submit",
									size: "lg",
									disabled: submitting,
									className: "mt-2 bg-cta hover:opacity-90 sm:col-span-2",
									children: submitting ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "mr-1.5 h-4 w-4 animate-spin" }), " Submitting…"] }) : "Start my 90-day free trial"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center gap-2 sm:col-span-2",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "No credit card required. We'll never share your information."
									}), /* @__PURE__ */ jsx(Link, {
										to: "/features",
										onClick: () => setOpen(false),
										className: "text-xs font-semibold text-accent hover:underline",
										children: "Not ready? Watch the 2-min product tour →"
									})]
								})
							]
						})
					] })
				})
			]
		})
	});
}
function Field({ label, name, type = "text", placeholder, min }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ jsx(Label, {
			htmlFor: name,
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx(Input, {
			id: name,
			name,
			type,
			placeholder,
			min
		})]
	});
}
/** Helper for any CTA button to open the trial modal. */
function openTrialModal() {
	if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("innrly:open-trial"));
}
//#endregion
//#region src/components/site/Header.tsx
var primaryNav = [
	{
		to: "/features",
		label: "Features"
	},
	{
		to: "/solutions/business-intelligence",
		label: "Solutions"
	},
	{
		to: "/pricing",
		label: "Pricing"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
var resources = [
	{
		to: "/integrations",
		label: "Integrations",
		desc: "50+ PMS, accounting, payroll & banking systems."
	},
	{
		to: "/case-studies",
		label: "Case studies",
		desc: "Real portfolios, real hours saved."
	},
	{
		to: "/blog",
		label: "Blog",
		desc: "Operator playbooks and product updates."
	},
	{
		to: "/glossary",
		label: "Glossary",
		desc: "Hotel back-office terms, plainly defined."
	},
	{
		to: "/roi-calculator",
		label: "ROI calculator",
		desc: "See your savings in 30 seconds."
	},
	{
		to: "/security",
		label: "Security & trust",
		desc: "Encryption, access control, compliance."
	}
];
function Header() {
	const [open, setOpen] = useState(false);
	const [resourcesOpen, setResourcesOpen] = useState(false);
	const resourcesRef = useRef(null);
	const closeTimer = useRef(null);
	const [loginLink, setLoginLink] = useState("https://app.innrly.com");
	useEffect(() => {
		if (typeof window !== "undefined") fetch("/api/settings").then((res) => res.json()).then((data) => {
			if (data && data.innrly_login_link) setLoginLink(data.innrly_login_link);
		}).catch((err) => console.error("Failed to load settings in Header", err));
	}, []);
	useEffect(() => {
		if (!resourcesOpen) return;
		const onClick = (e) => {
			if (!resourcesRef.current?.contains(e.target)) setResourcesOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setResourcesOpen(false);
		};
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [resourcesOpen]);
	const handleEnter = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		setResourcesOpen(true);
	};
	const handleLeave = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		closeTimer.current = setTimeout(() => setResourcesOpen(false), 150);
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "flex items-center",
					"aria-label": "Innrly home",
					children: /* @__PURE__ */ jsx(Wordmark, { size: "md" })
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "hidden items-center gap-7 md:flex",
					"aria-label": "Primary",
					children: [primaryNav.map((item) => /* @__PURE__ */ jsx(Link, {
						to: item.to,
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						activeProps: { className: "text-foreground" },
						children: item.label
					}, item.to)), /* @__PURE__ */ jsxs("div", {
						ref: resourcesRef,
						className: "relative",
						onMouseEnter: handleEnter,
						onMouseLeave: handleLeave,
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setResourcesOpen((v) => !v),
							"aria-haspopup": "menu",
							"aria-expanded": resourcesOpen,
							className: "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: ["Resources", /* @__PURE__ */ jsx(ChevronDown, {
								className: `h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`,
								"aria-hidden": true
							})]
						}), resourcesOpen && /* @__PURE__ */ jsx("div", {
							role: "menu",
							className: "absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border-2 border-accent/30 bg-card/95 p-2 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--accent)_45%,transparent)] backdrop-blur-xl",
							children: resources.map((r) => /* @__PURE__ */ jsxs(Link, {
								to: r.to,
								role: "menuitem",
								onClick: () => setResourcesOpen(false),
								className: "group flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/10",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-semibold text-foreground group-hover:text-accent",
									children: r.label
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: r.desc
								})]
							}, r.to))
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hidden items-center gap-2 md:flex",
					children: [
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ jsx("a", {
								href: loginLink,
								rel: "noreferrer",
								children: "Login"
							})
						}),
						/* @__PURE__ */ jsx(Button, {
							size: "sm",
							onClick: openTrialModal,
							className: "bg-cta hover:opacity-90",
							children: "Start free trial"
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								children: "See it live"
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setOpen((v) => !v),
					className: "inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground md:hidden",
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ jsx("div", {
			className: "border-t border-border/60 bg-background md:hidden",
			children: /* @__PURE__ */ jsxs("nav", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3",
				"aria-label": "Mobile",
				children: [
					primaryNav.map((item) => /* @__PURE__ */ jsx(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
						children: item.label
					}, item.to)),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-2 border-t border-border/60 pt-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Resources"
						}), resources.map((r) => /* @__PURE__ */ jsx(Link, {
							to: r.to,
							onClick: () => setOpen(false),
							className: "block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
							children: r.label
						}, r.to))]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-2 flex flex-col gap-2 border-t border-border/60 pt-3",
						children: [
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "ghost",
								children: /* @__PURE__ */ jsx("a", {
									href: loginLink,
									rel: "noreferrer",
									children: "Login"
								})
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								onClick: () => {
									setOpen(false);
									openTrialModal();
								},
								children: "Start 90-day free trial"
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								className: "bg-cta",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/contact",
									onClick: () => setOpen(false),
									children: "See it live"
								})
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/site/Footer.tsx
var columns = [
	{
		title: "Product",
		links: [
			{
				to: "/features",
				label: "Features"
			},
			{
				to: "/pricing",
				label: "Pricing"
			},
			{
				to: "/integrations",
				label: "Integrations"
			},
			{
				to: "/onboarding",
				label: "Get started"
			},
			{
				to: "/solutions/innrly-pay",
				label: "Innrly Pay"
			},
			{
				to: "/solutions/innrly-shift",
				label: "Innrly Shift"
			}
		]
	},
	{
		title: "Solutions",
		links: [
			{
				to: "/solutions/business-intelligence",
				label: "Business Intelligence"
			},
			{
				to: "/solutions/financial-control",
				label: "Financial Control"
			},
			{
				to: "/solutions/innrly-shift",
				label: "Innrly Shift"
			},
			{
				to: "/solutions/operations-automation",
				label: "Operations Automation"
			},
			{
				to: "/solutions/reconciliation",
				label: "Reconciliation"
			},
			{
				to: "/solutions/expense-entries",
				label: "Expense Entries"
			},
			{
				to: "/solutions/document-vault",
				label: "Document Vault"
			},
			{
				to: "/services/accountability-pack",
				label: "Accountability Pack"
			}
		]
	},
	{
		title: "Resources",
		links: [
			{
				to: "/blog",
				label: "Blog"
			},
			{
				to: "/glossary",
				label: "Glossary"
			},
			{
				to: "/case-studies",
				label: "Case studies"
			},
			{
				to: "/roi-calculator",
				label: "ROI calculator"
			},
			{
				to: "/compare",
				label: "Compare"
			},
			{
				to: "/integrations/m3",
				label: "Innrly + M3"
			},
			{
				to: "/integrations/quickbooks",
				label: "Innrly + QuickBooks"
			},
			{
				to: "/industries/select-service",
				label: "Select-Service Hotels"
			}
		]
	},
	{
		title: "Company",
		links: [
			{
				to: "/about",
				label: "About"
			},
			{
				to: "/contact",
				label: "Contact"
			},
			{
				to: "/security",
				label: "Security & trust"
			},
			{
				to: "/developers",
				label: "Developers"
			}
		]
	},
	{
		title: "Legal",
		links: [
			{
				to: "/legal/privacy",
				label: "Privacy"
			},
			{
				to: "/legal/terms",
				label: "Terms"
			},
			{
				to: "/legal/subscription",
				label: "Subscription Agreement"
			},
			{
				to: "/legal/security",
				label: "Security"
			},
			{
				to: "/legal/cookies",
				label: "Cookies"
			},
			{
				to: "/legal/accessibility",
				label: "Accessibility"
			}
		]
	}
];
function Footer() {
	const [socials, setSocials] = useState({
		facebook: "https://www.facebook.com/Innrlyy/",
		instagram: "https://www.instagram.com/innrly/",
		linkedin: "https://www.linkedin.com/company/innrly/",
		twitter: "https://x.com/innrly",
		youtube: ""
	});
	useEffect(() => {
		if (typeof window !== "undefined") fetch("/api/settings").then((res) => res.json()).then((data) => {
			if (data) setSocials({
				facebook: data.social_facebook !== void 0 ? data.social_facebook : "https://www.facebook.com/Innrlyy/",
				instagram: data.social_instagram !== void 0 ? data.social_instagram : "https://www.instagram.com/innrly/",
				linkedin: data.social_linkedin !== void 0 ? data.social_linkedin : "https://www.linkedin.com/company/innrly/",
				twitter: data.social_twitter !== void 0 ? data.social_twitter : "https://x.com/innrly",
				youtube: data.social_youtube || ""
			});
		}).catch(() => {});
	}, []);
	return /* @__PURE__ */ jsx("footer", {
		className: "border-t border-border/60 bg-surface/40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 xl:grid-cols-[minmax(13rem,1.25fr)_repeat(5,minmax(0,1fr))] xl:gap-x-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "col-span-2 min-w-0 md:col-span-1",
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/",
								className: "flex items-center",
								"aria-label": "Innrly home",
								children: /* @__PURE__ */ jsx(Wordmark, { size: "md" })
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-sm text-muted-foreground",
								children: "One platform for hotel back-office automation, business intelligence, and labor management."
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "mailto:contact@innrly.com",
								className: "mt-4 inline-flex max-w-full items-start gap-2 text-sm font-medium text-accent hover:underline",
								children: [/* @__PURE__ */ jsx(Mail, {
									className: "h-4 w-4 shrink-0",
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("span", {
									className: "min-w-0 break-all",
									children: "contact@innrly.com"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 flex items-center gap-3",
								children: [
									socials.facebook && /* @__PURE__ */ jsx("a", {
										href: socials.facebook,
										target: "_blank",
										rel: "noopener noreferrer",
										title: "Facebook",
										"aria-label": "Innrly on Facebook",
										className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-foreground/10 hover:text-foreground",
										children: /* @__PURE__ */ jsx("svg", {
											className: "h-4 w-4",
											fill: "none",
											height: "24",
											stroke: "currentColor",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "2",
											viewBox: "0 0 24 24",
											width: "24",
											children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
										})
									}),
									socials.instagram && /* @__PURE__ */ jsx("a", {
										href: socials.instagram,
										target: "_blank",
										rel: "noopener noreferrer",
										title: "Instagram",
										"aria-label": "Innrly on Instagram",
										className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-foreground/10 hover:text-foreground",
										children: /* @__PURE__ */ jsxs("svg", {
											className: "h-4 w-4",
											fill: "none",
											height: "24",
											stroke: "currentColor",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "2",
											viewBox: "0 0 24 24",
											width: "24",
											children: [
												/* @__PURE__ */ jsx("rect", {
													height: "20",
													rx: "5",
													ry: "5",
													width: "20",
													x: "2",
													y: "2"
												}),
												/* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
												/* @__PURE__ */ jsx("line", {
													x1: "17.5",
													x2: "17.51",
													y1: "6.5",
													y2: "6.5"
												})
											]
										})
									}),
									socials.linkedin && /* @__PURE__ */ jsx("a", {
										href: socials.linkedin,
										target: "_blank",
										rel: "noopener noreferrer",
										title: "LinkedIn",
										"aria-label": "Innrly on LinkedIn",
										className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-foreground/10 hover:text-foreground",
										children: /* @__PURE__ */ jsxs("svg", {
											className: "h-4 w-4",
											fill: "none",
											height: "24",
											stroke: "currentColor",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "2",
											viewBox: "0 0 24 24",
											width: "24",
											children: [
												/* @__PURE__ */ jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
												/* @__PURE__ */ jsx("rect", {
													height: "12",
													width: "4",
													x: "2",
													y: "9"
												}),
												/* @__PURE__ */ jsx("circle", {
													cx: "4",
													cy: "4",
													r: "2"
												})
											]
										})
									}),
									socials.twitter && /* @__PURE__ */ jsx("a", {
										href: socials.twitter,
										target: "_blank",
										rel: "noopener noreferrer",
										title: "X (Twitter)",
										"aria-label": "Innrly on X",
										className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-foreground/10 hover:text-foreground",
										children: /* @__PURE__ */ jsx("svg", {
											className: "h-4 w-4",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
										})
									}),
									socials.youtube && /* @__PURE__ */ jsx("a", {
										href: socials.youtube,
										target: "_blank",
										rel: "noopener noreferrer",
										title: "YouTube",
										"aria-label": "Innrly on YouTube",
										className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-foreground/10 hover:text-foreground",
										children: /* @__PURE__ */ jsx("svg", {
											className: "h-4 w-4",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })
										})
									})
								]
							})
						]
					}), columns.map((col) => /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-semibold text-foreground",
							children: col.title
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-4 space-y-3",
							children: col.links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: l.to,
								className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
								children: l.label
							}) }, l.to))
						})]
					}, col.title))]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-12 border-t border-border/60 pt-8",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Innrly mobile apps"
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "https://apps.apple.com/app/innrly",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Download Innrly on the App Store",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/60",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "h-5 w-5",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": true,
								children: /* @__PURE__ */ jsx("path", { d: "M17.05 12.5a4.27 4.27 0 0 1 2.04-3.59 4.38 4.38 0 0 0-3.45-1.87c-1.45-.15-2.85.86-3.6.86-.76 0-1.9-.84-3.13-.82a4.6 4.6 0 0 0-3.87 2.36c-1.66 2.88-.42 7.13 1.19 9.46.79 1.14 1.72 2.42 2.94 2.38 1.18-.05 1.63-.76 3.06-.76 1.42 0 1.83.76 3.08.74 1.27-.02 2.08-1.16 2.86-2.31a10.2 10.2 0 0 0 1.3-2.66 4.13 4.13 0 0 1-2.42-3.79zM14.78 5.6a4.2 4.2 0 0 0 .96-3.02 4.27 4.27 0 0 0-2.77 1.43 3.99 3.99 0 0 0-.99 2.91 3.53 3.53 0 0 0 2.8-1.32z" })
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex flex-col leading-tight",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-normal text-muted-foreground",
									children: "Download on the"
								}), /* @__PURE__ */ jsx("span", { children: "App Store" })]
							})]
						}), /* @__PURE__ */ jsxs("a", {
							href: "https://play.google.com/store/apps/details?id=com.innrly",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Get Innrly on Google Play",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/60",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "h-5 w-5",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": true,
								children: /* @__PURE__ */ jsx("path", { d: "M3.6 2.1c-.3.3-.5.7-.5 1.2v17.4c0 .5.2.9.5 1.2l9.3-9.9L3.6 2.1zm10.4 11l2.8 2.9-9.5 5.4 6.7-8.3zm0-2.2L7.3 2.6l9.5 5.4-2.8 2.9zm6.8 1.1c0 .5-.3 1-.8 1.3l-2.5 1.4-3-3.2 3-3.2 2.5 1.4c.5.3.8.8.8 1.3z" })
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex flex-col leading-tight",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-normal text-muted-foreground",
									children: "Get it on"
								}), /* @__PURE__ */ jsx("span", { children: "Google Play" })]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Innrly. All rights reserved."
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Built for hotel owners and operators."
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/site/StickyMobileCta.tsx
/**
* Mobile-only sticky CTA bar. Hidden on form pages where it would be redundant.
* Opens the 90-day trial modal directly so it's always one tap away.
*/
function StickyMobileCta() {
	const { pathname } = useLocation();
	if (pathname.startsWith("/contact") || pathname.startsWith("/onboarding") || pathname.startsWith("/legal")) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("div", {
					className: "truncate text-sm font-semibold text-foreground",
					children: "Try Innrly free for 90 days"
				}), /* @__PURE__ */ jsx("div", {
					className: "truncate text-[11px] text-muted-foreground",
					children: "Full platform · No credit card"
				})]
			}), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => {
					track("cta_click", {
						cta: "open_trial",
						location: "sticky_mobile_cta"
					});
					openTrialModal();
				},
				className: "inline-flex shrink-0 items-center gap-1 rounded-md bg-cta px-3.5 py-2 text-sm font-semibold text-primary-foreground",
				children: ["Start trial ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
			})]
		})
	});
}
//#endregion
//#region src/components/site/DesktopScrollCta.tsx
/**
* Desktop-only scroll-triggered CTA card. Appears bottom-right after the user
* scrolls past 50% of a long page (blog post / compare). Dismissible per route.
*/
var ALLOW_PREFIXES = ["/blog/", "/compare/innrly-vs-"];
var STORAGE_PREFIX = "innrly_desktop_cta_dismissed:";
function DesktopScrollCta() {
	const { pathname } = useLocation();
	const [visible, setVisible] = useState(false);
	const [dismissed, setDismissed] = useState(false);
	const isAllowed = ALLOW_PREFIXES.some((p) => pathname.startsWith(p));
	useEffect(() => {
		setVisible(false);
		setDismissed(false);
		if (typeof window === "undefined" || !isAllowed) return;
		const key = STORAGE_PREFIX + pathname;
		if (sessionStorage.getItem(key)) {
			setDismissed(true);
			return;
		}
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			if (max <= 0) return;
			if (window.scrollY / max > .5) setVisible(true);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, [pathname, isAllowed]);
	if (!isAllowed || dismissed || !visible) return null;
	const dismiss = () => {
		if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_PREFIX + pathname, "1");
		setDismissed(true);
	};
	return /* @__PURE__ */ jsx("div", {
		className: "fixed bottom-6 right-6 z-40 hidden w-80 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:block",
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-2xl border border-accent/30 bg-card/95 p-5 shadow-glow backdrop-blur",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: dismiss,
					"aria-label": "Dismiss",
					className: "absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
					children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "See it on your portfolio"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm font-semibold text-foreground",
					children: "Book a 20-minute walkthrough"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "We'll show Innrly running against a portfolio your size — PMS, accounting, and labor wired up."
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/contact",
					onClick: () => track("cta_click", {
						cta: "book_demo",
						location: "desktop_scroll_cta"
					}),
					className: "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-cta px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-95",
					children: ["Book a demo ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
				})
			]
		})
	});
}
//#endregion
//#region src/components/site/DevLeadBanner.tsx
/**
* Loud, visible banner that appears at the top of the site whenever the
* lead-capture backend URL is not configured. Visible in dev AND preview/
* staging builds so the developer can't miss it. Hidden in production
* builds (NODE_ENV === "production") even if unset — that's a config bug
* we don't want shown to real visitors, but we want it screaming during
* handoff.
*
* See docs/DEVELOPER_HANDOFF_LEADS.md
*/
function DevLeadBanner() {
	const [dismissed, setDismissed] = useState(false);
	return null;
}
//#endregion
//#region src/components/site/DevAnalyticsBanner.tsx
/**
* Visible warning shown in dev/preview when VITE_ANALYTICS_ENDPOINT is unset.
* Hidden in production builds. See docs/DEVELOPER_HANDOFF_ANALYTICS.md
*/
function DevAnalyticsBanner() {
	const [dismissed, setDismissed] = useState(false);
	return null;
}
//#endregion
//#region src/components/site/AnalyticsProvider.tsx
/**
* Mounts site-wide analytics listeners:
*   • route-change page_view
*   • 50% / 90% scroll_depth (once per page)
*   • outbound link clicks (delegated)
*
* See src/lib/analytics.ts and docs/DEVELOPER_HANDOFF_ANALYTICS.md
*/
function AnalyticsProvider() {
	const { pathname, search } = useLocation();
	const lastPath = useRef("");
	useEffect(() => {
		const full = pathname + (search ? `?${new URLSearchParams(search).toString()}` : "");
		if (lastPath.current === full) return;
		lastPath.current = full;
		trackPageView(pathname);
	}, [pathname, search]);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const hit = {
			50: false,
			90: false
		};
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			if (max <= 0) return;
			const pct = window.scrollY / max * 100;
			if (!hit[50] && pct >= 50) {
				hit[50] = true;
				track("scroll_depth", { depth: 50 });
			}
			if (!hit[90] && pct >= 90) {
				hit[90] = true;
				track("scroll_depth", { depth: 90 });
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [pathname]);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const onClick = (e) => {
			const target = e.target?.closest?.("a");
			if (!target) return;
			const href = target.getAttribute("href");
			if (!href || href.startsWith("#") || href.startsWith("/")) return;
			try {
				const u = new URL(href, window.location.origin);
				if (u.origin !== window.location.origin) track("outbound_click", {
					href: u.href,
					host: u.host
				});
			} catch {}
		};
		document.addEventListener("click", onClick, { capture: true });
		return () => document.removeEventListener("click", onClick, { capture: true });
	}, []);
	return null;
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/components/site/CookieConsent.tsx
var STORAGE_KEY = "innrly_cookie_consent_v1";
function checkGpcSignal() {
	if (typeof window === "undefined") return false;
	const nav = window.navigator;
	return nav.globalPrivacyControl === true || nav.globalPrivacyControl === "1" || window.globalPrivacyControl === true;
}
function updateGoogleConsent(status) {
	if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("consent", "update", {
		analytics_storage: status === "accepted" ? "granted" : "denied",
		ad_storage: status === "accepted" ? "granted" : "denied",
		ad_user_data: status === "accepted" ? "granted" : "denied",
		ad_personalization: status === "accepted" ? "granted" : "denied"
	});
}
/**
* Lightweight EU/UK & US/CCPA compliant cookie consent banner.
*
* Honors Global Privacy Control (GPC), integrates Google Consent Mode v2,
* and allows persistent preference management via the footer.
*/
function CookieConsent() {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const handleOpen = () => setVisible(true);
		window.addEventListener("open-cookie-preferences", handleOpen);
		if (checkGpcSignal()) {
			window.__cookieConsent = "rejected";
			updateGoogleConsent("rejected");
			setVisible(false);
			return () => window.removeEventListener("open-cookie-preferences", handleOpen);
		}
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				window.__cookieConsent = stored;
				updateGoogleConsent(stored);
			} else setVisible(true);
		} catch {
			setVisible(true);
		}
		return () => window.removeEventListener("open-cookie-preferences", handleOpen);
	}, []);
	function decide(choice) {
		try {
			localStorage.setItem(STORAGE_KEY, choice);
			window.__cookieConsent = choice;
		} catch {}
		updateGoogleConsent(choice);
		track("cookie_consent", { choice });
		setVisible(false);
	}
	if (!visible) return null;
	return /* @__PURE__ */ jsx("div", {
		role: "dialog",
		"aria-live": "polite",
		"aria-label": "Cookie consent",
		className: "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:rounded-2xl sm:border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"We use cookies to improve your experience and measure site performance. See our",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/legal/cookies",
						className: "text-accent underline",
						children: "cookie policy"
					}),
					"."
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex shrink-0 gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					size: "sm",
					className: "border-border bg-background/40",
					onClick: () => decide("rejected"),
					children: "Reject"
				}), /* @__PURE__ */ jsx(Button, {
					size: "sm",
					className: "bg-cta hover:opacity-90",
					onClick: () => decide("accepted"),
					children: "Accept"
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/site/CursorGlow.tsx
/**
* CursorGlow — soft cyan/indigo radial gradient that follows the cursor
* across designated dark zones. Adds "alive" feel without animation noise.
*
* Usage:
*   <CursorGlow /> mounted once in __root.
*   Mark dark sections with className="cursor-glow-zone" (or any element)
*   and the glow will appear inside them when the cursor enters.
*/
function CursorGlow() {
	const ref = useRef(null);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const touch = window.matchMedia("(hover: none)").matches;
		if (reduce || touch) return;
		const el = ref.current;
		if (!el) return;
		let rafId = null;
		let pendingX = 0;
		let pendingY = 0;
		let inZone = false;
		const apply = () => {
			rafId = null;
			el.style.setProperty("--cx", `${pendingX}px`);
			el.style.setProperty("--cy", `${pendingY}px`);
		};
		const onMove = (e) => {
			pendingX = e.clientX;
			pendingY = e.clientY;
			const insideZone = !!document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-glow=\"dark\"], .cursor-glow-zone");
			if (insideZone !== inZone) {
				inZone = insideZone;
				el.style.opacity = inZone ? "1" : "0";
			}
			if (rafId == null) rafId = requestAnimationFrame(apply);
		};
		const onLeave = () => {
			inZone = false;
			el.style.opacity = "0";
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		document.addEventListener("mouseleave", onLeave);
		return () => {
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseleave", onLeave);
			if (rafId != null) cancelAnimationFrame(rafId);
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref,
		"aria-hidden": true,
		className: "pointer-events-none fixed z-[5] transition-opacity duration-300",
		style: {
			left: 0,
			top: 0,
			width: 620,
			height: 620,
			opacity: 0,
			transform: "translate3d(calc(var(--cx, -9999px) - 50%), calc(var(--cy, -9999px) - 50%), 0)",
			background: "radial-gradient(circle, oklch(0.78 0.16 195 / 0.32) 0%, oklch(0.62 0.22 260 / 0.18) 38%, transparent 72%)",
			filter: "blur(28px)",
			mixBlendMode: "screen"
		}
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "pointer-events-none absolute inset-0 opacity-40",
			"aria-hidden": true,
			children: [/* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-accent blur-3xl" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative max-w-lg text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-[10rem] font-black leading-none tracking-tight text-gradient sm:text-[12rem]",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 text-2xl font-semibold text-foreground",
					children: "This room isn't on the floor plan."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist, has been moved, or never checked in."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-cta px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
						children: "Back to home"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/contact",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
						children: "Contact us"
					})]
				})
			]
		})]
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. Try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-cta px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var SITE_URL = "https://innrly.com";
var Route$50 = createRootRouteWithContext()({
	loader: async () => {
		return { siteScripts: await fetchSiteScripts() };
	},
	head: ({ loaderData }) => {
		const scripts = loaderData?.siteScripts || defaultSiteScripts;
		const isActive = scripts.is_active !== false;
		const ga4Id = scripts.ga4_id;
		const gtmId = scripts.gtm_id;
		const dynamicScripts = [];
		if (isActive && (ga4Id || gtmId)) dynamicScripts.push({ children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
        ` });
		if (isActive && gtmId) dynamicScripts.push({ children: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        ` });
		if (isActive && ga4Id) dynamicScripts.push({
			src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`,
			async: true
		}, { children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}', {
              send_page_view: false
            });
          ` });
		dynamicScripts.push({
			src: "https://www.google.com/recaptcha/api.js?render=6LcVJrkkAAAAABsSLGi1FDOjAtIyby9UNsBQPUCd&ver=3.0",
			async: true
		});
		dynamicScripts.push({
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "Innrly",
				url: SITE_URL,
				logo: `${SITE_URL}/favicon.svg`,
				description: "Hotel management software for back-office automation, business intelligence, and labor management.",
				sameAs: ["https://www.linkedin.com/company/innrly", "https://x.com/innrly"]
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "Innrly",
				url: SITE_URL,
				potentialAction: {
					"@type": "SearchAction",
					target: {
						"@type": "EntryPoint",
						urlTemplate: `${SITE_URL}/glossary?q={search_term_string}`
					},
					"query-input": "required name=search_term_string"
				}
			})
		});
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: "Innrly — Hotel management software" },
				{
					name: "description",
					content: "Innrly is one platform for hotel back-office automation, business intelligence, and labor management. Save 20–40 hours a month per property."
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:site_name",
					content: "Innrly"
				},
				{
					property: "og:image",
					content: `${SITE_URL}/og/home.jpg`
				},
				{
					property: "og:image:width",
					content: "1216"
				},
				{
					property: "og:image:height",
					content: "640"
				},
				{
					property: "og:image:alt",
					content: "Innrly — back-office automation for hotels."
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:image",
					content: `${SITE_URL}/og/home.jpg`
				},
				{
					name: "theme-color",
					content: "#0f1d2e"
				}
			],
			links: [
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg"
				},
				{
					rel: "apple-touch-icon",
					href: "/favicon.svg"
				},
				{
					rel: "manifest",
					href: "/site.webmanifest"
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "preload",
					as: "style",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
				}
			],
			scripts: dynamicScripts
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function CustomScriptsInjector({ headerTags, footerTags, isActive }) {
	useEffect(() => {
		if (!isActive) return;
		const injectHtml = (htmlStr, target, idPrefix) => {
			document.querySelectorAll(`[data-injected-by="${idPrefix}"]`).forEach((el) => el.remove());
			if (!htmlStr || !htmlStr.trim()) return;
			const container = document.createElement("div");
			container.innerHTML = htmlStr;
			Array.from(container.childNodes).forEach((node) => {
				if (node.nodeName === "SCRIPT") {
					const script = document.createElement("script");
					const origScript = node;
					Array.from(origScript.attributes).forEach((attr) => {
						script.setAttribute(attr.name, attr.value);
					});
					script.setAttribute("data-injected-by", idPrefix);
					script.textContent = origScript.textContent;
					target.appendChild(script);
				} else if (node.nodeType === Node.ELEMENT_NODE) {
					const el = node.cloneNode(true);
					el.setAttribute("data-injected-by", idPrefix);
					target.appendChild(el);
				}
			});
		};
		if (headerTags) injectHtml(headerTags, document.head, "innrly-head-tags");
		if (footerTags) injectHtml(footerTags, document.body, "innrly-footer-tags");
		return () => {
			document.querySelectorAll("[data-injected-by^=\"innrly-\"]").forEach((el) => el.remove());
		};
	}, [
		headerTags,
		footerTags,
		isActive
	]);
	return null;
}
function RootShell({ children }) {
	const scripts = Route$50.useLoaderData()?.siteScripts;
	const isActive = scripts?.is_active !== false;
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [
			isActive && scripts?.gtm_id && /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("iframe", {
				src: `https://www.googletagmanager.com/ns.html?id=${scripts.gtm_id}`,
				height: "0",
				width: "0",
				style: {
					display: "none",
					visibility: "hidden"
				}
			}) }),
			children,
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$50.useRouteContext();
	const scripts = Route$50.useLoaderData()?.siteScripts;
	const isActive = scripts?.is_active !== false;
	const routerState = useRouterState();
	const isAdminRoute = routerState.location.pathname.startsWith("/control-hub") || routerState.location.pathname.startsWith("/admin");
	useEffect(() => {
		if (isAdminRoute) {
			document.documentElement.classList.remove("dark");
			document.body.style.backgroundColor = "#f8f9fa";
		} else {
			document.documentElement.classList.add("dark");
			document.body.style.backgroundColor = "";
		}
	}, [isAdminRoute]);
	if (isAdminRoute) return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ jsx(CustomScriptsInjector, {
				headerTags: scripts?.header_tags,
				footerTags: scripts?.footer_tags,
				isActive
			}),
			/* @__PURE__ */ jsx("div", {
				className: "min-h-screen h-full w-full bg-[#f8f9fa] flex flex-col",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(Toaster$1, {})
		]
	});
	const isOnboardingRoute = routerState.location.pathname === "/onboarding" || routerState.location.pathname.startsWith("/onboarding");
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ jsx(CustomScriptsInjector, {
				headerTags: scripts?.header_tags,
				footerTags: scripts?.footer_tags,
				isActive
			}),
			/* @__PURE__ */ jsx("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground",
				children: "Skip to main content"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-h-dvh flex-col pb-20 sm:pb-0",
				children: [
					/* @__PURE__ */ jsx(DevLeadBanner, {}),
					/* @__PURE__ */ jsx(DevAnalyticsBanner, {}),
					/* @__PURE__ */ jsx(Header, {}),
					/* @__PURE__ */ jsx("main", {
						id: "main",
						className: "cursor-glow-zone flex-1",
						children: /* @__PURE__ */ jsx(Outlet, {})
					}),
					/* @__PURE__ */ jsx(Footer, {})
				]
			}),
			/* @__PURE__ */ jsx(AnalyticsProvider, {}),
			/* @__PURE__ */ jsx(StickyMobileCta, {}),
			/* @__PURE__ */ jsx(DesktopScrollCta, {}),
			/* @__PURE__ */ jsx(CookieConsent, {}),
			!isOnboardingRoute && /* @__PURE__ */ jsx(TrialModal, {}),
			/* @__PURE__ */ jsx(CursorGlow, {}),
			/* @__PURE__ */ jsx(Toaster$1, {})
		]
	});
}
//#endregion
//#region src/routes/404.tsx
var Route$49 = createFileRoute("/404")({
	component: NotFoundPage,
	loader: async () => {
		return { seo: await fetchSeoData("/404") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/404"], "/404")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/404"
		}]
	})
});
function NotFoundPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-20",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "pointer-events-none absolute inset-0 opacity-40",
			"aria-hidden": true,
			children: [/* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-accent blur-3xl" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative max-w-lg text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-[10rem] font-black leading-none tracking-tight text-gradient sm:text-[12rem]",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 text-2xl font-semibold text-foreground",
					children: "This room isn't on the floor plan."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist, has been moved, or never checked in."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-cta px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
						children: "Back to home"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/contact",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
						children: "Contact us"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$40 = () => import("./about-DNQMJb-T.js");
var Route$48 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$40, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/about") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/about"], "/about"), {
			property: "og:image:alt",
			content: "We ate our own cooking for 16 years — built by Vimal Patel inside Q Hotels Management."
		}],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/about"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "AboutPage",
				name: "About Innrly",
				url: "/about",
				description: "Innrly was built by hotelier Vimal Patel and has run Q Hotels Management's portfolio since 2007.",
				mainEntity: {
					"@type": "Organization",
					name: "Innrly",
					founder: {
						"@type": "Person",
						name: "Vimal Patel",
						jobTitle: "Founder, Innrly · Q Hotels Management"
					},
					foundingDate: "2007"
				}
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "/"
				}, {
					"@type": "ListItem",
					position: 2,
					name: "About",
					item: "/about"
				}]
			})
		}]
	})
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$39 = () => import("./contact-Cm461zdm.js");
var Route$47 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$39, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/contact") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/contact"], "/contact"), {
			property: "og:image:alt",
			content: "Talk to an operator, not an SDR. 30-minute demo on your portfolio."
		}],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/contact"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ContactPage",
				name: "Contact Innrly",
				url: "/contact",
				mainEntity: {
					"@type": "Organization",
					name: "Innrly",
					contactPoint: {
						"@type": "ContactPoint",
						contactType: "sales",
						email: "sales@innrly.com",
						availableLanguage: ["English"],
						areaServed: "US"
					}
				}
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "/"
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Contact",
					item: "/contact"
				}]
			})
		}]
	})
});
//#endregion
//#region src/routes/control-hub.tsx
var $$splitComponentImporter$38 = () => import("./control-hub-CEGtjnXz.js");
var Route$46 = createFileRoute("/control-hub")({
	component: lazyRouteComponent($$splitComponentImporter$38, "component"),
	head: () => ({ meta: [{ title: "Control Hub — Innrly Administration" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] })
});
//#endregion
//#region src/routes/developers.tsx
var $$splitComponentImporter$37 = () => import("./developers-DKf6SegF.js");
var Route$45 = createFileRoute("/developers")({
	component: lazyRouteComponent($$splitComponentImporter$37, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/developers") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/developers"], "/developers")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/developers"
		}],
		scripts: [breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Developers",
			url: "/developers"
		}])]
	})
});
//#endregion
//#region src/routes/features.tsx
var $$splitComponentImporter$36 = () => import("./features-hxKN_Mkv.js");
var Route$44 = createFileRoute("/features")({
	component: lazyRouteComponent($$splitComponentImporter$36, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/features") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/features"], "/features"), {
			property: "og:image:alt",
			content: "Night audit to morning coffee — already done. Reconciliation, AP, payroll, BI."
		}],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/features"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "/"
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Features",
					item: "/features"
				}]
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ItemList",
				name: "Innrly Features",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Business Intelligence",
						url: "/solutions/business-intelligence"
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Financial Control",
						url: "/solutions/financial-control"
					},
					{
						"@type": "ListItem",
						position: 3,
						name: "Labor & Workforce",
						url: "/solutions/innrly-shift"
					},
					{
						"@type": "ListItem",
						position: 4,
						name: "Operations Automation",
						url: "/solutions/operations-automation"
					},
					{
						"@type": "ListItem",
						position: 5,
						name: "Innrly Pay",
						url: "/solutions/innrly-pay"
					},
					{
						"@type": "ListItem",
						position: 6,
						name: "Innrly Shift",
						url: "/solutions/innrly-shift"
					}
				]
			})
		}]
	})
});
/** Fade-up reveal on scroll. Falls back to visible if IO unsupported. */
//#endregion
//#region src/routes/glossary.tsx
var $$splitComponentImporter$35 = () => import("./glossary-wnKVs6b4.js");
var Route$43 = createFileRoute("/glossary")({
	component: lazyRouteComponent($$splitComponentImporter$35, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/glossary") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/glossary"], "/glossary")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/glossary"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "DefinedTermSet",
				name: "Hotel Operations Glossary",
				hasDefinedTerm: terms.map((t) => ({
					"@type": "DefinedTerm",
					name: t.term,
					description: `${t.full}. ${t.def}`
				}))
			})
		}]
	})
});
//#endregion
//#region src/routes/hotel-back-office-automation.tsx
var faqs = [
	{
		q: "Will this require us to replace our PMS or General Ledger?",
		a: "No. Innrly is PMS-neutral and GL-neutral. It sits in the middle, connecting PMS systems (Opera, Hilton OnQ, FOSSE) with General Ledgers (QuickBooks, M3, Sage Intacct). You keep your systems of record, while Innrly automates the manual entries and reconciliation between them."
	},
	{
		q: "How much time do properties actually save?",
		a: "Depending on the brand and size, properties save between 40 and 180 hours per month. The biggest savings come from automated night audit packet filing, automated A/P invoice extraction/GL coding, and daily deposit reconciliation."
	},
	{
		q: "What is an Exceptions-First workflow?",
		a: "Instead of having your controller check all 10,000 daily transactions, Innrly's engine matches and clears the correct ones overnight. Only the variances (mismatched credit card batches, missed deposits, or wrong invoice totals) land on the exceptions dashboard for human triage."
	},
	{
		q: "How does it handle compliance for biometric Face-ID?",
		a: "Innrly provides standard biometric disclosures and releases for workers during enrollment on tablets, helping you comply with local regulations (such as BIPA in Illinois) by keeping consent tracking built directly into the flow."
	}
];
var Route$42 = createFileRoute("/hotel-back-office-automation")({
	loader: async () => {
		return { seo: await fetchSeoData("/hotel-back-office-automation") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/hotel-back-office-automation"], "/hotel-back-office-automation")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/hotel-back-office-automation"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Hotel Back-Office Automation",
			url: "/hotel-back-office-automation"
		}])]
	})
});
//#endregion
//#region src/routes/llms-full[.]txt.ts
var Route$41 = createFileRoute("/llms-full.txt")({ server: { handlers: { GET: async () => {
	let content = `# Innrly Full Documentation\n\n> Comprehensive AI Search Knowledge Base.\n`;
	try {
		const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8005";
		const res = await fetch(`${backendUrl}/api/llms-txt`);
		if (res.ok) {
			const data = await res.json();
			if (data && data.llms_full_txt) content = data.llms_full_txt;
		}
	} catch (e) {}
	return new Response(content, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/llms[.]txt.ts
var Route$40 = createFileRoute("/llms.txt")({ server: { handlers: { GET: async () => {
	let content = `# Innrly\n\n> Hotel management software for back-office automation, business intelligence, and labor management.\n`;
	try {
		const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8005";
		const res = await fetch(`${backendUrl}/api/llms-txt`);
		if (res.ok) {
			const data = await res.json();
			if (data && data.llms_txt) content = data.llms_txt;
		}
	} catch (e) {}
	return new Response(content, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/onboarding.tsx
var $$splitComponentImporter$34 = () => import("./onboarding-DL1A2dEx.js");
var Route$39 = createFileRoute("/onboarding")({
	component: lazyRouteComponent($$splitComponentImporter$34, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/onboarding") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/onboarding"], "/onboarding")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/onboarding"
		}]
	})
});
var phoneRe = /^[\d\s()+\-.]{7,20}$/;
z.object({
	decisionMaker: z.enum(["yes", "no"], { required_error: "Required" }),
	companyName: z.string().trim().min(1, "Company name required").max(150),
	authorizedPerson: z.string().trim().min(1, "Authorized person required").max(150),
	email: z.string().trim().email("Valid email required").max(255).refine((val) => !isDisposableEmail(val), { message: "Please provide a valid company work email (disposable inboxes not accepted)" }),
	address: z.string().trim().min(1, "Address required").max(255),
	state: z.string().trim().min(1, "State required").max(80),
	city: z.string().trim().min(1, "City required").max(80),
	zip: z.string().trim().regex(/^[A-Za-z0-9\s-]{3,10}$/, "Valid ZIP required"),
	mobile: z.string().trim().regex(phoneRe, "Valid mobile required"),
	work: z.string().trim().regex(phoneRe, "Valid work phone required")
});
z.object({
	name: z.string().trim().min(1, "Name required").max(150),
	email: z.string().trim().email("Valid email required").max(255).refine((val) => !isDisposableEmail(val), { message: "Please provide a valid work email (disposable inboxes not accepted)" }),
	phone: z.string().trim().regex(phoneRe, "Valid phone required")
});
z.object({
	propertyName: z.string().trim().min(1, "Property name required").max(150),
	propertyCode: z.string().trim().min(1, "Property code required").max(50),
	address: z.string().trim().min(1, "Address required").max(255),
	rooms: z.coerce.number().int().min(1, "Required").max(1e4),
	managerName: z.string().trim().min(1, "Required").max(150),
	managerEmail: z.string().trim().email("Valid email required").max(255),
	managerMobile: z.string().trim().regex(phoneRe, "Valid mobile required"),
	pms: z.enum([
		"Opera",
		"SYNXIS",
		"Choice Advantage",
		"Other"
	], { required_error: "Select a PMS" }),
	pmsOther: z.string().trim().max(80).optional(),
	brand: z.string().min(1, "Select a brand"),
	contactPerson: z.string().trim().min(1, "Required").max(150)
}).refine((v) => v.pms !== "Other" || v.pmsOther && v.pmsOther.length > 0, {
	message: "Specify PMS",
	path: ["pmsOther"]
});
//#endregion
//#region src/routes/orb-preview.tsx
var $$splitComponentImporter$33 = () => import("./orb-preview-BckPh2FX.js");
var Route$38 = createFileRoute("/orb-preview")({
	component: lazyRouteComponent($$splitComponentImporter$33, "component"),
	head: () => ({ meta: [{ title: "Product Orb Preview | Innrly" }, {
		name: "description",
		content: "Preview of Innrly signature product identity system orbs."
	}] })
});
//#endregion
//#region src/routes/robots[.]txt.ts
var Route$37 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async ({ request }) => {
	let content = `User-agent: *\nAllow: /\n\nDisallow: /control-hub\nDisallow: /control-hub/*\nDisallow: /api/admin/*\n\nSitemap: https://innrly.com/sitemap.xml\n`;
	try {
		const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8005";
		const res = await fetch(`${backendUrl}/api/robots-txt`);
		if (res.ok) {
			const data = await res.json();
			if (data && data.content) content = data.content;
		}
	} catch (e) {}
	return new Response(content, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/roi-calculator.tsx
var $$splitComponentImporter$32 = () => import("./roi-calculator-dYULy3w3.js");
var Route$36 = createFileRoute("/roi-calculator")({
	component: lazyRouteComponent($$splitComponentImporter$32, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/roi-calculator") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/roi-calculator"], "/roi-calculator")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/roi-calculator"
		}],
		scripts: [breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "ROI calculator",
			url: "/roi-calculator"
		}]), {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$1.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	})
});
//#endregion
//#region src/routes/security.tsx
var $$splitComponentImporter$31 = () => import("./security-D-Fe-uyr.js");
var Route$35 = createFileRoute("/security")({
	component: lazyRouteComponent($$splitComponentImporter$31, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/security") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/security"], "/security")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/security"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$2.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Security",
			url: "/security"
		}])]
	})
});
//#endregion
//#region src/routes/sitemap[.]xml.ts
var Route$34 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const base = (process.env.SITE_URL || "https://innrly.com").replace(/\/+$/, "");
	const legalDate = "2026-06-06";
	const defaultEntries = [
		{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/features",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/pricing",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/contact",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/onboarding",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/about",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/security",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/developers",
			changefreq: "monthly",
			priority: "0.6"
		},
		{
			path: "/roi-calculator",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/case-studies",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/blog",
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/blog/innrly-joins-m3-partner-ecosystem-hotel-accounting-automation",
			changefreq: "monthly",
			priority: "0.9",
			lastmod: "2026-09-30"
		},
		{
			path: "/blog/best-hotel-accounting-software",
			changefreq: "monthly",
			priority: "0.9",
			lastmod: "2026-06-06"
		},
		{
			path: "/blog/hotel-back-office-automation",
			changefreq: "monthly",
			priority: "0.85",
			lastmod: "2026-05-25"
		},
		{
			path: "/blog/night-audit-automation",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-24"
		},
		{
			path: "/blog/multi-property-accounting-software",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-23"
		},
		{
			path: "/blog/ap-automation-hotels",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-22"
		},
		{
			path: "/blog/hotel-labor-cost-percentage",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-21"
		},
		{
			path: "/blog/innrly-vs-inn-flow",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-20"
		},
		{
			path: "/blog/hotel-budgeting-software-2026",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-19"
		},
		{
			path: "/blog/ota-reconciliation-guide",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-18"
		},
		{
			path: "/blog/select-service-back-office-savings",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-17"
		},
		{
			path: "/blog/mpor-explained",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-15"
		},
		{
			path: "/blog/hotel-night-audit-software-guide",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-14"
		},
		{
			path: "/blog/five-back-office-wins",
			changefreq: "yearly",
			priority: "0.6",
			lastmod: "2026-05-12"
		},
		{
			path: "/blog/quickbooks-for-hotels-limits",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-11"
		},
		{
			path: "/blog/hospitality-accounting-services-vs-software",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-09"
		},
		{
			path: "/blog/multi-property-hotel-accounting-software",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2026-05-08"
		},
		{
			path: "/blog/labor-cost-blind-spots",
			changefreq: "yearly",
			priority: "0.6",
			lastmod: "2026-04-28"
		},
		{
			path: "/blog/ota-commission-audit",
			changefreq: "yearly",
			priority: "0.6",
			lastmod: "2026-04-04"
		},
		{
			path: "/blog/pms-vs-back-office-automation",
			changefreq: "monthly",
			priority: "0.85",
			lastmod: "2026-05-26"
		},
		{
			path: "/blog/hotel-night-audit-checklist",
			changefreq: "monthly",
			priority: "0.85",
			lastmod: "2026-05-28"
		},
		{
			path: "/blog/hotel-ota-commission-reconciliation",
			changefreq: "monthly",
			priority: "0.85",
			lastmod: "2026-05-27"
		},
		{
			path: "/compare",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/compare/innrly-vs-otelier",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/compare/innrly-vs-nimble",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/compare/innrly-vs-aptech",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/compare/innrly-vs-profitsage",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/compare/innrly-vs-actabl",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/compare/innrly-vs-hotel-effectiveness",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/solutions/document-vault",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/solutions/expense-entries",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/solutions/business-intelligence",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/solutions/financial-control",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/solutions/operations-automation",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/solutions/innrly-pay",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/solutions/innrly-shift",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/solutions/reconciliation",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/solutions/labor-workforce",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/services/accountability-pack",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/integrations",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/integrations/m3",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/integrations/quickbooks",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/integrations/sage-intacct",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/integrations/inn-flow",
			changefreq: "monthly",
			priority: "0.9"
		},
		{
			path: "/integrations/opera",
			changefreq: "monthly",
			priority: "0.85"
		},
		{
			path: "/integrations/cloudbeds",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/integrations/mews",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/industries/select-service",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/industries/full-service",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/industries/extended-stay",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/case-studies/midwest-portfolio",
			changefreq: "yearly",
			priority: "0.75"
		},
		{
			path: "/case-studies/urban-full-service",
			changefreq: "yearly",
			priority: "0.75"
		},
		{
			path: "/case-studies/hilton-management-company",
			changefreq: "yearly",
			priority: "0.75"
		},
		{
			path: "/case-studies/extended-stay-portfolio",
			changefreq: "yearly",
			priority: "0.75"
		},
		{
			path: "/case-studies/boutique-group",
			changefreq: "yearly",
			priority: "0.75"
		},
		{
			path: "/glossary",
			changefreq: "monthly",
			priority: "0.7"
		},
		{
			path: "/legal/privacy",
			changefreq: "yearly",
			priority: "0.3",
			lastmod: legalDate
		},
		{
			path: "/legal/terms",
			changefreq: "yearly",
			priority: "0.3",
			lastmod: legalDate
		},
		{
			path: "/legal/subscription",
			changefreq: "yearly",
			priority: "0.4",
			lastmod: legalDate
		},
		{
			path: "/legal/security",
			changefreq: "yearly",
			priority: "0.4",
			lastmod: legalDate
		},
		{
			path: "/legal/cookies",
			changefreq: "yearly",
			priority: "0.3",
			lastmod: legalDate
		},
		{
			path: "/legal/accessibility",
			changefreq: "yearly",
			priority: "0.3",
			lastmod: legalDate
		}
	];
	let finalEntries = [];
	try {
		const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8005";
		const res = await fetch(`${backendUrl}/api/sitemap-entries`);
		if (res.ok) {
			const data = await res.json();
			const seoMap = data.seo_map || {};
			const blogs = data.blogs || [];
			defaultEntries.forEach((entry) => {
				const dbRow = seoMap[entry.path];
				if (dbRow && (dbRow.in_sitemap === 0 || dbRow.in_sitemap === false)) return;
				finalEntries.push({
					path: entry.path,
					changefreq: dbRow && dbRow.changefreq || entry.changefreq,
					priority: dbRow && dbRow.priority || entry.priority,
					lastmod: entry.lastmod
				});
			});
			blogs.forEach((b) => {
				if (b.in_sitemap === 0 || b.in_sitemap === false) return;
				const lastmod = b.updated_at ? String(b.updated_at).slice(0, 10) : b.created_at ? String(b.created_at).slice(0, 10) : void 0;
				finalEntries.push({
					path: `/blog/${b.slug}`,
					changefreq: "monthly",
					priority: "0.8",
					lastmod
				});
			});
		} else finalEntries = defaultEntries;
	} catch (e) {
		finalEntries = defaultEntries;
	}
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...finalEntries.map((e) => [
			`  <url>`,
			`    <loc>${base}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/blog.$slug.tsx
var posts = {
	"best-hotel-accounting-software": {
		title: "Best Hotel Accounting Software for Multi-Property Operators (2026)",
		metaTitle: "Best Hotel Accounting Software 2026 — Honest Buyer's Guide",
		date: "2026-06-06",
		body: [
			"There is no single \"best hotel accounting software\" — there are best fits for different portfolio sizes, brand mixes, and operating models. This guide walks the real options multi-property operators evaluate in 2026, where each one wins, where each one struggles, and where a PMS-agnostic automation layer fits on top of whichever GL you pick.",
			"Two layers, not one",
			"Before comparing products, separate two things that the category routinely conflates. The accounting system is the system of record for your books — the general ledger, AP/AR sub-ledgers, payroll, bank reconciliation, and the financial statements your owners and lenders read. The automation layer is everything that prepares the data before it hits the GL — pulling night-audit packs from every PMS, normalizing across brands, reconciling OTA statements, capturing and coding invoices, and pushing clean journals into the accounting system. The accounting system is permanent. The automation layer is what makes the accounting system useful at multi-property scale.",
			"The accounting systems operators actually use",
			"M3 — The dominant choice for hospitality. Hotel-specific chart of accounts, USALI-aligned reports out of the box, deep brand integrations. Best fit for 10–100+ property portfolios that want a single system covering GL, AP, and reporting. Pricing scales by property.",
			"Sage Intacct — A general-purpose cloud GL with strong multi-entity dimensions. Popular with ownership groups that operate hotels alongside other asset classes. Requires a hospitality overlay (chart of accounts, USALI mapping) to feel native — most operators add one.",
			"Inn-Flow — A full hospitality accounting suite (GL, AP, AR, payroll, bank rec, financials) plus its own labor and sales modules. Best fit for branded operators who want a single hospitality-native suite.",
			"Aptech — Long-standing hospitality accounting and BI platform (Profitvue, Webvue, Targetvue). Strong in owned-asset and ownership-group reporting. Often paired with a separate AP automation layer.",
			"QuickBooks Online — Fine for 1–3 hotels. Becomes painful around property 4–5, when the class/location dimension stops scaling, PMS reconciliation goes manual, and USALI reporting requires custom templates. Many operators keep QuickBooks and add an automation layer rather than migrating.",
			"ProfitSage / Otelier — Reporting and BI layers that sit on top of an accounting system, not a replacement for one. Worth knowing if BI is the gap you're solving for, not GL.",
			"How to pick the GL",
			"Portfolio size and growth plan. Under 5 properties: QuickBooks usually still works. 5–15 properties: M3 or Sage Intacct become worth the migration. 15+ properties: M3, Sage Intacct, or Inn-Flow's suite — pick based on whether you want a hospitality-native GL (M3, Inn-Flow) or a general-purpose GL with hospitality overlays (Sage Intacct).",
			"Brand mix. Single-brand operators get more out of a hospitality-native GL with deep brand integrations. Multi-brand operators care more about the PMS-agnostic automation layer above the GL, because the GL is going to look the same regardless of brand once the data is normalized.",
			"Internal vs outsourced accounting. If you run an in-house accounting team, the GL is theirs to live in — pick what they'll be productive in. If you outsource, ask your firm which GL they're fastest in.",
			"Onboarding tolerance. Full-suite platforms like M3, Inn-Flow, and Sage Intacct typically involve longer, structured implementations. QuickBooks is days. Plan the migration window honestly.",
			"Where the automation layer fits",
			"Whichever GL you pick, it does not know how to fetch a night-audit pack from OnQ, normalize it against an Opera property and a Cloudbeds property, line-match an Expedia statement, or capture and code 300 vendor invoices a month across 12 properties. That work has to happen before the journal entry reaches the GL — and it's the work that eats most of a corporate accounting team's week.",
			"Innrly is the automation layer. It sits between every PMS in your portfolio and whichever accounting system you run — M3 (Associate Partner integration), QuickBooks (two-way sync), Sage Intacct, and Inn-Flow (integration on the roadmap). It pulls and normalizes night-audit packs across brands, runs OTA reconciliation, captures and GL-codes invoices, handles Bill Pay, tracks labor and MPOR across properties, and pushes clean journals into the GL. The GL stays the system of record. Innrly makes it operate at multi-property speed.",
			"Comparison shortcuts",
			"Honest head-to-heads we maintain: Innrly: alternative to Otelier, Innrly: alternative to Aptech, Innrly: alternative to Nimble, Innrly: alternative to ProfitSage, Innrly: alternative to QuickBooks, and Innrly: alternative to Actabl. M3 and Inn-Flow are partner GLs, not competitors — Innrly is an M3 Associate Partner, and the Inn-Flow integration is on the roadmap. See Innrly + M3 and Innrly + Inn-Flow integration for how the data flows in.",
			"What to ask any vendor",
			"1. Are you the GL, or do you sit on top of one? If both, which mode are you selling me?",
			"2. Which PMSes do you pull from directly, and which require a file drop?",
			"3. Show me the chart-of-accounts mapping from one of my brands to the GL before I sign.",
			"4. Itemize per-property pricing — every module, every fee, implementation included.",
			"5. Week-by-week onboarding plan for property 1, property 5, and property 10.",
			"6. Three customer references at my portfolio size and brand mix.",
			"Where Innrly fits in your stack",
			"Innrly is not a hotel GL. It is the PMS-agnostic automation layer that makes whichever GL you pick — M3, Sage Intacct, QuickBooks, Inn-Flow, or Aptech — actually keep up with multi-property operations. $199 per property per month, transparent. 90-day free trial on your real data. 2–4 week onboarding because it's one product, not a suite.",
			"[Book a 20-minute walkthrough on your own data →](/contact)",
			"FAQ",
			"What is the best hotel accounting software in 2026? It depends on portfolio size and brand mix. M3 is the most common choice for 10+ property hospitality-native operators. Sage Intacct is common for ownership groups with mixed asset classes. Inn-Flow is a full hospitality suite for branded operators. QuickBooks still works for 1–3 hotels. Whichever you pick, add a PMS-agnostic automation layer above it.",
			"Is Innrly hotel accounting software? No. Innrly is the automation layer that sits between your PMSes and your accounting system. It does not replace M3, Sage Intacct, QuickBooks, or Inn-Flow — it feeds them clean, GL-coded data so the GL stays the system of record.",
			"Can I use QuickBooks for a multi-property hotel portfolio? Up to 3 hotels, usually yes. Beyond that, the property dimension, PMS reconciliation, and USALI reporting gaps cost more in manual work than upgrading the GL would. See our QuickBooks for hotels guide.",
			"Does Innrly integrate with M3, Sage Intacct, Inn-Flow, and QuickBooks? M3 via Associate Partner integration. QuickBooks via two-way sync. Sage Intacct via supported integration. Inn-Flow integration is on the roadmap — talk to us if you're an Inn-Flow customer interested in early access.",
			"How much does hotel accounting software cost? Wide range. QuickBooks Online is $30–$200 per company per month. M3 and Inn-Flow are quote-based, with pricing that varies by portfolio size and modules. Sage Intacct varies by entity count. Innrly's automation layer is $199 per property per month on top of whichever GL you run."
		]
	},
	"hotel-budgeting-software-2026": {
		title: "Hotel Budgeting Software: The 2026 Buyer's Guide",
		date: "2026-05-19",
		body: [
			"Hotel budgeting software in 2026 looks nothing like the spreadsheet templates most multi-property operators still run. The shift is driven by three forces: cloud PMS data is finally reliable enough to drive forecasts, USALI-aligned reporting has become table stakes for ownership groups, and labor cost volatility means budgets need to flex monthly, not annually. If you're evaluating hotel budgeting software for a portfolio of 3 or more properties, here's what actually matters.",
			"1. PMS-agnostic data ingestion",
			"Your budgeting tool has to pull actuals from every PMS you run, not just one. If it forces every property onto the same PMS extract format, it's already a dead end for multi-brand portfolios. Look for native connectors to Opera, choiceADVANTAGE, SynXis, OnQ, Cloudbeds, and Mews at minimum.",
			"2. USALI-aligned chart of accounts",
			"Ownership groups, lenders, and prospective buyers all read USALI. Your budgeting software should produce a USALI-aligned P&L for every property without custom mapping work — and let you roll up to a custom departmental view for internal reporting.",
			"3. Forecast vs budget vs actual, side by side",
			"The most useful budgeting view is the rolling forecast: budget, actual to date, latest forecast, and variance for every line item, every month. Static annual budgets that never get re-forecasted are how operators get caught off-guard by Q3 labor blowouts.",
			"4. Labor budget that respects MPOR",
			"Hotel labor budgets that work in dollars-only miss the underlying productivity story. Look for budgeting software that lets you budget labor in both dollars and MPOR (minutes per occupied room) — that way a low-occupancy month doesn't automatically look like a labor miss.",
			"5. Multi-property roll-up",
			"Every report at the property level should roll up cleanly to the portfolio level with no manual consolidation. This is where most budgeting tools fail — they handle one property well and then ask you to consolidate in Excel.",
			"How Innrly handles budgeting",
			"Innrly's budgeting and forecasting module is built directly on the same PMS-agnostic data layer as the rest of the platform. Actuals flow in nightly, budgets sit alongside them, and variance flags fire automatically. USALI-aligned reports ship by default. Talk to us if you'd like to see it on your own portfolio."
		]
	},
	"select-service-back-office-savings": {
		title: "How Select-Service Portfolios Save 5–15 Hours and $200–500 Per Hotel Each Week",
		metaTitle: "Select-Service Hotels: Save 5–15 Hrs/Week per Property",
		date: "2026-05-17",
		body: [
			"Select-service operators running on Innrly typically reclaim 5–15 hours of back-office time per hotel each week and prevent $200–500 of revenue loss per hotel weekly. The mechanism is simple: every night-audit pack is reviewed automatically for anomalies, and only the transactions that actually need attention surface to a human.",
			"What the night-audit review catches",
			"Unposted room charges, tax mismatches on folios, duplicate OTA commissions, comped rooms without approval, settlement variances between PMS and credit-card batches, and rate overrides outside policy. Individually small. Collectively meaningful — and they compound week over week if no one is looking.",
			"Why the time savings are real",
			"Reviewing a full night-audit pack manually takes a GM or accounting clerk 30–60 minutes per property per day, and most of that time is spent confirming things are fine. Innrly Pulse skips the green checks and shows only the exceptions, so the same review takes minutes.",
			"Why the revenue protection is real",
			"Anomalies caught the next morning are still recoverable: an OTA commission can be disputed, a missing posting can be charged back to the folio, a tax error can be corrected before the deposit clears. Anomalies caught at month-end usually aren't.",
			"What scales with portfolio size",
			"The per-hotel savings stay roughly constant. A 10-property operator saves 50–150 hours and prevents $2,000–5,000 of loss per week. A 50-property operator saves 250–750 hours and prevents $10,000–25,000 per week. The corporate team doesn't grow linearly with the portfolio because the review work doesn't either.",
			"Read the full case study at /case-studies/midwest-portfolio, or get in touch to see Innrly on your own data."
		]
	},
	"mpor-explained": {
		title: "MPOR Explained: The Labor Metric Hotel GMs Should Track Daily",
		metaTitle: "MPOR Explained: The Daily Hotel Labor Metric",
		date: "2026-05-15",
		body: [
			"MPOR — minutes per occupied room — is the single most useful labor metric in hotel housekeeping, and most GMs still don't track it daily. Labor percentage of revenue gets all the attention in monthly reviews, but it hides the underlying productivity story. MPOR doesn't.",
			"What MPOR measures",
			"MPOR is total housekeeping minutes worked divided by occupied rooms cleaned. A typical select-service target is 28–32 MPOR. A full-service or extended-stay property runs higher, 38–45 MPOR depending on suite mix. The exact target matters less than the trend at each individual property.",
			"Why it beats labor % of revenue",
			"Labor as a percentage of revenue moves with ADR. A strong-rate month can make labor look good even if MPOR is bad. A soft-rate month makes labor look terrible even if housekeeping is running tight. MPOR strips out the rate noise and measures productivity directly.",
			"How to track MPOR daily",
			"Pull total housekeeping clock-in minutes from your TimeClock system, divide by yesterday's occupied rooms (from the PMS), and post the number next to yesterday's labor dollars. A 5-minute morning report. The trend across the week is what tells the story — one bad day is noise, three in a row is a pattern.",
			"What to do when MPOR drifts",
			"MPOR creep usually traces to one of three things: a new housekeeper still ramping (give it 2 weeks), shift overlap that pads minutes (fix the schedule), or rooms that legitimately take longer due to checkout vs stayover mix (no action needed). Knowing which one matters before reacting.",
			"Innrly Shift surfaces MPOR daily across every property in a 5-minute snapshot. Talk to us if you'd like to see it on your portfolio."
		]
	},
	"quickbooks-for-hotels-limits": {
		title: "QuickBooks for Hotels: Why Multi-Property Operators Outgrow It",
		metaTitle: "QuickBooks for Hotels: Why Operators Outgrow It",
		date: "2026-05-11",
		body: [
			"QuickBooks works fine for one or two hotels. Plenty of independent operators run it for years without a real problem. The pain starts somewhere between the third and fifth property — and it's almost always the same three things.",
			"1. The property dimension problem",
			"QuickBooks Online treats properties as classes or locations, which is fine until you need a true portfolio P&L with property-level departmentalization. The reports get long, the consolidations get manual, and the moment ownership asks for a USALI-aligned summary, you're rebuilding in Excel.",
			"2. PMS reconciliation is your problem, not QuickBooks'",
			"QuickBooks doesn't know what room nights, OTA commissions, or settlement batches are. Every nightly revenue post requires a journal entry built from your PMS extract — done manually or via a third-party connector that always seems to break on a holiday weekend.",
			"3. USALI reporting requires templates",
			"There's no native USALI report in QuickBooks. You either build a custom report template (and rebuild it every time the chart of accounts changes) or export to Excel for every monthly ownership package.",
			"What multi-property operators move to",
			"Most operators don't fully replace QuickBooks — they keep it as the GL and add a PMS-agnostic accounting layer on top. The accounting layer handles nightly revenue posting, OTA reconciliation, bank matching, and A/P automation, then syncs clean journals to QuickBooks. QuickBooks becomes the system of record; the accounting layer becomes the workflow.",
			"When to make the switch",
			"Rule of thumb: if month-end close is taking more than 7 business days, or if your controller spends more than half their time on data movement instead of analysis, the QuickBooks-alone setup is costing you more than the software would.",
			"How Innrly fits",
			"Innrly is the PMS-agnostic accounting layer described above. It connects with QuickBooks (two-way sync), Sage Intacct, and M3 (Associate Partner push integration), so you don't have to migrate your GL to get the workflow upgrade. Talk to us about a walkthrough on your stack."
		]
	},
	"hospitality-accounting-services-vs-software": {
		title: "Hospitality Accounting Services vs Software: Which Saves More?",
		metaTitle: "Hospitality Accounting: Services vs Software",
		date: "2026-05-09",
		body: [
			"Most multi-property hotel operators eventually face the same fork: outsource the back office to a hospitality accounting service, or invest in PMS-agnostic software. Both work. They save different amounts at different portfolio sizes — and the wrong choice locks in cost for years.",
			"The outsourced service model",
			"A typical hospitality accounting service charges $1,200–$2,500 per property per month and handles night audit review, A/P coding, monthly close, and ownership reporting. Quality varies wildly. The good ones are excellent. The mediocre ones become a black box you can't get answers from.",
			"The software model",
			"PMS-agnostic back-office software runs $200–$400 per property per month and automates the same workflows — night audit, OTA reconciliation, A/P with OCR, USALI reporting — but leaves a controller or bookkeeper in the loop to handle exceptions and analysis.",
			"Cost comparison at 3 properties",
			"Outsourced: 3 × $1,800 avg = $5,400/month, $64,800/year. Software + part-time bookkeeper: $200 × 3 = $600/month software + $30K bookkeeper = $37,200/year. Software wins by ~$27K/year, with full visibility into the books.",
			"Cost comparison at 10 properties",
			"Outsourced: 10 × $1,800 = $18,000/month, $216,000/year. Software + 1 full-time controller: $300 × 10 = $3,000/month software + $90K controller = $126,000/year. Software wins by ~$90K/year — and the controller can do real analysis instead of data entry.",
			"Cost comparison at 25 properties",
			"Outsourced: 25 × $1,800 = $45,000/month, $540,000/year. Software + 2-person finance team: $300 × 25 = $7,500/month + $200K team = $290,000/year. Software wins by ~$250K/year, and you keep institutional knowledge in-house.",
			"When outsourcing still makes sense",
			"Two cases. First, very small portfolios (1–2 properties) where you genuinely can't justify any in-house finance person. Second, owners who explicitly do not want any operational involvement and are willing to pay the premium for hands-off.",
			"The verdict",
			"For 3+ properties with at least one in-house finance person, PMS-agnostic software wins on cost, transparency, and ownership of your own data. The savings scale linearly with portfolio size.",
			"Innrly is the software side of this comparison. Talk to us if you're weighing a switch."
		]
	},
	"ota-reconciliation-guide": {
		title: "OTA Reconciliation: How to Catch Commission Errors Automatically",
		metaTitle: "OTA Reconciliation: Catch Commission Errors Automatically",
		date: "2026-05-18",
		body: [
			"OTA reconciliation is one of the highest-ROI tasks in hotel finance — and one of the most neglected. Booking.com, Expedia, and the other major channels make mistakes on a meaningful percentage of reservations: wrong commission rates, missing cancellations, chargebacks that never get credited back, mis-applied promotions. For a typical select-service portfolio, those errors add up to 1–3% of OTA revenue every month. On a portfolio doing $10M through OTAs, that's $100K–$300K a year that walks out the door because no one has time to match line items.",
			"The reason it gets skipped is structural. OTA statements arrive in different formats, on different schedules, from different portals. Each property has its own PMS extract. Reconciling a single property for a single month is a 4–6 hour spreadsheet job. Multiply that by twelve properties and you're looking at a full-time role just to do the matching — which is why most operators sample a few properties a quarter and hope the rest are clean.",
			"What automated OTA reconciliation actually does",
			"An OTA reconciliation engine normalizes every channel statement into the same schema, pulls the matching reservations from each PMS, and matches three things on every line: the room nights billed, the commission rate applied, and the net amount remitted. Anything that doesn't match within a tolerance window gets flagged for review. Cancellations that should have reversed commission but didn't, no-shows billed at the wrong rate, and chargebacks that were debited but never credited back all surface automatically.",
			"What to match on every reservation",
			"Three checks catch the vast majority of OTA errors. First, room nights — did the OTA bill commission on the actual nights stayed, not the original booking length? Second, rate — was the commission calculated against the correct net rate after any promotions or member discounts? Third, settlement — did the net amount land in your bank account, on time, and against the right merchant of record? Any one of these failing is a flag. All three matching is a clean reservation.",
			"Why this beats spreadsheets",
			"Spreadsheet reconciliation works for one property at a time, and only if the person doing it is consistent. The moment that person is on PTO, two months go by, and the trail goes cold. Automated reconciliation runs every day, produces a daily exceptions queue, and keeps an audit log that survives staff turnover. The flag-rate stabilizes within the first 30 days as the system learns each channel's quirks.",
			"Implementation reality",
			"For a multi-property portfolio, expect the first month of automated OTA reconciliation to surface the biggest dollar amounts — historic chargebacks that were never credited back, cancellation commissions that should have reversed years ago. Months two and three settle into a steady-state exception queue of 20–40 line items per property per month, most of which a finance associate can clear in under an hour. That's the whole pitch: an hour a month per property instead of half a day, plus the dollars you weren't catching at all.",
			"Innrly's OTA reconciliation engine ships with every Financial Control plan and works across every major OTA and PMS. If you'd like to see it run on a sample of your own data, talk to us about a live walkthrough."
		]
	},
	"hotel-night-audit-software-guide": {
		title: "Hotel Night Audit Software: A 2026 Buyer's Guide",
		date: "2026-05-14",
		body: [
			"Hotel night audit software has changed more in the last three years than in the previous fifteen. The combination of cloud PMSes, OCR for paper folios, and lightweight automation layers means the night audit role at most properties has shifted from a 4–6 hour manual close to a 20-minute exceptions review. If you're evaluating night audit software for a multi-property portfolio in 2026, here's what actually matters.",
			"1. PMS-agnostic by design",
			"If you operate across multiple brands — and most independent and franchise portfolios do — your night audit software has to speak every PMS you run. Opera, OPERA Cloud, Choice's choiceADVANTAGE, Wyndham's SynXis, Hilton OnQ, Marriott FOSSE, plus any independents on Cloudbeds, Mews, or innRoad. A tool that only works with one PMS is a single-property tool wearing a multi-property label.",
			"2. Variance flags, not packets",
			"Old night audit software produced a 60-page PDF packet for every property every morning. Nobody reads it. Modern night audit software produces an exceptions list: variances over a threshold, comps and voids over a threshold, rate overrides outside policy, and any reconciliation that didn't close. The GM walks in and sees the 4 things that actually need attention, not 60 pages they have to skim.",
			"3. Automated distribution and acknowledgment",
			"The packet still needs to go to the right people — GM, regional, owner, accounting — with the right level of detail for each role. Look for software that handles role-based distribution, tracks acknowledgment, and escalates if something sits unread for 24 hours.",
			"4. Bank, OTA, and credit-card reconciliation built in",
			"The biggest single change in modern night audit software is that reconciliation is no longer a separate end-of-month task. Bank deposits match against PMS settlements daily. OTA commissions match against reservations daily. Credit card batches reconcile to the merchant statement daily. Anything that doesn't match becomes an exception the next morning, not a surprise at month-end close.",
			"5. Audit trail and SOX-readiness",
			"If you're growing toward institutional ownership or a future sale, your night audit software needs to produce an immutable audit trail. Every adjustment, every comp, every override should be timestamped, attributed, and exportable. This is invisible in normal operations but becomes essential the moment a buyer's diligence team shows up.",
			"6. Total cost of ownership",
			"Per-property pricing is the industry norm, but watch for: setup fees per property, per-PMS connector fees, separate fees for OTA reconciliation, and any per-user pricing on top. A clean night audit platform should be one per-property monthly fee that includes the integrations you actually need.",
			"How Innrly fits",
			"Innrly's Night Audit+ runs across every major PMS, produces an exceptions-first morning report, and ships with OTA and bank reconciliation included. Select-service operators typically see the morning review compress from 30–45 minutes per property to under 10. See it on your own data — book a 20-minute walkthrough."
		]
	},
	"multi-property-hotel-accounting-software": {
		title: "Multi-Property Hotel Accounting Software: PMS-Agnostic Workflows",
		metaTitle: "Multi-Property Hotel Accounting: PMS-Agnostic Guide",
		date: "2026-05-08",
		body: [
			"Multi-property hotel accounting software has a fundamental design problem: most of it assumes every property runs the same PMS. In the real world, a 12-property portfolio might run 4 PMSes across 3 brands plus 2 independents. The accounting software either forces the operator to standardize (politically and operationally expensive) or limps along with manual workarounds at every property that doesn't match the assumed PMS.",
			"The PMS-agnostic alternative",
			"A PMS-agnostic accounting layer treats every PMS as a data source. It normalizes nightly the same way regardless of brand: rooms revenue, F&B revenue, other revenue, settlements by tender, tax by jurisdiction, comps and adjustments. The accounting workflow downstream — coding, approval, GL post — doesn't care which PMS the data came from. That's the whole unlock.",
			"Workflow #1: nightly revenue posting",
			"Every property posts a normalized nightly revenue journal to a single GL automatically. No more property-by-property month-end push to QuickBooks or Sage Intacct. If a property's PMS extract fails or the numbers don't balance, an exception fires that night — not on the 5th of the following month when the controller tries to close.",
			"Workflow #2: A/P invoice capture and GL coding",
			"Invoices arrive by email, scan, or vendor portal. OCR pulls header data, AI suggests the GL code based on vendor history, an approver reviews on mobile, and the invoice posts to the GL with the right property dimension. The same workflow runs whether the property is a Hampton Inn or an independent boutique — because the workflow lives in the accounting layer, not the PMS.",
			"Workflow #3: OTA and bank reconciliation",
			"OTA commissions and bank deposits reconcile daily against the normalized PMS extract. This is where multi-property hotels lose the most money: chargebacks that don't post back, commissions billed on cancelled reservations, deposits that arrive in the wrong account. A PMS-agnostic reconciliation engine catches these without anyone having to remember to check.",
			"Workflow #4: owner-ready financials",
			"Most ownership groups want financials in their own format — USALI-aligned but with custom department rollups, comparative budgets, and a portfolio summary. A PMS-agnostic accounting layer produces these from the normalized data, on a single template, every month, without rebuilding the report property-by-property.",
			"What to avoid",
			"Two anti-patterns. First, software that requires you to standardize on one PMS — that's not multi-property accounting, that's single-PMS accounting with a multi-property label. Second, software that handles the GL but not the underlying reconciliation — you'll save time on coding and lose more time chasing variances that should have been caught nightly.",
			"Where Innrly fits",
			"Innrly is built PMS-agnostic from day one. Properties on Opera, choiceADVANTAGE, SynXis, OnQ, Cloudbeds, and others post to a single normalized accounting layer with QuickBooks, M3, and Sage Intacct sync downstream. If you'd like a walkthrough on your portfolio, get in touch."
		]
	},
	"five-back-office-wins": {
		title: "Five back-office wins for hotel operators in 2026",
		date: "2026-05-12",
		body: [
			"Most hotel back offices are running the same processes they ran ten years ago — daily packets, Excel sheets, paper checks. Here are five changes that take a week to roll out and pay back inside a month.",
			"1. Automate night audit packet distribution. 2. Replace paper checks with Virtual Cards. 3. Move OTA commission reconciliation off spreadsheets. 4. Run a daily 5-minute labor snapshot. 5. Standardize KPIs across every property.",
			"Each of these is small in isolation. Together they reclaim 20–40 hours per property per month — time your team puts back into guest experience."
		]
	},
	"labor-cost-blind-spots": {
		title: "The three labor-cost blind spots eating your margin",
		date: "2026-04-28",
		body: ["If you're only tracking labor as a percentage of revenue, you're missing the costs that actually move the needle. Here are three blind spots most operators have.", "Minutes-per-room. MPOR. And unauthorized overtime that accumulates across shifts. Each of these is invisible in a P&L but visible in a daily labor snapshot."]
	},
	"ota-commission-audit": {
		title: "How to audit OTA commissions without spreadsheets",
		date: "2026-04-04",
		body: ["OTA commission audits are the most-skipped task in hotel finance because they're the most painful. Here's a repeatable monthly process you can hand to anyone on the team.", "Step one: standardize how you pull data from each OTA. Step two: match every reservation to settled payments. Step three: flag any commission that doesn't reconcile within your tolerance window."]
	},
	"hotel-back-office-automation": {
		title: "Hotel Back-Office Automation: The Complete 2026 Guide",
		date: "2026-05-25",
		body: [
			"If you run more than two hotels, your back office is probably the most expensive cost center nobody talks about. Night auditors keying numbers into spreadsheets. A/P clerks re-typing invoices into M3 or QuickBooks. Revenue managers chasing OTA reconciliation differences at month-end. A controller burning 40 hours on close.",
			"Hotel back-office automation replaces those manual workflows with software that captures, codes, reconciles, and posts the data for you. Done right, it saves a multi-property operator 40 to 180 hours per property per month. This guide explains exactly what it covers, what to look for, and where most platforms fall short.",
			"What hotel back-office automation actually includes",
			"The term gets used loosely. Here is what a real back-office automation platform replaces:",
			"1. Night audit consolidation Pulling the daily PMS flash report, normalizing it across brands (Choice, Wyndham, Hilton, IHG), and pushing clean GL-coded entries into your accounting system. Without automation: 20–40 minutes per property per night × 30 nights × N properties.",
			"2. Accounts payable Invoice capture (OCR + email-in), header and line extraction, GL coding, approval routing, and push to your accounting system. Without automation: A/P clerks spend 4–8 hours per property per week keying invoices.",
			"3. OTA reconciliation Matching Expedia, Booking.com, and direct OTA statements to PMS bookings and bank deposits, then flagging variances. Without automation: revenue managers find variances weeks late — often after the dispute window closes.",
			"4. Bill Pay Generating ACH and check runs from approved invoices, with vendor remittance and audit trail. Without automation: a separate banking workflow that nobody connects back to the GL.",
			"5. Document vault Centralized storage for invoices, contracts, brand statements, payroll exports, and audit packs — searchable by property, vendor, date, and GL code. Without automation: SharePoint folders nobody can find anything in.",
			"6. Business intelligence RevPAR, ADR, occupancy, GOPPAR, and flow-through across the portfolio in one dashboard, sliced by brand, region, and asset. Without automation: 12-tab Excel workbooks emailed every Monday.",
			"7. Labor management Scheduling, time and attendance, and labor cost percentage tracking tied to RevPAR. Without automation: spreadsheets and a separate scheduling tool that nobody reconciles to actual hours worked.",
			"How much time it actually saves",
			"The honest answer depends on portfolio size:",
			"| Portfolio | Hours saved / property / month | Annual hours saved | |---|---|---| | 1–3 properties | 40–60 | ~1,800 | | 4–10 properties | 80–120 | ~12,000 | | 11–25 properties | 120–180 | ~45,000 | | 25+ properties | 150–200+ | 60,000+ |",
			"At a fully loaded back-office cost of ~$45/hour, a 10-property operator saving 100 hours per property per month recoups $540,000 per year — typically 8–15× the platform cost.",
			"What separates the real platforms from the rebranded suites",
			"There are two architectures on the market:",
			"Single-platform automation (one login, one data model, one set of integrations). Innrly is built this way. Pricing is transparent and onboarding is 2–4 weeks because there is one product to learn.",
			"Acquired-suite automation (Otelier is the example here — Datavision + Inntelligent + myDigitalOffice + HelloGM rolled into one brand). Each module retains its own data model, login flow, and support team. Onboarding is 8–16 weeks and pricing is per-module quotes.",
			"If you are evaluating, ask: - How many separate logins after I sign? - How many data models are stitched together under the hood? - What does pricing look like for a 10-property portfolio — itemized? - How long is onboarding for property #4?",
			"Evaluation checklist",
			"Use this when you sit down with any back-office vendor:",
			"- [ ] PMS coverage — does it support every brand in your portfolio without manual file uploads? - [ ] Accounting integration — is it an M3 partner integration, two-way with QuickBooks, real with Sage Intacct? Push-only or bi-directional? - [ ] OTA reconciliation — Expedia, Booking.com, and the direct channel? - [ ] Bill Pay — ACH and check, with vendor remittance and audit trail? - [ ] Labor — scheduling + time clock + cost % tied to RevPAR, or just a punch clock? - [ ] BI — does it match what you already produce in Excel? Can it drill from portfolio → brand → property → line? - [ ] Onboarding — 2–4 weeks or 8–16? - [ ] Pricing transparency — published, per-property, no hidden modules? - [ ] Single platform — one login or six?",
			"How Innrly fits",
			"Innrly is the single-platform option. M3 Associate Partner, two-way QuickBooks sync, support for Sage Intacct, full OTA reconciliation, Innrly Pay for Bill Pay, Innrly Shift for labor, and a BI layer that matches what most controllers already build by hand. Transparent pricing at $199 per property per month. 90-day free trial. 2–4 week onboarding.",
			"[Book a 20-minute walkthrough on your own data →](/contact)",
			"FAQ",
			"What is hotel back-office automation? Software that replaces manual back-office work — night audit consolidation, A/P, OTA reconciliation, Bill Pay, BI, and labor — with automated capture, coding, reconciliation, and posting into your accounting system.",
			"How much time does it save? For a 10-property operator, typically 80–120 hours per property per month, depending on current process maturity.",
			"Does it replace my accounting system? No. Platforms like Innrly sit in front of M3, QuickBooks, or Sage Intacct as the back-office automation layer. The accounting system stays the system of record.",
			"How long does it take to deploy? A real single-platform vendor onboards a property in 2–4 weeks. Multi-module suites take 8–16 weeks because each module is a separate implementation.",
			"What does it cost? Innrly is $199 per property per month, transparent and published. Multi-module suites quote per module, typically $400–$1,200 per property per month all-in."
		]
	},
	"night-audit-automation": {
		title: "Night Audit Automation: Eliminate the 2 AM Excel Marathon",
		date: "2026-05-24",
		body: [
			"Every night, in every hotel in your portfolio, somebody runs the PMS flash report, opens an Excel template, types in revenue numbers, room counts, ADR, occupancy, and tax buckets, saves the file, and emails it to corporate. Multiply by 30 nights, multiply by N properties, multiply by 12 months.",
			"That is the workflow night audit automation replaces. This guide explains what it actually does, why brand-specific PMS exports break naive solutions, and how to deploy it across a multi-brand portfolio.",
			"What the night audit really produces",
			"A clean night audit produces, for every property, every night:",
			"- Daily revenue (rooms, F&B, other) broken down by transaction type - Room counts: occupied, vacant, OOO, complimentary - ADR, occupancy, RevPAR - Tax buckets (state, county, city, occupancy tax) - A/R aging delta - A/P invoices received that day - A GL-coded journal entry ready to post",
			"In a manual workflow, the night auditor produces about half of this and an analyst at corporate produces the other half three days later from the emailed flash report.",
			"Why brand-specific PMS exports break naive solutions",
			"You probably operate across multiple brands. Each brand's PMS exports are different:",
			"- Choice (ChoiceAdvantage): CSV with one row per transaction, but tax breakdowns are columns - Wyndham (Opera or Synxis): XML or PDF, often emailed not API - Hilton (OnQ): CSV with proprietary column codes, GL codes per brand - IHG (HMS): Different field names than Hilton, different tax structure - Marriott (FOSSE / HotSOS): PDF, requires OCR + parsing - Independents: Cloudbeds, Mews, Stayntouch, ROOMMASTER — each one a different schema",
			"A real automation platform normalizes all of this into one canonical chart of accounts, with brand-specific mapping templates that are maintained for you. Naive solutions (Excel templates, in-house scripts) break the first time a brand changes its export format.",
			"The 5 things night audit automation should do",
			"1. Ingest every brand's export automatically Direct API where available, email-in + OCR where not. No manual file upload after the first week.",
			"2. Normalize to one chart of accounts Brand-specific account codes mapped to your corporate GL. Tax buckets harmonized across jurisdictions.",
			"3. Generate the journal entry GL-coded, balanced, ready to post into M3, QuickBooks, or Sage Intacct. Pushed automatically if the integration supports it.",
			"4. Roll up to portfolio dashboards Same night, portfolio-wide RevPAR, ADR, occupancy, and revenue, available before the corporate team wakes up.",
			"5. Flag exceptions Negative variances, missing data, brand export failures — flagged with the property name, the field, and the suggested fix.",
			"Time and cost savings",
			"For a typical 10-property portfolio:",
			"- Manual night audit consolidation: 20–40 minutes per property per night × 30 nights × 10 properties = 100–200 hours / month - Automated: 0 hours (exception flagging only — ~2 hours / month)",
			"At $45/hour fully loaded, that is $4,500–$9,000 / month recovered, plus management gets RevPAR by 6 AM instead of 3 PM three days later.",
			"Deploying across a multi-brand portfolio",
			"The right deployment order:",
			"1. Pilot on your highest-volume brand first (usually Choice or Wyndham). Get one property clean. 2. Add the rest of that brand — same mapping template, low marginal effort. 3. Add a second brand — new mapping template, but accounting and BI layers stay the same. 4. Add the long tail — independents, boutique brands.",
			"Most operators complete a 10-property, 3-brand deployment in 2–4 weeks. Multi-module suites take 8–16 weeks because each brand goes through a separate implementation team.",
			"How Innrly handles it",
			"Innrly ingests night audit data from every major hotel brand and most independents, normalizes to your chart of accounts, generates GL-coded journal entries, and pushes them into your accounting system (M3 push, QuickBooks two-way, Sage Intacct). Portfolio RevPAR, ADR, and occupancy roll up to the BI dashboard before corporate wakes up. Exceptions get flagged with the property, field, and fix.",
			"[See your own portfolio's night audit running in Innrly →](/contact)",
			"FAQ",
			"Does this replace my night auditor? No. Night auditors still close the day at the property level. Innrly replaces the consolidation, normalization, and corporate reporting layer that sits on top.",
			"What if my brand isn't supported? Innrly supports every major US brand and most independents. New brands are typically added in 1–2 weeks if there is an exportable format.",
			"Does it push directly to M3? Yes. Innrly is an M3 Associate Partner. GL-coded entries push automatically.",
			"What about QuickBooks? Two-way sync with QuickBooks Online. Entries push out, vendors and CoA read back.",
			"How long to deploy 10 properties across 3 brands? 2–4 weeks for a single-platform vendor like Innrly. 8–16 weeks for multi-module suites."
		]
	},
	"multi-property-accounting-software": {
		title: "Multi-Property Hotel Accounting Software: The 2026 Buyer's Guide",
		metaTitle: "Multi-Property Hotel Accounting: 2026 Buyer's Guide",
		date: "2026-05-23",
		body: [
			"If you are running 5+ hotels, your accounting stack is the most important software decision in the company. Get it wrong and you spend the next three years duct-taping integrations and explaining variances to your lender. Get it right and your close shrinks from 15 days to 4.",
			"This guide compares the four real options in 2026 — M3, Sage Intacct, QuickBooks (with Innrly), and the all-in-one suites — and explains how to evaluate them for a multi-property portfolio.",
			"The four architectures",
			"1. M3 (Innrly + M3) M3 is the dominant hotel-specific accounting platform in North America. Strongest for portfolios of 10+ branded hotels. Innrly is an M3 Associate Partner — capture, code, and push invoices into M3 as the system of record.",
			"Best for: Branded portfolios (Choice, Wyndham, Hilton, IHG) at 10+ properties.",
			"2. Sage Intacct (Innrly + Sage Intacct) Sage Intacct is the enterprise general ledger for portfolios that have outgrown M3 or QuickBooks. Strong multi-entity consolidation, dimensional reporting, audit-ready. Innrly integrates as the hotel-specific back-office layer in front.",
			"Best for: Large portfolios (25+ properties), portfolios with mixed asset types (hotels + commercial + residential), or PE-backed operators that need GAAP consolidation.",
			"3. QuickBooks Online (Innrly + QuickBooks) QuickBooks Online is the right answer for portfolios of 1–15 properties that want a low total cost of ownership. Two-way sync with Innrly handles invoice capture, GL coding, OTA reconciliation, and BI — QuickBooks stays the accounting system of record.",
			"Best for: Independents, boutique groups, and growing portfolios under 15 properties.",
			"4. All-in-one suites (Otelier, etc.) Bundles general ledger + back-office automation + BI + labor in one platform. Sounds attractive; in practice these are usually acquired-product suites (Datavision + Inntelligent + myDigitalOffice + HelloGM for Otelier) with separate logins and data models stitched together.",
			"Best for: Operators who genuinely need everything from one vendor and have the budget for 8–16 week onboarding.",
			"Evaluation criteria",
			"Use this checklist for every vendor:",
			"Multi-property fit - [ ] How does it consolidate financials across N properties? - [ ] Is there a single chart of accounts or per-property? - [ ] How are intercompany eliminations handled? - [ ] Property-level + portfolio-level + brand-level reporting?",
			"Integration depth - [ ] PMS coverage for every brand in your portfolio - [ ] OTA channels (Expedia, Booking.com, direct) - [ ] Payroll (ADP, Paychex, Gusto) - [ ] Bank feeds and Bill Pay - [ ] BI / data warehouse export",
			"Workflow automation - [ ] Invoice capture (OCR + email-in) - [ ] Auto GL coding - [ ] Approval routing - [ ] OTA reconciliation - [ ] Night audit consolidation - [ ] Labor and time tracking",
			"Total cost of ownership - [ ] Software cost per property per month - [ ] Implementation cost - [ ] Ongoing support cost - [ ] Hidden module costs",
			"Deployment realism - [ ] Onboarding time for property #1 - [ ] Marginal time for property #10 - [ ] Support model (dedicated CSM? ticketed queue?) - [ ] References from operators your size",
			"Total cost of ownership by stack (10-property portfolio, annual)",
			"| Stack | Software | Implementation | Internal labor | Total Y1 | |---|---|---|---|---| | M3 + Innrly | M3 quote + $24K | Varies by portfolio | $60K | Request quote | | Sage Intacct + Innrly | Sage quote + $24K | Varies by portfolio | $60K | Request quote | | QuickBooks + Innrly | $3K + $24K | $5K | $60K | $92K | | Otelier (all-in-one) | $144K+ | $60K+ | $80K | $284K+ |",
			"(Numbers are illustrative for a 10-property portfolio. Get quotes for your portfolio.)",
			"How to pick",
			"- Under 5 properties: QuickBooks + Innrly. Lowest TCO, fastest deploy. - 5–15 properties, branded: M3 + Innrly. Hotel-specific GL with deep brand integrations. - 15–25 properties, mixed: Sage Intacct + Innrly. Multi-entity consolidation, GAAP-ready. - 25+ properties, PE-backed: Sage Intacct + Innrly. Audit-ready reporting.",
			"How Innrly fits every option",
			"Innrly is the back-office automation layer that sits in front of M3 (Associate Partner), QuickBooks (two-way), or Sage Intacct. One platform handles invoice capture, GL coding, OTA reconciliation, night audit, Bill Pay, BI, and labor. Your accounting system stays the system of record.",
			"[See Innrly running with your accounting stack →](/contact)",
			"FAQ",
			"Do I need to switch accounting systems to use Innrly? No. Innrly works with M3, QuickBooks Online, and Sage Intacct as your system of record.",
			"Is M3 better than Sage Intacct? For hotels under 25 properties, usually yes — it is hotel-specific. For mixed portfolios or 25+ properties, Sage Intacct's consolidation tools usually win.",
			"Can we move from QuickBooks to M3 later? Yes. Operators commonly start on QuickBooks + Innrly and migrate the GL to M3 at 10–15 properties. Innrly carries forward — invoices, vendors, GL mappings.",
			"What about all-in-one suites? They work if you need everything from one vendor and can absorb a 12-week implementation. Most multi-property operators prefer the best-of-breed stack (proven GL + best-in-class automation layer) for faster ROI.",
			"How long does Innrly onboarding take? 2–4 weeks for the first property, 1–2 weeks marginal for each additional property."
		]
	},
	"ap-automation-hotels": {
		title: "A/P Automation for Hotels: Capture, Code, Approve, Pay",
		date: "2026-05-22",
		body: [
			"For a typical multi-property hotel group, accounts payable is the single highest-volume back-office workflow. A 10-property operator processes 3,000–6,000 invoices a month across utilities, laundry, F&B, OS&E, maintenance, brand fees, OTA commissions, and dozens of one-off vendors. Most do it by hand.",
			"This guide explains how A/P automation actually works for hotels, what to look for, and how to evaluate platforms.",
			"The 4 stages of A/P automation",
			"1. Capture Invoices arrive via email, mailed paper, vendor portal, or PDF attachment. A real A/P automation platform handles all four channels:",
			"- Email-in: dedicated `ap@<property>.yourdomain.com` address. Vendors send PDFs, the system extracts. - OCR: header, vendor, line items, totals, tax, due date — extracted automatically. - Paper: scan-to-email or mobile capture. - Vendor portals: API or scheduled pull.",
			"The bar is 95%+ first-pass capture accuracy without any human keystroke.",
			"2. Code Every invoice needs a GL code, a property, a class/department, and (often) a project or capex code. A real platform:",
			"- Auto-suggests GL based on vendor + history (Acme Linen Service → 6240 Laundry) - Splits line items to multiple GLs when invoices cover multiple departments - Routes to the correct property automatically using vendor + property mapping - Applies tax rules by jurisdiction",
			"After 30–60 days of training data, 80%+ of invoices auto-code without human review.",
			"3. Approve Approval routing by property, dollar threshold, vendor type, or GL code. Approvers see a single email with the invoice, the proposed coding, and one-click Approve / Reject / Reassign.",
			"Critical features: - Multi-level approval ($0–$1K to GM, $1K–$10K to AGM, $10K+ to VP Ops) - Mobile approval (most GMs are not at a desk) - Out-of-office delegation (don't bottleneck on vacation) - Audit trail (who approved, when, from where)",
			"4. Pay Approved, coded invoices generate Bill Pay runs:",
			"- ACH for vendors with bank details on file - Check for the long tail - Vendor remittance auto-emailed with invoice numbers - Audit pack generated for month-end",
			"Why hotel A/P is different from generic A/P",
			"Generic A/P platforms (Bill.com, Tipalti, AvidXchange) work for office businesses. Hotels have specific complications:",
			"- Property-level coding. Every invoice belongs to a property, not just a department. - Brand-specific GL. Choice's chart of accounts differs from Wyndham's differs from IHG's. - OTA commission invoices. Reconcile to PMS bookings before paying. - Pass-through utilities. Some hotels pass utilities to ownership, some don't — coding matters. - F&B vendor frequency. Daily deliveries, weekly invoices, monthly statements. - High GM turnover. Approval routing must survive personnel changes without breaking.",
			"A hotel-specific A/P platform handles all of this out of the box. A generic platform requires custom configuration that breaks every time something changes.",
			"What \"good\" looks like for a 10-property portfolio",
			"- 4,000 invoices / month captured automatically - 80%+ auto-coded - 95% first-pass approval (no rework) - 0 missed early-payment discounts - 0 duplicate payments - 4-hour controller review per week (vs 40 hours of clerk keying) - Audit pack auto-generated in 30 seconds at month-end",
			"Evaluation checklist",
			"- [ ] Email-in capture per property - [ ] OCR accuracy 95%+ on hotel invoice types - [ ] Auto GL coding with history learning - [ ] Line-item splits - [ ] Multi-level approval routing - [ ] Mobile approval - [ ] ACH and check Bill Pay - [ ] Vendor remittance - [ ] Push to M3, two-way QuickBooks, or Sage Intacct - [ ] Audit pack export - [ ] Duplicate invoice detection - [ ] Early payment discount tracking",
			"How Innrly handles it",
			"Innrly's A/P module is purpose-built for multi-property hotels: email-in capture per property, hotel-tuned OCR, auto GL coding that learns from your history, multi-level approval routing, and Innrly Pay for ACH + check Bill Pay. Invoices push to M3 (Associate Partner), QuickBooks (two-way), or Sage Intacct.",
			"[See A/P automation on your own invoices →](/contact)",
			"FAQ",
			"How long until auto-coding accuracy reaches 80%? Typically 30–60 days, depending on invoice volume.",
			"Do we keep our existing approval workflow? Yes. Innrly mirrors your existing approval hierarchy by property, dollar threshold, GL code, or vendor type.",
			"Does Bill Pay handle both ACH and check? Yes. Innrly Pay generates ACH for vendors with bank details and checks for the rest, with auto-remittance.",
			"What about duplicate invoice detection? Innrly flags duplicates by vendor + invoice number + amount + property. Catches the most common errors before they become double payments.",
			"Does it work with M3? Yes — Innrly is an M3 Associate Partner. Invoices push directly with GL coding intact."
		]
	},
	"hotel-labor-cost-percentage": {
		title: "Hotel Labor Cost Percentage: Benchmarks, Formula, and How to Lower It",
		metaTitle: "Hotel Labor Cost % — Benchmarks & How to Lower It",
		date: "2026-05-21",
		body: [
			"Labor is the largest controllable cost in every hotel. For most multi-property operators it is 25%–40% of revenue, and it is the line that swings GOPPAR the most quarter to quarter. This guide gives you the right formula, real benchmarks by segment, and the seven levers that lower the number without crushing guest scores.",
			"The formula",
			"``` Labor cost % = Total labor cost / Total revenue ```",
			"Total labor cost includes: - Base wages - Overtime - Payroll taxes (FICA, FUTA, SUTA) - Benefits (health, 401k, PTO accrual) - Workers comp - Bonus and incentive",
			"Total revenue typically excludes: - Pass-through OTA commissions - Refunded revenue - Forfeited deposits",
			"Most operators report the simpler version (wages + payroll taxes / rooms revenue) — that's fine for property-level operating reviews but understates true cost by 15%–25%.",
			"Industry benchmarks (US, 2025–2026)",
			"| Segment | Labor % of total revenue | |---|---| | Economy | 22%–28% | | Midscale (limited service) | 24%–30% | | Upper midscale | 28%–34% | | Upscale (full service) | 32%–38% | | Upper upscale | 36%–42% | | Luxury | 40%–48% | | Resort (all-inclusive) | 35%–45% |",
			"If your property is more than 3 percentage points above the segment benchmark sustained over a quarter, you have a labor problem.",
			"Why labor cost percentage drifts up",
			"Five common causes:",
			"1. Schedule lag. Schedules built off forecasted occupancy, not actual pickup. Pickup softens, schedules don't shrink. 2. Overtime creep. Approved OT becomes habitual OT. 3. Position mix drift. GMs hire a 2nd AGM \"for coverage\" — 6 months later it's permanent. 4. Benefits inflation. Health premiums rose 8%–12% in 2024–2025 and most operators didn't reprice schedules. 5. Tip credit and tip pool changes. State-level minimum wage and tip law changes have pushed effective labor cost up in CA, NY, MA, WA, IL.",
			"The 7 levers to lower it",
			"1. Tie schedule to actual pickup, not forecast Re-publish schedule 72 hours out using actual booked-on-the-books occupancy. Typical savings: 2–4% of labor cost.",
			"2. Cap overtime at the schedule level Most scheduling systems can hard-cap OT before the schedule publishes. Typical savings: 1–3%.",
			"3. Cross-train front desk + breakfast attendant Bridges shoulder periods without adding heads. Typical savings: 1–2%.",
			"4. MPOR target by segment Set MPOR targets per property and flag outliers weekly. See [MPOR Explained](/blog/mpor-explained). Typical savings on housekeeping line: 8–15%.",
			"5. Tighten clock-in / clock-out windows Geofenced clock-in eliminates buddy-punching and early-clock-in drift. Typical savings: 0.5–1.5%.",
			"6. Benefits reset at renewal Re-shop carriers annually. Most hotels overpay 8%–15% by auto-renewing.",
			"7. Stop chasing zero-cost coverage Trying to cover every potential shoulder period with payroll = high labor %. Some periods should accept a lower service level.",
			"What \"good\" looks like — multi-property reporting",
			"For a 10-property portfolio, your weekly labor report should show:",
			"- Labor cost % per property + segment benchmark - OT hours and OT $ per property - MPOR per property + segment benchmark - Variance to budget - Variance to LY - Drill-down: property → department → shift",
			"If you don't have that report weekly, you are managing labor blind.",
			"How Innrly Shift handles it",
			"Innrly Shift pulls punch data from your time-clock system, joins it with PMS occupancy and POS revenue, and computes labor cost %, OT, and MPOR per property and portfolio-wide. Set segment benchmarks and outliers get flagged automatically. Drill from portfolio → brand → property → shift.",
			"[See your labor cost % live in Innrly Shift →](/contact)",
			"FAQ",
			"What is a good hotel labor cost percentage? Depends on segment: 22%–28% economy, 28%–34% upper midscale, 32%–38% upscale, 40%–48% luxury.",
			"Should I include benefits and payroll taxes? Yes for true cost. Wages-only understates by 15%–25%.",
			"How do I lower labor cost % without hurting service? Schedule to actual pickup, cap OT, cross-train, set MPOR targets, tighten clock windows.",
			"Why is my labor % higher than benchmark? Most common causes: schedule lag, OT creep, position mix drift, benefits inflation.",
			"Does Innrly track labor across a portfolio? Yes. Innrly Shift consolidates punch + PMS + POS into one weekly labor report by property and portfolio."
		]
	},
	"innrly-vs-inn-flow": {
		title: "Innrly + Inn-Flow: The Automation Layer for Your Inn-Flow GL",
		date: "2026-05-20",
		body: [
			"Inn-Flow is a full hotel accounting system — general ledger, AP, AR, payroll, bank reconciliation, and financial statements. Innrly is not a competitor to Inn-Flow, and this is not a versus article. Innrly is the back-office automation and data layer that sits in front of an accounting system. The right frame is \"Inn-Flow + Innrly\" — the same pattern Innrly already runs with M3, QuickBooks, and Sage Intacct.",
			"What each platform owns",
			"| Layer | System | |---|---| | General ledger & financial statements | Inn-Flow | | AR, payroll & bank reconciliation | Inn-Flow | | Month-end close & financial reporting | Inn-Flow | | Invoice capture, OCR & auto GL-coding | Innrly | | A/P approval workflows & Bill Pay | Innrly | | OTA reconciliation & night-audit summaries | Innrly | | BI dashboards & daily labor snapshot | Innrly |",
			"Inn-Flow stays the system of record. Innrly handles the manual work that happens before the GL.",
			"How the data flows",
			"Invoices arrive in Innrly via OCR and email-in. Innrly extracts the header, vendor, line items, and totals, applies your Inn-Flow chart of accounts and historical coding rules, and routes each invoice for approval. Approved, GL-coded entries — along with OTA reconciliation results and night-audit summaries — push into Inn-Flow, clean and audit-ready.",
			"What an Inn-Flow customer gains",
			"Time. Innrly removes the manual steps that happen before the GL: keying invoices, reconciling OTA statements in spreadsheets, chasing night-audit variances, and assembling labor reports by hand. Your Inn-Flow GL receives audit-ready data sooner, and your GMs get a five-minute daily snapshot they don't have today.",
			"Integration status",
			"An API-based push integration is on our roadmap, mirroring how Innrly integrates with M3 and Sage Intacct today: Innrly captures and codes the source documents, then pushes completed entries into the accounting system of record. If you're an Inn-Flow customer interested in early access, talk to us — we're prioritizing the integration based on customer demand.",
			"[Talk to us about Innrly + Inn-Flow early access →](/contact)",
			"FAQ",
			"Is Innrly a competitor to Inn-Flow? No. Inn-Flow is a full hotel accounting system. Innrly is the automation layer that sits in front of it — the same role it plays for M3, QuickBooks, and Sage Intacct.",
			"Is the Innrly + Inn-Flow integration available today? An API-based push integration is on our roadmap. Early-access slots are open to Inn-Flow customers — talk to us.",
			"Do I keep Inn-Flow for accounting? Yes. Inn-Flow remains your system of record for the general ledger, financials, payroll, and bank reconciliation.",
			"What does Innrly add on top of Inn-Flow? Invoice capture and auto GL-coding, A/P approval workflows and Bill Pay, OTA reconciliation, night-audit summaries, BI dashboards, and a daily labor snapshot (Innrly Shift)."
		]
	},
	"pms-vs-back-office-automation": {
		title: "Hotel PMS vs Back-Office Automation: What's the Difference?",
		metaTitle: "PMS vs Back-Office Automation: Hotel Management Software Guide",
		date: "2026-05-26",
		body: [
			"If you've started shopping for hotel management software, you've probably noticed the category is a mess. A vendor will say \"hotel management software\" and mean a Property Management System. Another vendor will say it and mean accounting. A third will mean a labor scheduler. They are not the same thing, and getting the layers confused is the single most expensive mistake a multi-property operator can make in a buying cycle.",
			"This guide draws the line. What a PMS actually does. What back-office automation actually does. Why you need both. And how to evaluate the back-office layer without re-buying your PMS.",
			"What a Property Management System (PMS) actually does",
			"A PMS runs the front desk and the room inventory. Reservations, check-in / check-out, room assignments, folio management, rate plans, the nightly audit run that closes the books for the day at the property level. OnQ, FOSSE, Opera, Choice Advantage, Cloudbeds, Mews — these are PMSes.",
			"A PMS is the source of truth for: who is in which room, what they're paying, what they consumed, and what was posted to their folio. It is not the source of truth for: what you owe vendors, what your labor cost percentage is across the portfolio, whether Expedia paid you the right commission last week, or whether your GOPPAR is on plan.",
			"What back-office automation actually does",
			"Back-office automation is the layer that sits between every property's PMS and your accounting system. It pulls the nightly audit packet from each PMS, normalizes it across brands, reconciles it to the bank and to OTA statements, captures and codes your A/P invoices, runs Bill Pay, tracks labor against scheduled hours, and pushes clean GL-coded entries into M3, QuickBooks, or Sage Intacct. It also surfaces BI across the portfolio — RevPAR, ADR, occupancy, GOPPAR, flow-through — in one place.",
			"Innrly is built for this layer. So is M3, Otelier, Inn-Flow, and a handful of others. Each takes a different shape, but the job-to-be-done is identical: take the data your PMS already produces and turn it into a clean, reconciled, decision-ready monthly close — without 40 hours of spreadsheet work per property.",
			"Why \"hotel management software\" is a confusing category",
			"Google \"hotel management software\" and you'll get a top-10 that mixes PMS, back-office automation, channel managers, booking engines, CRM, and even housekeeping apps. They are all technically software for managing hotels. They are not interchangeable.",
			"A practical rule: if it touches a guest in a room, it's PMS-adjacent. If it touches a number on a P&L, it's back-office. You need both. They are different categories with different vendors, different price points, and different evaluation criteria.",
			"Where the layers overlap (and where they don't)",
			"Every PMS does its own night audit at the property level. That run closes the day for that one property. What it does not do: consolidate across 25 properties, normalize chart of accounts across Hilton + Marriott + Choice + independents, reconcile to the bank deposit, reconcile to the Expedia and Booking statements, code and post invoices, generate ACH or check runs, or roll up a portfolio-level GOPPAR.",
			"That gap — between \"the property closed its day\" and \"the portfolio's books are clean and the close is done\" — is the back-office automation layer. It exists because the PMS was never designed to do it, and your accounting system was never designed to fetch and normalize data from 25 different PMS instances.",
			"What you'll save by adding the back-office layer",
			"For a 10-property select-service operator, the realistic time savings from adding back-office automation on top of an existing PMS stack:",
			"| Workflow | Manual hours / property / month | After automation | |---|---|---| | Night audit consolidation | 6–10 | <1 | | A/P invoice capture + coding | 8–14 | 1–2 | | OTA reconciliation | 3–6 | <1 | | Bill Pay run | 2–4 | <1 | | Labor reporting | 2–4 | <1 | | Month-end close | 4–8 | 1–2 | | **Total** | **25–46** | **~4–8** |",
			"At a fully loaded back-office cost of ~$45/hour, that's roughly $11,000–$20,000 per property per year recovered. For a 10-property portfolio, you're talking $110,000–$200,000 against a typical platform spend of $24,000.",
			"How to evaluate a back-office automation platform without re-buying your PMS",
			"If you already have a PMS you're happy with — and most operators do — your back-office vendor needs to integrate with it, not replace it. Ask these questions:",
			"1. Do you support every PMS in my portfolio (not just the most common)? Multi-brand operators run 3–6 different PMSes. The platform has to support all of them, not force you to standardize.",
			"2. Is the integration direct or file-based? Direct API integrations break less and update faster than nightly file drops.",
			"3. Do you push to my accounting system or replace it? You want push-only. Your accounting system stays the system of record.",
			"4. Can I see the full chart-of-accounts mapping before I sign? If they can't show you exactly how Marriott's flash report maps to your GL today, onboarding will be 12 weeks instead of 3.",
			"5. What's the onboarding plan, week by week? A single-platform vendor onboards a property in 2–4 weeks. A multi-module suite is 8–16 weeks.",
			"6. Itemize pricing per property, per module. Transparent per-property pricing tells you whether the vendor expects to grow with you or upsell you every quarter.",
			"Where Innrly fits",
			"Innrly is the back-office automation layer. It sits between your PMSes (any of them) and your accounting system (M3, QuickBooks, or Sage Intacct). One login, one data model, one bill. M3 Associate Partner, two-way QuickBooks sync, full OTA reconciliation, Innrly Pay for Bill Pay, Innrly Shift for labor, and a BI layer that matches what most controllers already build by hand. $199 per property per month, transparent. 90-day free trial. 2–4 week onboarding.",
			"We don't replace your PMS. We make the data it produces actually useful.",
			"[Book a 20-minute walkthrough on your own data →](/contact)",
			"FAQ",
			"What's the difference between hotel PMS and back-office software? A PMS runs the front desk and room inventory — reservations, check-in, folios, rates. Back-office automation runs the money — reconciling PMS data to the bank, OTA statements, and accounting system, plus A/P, Bill Pay, labor, and BI across the portfolio.",
			"Do I need both a PMS and back-office automation? Yes. The PMS handles what happens at the property each night. Back-office automation handles what happens with that data across your portfolio at the corporate level. Neither replaces the other.",
			"Is Innrly a PMS? No. Innrly is a back-office automation platform. It integrates with the PMS you already run (OnQ, FOSSE, Opera, Choice Advantage, Cloudbeds, Mews, and others) and pushes clean GL-coded data into your accounting system.",
			"Can back-office automation replace my accounting system? No. Innrly sits in front of M3, QuickBooks, or Sage Intacct as the automation layer. Your accounting system stays the system of record.",
			"What does back-office automation cost for a 10-property portfolio? Innrly is $199 per property per month — about $24,000 per year for 10 properties. Typical time savings are $110,000–$200,000 per year, depending on current process maturity."
		]
	},
	"hotel-night-audit-checklist": {
		title: "The Hotel Night Audit Checklist Every Multi-Property Operator Should Use",
		metaTitle: "Hotel Night Audit Checklist (2026)",
		date: "2026-05-28",
		body: [
			"The hotel night audit is the single most consequential 60 minutes of the operating day. Done well, it closes the books on yesterday, validates revenue across every source, and posts charges that the morning team can actually trust. Done poorly, it pushes errors downstream into A/R, OTA reconciliation, and month-end — where they cost 5–10x more to fix.",
			"This checklist is the one we wish every multi-brand operator standardized across their portfolio. It works whether you run OnQ, FOSSE, Opera, choiceADVANTAGE, Cloudbeds, or Mews.",
			"1. Verify all in-house folios have today's charges posted",
			"Room and tax, parking, resort fee, pet fee, late checkout, early arrival. Every recurring charge should fire automatically. If your PMS has a posting failure log, read it before you roll the date.",
			"2. Reconcile credit card batches to PMS settlements",
			"PMS settled total should match the processor batch total for the day. Variances usually trace to a manual refund posted outside the PMS, a chip-read decline that was re-keyed, or a card-on-file that fell off.",
			"3. Reconcile OTA arrivals and cancellations",
			"Every Expedia, Booking.com, and Hotels.com arrival should have a folio. Every cancellation should have either no folio or a fully refunded one. Mismatches here turn into chargebacks 60 days later.",
			"4. Post and balance F&B, banquet, and outlet revenue",
			"If you have a restaurant, bar, or banquet operation, POS should be closed and posted to the PMS folio or A/R before the audit runs. Variances under 0.5% are normal; over 1% needs same-day investigation.",
			"5. Validate tax mapping on every folio",
			"Tax-exempt folios should carry the exemption certificate. Long-term stays should drop occupancy tax after the local threshold (30+ nights in most US jurisdictions). Group blocks should pick up the contracted tax rate.",
			"6. Run the no-show and walk-in pass",
			"No-shows should be charged the first night per policy. Walk-ins should be at rack or last-minute rate, not whatever the front-desk agent felt like. Both show up as variance the next morning if missed.",
			"7. Generate and review the manager's report",
			"Yesterday's occupancy, ADR, RevPAR, segment mix, and labor minutes. The night auditor doesn't need to act on these — but the GM should read them with coffee, and the corporate team should see them in a portfolio dashboard before 8 AM.",
			"8. Roll the business date and back up",
			"Once everything balances, roll the PMS date. Confirm the nightly extract fired to your back-office system (Innrly, M3, accounting, BI). A failed extract that nobody noticed is the most common cause of a missing day at month-end.",
			"How Innrly automates the checklist",
			"Innrly Pulse runs the reconciliation steps automatically across every property in your portfolio every night. The morning report flags only the exceptions — not 50 PDFs of clean audits. Most multi-property operators drop the per-property review from 30–60 minutes to under 5. See /solutions/reconciliation for the mechanics."
		]
	},
	"hotel-ota-commission-reconciliation": {
		title: "Hotel OTA Commission Reconciliation: How to Recover 1–3% of Revenue You're Already Owed",
		metaTitle: "Hotel OTA Commission Reconciliation Guide",
		date: "2026-05-27",
		body: [
			"OTA commission reconciliation is one of the most under-automated workflows in hotel accounting — and one of the most expensive. Across portfolios we work with, 1–3% of OTA revenue is routinely over-billed in commission and never disputed. On a $10M OTA channel, that's $100K–$300K per year walking out the door because nobody has the time to line-match Expedia and Booking.com statements against the PMS.",
			"Why this happens",
			"OTA statements arrive monthly, sometimes 30–45 days after stay. By then, the controller's brain is on close, not on disputing a $43 commission overcharge for a guest who cancelled. Statements are reconciled by sampling — spot-check 10 lines, declare it close enough, move on. The 90% you didn't check is where the leakage lives.",
			"Where OTA commissions typically overcharge",
			"Cancellations billed as stays. No-shows billed as stays. Modified reservations billed at the original (higher) rate. Commission applied to taxes and fees. Duplicate bookings billed twice. Loyalty rate bookings billed at retail commission rate. Every one of these is recoverable — if you have the underlying data to dispute it.",
			"What a real reconciliation looks like",
			"For every line on the OTA statement: match to a PMS reservation by confirmation number. Compare billed nights to actual stayed nights. Compare billed room revenue to actual room revenue. Compare billed commission to (room revenue × contracted rate). Flag anything off by more than $1.",
			"Why this is automation work, not human work",
			"A 200-room hotel produces 400–800 OTA reservations per month. Line-matching 800 statement entries against 800 PMS reservations is a 6–10 hour job done correctly — and most controllers don't have 6 hours. Automation does the same work in under a minute, every night, and surfaces only the discrepancies that warrant a dispute.",
			"How to dispute recovered commissions",
			"Expedia, Booking.com, and Hotels.com all have formal dispute processes. The trick is the supporting data — a clean line-item PDF showing PMS reservation, billed amount, expected amount, and variance gets resolved 80%+ of the time. Without it, disputes get rejected as 'unable to verify.'",
			"How Innrly handles OTA reconciliation",
			"Innrly reconciles every OTA channel statement against your PMS data automatically every night, flags discrepancies with the dispute-ready evidence, and tracks recovery. Operators typically see $30K–$80K per property per year recovered in the first 12 months. See /case-studies/urban-full-service for a full-service operator running this at scale."
		]
	},
	"innrly-joins-m3-partner-ecosystem-hotel-accounting-automation": {
		title: "INNRLY Joins M3's Partner Ecosystem: What It Means for Hotel Accounting Automation",
		metaTitle: "INNRLY Joins M3 Partner Ecosystem for Hotel Accounting Automation",
		description: "INNRLY joins M3's partner ecosystem, bringing automated invoice capture and GL coding to hotel back-office workflows through M3 Accounting Core.",
		date: "2026-09-30",
		image: "/blog/innrly-joins-m3.png",
		imageAlt: "INNRLY joins M3's partner ecosystem announcement",
		source: {
			label: "M3 Press Release: “INNRLY Joins M3’s Partner Ecosystem” — September 29, 2026",
			url: "https://www.m3as.com/press-release/innrly-joins-m3s-partner-ecosystem/"
		},
		body: [
			"Hotel accounting teams manage a constant flow of invoices, approvals, coding, reconciliations, and month-end close activities. As hotel portfolios grow, manual accounts payable processes can create additional administrative work and make it harder for teams to maintain timely, accurate financial information. A new partnership between INNRLY and M3 is designed to address part of this challenge.",
			"On September 29, 2026, M3 announced that INNRLY had joined its partner ecosystem as an Associate Partner. The relationship connects INNRLY's automation capabilities with M3's hospitality-focused financial platform, creating an opportunity to streamline invoice processing and general ledger coding for hotel organizations.",
			"What Is the INNRLY and M3 Partnership?",
			"The partnership brings together INNRLY's back-office automation capabilities and M3's hospitality financial technology. According to M3's announcement, INNRLY's integration with M3 Accounting Core enables invoice capture, automatic population of invoice information, and automatic GL coding. Approved, GL-coded invoices can then be delivered into M3 in a format designed to support monthly close and audit readiness.",
			"For hotel accounting teams, the practical objective is straightforward: reduce repetitive invoice-processing work while improving the consistency and speed of financial data moving through the back office.",
			"How Hotel AP Automation Can Reduce Manual Work",
			"Accounts payable is an important operational function, but it can also involve repetitive steps. A typical invoice workflow may require employees to collect invoice information, enter data, determine the appropriate general ledger account, obtain approval, and prepare the transaction for accounting. Automation can connect these steps into a more consistent workflow.",
			"With the INNRLY and M3 integration, invoice information can be captured and GL coding can be automated before approved invoices move into M3 Accounting Core. This can help reduce manual data entry and repetitive coding work for hotel finance teams.",
			"Why Automatic GL Coding Matters for Hotel Finance Teams",
			"General ledger coding determines how financial transactions are classified within an accounting system. In a hotel environment, invoices may relate to food and beverage, housekeeping, maintenance, utilities, administration, technology, and many other operational categories. When coding is handled manually, accounting teams may spend significant time reviewing invoices and assigning accounts. Automated GL coding can standardize this part of the workflow and create a more efficient path from invoice receipt to accounting.",
			"The INNRLY-M3 integration is specifically positioned around this workflow, with the goal of helping customers receive approved, GL-coded invoices directly into M3.",
			"What This Means for Hotel Owners and Management Companies",
			"The announcement is particularly relevant to hotel organizations that want to modernize back-office operations without treating accounting automation as a standalone technology project. M3 describes INNRLY as helping mid-size hotels with approximately 70–200+ rooms and management companies operating 5–100+ hotels. INNRLY's broader platform is focused on hotel back-office automation, business intelligence, labor management, and financial workflows.",
			"For growing hotel groups, connecting automation with the accounting environment can create a more connected operational model: data is captured closer to the source, repetitive processing is reduced, and finance teams can spend more time reviewing financial performance rather than manually moving information between systems.",
			"From Invoice Capture to Month-End Close",
			"The value of accounting automation is not limited to the first step of invoice entry. A simplified automated path looks like this: (1) invoice information is captured; (2) relevant information is populated automatically; (3) general ledger coding is applied; (4) the invoice moves through the required approval process; (5) the approved, GL-coded invoice is delivered into M3 Accounting Core; (6) accounting teams use the resulting data as part of their regular financial close. The purpose is not simply to eliminate data entry — it is to create a more consistent information flow across the hotel back office.",
			"What Makes the Partnership Relevant to Hospitality?",
			"Hospitality accounting has specific operational requirements because financial activity is closely connected to property-level operations. Hotel organizations may manage multiple properties, departments, vendors, operating accounts, and recurring expenses. M3 has built its platform specifically for the hospitality industry, while INNRLY focuses on automation and timely operational data for hotel owners and operators. Their partnership combines those areas around a specific accounting workflow: invoice processing and GL coding.",
			"What's Next for the INNRLY-M3 Integration?",
			"M3 stated that the first capabilities built on the new architecture were expected to arrive in fall 2026, with additional capabilities planned to follow. As integrations expand, the potential opportunity is to create more efficient workflows across accounts payable, accounting, reporting, labor, and other hotel back-office functions. Learn more on our Innrly + M3 integration page.",
			"Conclusion",
			"The INNRLY-M3 partnership represents a practical step toward more connected hotel back-office automation. By combining invoice capture and automated GL coding with M3's hospitality accounting environment, the integration is designed to reduce repetitive accounting work and create a cleaner path from invoice processing to financial close."
		],
		faq: [
			{
				q: "What is INNRLY?",
				a: "INNRLY is a hotel technology platform focused on back-office automation, business intelligence, labor management, and financial workflows for hotel owners and operators."
			},
			{
				q: "What is M3?",
				a: "M3 is a hospitality-focused financial technology provider offering accounting, financial reporting, business intelligence, and labor management solutions."
			},
			{
				q: "What does the INNRLY-M3 integration do?",
				a: "The announced integration with M3 Accounting Core supports invoice capture, automatic population of invoice information, and automatic GL coding, allowing approved, GL-coded invoices to move into M3."
			},
			{
				q: "Who can benefit from hotel AP automation?",
				a: "Hotel owners, management companies, and finance teams handling large volumes of invoices and accounting transactions can use AP automation to reduce repetitive manual processing and improve workflow consistency."
			},
			{
				q: "Does the partnership replace a hotel's accounting system?",
				a: "No. The announced integration is designed to work with M3 Accounting Core rather than replace the accounting platform."
			}
		]
	}
};
var Route$33 = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		let post = null;
		try {
			const baseUrl = typeof window === "undefined" ? process.env.BACKEND_URL || "http://127.0.0.1:8005" : "/api";
			const res = await fetch(`${baseUrl}/blog/${params.slug}`);
			if (res.ok) {
				const data = await res.json();
				if (data && data.title) post = {
					title: data.title,
					metaTitle: data.meta_title || data.title,
					metaDescription: data.meta_description || data.summary || "",
					date: data.created_at || "2026-06-01",
					author: data.author || "The Innrly Team",
					summary: data.summary,
					featuredImage: data.featured_image,
					featuredImageAlt: data.featured_image_alt || data.title,
					categoryName: data.category_name,
					contentHtml: data.content || "",
					body: []
				};
			}
		} catch (err) {
			console.error(`Failed to fetch dynamic blog for slug: ${params.slug}`, err);
		}
		if (!post) {
			const staticPost = posts[params.slug];
			if (staticPost) post = {
				title: staticPost.title,
				metaTitle: staticPost.metaTitle,
				metaDescription: staticPost.description || staticPost.body[0]?.slice(0, 155) || "",
				date: staticPost.date,
				author: "The Innrly Team",
				body: staticPost.body,
				contentHtml: "",
				featuredImage: staticPost.image,
				featuredImageAlt: staticPost.imageAlt || staticPost.title,
				source: staticPost.source,
				faq: staticPost.faq
			};
		}
		if (!post) throw notFound();
		try {
			const baseUrl = typeof window === "undefined" ? process.env.BACKEND_URL || "http://127.0.0.1:8005" : "/api";
			const seoRes = await fetch(`${baseUrl}/api/seo?page_path=${encodeURIComponent(`/blog/${params.slug}`)}`);
			if (seoRes.ok) {
				const seoData = await seoRes.json();
				if (seoData && seoData.title) {
					post.metaTitle = seoData.title;
					if (seoData.description) post.metaDescription = seoData.description;
					if (seoData.og_title) post.ogTitle = seoData.og_title;
					if (seoData.og_description) post.ogDescription = seoData.og_description;
					if (seoData.og_image) post.featuredImage = seoData.og_image;
				}
			}
		} catch {}
		return {
			post,
			slug: params.slug
		};
	},
	head: ({ loaderData }) => ({
		meta: loaderData ? [
			{ title: (() => {
				const t = loaderData.post.metaTitle ?? loaderData.post.title;
				return t.length > 46 ? t : `${t} — Innrly Blog`;
			})() },
			{
				name: "description",
				content: loaderData.post.metaDescription || loaderData.post.summary || (loaderData.post.body?.[0]?.slice(0, 155) ?? "")
			},
			{
				property: "og:title",
				content: loaderData.post.metaTitle || loaderData.post.title
			},
			{
				property: "og:description",
				content: loaderData.post.metaDescription || loaderData.post.summary || (loaderData.post.body?.[0]?.slice(0, 155) ?? "")
			},
			...loaderData.post.featuredImage ? [
				{
					property: "og:image",
					content: loaderData.post.featuredImage.startsWith("http") ? loaderData.post.featuredImage : `https://innrly.com${loaderData.post.featuredImage}`
				},
				{
					name: "twitter:image",
					content: loaderData.post.featuredImage.startsWith("http") ? loaderData.post.featuredImage : `https://innrly.com${loaderData.post.featuredImage}`
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			] : [],
			{
				property: "og:type",
				content: "article"
			},
			{
				property: "og:url",
				content: `/blog/${loaderData.slug}`
			}
		] : [],
		links: loaderData ? [{
			rel: "canonical",
			href: `https://innrly.com/blog/${loaderData.slug}`
		}] : [],
		scripts: loaderData ? [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Article",
					headline: loaderData.post.title,
					datePublished: loaderData.post.date,
					dateModified: loaderData.post.date,
					author: {
						"@type": "Organization",
						name: loaderData.post.author || "The Innrly Team",
						url: "/about"
					},
					publisher: {
						"@type": "Organization",
						name: "Innrly",
						logo: {
							"@type": "ImageObject",
							url: "/favicon.svg"
						}
					},
					mainEntityOfPage: {
						"@type": "WebPage",
						"@id": `https://innrly.com/blog/${loaderData.slug}`
					}
				})
			},
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: "/"
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "Blog",
							item: "/blog"
						},
						{
							"@type": "ListItem",
							position: 3,
							name: loaderData.post.title,
							item: `/blog/${loaderData.slug}`
						}
					]
				})
			},
			...loaderData.post.faq ? [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: loaderData.post.faq.map((f) => ({
						"@type": "Question",
						name: f.q,
						acceptedAnswer: {
							"@type": "Answer",
							text: f.a
						}
					}))
				})
			}] : []
		] : []
	})
});
//#endregion
//#region src/routes/compare.index.tsx
var $$splitComponentImporter$30 = () => import("./compare.index-Dl2lQ3iw.js");
var Route$32 = createFileRoute("/compare/")({
	component: lazyRouteComponent($$splitComponentImporter$30, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare"], "/compare")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "CollectionPage",
				name: "Innrly Comparisons",
				description: "Side-by-side comparisons positioning Innrly as an alternative to leading hotel back-office platforms.",
				hasPart: comparisons.map((c) => ({
					"@type": "WebPage",
					name: `Innrly: alternative to ${c.competitor}`,
					url: c.to
				}))
			})
		}]
	})
});
//#endregion
//#region src/routes/compare.innrly-vs-actabl.tsx
var $$splitComponentImporter$29 = () => import("./compare.innrly-vs-actabl-BdmTUhbs.js");
var Route$31 = createFileRoute("/compare/innrly-vs-actabl")({
	component: lazyRouteComponent($$splitComponentImporter$29, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare/innrly-vs-actabl") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare/innrly-vs-actabl"], "/compare/innrly-vs-actabl")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare/innrly-vs-actabl"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$3.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Compare",
				url: "/compare"
			},
			{
				name: "Innrly: alternative to Actabl",
				url: "/compare/innrly-vs-actabl"
			}
		])]
	})
});
//#endregion
//#region src/routes/compare.innrly-vs-aptech.tsx
var $$splitComponentImporter$28 = () => import("./compare.innrly-vs-aptech-BSDI6qZ1.js");
var Route$30 = createFileRoute("/compare/innrly-vs-aptech")({
	component: lazyRouteComponent($$splitComponentImporter$28, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare/innrly-vs-aptech") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare/innrly-vs-aptech"], "/compare/innrly-vs-aptech")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare/innrly-vs-aptech"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$4.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Compare",
				url: "/compare"
			},
			{
				name: "Innrly: alternative to Aptech",
				url: "/compare/innrly-vs-aptech"
			}
		])]
	})
});
//#endregion
//#region src/routes/compare.innrly-vs-hotel-effectiveness.tsx
var $$splitComponentImporter$27 = () => import("./compare.innrly-vs-hotel-effectiveness-B09lD7I-.js");
var Route$29 = createFileRoute("/compare/innrly-vs-hotel-effectiveness")({
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare/innrly-vs-hotel-effectiveness") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare/innrly-vs-hotel-effectiveness"], "/compare/innrly-vs-hotel-effectiveness")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare/innrly-vs-hotel-effectiveness"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$5.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Compare",
				url: "/compare"
			},
			{
				name: "Innrly vs Hotel Effectiveness",
				url: "/compare/innrly-vs-hotel-effectiveness"
			}
		])]
	})
});
//#endregion
//#region src/routes/compare.innrly-vs-m3.tsx
var Route$28 = createFileRoute("/compare/innrly-vs-m3")({
	beforeLoad: () => {
		throw redirect({
			to: "/integrations/m3",
			statusCode: 301
		});
	},
	server: { handlers: { GET: async () => new Response(null, {
		status: 301,
		headers: { Location: "/integrations/m3" }
	}) } }
});
//#endregion
//#region src/routes/compare.innrly-vs-nimble.tsx
var $$splitComponentImporter$26 = () => import("./compare.innrly-vs-nimble-NrgHTHZ1.js");
var Route$27 = createFileRoute("/compare/innrly-vs-nimble")({
	component: lazyRouteComponent($$splitComponentImporter$26, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare/innrly-vs-nimble") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare/innrly-vs-nimble"], "/compare/innrly-vs-nimble")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare/innrly-vs-nimble"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$6.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Compare",
				url: "/compare"
			},
			{
				name: "Innrly: alternative to Nimble",
				url: "/compare/innrly-vs-nimble"
			}
		])]
	})
});
//#endregion
//#region src/routes/compare.innrly-vs-otelier.tsx
var $$splitComponentImporter$25 = () => import("./compare.innrly-vs-otelier-BavejpFW.js");
var Route$26 = createFileRoute("/compare/innrly-vs-otelier")({
	component: lazyRouteComponent($$splitComponentImporter$25, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare/innrly-vs-otelier") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare/innrly-vs-otelier"], "/compare/innrly-vs-otelier")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare/innrly-vs-otelier"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$7.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Compare",
				url: "/compare"
			},
			{
				name: "Innrly: alternative to Otelier",
				url: "/compare/innrly-vs-otelier"
			}
		])]
	})
});
//#endregion
//#region src/routes/compare.innrly-vs-profitsage.tsx
var $$splitComponentImporter$24 = () => import("./compare.innrly-vs-profitsage-w1aanrmg.js");
var Route$25 = createFileRoute("/compare/innrly-vs-profitsage")({
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/compare/innrly-vs-profitsage") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/compare/innrly-vs-profitsage"], "/compare/innrly-vs-profitsage")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/compare/innrly-vs-profitsage"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$8.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Compare",
				url: "/compare"
			},
			{
				name: "Innrly: alternative to ProfitSage",
				url: "/compare/innrly-vs-profitsage"
			}
		])]
	})
});
//#endregion
//#region src/routes/control-hub.blogs.tsx
var $$splitComponentImporter$23 = () => import("./control-hub.blogs-DR0SME3o.js");
var Route$24 = createFileRoute("/control-hub/blogs")({
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: () => ({ meta: [{ title: "Innrly Control Hub Blog Management" }, {
		name: "description",
		content: "Manage and publish articles on Innrly with SEO controls and image uploads."
	}] })
});
//#endregion
//#region src/routes/control-hub.logs.tsx
var $$splitComponentImporter$22 = () => import("./control-hub.logs-Db-lkJV_.js");
var Route$23 = createFileRoute("/control-hub/logs")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: () => ({ meta: [
		{ title: "Audit & Recovery Logs — Innrly Control Hub" },
		{
			name: "description",
			content: "Audit raw lead submissions, monitor fail-safe telemetry, and trigger 1-click disaster recovery."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] })
});
//#endregion
//#region src/routes/control-hub.newsletters.tsx
var $$splitComponentImporter$21 = () => import("./control-hub.newsletters-CkUjyVGj.js");
var Route$22 = createFileRoute("/control-hub/newsletters")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({ meta: [{ title: "Innrly Newsletter Subscribers — Control Hub" }, {
		name: "description",
		content: "Manage newsletter signups."
	}] })
});
//#endregion
//#region src/routes/control-hub.onboarding.tsx
var $$splitComponentImporter$20 = () => import("./control-hub.onboarding-DflCm4i4.js");
var Route$21 = createFileRoute("/control-hub/onboarding")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({ meta: [{ title: "Innrly Onboarding Completions — Control Hub" }, {
		name: "description",
		content: "Manage completed customer onboarding details."
	}] })
});
//#endregion
//#region src/routes/control-hub.seo.tsx
var $$splitComponentImporter$19 = () => import("./control-hub.seo-6A3fz8SE.js");
var Route$20 = createFileRoute("/control-hub/seo")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => ({ meta: [{ title: "Innrly Control Hub SEO & Tag Management" }, {
		name: "description",
		content: "Manage meta tags, sitemap.xml, robots.txt, llms.txt, and site scripts."
	}] })
});
//#endregion
//#region src/routes/control-hub.settings.tsx
var $$splitComponentImporter$18 = () => import("./control-hub.settings-CKpQwbJT.js");
var Route$19 = createFileRoute("/control-hub/settings")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Innrly Control Hub Settings" }, {
		name: "description",
		content: "Configure platform settings, notification channels, and webhooks."
	}] })
});
//#endregion
//#region src/routes/control-hub.testimonials.tsx
var $$splitComponentImporter$17 = () => import("./control-hub.testimonials-BlXHUYYj.js");
var Route$18 = createFileRoute("/control-hub/testimonials")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: "Testimonials Manager — Innrly Control Hub" }, {
		name: "description",
		content: "Manage customer reviews, hotelier quotes, and page-specific testimonials."
	}] })
});
//#endregion
//#region src/routes/control-hub.trials.tsx
var $$splitComponentImporter$16 = () => import("./control-hub.trials-zAMXV0ux.js");
var Route$17 = createFileRoute("/control-hub/trials")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "Innrly Free Trials — Control Hub" }, {
		name: "description",
		content: "Manage free trial applications."
	}] })
});
//#endregion
//#region src/routes/control-hub.users.tsx
var $$splitComponentImporter$15 = () => import("./control-hub.users-BzvzFze7.js");
var Route$16 = createFileRoute("/control-hub/users")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "User Management — Innrly Control Hub" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] })
});
//#endregion
//#region src/routes/integrations.index.tsx
var $$splitComponentImporter$14 = () => import("./integrations.index-C4TBoscl.js");
var Route$15 = createFileRoute("/integrations/")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations"], "/integrations")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Innrly",
				applicationCategory: "BusinessApplication",
				operatingSystem: "Web",
				url: "/integrations",
				description: "Innrly connects to 50+ hotel systems — PMS, accounting, payroll, banking, guest survey, and A/P platforms.",
				offers: {
					"@type": "Offer",
					priceCurrency: "USD"
				}
			})
		}, breadcrumbLd([{
			name: "Home",
			url: "/"
		}, {
			name: "Integrations",
			url: "/integrations"
		}])]
	})
});
//#endregion
//#region src/routes/integrations.cloudbeds.tsx
var $$splitComponentImporter$13 = () => import("./integrations.cloudbeds-xHMJC-Ux.js");
var Route$14 = createFileRoute("/integrations/cloudbeds")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/cloudbeds") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/cloudbeds"], "/integrations/cloudbeds")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/cloudbeds"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$9.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "Cloudbeds",
				url: "/integrations/cloudbeds"
			}
		])]
	})
});
//#endregion
//#region src/routes/integrations.inn-flow.tsx
var $$splitComponentImporter$12 = () => import("./integrations.inn-flow-Dsj26wb3.js");
var Route$13 = createFileRoute("/integrations/inn-flow")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/inn-flow") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/inn-flow"], "/integrations/inn-flow")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/inn-flow"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$10.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "Inn-flow",
				url: "/integrations/inn-flow"
			}
		])]
	})
});
//#endregion
//#region src/routes/integrations.m3.tsx
var $$splitComponentImporter$11 = () => import("./integrations.m3-D5wlb7Cd.js");
var Route$12 = createFileRoute("/integrations/m3")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/m3") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/m3"] || {
			title: "Innrly + M3 — Auto GL-Code & Push Invoices | Innrly",
			description: "Innrly is an M3 Associate Partner. Innrly auto-populates, GL-codes, and pushes invoices into M3 — eliminating manual A/P data entry for hotel operators."
		}, "/integrations/m3"), {
			property: "og:image:alt",
			content: "The M3 data you already have — finally working for you."
		}],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/m3"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$11.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "M3",
				url: "/integrations/m3"
			}
		])]
	})
});
//#endregion
//#region src/routes/integrations.mews.tsx
var $$splitComponentImporter$10 = () => import("./integrations.mews-NrXqgaUU.js");
var Route$11 = createFileRoute("/integrations/mews")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/mews") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/mews"], "/integrations/mews")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/mews"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$12.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "Mews",
				url: "/integrations/mews"
			}
		])]
	})
});
//#endregion
//#region src/routes/integrations.opera.tsx
var $$splitComponentImporter$9 = () => import("./integrations.opera-B9ehQyxJ.js");
var Route$10 = createFileRoute("/integrations/opera")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/opera") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/opera"], "/integrations/opera")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/opera"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$13.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "Opera",
				url: "/integrations/opera"
			}
		])]
	})
});
//#endregion
//#region src/routes/integrations.quickbooks.tsx
var $$splitComponentImporter$8 = () => import("./integrations.quickbooks-D7RWUvhK.js");
var Route$9 = createFileRoute("/integrations/quickbooks")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/quickbooks") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/quickbooks"], "/integrations/quickbooks")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/quickbooks"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs$14.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "QuickBooks",
				url: "/integrations/quickbooks"
			}
		])]
	})
});
//#endregion
//#region src/routes/integrations.sage-intacct.tsx
var $$splitComponentImporter$7 = () => import("./integrations.sage-intacct-Cg1kxNxr.js");
var Route$8 = createFileRoute("/integrations/sage-intacct")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/integrations/sage-intacct") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/integrations/sage-intacct"], "/integrations/sage-intacct")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/integrations/sage-intacct"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Innrly + Sage Intacct",
				applicationCategory: "BusinessApplication",
				operatingSystem: "Web",
				url: "/integrations/sage-intacct",
				offers: {
					"@type": "Offer",
					priceCurrency: "USD"
				}
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Integrations",
				url: "/integrations"
			},
			{
				name: "Sage Intacct",
				url: "/integrations/sage-intacct"
			}
		])]
	})
});
//#endregion
//#region src/routes/legal.accessibility.tsx
var $$splitComponentImporter$6 = () => import("./legal.accessibility-D7F7_9MC.js");
var Route$7 = createFileRoute("/legal/accessibility")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/legal/accessibility") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/legal/accessibility"], "/legal/accessibility")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/legal/accessibility"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Accessibility Statement — Innrly",
				url: "/legal/accessibility",
				isPartOf: {
					"@type": "WebSite",
					name: "Innrly",
					url: "/"
				}
			})
		}]
	})
});
//#endregion
//#region src/routes/legal.cookies.tsx
var $$splitComponentImporter$5 = () => import("./legal.cookies-COdr-YCS.js");
var Route$6 = createFileRoute("/legal/cookies")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/legal/cookies") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/legal/cookies"], "/legal/cookies")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/legal/cookies"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Cookie Policy — Innrly",
				url: "/legal/cookies",
				isPartOf: {
					"@type": "WebSite",
					name: "Innrly",
					url: "/"
				}
			})
		}]
	})
});
//#endregion
//#region src/routes/legal.privacy.tsx
var $$splitComponentImporter$4 = () => import("./legal.privacy-CHfVmrb0.js");
var Route$5 = createFileRoute("/legal/privacy")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/legal/privacy") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/legal/privacy"], "/legal/privacy")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/legal/privacy"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Privacy Policy — Innrly",
				url: "/legal/privacy",
				isPartOf: {
					"@type": "WebSite",
					name: "Innrly",
					url: "/"
				}
			})
		}]
	})
});
//#endregion
//#region src/routes/legal.security.tsx
var $$splitComponentImporter$3 = () => import("./legal.security-Dn2ss9S8.js");
var Route$4 = createFileRoute("/legal/security")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/legal/security") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/legal/security"], "/legal/security")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/legal/security"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Security — Innrly",
				url: "/legal/security",
				isPartOf: {
					"@type": "WebSite",
					name: "Innrly",
					url: "/"
				}
			})
		}]
	})
});
//#endregion
//#region src/routes/legal.subscription.tsx
var $$splitComponentImporter$2 = () => import("./legal.subscription-C25VwpX9.js");
var Route$3 = createFileRoute("/legal/subscription")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/legal/subscription") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/legal/subscription"], "/legal/subscription")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/legal/subscription"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Subscription Services Agreement — Innrly",
				url: "/legal/subscription",
				isPartOf: {
					"@type": "WebSite",
					name: "Innrly",
					url: "/"
				}
			})
		}]
	})
});
//#endregion
//#region src/routes/legal.terms.tsx
var $$splitComponentImporter$1 = () => import("./legal.terms-BNOhZplN.js");
var Route$2 = createFileRoute("/legal/terms")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/legal/terms") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/legal/terms"], "/legal/terms")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/legal/terms"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Terms of Service & Software License — Innrly",
				url: "/legal/terms",
				isPartOf: {
					"@type": "WebSite",
					name: "Innrly",
					url: "/"
				}
			})
		}]
	})
});
//#endregion
//#region src/routes/services.accountability-pack.tsx
var $$splitComponentImporter = () => import("./services.accountability-pack-D7goAUcU.js");
var Route$1 = createFileRoute("/services/accountability-pack")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return { seo: await fetchSeoData("/services/accountability-pack") };
	},
	head: ({ loaderData }) => ({
		meta: [...getMetaTags(loaderData?.seo || null, defaultSeoData["/services/accountability-pack"], "/services/accountability-pack")],
		links: [{
			rel: "canonical",
			href: "https://innrly.com/services/accountability-pack"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Service",
				name: "Innrly Accountability Pack",
				serviceType: "Hotel back-office data verification and reporting",
				provider: {
					"@type": "Organization",
					name: "Innrly"
				},
				areaServed: "US",
				offers: {
					"@type": "Offer",
					priceSpecification: {
						"@type": "PriceSpecification",
						priceCurrency: "USD",
						description: "Per-property pricing — contact sales"
					}
				}
			})
		}, breadcrumbLd([
			{
				name: "Home",
				url: "/"
			},
			{
				name: "Services",
				url: "/services"
			},
			{
				name: "Accountability Pack",
				url: "/services/accountability-pack"
			}
		])]
	})
});
//#endregion
//#region src/routes/solutions.labor-workforce.tsx
var Route = createFileRoute("/solutions/labor-workforce")({ beforeLoad: () => {
	throw redirect({ to: "/solutions/innrly-shift" });
} });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$51.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$50
});
var R404Route = Route$49.update({
	id: "/404",
	path: "/404",
	getParentRoute: () => Route$50
});
var AboutRoute = Route$48.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$50
});
var ContactRoute = Route$47.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$50
});
var ControlHubRoute = Route$46.update({
	id: "/control-hub",
	path: "/control-hub",
	getParentRoute: () => Route$50
});
var DevelopersRoute = Route$45.update({
	id: "/developers",
	path: "/developers",
	getParentRoute: () => Route$50
});
var FeaturesRoute = Route$44.update({
	id: "/features",
	path: "/features",
	getParentRoute: () => Route$50
});
var GlossaryRoute = Route$43.update({
	id: "/glossary",
	path: "/glossary",
	getParentRoute: () => Route$50
});
var HotelBackOfficeAutomationRoute = Route$42.update({
	id: "/hotel-back-office-automation",
	path: "/hotel-back-office-automation",
	getParentRoute: () => Route$50
});
var LlmsFullDottxtRoute = Route$41.update({
	id: "/llms-full.txt",
	path: "/llms-full.txt",
	getParentRoute: () => Route$50
});
var LlmsDottxtRoute = Route$40.update({
	id: "/llms.txt",
	path: "/llms.txt",
	getParentRoute: () => Route$50
});
var OnboardingRoute = Route$39.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$50
});
var OrbPreviewRoute = Route$38.update({
	id: "/orb-preview",
	path: "/orb-preview",
	getParentRoute: () => Route$50
});
var PricingRoute = Route$52.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$50
});
var RobotsDottxtRoute = Route$37.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$50
});
var RoiCalculatorRoute = Route$36.update({
	id: "/roi-calculator",
	path: "/roi-calculator",
	getParentRoute: () => Route$50
});
var SecurityRoute = Route$35.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => Route$50
});
var SitemapDotxmlRoute = Route$34.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$50
});
var BlogIndexRoute = Route$53.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$50
});
var BlogSlugRoute = Route$33.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$50
});
var CaseStudiesIndexRoute = Route$54.update({
	id: "/case-studies/",
	path: "/case-studies/",
	getParentRoute: () => Route$50
});
var CaseStudiesBoutiqueGroupRoute = Route$55.update({
	id: "/case-studies/boutique-group",
	path: "/case-studies/boutique-group",
	getParentRoute: () => Route$50
});
var CaseStudiesExtendedStayPortfolioRoute = Route$56.update({
	id: "/case-studies/extended-stay-portfolio",
	path: "/case-studies/extended-stay-portfolio",
	getParentRoute: () => Route$50
});
var CaseStudiesHiltonManagementCompanyRoute = Route$57.update({
	id: "/case-studies/hilton-management-company",
	path: "/case-studies/hilton-management-company",
	getParentRoute: () => Route$50
});
var CaseStudiesMidwestPortfolioRoute = Route$58.update({
	id: "/case-studies/midwest-portfolio",
	path: "/case-studies/midwest-portfolio",
	getParentRoute: () => Route$50
});
var CaseStudiesUrbanFullServiceRoute = Route$59.update({
	id: "/case-studies/urban-full-service",
	path: "/case-studies/urban-full-service",
	getParentRoute: () => Route$50
});
var CompareIndexRoute = Route$32.update({
	id: "/compare/",
	path: "/compare/",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsActablRoute = Route$31.update({
	id: "/compare/innrly-vs-actabl",
	path: "/compare/innrly-vs-actabl",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsAptechRoute = Route$30.update({
	id: "/compare/innrly-vs-aptech",
	path: "/compare/innrly-vs-aptech",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsHotelEffectivenessRoute = Route$29.update({
	id: "/compare/innrly-vs-hotel-effectiveness",
	path: "/compare/innrly-vs-hotel-effectiveness",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsM3Route = Route$28.update({
	id: "/compare/innrly-vs-m3",
	path: "/compare/innrly-vs-m3",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsNimbleRoute = Route$27.update({
	id: "/compare/innrly-vs-nimble",
	path: "/compare/innrly-vs-nimble",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsOtelierRoute = Route$26.update({
	id: "/compare/innrly-vs-otelier",
	path: "/compare/innrly-vs-otelier",
	getParentRoute: () => Route$50
});
var CompareInnrlyVsProfitsageRoute = Route$25.update({
	id: "/compare/innrly-vs-profitsage",
	path: "/compare/innrly-vs-profitsage",
	getParentRoute: () => Route$50
});
var ControlHubIndexRoute = Route$60.update({
	id: "/",
	path: "/",
	getParentRoute: () => ControlHubRoute
});
var ControlHubBlogsRoute = Route$24.update({
	id: "/blogs",
	path: "/blogs",
	getParentRoute: () => ControlHubRoute
});
var ControlHubLogsRoute = Route$23.update({
	id: "/logs",
	path: "/logs",
	getParentRoute: () => ControlHubRoute
});
var ControlHubNewslettersRoute = Route$22.update({
	id: "/newsletters",
	path: "/newsletters",
	getParentRoute: () => ControlHubRoute
});
var ControlHubOnboardingRoute = Route$21.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => ControlHubRoute
});
var ControlHubSeoRoute = Route$20.update({
	id: "/seo",
	path: "/seo",
	getParentRoute: () => ControlHubRoute
});
var ControlHubSettingsRoute = Route$19.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => ControlHubRoute
});
var ControlHubTestimonialsRoute = Route$18.update({
	id: "/testimonials",
	path: "/testimonials",
	getParentRoute: () => ControlHubRoute
});
var ControlHubTrialsRoute = Route$17.update({
	id: "/trials",
	path: "/trials",
	getParentRoute: () => ControlHubRoute
});
var ControlHubUsersRoute = Route$16.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => ControlHubRoute
});
var IndustriesExtendedStayRoute = Route$61.update({
	id: "/industries/extended-stay",
	path: "/industries/extended-stay",
	getParentRoute: () => Route$50
});
var IndustriesFullServiceRoute = Route$62.update({
	id: "/industries/full-service",
	path: "/industries/full-service",
	getParentRoute: () => Route$50
});
var IndustriesSelectServiceRoute = Route$63.update({
	id: "/industries/select-service",
	path: "/industries/select-service",
	getParentRoute: () => Route$50
});
var IntegrationsIndexRoute = Route$15.update({
	id: "/integrations/",
	path: "/integrations/",
	getParentRoute: () => Route$50
});
var IntegrationsCloudbedsRoute = Route$14.update({
	id: "/integrations/cloudbeds",
	path: "/integrations/cloudbeds",
	getParentRoute: () => Route$50
});
var IntegrationsInnFlowRoute = Route$13.update({
	id: "/integrations/inn-flow",
	path: "/integrations/inn-flow",
	getParentRoute: () => Route$50
});
var IntegrationsM3Route = Route$12.update({
	id: "/integrations/m3",
	path: "/integrations/m3",
	getParentRoute: () => Route$50
});
var IntegrationsMewsRoute = Route$11.update({
	id: "/integrations/mews",
	path: "/integrations/mews",
	getParentRoute: () => Route$50
});
var IntegrationsOperaRoute = Route$10.update({
	id: "/integrations/opera",
	path: "/integrations/opera",
	getParentRoute: () => Route$50
});
var IntegrationsQuickbooksRoute = Route$9.update({
	id: "/integrations/quickbooks",
	path: "/integrations/quickbooks",
	getParentRoute: () => Route$50
});
var IntegrationsSageIntacctRoute = Route$8.update({
	id: "/integrations/sage-intacct",
	path: "/integrations/sage-intacct",
	getParentRoute: () => Route$50
});
var LegalAccessibilityRoute = Route$7.update({
	id: "/legal/accessibility",
	path: "/legal/accessibility",
	getParentRoute: () => Route$50
});
var LegalCookiesRoute = Route$6.update({
	id: "/legal/cookies",
	path: "/legal/cookies",
	getParentRoute: () => Route$50
});
var LegalPrivacyRoute = Route$5.update({
	id: "/legal/privacy",
	path: "/legal/privacy",
	getParentRoute: () => Route$50
});
var LegalSecurityRoute = Route$4.update({
	id: "/legal/security",
	path: "/legal/security",
	getParentRoute: () => Route$50
});
var LegalSubscriptionRoute = Route$3.update({
	id: "/legal/subscription",
	path: "/legal/subscription",
	getParentRoute: () => Route$50
});
var LegalTermsRoute = Route$2.update({
	id: "/legal/terms",
	path: "/legal/terms",
	getParentRoute: () => Route$50
});
var ServicesAccountabilityPackRoute = Route$1.update({
	id: "/services/accountability-pack",
	path: "/services/accountability-pack",
	getParentRoute: () => Route$50
});
var SolutionsBusinessIntelligenceRoute = Route$64.update({
	id: "/solutions/business-intelligence",
	path: "/solutions/business-intelligence",
	getParentRoute: () => Route$50
});
var SolutionsDocumentVaultRoute = Route$65.update({
	id: "/solutions/document-vault",
	path: "/solutions/document-vault",
	getParentRoute: () => Route$50
});
var SolutionsExpenseEntriesRoute = Route$66.update({
	id: "/solutions/expense-entries",
	path: "/solutions/expense-entries",
	getParentRoute: () => Route$50
});
var SolutionsFinancialControlRoute = Route$67.update({
	id: "/solutions/financial-control",
	path: "/solutions/financial-control",
	getParentRoute: () => Route$50
});
var SolutionsInnrlyPayRoute = Route$68.update({
	id: "/solutions/innrly-pay",
	path: "/solutions/innrly-pay",
	getParentRoute: () => Route$50
});
var SolutionsInnrlyShiftRoute = Route$69.update({
	id: "/solutions/innrly-shift",
	path: "/solutions/innrly-shift",
	getParentRoute: () => Route$50
});
var SolutionsLaborWorkforceRoute = Route.update({
	id: "/solutions/labor-workforce",
	path: "/solutions/labor-workforce",
	getParentRoute: () => Route$50
});
var SolutionsOperationsAutomationRoute = Route$70.update({
	id: "/solutions/operations-automation",
	path: "/solutions/operations-automation",
	getParentRoute: () => Route$50
});
var SolutionsReconciliationRoute = Route$71.update({
	id: "/solutions/reconciliation",
	path: "/solutions/reconciliation",
	getParentRoute: () => Route$50
});
var ControlHubRouteChildren = {
	ControlHubBlogsRoute,
	ControlHubLogsRoute,
	ControlHubNewslettersRoute,
	ControlHubOnboardingRoute,
	ControlHubSeoRoute,
	ControlHubSettingsRoute,
	ControlHubTestimonialsRoute,
	ControlHubTrialsRoute,
	ControlHubUsersRoute,
	ControlHubIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	R404Route,
	AboutRoute,
	ContactRoute,
	ControlHubRoute: ControlHubRoute._addFileChildren(ControlHubRouteChildren),
	DevelopersRoute,
	FeaturesRoute,
	GlossaryRoute,
	HotelBackOfficeAutomationRoute,
	LlmsFullDottxtRoute,
	LlmsDottxtRoute,
	OnboardingRoute,
	OrbPreviewRoute,
	PricingRoute,
	RobotsDottxtRoute,
	RoiCalculatorRoute,
	SecurityRoute,
	SitemapDotxmlRoute,
	BlogSlugRoute,
	CaseStudiesBoutiqueGroupRoute,
	CaseStudiesExtendedStayPortfolioRoute,
	CaseStudiesHiltonManagementCompanyRoute,
	CaseStudiesMidwestPortfolioRoute,
	CaseStudiesUrbanFullServiceRoute,
	CompareInnrlyVsActablRoute,
	CompareInnrlyVsAptechRoute,
	CompareInnrlyVsHotelEffectivenessRoute,
	CompareInnrlyVsM3Route,
	CompareInnrlyVsNimbleRoute,
	CompareInnrlyVsOtelierRoute,
	CompareInnrlyVsProfitsageRoute,
	IndustriesExtendedStayRoute,
	IndustriesFullServiceRoute,
	IndustriesSelectServiceRoute,
	IntegrationsCloudbedsRoute,
	IntegrationsInnFlowRoute,
	IntegrationsM3Route,
	IntegrationsMewsRoute,
	IntegrationsOperaRoute,
	IntegrationsQuickbooksRoute,
	IntegrationsSageIntacctRoute,
	LegalAccessibilityRoute,
	LegalCookiesRoute,
	LegalPrivacyRoute,
	LegalSecurityRoute,
	LegalSubscriptionRoute,
	LegalTermsRoute,
	ServicesAccountabilityPackRoute,
	SolutionsBusinessIntelligenceRoute,
	SolutionsDocumentVaultRoute,
	SolutionsExpenseEntriesRoute,
	SolutionsFinancialControlRoute,
	SolutionsInnrlyPayRoute,
	SolutionsInnrlyShiftRoute,
	SolutionsLaborWorkforceRoute,
	SolutionsOperationsAutomationRoute,
	SolutionsReconciliationRoute,
	BlogIndexRoute,
	CaseStudiesIndexRoute,
	CompareIndexRoute,
	IntegrationsIndexRoute
};
var routeTree = Route$50._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

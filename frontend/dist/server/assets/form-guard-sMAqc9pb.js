import { t as track } from "./analytics-P7BrM78M.js";
import { useRef } from "react";
//#region src/lib/lead-submit.ts
var RECAPTCHA_SITE_KEY = "6LcVJrkkAAAAABsSLGi1FDOjAtIyby9UNsBQPUCd";
async function getRecaptchaToken(action = "lead_submit") {
	if (typeof window === "undefined") return null;
	const grecaptcha = window.grecaptcha;
	if (!grecaptcha || typeof grecaptcha.execute !== "function") return null;
	return new Promise((resolve) => {
		try {
			grecaptcha.ready(() => {
				grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then((token) => resolve(token)).catch(() => resolve(null));
			});
		} catch {
			resolve(null);
		}
	});
}
async function submitLead(payload) {
	const url = "/api/leads";
	const isNewsletter = payload.kind === "newsletter";
	let recaptchaToken = null;
	try {
		recaptchaToken = await getRecaptchaToken(payload.source || (isNewsletter ? "newsletter" : "lead_submit"));
	} catch {}
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...payload,
				recaptcha_token: recaptchaToken,
				submittedAt: (/* @__PURE__ */ new Date()).toISOString()
			})
		});
		if (!res.ok) {
			track(isNewsletter ? "newsletter_signup" : "form_submit", {
				source: payload.source,
				ok: false,
				status: res.status
			});
			return {
				ok: false,
				error: `HTTP ${res.status}`
			};
		}
		track(isNewsletter ? "newsletter_signup" : "form_submit", {
			source: payload.source,
			ok: true
		});
		return { ok: true };
	} catch (e) {
		const error = e instanceof Error ? e.message : "network error";
		track(isNewsletter ? "newsletter_signup" : "form_submit", {
			source: payload.source,
			ok: false,
			error
		});
		return {
			ok: false,
			error
		};
	}
}
//#endregion
//#region src/lib/form-guard.ts
/**
* Anti-bot guards for forms.
* - Honeypot: a hidden field bots tend to fill in.
* - Timing trap: humans take more than ~1.5s to fill a form.
*/
function useFormGuard(minMs = 1500) {
	const mountedAt = useRef(Date.now());
	const honeypotRef = useRef(null);
	const check = () => {
		if (honeypotRef.current && honeypotRef.current.value.trim().length > 0) return {
			ok: false,
			reason: "honeypot"
		};
		if (Date.now() - mountedAt.current < minMs) return {
			ok: false,
			reason: "timing"
		};
		return { ok: true };
	};
	return {
		honeypotRef,
		check
	};
}
/** Hidden honeypot field. Visually hidden + aria-hidden + autocomplete off. */
var honeypotFieldProps = {
	type: "text",
	name: "company_website",
	tabIndex: -1,
	autoComplete: "off",
	"aria-hidden": true,
	style: {
		position: "absolute",
		left: "-9999px",
		width: "1px",
		height: "1px",
		opacity: 0,
		pointerEvents: "none"
	}
};
//#endregion
export { useFormGuard as n, submitLead as r, honeypotFieldProps as t };

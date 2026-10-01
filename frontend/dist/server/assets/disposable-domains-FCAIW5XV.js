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
//#region src/lib/disposable-domains.ts
/**
* Curated list of known disposable, temporary, and burner email domains.
* Used for client-side form validation to prevent spam and fake submissions.
*/
var DISPOSABLE_EMAIL_DOMAINS = /* @__PURE__ */ new Set([
	"10minutemail.com",
	"10minutemail.net",
	"10minutemail.org",
	"10minmail.com",
	"10minemail.com",
	"20minutemail.com",
	"anonbox.net",
	"antichef.com",
	"armyspy.com",
	"brefmail.com",
	"burnermail.io",
	"byom.de",
	"chacuo.net",
	"crazymailing.com",
	"cuvox.de",
	"dayrep.com",
	"deadaddress.com",
	"disbox.net",
	"disbox.org",
	"discard.email",
	"discardmail.com",
	"disposable.net",
	"disposablemail.com",
	"dispostable.com",
	"dropmail.me",
	"drdrb.com",
	"e4ward.com",
	"einrot.com",
	"emailondeck.com",
	"emailtemporanea.com",
	"emailtemporaneo.com",
	"emailtemporar.ro",
	"emailtemporario.com.br",
	"fakemail.net",
	"fakeinbox.com",
	"fakemailgenerator.com",
	"fleckens.hu",
	"fmail.com",
	"fmail.net",
	"freenet.de",
	"generator.email",
	"getairmail.com",
	"getnada.com",
	"grr.la",
	"guerrillamail.biz",
	"guerrillamail.com",
	"guerrillamail.de",
	"guerrillamail.net",
	"guerrillamail.org",
	"guerrillamailblock.com",
	"gustr.com",
	"harakirimail.com",
	"hideaddress.com",
	"hidemyemail.com",
	"inboxbear.com",
	"inboxclean.com",
	"inboxkitten.com",
	"inboxproxy.com",
	"incognitomail.org",
	"instantemailaddress.com",
	"jourrapide.com",
	"junkmail.com",
	"kasmail.com",
	"klzlk.com",
	"koszmail.pl",
	"lroid.com",
	"maildrop.cc",
	"mailcatch.com",
	"mailcheat.com",
	"mailde.de",
	"maildrop.com",
	"mailexpire.com",
	"mailforspam.com",
	"mailhazard.com",
	"mailhazard.us",
	"mailimate.com",
	"mailinator.com",
	"mailinator.net",
	"mailinator2.com",
	"mailnesia.com",
	"mailnull.com",
	"mailsac.com",
	"mailtemp.top",
	"mailtothis.com",
	"meltmail.com",
	"mintemail.com",
	"mohmal.com",
	"mohmal.in",
	"mohmal.im",
	"mytrashmail.com",
	"mytemp.email",
	"mytempemail.com",
	"nada.ltd",
	"nada.email",
	"noclickemail.com",
	"nomail.xl.cx",
	"nospam.ze.tc",
	"nowmymail.com",
	"objectmail.com",
	"oneoffemail.com",
	"onewaymail.com",
	"ourproject.org",
	"pookmail.com",
	"pokemail.net",
	"quickemail.info",
	"rcpt.at",
	"reallymymail.com",
	"rhyta.com",
	"rootfest.net",
	"safetymail.info",
	"sharklasers.com",
	"shitmail.me",
	"shitmail.org",
	"shortmail.net",
	"smailpro.com",
	"sofort-mail.de",
	"sogetthis.com",
	"spambox.us",
	"spamex.com",
	"spamfree24.org",
	"spamgourmet.com",
	"spamherelots.com",
	"spamhole.com",
	"spaminator.de",
	"spaml.de",
	"spammotel.com",
	"spamspot.com",
	"superrito.com",
	"teleworm.us",
	"temp-mail.com",
	"temp-mail.de",
	"temp-mail.io",
	"temp-mail.org",
	"temp-mail.ru",
	"tempail.com",
	"tempm.com",
	"tempmail.altmails.com",
	"tempmail.biz",
	"tempmail.com",
	"tempmail.de",
	"tempmail.eu",
	"tempmail.in",
	"tempmail.io",
	"tempmail.net",
	"tempmail.ninja",
	"tempmail.plus",
	"tempmail.us",
	"tempmail24.com",
	"tempmailaddress.com",
	"tempmailbox.net",
	"tempmailin.com",
	"tempmailo.com",
	"tempmailer.net",
	"temporary-mail.net",
	"temporarymail.com",
	"temporarymail.net",
	"tempr.email",
	"thespambox.com",
	"throwawaymail.com",
	"throwawayemailaddress.com",
	"ticket-mail.com",
	"tmail.com",
	"tmail.ws",
	"tmailor.com",
	"tmailo.com",
	"trash-mail.at",
	"trash-mail.com",
	"trash-mail.de",
	"trash-me.com",
	"trashmail.at",
	"trashmail.com",
	"trashmail.de",
	"trashmail.io",
	"trashmail.me",
	"trashmail.net",
	"trashmail.org",
	"trashmailer.com",
	"trashymail.com",
	"trbvm.com",
	"tuamaeaquitem.com",
	"uggsrock.com",
	"vmani.com",
	"walkmail.net",
	"wegwerfadresse.de",
	"wegwerfemail.de",
	"wegwerfmail.de",
	"wegwerfmail.net",
	"wegwerfmail.org",
	"whyspam.me",
	"yep.it",
	"yopmail.com",
	"yopmail.fr",
	"yopmail.net",
	"ypmail.webcam",
	"zeroe.ml",
	"zoemail.com",
	"zippymail.info"
]);
/**
* Checks if a given email string belongs to a known disposable or temporary email provider.
* Returns true if the email is disposable/burner, false otherwise.
*/
function isDisposableEmail(email) {
	if (!email || typeof email !== "string") return false;
	const parts = email.trim().toLowerCase().split("@");
	if (parts.length !== 2) return false;
	const domain = parts[1];
	return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}
//#endregion
export { submitLead as i, honeypotFieldProps as n, useFormGuard as r, isDisposableEmail as t };

//#region src/lib/analytics.ts
var GA_MEASUREMENT_ID = "G-TJZT02L07P";
function checkGlobalPrivacyControl() {
	if (typeof window === "undefined") return false;
	const nav = window.navigator;
	return nav.globalPrivacyControl === true || nav.globalPrivacyControl === "1" || window.globalPrivacyControl === true;
}
function isOptedOut() {
	if (typeof window === "undefined") return false;
	if (checkGlobalPrivacyControl()) return true;
	try {
		return localStorage.getItem("innrly_cookie_consent_v1") === "rejected";
	} catch {
		return false;
	}
}
function track(event, payload = {}) {
	if (typeof window === "undefined") return;
	if (typeof window.gtag === "function") try {
		window.gtag("event", event, payload);
	} catch {}
	if (isOptedOut()) return;
	({ ...payload }), window.location.pathname + window.location.search, document.referrer, (/* @__PURE__ */ new Date()).toISOString();
}
function trackPageView(path) {
	if (typeof window !== "undefined" && typeof window.gtag === "function") try {
		window.gtag("config", GA_MEASUREMENT_ID, {
			page_path: path,
			page_location: window.location.href,
			page_title: document.title
		});
		window.gtag("event", "page_view", {
			page_path: path,
			page_location: window.location.href,
			page_title: document.title
		});
	} catch {}
	track("page_view", { path });
}
//#endregion
export { trackPageView as n, track as t };

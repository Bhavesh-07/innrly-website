/* ════════════════════════════════════════════════════════════════════════════
 *  ⚠️  DEVELOPER: READ docs/DEVELOPER_HANDOFF_LEADS.md BEFORE GOING TO PROD
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  This file is the SINGLE network call for every lead-capture form on the
 *  Innrly marketing site:
 *    • Contact form         (src/routes/contact.tsx)
 *    • Onboarding / trial   (src/routes/onboarding.tsx)
 *    • Trial modal          (src/components/site/TrialModal.tsx)
 *    • Newsletter signup    (src/components/site/NewsletterSignup.tsx)
 *
 *  REQUIRED ENV VAR (build-time, Vite):
 *
 *      VITE_LEAD_WEBHOOK_URL=https://YOUR-API.innrly.com/leads
 *
 *  If unset:
 *    - dev   → payloads are console.info'd, forms "succeed"
 *    - prod  → forms silently no-op (see DevLeadBanner.tsx for visible warning)
 *
 *  Your endpoint receives a JSON POST with a `source` discriminator:
 *    "contact" | "onboarding" | "trial"
 *  Newsletter signups also carry `kind: "newsletter"` — route on that FIRST.
 *
 *  Full payload shapes, CORS requirements, and a go-live checklist live in:
 *      docs/DEVELOPER_HANDOFF_LEADS.md
 *
 * ════════════════════════════════════════════════════════════════════════════
 */
import { track } from "@/lib/analytics";

export type LeadPayload = Record<string, unknown> & {
  source: "contact" | "onboarding" | "trial";
};

const RECAPTCHA_SITE_KEY = "6LcVJrkkAAAAABsSLGi1FDOjAtIyby9UNsBQPUCd";

let recaptchaLoadPromise: Promise<boolean> | null = null;

/**
 * Lazy loads Google reCAPTCHA v3 on-demand so it doesn't block initial page load
 * on non-form routes across the marketing site.
 */
export function loadRecaptcha(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  const win = window as unknown as { grecaptcha?: { execute?: unknown } };
  if (win.grecaptcha && typeof win.grecaptcha.execute === "function") {
    return Promise.resolve(true);
  }
  if (recaptchaLoadPromise) return recaptchaLoadPromise;

  recaptchaLoadPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existing) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&ver=3.0`;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return recaptchaLoadPromise;
}

export async function getRecaptchaToken(action: string = "lead_submit"): Promise<string | null> {
  if (typeof window === "undefined") return null;

  try {
    const loaded = await loadRecaptcha();
    if (!loaded) return null;

    const win = window as unknown as {
      grecaptcha?: {
        ready: (cb: () => void) => void;
        execute: (key: string, opts: { action: string }) => Promise<string>;
      };
    };
    const grecaptcha = win.grecaptcha;
    if (!grecaptcha || typeof grecaptcha.execute !== "function") return null;

    return new Promise((resolve) => {
      try {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action })
            .then((token) => resolve(token))
            .catch(() => resolve(null));
        });
      } catch {
        resolve(null);
      }
    });
  } catch {
    return null;
  }
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string; message?: string; data?: unknown }> {
  const url = (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined) || "/api/leads";
  const isNewsletter = (payload as { kind?: string }).kind === "newsletter";

  // Fetch reCAPTCHA v3 token if available
  let recaptchaToken: string | null = null;
  try {
    recaptchaToken = await getRecaptchaToken(payload.source || (isNewsletter ? "newsletter" : "lead_submit"));
  } catch {
    // Fail-open for reCAPTCHA client errors to prevent blocking genuine user submissions
  }

  if (!url) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[lead-submit] ⚠️ VITE_LEAD_WEBHOOK_URL is NOT set — lead is being DROPPED.\n" +
          "Set it in your build env to point at your backend.\n" +
          "See docs/DEVELOPER_HANDOFF_LEADS.md.\nPayload:",
        payload,
      );
    }
    track(isNewsletter ? "newsletter_signup" : "form_submit", {
      source: payload.source,
      ok: true,
      dropped: true,
    });
    return { ok: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        recaptcha_token: recaptchaToken,
        submittedAt: new Date().toISOString()
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      track(isNewsletter ? "newsletter_signup" : "form_submit", {
        source: payload.source,
        ok: false,
        status: res.status,
      });
      const errorMsg = data?.detail || data?.message || `HTTP ${res.status}`;
      return { ok: false, error: errorMsg, message: errorMsg };
    }
    track(isNewsletter ? "newsletter_signup" : "form_submit", { source: payload.source, ok: true });
    return { ok: true, message: data?.message, data };
  } catch (e) {
    const error = e instanceof Error ? e.message : "network error";
    track(isNewsletter ? "newsletter_signup" : "form_submit", {
      source: payload.source,
      ok: false,
      error,
    });
    return { ok: false, error, message: error };
  }
}

/** True when no backend webhook is configured. Used by DevLeadBanner. */
export function isLeadWebhookConfigured(): boolean {
  return Boolean(import.meta.env.VITE_LEAD_WEBHOOK_URL);
}

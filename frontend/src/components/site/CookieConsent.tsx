import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "innrly_cookie_consent_v1";

export type Choice = "accepted" | "rejected";

export function checkGpcSignal(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as { globalPrivacyControl?: boolean | string };
  return (
    nav.globalPrivacyControl === true ||
    nav.globalPrivacyControl === "1" ||
    (window as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}

export function updateGoogleConsent(status: Choice) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status === "accepted" ? "granted" : "denied",
      ad_storage: status === "accepted" ? "granted" : "denied",
      ad_user_data: status === "accepted" ? "granted" : "denied",
      ad_personalization: status === "accepted" ? "granted" : "denied",
    });
  }
}

/**
 * Lightweight EU/UK & US/CCPA compliant cookie consent banner.
 *
 * Honors Global Privacy Control (GPC), integrates Google Consent Mode v2,
 * and allows persistent preference management via the footer.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Listen for reopen events from footer or privacy policy
    const handleOpen = () => setVisible(true);
    window.addEventListener("open-cookie-preferences", handleOpen);

    // 2. Check Global Privacy Control signal
    const isGpc = checkGpcSignal();
    if (isGpc) {
      (window as unknown as { __cookieConsent?: Choice }).__cookieConsent = "rejected";
      updateGoogleConsent("rejected");
      setVisible(false);
      return () => window.removeEventListener("open-cookie-preferences", handleOpen);
    }

    // 3. Check stored preference
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Choice | null;
      if (stored) {
        (window as unknown as { __cookieConsent?: Choice }).__cookieConsent = stored;
        updateGoogleConsent(stored);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    return () => window.removeEventListener("open-cookie-preferences", handleOpen);
  }, []);

  function decide(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      (window as unknown as { __cookieConsent?: Choice }).__cookieConsent = choice;
    } catch {
      /* ignore */
    }
    updateGoogleConsent(choice);
    track("cookie_consent", { choice });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:rounded-2xl sm:border"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your experience and measure site performance. See our{" "}
          <Link to="/legal/cookies" className="text-accent underline">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border bg-background/40"
            onClick={() => decide("rejected")}
          >
            Reject
          </Button>
          <Button size="sm" className="bg-cta hover:opacity-90" onClick={() => decide("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

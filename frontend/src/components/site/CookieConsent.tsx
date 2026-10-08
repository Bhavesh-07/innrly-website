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
  const [isGpcActive, setIsGpcActive] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      const currentGpc = checkGpcSignal();
      setIsGpcActive(currentGpc);
      setVisible(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpen);
    (window as unknown as { openCookieConsent?: () => void }).openCookieConsent = handleOpen;

    const isGpc = checkGpcSignal();
    setIsGpcActive(isGpc);

    if (isGpc) {
      (window as unknown as { __cookieConsent?: Choice }).__cookieConsent = "rejected";
      updateGoogleConsent("rejected");
      // GPC signal active: default banner stays closed, but can be reopened via footer
    } else {
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
    }

    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpen);
    };
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
      aria-label="Cookie and privacy preferences"
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-border bg-background/95 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:rounded-2xl sm:border sm:shadow-2xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">Privacy &amp; Cookie Choices</p>
            {isGpcActive && (
              <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                GPC Signal Active
              </span>
            )}
          </div>
          <p>
            We respect your privacy. Under CCPA/CPRA, you have the right to opt out of the sale or sharing of your personal information.{" "}
            {isGpcActive
              ? "Your browser's Global Privacy Control (GPC) signal is active and non-essential tracking is disabled."
              : "We use cookies to ensure site functionality and measure performance."}{" "}
            See our{" "}
            <Link to="/legal/privacy" className="text-accent underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/legal/cookies" className="text-accent underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border bg-background/40 hover:bg-background/80"
            onClick={() => decide("rejected")}
            aria-label="Reject non-essential tracking and opt out"
          >
            Reject All / Opt-Out
          </Button>
          {!isGpcActive && (
            <Button
              size="sm"
              className="bg-cta hover:opacity-90"
              onClick={() => decide("accepted")}
              aria-label="Accept essential and analytics cookies"
            >
              Accept All
            </Button>
          )}
          {isGpcActive && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setVisible(false)}
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

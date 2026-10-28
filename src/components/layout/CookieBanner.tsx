"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    setVisible(existing === null);
    setAnalyticsOn(existing?.analytics === true);

    const onOpen = () => {
      const current = readConsent();
      setAnalyticsOn(current?.analytics === true);
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  function choose(analytics: boolean) {
    const previous = readConsent();
    writeConsent(analytics);
    setShowSettings(false);
    setVisible(false);
    if (previous?.analytics && !analytics) {
      window.location.reload();
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 pb-[calc(var(--mobile-cta-h)+var(--safe-bottom))] shadow-[0_-6px_24px_rgba(23,25,29,0.08)] backdrop-blur-sm md:pb-0"
    >
      <div className="container-page py-3 md:py-3.5">
        {!showSettings ? (
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-banner-title"
                className="text-sm font-semibold text-navy"
              >
                Pliki cookies
              </h2>
              <p
                id="cookie-banner-desc"
                className="mt-1 text-sm leading-snug text-graphite md:leading-relaxed"
              >
                Używamy niezbędnych plików cookies, aby strona działała
                prawidłowo. Za Twoją zgodą możemy również korzystać z Google
                Analytics 4, aby analizować ruch na stronie i ulepszać jej
                działanie.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
              <button
                type="button"
                onClick={() => choose(true)}
                className="btn btn-primary min-h-10 px-4 text-sm sm:min-w-[10.5rem]"
              >
                Akceptuję wszystkie
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                className="btn btn-secondary min-h-10 px-4 text-sm sm:min-w-[10.5rem]"
              >
                Odrzuć opcjonalne
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnalyticsOn(readConsent()?.analytics === true);
                  setShowSettings(true);
                }}
                className="btn btn-ghost min-h-10 px-4 text-sm"
              >
                Ustawienia cookies
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-6">
            <div className="min-w-0 flex-1 space-y-2.5">
              <h2
                id="cookie-banner-title"
                className="text-sm font-semibold text-navy"
              >
                Ustawienia cookies
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <label className="flex items-start gap-2.5 text-sm text-graphite">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  <span>
                    <span className="font-semibold text-navy">Niezbędne</span>
                    <span className="ml-1 text-muted">(zawsze aktywne)</span>
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-sm text-graphite">
                  <input
                    type="checkbox"
                    checked={analyticsOn}
                    onChange={(e) => setAnalyticsOn(e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  <span>
                    <span className="font-semibold text-navy">
                      Google Analytics 4
                    </span>
                    <span className="ml-1 text-muted">(opcjonalne)</span>
                  </span>
                </label>
              </div>
              <p id="cookie-banner-desc" className="text-xs text-muted">
                Szczegóły:{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  polityka cookies
                </Link>
                {" · "}
                <Link
                  href="/polityka-prywatnosci"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  prywatność
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => choose(analyticsOn)}
                className="btn btn-primary min-h-10 px-4 text-sm"
              >
                Zapisz wybór
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="btn btn-secondary min-h-10 px-4 text-sm"
              >
                Wróć
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

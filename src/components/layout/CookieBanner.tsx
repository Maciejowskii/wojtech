"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type CookieConsent,
} from "@/lib/consent";

/** Stała referencja — useSyncExternalStore wymaga cache’owanego getServerSnapshot. */
const SERVER_CONSENT_SNAPSHOT: CookieConsent = {
  necessary: true,
  analytics: false,
  updatedAt: "ssr",
};

let cachedRaw: string | null | undefined;
let cachedConsent: CookieConsent | null | undefined;

function invalidateConsentCache() {
  cachedRaw = undefined;
  cachedConsent = undefined;
}

function subscribeConsent(onChange: () => void) {
  const notify = () => {
    invalidateConsentCache();
    onChange();
  };
  window.addEventListener(CONSENT_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(CONSENT_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

function getConsentSnapshot(): CookieConsent | null {
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === cachedRaw && cachedConsent !== undefined) {
    return cachedConsent;
  }
  cachedRaw = raw;
  cachedConsent = readConsent();
  return cachedConsent;
}

function getConsentServerSnapshot(): CookieConsent {
  return SERVER_CONSENT_SNAPSHOT;
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [forceOpen, setForceOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [ready, setReady] = useState(false);

  const visible = ready && (forceOpen || consent === null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setAnalyticsOn(readConsent()?.analytics === true);
      setShowSettings(true);
      setForceOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  function choose(analytics: boolean) {
    const previous = readConsent();
    writeConsent(analytics);
    setShowSettings(false);
    setForceOpen(false);
    if (previous?.analytics && !analytics) {
      window.location.reload();
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-white/95 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-6px_24px_rgba(23,25,29,0.08)] backdrop-blur-sm"
    >
      <div className="container-page py-3 md:py-3.5">
        {!showSettings ? (
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-6">
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-banner-title"
                className="text-sm font-semibold text-navy"
              >
                Pliki cookies
              </h2>
              <p
                id="cookie-banner-desc"
                className="mt-1 text-[0.8125rem] leading-snug text-graphite md:text-sm md:leading-relaxed"
              >
                Niezbędne cookies są zawsze włączone. Analytics tylko za zgodą.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => choose(true)}
                className="btn btn-primary min-h-10 flex-1 px-3 text-sm md:min-w-[9.5rem] md:flex-none"
              >
                Akceptuję
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                className="btn btn-secondary min-h-10 flex-1 px-3 text-sm md:min-w-[9.5rem] md:flex-none"
              >
                Odrzuć
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnalyticsOn(readConsent()?.analytics === true);
                  setShowSettings(true);
                }}
                className="hidden min-h-10 px-3 text-sm font-semibold text-accent underline-offset-2 hover:underline md:inline-flex md:items-center"
              >
                Ustawienia
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setAnalyticsOn(readConsent()?.analytics === true);
                setShowSettings(true);
              }}
              className="self-start text-sm font-semibold text-accent underline-offset-2 hover:underline md:hidden"
            >
              Ustawienia
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-6">
            <div className="min-w-0 flex-1 space-y-2.5">
              <h2
                id="cookie-banner-title"
                className="text-sm font-semibold text-navy"
              >
                Ustawienia cookies
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <div className="flex items-start gap-2.5 text-sm text-graphite">
                  <input
                    id="cookie-necessary"
                    type="checkbox"
                    checked
                    disabled
                    aria-labelledby="cookie-necessary-label"
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  <span id="cookie-necessary-label">
                    <span className="font-semibold text-navy">Niezbędne</span>
                    <span className="ml-1 text-muted">(zawsze)</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-graphite">
                  <input
                    id="cookie-analytics"
                    type="checkbox"
                    checked={analyticsOn}
                    onChange={(e) => setAnalyticsOn(e.target.checked)}
                    aria-labelledby="cookie-analytics-label"
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  <span id="cookie-analytics-label">
                    <span className="font-semibold text-navy">Analytics</span>
                    <span className="ml-1 text-muted">(opcjonalne)</span>
                  </span>
                </div>
              </div>
              <p id="cookie-banner-desc" className="text-xs text-muted">
                <Link
                  href="/cookies"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  Polityka cookies
                </Link>
                {" · "}
                <Link
                  href="/polityka-prywatnosci"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  Prywatność
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose(analyticsOn)}
                className="btn btn-primary min-h-10 flex-1 px-4 text-sm md:flex-none"
              >
                Zapisz
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="btn btn-secondary min-h-10 flex-1 px-4 text-sm md:flex-none"
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

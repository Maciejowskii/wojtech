"use client";

import { openCookieSettings } from "@/lib/consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="btn btn-secondary min-h-11 text-sm"
    >
      Zmień ustawienia cookies
    </button>
  );
}

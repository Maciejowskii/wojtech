"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site.config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-b border-border bg-mist">
      <div className="container-page flex min-h-[60svh] flex-col justify-center py-16 md:py-24">
        <p className="section-label">Błąd</p>
        <h1 className="mt-2 max-w-2xl text-[clamp(1.85rem,4vw,2.75rem)] font-semibold uppercase tracking-[0.02em] text-navy">
          Coś poszło nie tak
        </h1>
        <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
          Strona nie załadowała się poprawnie. Spróbuj ponownie albo wróć na
          start. Jak problem wraca, zadzwoń: {siteConfig.phone.display}.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={reset} className="btn btn-primary">
            Spróbuj ponownie
          </button>
          <Link href="/" className="btn btn-secondary">
            Strona główna
          </Link>
          <a href={siteConfig.phone.href} className="btn btn-secondary">
            Zadzwoń
          </a>
        </div>

        {error.digest ? (
          <p className="mt-8 text-xs text-muted">Kod: {error.digest}</p>
        ) : null}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Reviews } from "@/components/sections/Reviews";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Opinie",
  description:
    "Opinie klientów WOJ-TECH Elektroserwis w Ostrzeszowie z wizytówki Google Maps.",
  alternates: { canonical: "/opinie" },
};

export default function OpiniePage() {
  return (
    <>
      <section className="border-b border-border bg-mist">
        <div className="container-page py-12 md:py-16">
          <p className="section-label">Opinie</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-navy">
            Opinie klientów
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
            Recenzje z wizytówki Google Maps. Aktualną ocenę zobaczysz też na
            profilu firmy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={siteConfig.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full sm:w-auto"
            >
              Wizytówka Google
            </a>
            <Link
              href="/kontakt#wycena"
              className="btn btn-primary w-full sm:w-auto"
            >
              Zapytaj o wycenę
            </Link>
          </div>
        </div>
      </section>
      <Reviews showHeading={false} />
    </>
  );
}

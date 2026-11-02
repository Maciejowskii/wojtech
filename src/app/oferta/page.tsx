import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/sections/Faq";
import { OfferCatalog } from "@/components/sections/OfferCatalog";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Oferta",
  description:
    "Oferta WOJ-TECH Ostrzeszów: ekspresy do kawy, AGD, RTV, elektronika samochodowa, rowery, hulajnogi i elektronarzędzia.",
  alternates: { canonical: "/oferta" },
};

export default function OfertaPage() {
  return (
    <>
      <section className="border-b border-border bg-mist">
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="section-label">Oferta</p>
              <h1 className="mt-2 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                Co naprawiam
              </h1>
              <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                Najwięcej robię przy ekspresach do kawy. Biorę też AGD, RTV,
                elektronikę samochodową, rowery, hulajnogi i elektronarzędzia.
                Po sprawdzeniu sprzętu mówię, co da się zrobić i ile to będzie
                kosztować.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={siteConfig.phone.href} className="btn btn-primary">
                {siteConfig.phone.display}
              </a>
              <Link href="/kontakt#wycena" className="btn btn-secondary">
                Zapytaj o wycenę
              </Link>
            </div>
          </div>
        </div>
      </section>

      <OfferCatalog />

      <section className="border-y border-border bg-mist">
        <div className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
          <div className="max-w-xl">
            <p className="section-label">Kontakt</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold uppercase tracking-[0.02em] text-navy">
              Masz usterkę?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Opisz sprzęt i objawy. Oddzwonię albo odpiszę. Najszybciej
              dogadasz się telefonicznie.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={siteConfig.phone.href} className="btn btn-primary">
              Zadzwoń
            </a>
            <Link href="/kontakt#wycena" className="btn btn-secondary">
              Formularz wyceny
            </Link>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}

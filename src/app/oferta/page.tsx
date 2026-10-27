import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/sections/Faq";
import { Services } from "@/components/sections/Services";
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
          <p className="section-label">Oferta</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-navy">
            Co naprawiamy w Ostrzeszowie
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
            Ekspresy do kawy, AGD, RTV, elektronika samochodowa, rowery, hulajnogi
            i elektronarzędzia. Opisz usterkę albo zadzwoń pod{" "}
            {siteConfig.phone.display}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontakt#wycena"
              className="btn btn-primary w-full sm:w-auto"
            >
              Zapytaj o wycenę
            </Link>
            <a
              href={siteConfig.phone.href}
              className="btn btn-phone w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
          </div>
        </div>
      </section>
      <Services showHeading={false} />
      <Faq />
    </>
  );
}

import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { Quote } from "@/components/sections/Quote";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontakt WOJ-TECH Ostrzeszów: tel. ${siteConfig.phone.display}, ${siteConfig.address.full}. Formularz wyceny i mapa dojazdu.`,
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-page py-12 md:py-16">
          <p className="section-label">Kontakt</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-navy">
            Zadzwoń albo napisz
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
            Telefon {siteConfig.phone.display}. Adres: {siteConfig.address.full}.
            Najszybszy kontakt to telefon.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={siteConfig.phone.href}
              className="btn btn-primary w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <a
              href={siteConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full sm:w-auto"
            >
              Wyznacz trasę
            </a>
          </div>
        </div>
      </section>
      <Contact showHeading={false} />
      <Quote />
      <Location />
      <Faq />
    </>
  );
}

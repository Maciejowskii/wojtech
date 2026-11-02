import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { Quote } from "@/components/sections/Quote";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontakt WOJ-TECH Ostrzeszów: tel. ${siteConfig.phone.display}, ${siteConfig.address.full}. Formularz wyceny i mapa dojazdu.`,
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageIntro
        tone="white"
        label="Kontakt"
        title="Zadzwoń albo napisz"
        lead={`Tel. ${siteConfig.phone.display}. Warsztat: ${siteConfig.address.full}. Najszybciej dogadasz się przez telefon.`}
      >
        <a href={siteConfig.phone.href} className="btn btn-primary">
          Zadzwoń: {siteConfig.phone.display}
        </a>
        <a
          href={siteConfig.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Wyznacz trasę
        </a>
      </PageIntro>
      <Contact showHeading={false} />
      <Quote />
      <Location />
      <Faq />
    </>
  );
}

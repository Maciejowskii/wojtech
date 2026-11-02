import type { Metadata } from "next";
import Link from "next/link";
import { Reviews } from "@/components/sections/Reviews";
import { PageIntro } from "@/components/ui/PageIntro";
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
      <PageIntro
        label="Opinie"
        title="Opinie klientów"
        lead="Opinie z wizytówki Google. Aktualną ocenę i nowe recenzje zobaczysz też na profilu firmy."
      >
        <a
          href={siteConfig.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Wizytówka Google
        </a>
        <Link href="/kontakt#wycena" className="btn btn-primary">
          Zapytaj o wycenę
        </Link>
      </PageIntro>
      <Reviews showHeading={false} />
    </>
  );
}

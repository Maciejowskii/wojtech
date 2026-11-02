import type { Metadata } from "next";
import Link from "next/link";
import { Process } from "@/components/sections/Process";
import { Shipping } from "@/components/sections/Shipping";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Jak pracujemy",
  description:
    "Jak wygląda naprawa w WOJ-TECH Ostrzeszów: zgłoszenie, dostawa sprzętu, diagnostyka, wycena i naprawa.",
  alternates: { canonical: "/jak-pracujemy" },
};

export default function JakPracujemyPage() {
  return (
    <>
      <PageIntro
        label="Proces"
        title="Jak wygląda naprawa"
        lead="Od zgłoszenia do oddania naprawionego sprzętu. Pracuję stacjonarnie w Ostrzeszowie. Z dalszej okolicy możesz zapytać o wysyłkę."
      >
        <Link href="/kontakt#wycena" className="btn btn-primary">
          Zapytaj o wycenę
        </Link>
        <a href={siteConfig.phone.href} className="btn btn-phone">
          Zadzwoń: {siteConfig.phone.display}
        </a>
      </PageIntro>
      <Process showHeading={false} />
      <Shipping />
    </>
  );
}

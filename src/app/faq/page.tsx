import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/sections/Faq";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Najczęstsze pytania o naprawy WOJ-TECH Ostrzeszów: koszty, wysyłka, zakres usług i terminy.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageIntro
        label="Pytania"
        title="Pytania i odpowiedzi"
        lead={`Diagnostyka, wycena, dostawa sprzętu i zakres usług. Nie znalazłeś odpowiedzi? Zadzwoń: ${siteConfig.phone.display}.`}
      >
        <a href={siteConfig.phone.href} className="btn btn-primary">
          Zadzwoń: {siteConfig.phone.display}
        </a>
        <Link href="/kontakt#wycena" className="btn btn-secondary">
          Formularz wyceny
        </Link>
      </PageIntro>
      <Faq variant="full" showHeading={false} />
    </>
  );
}

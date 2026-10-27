import type { Metadata } from "next";
import Link from "next/link";
import { Process } from "@/components/sections/Process";
import { Shipping } from "@/components/sections/Shipping";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Jak pracujemy",
  description:
    "Jak wygląda naprawa w WOJ-TECH Ostrzeszów: zgłoszenie, dostawa sprzętu, diagnostyka, wycena i naprawa. Bez dojazdu do klienta.",
  alternates: { canonical: "/jak-pracujemy" },
};

export default function JakPracujemyPage() {
  return (
    <>
      <section className="border-b border-border bg-mist">
        <div className="container-page py-12 md:py-16">
          <p className="section-label">Proces</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-navy">
            Jak wygląda naprawa
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
            Cztery kroki od zgłoszenia do naprawy. Sprzęt dostarczasz do serwisu
            w Ostrzeszowie. Z dalszej okolicy możesz zapytać o wysyłkę.
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
      <Process showHeading={false} />
      <Shipping />
    </>
  );
}

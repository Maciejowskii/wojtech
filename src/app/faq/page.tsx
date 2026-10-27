import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/sections/Faq";
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
      <section className="border-b border-border bg-mist">
        <div className="container-page py-12 md:py-16">
          <h1 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-navy">
            Pytania i odpowiedzi
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
            Wszystko o diagnostyce, wycenie i oddaniu sprzętu do serwisu w
            Ostrzeszowie. Nie znalazłeś odpowiedzi? Zadzwoń:{" "}
            {siteConfig.phone.display}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={siteConfig.phone.href}
              className="btn btn-primary w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <Link
              href="/kontakt#wycena"
              className="btn btn-secondary w-full sm:w-auto"
            >
              Formularz wyceny
            </Link>
          </div>
        </div>
      </section>
      <Faq variant="full" showHeading={false} />
    </>
  );
}

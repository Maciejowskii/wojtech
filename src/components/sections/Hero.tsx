import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { googleRatingSummary } from "@/data/reviews";
import { siteConfig } from "@/lib/site.config";

export function Hero() {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");
  const reviewCount = googleRatingSummary.count;
  const weekday = siteConfig.openingHours[0];
  const weekend = siteConfig.openingHours[1];

  return (
    <section id="start" className="border-b border-border bg-mist">
      <div className="container-page grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12 xl:min-h-[calc(100svh-var(--header-h))]">
        <div className="flex flex-col gap-10 lg:col-span-5 lg:py-4">
          <div className="hero-enter">
            <p className="section-label !mb-4">Elektroserwis</p>
            <h1 className="mb-2 whitespace-nowrap text-[clamp(2.35rem,5.8vw,4.85rem)] font-bold leading-[0.92] tracking-[-0.04em] text-navy">
              WOJ-TECH
            </h1>
            <p className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
              {siteConfig.owner}
            </p>
            <p className="font-display mt-4 max-w-lg text-balance text-xl font-medium tracking-tight text-muted md:text-2xl">
              Naprawa ekspresów do kawy, AGD, RTV, elektroniki samochodowej oraz
              rowerów i hulajnóg elektrycznych w Ostrzeszowie.
              <br />
              Każda naprawa po diagnostyce i uzgodnieniu kosztów.
            </p>
            <p className="mt-4 text-sm text-muted">
              {rating} · {reviewCount} opinie Google
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                <Link href="/kontakt#wycena" className="btn btn-primary">
                  Zapytaj o wycenę
                </Link>
                <Link href="/oferta" className="btn btn-secondary">
                  Zobacz ofertę
                </Link>
              </div>
              <a
                href={siteConfig.phone.href}
                className="btn btn-secondary inline-flex w-full max-w-md items-center justify-center gap-2"
              >
                <Phone className="size-4 shrink-0" aria-hidden strokeWidth={2} />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>

          <div className="hero-enter-strip border-t-2 border-navy pt-6">
            <div className="grid gap-6 sm:grid-cols-3 sm:gap-0">
              <div className="sm:pr-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Adres
                </p>
                <p className="font-display mt-2 text-base font-semibold tracking-tight text-navy md:text-lg">
                  {siteConfig.address.street}
                </p>
              </div>
              <div className="border-border sm:border-l sm:px-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Miasto
                </p>
                <p className="font-display mt-2 text-base font-semibold tracking-tight text-navy md:text-lg">
                  {siteConfig.address.city}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {siteConfig.address.postalCode}
                </p>
              </div>
              <div className="border-border sm:border-l sm:pl-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Godziny
                </p>
                {weekday ? (
                  <p className="font-display mt-2 text-base font-semibold tracking-tight text-navy md:text-lg">
                    {weekday.days === "Poniedziałek – Piątek"
                      ? `Pon-Pt ${weekday.hours}`
                      : `${weekday.days} ${weekday.hours}`}
                  </p>
                ) : null}
                {weekend ? (
                  <p className="mt-0.5 text-sm leading-snug text-muted">
                    {weekend.days}: {weekend.hours}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-enter-media w-full lg:col-span-7">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="/brand/stanowisko.jpg"
              alt="WOJ-TECH Elektroserwis, wejście do serwisu przy Olszynie 84C w Ostrzeszowie"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

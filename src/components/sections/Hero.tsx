import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { googleRatingSummary } from "@/data/reviews";
import { siteConfig } from "@/lib/site.config";

export function Hero() {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");
  const reviewCount = googleRatingSummary.count;
  const weekday = siteConfig.openingHours[0];
  const hoursLine =
    weekday?.days === "Poniedziałek - Piątek"
      ? `Pon-Pt ${weekday.hours}`
      : weekday
        ? `${weekday.days} ${weekday.hours}`
        : null;

  return (
    <section
      id="start"
      className="flex flex-col justify-center border-b border-border bg-mist lg:min-h-[calc(100svh-var(--header-h))]"
    >
      <div className="container-page grid items-center gap-8 py-12 sm:gap-10 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:py-14 xl:gap-16">
        <div className="hero-enter min-w-0">
          <h1 className="text-[clamp(2.75rem,8.5vw,5.25rem)] font-bold leading-[0.9] tracking-[-0.03em] text-navy">
            WOJ-TECH
          </h1>

          <p className="mt-4 text-lg font-medium text-navy sm:text-xl">
            <span className="text-accent">Elektroserwis</span>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            {siteConfig.owner}
          </p>

          <p className="mt-7 max-w-[36rem] text-pretty text-lg leading-relaxed text-graphite sm:mt-8 sm:text-[1.15rem] sm:leading-[1.65]">
            Naprawiam ekspresy do kawy, AGD, RTV, elektronikę samochodową oraz
            rowery i hulajnogi elektryczne. Serwis w Ostrzeszowie: sprzęt
            oddajesz na miejscu, koszt uzgadniamy po diagnostyce.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a href={siteConfig.phone.href} className="btn btn-primary">
              <Phone className="size-4 shrink-0" aria-hidden strokeWidth={2} />
              {siteConfig.phone.display}
            </a>
            <Link href="/kontakt#wycena" className="btn btn-secondary">
              Zapytaj o wycenę
            </Link>
            <Link
              href="/oferta"
              className="text-sm font-semibold text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Pełna oferta
            </Link>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-muted sm:mt-10">
            {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
            {siteConfig.address.city}
            {hoursLine ? (
              <>
                <span className="mx-2 text-border" aria-hidden>
                  ·
                </span>
                {hoursLine}
              </>
            ) : null}
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            {rating} · {reviewCount} opinie Google
          </p>
        </div>

        <figure className="hero-enter-media relative hidden w-full lg:block">
          <div
            className="absolute inset-y-6 -left-5 right-10 -z-10 bg-steel"
            aria-hidden
          />
          <div className="relative h-[min(70svh,36rem)] overflow-hidden border border-navy/15 bg-navy">
            <Image
              src="/brand/stanowisko.jpg"
              alt="WOJ-TECH Elektroserwis, wejście do serwisu przy Olszynie 84C w Ostrzeszowie"
              fill
              priority
              className="object-cover object-[48%_35%]"
              sizes="(max-width: 1280px) 42vw, 36rem"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/90 via-navy/45 to-transparent"
              aria-hidden
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-6 pb-6 pt-10">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Serwis · Ostrzeszów
              </span>
              <span className="text-base text-steel">
                {siteConfig.address.street}, {siteConfig.address.city}
              </span>
            </figcaption>
          </div>
          <div
            className="absolute -bottom-2 left-12 right-0 h-1.5 bg-accent"
            aria-hidden
          />
        </figure>
      </div>
    </section>
  );
}

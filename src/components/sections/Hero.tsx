import Image from "next/image";
import Link from "next/link";
import { googleRatingSummary } from "@/data/reviews";
import { media } from "@/data/media";
import { siteConfig } from "@/lib/site.config";

export function Hero() {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");
  const weekday = siteConfig.openingHours[0];
  const weekend = siteConfig.openingHours[1];
  const hoursLine =
    weekday?.days === "Poniedziałek - Piątek"
      ? `Pon-Pt ${weekday.hours}`
      : weekday
        ? `${weekday.days} ${weekday.hours}`
        : null;

  return (
    <section id="start" className="border-b border-border bg-mist">
      <div className="container-page grid gap-6 py-6 sm:gap-8 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12 xl:min-h-[calc(100svh-var(--header-h))]">
        <div className="flex flex-col gap-5 sm:gap-10 lg:col-span-5 lg:py-4">
          <div>
            <p className="hero-enter-meta text-sm font-semibold text-accent">
              Ostrzeszów · {siteConfig.owner}
            </p>
            <h1 className="hero-enter-brand mt-2.5 font-display text-[clamp(2.6rem,11vw,5.25rem)] font-bold uppercase leading-[0.86] tracking-[0.01em] text-navy sm:mt-3">
              WOJ-TECH
            </h1>

            <p className="hero-enter-lead mt-3.5 text-[clamp(1.05rem,3.5vw,1.4rem)] font-medium leading-snug text-navy sm:mt-5">
              Naprawiam ekspresy do kawy, AGD, RTV, elektronikę samochodową,
              rowery i hulajnogi.
            </p>
            <p className="hero-enter-copy mt-3 hidden max-w-[36rem] text-base leading-relaxed text-muted sm:block md:text-lg">
              Warsztat w Ostrzeszowie. Przywieź sprzęt albo zadzwoń. Po
              sprawdzeniu dostajesz wycenę, zanim cokolwiek naprawię.
            </p>

            <div className="hero-enter-cta mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <a
                href={siteConfig.phone.href}
                className="btn btn-primary w-full sm:w-auto"
              >
                {siteConfig.phone.display}
              </a>
              <Link
                href="/kontakt#wycena"
                className="btn btn-secondary w-full sm:w-auto"
              >
                Zapytaj o wycenę
              </Link>
              <Link
                href="/oferta"
                className="hidden min-h-11 items-center justify-center text-sm font-semibold text-navy underline-offset-4 hover:text-accent hover:underline sm:inline-flex sm:justify-start"
              >
                Pełna oferta
              </Link>
            </div>
          </div>

          <dl className="hero-enter-facts hidden gap-5 border-t-2 border-navy pt-6 sm:grid sm:grid-cols-3 sm:gap-0">
            <div className="sm:pr-5">
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                Adres
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-snug text-navy md:text-base">
                {siteConfig.address.street}
                <span className="mt-0.5 block font-normal text-muted">
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </dd>
            </div>
            {hoursLine ? (
              <div className="border-border sm:border-l sm:px-5">
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Godziny
                </dt>
                <dd className="mt-2 text-sm font-semibold leading-snug text-navy md:text-base">
                  {hoursLine}
                  {weekend ? (
                    <span className="mt-0.5 block font-normal text-muted">
                      {weekend.days}: {weekend.hours}
                    </span>
                  ) : null}
                </dd>
              </div>
            ) : null}
            <div className="border-border sm:border-l sm:pl-5">
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                Google
              </dt>
              <dd className="mt-2 text-sm leading-snug">
                <a
                  href={siteConfig.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
                >
                  {rating}/5
                </a>
                <span className="mt-0.5 block text-muted">
                  {googleRatingSummary.count} opinie
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="hero-enter-panel w-full lg:col-span-7">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-card max-lg:-mx-[var(--page-gutter)] max-lg:w-[calc(100%+2*var(--page-gutter))] sm:aspect-[3/2] lg:mx-0 lg:w-full">
            <Image
              src={media.coffeeCups.src}
              alt={media.coffeeCups.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          <div className="mt-5 sm:hidden">
            <p className="text-[0.95rem] leading-relaxed text-muted">
              Warsztat w Ostrzeszowie. Przywieź sprzęt albo zadzwoń. Po
              sprawdzeniu dostajesz wycenę, zanim cokolwiek naprawię.
            </p>
            <p className="mt-3 text-sm leading-snug text-navy">
              <span className="font-semibold">{siteConfig.address.street}</span>
              <span className="text-muted">
                {" "}
                · {hoursLine ?? siteConfig.address.city}
              </span>
              <span className="text-muted">
                {" "}
                · {rating}/5 Google
              </span>
            </p>
            <Link
              href="/oferta"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-navy underline-offset-4 hover:text-accent hover:underline"
            >
              Pełna oferta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

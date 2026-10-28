import type { CSSProperties } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { googleRatingSummary } from "@/data/reviews";
import { offerServices } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

const heroServices = offerServices.map((s) => ({
  title: s.shortTitle,
  href: s.href,
}));

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
      className="hero-shell relative overflow-hidden border-b border-border lg:min-h-[calc(100svh-var(--header-h))]"
    >
      <div
        className="hero-field pointer-events-none absolute inset-0 bg-navy lg:right-[34%]"
        aria-hidden
      />
      <div
        className="hero-shell-glow pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative grid lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)]">
        <div className="relative z-[1] flex flex-col justify-end px-[var(--page-gutter)] pb-12 pt-14 sm:pb-14 sm:pt-16 lg:justify-center lg:py-16 lg:pr-6 xl:pr-10">
          <div className="hero-enter mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto lg:max-w-[38rem]">
            <div className="hero-enter-brand">
              <h1 className="hero-brand text-[clamp(3rem,10vw,5.75rem)] font-bold leading-[0.86] tracking-[-0.03em]">
                WOJ-TECH
              </h1>
              <span
                className="hero-accent-line mt-5 block h-1 w-20 bg-accent sm:mt-6"
                aria-hidden
              />
            </div>

            <p className="hero-enter-meta mt-5 max-w-[28rem] text-lg font-medium leading-snug text-steel sm:mt-6 sm:text-xl">
              <span className="text-azure">Elektroserwis</span>
              <span className="mx-2 text-steel/45" aria-hidden>
                ·
              </span>
              {siteConfig.owner}
              <span className="mt-1.5 block text-base font-normal text-steel/80 sm:text-[1.05rem]">
                Ostrzeszów, naprawa na miejscu, wycena po diagnostyce
              </span>
            </p>

            <ul className="hero-services mt-8 flex flex-wrap gap-x-1 gap-y-2 sm:mt-9">
              {heroServices.map((service, index) => (
                <li
                  key={service.href}
                  className="hero-service-item flex items-center text-sm sm:text-[0.95rem]"
                  style={{ "--hero-i": index } as CSSProperties}
                >
                  {index > 0 ? (
                    <span className="mx-2 text-accent/70" aria-hidden>
                      /
                    </span>
                  ) : null}
                  <Link
                    href={service.href}
                    className="font-medium text-steel transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hero-enter-cta mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={siteConfig.phone.href} className="btn btn-hero-primary">
                <Phone className="size-4 shrink-0" aria-hidden strokeWidth={2} />
                {siteConfig.phone.display}
              </a>
              <Link href="/kontakt#wycena" className="btn btn-hero-secondary">
                Zapytaj o wycenę
              </Link>
              <Link
                href="/oferta"
                className="text-sm font-semibold text-steel underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Pełna oferta
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-[1] flex flex-col justify-center bg-mist px-[var(--page-gutter)] py-12 sm:py-14 lg:bg-transparent lg:py-16 lg:pl-4 lg:pr-[var(--page-gutter)]">
          <div className="hero-enter-panel hero-proof mx-auto w-full max-w-xl border-border lg:mx-0 lg:max-w-none lg:border-l lg:bg-mist/95 lg:py-10 lg:pl-10 lg:pr-2 xl:pl-12">
            <p className="hero-enter-lead text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-navy">
              Naprawa ekspresów, AGD, RTV, elektroniki samochodowej i sprzętu
              elektrycznego.
            </p>

            <div className="hero-enter-copy mt-5 space-y-4 text-pretty text-base leading-relaxed text-graphite sm:text-[1.05rem] sm:leading-[1.7]">
              <p>
                Naprawiam ekspresy do kawy, sprzęt AGD i RTV, elektronikę
                samochodową oraz rowery i hulajnogi elektryczne.
              </p>
              <p>
                Masz sprzęt do naprawy? Zadzwoń i opowiedz, co się zepsuło!
                Przywieź go do serwisu, a po diagnostyce ustalimy koszt naprawy.
              </p>
            </div>

            <dl className="hero-enter-facts mt-8 grid gap-4 border-t border-border pt-6 sm:mt-9 sm:grid-cols-3 sm:gap-5">
              <div>
                <dt className="text-sm font-semibold text-accent">Adres</dt>
                <dd className="mt-1.5 text-sm leading-snug text-graphite">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </dd>
              </div>
              {hoursLine ? (
                <div>
                  <dt className="text-sm font-semibold text-accent">Godziny</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-graphite">
                    {hoursLine}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-sm font-semibold text-accent">Opinie</dt>
                <dd className="mt-1.5 text-sm leading-snug text-graphite">
                  <span className="font-semibold text-navy">{rating}</span>
                  {" · "}
                  {reviewCount} Google
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

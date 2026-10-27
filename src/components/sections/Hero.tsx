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
    <section
      id="start"
      className="flex min-h-[calc(100svh-var(--header-h))] flex-col border-b border-border bg-mist"
    >
      <div className="relative min-h-[min(72vh,36rem)] flex-1 overflow-hidden lg:min-h-0">
        <div className="absolute inset-0 hero-enter-media">
          <Image
            src="/brand/stanowisko.jpg"
            alt="WOJ-TECH Elektroserwis, wejście do serwisu przy Olszynie 84C w Ostrzeszowie"
            fill
            priority
            className="object-cover object-[center_30%] lg:object-[68%_35%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,246,249,0.25)_0%,rgba(243,246,249,0.45)_35%,rgba(243,246,249,0.88)_68%,rgba(243,246,249,0.96)_100%)] lg:bg-[linear-gradient(105deg,rgba(243,246,249,0.97)_0%,rgba(243,246,249,0.9)_28%,rgba(243,246,249,0.45)_46%,rgba(243,246,249,0.08)_62%,transparent_74%)]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end px-[var(--page-gutter)] pb-10 pt-12 sm:pb-12 sm:pt-14 lg:pb-14 lg:pt-16 lg:pl-[max(var(--page-gutter),calc((100vw-var(--content-width))/2))]">
          <div className="hero-enter w-full max-w-xl">
            <p className="section-label">Elektroserwis</p>
            <h1 className="text-[clamp(2.85rem,7.5vw,5.25rem)] font-semibold tracking-tight text-navy">
              WOJ-TECH
            </h1>
            <p className="mt-2 text-lg font-medium text-navy sm:text-xl md:text-2xl">
              {siteConfig.owner}
            </p>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted md:text-lg">
              Naprawa ekspresów do kawy, AGD, RTV, elektroniki samochodowej oraz
              rowerów i hulajnóg elektrycznych w Ostrzeszowie.
              <br />
              Każda naprawa po diagnostyce i uzgodnieniu kosztów.
            </p>

            <p className="mt-4 text-sm text-muted">
              {rating} · {reviewCount} opinie Google
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/kontakt#wycena"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Zapytaj o wycenę
                </Link>
                <Link
                  href="/oferta"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  Zobacz ofertę
                </Link>
              </div>
              <a
                href={siteConfig.phone.href}
                className="btn btn-phone w-full sm:max-w-md"
              >
                <Phone
                  className="size-4 shrink-0"
                  aria-hidden
                  strokeWidth={2}
                />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-border bg-white hero-enter-strip">
        <div className="container-page grid gap-5 py-4 sm:grid-cols-3 sm:gap-0 sm:py-5">
          <div className="border-b border-border pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Adres
            </p>
            <p className="mt-1.5 font-medium text-navy">
              {siteConfig.address.street}
            </p>
          </div>
          <div className="border-b border-border pb-4 sm:border-b-0 sm:border-r sm:px-8 sm:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Miasto
            </p>
            <p className="mt-1.5 font-medium text-navy">
              {siteConfig.address.city}
            </p>
            <p className="text-sm text-muted">{siteConfig.address.postalCode}</p>
          </div>
          <div className="sm:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Godziny
            </p>
            {weekday ? (
              <p className="mt-1.5 font-medium text-navy">
                {weekday.days === "Poniedziałek – Piątek"
                  ? `Pon-Pt ${weekday.hours}`
                  : `${weekday.days} ${weekday.hours}`}
              </p>
            ) : null}
            {weekend ? (
              <p className="text-sm text-muted">
                {weekend.days}: {weekend.hours}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

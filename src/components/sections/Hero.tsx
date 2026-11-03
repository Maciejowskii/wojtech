import Image from "next/image";
import Link from "next/link";
import { googleRatingSummary } from "@/data/reviews";
import { heroImage } from "@/data/media";
import { siteConfig } from "@/lib/site.config";

export function Hero() {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");
  const weekday = siteConfig.openingHours[0];
  const hoursLine =
    weekday?.days === "Poniedziałek - Piątek"
      ? `Pon–Pt ${weekday.hours}`
      : weekday
        ? `${weekday.days} ${weekday.hours}`
        : null;

  return (
    <section id="start" className="border-b border-border bg-white">
      <div className="container-page py-8 sm:py-10 lg:py-12">
        <div className="hero-enter-meta flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-navy pb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
          <span>Naprawa</span>
          <span className="text-border" aria-hidden>
            /
          </span>
          <span>Ostrzeszów</span>
          <span className="text-border" aria-hidden>
            /
          </span>
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy hover:text-accent"
          >
            Google {rating}
          </a>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="flex flex-col lg:col-span-5 lg:pt-2">
            <p className="hero-enter-meta text-sm font-semibold uppercase tracking-[0.22em] text-muted">
              Elektroserwis
            </p>

            <h1 className="hero-enter-brand mt-3 font-display text-[clamp(2.8rem,8vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[0.04em] text-navy">
              WOJ
              <span className="text-accent" aria-hidden>
                |
              </span>
              TECH
            </h1>

            <p className="hero-enter-lead mt-6 max-w-[32ch] text-[1.05rem] leading-relaxed text-graphite sm:text-lg">
              Ekspresy, AGD, RTV i elektronika. Przywieź sprzęt albo zadzwoń —
              po diagnostyce dostajesz wycenę.
            </p>

            <div className="hero-enter-cta mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={siteConfig.phone.href} className="btn btn-primary">
                {siteConfig.phone.display}
              </a>
              <Link href="/kontakt#wycena" className="btn btn-secondary">
                Zapytaj o wycenę
              </Link>
            </div>

            <dl className="hero-enter-facts mt-10 hidden gap-6 border-t border-border pt-6 sm:grid sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                  Warsztat
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-navy">
                  {siteConfig.address.street}
                </dd>
              </div>
              {hoursLine ? (
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                    Godziny
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-navy">
                    {hoursLine}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <figure className="hero-enter-panel lg:col-span-7">
            <div className="border border-navy bg-mist p-2 sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-card sm:aspect-[5/4]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              <span>Rys. 01 · Wejście warsztatu</span>
              <span className="text-navy">{siteConfig.address.street}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

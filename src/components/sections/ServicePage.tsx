import Image from "next/image";
import Link from "next/link";
import { standardProcess } from "@/data/services/process";
import type { Service } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export function ServicePageContent({ service }: { service: Service }) {
  return (
    <article>
      <section className="on-dark relative isolate overflow-hidden border-b border-border bg-navy text-white">
        {service.banner ? (
          <>
            <Image
              src={service.banner.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: service.banner.position }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-graphite/90 via-graphite/70 to-graphite/35"
              aria-hidden
            />
          </>
        ) : null}
        <div className="container-page relative py-14 md:py-20 lg:py-24">
          <p className="text-sm font-semibold text-steel">
            Oferta · Ostrzeszów
          </p>
          <h1 className="on-dark-title mt-3 max-w-4xl text-[clamp(2.4rem,6vw,4.25rem)] font-semibold uppercase tracking-[0.02em]">
            {service.title}
          </h1>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-steel">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontakt#wycena"
              className="btn btn-hero-primary w-full sm:w-auto"
            >
              Zapytaj o wycenę
            </Link>
            <a
              href={siteConfig.phone.href}
              className="btn btn-hero-secondary w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <Link
              href="/oferta"
              className="btn btn-hero-secondary w-full sm:w-auto"
            >
              Cała oferta
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.35rem)] font-semibold uppercase tracking-[0.02em] text-navy">
              Zakres usług
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {service.scope.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 py-3.5 text-[1.02rem] leading-snug text-navy"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit border border-border bg-mist p-6 md:p-7">
            <h2 className="text-lg font-semibold uppercase tracking-[0.04em] text-navy">
              Kolejność działań
            </h2>
            <ol className="mt-5 space-y-4">
              {(service.process ?? standardProcess).map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-2xl font-semibold tabular-nums text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-[0.95rem] leading-relaxed text-graphite">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="on-dark bg-navy text-white">
        <div className="container-page flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold uppercase tracking-[0.03em]">
            Masz pytanie? Napisz lub zadzwoń
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.phone.href} className="btn btn-hero-primary">
              {siteConfig.phone.display}
            </a>
            <Link href="/kontakt#wycena" className="btn btn-hero-secondary">
              Napisz do nas
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

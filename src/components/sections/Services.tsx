import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { allOfferCards, featuredService } from "@/data/services";

export function Services() {
  const others = allOfferCards.filter((s) => s.id !== featuredService.id);

  return (
    <section id="oferta" className="section-pad bg-white" aria-labelledby="oferta-title">
      <div className="container-page">
        <SectionHeading
          id="oferta-title"
          title="Jeden serwis. Wiele możliwości."
          subtitle="Zajmujemy się diagnostyką, naprawą i serwisowaniem urządzeń elektronicznych oraz sprzętu codziennego użytku."
        />

        {/* Featured: coffee / AGD */}
        <article className="card-surface relative overflow-hidden bg-gradient-to-br from-card via-white to-white p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                Wyróżniona usługa
              </div>
              <h3 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                Twój ekspres znów może działać jak należy.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {featuredService.description}
              </p>
              <ul className="mt-5 space-y-2">
                {featuredService.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-navy"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={featuredService.href} className="btn btn-primary">
                  Sprawdź szczegóły
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link href="/#wycena" className="btn btn-secondary">
                  Zapytaj o naprawę
                </Link>
              </div>
            </div>
            <div className="relative flex min-h-[220px] items-center justify-center rounded-2xl border border-border bg-navy p-8 text-white">
              <div className="text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-accent/25 text-steel">
                  <ServiceIcon name="coffee" className="size-8" />
                </span>
                <p className="mt-4 font-display text-xl font-semibold">
                  {featuredService.title}
                </p>
                <p className="mt-2 text-sm text-steel/90">
                  Serwis ekspresów do kawy · Ostrzeszów
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {others.map((service) => (
            <article
              key={service.id}
              className="card-surface flex h-full flex-col p-6 transition-shadow hover:shadow-soft"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-card text-accent">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">
                {service.shortTitle}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.href.startsWith("/") &&
                service.href !== "/#oferta" ? (
                  <Link
                    href={service.href}
                    className="btn btn-secondary px-3 py-2 text-sm"
                  >
                    Sprawdź szczegóły
                  </Link>
                ) : null}
                <Link
                  href="/#wycena"
                  className="btn btn-ghost px-3 py-2 text-sm"
                >
                  Zapytaj o naprawę
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

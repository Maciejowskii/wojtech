import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { allOfferCards } from "@/data/services";

type ServicesProps = {
  showHeading?: boolean;
};

export function Services({ showHeading = true }: ServicesProps) {
  return (
    <section
      id="oferta"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "oferta-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            id="oferta-title"
            label="Oferta"
            title="Co naprawiamy w Ostrzeszowie"
            subtitle="Ekspresy do kawy, AGD, RTV, elektronika samochodowa, rowery, hulajnogi i elektronarzędzia."
          />
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {allOfferCards.map((service, index) => {
            const featured = Boolean(service.featured);
            return (
              <article
                key={service.id}
                className={`card-surface flex h-full flex-col overflow-hidden ${
                  featured ? "md:col-span-2 xl:col-span-1 xl:row-span-1" : ""
                } ${featured ? "ring-1 ring-accent/25" : ""}`}
              >
                <div
                  className={`flex min-h-[140px] items-end p-5 ${
                    featured ? "bg-navy text-white" : "bg-card text-navy"
                  }`}
                >
                  <div>
                    <p
                      className={`font-display text-3xl font-semibold tabular-nums ${
                        featured ? "text-steel/70" : "text-steel"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <ServiceIcon
                        name={service.icon}
                        className={`size-5 ${featured ? "text-steel" : "text-accent"}`}
                      />
                      {featured ? (
                        <span className="text-xs font-semibold uppercase tracking-wide text-steel">
                          Główna specjalizacja
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold text-navy">
                    {featured
                      ? "Serwis i naprawa ekspresów do kawy"
                      : service.shortTitle}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {featured
                      ? "Diagnostyka i naprawa ekspresów oraz innych urządzeń AGD."
                      : service.summary}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    {service.href.startsWith("/") &&
                    !service.href.includes("#") &&
                    service.id !== "laptopy" ? (
                      <Link
                        href={service.href}
                        className="btn btn-secondary min-h-11 w-full px-4 py-2 text-sm sm:w-auto"
                      >
                        Sprawdź szczegóły
                      </Link>
                    ) : null}
                    <Link
                      href="/kontakt#wycena"
                      className="btn btn-ghost min-h-11 w-full px-4 py-2 text-sm sm:w-auto"
                    >
                      Zapytaj o naprawę
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site.config";

export function Location() {
  return (
    <section
      id="lokalizacja"
      className="section-pad bg-mist"
      aria-labelledby="lokalizacja-title"
    >
      <div className="container-page">
        <SectionHeading
          id="lokalizacja-title"
          label="Lokalizacja"
          title="Serwis w Ostrzeszowie"
          subtitle="Urządzenie dostarczasz osobiście. Brak dojazdu do klienta."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="card-surface p-6 md:p-8">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Adres
                </dt>
                <dd className="mt-2 text-navy">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Telefon
                </dt>
                <dd className="mt-2">
                  <a
                    href={siteConfig.phone.href}
                    className="font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Godziny otwarcia
                </dt>
                <dd className="mt-2 text-sm text-muted">
                  {siteConfig.openingHours.length > 0 ? (
                    <ul className="space-y-1">
                      {siteConfig.openingHours.map((row) => (
                        <li key={row.days}>
                          {row.days}: {row.hours}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Godziny otwarcia zostaną uzupełnione. Przed wizytą zadzwoń."
                  )}
                </dd>
              </div>
            </dl>

            <a
              href={siteConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              Wyznacz trasę
            </a>
          </div>

          <div className="card-surface overflow-hidden">
            <iframe
              title="Mapa — WOJ-TECH Elektroserwis, Ostrzeszów"
              src={siteConfig.address.mapsEmbed}
              className="h-[320px] w-full border-0 md:h-full md:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

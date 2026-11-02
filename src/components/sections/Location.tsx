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
          title="Warsztat w Ostrzeszowie"
          subtitle="Sprzęt oddajesz osobiście na Olszynie 84C."
        />

        <div className="grid gap-8 border-y border-border lg:grid-cols-[0.85fr_1.15fr] lg:gap-0">
          <div className="py-8 lg:border-r lg:border-border lg:pr-10">
            <dl className="divide-y divide-border">
              <div className="grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-accent">Adres</dt>
                <dd className="text-[1.02rem] leading-snug text-graphite">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </dd>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-accent">Telefon</dt>
                <dd className="text-[1.02rem]">
                  <a
                    href={siteConfig.phone.href}
                    className="font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-accent">Godziny</dt>
                <dd className="text-[1.02rem] leading-snug text-graphite">
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

          <div className="overflow-hidden border border-border bg-white lg:border-0 lg:border-l lg:border-border">
            <iframe
              title="Mapa - WOJ-TECH Elektroserwis, Ostrzeszów"
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

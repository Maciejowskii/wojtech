import { Clock, MapPin, Navigation, Phone } from "lucide-react";
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
          title="Odwiedź nasz serwis w Ostrzeszowie"
          subtitle="Urządzenie możesz dostarczyć osobiście. Brak dojazdu do klienta."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-surface p-6 md:p-8">
            <ul className="space-y-5">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 text-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-navy">Adres</p>
                  <p className="mt-1 text-sm text-muted">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 text-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-navy">Telefon</p>
                  <a
                    href={siteConfig.phone.href}
                    className="mt-1 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 text-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-navy">Godziny otwarcia</p>
                  {siteConfig.openingHours.length > 0 ? (
                    <ul className="mt-1 space-y-1 text-sm text-muted">
                      {siteConfig.openingHours.map((row) => (
                        <li key={row.days}>
                          {row.days}: {row.hours}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-muted">
                      Godziny otwarcia zostaną uzupełnione. Przed wizytą
                      zadzwoń, aby potwierdzić dostępność.
                    </p>
                  )}
                </div>
              </li>
            </ul>

            <a
              href={siteConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              <Navigation className="size-4" aria-hidden />
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

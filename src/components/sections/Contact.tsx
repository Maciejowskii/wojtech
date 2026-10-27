import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site.config";

type ContactProps = {
  showHeading?: boolean;
};

export function Contact({ showHeading = true }: ContactProps) {
  return (
    <section
      id="kontakt"
      className="section-pad bg-mist"
      aria-labelledby={showHeading ? "kontakt-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            id="kontakt-title"
            label="Kontakt"
            title="Zadzwoń albo napisz"
            subtitle={`Telefon ${siteConfig.phone.display}. Adres: ${siteConfig.address.full}.`}
          />
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-surface p-6 md:p-8">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Telefon
                </dt>
                <dd className="mt-1">
                  <a
                    href={siteConfig.phone.href}
                    className="text-lg font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  E-mail
                </dt>
                <dd className="mt-1 text-navy">
                  {siteConfig.email.display ||
                    "Adres e-mail — uzupełnij w konfiguracji"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Adres
                </dt>
                <dd className="mt-1 text-navy">{siteConfig.address.full}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Godziny
                </dt>
                <dd className="mt-1 text-muted">
                  {siteConfig.openingHours.length > 0
                    ? siteConfig.openingHours
                        .map((row) => `${row.days}: ${row.hours}`)
                        .join(". ")
                    : "Uzupełnij w konfiguracji. Przed wizytą zadzwoń."}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={siteConfig.phone.href}
                className="btn btn-primary w-full sm:w-auto"
              >
                Zadzwoń
              </a>
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full sm:w-auto"
              >
                Trasa
              </a>
              <Link
                href="/kontakt#wycena"
                className="btn btn-ghost w-full sm:w-auto"
              >
                Formularz wyceny
              </Link>
            </div>
          </div>

          <div className="card-surface p-6 md:p-8">
            <h3 className="text-xl font-semibold text-navy">
              Wyślij wiadomość
            </h3>
            <p className="mt-2 text-sm text-muted">
              Opisz urządzenie i problem. Oddzwonimy lub odpiszemy.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

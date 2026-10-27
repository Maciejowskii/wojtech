import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site.config";

type ContactProps = {
  showHeading?: boolean;
};

export function Contact({ showHeading = true }: ContactProps) {
  const hours =
    siteConfig.openingHours.length > 0
      ? siteConfig.openingHours
          .map((row) => `${row.days}: ${row.hours}`)
          .join(". ")
      : "Przed wizytą zadzwoń.";

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
            title="Zapytaj o wycenę naprawy"
            subtitle="Opisz urządzenie i usterkę. Oddzwonimy z informacją o dalszych krokach."
          />
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <dl className="space-y-3 text-[0.95rem] leading-relaxed text-navy">
              <div>
                <dt className="inline font-semibold">Telefon: </dt>
                <dd className="inline">
                  <a
                    href={siteConfig.phone.href}
                    className="underline-offset-2 hover:text-accent hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              {siteConfig.email.display ? (
                <div>
                  <dt className="inline font-semibold">E-mail: </dt>
                  <dd className="inline">
                    <a
                      href={siteConfig.email.href}
                      className="underline-offset-2 hover:text-accent hover:underline"
                    >
                      {siteConfig.email.display}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="inline font-semibold">Adres: </dt>
                <dd className="inline">{siteConfig.address.full}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Godziny: </dt>
                <dd className="inline text-muted">{hours}</dd>
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
            </div>

            <Link
              href="/kontakt"
              className="mt-6 inline-block text-sm font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
            >
              Pełna strona kontaktu
            </Link>
          </div>

          <div className="card-surface p-6 md:p-8" id="wycena">
            <div className="mt-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

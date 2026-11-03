import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/lib/site.config";

type ContactProps = {
  showHeading?: boolean;
};

export function Contact({ showHeading = true }: ContactProps) {
  const weekday = siteConfig.openingHours[0];
  const weekend = siteConfig.openingHours[1];

  return (
    <section
      id="kontakt"
      className="section-pad bg-mist"
      aria-labelledby={showHeading ? "kontakt-title" : undefined}
    >
      <div className="container-page">
        <ScrollReveal variant="blur">
          {showHeading ? (
            <SectionHeader
              label="Kontakt"
              title="Napisz albo zadzwoń"
              titleId="kontakt-title"
              lead="Napisz, co się dzieje ze sprzętem — albo zadzwoń."
              action={
                <div className="flex flex-col gap-3 sm:items-end">
                  <a
                    href={siteConfig.phone.href}
                    className="font-display text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-none tracking-[0.02em] text-navy underline-offset-4 hover:text-accent hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <a href={siteConfig.phone.href} className="btn btn-primary">
                      Zadzwoń
                    </a>
                    <a
                      href={siteConfig.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Trasa
                    </a>
                  </div>
                </div>
              }
            />
          ) : (
            <SectionHeader label="Kontakt" title="Dane warsztatu" />
          )}
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <ScrollReveal variant="left" delay={60} className="lg:col-span-5">
            <dl className="divide-y divide-border border border-border bg-white">
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-semibold text-accent">Adres</dt>
                <dd className="text-[0.98rem] leading-snug text-graphite">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </dd>
              </div>
              {weekday ? (
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-semibold text-accent">Godziny</dt>
                  <dd className="text-[0.98rem] leading-snug text-graphite">
                    <span className="block">
                      {weekday.days === "Poniedziałek - Piątek"
                        ? "Pon-Pt"
                        : weekday.days}{" "}
                      {weekday.hours}
                    </span>
                    {weekend ? (
                      <span className="mt-1 block text-muted">
                        {weekend.days === "Sobota - Niedziela"
                          ? "Sob-Nd"
                          : weekend.days}{" "}
                        {weekend.hours}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {siteConfig.email.display ? (
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-semibold text-accent">E-mail</dt>
                  <dd className="text-[0.98rem] leading-snug">
                    <a
                      href={siteConfig.email.href}
                      className="font-medium text-graphite underline-offset-2 hover:text-accent hover:underline"
                    >
                      {siteConfig.email.display}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-semibold text-accent">Właściciel</dt>
                <dd className="text-[0.98rem] leading-snug text-graphite">
                  {siteConfig.owner}
                </dd>
              </div>
            </dl>
          </ScrollReveal>

          <ScrollReveal
            variant="right"
            delay={120}
            className="border border-border bg-white px-5 py-6 sm:px-7 sm:py-8 lg:col-span-7"
          >
            <div id="wycena">
              <p className="section-label">Formularz</p>
              <h3 className="mt-1 text-[clamp(1.25rem,2.2vw,1.55rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                Zgłoszenie
              </h3>
              <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-muted">
                Model, objawy i od kiedy jest problem.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
              {showHeading ? (
                <p className="mt-5 text-sm text-muted">
                  Pełniejszy formularz?{" "}
                  <Link
                    href="/kontakt"
                    className="font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
                  >
                    Strona kontaktu
                  </Link>
                </p>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

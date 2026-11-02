import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      className="section-pad border-t border-border bg-mist"
      aria-labelledby={showHeading ? "kontakt-title" : undefined}
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <ScrollReveal variant="blur" className="max-w-xl">
            {showHeading ? (
              <>
                <p className="section-label">Kontakt</p>
                <h2
                  id="kontakt-title"
                  className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[0.02em] text-navy"
                >
                  Napisz albo zadzwoń
                </h2>
                <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                  Napisz, co masz za sprzęt i co się z nim dzieje. Oddzwonię albo
                  odpiszę. Najszybciej załatwisz sprawę telefonicznie.
                </p>
              </>
            ) : (
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                Dane warsztatu
              </h2>
            )}
          </ScrollReveal>

          <ScrollReveal
            variant="scale"
            delay={120}
            className="flex shrink-0 flex-col gap-4 lg:items-end"
          >
            <a
              href={siteConfig.phone.href}
              className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-none tracking-[0.02em] text-navy underline-offset-4 hover:text-accent hover:underline"
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
          </ScrollReveal>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-16">
          <ScrollReveal variant="left" delay={60}>
            <dl className="divide-y divide-border border-y border-border">
              <div className="grid gap-1 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-accent">Adres</dt>
                <dd className="text-[1.02rem] leading-snug text-graphite">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </dd>
              </div>
              {weekday ? (
                <div className="grid gap-1 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-accent">Godziny</dt>
                  <dd className="text-[1.02rem] leading-snug text-graphite">
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
                <div className="grid gap-1 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-accent">E-mail</dt>
                  <dd className="text-[1.02rem] leading-snug">
                    <a
                      href={siteConfig.email.href}
                      className="font-medium text-graphite underline-offset-2 hover:text-accent hover:underline"
                    >
                      {siteConfig.email.display}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="grid gap-1 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-accent">Właściciel</dt>
                <dd className="text-[1.02rem] leading-snug text-graphite">
                  {siteConfig.owner}
                </dd>
              </div>
            </dl>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={140}>
            <div id="wycena">
              <p className="section-label">Formularz</p>
              <h3 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                Formularz zgłoszenia
              </h3>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">
                Model, objawy i od kiedy jest problem. To wystarczy na start.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
              {showHeading ? (
                <p className="mt-6 text-sm text-muted">
                  Chcesz więcej pól i pełniejszy opis?{" "}
                  <Link
                    href="/kontakt"
                    className="font-semibold text-navy underline-offset-2 hover:text-accent hover:underline"
                  >
                    Przejdź do strony kontaktu
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

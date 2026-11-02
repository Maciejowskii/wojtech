import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { offerServices } from "@/data/services";

type ServicesProps = {
  showHeading?: boolean;
  /** Na /oferta pokazujemy pełne body; na landingu skrót */
  dense?: boolean;
};

export function Services({
  showHeading = true,
  dense = false,
}: ServicesProps) {
  const items = dense ? offerServices : offerServices;

  return (
    <section
      id="oferta"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "oferta-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <ScrollReveal variant="blur">
            <div className="mb-8 max-w-3xl md:mb-16">
              <p className="section-label">Oferta</p>
              <h2
                id="oferta-title"
                className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold uppercase tracking-[0.02em] text-navy"
              >
                Co naprawiam
              </h2>
              <p className="mt-4 max-w-[60ch] text-pretty text-base leading-relaxed text-muted md:text-lg">
                Najwięcej robię przy ekspresach do kawy. Oprócz tego biorę AGD,
                RTV, elektronikę samochodową, rowery, hulajnogi i
                elektronarzędzia. Po obejrzeniu sprzętu mówię, co da się zrobić
                i ile to będzie kosztować.
              </p>
            </div>
          </ScrollReveal>
        ) : null}

        <div className="divide-y divide-border border-y border-border">
          {items.map((service, index) => (
            <ScrollReveal
              key={service.id}
              as="article"
              variant={index % 2 === 0 ? "left" : "right"}
              delay={Math.min(index * 50, 150)}
              className="grid gap-4 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-12 md:py-14"
            >
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                  {service.featured ? "Specjalizacja" : "Usługa"}
                </p>
                <h3 className="mt-2 text-[clamp(1.65rem,3vw,2.35rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                  {service.shortTitle}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {service.summary}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex min-h-11 items-center font-semibold text-navy underline-offset-4 hover:text-accent hover:underline"
                >
                  Szczegóły usługi
                </Link>
              </div>

              <div className="space-y-4 text-[1.02rem] leading-[1.7] text-graphite">
                {(dense ? service.body : service.body.slice(0, 2)).map(
                  (paragraph, i) => (
                    <p key={`${service.id}-${i}`}>{paragraph}</p>
                  ),
                )}
                {!dense && service.body.length > 2 ? (
                  <p className="text-[0.95rem] text-muted">
                    Więcej o typowych usterkach i zakresie jest na stronie
                    usługi.
                  </p>
                ) : null}

                {dense ? (
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-navy">
                      Typowe zgłoszenia
                    </p>
                    <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
                      {service.commonIssues.map((issue) => (
                        <li
                          key={issue}
                          className="border-l-2 border-accent/40 pl-3"
                        >
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {showHeading ? (
          <ScrollReveal variant="scale" delay={120} className="mt-10">
            <Link href="/oferta" className="btn btn-secondary">
              Pełna oferta
            </Link>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}

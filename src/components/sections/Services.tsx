import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { offerServices } from "@/data/services";

type ServicesProps = {
  showHeading?: boolean;
};

/**
 * Szybki przegląd usług pod karuzelą: tekstowy indeks (bez powtarzania grafik),
 * żeby od razu było widać cały zakres i dało się przejść do właściwej usługi.
 */
export function Services({ showHeading = true }: ServicesProps) {
  return (
    <section
      id="oferta"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "oferta-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <ScrollReveal variant="blur">
            <SectionHeader
              label="Oferta"
              title="Co naprawiam"
              titleId="oferta-title"
              lead="Wybierz rodzaj sprzętu. Najpierw diagnoza i wycena, potem naprawa."
              action={
                <Link href="/oferta" className="btn btn-secondary">
                  Pełna oferta
                </Link>
              }
            />
          </ScrollReveal>
        ) : null}

        <ul className="grid border-t border-navy lg:grid-cols-2 lg:gap-x-14">
          {offerServices.map((service, index) => (
            <ScrollReveal
              key={service.id}
              as="li"
              variant="up"
              delay={Math.min((index % 2) * 70, 140)}
              className="border-b border-border"
            >
              <Link
                href={service.href}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-5 no-underline sm:grid-cols-[3rem_1fr_auto] sm:py-6"
              >
                <span className="font-display text-2xl font-semibold tabular-nums text-steel sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[clamp(1.1rem,2vw,1.35rem)] font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent">
                    {service.shortTitle}
                  </span>
                  <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-muted">
                    {service.summary}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="pt-1 text-xl text-accent transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

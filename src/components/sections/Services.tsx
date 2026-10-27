import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { offerServices } from "@/data/services";

type ServicesProps = {
  showHeading?: boolean;
};

const landingServices = offerServices.slice(0, 3);

export function Services({ showHeading = true }: ServicesProps) {
  const items = showHeading ? landingServices : offerServices;

  return (
    <section
      id="oferta"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "oferta-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <ScrollReveal>
            <SectionHeading
              id="oferta-title"
              label="Specjalizacje"
              title="Kompleksowy serwis elektroniki"
              subtitle="Od diagnostyki, przez naprawę, aż do oddania sprawnego sprzętu."
            />
          </ScrollReveal>
        ) : null}

        <div
          className={`grid gap-5 ${
            items.length <= 3
              ? "md:grid-cols-3"
              : "md:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {items.map((service, index) => (
            <ScrollReveal
              key={service.id}
              as="article"
              delay={index * 100}
              className="card-surface flex h-full flex-col overflow-hidden"
            >
              <div className="flex min-h-[160px] items-end bg-card p-5 text-navy">
                <div>
                  <ServiceIcon
                    name={service.icon}
                    className="size-8 text-accent"
                  />
                  <p className="mt-4 font-display text-3xl font-semibold tabular-nums text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold text-navy">
                  {String(index + 1).padStart(2, "0")}. {service.shortTitle}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {service.summary}
                </p>
                <div className="mt-5">
                  <Link
                    href={service.href}
                    className="btn btn-secondary min-h-11 w-full px-4 py-2 text-sm"
                  >
                    Sprawdź szczegóły
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {showHeading ? (
          <ScrollReveal delay={220} className="mt-8">
            <Link href="/oferta" className="btn btn-secondary">
              Cała oferta
            </Link>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}

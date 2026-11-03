import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { serviceImages } from "@/data/media";
import { featuredService, offerServices } from "@/data/services";

type ServicesProps = {
  showHeading?: boolean;
};

function serviceImage(id: string) {
  return serviceImages[id as keyof typeof serviceImages];
}

export function Services({ showHeading = true }: ServicesProps) {
  const featured = featuredService;
  const others = offerServices.filter((s) => s.id !== featured.id);
  const featuredImage = serviceImage(featured.id);

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
              lead="Ekspresy, AGD, RTV, elektronika, rowery i hulajnogi. Najpierw wycena."
              action={
                <Link href="/oferta" className="btn btn-secondary">
                  Pełna oferta
                </Link>
              }
            />
          </ScrollReveal>
        ) : null}

        <ScrollReveal variant="left" className="mb-5 md:mb-6">
          <Link
            href={featured.href}
            className="group grid overflow-hidden border border-border no-underline lg:grid-cols-12"
          >
            <div className="relative aspect-[16/11] bg-mist sm:aspect-[2/1] lg:col-span-7 lg:aspect-auto lg:min-h-[22rem]">
              {featuredImage ? (
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              ) : null}
            </div>
            <div className="flex flex-col justify-center bg-mist px-5 py-6 sm:px-8 sm:py-8 lg:col-span-5 lg:px-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                Specjalizacja
              </p>
              <h3 className="mt-2 text-[clamp(1.55rem,3vw,2.15rem)] font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent">
                {featured.shortTitle}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-muted">
                {featured.summary}
              </p>
              <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:text-accent group-hover:underline">
                Szczegóły usługi
              </span>
            </div>
          </Link>
        </ScrollReveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {others.map((service, index) => {
            const image = serviceImage(service.id);

            return (
              <ScrollReveal
                key={service.id}
                as="li"
                variant="up"
                delay={Math.min(index * 70, 210)}
              >
                <Link
                  href={service.href}
                  className="group grid h-full overflow-hidden border border-border no-underline sm:grid-rows-[auto_1fr]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col px-4 py-4 sm:px-5 sm:py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                      Usługa
                    </p>
                    <h3 className="mt-1.5 text-[clamp(1.15rem,2vw,1.4rem)] font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent">
                      {service.shortTitle}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                    <span className="mt-auto pt-4 text-sm font-semibold text-navy underline-offset-4 group-hover:text-accent group-hover:underline">
                      Szczegóły
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

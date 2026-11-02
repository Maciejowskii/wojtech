import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { serviceImages } from "@/data/media";
import { offerServices } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export function OfferCatalog() {
  return (
    <section className="section-pad bg-white" aria-labelledby="oferta-lista">
      <div className="container-page">
        <ScrollReveal variant="blur">
          <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-label">Usługi</p>
              <h2
                id="oferta-lista"
                className="text-[clamp(1.85rem,4vw,2.75rem)] font-semibold uppercase tracking-[0.02em] text-navy"
              >
                Zakres napraw
              </h2>
              <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                Po diagnostyce dostajesz wycenę. Bez zgody nie zaczynam naprawy.
              </p>
            </div>
            <nav
              aria-label="Szybki skok do usług"
              className="-mx-[var(--page-gutter)] flex gap-2 overflow-x-auto px-[var(--page-gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:max-w-xl md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {offerServices.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="shrink-0 rounded-[var(--radius-sm)] border border-border bg-mist px-3 py-2 text-sm font-semibold text-navy whitespace-nowrap underline-offset-4 hover:border-accent hover:text-accent md:border-0 md:bg-transparent md:px-0 md:py-0 md:underline-offset-4 md:hover:underline"
                >
                  {service.shortTitle}
                </a>
              ))}
            </nav>
          </div>
        </ScrollReveal>

        <div className="space-y-16 md:space-y-20">
          {offerServices.map((service, index) => {
            const image =
              serviceImages[service.id as keyof typeof serviceImages];
            const reverse = index % 2 === 1;

            return (
              <ScrollReveal
                key={service.id}
                as="article"
                variant={reverse ? "right" : "left"}
                className="scroll-mt-28 border-b border-border pb-16 last:border-b-0 last:pb-0 md:scroll-mt-32 md:pb-20"
              >
                <div id={service.id} className="scroll-mt-28 md:scroll-mt-32">
                  <div
                    className={`grid items-center gap-8 lg:gap-14 ${
                      reverse
                        ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                        : "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/11] overflow-hidden bg-mist ${
                        reverse ? "lg:order-2" : ""
                      }`}
                    >
                      {image ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 48vw"
                        />
                      ) : null}
                    </div>

                    <div className={reverse ? "lg:order-1" : undefined}>
                      <p className="text-sm font-semibold text-accent">
                        {service.featured ? "Specjalizacja" : "Usługa"}
                      </p>
                      <h3 className="mt-2 text-[clamp(1.65rem,3vw,2.35rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                        {service.shortTitle}
                      </h3>
                      <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
                        {service.summary}
                      </p>
                      <p className="mt-4 text-[1.02rem] leading-relaxed text-graphite">
                        {service.body[0]}
                      </p>

                      <div className="mt-6">
                        <p className="text-sm font-semibold text-navy">
                          Co obejmuje
                        </p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {service.scope.slice(0, 6).map((item) => (
                            <li
                              key={item}
                              className="border-l-2 border-accent/40 pl-3 text-sm leading-snug text-muted"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <Link href={service.href} className="btn btn-primary">
                          Szczegóły usługi
                        </Link>
                        <Link
                          href="/kontakt#wycena"
                          className="btn btn-secondary"
                        >
                          Zapytaj o wycenę
                        </Link>
                        <a
                          href={siteConfig.phone.href}
                          className="text-sm font-semibold text-navy underline-offset-4 hover:text-accent hover:underline"
                        >
                          {siteConfig.phone.display}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

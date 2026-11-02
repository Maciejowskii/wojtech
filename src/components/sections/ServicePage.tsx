import Link from "next/link";
import type { Service } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export function ServicePageContent({ service }: { service: Service }) {
  return (
    <article>
      <section className="on-dark relative isolate overflow-hidden border-b border-border bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 80% at 12% 80%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%)",
          }}
        />
        <div className="container-page relative py-14 md:py-20 lg:py-24">
          <p className="text-sm font-semibold text-steel">
            Oferta · Ostrzeszów
          </p>
          <h1 className="on-dark-title mt-3 max-w-4xl text-[clamp(2.4rem,6vw,4.25rem)] font-semibold uppercase tracking-[0.02em]">
            {service.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-steel">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontakt#wycena"
              className="btn btn-hero-primary w-full sm:w-auto"
            >
              Zapytaj o wycenę
            </Link>
            <a
              href={siteConfig.phone.href}
              className="btn btn-hero-secondary w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <Link
              href="/oferta"
              className="btn btn-hero-secondary w-full sm:w-auto"
            >
              Cała oferta
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-5 text-[1.05rem] leading-[1.75] text-graphite">
            <h2 className="text-[clamp(1.75rem,3vw,2.35rem)] font-semibold uppercase tracking-[0.02em] text-navy">
              Jak wygląda ta usługa
            </h2>
            {service.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}

            <div className="pt-4">
              <h3 className="text-xl font-semibold uppercase tracking-[0.02em] text-navy">
                Typowe zgłoszenia
              </h3>
              <ul className="mt-4 space-y-3">
                {service.commonIssues.map((issue) => (
                  <li
                    key={issue}
                    className="border-l-2 border-accent pl-4 text-[1.02rem] leading-relaxed text-graphite"
                  >
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-mist p-6 md:p-7">
              <h2 className="text-lg font-semibold uppercase tracking-[0.04em] text-navy">
                Zakres
              </h2>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {service.scope.map((item) => (
                  <li key={item} className="py-3 text-[0.95rem] text-navy">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Co da się zrobić, ustalam po obejrzeniu konkretnego urządzenia.
                Nie obiecuję naprawy wszystkich marek bez wcześniejszej oceny.
              </p>
            </div>

            <div className="border border-border bg-white p-6 md:p-7">
              <h2 className="text-lg font-semibold uppercase tracking-[0.04em] text-navy">
                Jak zacząć
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                <li>Zadzwoń albo napisz, co się dzieje ze sprzętem.</li>
                <li>Przywieź urządzenie do warsztatu w Ostrzeszowie.</li>
                <li>Po diagnostyce dostajesz wycenę i zakres naprawy.</li>
              </ol>
              <p className="mt-4 text-sm text-muted">
                Adres: {siteConfig.address.full}. Wysyłka możliwa po
                uzgodnieniu. Bez dojazdu do klienta.
              </p>
              <Link
                href="/kontakt#wycena"
                className="btn btn-primary mt-6 w-full"
              >
                Formularz wyceny
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}

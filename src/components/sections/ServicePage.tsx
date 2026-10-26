import Link from "next/link";
import { Check, Phone } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export function ServicePageContent({ service }: { service: Service }) {
  return (
    <article>
      <section className="border-b border-border bg-mist">
        <div className="container-page py-14 md:py-20">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Oferta · Ostrzeszów
          </p>
          <div className="mt-4 flex flex-wrap items-start gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-white text-accent shadow-sm">
              <ServiceIcon name={service.icon} className="size-7" />
            </span>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-navy md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#wycena" className="btn btn-primary">
              Zapytaj o wycenę
            </Link>
            <a href={siteConfig.phone.href} className="btn btn-secondary">
              <Phone className="size-4" aria-hidden />
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <Link href="/#oferta" className="btn btn-ghost">
              Sprawdź ofertę
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-navy">Zakres usług</h2>
            <ul className="mt-5 space-y-3">
              {service.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-mist/50 px-4 py-3 text-navy"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Zakres możliwej naprawy ustalamy po diagnostyce konkretnego
              urządzenia. Nie obiecujemy naprawy wszystkich marek i modeli bez
              wcześniejszej oceny.
            </p>
          </div>

          <aside className="card-surface h-fit p-6">
            <h2 className="text-lg font-bold text-navy">Jak zacząć?</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>Opisz usterkę w formularzu lub zadzwoń.</li>
              <li>Dostarcz urządzenie do serwisu w Ostrzeszowie.</li>
              <li>Otrzymasz informacje o diagnostyce i wycenie.</li>
            </ol>
            <p className="mt-4 text-sm text-muted">
              Adres: {siteConfig.address.full}. Brak dojazdu do klienta —
              możliwa wysyłka po uzgodnieniu.
            </p>
            <Link href="/#wycena" className="btn btn-primary mt-6 w-full">
              Formularz wyceny
            </Link>
          </aside>
        </div>
      </section>
    </article>
  );
}

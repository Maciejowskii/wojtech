import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export function ServicePageContent({ service }: { service: Service }) {
  return (
    <article>
      <section className="border-b border-border bg-mist">
        <div className="container-page py-14 md:py-16 lg:py-20">
          <p className="section-label">Oferta · Ostrzeszów</p>
          <div className="mt-2 flex flex-wrap items-start gap-4">
            <span className="grid size-12 place-items-center rounded-[var(--radius-md)] border border-border bg-white text-accent">
              <ServiceIcon name={service.icon} className="size-6" />
            </span>
            <div className="max-w-3xl">
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-navy">
                {service.title}
              </h1>
              <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/kontakt#wycena"
              className="btn btn-primary w-full sm:w-auto"
            >
              Zapytaj o wycenę
            </Link>
            <a
              href={siteConfig.phone.href}
              className="btn btn-phone w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
            <Link href="/oferta" className="btn btn-ghost w-full sm:w-auto">
              Cała oferta
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold text-navy">Zakres usług</h2>
            <ul className="mt-5 divide-y divide-border border border-border">
              {service.scope.map((item) => (
                <li key={item} className="px-4 py-3 text-navy">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[65ch] text-sm leading-relaxed text-muted">
              Zakres możliwej naprawy ustalamy po diagnostyce konkretnego
              urządzenia. Nie obiecujemy naprawy wszystkich marek i modeli bez
              wcześniejszej oceny.
            </p>
          </div>

          <aside className="card-surface h-fit p-6">
            <h2 className="text-lg font-semibold text-navy">Jak zacząć?</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>Opisz usterkę w formularzu lub zadzwoń.</li>
              <li>Dostarcz urządzenie do serwisu w Ostrzeszowie.</li>
              <li>Po diagnostyce podamy koszt i zakres.</li>
            </ol>
            <p className="mt-4 text-sm text-muted">
              Adres: {siteConfig.address.full}. Wysyłka możliwa po uzgodnieniu.
            </p>
            <Link href="/kontakt#wycena" className="btn btn-primary mt-6 w-full">
              Formularz wyceny
            </Link>
          </aside>
        </div>
      </section>
    </article>
  );
}

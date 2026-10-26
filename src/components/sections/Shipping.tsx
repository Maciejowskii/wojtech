import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site.config";

const points = [
  { ok: false, text: "Brak dojazdu do klienta" },
  { ok: true, text: "Możliwość osobistego dostarczenia urządzenia" },
  { ok: true, text: "Możliwość ustalenia szczegółów wysyłki" },
  { ok: true, text: "Wstępna konsultacja przed wysłaniem sprzętu" },
];

export function Shipping() {
  return (
    <section className="section-pad bg-white" aria-labelledby="wysylka-title">
      <div className="container-page">
        <div className="card-surface grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <SectionHeading
              id="wysylka-title"
              label="Wysyłka"
              className="mb-4"
              title="Nie jesteś z Ostrzeszowa? Możesz wysłać nam sprzęt."
            />
            <p className="max-w-2xl text-base leading-relaxed text-muted">
              Zajmujemy się również urządzeniami dostarczanymi spoza
              Ostrzeszowa. Skontaktuj się z nami, opisz problem i zapytaj o
              możliwość wysyłki sprzętu do serwisu. Nie organizujemy transportu
              automatycznie i nie pokrywamy kosztów przesyłki bez osobnego
              ustalenia.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {points.map((p) => (
                <li
                  key={p.text}
                  className="border border-border bg-mist/60 px-4 py-3 text-sm text-navy"
                >
                  <span className="font-semibold text-accent">
                    {p.ok ? "Tak" : "Nie"}
                  </span>
                  <span className="mx-2 text-border">·</span>
                  {p.text}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/#wycena" className="btn btn-primary w-full sm:w-auto">
                Zapytaj o wysyłkę
              </Link>
              <a
                href={siteConfig.phone.href}
                className="btn btn-phone w-full sm:w-auto"
              >
                Skontaktuj się z serwisem
              </a>
            </div>
          </div>

          <aside className="border border-border bg-mist p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Adres serwisu
            </p>
            <p className="mt-3 text-lg font-semibold text-navy">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Urządzenia przyjmujemy w serwisie. Brak usług z dojazdem.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

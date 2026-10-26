import Link from "next/link";
import { Check, X } from "lucide-react";
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
        <div className="card-surface overflow-hidden bg-navy p-6 text-white md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                id="wysylka-title"
                tone="onDark"
                className="mb-4"
                title="Nie jesteś z Ostrzeszowa? Możesz wysłać nam sprzęt."
              />
              <p className="max-w-2xl text-base leading-relaxed text-steel">
                Zajmujemy się również urządzeniami dostarczanymi spoza
                Ostrzeszowa. Skontaktuj się z nami, opisz problem i zapytaj o
                możliwość wysyłki sprzętu do serwisu. Nie organizujemy transportu
                automatycznie i nie pokrywamy kosztów przesyłki bez osobnego
                ustalenia.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {points.map((p) => (
                  <li
                    key={p.text}
                    className="flex items-start gap-2 rounded-xl bg-white/5 px-3 py-3 text-sm"
                  >
                    {p.ok ? (
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-steel"
                        aria-hidden
                      />
                    ) : (
                      <X
                        className="mt-0.5 size-4 shrink-0 text-steel/80"
                        aria-hidden
                      />
                    )}
                    {p.text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#wycena"
                  className="btn bg-accent text-white hover:bg-accent-hover"
                >
                  Zapytaj o wysyłkę
                </Link>
                <a
                  href={siteConfig.phone.href}
                  className="btn border border-white/25 bg-transparent text-white hover:bg-white/10"
                >
                  Skontaktuj się z serwisem
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="font-display text-lg font-semibold">
                Adres serwisu
              </p>
              <p className="mt-3 text-steel">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
              <p className="mt-4 text-sm text-steel/85">
                Urządzenia przyjmujemy w serwisie. Brak usług z dojazdem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

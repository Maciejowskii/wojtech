import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function Hero() {
  return (
    <section id="start" className="border-b border-border bg-mist">
      <div className="container-page grid items-end gap-8 py-10 sm:gap-10 sm:py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <div>
          <p className="section-label">Elektroserwis</p>
          <h1 className="max-w-xl text-[clamp(2.35rem,9vw,4.25rem)] font-semibold tracking-tight text-navy">
            WOJ-TECH
          </h1>
          <p className="mt-2 text-lg font-medium text-navy sm:text-xl md:text-2xl">
            {siteConfig.owner}
          </p>
          <p className="mt-4 max-w-[38rem] text-pretty text-base leading-relaxed text-muted sm:mt-5 md:text-lg">
            Naprawa elektroniki, ekspresów do kawy, sprzętu AGD, elektroniki
            samochodowej oraz rowerów i hulajnóg elektrycznych w Ostrzeszowie.
            Sprawdź ofertę i zapytaj o wycenę naprawy.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link href="/#wycena" className="btn btn-primary w-full sm:w-auto">
              Zapytaj o wycenę
            </Link>
            <a
              href={siteConfig.phone.href}
              className="btn btn-phone w-full sm:w-auto"
            >
              Zadzwoń: {siteConfig.phone.display}
            </a>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6">
            Serwis w Ostrzeszowie · możliwa wysyłka sprzętu · indywidualna wycena
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-navy sm:aspect-[5/4] lg:aspect-[4/5]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 480 560"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Miejsce na zdjęcie stanowiska serwisowego"
            >
              <defs>
                <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#20354B" />
                  <stop offset="100%" stopColor="#17191D" />
                </linearGradient>
              </defs>
              <rect width="480" height="560" fill="url(#heroBg)" />
              <path
                d="M60 420 L180 180 L260 300 L340 140 L420 420"
                fill="none"
                stroke="#B2C3D7"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
              <circle cx="180" cy="180" r="6" fill="#267A9B" />
              <circle cx="340" cy="140" r="6" fill="#267A9B" />
              <text
                x="40"
                y="500"
                fill="#B2C3D7"
                fontFamily="system-ui,sans-serif"
                fontSize="13"
                letterSpacing="1.5"
              >
                STANOWISKO SERWISOWE — DODAJ ZDJĘCIE
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Practical info strip — jak na stronie referencyjnej */}
      <div className="border-t border-border bg-white">
        <div className="container-page grid gap-5 py-6 sm:grid-cols-3 sm:gap-6 sm:py-7">
          <div className="border-b border-border pb-5 sm:border-0 sm:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Adres
            </p>
            <p className="mt-2 font-medium text-navy">
              {siteConfig.address.street}
            </p>
          </div>
          <div className="border-b border-border pb-5 sm:border-0 sm:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Miasto
            </p>
            <p className="mt-2 font-medium text-navy">
              {siteConfig.address.city}
            </p>
            <p className="text-sm text-muted">{siteConfig.address.postalCode}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Kontakt
            </p>
            <a
              href={siteConfig.phone.href}
              className="mt-2 inline-block min-h-11 py-1 font-medium text-navy underline-offset-2 hover:text-accent hover:underline"
            >
              {siteConfig.phone.display}
            </a>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {siteConfig.openingHours.length > 0
                ? siteConfig.openingHours.map((h) => h.hours).join(" · ")
                : "Godziny — uzupełnij w konfiguracji"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

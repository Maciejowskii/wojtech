import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site.config";

const icon = {
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const icons = {
  firma: (
    <svg {...icon}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  kontakt: (
    <svg {...icon}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  godziny: (
    <svg {...icon}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  termin: (
    <svg {...icon}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  wysylka: (
    <svg {...icon}>
      <path d="M3 7l9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10" />
    </svg>
  ),
};

function Fact({
  label,
  glyph,
  children,
}: {
  label: string;
  glyph: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
        {glyph}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy/60">
          {label}
        </dt>
        <dd className="mt-1 text-sm leading-relaxed text-navy">{children}</dd>
      </div>
    </div>
  );
}

/** Szary pasek pod karuzelą: dane firmy, kontakt, godziny i zasady przyjęcia sprzętu. */
export function Hero() {
  const weekday = siteConfig.openingHours[0];

  return (
    <section
      id="start"
      className="border-b border-navy/15 bg-card"
      aria-label="Dane firmy"
    >
      <div className="container-page py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="hero-enter-brand lg:col-span-4">
            <h1 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[0.04em] text-navy">
              WOJ
              <span className="text-accent" aria-hidden>
                |
              </span>
              TECH
            </h1>
            <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-navy/70">
              Elektroserwis · Ostrzeszów
            </p>
            <div className="hero-enter-cta mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={siteConfig.phone.href} className="btn btn-primary">
                {siteConfig.phone.display}
              </a>
              <Link href="/kontakt#wycena" className="btn btn-secondary">
                Zapytaj o wycenę
              </Link>
            </div>
          </div>

          <dl className="hero-enter-facts grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-8 lg:border-l lg:border-navy/15 lg:pl-12">
            <Fact label="Firma" glyph={icons.firma}>
              <span className="font-semibold">
                {siteConfig.legalName}
              </span>
              <br />
              {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
              {siteConfig.address.city}
              <br />
              <span className="text-navy/70">
                NIP {siteConfig.nip} · REGON {siteConfig.regon}
              </span>
            </Fact>

            <Fact label="Kontakt" glyph={icons.kontakt}>
              <a
                href={siteConfig.phone.href}
                className="font-semibold hover:underline"
              >
                {siteConfig.phone.display}
              </a>
              <br />
              <a
                href={siteConfig.email.href}
                className="break-all hover:underline"
              >
                {siteConfig.email.display}
              </a>
            </Fact>

            {weekday ? (
              <Fact label="Godziny otwarcia" glyph={icons.godziny}>
                <span className="font-semibold">Pon.–Pt. {weekday.hours}</span>
                <br />
                <span className="text-navy/70">Sobota i niedziela: zamknięte</span>
              </Fact>
            ) : null}

            <Fact label="Inny termin" glyph={icons.termin}>
              {siteConfig.hoursNote}
            </Fact>

            <div className="sm:col-span-2">
              <Fact label="Naprawa wysyłkowa" glyph={icons.wysylka}>
                {siteConfig.shippingNote}
              </Fact>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  MapPin,
  Package,
  Cpu,
  ClipboardList,
} from "lucide-react";
import { siteConfig } from "@/lib/site.config";

const highlights = [
  {
    icon: MapPin,
    label: "Serwis w Ostrzeszowie",
  },
  {
    icon: Package,
    label: "Możliwość wysyłki sprzętu z innych miejscowości",
  },
  {
    icon: Cpu,
    label: "Naprawy wielu rodzajów urządzeń",
  },
  {
    icon: ClipboardList,
    label: "Indywidualna wycena usterek",
  },
];

export function Hero() {
  return (
    <section
      id="start"
      className="relative overflow-hidden border-b border-border bg-mist"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 85% 20%, color-mix(in srgb, var(--color-steel) 55%, transparent), transparent 55%),
            linear-gradient(135deg, transparent 40%, color-mix(in srgb, var(--color-accent) 6%, transparent) 100%)
          `,
        }}
      />

      <div className="container-page relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        <div className="reveal">
          <p className="font-display text-sm font-semibold tracking-[0.12em] text-accent">
            WOJ-TECH · ELEKTROSERWIS
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-navy md:text-5xl lg:text-[3.25rem]">
            Naprawiamy elektronikę. Przywracamy sprzęt do życia.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            Od ekspresów do kawy i sprzętu RTV/AGD, przez elektronikę
            samochodową, aż po rowery i hulajnogi elektryczne. Sprawdź ofertę
            naszego serwisu w Ostrzeszowie i zapytaj o wycenę naprawy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#wycena" className="btn btn-primary">
              Zapytaj o wycenę
            </Link>
            <Link href="/#oferta" className="btn btn-secondary">
              Poznaj nasze usługi
            </Link>
            <a href={siteConfig.phone.href} className="btn btn-ghost">
              Zadzwoń: {siteConfig.phone.display}
            </a>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-2xl border border-border/80 bg-white/80 px-4 py-3 shadow-sm"
              >
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-card text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-medium leading-snug text-navy">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative" style={{ animationDelay: "120ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-border bg-navy shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]">
            {/* Visual stand-in until owner provides workshop photo */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 480 600"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Ilustracja stanowiska serwisowego — zastąp zdjęciem warsztatu"
            >
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#20354B" />
                  <stop offset="100%" stopColor="#17191D" />
                </linearGradient>
                <pattern
                  id="grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M24 0H0V24"
                    fill="none"
                    stroke="#B2C3D7"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="480" height="600" fill="url(#bg)" />
              <rect width="480" height="600" fill="url(#grid)" />
              <rect
                x="48"
                y="120"
                width="384"
                height="280"
                rx="16"
                fill="#267A9B"
                fillOpacity="0.18"
                stroke="#B2C3D7"
                strokeOpacity="0.35"
              />
              <rect
                x="80"
                y="160"
                width="140"
                height="90"
                rx="8"
                fill="#FEFEFE"
                fillOpacity="0.08"
                stroke="#B2C3D7"
                strokeOpacity="0.4"
              />
              <circle cx="320" cy="205" r="42" fill="#267A9B" fillOpacity="0.35" />
              <path
                d="M100 340h80M100 360h120M100 380h60"
                stroke="#B2C3D7"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M280 320c20-30 60-30 80 0s60 30 80 0"
                fill="none"
                stroke="#267A9B"
                strokeWidth="3"
                opacity="0.7"
              />
              <text
                x="240"
                y="480"
                textAnchor="middle"
                fill="#B2C3D7"
                fontFamily="system-ui,sans-serif"
                fontSize="15"
                fontWeight="600"
                letterSpacing="2"
              >
                STANOWISKO SERWISOWE
              </text>
              <text
                x="240"
                y="508"
                textAnchor="middle"
                fill="#B2C3D7"
                fontFamily="system-ui,sans-serif"
                fontSize="12"
                opacity="0.7"
              >
                Dodaj zdjęcie warsztatu w /public/images
              </text>
            </svg>
          </div>
          <p className="mt-3 text-center text-xs text-muted lg:text-left">
            Miejsce na zdjęcie rzeczywistego stanowiska serwisowego.
          </p>
        </div>
      </div>
    </section>
  );
}

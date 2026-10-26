import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo className="[&_span]:!text-white [&_.text-muted]:!text-steel [&_.bg-navy]:bg-accent" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel/90">
            Naprawa elektroniki, ekspresów do kawy, AGD, elektroniki
            samochodowej oraz rowerów i hulajnóg w Ostrzeszowie.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            Nawigacja
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-steel">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#wycena" className="transition-colors hover:text-white">
                Formularz wyceny
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-steel">
            <li>
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-2 font-medium text-white hover:text-steel"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {siteConfig.phone.display}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </li>
            <li>
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-white hover:underline"
              >
                Otwórz mapę
              </a>
            </li>
            {siteConfig.openingHours.length > 0 ? (
              <li className="space-y-1">
                {siteConfig.openingHours.map((row) => (
                  <div key={row.days}>
                    <span className="text-white/90">{row.days}: </span>
                    {row.hours}
                  </div>
                ))}
              </li>
            ) : (
              <li className="text-steel/80">
                Godziny otwarcia — uzupełnij w konfiguracji strony.
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            Informacje
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-steel">
            <li>
              <Link
                href="/polityka-prywatnosci"
                className="hover:text-white"
              >
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Pliki cookies
              </Link>
            </li>
            <li className="pt-2 text-steel/80">
              Dane przetwarzamy wyłącznie w celu obsługi zgłoszeń serwisowych.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-steel/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.legalName}
          </p>
          <p>Serwis elektroniki Ostrzeszów</p>
        </div>
      </div>
    </footer>
  );
}

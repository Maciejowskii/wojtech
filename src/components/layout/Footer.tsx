import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site.config";
import { offerServices } from "@/data/services";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white text-navy">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Elektroserwis w Ostrzeszowie. Naprawa elektroniki, ekspresów do
            kawy, AGD, elektroniki samochodowej oraz rowerów i hulajnóg.
          </p>
          <p className="mt-3 text-sm text-muted">{siteConfig.owner}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Nawigacja
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#wycena" className="hover:text-accent">
                Formularz wyceny →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Oferta
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {offerServices.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className="hover:text-accent">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a
                href={siteConfig.phone.href}
                className="font-medium text-navy hover:text-accent"
              >
                {siteConfig.phone.display}
              </a>
            </li>
            <li>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </li>
            <li>
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Otwórz mapę
              </a>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-accent">
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-accent">
                Pliki cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {siteConfig.legalName}</p>
          <p>Serwis elektroniki Ostrzeszów</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { googleRatingSummary } from "@/data/reviews";
import { offerServices } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");

  return (
    <footer className="border-t border-border bg-white text-navy">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Elektroserwis w Ostrzeszowie. Naprawa ekspresów do kawy, AGD, RTV,
            elektroniki samochodowej, rowerów i hulajnóg.
          </p>
          <p className="mt-3 text-sm text-muted">
            {rating} · {googleRatingSummary.count} opinie Google
          </p>
          <p className="mt-1 text-sm text-muted">{siteConfig.owner}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Nawigacja
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Specjalizacje
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {offerServices.slice(0, 3).map((s) => (
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
              {siteConfig.openingHours.map((row) => (
                <span key={row.days} className="block">
                  {row.days}: {row.hours}
                </span>
              ))}
            </li>
            <li>
              <Link href="/kontakt#wycena" className="hover:text-accent">
                Formularz kontaktowy
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-accent">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.legalName}
          </p>
          <p className="sm:text-right">
            Serwis elektroniki Ostrzeszów
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            Wykonano przez{" "}
            <a
              href="https://synthit.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy underline-offset-2 hover:text-accent hover:underline"
            >
              SynthIT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

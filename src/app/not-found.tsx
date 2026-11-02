import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Strona główna" },
  { href: "/oferta", label: "Oferta" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
  { href: "/mapa-strony", label: "Mapa strony" },
];

export default function NotFound() {
  return (
    <section className="border-b border-border bg-mist">
      <div className="container-page flex min-h-[70svh] flex-col justify-center py-16 md:py-24">
        <p className="section-label">Błąd 404</p>
        <p className="mt-3 font-display text-[clamp(4.5rem,18vw,9rem)] font-bold leading-none tracking-[0.02em] text-navy">
          404
        </p>
        <h1 className="mt-6 max-w-2xl text-[clamp(1.85rem,4vw,2.75rem)] font-semibold uppercase tracking-[0.02em] text-navy">
          Nie ma takiej strony
        </h1>
        <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
          Link mógł wygasnąć albo adres jest błędny. Wróć na start albo zadzwoń
          do warsztatu.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className="btn btn-primary">
            Strona główna
          </Link>
          <a href={siteConfig.phone.href} className="btn btn-secondary">
            Zadzwoń: {siteConfig.phone.display}
          </a>
        </div>

        <nav aria-label="Przydatne linki" className="mt-12 border-t border-border pt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
            Przydatne linki
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-navy">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

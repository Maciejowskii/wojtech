import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Pliki cookies",
  description: "Informacje o plikach cookies na stronie WOJ-TECH Elektroserwis.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <div className="section-pad">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-bold text-navy md:text-4xl">
          Pliki cookies
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          Na stronie WOJ-TECH Elektroserwis stosujemy pliki cookies i podobne
          technologie w zakresie opisanym poniżej.
        </p>

        <h2 className="mt-10 text-xl font-bold text-navy">
          Cookies niezbędne
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Są wymagane do prawidłowego działania witryny (np. zapamiętanie Twojej
          decyzji o cookies, bezpieczeństwo panelu administracyjnego). Działają
          bez dodatkowej zgody.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">
          Cookies analityczne (opcjonalne)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Po wyrażeniu zgody możemy uruchomić Google Analytics 4 (GA4), żeby
          mierzyć ruch na stronie (np. odwiedziny, źródła ruchu). Skrypt GA4
          ładuje się dopiero po akceptacji. Możesz w każdej chwili wybrać tylko
          cookies niezbędne.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">
          Google Search Console i Ahrefs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Narzędzia SEO takie jak Google Search Console oraz Ahrefs (audyt,
          pozycje, Webmaster Tools) nie wymagają umieszczania cookies
          śledzących w przeglądarce odwiedzającego. Służą właścicielowi strony
          do analizy widoczności w wyszukiwarkach.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">
          Zmiana ustawień
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Możesz ponownie otworzyć baner i zmienić decyzję:
        </p>
        <div className="mt-4">
          <CookieSettingsButton />
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted">
          Więcej o przetwarzaniu danych:{" "}
          <Link
            href="/polityka-prywatnosci"
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            Polityka prywatności
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

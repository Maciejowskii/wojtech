import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { LegalDoc, LegalSection } from "@/components/ui/LegalDoc";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Pliki cookies",
  description:
    "Informacje o plikach cookies i zgodzie na analitykę na stronie WOJ-TECH Elektroserwis.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <PageIntro
        label="Dokumenty"
        title="Pliki cookies"
        lead="Jak działają cookies i podobne technologie na stronie warsztatu WOJ-TECH w Ostrzeszowie."
      >
        <CookieSettingsButton />
        <Link href="/polityka-prywatnosci" className="btn btn-primary">
          Polityka prywatności
        </Link>
      </PageIntro>

      <LegalDoc updated="2 listopada 2026">
        <LegalSection title="Co stosujemy">
          <p>
            Na stronie {siteConfig.name} używamy niezbędnych mechanizmów
            technicznych oraz opcjonalnej analityki Google Analytics 4. Decyzję
            o analityce zapisujemy w pamięci lokalnej przeglądarki
            (localStorage), a nie w klasycznym pliku cookie.
          </p>
        </LegalSection>

        <LegalSection title="Niezbędne">
          <p>
            Są potrzebne, żeby strona działała poprawnie. Nie wymagają osobnej
            zgody.
          </p>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Cel</th>
                  <th>Czas</th>
                  <th>Typ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>wojtech-cookie-consent</code>
                  </td>
                  <td>Zapamiętanie Twojej decyzji o cookies / analityce</td>
                  <td>Do zmiany ustawień lub wyczyszczenia danych</td>
                  <td>localStorage</td>
                </tr>
                <tr>
                  <td>
                    <code>wojtech_admin_session</code>
                  </td>
                  <td>
                    Sesja panelu administracyjnego (tylko dla uprawnionych osób)
                  </td>
                  <td>Sesja / wg ustawień serwera</td>
                  <td>Cookie HTTP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection title="Analityczne (opcjonalne)">
          <p>
            Po kliknięciu „Akceptuję wszystkie” w banerze możemy uruchomić Google
            Analytics 4. Bez zgody skrypt GA4 się nie ładuje. GA4 może ustawiać
            własne cookies (np. z rodziny{" "}
            <code>_ga</code>
            ), żeby mierzyć ruch, źródła wejść i zachowanie na stronie.
          </p>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Nazwa (przykład)</th>
                  <th>Cel</th>
                  <th>Warunek</th>
                  <th>Dostawca</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>, <code>_ga_*</code>
                  </td>
                  <td>Statystyki odwiedzin i sesji</td>
                  <td>Tylko po zgodzie</td>
                  <td>Google Analytics 4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Więcej o przetwarzaniu danych:{" "}
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>.
          </p>
        </LegalSection>

        <LegalSection title="Narzędzia SEO właściciela">
          <p>
            Google Search Console oraz narzędzia typu Ahrefs służą właścicielowi
            strony do analizy widoczności w wyszukiwarkach. Nie wymagają
            umieszczania cookies śledzących w przeglądarce odwiedzającego.
          </p>
        </LegalSection>

        <LegalSection title="Jak zmienić decyzję">
          <p>
            W każdej chwili możesz otworzyć ustawienia i wybrać tylko cookies
            niezbędne albo zgodzić się na analitykę ponownie.
          </p>
          <div className="pt-2">
            <CookieSettingsButton />
          </div>
          <p>
            Możesz też wyczyścić dane witryny w ustawieniach przeglądarki. Po
            odwołaniu zgody na analitykę strona przeładowuje się, żeby wyłączyć
            GA4.
          </p>
        </LegalSection>

        <LegalSection title="Kontakt">
          <p>
            Pytania o cookies i dane osobowe: tel.{" "}
            <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            {siteConfig.email.display ? (
              <>
                {" "}
                lub <a href={siteConfig.email.href}>{siteConfig.email.display}</a>
              </>
            ) : null}
            .
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, LegalSection } from "@/components/ui/LegalDoc";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacja o przetwarzaniu danych osobowych w WOJ-TECH Elektroserwis Ostrzeszów (RODO).",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        label="Dokumenty"
        title="Polityka prywatności"
        lead="Informacja o tym, jak przetwarzamy dane osobowe w związku z działalnością warsztatu i stroną internetową."
      >
        <Link href="/cookies" className="btn btn-secondary">
          Pliki cookies
        </Link>
        <Link href="/kontakt" className="btn btn-primary">
          Kontakt
        </Link>
      </PageIntro>

      <LegalDoc updated="2 listopada 2026">
        <LegalSection title="Administrator danych">
          <p>
            Administratorem danych osobowych jest {siteConfig.owner}, prowadzący
            działalność pod nazwą {siteConfig.legalName}, adres:{" "}
            {siteConfig.address.full}.
          </p>
          <p>
            Kontakt w sprawach danych: tel.{" "}
            <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            {siteConfig.email.display ? (
              <>
                , e-mail{" "}
                <a href={siteConfig.email.href}>{siteConfig.email.display}</a>
              </>
            ) : null}
            .
          </p>
        </LegalSection>

        <LegalSection title="Zakres stosowania">
          <p>Ta informacja dotyczy danych przetwarzanych w związku z:</p>
          <ul>
            <li>korzystaniem ze strony {siteConfig.url.replace(/^https?:\/\//, "")},</li>
            <li>formularzem wyceny i kontaktem online,</li>
            <li>rozmową telefoniczną lub e-mailową w sprawie naprawy,</li>
            <li>
              opcjonalną analityką ruchu (Google Analytics 4) po wyrażeniu zgody.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Jakie dane zbieramy">
          <p>W zależności od formy kontaktu możemy przetwarzać:</p>
          <ul>
            <li>imię lub nazwisko / nazwę firmy,</li>
            <li>numer telefonu i adres e-mail,</li>
            <li>opis urządzenia, usterki i inne informacje ze zgłoszenia,</li>
            <li>
              dane techniczne związane z wizytą na stronie (np. adres IP,
              informacje o urządzeniu) w zakresie narzędzi analitycznych po
              zgodzie,
            </li>
            <li>
              dane niezbędne do logowania w panelu administracyjnym (tylko dla
              uprawnionych osób).
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Cele i podstawy prawne">
          <ul>
            <li>
              Odpowiedź na zapytanie i obsługa zgłoszenia naprawy: art. 6 ust. 1
              lit. b lub f RODO (wykonanie działań przed umową / prawnie
              uzasadniony interes administratora).
            </li>
            <li>
              Kontakt telefoniczny lub mailowy w sprawie serwisu: art. 6 ust. 1
              lit. f RODO.
            </li>
            <li>
              Analityka ruchu na stronie (GA4): art. 6 ust. 1 lit. a RODO (zgoda
              wyrażona w banerze cookies).
            </li>
            <li>
              Dochodzenie lub obrona roszczeń oraz bezpieczeństwo serwisu: art. 6
              ust. 1 lit. f RODO.
            </li>
            <li>
              Wypełnienie obowiązków prawnych, gdy mają zastosowanie: art. 6
              ust. 1 lit. c RODO.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Odbiorcy danych">
          <p>
            Dane mogą być powierzane podmiotom wspierającym działanie warsztatu i
            strony, w szczególności:
          </p>
          <ul>
            <li>dostawcy hostingu i utrzymania strony,</li>
            <li>
              Google (Google Analytics 4) po wyrażeniu zgody na cookies
              analityczne,
            </li>
            <li>
              operatorom poczty elektronicznej i telekomunikacji w zakresie
              normalnej komunikacji.
            </li>
          </ul>
          <p>
            Nie sprzedajemy danych osobowych. Przekazanie poza EOG może nastąpić
            wyłącznie przy narzędziach takich jak Google, na zasadach opisanych w
            dokumentacji Google i przy odpowiednim mechanizmie prawnym.
          </p>
        </LegalSection>

        <LegalSection title="Okres przechowywania">
          <ul>
            <li>
              Zgłoszenia kontaktowe: przez czas potrzebny do obsługi sprawy, a
              potem najwyżej przez okres przedawnienia ewentualnych roszczeń
              albo krócej, jeśli usuniemy je wcześniej.
            </li>
            <li>
              Dane analityczne: zgodnie z konfiguracją GA4 i Twoją zgodą. Zgodę
              możesz wycofać w każdej chwili na stronie{" "}
              <Link href="/cookies">Pliki cookies</Link>.
            </li>
            <li>
              Decyzja o cookies w przeglądarce: do czasu zmiany ustawień lub
              wyczyszczenia pamięci lokalnej przeglądarki.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Twoje prawa">
          <p>Przysługuje Ci prawo do:</p>
          <ul>
            <li>dostępu do danych,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych (w przypadkach przewidzianych prawem),</li>
            <li>ograniczenia przetwarzania,</li>
            <li>przenoszenia danych (gdy ma to zastosowanie),</li>
            <li>sprzeciwu wobec przetwarzania opartego na art. 6 ust. 1 lit. f,</li>
            <li>wycofania zgody w dowolnym momencie (bez wpływu na legalność
              wcześniejszego przetwarzania),</li>
            <li>
              wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
              (uodo.gov.pl).
            </li>
          </ul>
          <p>
            Wniosek możesz zgłosić telefonicznie lub mailowo. Dane kontaktowe są
            wyżej.
          </p>
        </LegalSection>

        <LegalSection title="Pliki cookies i podobne technologie">
          <p>
            Szczegóły dotyczące cookies, localStorage zgody oraz Google Analytics
            opisuje strona{" "}
            <Link href="/cookies">Pliki cookies</Link>.
          </p>
        </LegalSection>

        <LegalSection title="Dobrowolność podania danych">
          <p>
            Podanie danych w formularzu lub podczas rozmowy jest dobrowolne, ale
            bez numeru telefonu albo innego sposobu kontaktu trudno będzie
            obsłużyć zgłoszenie naprawy.
          </p>
        </LegalSection>

        <LegalSection title="Zmiany dokumentu">
          <p>
            Możemy zaktualizować tę informację, gdy zmieni się sposób działania
            strony lub przepisy. Aktualna wersja jest zawsze dostępna pod tym
            adresem.
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}

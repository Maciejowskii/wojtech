import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacje o przetwarzaniu danych osobowych w WOJ-TECH Elektroserwis.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PrivacyPage() {
  return (
    <div className="section-pad">
      <div className="container-page prose-custom max-w-3xl">
        <h1 className="text-3xl font-bold text-navy md:text-4xl">
          Polityka prywatności
        </h1>
        <p className="mt-4 text-muted">
          Niniejsza informacja dotyczy przetwarzania danych osobowych w związku
          z działalnością {siteConfig.legalName} oraz korzystaniem ze strony
          internetowej.
        </p>

        <h2 className="mt-10 text-xl font-bold text-navy">Administrator</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Administratorem danych jest {siteConfig.owner}, prowadzący działalność
          pod nazwą {siteConfig.name}, adres: {siteConfig.address.full}, tel.{" "}
          {siteConfig.phone.display}.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">
          Cele i podstawy przetwarzania
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Dane podane w formularzu wyceny lub kontaktowym przetwarzamy w celu
          obsługi zgłoszenia, kontaktu zwrotnego oraz przygotowania informacji o
          możliwej naprawie - na podstawie zgody lub prawnie uzasadnionego
          interesu związanego z odpowiedzią na zapytanie.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">Zakres danych</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Zazwyczaj: imię, numer telefonu, opcjonalnie e-mail, opis urządzenia i
          usterki oraz inne informacje przekazane w treści zgłoszenia.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">Okres przechowywania</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Dane przechowujemy przez czas potrzebny do obsługi zgłoszenia oraz -
          gdy to konieczne - przez okres wynikający z przepisów prawa.
        </p>

        <h2 className="mt-8 text-xl font-bold text-navy">Prawa osób</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia,
          ograniczenia przetwarzania, przenoszenia oraz wniesienia skargi do
          Prezesa UODO. W sprawach danych osobowych skontaktuj się telefonicznie:{" "}
          {siteConfig.phone.display}.
        </p>

        <p className="mt-10 text-xs text-muted">
          Dokument stanowi podstawową informację RODO i powinien zostać
          zweryfikowany przez właściciela przed publikacją produkcyjną.
        </p>
      </div>
    </div>
  );
}

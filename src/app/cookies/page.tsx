import type { Metadata } from "next";

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
          Strona w obecnym kształcie nie wykorzystuje marketingowych ani
          analitycznych plików cookies wymagających zgody. Mogą być używane
          wyłącznie niezbędne mechanizmy techniczne zapewniające działanie
          witryny.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Jeśli w przyszłości zostanie dodana analityka (np. Google Analytics)
          lub inne narzędzia śledzące, informacja ta zostanie zaktualizowana, a
          na stronie pojawi się odpowiedni mechanizm zgody.
        </p>
      </div>
    </div>
  );
}

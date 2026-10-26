/**
 * Orientacyjny cennik — uzupełnij przedziały cenowe.
 * Puste wpisy = komunikat o indywidualnej wycenie.
 *
 * kind:
 * - fixed: ustalona cena
 * - range: orientacyjny przedział
 * - diagnostic: wymaga indywidualnej diagnostyki
 */

export type PriceKind = "fixed" | "range" | "diagnostic";

export type PriceEntry = {
  id: string;
  categoryIds: string[];
  label: string;
  kind: PriceKind;
  /** Cena w PLN — tylko gdy kind === "fixed" */
  amount?: number;
  /** Przedział — tylko gdy kind === "range" */
  min?: number;
  max?: number;
  note?: string;
};

/**
 * Uzupełnij wpisy, gdy właściciel poda ceny.
 * Przykład:
 * {
 *   id: "coffee-descale",
 *   categoryIds: ["ekspres-do-kawy"],
 *   label: "Przegląd / odkamienianie (orientacyjnie)",
 *   kind: "range",
 *   min: 80,
 *   max: 150,
 *   note: "Ostateczna cena po diagnostyce",
 * }
 */
export const priceCatalog: PriceEntry[] = [];

export const quoteCategories = [
  { id: "ekspres-do-kawy", label: "Ekspres do kawy" },
  { id: "inne-agd", label: "Inne AGD" },
  { id: "elektronika-samochodowa", label: "Elektronika samochodowa" },
  { id: "kluczyk-samochodowy", label: "Kluczyk samochodowy" },
  { id: "telewizor", label: "Telewizor" },
  { id: "sprzet-audio", label: "Sprzęt audio" },
  { id: "rower", label: "Rower" },
  { id: "rower-elektryczny", label: "Rower elektryczny" },
  { id: "hulajnoga-elektryczna", label: "Hulajnoga elektryczna" },
  { id: "elektronarzedzie", label: "Elektronarzędzie" },
  { id: "sterownik", label: "Sterownik" },
  { id: "laptop", label: "Laptop" },
  { id: "inne", label: "Inne urządzenie" },
] as const;

export type QuoteCategoryId = (typeof quoteCategories)[number]["id"];

export function getPricesForCategory(categoryId: string): PriceEntry[] {
  return priceCatalog.filter((p) => p.categoryIds.includes(categoryId));
}

export function formatPrice(entry: PriceEntry): string {
  if (entry.kind === "fixed" && typeof entry.amount === "number") {
    return `${entry.amount} zł`;
  }
  if (
    entry.kind === "range" &&
    typeof entry.min === "number" &&
    typeof entry.max === "number"
  ) {
    return `${entry.min}–${entry.max} zł`;
  }
  return "Wycena indywidualna";
}

export const pricingFallbackMessage =
  "Koszt naprawy zależy od rodzaju usterki, modelu urządzenia i dostępności części. Prześlij zgłoszenie, a skontaktujemy się z Tobą w sprawie wstępnej wyceny.";

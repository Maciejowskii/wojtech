export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date?: string;
  source?: "google" | "other";
  sourceUrl?: string;
};

/**
 * Dodawaj wyłącznie prawdziwe opinie.
 * Pusta lista = sekcja pokazuje stan oczekiwania na opinie.
 */
export const reviews: Review[] = [];

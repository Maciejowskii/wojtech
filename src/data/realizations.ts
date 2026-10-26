export type RealizationCategory =
  | "ekspresy"
  | "auto"
  | "rtv"
  | "rowery"
  | "elektronarzedzia";

export type Realization = {
  id: string;
  title: string;
  category: RealizationCategory;
  problem: string;
  work: string;
  imageBefore?: string;
  imageAfter?: string;
  /** true = przykład demonstracyjny, nie rzeczywista naprawa */
  demo?: boolean;
};

export const realizationFilters: {
  id: RealizationCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Wszystkie" },
  { id: "ekspresy", label: "Ekspresy do kawy" },
  { id: "auto", label: "Elektronika samochodowa" },
  { id: "rtv", label: "RTV i elektronika" },
  { id: "rowery", label: "Rowery i hulajnogi" },
  { id: "elektronarzedzia", label: "Elektronarzędzia i sterowniki" },
];

/**
 * Dodawaj realizacje tutaj po dostarczeniu zdjęć i opisów.
 * Nie dodawaj fikcyjnych napraw.
 */
export const realizations: Realization[] = [];

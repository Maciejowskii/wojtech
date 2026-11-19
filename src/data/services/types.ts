export type ServiceSlug =
  | "serwis-ekspresow-do-kawy"
  | "sprzet-agd"
  | "dorabianie-kluczykow-samochodowych"
  | "elektronika-samochodowa"
  | "naprawa-rtv"
  | "serwis-rowerow-i-hulajnog"
  | "naprawa-elektronarzedzi"
  | "laptopy";

export type Service = {
  id: ServiceSlug;
  title: string;
  shortTitle: string;
  href: string;
  summary: string;
  description: string;
  /** Rozbudowany opis na landingu i podstronie */
  body?: string[];
  /** Typowe usterki / sytuacje, z którymi przychodzą klienci */
  commonIssues?: string[];
  scope: string[];
  featured?: boolean;
  /** Baner usługi (karuzela na stronie głównej, karty, nagłówek podstrony) */
  banner?: { src: string; alt: string; position?: string };
  /** Kolejność działań; domyślnie standardowa (patrz process.ts) */
  process?: string[];
  seoTitle: string;
  seoDescription: string;
};

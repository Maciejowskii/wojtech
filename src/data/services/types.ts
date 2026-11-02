export type ServiceSlug =
  | "serwis-ekspresow-do-kawy"
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
  body: string[];
  /** Typowe usterki / sytuacje, z którymi przychodzą klienci */
  commonIssues: string[];
  scope: string[];
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
};

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
 * Opinie z wizytówki Google Maps firmy.
 * Link do profilu: siteConfig.googleBusinessUrl
 * Źródło: Google Maps - WOJ-TECH Elektroserwis (4 opinie, 5.0)
 */
export const reviews: Review[] = [
  {
    id: "google-zofia",
    author: "Zofia Calińska",
    rating: 5,
    text: "Bardzo polecam ten serwis! Szybka diagnoza, miła obsługa i rozsądna cena naprawy. Sprzęt wrócił czysty i gotowy do pracy.",
    date: "2 miesiące temu",
    source: "google",
  },
  {
    id: "google-katarzyna",
    author: "Katarzyna Kubiak-Moś",
    rating: 5,
    text: "Bardzo dobry kontakt, szybka naprawa i rozsądna cena. Zdecydowanie polecam.",
    date: "4 miesiące temu",
    source: "google",
  },
  {
    id: "google-sanka",
    author: "Sanka Ka",
    rating: 5,
    text: "Błyskawiczna naprawa ekspresu, obsługa na najwyzszym poziomie. Polecam serdecznie!",
    date: "4 miesiące temu",
    source: "google",
  },
  {
    id: "google-ewa",
    author: "E Wa",
    rating: 5,
    text: "Szybka diagnoza, profesjonalna naprawa. Polecam",
    date: "5 miesięcy temu",
    source: "google",
  },
];

export const googleRatingSummary = {
  rating: 5,
  count: 4,
} as const;

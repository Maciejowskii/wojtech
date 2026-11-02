import type { Service } from "@/data/services/types";

export const service: Service = {
    id: "naprawa-elektronarzedzi",
    title: "Elektronarzędzia i sterowniki",
    shortTitle: "Elektronarzędzia i sterowniki",
    href: "/naprawa-elektronarzedzi",
    summary:
      "Wiertarki, szlifierki, sterowniki i układy elektroniczne. Najpierw diagnostyka, potem decyzja o naprawie.",
    description:
      "Przyjmuję elektronarzędzia i wybrane sterowniki. Po sprawdzeniu mówię, czy naprawa jest możliwa i czy się opłaca.",
    body: [
      "Elektronarzędzie zwykle pada w najmniej wygodnym momencie. Często winne są szczotki, elektronika regulacji obrotów, przełącznik, akumulator albo sterownik.",
      "Sprawdzam sprzęt i mówię jasno, co da się zrobić. Część narzędzi warto naprawić, część kończy żywot i wtedy nie namawiam do zbędnych kosztów.",
      "Przy zgłoszeniu podaj model i objawy. Łatwiej wtedy ocenić, czy w ogóle warto przywozić urządzenie.",
    ],
    commonIssues: [
      "Narzędzie nie startuje albo działa tylko chwilami",
      "Regulacja obrotów nie działa",
      "Iskrzy, grzeje się, wyłącza pod obciążeniem",
      "Sterownik nie komunikuje się z urządzeniem",
      "Uszkodzenia po przepięciu albo wilgoci",
    ],
    scope: [
      "Diagnostyka elektronarzędzi",
      "Naprawa w zakresie możliwości warsztatu",
      "Diagnostyka sterowników",
      "Naprawa wybranych układów elektronicznych",
    ],
    seoTitle: "Naprawa elektronarzędzi Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Diagnostyka i naprawa elektronarzędzi oraz sterowników w Ostrzeszowie. WOJ-TECH Elektroserwis.",
  };

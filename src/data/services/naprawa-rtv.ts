import type { Service } from "@/data/services/types";

export const service: Service = {
    id: "naprawa-rtv",
    title: "Naprawa sprzętu RTV i elektroniki",
    shortTitle: "RTV i elektronika",
    href: "/naprawa-rtv",
    summary:
      "Telewizory, wzmacniacze, głośniki i inna elektronika użytkowa. Najpierw diagnostyka, potem decyzja o naprawie.",
    description:
      "Sprawdzam telewizory i sprzęt audio. Po diagnostyce mówię wprost, czy naprawa się opłaca.",
    body: [
      "Telewizor albo wzmacniacz często da się uratować, gdy padnie zasilacz, podświetlenie albo typowy układ, który da się wymienić. Zanim kupisz nowy sprzęt, warto sprawdzić, co dokładnie nie działa.",
      "Przyjmuję telewizory, wzmacniacze, głośniki, radia i podobną elektronikę. Po sprawdzeniu dostajesz konkretną informację: da się naprawić, warto naprawiać, albo lepiej odpuścić.",
      "Nie ciągnę napraw, które nie mają sensu finansowego. Wolę powiedzieć to od razu.",
    ],
    commonIssues: [
      "Telewizor nie włącza się albo miga i gaśnie",
      "Jest obraz, nie ma dźwięku (albo odwrotnie)",
      "Wzmacniacz się wyłącza, brumi albo nie gra na kanałach",
      "Głośniki trzeszczą, jeden kanał milczy",
      "Elektronika restartuje się bez powodu",
    ],
    scope: [
      "Telewizory",
      "Wzmacniacze",
      "Głośniki",
      "Radia",
      "Inny sprzęt elektroniczny",
      "Ocena opłacalności naprawy po diagnostyce",
    ],
    seoTitle: "Naprawa sprzętu RTV Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Naprawa telewizorów, wzmacniaczy i elektroniki użytkowej w Ostrzeszowie. Diagnostyka i wycena. WOJ-TECH.",
  };

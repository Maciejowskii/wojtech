import type { Service } from "@/data/services/types";

export const service: Service = {
  id: "serwis-ekspresow-do-kawy",
  title: "Ekspresy kawowe",
  shortTitle: "Ekspresy do kawy",
  href: "/serwis-ekspresow-do-kawy",
  summary: "Wycieki, blok zaparzający, młynki, spienianie mleka i moduły sterujące.",
  description: "Wycieki, blok zaparzający, młynki, spienianie mleka i moduły sterujące.",
  scope: [
    "Usuwanie wycieków",
    "Serwis bloku zaparzającego",
    "Naprawa lub wymiana młynków",
    "Serwis i naprawa układu spieniania mleka",
    "Naprawa modułów sterujących",
    "Reset błędów systemu",
    "Konserwacja i kompleksowe czyszczenie przy każdej naprawie",
    "Naprawa i serwis ekspresów przemysłowych z możliwością demontażu i ponownego podłączenia",
    "Naprawa i serwis ekspresów pod zabudowę",
  ],
  banner: {
    src: "/banery/ekspresy.jpg",
    alt: "Ekspres do kawy z dwoma szklankami espresso na ciemnym blacie",
    position: "70% 50%",
  },
  featured: true,
  seoTitle: "Naprawa ekspresów do kawy Ostrzeszów | WOJ-TECH Elektroserwis",
  seoDescription: "Naprawa ekspresów do kawy i AGD w Ostrzeszowie. Diagnostyka, wycena po sprawdzeniu sprzętu. WOJ-TECH, Olszyna 84C.",
};

/**
 * Lokalne zdjęcia stock (Unsplash / Wikimedia Commons).
 * Używane w blogu i w sekcji realizacji, gdy brak własnych zdjęć z warsztatu.
 */
export const media = {
  espressoClose: {
    src: "/media/espresso-close.jpg",
    alt: "Portafiltr ekspresu ciśnieniowego",
  },
  espressoMachine: {
    src: "/media/espresso-machine.jpg",
    alt: "Portafiltr z kawą mieloną na ekspresie",
  },
  coffeeCups: {
    src: "/media/coffee-cups.jpg",
    alt: "Ekspres do kawy w warsztacie / kawiarni",
  },
  circuit: {
    src: "/media/circuit.jpg",
    alt: "Lutowanie płytki elektronicznej",
  },
  techBoard: {
    src: "/media/tech-board.jpg",
    alt: "Praca przy płytce drukowanej",
  },
  breadboard: {
    src: "/media/breadboard.jpg",
    alt: "Stanowisko z elektroniką i narzędziami",
  },
  bicycle: {
    src: "/media/bicycle.jpg",
    alt: "Rower przygotowany do serwisu",
  },
  eScooter: {
    src: "/media/e-scooter.jpg",
    alt: "Hulajnoga elektryczna",
  },
} as const;

export const serviceImages = {
  "serwis-ekspresow-do-kawy": media.coffeeCups,
  "elektronika-samochodowa": media.techBoard,
  "naprawa-rtv": media.circuit,
  "serwis-rowerow-i-hulajnog": media.eScooter,
  "naprawa-elektronarzedzi": media.breadboard,
} as const;

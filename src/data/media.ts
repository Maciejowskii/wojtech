/**
 * Lokalne zdjęcia stock (Unsplash / Pexels / Wikimedia).
 * Mapowanie usług = tematycznie do zakresu naprawy.
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
    alt: "Ekspres do kawy na stanowisku baristy",
  },
  carInfotainment: {
    src: "/media/car-infotainment.jpg",
    alt: "Ekran CarPlay w samochodzie — elektronika samochodowa",
  },
  carKeys: {
    src: "/media/car-keys.jpg",
    alt: "Kluczyk samochodowy na konsoli auta",
  },
  television: {
    src: "/media/television.jpg",
    alt: "Telewizor na ścianie — sprzęt RTV",
  },
  electronicsRepair: {
    src: "/media/soldering-iron.jpg",
    alt: "Naprawa elektroniki — praca przy płytce",
  },
  eScooter: {
    src: "/media/e-scooter.jpg",
    alt: "Hulajnoga elektryczna",
  },
  bicycle: {
    src: "/media/bicycle.jpg",
    alt: "Rower przygotowany do serwisu",
  },
  powerDrill: {
    src: "/media/power-drill.jpg",
    alt: "Wiertarka akumulatorowa — elektronarzędzie",
  },
  cordlessTools: {
    src: "/media/cordless-tools.jpg",
    alt: "Elektronarzędzie akumulatorowe",
  },
  circuit: {
    src: "/media/circuit.jpg",
    alt: "Płytka elektroniczna",
  },
  techBoard: {
    src: "/media/tech-board.jpg",
    alt: "Zbliżenie na elektronikę",
  },
} as const;

/** Grafiki usług — 1:1 z tematyką oferty. */
export const serviceImages = {
  "serwis-ekspresow-do-kawy": media.coffeeCups,
  "elektronika-samochodowa": media.carInfotainment,
  "naprawa-rtv": media.television,
  "serwis-rowerow-i-hulajnog": media.eScooter,
  "naprawa-elektronarzedzi": media.powerDrill,
} as const;

/** Hero: wejście do warsztatu. */
export const heroImage = {
  src: "/brand/stanowisko.jpg",
  alt: "Wejście do WOJ-TECH Elektroserwis, Olszyna 84C w Ostrzeszowie",
} as const;

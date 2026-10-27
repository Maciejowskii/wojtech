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
  scope: string[];
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  icon: "coffee" | "car" | "tv" | "bike" | "tool" | "laptop";
};

export const services: Service[] = [
  {
    id: "serwis-ekspresow-do-kawy",
    title: "Serwis i naprawa ekspresów do kawy",
    shortTitle: "Ekspresy do kawy i AGD",
    href: "/serwis-ekspresow-do-kawy",
    summary:
      "Diagnostyka i naprawa ekspresów do kawy oraz innych urządzeń AGD w Ostrzeszowie.",
    description:
      "Naprawiamy ekspresy do kawy i inne urządzenia AGD. Opisz usterkę albo zadzwoń. Po diagnostyce podamy koszt i zakres naprawy.",
    scope: [
      "Diagnostyka usterek ekspresów",
      "Serwis i naprawa ekspresów do kawy",
      "Naprawa innych urządzeń AGD, zależnie od rodzaju sprzętu i usterki",
    ],
    featured: true,
    seoTitle: "Naprawa ekspresów do kawy Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Serwis i naprawa ekspresów do kawy oraz AGD w Ostrzeszowie. Diagnostyka, wycena po sprawdzeniu sprzętu. WOJ-TECH, Olszyna 84C.",
    icon: "coffee",
  },
  {
    id: "elektronika-samochodowa",
    title: "Elektronika samochodowa",
    shortTitle: "Elektronika samochodowa",
    href: "/elektronika-samochodowa",
    summary:
      "Diagnostyka komputerowa, kluczyki, car audio, Apple CarPlay i Android Auto.",
    description:
      "Diagnostyka usterek elektroniki samochodowej, dorabianie i kodowanie kluczyków, car audio oraz montaż Apple CarPlay i Android Auto.",
    scope: [
      "Diagnostyka komputerowa usterek",
      "Dorabianie kluczyków samochodowych",
      "Kodowanie kluczyków",
      "Naprawa i obsługa pilotów samochodowych",
      "Montaż systemów car audio",
      "Montaż i integracja Apple CarPlay",
      "Montaż i integracja Android Auto",
      "Diagnostyka problemów z elektroniką samochodową",
    ],
    seoTitle: "Elektronika samochodowa Ostrzeszów | Kodowanie kluczyków",
    seoDescription:
      "Elektronika samochodowa w Ostrzeszowie: diagnostyka komputerowa, dorabianie i kodowanie kluczyków, car audio, Apple CarPlay i Android Auto. WOJ-TECH.",
    icon: "car",
  },
  {
    id: "naprawa-rtv",
    title: "Naprawa sprzętu RTV i elektroniki",
    shortTitle: "RTV i elektronika",
    href: "/naprawa-rtv",
    summary:
      "Naprawa telewizorów, wzmacniaczy, głośników i innego sprzętu elektronicznego.",
    description:
      "Sprawdzamy telewizory, audio i elektronikę użytkową. Po diagnostyce mówimy, czy naprawa się opłaca, zanim cokolwiek robimy.",
    scope: [
      "Telewizory",
      "Wzmacniacze",
      "Głośniki",
      "Radia",
      "Inny sprzęt elektroniczny",
      "Różnego rodzaju urządzenia i układy elektroniczne",
    ],
    seoTitle: "Naprawa sprzętu RTV Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Naprawa telewizorów, wzmacniaczy, głośników i elektroniki użytkowej w Ostrzeszowie. Diagnostyka i wycena. WOJ-TECH Elektroserwis.",
    icon: "tv",
  },
  {
    id: "serwis-rowerow-i-hulajnog",
    title: "Serwis rowerów i hulajnóg",
    shortTitle: "Rowery i hulajnogi",
    href: "/serwis-rowerow-i-hulajnog",
    summary:
      "Rowery tradycyjne i elektryczne, hulajnogi elektryczne, wymiana opon.",
    description:
      "Serwisujemy rowery, e-rowery i hulajnogi elektryczne. Diagnostyka, naprawy mechaniczne i elektryczne oraz wymiana opon w hulajnogach.",
    scope: [
      "Serwis rowerów tradycyjnych",
      "Serwis rowerów elektrycznych",
      "Serwis hulajnóg elektrycznych",
      "Wymiana opon w hulajnogach elektrycznych",
      "Diagnostyka usterek",
      "Naprawy mechaniczne i elektryczne w zakresie możliwości serwisu",
    ],
    seoTitle: "Serwis rowerów i hulajnóg elektrycznych Ostrzeszów | WOJ-TECH",
    seoDescription:
      "Serwis rowerów, rowerów elektrycznych i hulajnóg elektrycznych w Ostrzeszowie. Diagnostyka, naprawy, wymiana opon. WOJ-TECH Elektroserwis.",
    icon: "bike",
  },
  {
    id: "naprawa-elektronarzedzi",
    title: "Elektronarzędzia i sterowniki",
    shortTitle: "Elektronarzędzia i sterowniki",
    href: "/naprawa-elektronarzedzi",
    summary:
      "Diagnostyka i naprawa elektronarzędzi oraz wybranych sterowników.",
    description:
      "Przyjmujemy elektronarzędzia i wybrane sterowniki. Opisz urządzenie i usterkę. Sprawdzimy, czy możemy pomóc.",
    scope: [
      "Diagnostyka sterowników",
      "Naprawa różnego rodzaju układów elektronicznych",
      "Diagnostyka elektronarzędzi",
      "Naprawa elektronarzędzi w zakresie możliwości serwisu",
      "Naprawa urządzeń specjalistycznych w zakresie możliwości serwisu",
    ],
    seoTitle: "Naprawa elektronarzędzi Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Diagnostyka i naprawa elektronarzędzi oraz sterowników w Ostrzeszowie. Zapytaj o możliwość naprawy. WOJ-TECH Elektroserwis.",
    icon: "tool",
  },
  {
    id: "laptopy",
    title: "Laptopy",
    shortTitle: "Laptopy",
    href: "/oferta",
    summary:
      "Wstępna diagnostyka laptopów. Zakres naprawy ustalimy po rozmowie o usterce.",
    description:
      "Opisz problem z laptopem. Po rozmowie powiemy, czy i w jakim zakresie możemy pomóc.",
    scope: [
      "Wstępna diagnostyka po zgłoszeniu usterki",
      "Ocena możliwości naprawy w zakresie serwisu",
    ],
    seoTitle: "Serwis laptopów Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Diagnostyka i ocena problemów z laptopami w Ostrzeszowie. Zapytaj o możliwość naprawy. WOJ-TECH Elektroserwis.",
    icon: "laptop",
  },
];

export const featuredService = services.find((s) => s.featured)!;
export const offerServices = services.filter((s) => s.id !== "laptopy");
export const allOfferCards = services;

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.id === slug && s.href.startsWith("/"));
}

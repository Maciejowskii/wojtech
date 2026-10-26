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
      "Diagnostyka i naprawa ekspresów do kawy oraz innych urządzeń AGD — jeden z głównych obszarów działalności serwisu.",
    description:
      "Zajmujemy się diagnostyką i naprawą ekspresów do kawy oraz innych urządzeń AGD. Jeśli sprzęt nie działa prawidłowo, zgłoś usterkę i zapytaj o możliwość naprawy.",
    scope: [
      "Diagnostyka usterek ekspresów",
      "Serwis i naprawa ekspresów do kawy",
      "Naprawa innych urządzeń AGD, zależnie od rodzaju sprzętu i usterki",
    ],
    featured: true,
    seoTitle: "Naprawa ekspresów do kawy Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Serwis i naprawa ekspresów do kawy oraz AGD w Ostrzeszowie. Diagnostyka usterek, indywidualna wycena. WOJ-TECH Elektroserwis, Olszyna 84C.",
    icon: "coffee",
  },
  {
    id: "elektronika-samochodowa",
    title: "Elektronika samochodowa i nowoczesne wyposażenie",
    shortTitle: "Elektronika samochodowa",
    href: "/elektronika-samochodowa",
    summary:
      "Diagnostyka usterek, kluczyki samochodowe, car audio oraz integracja Apple CarPlay i Android Auto.",
    description:
      "Nowoczesna elektronika samochodowa wymaga odpowiedniej diagnostyki i precyzyjnego podejścia. Oferujemy pomoc w zakresie diagnostyki usterek, kluczyków samochodowych oraz dodatkowego wyposażenia.",
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
      "Diagnostyka i naprawa telewizorów, sprzętu audio oraz innych urządzeń elektronicznych.",
    description:
      "Nie każdy problem oznacza konieczność zakupu nowego sprzętu. Zajmujemy się diagnostyką i naprawą urządzeń elektronicznych. Zakres możliwej naprawy ustalamy po sprawdzeniu konkretnego urządzenia.",
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
      "Naprawa telewizorów, wzmacniaczy, głośników i elektroniki użytkowej w Ostrzeszowie. Diagnostyka i indywidualna wycena. WOJ-TECH Elektroserwis.",
    icon: "tv",
  },
  {
    id: "serwis-rowerow-i-hulajnog",
    title: "Serwis rowerów i hulajnóg",
    shortTitle: "Rowery i hulajnogi",
    href: "/serwis-rowerow-i-hulajnog",
    summary:
      "Serwis rowerów tradycyjnych i elektrycznych oraz hulajnóg elektrycznych, w tym wymiana opon.",
    description:
      "Od codziennego roweru po hulajnogę elektryczną. Pomagamy w serwisie, diagnostyce i usuwaniu usterek, aby Twój sprzęt mógł znów sprawnie działać.",
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
    title: "Elektronika, sterowniki i elektronarzędzia",
    shortTitle: "Elektronarzędzia i sterowniki",
    href: "/naprawa-elektronarzedzi",
    summary:
      "Diagnostyka i naprawa elektronarzędzi oraz wybranych sterowników i układów elektronicznych.",
    description:
      "Zajmujemy się również mniej typowymi problemami z elektroniką. Jeśli masz urządzenie, które przestało działać prawidłowo, skontaktuj się z nami i opisz usterkę.",
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
    href: "/#oferta",
    summary:
      "Pomoc w diagnostyce i ocenie problemów z laptopami. Zakres możliwej naprawy ustalamy po zgłoszeniu usterki.",
    description:
      "Jeśli laptop przestał działać prawidłowo, skontaktuj się z serwisem i opisz problem. Po wstępnej rozmowie ustalimy, czy i w jakim zakresie możemy pomóc.",
    scope: [
      "Wstępna diagnostyka po zgłoszeniu usterki",
      "Ocena możliwości naprawy w zakresie serwisu",
    ],
    seoTitle: "Serwis laptopów Ostrzeszów | WOJ-TECH Elektroserwis",
    seoDescription:
      "Diagnostyka i ocena problemów z laptopami w Ostrzeszowie. WOJ-TECH Elektroserwis — zapytaj o możliwość naprawy.",
    icon: "laptop",
  },
];

export const featuredService = services.find((s) => s.featured)!;
export const offerServices = services.filter((s) => s.id !== "laptopy");
export const allOfferCards = services;

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.id === slug && s.href.startsWith("/"));
}

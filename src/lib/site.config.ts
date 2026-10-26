/**
 * Centralne dane firmy — edytuj tutaj, zmiany propagują się po całej stronie.
 */
export const siteConfig = {
  name: "WOJ-TECH Elektroserwis",
  shortName: "WOJ-TECH",
  tagline: "ELEKTROSERWIS",
  owner: "Wojciech Kijewski",
  legalName: "WOJ-TECH Elektroserwis Wojciech Kijewski",
  description:
    "Serwis elektroniki, ekspresów do kawy, AGD, elektroniki samochodowej oraz rowerów i hulajnóg elektrycznych w Ostrzeszowie.",

  phone: {
    display: "606 582 606",
    href: "tel:+48606582606",
    e164: "+48606582606",
  },

  /** Uzupełnij prawdziwy e-mail serwisu */
  email: {
    display: "", // np. "kontakt@woj-tech.pl"
    href: "", // np. "mailto:kontakt@woj-tech.pl"
  },

  address: {
    street: "Olszyna 84C",
    postalCode: "63-500",
    city: "Ostrzeszów",
    region: "wielkopolskie",
    country: "PL",
    full: "Olszyna 84C, 63-500 Ostrzeszów",
    mapsQuery: "Olszyna 84C, 63-500 Ostrzeszów",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Olszyna+84C,+63-500+Ostrzesz%C3%B3w",
    mapsEmbed:
      "https://maps.google.com/maps?q=Olszyna+84C,+63-500+Ostrzesz%C3%B3w&z=15&output=embed",
  },

  /**
   * Godziny otwarcia — uzupełnij, gdy właściciel je poda.
   * Puste = sekcja pokazuje placeholder.
   */
  openingHours: [] as { days: string; hours: string }[],
  // Przykład po uzupełnieniu:
  // openingHours: [
  //   { days: "Poniedziałek – Piątek", hours: "8:00 – 17:00" },
  //   { days: "Sobota", hours: "po wcześniejszym kontakcie" },
  // ],

  /** Link do profilu Google (opinie) — uzupełnij gdy dostępny */
  googleBusinessUrl: "",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://woj-tech.pl",

  nav: [
    { label: "Strona główna", href: "/#start" },
    { label: "Oferta", href: "/#oferta" },
    { label: "Jak pracujemy", href: "/#jak-pracujemy" },
    { label: "Realizacje", href: "/#realizacje" },
    { label: "Opinie", href: "/#opinie" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

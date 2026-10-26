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
    display: "wkijewski71@wp.pl",
    href: "mailto:wkijewski71@wp.pl",
  },

  address: {
    street: "Olszyna 84C",
    postalCode: "63-500",
    city: "Ostrzeszów",
    region: "wielkopolskie",
    country: "PL",
    full: "Olszyna 84C, 63-500 Ostrzeszów",
    mapsQuery: "Olszyna 84C, 63-500 Ostrzeszów",
    mapsUrl: "https://maps.app.goo.gl/q6WaaCuwKPzqR8Mo9",
    mapsEmbed:
      "https://maps.google.com/maps?q=51.4162526,17.9071801&z=16&output=embed",
  },

  /**
   * Godziny otwarcia — uzupełnij, gdy właściciel je poda.
   * Puste = sekcja pokazuje placeholder.
   */
  openingHours: [
    { days: "Poniedziałek – Piątek", hours: "9:00 – 17:00" },
    { days: "Sobota – Niedziela", hours: "zamknięte" },
  ],

  /** Profil firmy w Google Maps / opinie */
  googleBusinessUrl: "https://maps.app.goo.gl/q6WaaCuwKPzqR8Mo9",

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

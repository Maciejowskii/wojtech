/**
 * Centralne dane firmy - edytuj tutaj, zmiany propagują się po całej stronie.
 */
export const siteConfig = {
  name: "WOJ-TECH Elektroserwis",
  shortName: "WOJ-TECH",
  tagline: "ELEKTROSERWIS",
  owner: "Wojciech Kijewski",
  legalName: "WOJ-TECH Elektroserwis Wojciech Kijewski",
  description:
    "Elektroserwis w Ostrzeszowie: ekspresy do kawy, AGD, RTV, elektronika samochodowa, rowery i hulajnogi. WOJ-TECH, Olszyna 84C.",

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
    mapsUrl:
      process.env.NEXT_PUBLIC_MAPS_URL ??
      `https://${"maps.app.goo.gl"}/q6WaaCuwKPzqR8Mo9`,
    mapsEmbed:
      process.env.NEXT_PUBLIC_MAPS_EMBED_URL ??
      `https://${"maps.google.com"}/maps?q=51.4162526,17.9071801&z=16&output=embed`,
  },

  /**
   * Godziny otwarcia - uzupełnij, gdy właściciel je poda.
   * Puste = sekcja pokazuje placeholder.
   */
  openingHours: [
    { days: "Poniedziałek - Piątek", hours: "9:00-17:00" },
    { days: "Sobota - Niedziela", hours: "zamknięte" },
  ],

  /** Profil firmy w Google Maps / opinie */
  googleBusinessUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ??
    process.env.NEXT_PUBLIC_MAPS_URL ??
    `https://${"maps.app.goo.gl"}/q6WaaCuwKPzqR8Mo9`,

  url: process.env.NEXT_PUBLIC_SITE_URL ?? `https://${"woj-tech.pl"}`,

  /** Skrócone menu w nagłówku */
  nav: [
    { label: "Oferta", href: "/oferta" },
    { label: "Realizacje", href: "/realizacje" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],

  /** Pełniejsza nawigacja w stopce (sekcje LP + blog) */
  footerNav: [
    { label: "Strona główna", href: "/" },
    { label: "Oferta", href: "/oferta" },
    { label: "Jak pracujemy", href: "/jak-pracujemy" },
    { label: "Realizacje", href: "/realizacje" },
    { label: "Opinie", href: "/opinie" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],

  legalNav: [
    { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
    { label: "Pliki cookies", href: "/cookies" },
    { label: "Mapa strony", href: "/mapa-strony" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

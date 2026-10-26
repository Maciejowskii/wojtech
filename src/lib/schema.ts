import { siteConfig } from "@/lib/site.config";
import { services } from "@/data/services";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: undefined,
    areaServed: {
      "@type": "City",
      name: "Ostrzeszów",
    },
    priceRange: "$$",
    image: `${siteConfig.url}/og.jpg`,
    sameAs: siteConfig.googleBusinessUrl
      ? [siteConfig.googleBusinessUrl]
      : undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi serwisowe",
      itemListElement: services
        .filter((s) => s.href.startsWith("/") && !s.href.includes("#"))
        .map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
            url: `${siteConfig.url}${s.href}`,
            areaServed: "Ostrzeszów",
            provider: { "@id": `${siteConfig.url}/#business` },
          },
        })),
    },
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

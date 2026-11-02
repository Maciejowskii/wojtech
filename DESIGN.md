# DESIGN.md — WOJ-TECH Elektroserwis

## World
Warsztat elektroniki w Ostrzeszowie. Widok: stanowisko serwisowe, narzędzia, konkret. Zero „SaaS card kit”, zero ikonek usług z Lucide.

## Palette
- Steel `#B2C3D7`
- White `#FEFEFE`
- Graphite `#17191D`
- Navy `#20354B`
- Accent `#267A9B`
- Mist `#F3F6F9`
- Border `#D5DEE8`

## Type
- Display / brand: Barlow Condensed (WOJ-TECH, nagłówki sekcji)
- Body: Source Sans 3
- Bez ALL-CAPS eyebrow z kreską. Etykiety sekcji w sentence case, kolorem accent.

## Surfaces
- Promienie 6–10px tylko na kontrolkach
- Usługi: editorial stack (divide-y), nie siatka kart z ikonami
- Kontener 1200px, gutter 24px
- CTA min. 48px

## Composition
- Hero: jak na start - mist, tekst + fakty w container, zdjęcie ekspresu z prawej (bez wejścia warsztatu)
- Zdjęcia stock w `/public/media` (blog, placeholdery realizacji); własne zdjęcia z warsztatu mają priorytet w galerii
- Między hero a ofertą: nieskończona karuzela usług (CSS marquee, pauza na hover, static przy reduced-motion)
- Oferta: długie opisy usług, typowe usterki, zakres
- Proces: numerowana sekwencja (tu numery mają sens)
- Blog: mist hero jak Opinie/Kontakt (bez navy bloku), lista divide-y z excerptem, CTA na dole; post z related
- Kontakt: jak Opinie/Usługi — duży telefon, divide-y fakty, formularz bez karty

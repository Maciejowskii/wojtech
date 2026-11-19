# WOJ-TECH Elektroserwis

Strona internetowa serwisu elektroniki w Ostrzeszowie — Next.js, TypeScript, Tailwind CSS.

## Uruchomienie

```bash
npm install
cp .env.example .env.local
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Konfiguracja danych firmy

Edytuj `src/lib/site.config.ts`:

- e-mail
- godziny otwarcia
- link do profilu Google
- `NEXT_PUBLIC_SITE_URL` w `.env.local`

## Formularze (wycena / kontakt)

Endpointy:

- `POST /api/quote`
- `POST /api/contact`

Aby działała wysyłka e-mail, ustaw w `.env.local`:

- `RESEND_API_KEY`
- `MAIL_FROM`
- `MAIL_TO`

Bez tych zmiennych API zwraca komunikat o braku konfiguracji i kieruje do telefonu `606 582 606`.

Opcjonalnie `MAIL_ALLOW_FILE_FALLBACK=true` zapisuje zgłoszenia do `data/submissions/` (gitignore).

## Cennik orientacyjny

Uzupełnij wpisy w `src/data/pricing.ts`. Pusta lista = komunikat o indywidualnej wycenie.

## Panel admina (blog + realizacje)

- Adres: `/admin` (logowanie: `/admin/login`)
- Domyślne dane (zmień w produkcji): `ADMIN_USERNAME=admin`, `ADMIN_PASSWORD=wojtech-admin`
- Ustaw też `ADMIN_SESSION_SECRET` w `.env.local`
- Lokalnie: SQLite `data/wojtech.db` + uploady w `public/uploads/` (gitignore)
- Produkcja: Turso (baza) + Vercel Blob (zdjęcia) — patrz niżej

Funkcje: tworzenie / edycja / usuwanie wpisów (szkic, zaplanowany, opublikowany) oraz realizacji ze zdjęciami. Na landingu widać kilka najnowszych realizacji i wpisów; pełne listy: `/realizacje`, `/blog`.

### Vercel (Turso + Vercel Blob)

Lokalne SQLite i `public/uploads/` **nie działają** na Vercel (brak trwałego dysku). Na produkcji ustaw:

**1. Turso (baza libSQL)**
- Utwórz bazę w [Turso](https://turso.tech)
- Skopiuj URL i token do Vercel env: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
- Schemat (blog, realizacje, kategorie) tworzy się automatycznie przy pierwszym dostępie

**2. Vercel Blob (zdjęcia)**
- Vercel → Storage → Create Blob Store
- Nazwa: np. `wojtech-uploads`
- Access: **Public**
- Podłącz do projektu `wojtech` (Production + Preview) — Vercel doda `BLOB_READ_WRITE_TOKEN`

**3. Pozostałe zmienne Vercel**
- `NEXT_PUBLIC_SITE_URL=https://twoja-domena.vercel.app`
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
- opcjonalnie: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_AHREFS_SITE_VERIFICATION`

Po deployu: `/admin/login` → dodaj testowy wpis i realizację ze zdjęciem → sprawdź, że URL obrazka wskazuje na `*.blob.vercel-storage.com` i treść zostaje po redeployu.

## Cookies / GA4 / GSC / Ahrefs

- Baner: akceptacja wszystkich albo tylko niezbędnych (`CookieBanner`)
- GA4 ładuje się **tylko po zgodzie** (`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...`)
- GSC / Ahrefs: meta weryfikacji z env (bez cookies u odwiedzającego)
- Zmiana decyzji: `/cookies` → „Zmień ustawienia cookies”

## Opinie Google

- `src/data/reviews.ts` — ręczne wpisy z Google (bez fikcyjnych treści)

## Podstrony usług

- `/serwis-ekspresow-do-kawy`
- `/elektronika-samochodowa`
- `/naprawa-rtv`
- `/serwis-rowerow-i-hulajnog`
- `/naprawa-elektronarzedzi`

## Build

```bash
npm run build
npm start
```

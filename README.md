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
- SQLite: `data/wojtech.db` (gitignore)
- Uploady: `public/uploads/` (gitignore)

Funkcje: tworzenie / edycja / usuwanie wpisów (szkic, zaplanowany, opublikowany) oraz realizacji ze zdjęciami. Na landingu widać kilka najnowszych realizacji i wpisów; pełne listy: `/realizacje`, `/blog`.

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

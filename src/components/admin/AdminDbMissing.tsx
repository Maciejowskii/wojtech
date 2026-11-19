export function AdminDbMissing() {
  return (
    <div className="card-surface max-w-2xl p-6 sm:p-8">
      <h1 className="font-display text-2xl font-semibold text-navy">
        Brak bazy danych
      </h1>
      <p className="mt-3 text-muted">
        Na Vercel lokalne SQLite nie działa. Podłącz Turso i ustaw zmienne
        środowiskowe w projekcie (Production + Preview), potem zrób Redeploy.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy">
        <li>
          <code className="rounded bg-mist px-1.5 py-0.5">TURSO_DATABASE_URL</code>
        </li>
        <li>
          <code className="rounded bg-mist px-1.5 py-0.5">TURSO_AUTH_TOKEN</code>
        </li>
      </ul>
      <p className="mt-4 text-sm text-muted">
        Integracja Turso w Vercel musi tworzyć dokładnie te nazwy (prefix np.{" "}
        <code className="rounded bg-mist px-1.5 py-0.5">TURSO_DATABASE</code>
        → <code className="rounded bg-mist px-1.5 py-0.5">TURSO_DATABASE_URL</code>
        ). Po zmianie env zawsze zrób nowy deploy.
      </p>
    </div>
  );
}

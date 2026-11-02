"use client";

import { useIsClient } from "@/hooks/useIsClient";

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  website: string;
};

type Props = {
  form: FormState;
  errors: Record<string, string>;
  status: "idle" | "loading" | "success" | "error";
  message: string;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function ContactFormFields({
  form,
  errors,
  status,
  message,
  update,
  onSubmit,
}: Props) {
  const mounted = useIsClient();

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      {mounted ? (
        <div
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <label>
            Strona
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>
      ) : null}

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Imię *
        </span>
        <input
          className="field"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          autoComplete="name"
        />
        {errors.name ? (
          <span className="mt-1 block text-sm text-red-700">{errors.name}</span>
        ) : null}
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            Telefon
          </span>
          <input
            className="field"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
          {errors.phone ? (
            <span className="mt-1 block text-sm text-red-700">
              {errors.phone}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            E-mail
          </span>
          <input
            className="field"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Temat *
        </span>
        <input
          className="field"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="np. ekspres nie grzeje wody"
        />
        {errors.subject ? (
          <span className="mt-1 block text-sm text-red-700">
            {errors.subject}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Opis usterki *
        </span>
        <textarea
          className="field min-h-36"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Jaki sprzęt, jakie objawy, od kiedy."
        />
        {errors.message ? (
          <span className="mt-1 block text-sm text-red-700">
            {errors.message}
          </span>
        ) : null}
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-graphite">
        <input
          type="checkbox"
          className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        <span>
          Wyrażam zgodę na przetwarzanie danych w celu odpowiedzi na
          wiadomość.
        </span>
      </label>
      {errors.consent ? (
        <p className="text-sm text-red-700">{errors.consent}</p>
      ) : null}

      {status === "error" ? (
        <div
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}

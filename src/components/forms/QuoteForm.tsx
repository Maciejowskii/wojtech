"use client";

import { useMemo, useState } from "react";
import {
  getPricesForCategory,
  pricingFallbackMessage,
  quoteCategories,
  formatPrice,
} from "@/data/pricing";
import { siteConfig } from "@/lib/site.config";

const STEPS = [
  "Kategoria",
  "Urządzenie",
  "Problem",
  "Dodatki",
  "Kontakt",
  "Dostawa",
  "Podsumowanie",
] as const;

type FormState = {
  category: string;
  brand: string;
  model: string;
  age: string;
  issueType: string;
  description: string;
  budget: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  contactPreference: "phone" | "email" | "either" | "";
  delivery: "in_person" | "shipping" | "";
  consent: boolean;
  website: string;
};

const initial: FormState = {
  category: "",
  brand: "",
  model: "",
  age: "",
  issueType: "",
  description: "",
  budget: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  contactPreference: "",
  delivery: "",
  consent: false,
  website: "",
};

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const prices = useMemo(
    () => (form.category ? getPricesForCategory(form.category) : []),
    [form.category],
  );

  const categoryLabel =
    quoteCategories.find((c) => c.id === form.category)?.label ?? "";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateStep(current: number): boolean {
    const nextErrors: Record<string, string> = {};

    if (current === 0 && !form.category) {
      nextErrors.category = "Wybierz kategorię urządzenia";
    }
    if (current === 1) {
      if (!form.brand.trim()) nextErrors.brand = "Podaj producenta";
      if (!form.issueType.trim()) nextErrors.issueType = "Podaj rodzaj usterki";
    }
    if (current === 2 && form.description.trim().length < 10) {
      nextErrors.description = "Opisz problem dokładniej (min. 10 znaków)";
    }
    if (current === 4) {
      if (form.name.trim().length < 2) nextErrors.name = "Podaj imię";
      if (form.phone.trim().length < 7) nextErrors.phone = "Podaj numer telefonu";
      if (!form.contactPreference) {
        nextErrors.contactPreference = "Wybierz preferowany kontakt";
      }
      if (
        form.contactPreference === "email" &&
        !form.email.trim().includes("@")
      ) {
        nextErrors.email = "Podaj adres e-mail";
      }
    }
    if (current === 5 && !form.delivery) {
      nextErrors.delivery = "Wybierz sposób dostarczenia";
    }
    if (current === 6 && !form.consent) {
      nextErrors.consent = "Wymagana zgoda na przetwarzanie danych";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!validateStep(6)) return;
    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          contactPreference: form.contactPreference || "phone",
          delivery: form.delivery || "in_person",
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        phoneFallback?: boolean;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMessage(
          data.message ??
            `Nie udało się wysłać. Zadzwoń: ${siteConfig.phone.display}`,
        );
        return;
      }

      setStatus("success");
      setServerMessage(data.message ?? "Zgłoszenie wysłane.");
    } catch {
      setStatus("error");
      setServerMessage(
        `Błąd połączenia. Zadzwoń: ${siteConfig.phone.display}`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card-surface p-8 text-center" role="status">
        <h3 className="text-2xl font-bold text-navy">Dziękujemy za zgłoszenie</h3>
        <p className="mt-3 text-muted">{serverMessage}</p>
        <a href={siteConfig.phone.href} className="btn btn-primary mt-6">
          Zadzwoń: {siteConfig.phone.display}
        </a>
      </div>
    );
  }

  return (
    <div className="card-surface overflow-hidden">
      <div className="border-b border-border bg-mist/70 px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-navy">
            Krok {step + 1} z {STEPS.length}: {STEPS[step]}
          </p>
          <p className="text-xs text-muted">{Math.round(((step + 1) / STEPS.length) * 100)}%</p>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-white"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Postęp formularza"
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5 md:p-8">
        {/* honeypot — ukryty przed użytkownikami */}
        <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
          <label>
            Strona WWW
            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>

        {step === 0 && (
          <fieldset>
            <legend className="text-lg font-bold text-navy">
              Jakie urządzenie chcesz zgłosić?
            </legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {quoteCategories.map((cat) => {
                const selected = form.category === cat.id;
                return (
                  <label
                    key={cat.id}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                      selected
                        ? "border-accent bg-accent/10 text-navy"
                        : "border-border bg-white text-navy hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="category"
                      value={cat.id}
                      checked={selected}
                      onChange={() => update("category", cat.id)}
                    />
                    {cat.label}
                  </label>
                );
              })}
            </div>
            {errors.category ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {errors.category}
              </p>
            ) : null}
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-4">
            <Field
              label="Producent"
              error={errors.brand}
              required
            >
              <input
                className="field"
                value={form.brand}
                onChange={(e) => update("brand", e.target.value)}
                placeholder="np. marka urządzenia"
              />
            </Field>
            <Field label="Model (jeśli znany)">
              <input
                className="field"
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
              />
            </Field>
            <Field label="Wiek urządzenia (opcjonalnie)">
              <input
                className="field"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="np. ok. 3 lata"
              />
            </Field>
            <Field label="Rodzaj usterki" error={errors.issueType} required>
              <input
                className="field"
                value={form.issueType}
                onChange={(e) => update("issueType", e.target.value)}
                placeholder="np. nie grzeje wody / nie odpala"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <Field label="Opis problemu" error={errors.description} required>
            <textarea
              className="field min-h-36"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Opisz, co się dzieje, kiedy problem występuje i czy urządzenie uruchamia się prawidłowo"
            />
          </Field>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <Field label="Orientacyjny budżet (opcjonalnie)">
              <input
                className="field"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="np. do 300 zł"
              />
            </Field>
            <Field label="Dodatkowe uwagi">
              <textarea
                className="field min-h-28"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </Field>
            <p className="rounded-xl bg-mist px-4 py-3 text-sm text-muted">
              Przesyłanie zdjęć będzie dostępne po konfiguracji przechowywania
              plików. Na razie możesz opisać uszkodzenie lub wysłać zdjęcie
              SMS-em / e-mailem po kontakcie.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4">
            <Field label="Imię" error={errors.name} required>
              <input
                className="field"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="given-name"
              />
            </Field>
            <Field label="Numer telefonu" error={errors.phone} required>
              <input
                className="field"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                autoComplete="tel"
                inputMode="tel"
              />
            </Field>
            <Field label="E-mail (opcjonalnie)" error={errors.email}>
              <input
                className="field"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
              />
            </Field>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-navy">
                Preferowany sposób kontaktu
              </legend>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["phone", "Telefon"],
                    ["email", "E-mail"],
                    ["either", "Obojętnie"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-xl border px-4 py-2 text-sm ${
                      form.contactPreference === value
                        ? "border-accent bg-accent/10"
                        : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="contactPreference"
                      checked={form.contactPreference === value}
                      onChange={() => update("contactPreference", value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
              {errors.contactPreference ? (
                <p className="mt-2 text-sm text-red-700" role="alert">
                  {errors.contactPreference}
                </p>
              ) : null}
            </fieldset>
          </div>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="text-lg font-bold text-navy">
              Jak dostarczysz sprzęt?
            </legend>
            <p className="mt-2 text-sm text-muted">
              Nie oferujemy dojazdu do klienta ani odbioru sprzętu z domu.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  [
                    "in_person",
                    "Osobiste dostarczenie do serwisu",
                    "Przywieź urządzenie do Olszyna 84C, Ostrzeszów.",
                  ],
                  [
                    "shipping",
                    "Wysyłka z innej miejscowości",
                    "Po zgłoszeniu ustalimy szczegóły przesyłki.",
                  ],
                ] as const
              ).map(([value, title, desc]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-xl border p-4 ${
                    form.delivery === value
                      ? "border-accent bg-accent/10"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="delivery"
                    checked={form.delivery === value}
                    onChange={() => update("delivery", value)}
                  />
                  <span className="block font-semibold text-navy">{title}</span>
                  <span className="mt-1 block text-sm text-muted">{desc}</span>
                </label>
              ))}
            </div>
            {errors.delivery ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {errors.delivery}
              </p>
            ) : null}
          </fieldset>
        )}

        {step === 6 && (
          <div className="space-y-5">
            <div className="rounded-xl bg-mist p-5 text-sm text-navy">
              <h3 className="font-display text-lg font-bold">Podsumowanie</h3>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                <Item label="Kategoria" value={categoryLabel} />
                <Item label="Producent" value={form.brand} />
                <Item label="Model" value={form.model || "—"} />
                <Item label="Usterka" value={form.issueType} />
                <Item label="Imię" value={form.name} />
                <Item label="Telefon" value={form.phone} />
                <Item
                  label="Dostawa"
                  value={
                    form.delivery === "shipping"
                      ? "Wysyłka"
                      : "Osobiście w serwisie"
                  }
                />
              </dl>
              <p className="mt-3 text-muted">{form.description}</p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <h4 className="font-semibold text-navy">Orientacyjna wycena</h4>
              {prices.length === 0 ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pricingFallbackMessage}
                </p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {prices.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <span>
                        {p.label}
                        {p.kind !== "fixed" ? (
                          <span className="mt-0.5 block text-xs text-muted">
                            {p.kind === "range"
                              ? "Orientacyjny przedział — nie gwarantowana cena końcowa"
                              : "Wymaga indywidualnej diagnostyki"}
                          </span>
                        ) : null}
                      </span>
                      <span className="font-semibold">{formatPrice(p)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="flex items-start gap-3 text-sm text-navy">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[var(--color-accent)]"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <span>
                Wyrażam zgodę na przetwarzanie podanych danych w celu obsługi
                zgłoszenia serwisowego.
              </span>
            </label>
            {errors.consent ? (
              <p className="text-sm text-red-700" role="alert">
                {errors.consent}
              </p>
            ) : null}

            {status === "error" ? (
              <div
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                <p>{serverMessage}</p>
                <a
                  href={siteConfig.phone.href}
                  className="mt-2 inline-flex font-semibold underline"
                >
                  Zadzwoń: {siteConfig.phone.display}
                </a>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={back}
            disabled={step === 0 || status === "loading"}
          >
            Wstecz
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn-primary" onClick={next}>
              Dalej
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={submit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Wysyłanie…" : "Wyślij zgłoszenie"}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-sm text-red-700" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

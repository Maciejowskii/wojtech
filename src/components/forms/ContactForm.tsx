"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site.config";

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  website: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Podaj imię";
    if (!form.phone.trim() && !form.email.trim()) {
      next.phone = "Podaj telefon lub e-mail";
    }
    if (form.subject.trim().length < 2) next.subject = "Podaj temat";
    if (form.message.trim().length < 10) {
      next.message = "Wiadomość jest za krótka";
    }
    if (!form.consent) next.consent = "Wymagana zgoda na przetwarzanie danych";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(
          data.message ??
            `Nie udało się wysłać. Zadzwoń: ${siteConfig.phone.display}`,
        );
        return;
      }
      setStatus("success");
      setMessage(data.message ?? "Wiadomość wysłana.");
      setForm(initial);
    } catch {
      setStatus("error");
      setMessage(`Błąd połączenia. Zadzwoń: ${siteConfig.phone.display}`);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-mist p-6 text-center" role="status">
        <p className="font-semibold text-navy">Dziękujemy za wiadomość</p>
        <p className="mt-2 text-sm text-muted">{message}</p>
        <button
          type="button"
          className="btn btn-secondary mt-4"
          onClick={() => setStatus("idle")}
        >
          Wyślij kolejną
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Strona
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2">
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
        />
        {errors.subject ? (
          <span className="mt-1 block text-sm text-red-700">
            {errors.subject}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          Treść wiadomości *
        </span>
        <textarea
          className="field min-h-32"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
        {errors.message ? (
          <span className="mt-1 block text-sm text-red-700">
            {errors.message}
          </span>
        ) : null}
      </label>

      <label className="flex items-start gap-3 text-sm text-navy">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-[var(--color-accent)]"
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
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}

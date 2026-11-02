"use client";

import { useState } from "react";
import { QuoteFormSteps } from "@/components/forms/QuoteFormSteps";
import {
  QUOTE_STEPS,
  quoteFormInitial,
  type QuoteFormState,
} from "@/components/forms/quote-form-types";
import { quoteCategories } from "@/data/pricing";
import { siteConfig } from "@/lib/site.config";

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteFormState>(quoteFormInitial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const categoryLabel =
    quoteCategories.find((c) => c.id === form.category)?.label ?? "";

  function update<K extends keyof QuoteFormState>(
    key: K,
    value: QuoteFormState[K],
  ) {
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
    setStep((s) => Math.min(s + 1, QUOTE_STEPS.length - 1));
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
      <output className="card-surface block p-8 text-center">
        <h3 className="text-2xl font-bold text-navy">Dziękujemy za zgłoszenie</h3>
        <p className="mt-3 text-muted">{serverMessage}</p>
        <a href={siteConfig.phone.href} className="btn btn-primary mt-6">
          Zadzwoń: {siteConfig.phone.display}
        </a>
      </output>
    );
  }

  return (
    <div className="card-surface overflow-hidden">
      <div className="border-b border-border bg-mist px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-navy">
            Krok {step + 1} z {QUOTE_STEPS.length}: {QUOTE_STEPS[step]}
          </p>
          <p className="text-xs text-muted">
            {Math.round(((step + 1) / QUOTE_STEPS.length) * 100)}%
          </p>
        </div>
        <progress
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white accent-[var(--color-accent)] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-accent [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-accent"
          value={step + 1}
          max={QUOTE_STEPS.length}
          aria-label="Postęp formularza"
        />
      </div>

      <QuoteFormSteps
        step={step}
        form={form}
        errors={errors}
        status={status}
        serverMessage={serverMessage}
        categoryLabel={categoryLabel}
        update={update}
        next={next}
        back={back}
        submit={submit}
        stepCount={QUOTE_STEPS.length}
      />
    </div>
  );
}

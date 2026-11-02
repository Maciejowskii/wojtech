"use client";

import { useState } from "react";
import { ContactFormFields } from "@/components/forms/ContactFormFields";
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
      <output className="block border-y border-border py-8">
        <p className="font-display text-2xl font-semibold uppercase tracking-[0.02em] text-navy">
          Wiadomość wysłana
        </p>
        <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-muted">
          {message}
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-6"
          onClick={() => setStatus("idle")}
        >
          Wyślij kolejną
        </button>
      </output>
    );
  }

  return (
    <ContactFormFields
      form={form}
      errors={errors}
      status={status}
      message={message}
      update={update}
      onSubmit={onSubmit}
    />
  );
}

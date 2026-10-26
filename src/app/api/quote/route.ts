import { NextResponse } from "next/server";
import { quoteCategories } from "@/data/pricing";
import { mailStatusMessage, sendMail } from "@/lib/mail";
import { quoteSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Nieprawidłowe dane." },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Sprawdź poprawność formularza.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true, message: "Dziękujemy." });
  }

  const categoryLabel =
    quoteCategories.find((c) => c.id === data.category)?.label ?? data.category;

  const text = [
    "Nowe zgłoszenie wyceny — WOJ-TECH",
    "",
    `Kategoria: ${categoryLabel}`,
    `Producent: ${data.brand}`,
    `Model: ${data.model || "—"}`,
    `Wiek: ${data.age || "—"}`,
    `Rodzaj usterki: ${data.issueType}`,
    "",
    "Opis:",
    data.description,
    "",
    `Budżet orientacyjny: ${data.budget || "—"}`,
    `Uwagi: ${data.notes || "—"}`,
    "",
    `Imię: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-mail: ${data.email || "—"}`,
    `Preferowany kontakt: ${data.contactPreference}`,
    `Dostarczenie: ${data.delivery === "in_person" ? "osobiście" : "wysyłka"}`,
  ].join("\n");

  const result = await sendMail({
    subject: `Wycena: ${categoryLabel} — ${data.name}`,
    text,
    replyTo: data.email || undefined,
  });

  const message = mailStatusMessage(result);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: result.reason,
        message,
        phoneFallback: true,
      },
      { status: result.reason === "not_configured" ? 503 : 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: result.mode,
    message,
  });
}

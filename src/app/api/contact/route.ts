import { NextResponse } from "next/server";
import { mailStatusMessage, sendMail } from "@/lib/mail";
import { contactSchema } from "@/lib/validation";

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

  const parsed = contactSchema.safeParse(body);
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

  const text = [
    "Nowa wiadomość kontaktowa — WOJ-TECH",
    "",
    `Imię: ${data.name}`,
    `Telefon: ${data.phone || "—"}`,
    `E-mail: ${data.email || "—"}`,
    `Temat: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  const result = await sendMail({
    subject: `Kontakt: ${data.subject} — ${data.name}`,
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

  return NextResponse.json({ ok: true, mode: result.mode, message });
}

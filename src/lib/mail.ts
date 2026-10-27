import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type MailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

export type MailResult =
  | { ok: true; mode: "email" | "file" }
  | { ok: false; reason: "not_configured" | "send_failed"; detail?: string };

function isEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.MAIL_FROM &&
      process.env.MAIL_TO,
  );
}

async function saveToFile(payload: MailPayload) {
  const dir = path.join(process.cwd(), "data", "submissions");
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `${stamp}.txt`);
  await writeFile(
    file,
    `${payload.subject}\n\n${payload.text}\n`,
    "utf8",
  );
  return file;
}

/**
 * Wysyłka przez Resend, jeśli skonfigurowano ENV.
 * W przeciwnym razie zapis lokalny do data/submissions/ (dev / staging).
 *
 * Wymagane ENV:
 * - RESEND_API_KEY
 * - MAIL_FROM (np. "WOJ-TECH <onboarding@resend.dev>")
 * - MAIL_TO (adres serwisu)
 * - MAIL_ALLOW_FILE_FALLBACK=true - zezwala na zapis pliku gdy brak e-maila
 */
export async function sendMail(payload: MailPayload): Promise<MailResult> {
  if (isEmailConfigured()) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM,
          to: [process.env.MAIL_TO],
          subject: payload.subject,
          text: payload.text,
          reply_to: payload.replyTo || undefined,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        return { ok: false, reason: "send_failed", detail };
      }
      return { ok: true, mode: "email" };
    } catch (error) {
      return {
        ok: false,
        reason: "send_failed",
        detail: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  if (process.env.MAIL_ALLOW_FILE_FALLBACK === "true") {
    await saveToFile(payload);
    return { ok: true, mode: "file" };
  }

  return { ok: false, reason: "not_configured" };
}

export function mailStatusMessage(result: MailResult) {
  if (result.ok && result.mode === "email") {
    return "Zgłoszenie zostało wysłane. Skontaktujemy się z Tobą.";
  }
  if (result.ok && result.mode === "file") {
    return "Zgłoszenie zostało zapisane lokalnie (tryb deweloperski). Skonfiguruj RESEND_API_KEY, aby włączyć e-mail.";
  }
  if (!result.ok && result.reason === "not_configured") {
    return "Formularz jest gotowy, ale wysyłka e-mail nie została jeszcze skonfigurowana. Zadzwoń: 606 582 606.";
  }
  return "Nie udało się wysłać zgłoszenia. Zadzwoń: 606 582 606.";
}

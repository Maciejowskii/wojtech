import { NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Nieprawidłowe dane" },
      { status: 400 },
    );
  }

  if (
    !body.username ||
    !body.password ||
    !verifyCredentials(body.username, body.password)
  ) {
    return NextResponse.json(
      { ok: false, message: "Nieprawidłowy login lub hasło" },
      { status: 401 },
    );
  }

  await createSession();
  return NextResponse.json({ ok: true });
}

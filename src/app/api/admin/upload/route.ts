import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false, message: "Brak autoryzacji" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") || "blog");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, message: "Brak pliku" },
      { status: 400 },
    );
  }

  if (folder !== "blog" && folder !== "realizations") {
    return NextResponse.json(
      { ok: false, message: "Nieprawidłowy folder" },
      { status: 400 },
    );
  }

  try {
    const url = await saveUpload(file, folder);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Błąd uploadu",
      },
      { status: 400 },
    );
  }
}

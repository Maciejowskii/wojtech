import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function saveUpload(
  file: File,
  folder: "blog" | "realizations",
) {
  if (!ALLOWED.has(file.type)) {
    throw new Error("Dozwolone formaty: JPG, PNG, WEBP, GIF");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Maksymalny rozmiar pliku to 8 MB");
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });

  const ext = EXT[file.type] || "bin";
  const name = `${nanoid()}.${ext}`;
  const full = path.join(dir, name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(full, buffer);

  return `/uploads/${folder}/${name}`;
}

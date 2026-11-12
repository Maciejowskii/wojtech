import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
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

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function saveToBlob(
  file: File,
  folder: "blog" | "realizations",
  buffer: Buffer,
  ext: string,
) {
  const pathname = `uploads/${folder}/${nanoid()}.${ext}`;
  const blob = await put(pathname, buffer, {
    access: "public",
    contentType: file.type,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

async function saveLocal(
  folder: "blog" | "realizations",
  buffer: Buffer,
  ext: string,
) {
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  const name = `${nanoid()}.${ext}`;
  await fs.writeFile(path.join(dir, name), buffer);
  return `/uploads/${folder}/${name}`;
}

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

  const ext = EXT[file.type] || "bin";
  const buffer = Buffer.from(await file.arrayBuffer());

  if (blobConfigured()) {
    return saveToBlob(file, folder, buffer, ext);
  }

  return saveLocal(folder, buffer, ext);
}

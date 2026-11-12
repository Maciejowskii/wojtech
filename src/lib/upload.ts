import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import sharp from "sharp";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** Max dłuższy bok — wystarczy do bloga / galerii, mocno tnie wagę. */
const MAX_EDGE = 1920;
/** Jakość WebP — dobry kompromis rozmiar vs ostrość. */
const WEBP_QUALITY = 82;

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function originalExt(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "bin";
}

async function optimizeImage(
  input: Buffer,
  mime: string,
): Promise<{
  buffer: Buffer;
  contentType: string;
  ext: string;
}> {
  const optimized = await sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer();

  // Jeśli wynik nie jest mniejszy, zostaw oryginał (rzadkie).
  if (optimized.length >= input.length) {
    return {
      buffer: input,
      contentType: mime,
      ext: originalExt(mime),
    };
  }

  return {
    buffer: optimized,
    contentType: "image/webp",
    ext: "webp",
  };
}

async function prepareUpload(file: File) {
  if (!ALLOWED.has(file.type)) {
    throw new Error("Dozwolone formaty: JPG, PNG, WEBP, GIF");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Maksymalny rozmiar pliku to 8 MB");
  }

  const input = Buffer.from(await file.arrayBuffer());
  try {
    return await optimizeImage(input, file.type);
  } catch {
    throw new Error("Nie udało się przetworzyć obrazu");
  }
}

async function saveToBlob(
  folder: "blog" | "realizations",
  buffer: Buffer,
  contentType: string,
  ext: string,
) {
  const pathname = `uploads/${folder}/${nanoid()}.${ext}`;
  const blob = await put(pathname, buffer, {
    access: "public",
    contentType,
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
  const prepared = await prepareUpload(file);

  if (blobConfigured()) {
    return saveToBlob(
      folder,
      prepared.buffer,
      prepared.contentType,
      prepared.ext,
    );
  }

  return saveLocal(folder, prepared.buffer, prepared.ext);
}

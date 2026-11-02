import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const markSvg = resolve(root, "public/brand/mark.svg");

async function png(size, out) {
  const buf = await sharp(markSvg)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  writeFileSync(out, buf);
  console.log("wrote", out, buf.length);
}

// Minimal ICO: PNG-in-ICO for 32x32 (widely supported)
function pngToIco(pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // ICO
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry[0] = 32; // width
  entry[1] = 32; // height
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bit count
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(6 + 16, 12); // offset

  return Buffer.concat([header, entry, pngBuf]);
}

const png32 = await sharp(markSvg).resize(32, 32).png().toBuffer();
writeFileSync(resolve(root, "public/favicon.ico"), pngToIco(png32));
writeFileSync(resolve(root, "public/favicon.png"), png32);
console.log("wrote favicon.ico / favicon.png");

await png(64, resolve(root, "public/brand/logo.png"));
await png(180, resolve(root, "public/brand/icon.png"));
await png(512, resolve(root, "public/brand/icon-512.png"));
await png(192, resolve(root, "public/brand/icon-192.png"));

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "wojtech_admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 dni

function secret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "dev-insecure-secret-change-me"
  );
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "wojtech-admin",
  };
}

export function verifyCredentials(username: string, password: string) {
  const creds = getAdminCredentials();
  return username === creds.username && password === creds.password;
}

export async function createSession() {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = `admin:${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  const exp = Number(payload.split(":")[1]);
  if (!exp || Date.now() > exp) return false;
  return true;
}

export async function requireAuth() {
  const ok = await isAuthenticated();
  if (!ok) throw new Error("UNAUTHORIZED");
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "wojtech_admin_session";

/** Tylko oczywiste scrapery CLI/HTTP — boty SEO/GEO są dozwolone. */
const BLOCKED_UA =
  /scrapy|curl\/|wget\/|python-requests|python-urllib|libwww-perl|httpclient|go-http-client/i;

/** Search + AI/GEO + narzędzia SEO — bez rate limitu (cache chroni bazę). */
const SEARCH_BOT_UA =
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|facebookexternalhit|twitterbot|linkedinbot|ahrefsbot|semrushbot|mj12bot|dotbot|gptbot|claudebot|ccbot|amazonbot|bytespider|petalbot|perplexitybot|anthropic|oai-searchbot|chatgpt-user|imagesiftbot|dataforseo/i;

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

function secret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "dev-insecure-secret-change-me"
  );
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toHex(signature);
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function isValidSession(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = await sign(payload);
  if (!timingSafeEqualHex(signature, expected)) return false;
  const exp = Number(payload.split(":")[1]);
  return Boolean(exp && Date.now() <= exp);
}

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function allowRate(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > 4000) {
    for (const [k, v] of buckets) {
      if (v.reset < now) buckets.delete(k);
    }
    if (buckets.size > 4000) buckets.clear();
  }

  const entry = buckets.get(key);
  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

function tooMany() {
  return NextResponse.json(
    { ok: false, message: "Zbyt wiele żądań. Spróbuj za chwilę." },
    { status: 429, headers: { "Retry-After": "60" } },
  );
}

function blocked() {
  return new NextResponse("Forbidden", { status: 403 });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const ip = clientIp(request);

  // Blokuj oczywiste boty scrapujące (nie SEO Google/Bing).
  if (ua && BLOCKED_UA.test(ua) && !SEARCH_BOT_UA.test(ua)) {
    return blocked();
  }

  const isAdminPage =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/admin") &&
    pathname !== "/api/admin/login";
  const isPublicApi =
    pathname.startsWith("/api/contact") || pathname.startsWith("/api/quote");
  const isContentPath =
    pathname.startsWith("/blog") ||
    pathname.startsWith("/realizacje") ||
    pathname === "/sitemap.xml";

  // Formularze — mocniejszy limit (anty-spam).
  if (isPublicApi) {
    if (!allowRate(`api:${ip}`, 20, 60_000)) return tooMany();
  }

  // Treści DB / sitemap — łagodniejszy limit dla zwykłego ruchu i nieznanych botów.
  // Search boty pomijamy (cache i tak chroni bazę).
  if (isContentPath && !SEARCH_BOT_UA.test(ua)) {
    if (!allowRate(`content:${ip}`, 120, 60_000)) return tooMany();
  }

  // Login admina — ochrona przed brute-force.
  if (pathname === "/api/admin/login") {
    if (!allowRate(`admin-login:${ip}`, 10, 60_000)) return tooMany();
    return NextResponse.next();
  }

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (!allowRate(`admin:${ip}`, 180, 60_000)) return tooMany();

  const token = request.cookies.get(COOKIE)?.value;
  if (await isValidSession(token)) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json(
      { ok: false, message: "Brak autoryzacji" },
      { status: 401 },
    );
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
    "/blog",
    "/blog/:path*",
    "/realizacje",
    "/realizacje/:path*",
    "/sitemap.xml",
  ],
};

import { connection } from "next/server";

/** Opt out of Cache Components static caching for DB-backed pages. */
export async function requireDynamic() {
  await connection();
}

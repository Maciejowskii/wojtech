"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Pulpit" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/realizacje", label: "Realizacje" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-4">
          <p className="font-display text-lg font-semibold text-navy">
            WOJ-TECH Admin
          </p>
          <nav className="flex flex-wrap gap-1">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold ${
                    active
                      ? "bg-accent text-white"
                      : "text-navy hover:bg-mist"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex gap-2">
            <Link href="/" className="btn btn-ghost py-2 text-sm" target="_blank">
              Strona
            </Link>
            <button type="button" className="btn btn-secondary py-2 text-sm" onClick={logout}>
              Wyloguj
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}

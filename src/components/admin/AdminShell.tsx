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
    <div className="min-h-screen overflow-x-clip bg-mist">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <p className="font-display text-lg font-semibold text-navy">
            WOJ-TECH Admin
          </p>
          <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 sm:overflow-visible sm:pb-0">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex min-h-10 shrink-0 items-center rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold ${
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
          <div className="flex gap-2 sm:ml-auto">
            <Link
              href="/"
              className="btn btn-ghost min-h-10 flex-1 py-2 text-sm sm:flex-none"
              target="_blank"
            >
              Strona
            </Link>
            <button
              type="button"
              className="btn btn-secondary min-h-10 flex-1 py-2 text-sm sm:flex-none"
              onClick={logout}
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-8">{children}</main>
    </div>
  );
}

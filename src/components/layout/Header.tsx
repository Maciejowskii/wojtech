"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { Logo } from "@/components/ui/Logo";
import { useIsClient } from "@/hooks/useIsClient";
import { siteConfig } from "@/lib/site.config";

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function IconMenu({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-5 bg-navy transition-transform duration-200 ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-navy transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-5 bg-navy transition-transform duration-200 ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </span>
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getScrollSnapshot() {
  return window.scrollY > 4;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const mounted = useIsClient();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    () => false,
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const drawer =
    mounted &&
    createPortal(
      <MobileNavDrawer
        open={open}
        pathname={pathname}
        panelId={panelId}
        onClose={() => setOpen(false)}
      />,
      document.body,
    );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b bg-mist/95 pt-[var(--safe-top)] backdrop-blur-sm transition-colors ${
          scrolled ? "border-border" : "border-border/60"
        }`}
      >
        <div className="container-page flex h-[var(--header-h)] items-center gap-3 sm:gap-6">
          <Logo className="min-w-0" />

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <nav
              className="flex items-center gap-1"
              aria-label="Główna nawigacja"
            >
              {siteConfig.nav.map((item) => {
                const active = isNavActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      active
                        ? "nav-link nav-link-active text-accent"
                        : "nav-link"
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a href={siteConfig.phone.href} className="btn-nav-phone ml-3">
              {siteConfig.phone.display}
            </a>
          </div>

          <button
            type="button"
            className="touch-target ml-auto inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-graphite/25 bg-white text-navy lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <IconMenu open={open} />
          </button>
        </div>
      </header>

      {drawer}
    </>
  );
}

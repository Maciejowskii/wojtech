"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site.config";

function isPathNav(href: string) {
  return href.startsWith("/") && !href.includes("#");
}

function sectionId(href: string) {
  if (!href.includes("#")) return null;
  return href.split("#")[1] || null;
}

function isNavActive(
  href: string,
  pathname: string,
  activeSection: string | null,
) {
  if (isPathNav(href)) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Anchor links only apply on the homepage
  if (pathname !== "/") return false;

  const id = sectionId(href);
  if (!id) return false;

  if (id === "start") {
    return !activeSection || activeSection === "start";
  }

  return activeSection === id;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("start");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const fromHash = window.location.hash.replace(/^#/, "") || "start";
    setActiveSection(fromHash);

    const onHash = () => {
      setActiveSection(window.location.hash.replace(/^#/, "") || "start");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = siteConfig.nav
      .map((item) => sectionId(item.href))
      .filter((id): id is string => Boolean(id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-mist/95 backdrop-blur-sm transition-colors ${
        scrolled ? "border-border" : "border-border/60"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center gap-6">
        <Logo />

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <nav className="flex items-center gap-0.5" aria-label="Główna nawigacja">
            {siteConfig.nav.map((item) => {
              const active = isNavActive(item.href, pathname, activeSection);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? "nav-link-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a href={siteConfig.phone.href} className="btn-nav-phone ml-3">
            <Phone className="size-3.5" aria-hidden strokeWidth={2} />
            {siteConfig.phone.display}
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-graphite/25 bg-transparent text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-mist lg:hidden">
          <nav
            className="container-page flex flex-col py-3"
            aria-label="Menu mobilne"
          >
            {siteConfig.nav.map((item) => {
              const active = isNavActive(item.href, pathname, activeSection);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-l-2 px-3 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] ${
                    active
                      ? "border-accent text-accent"
                      : "border-transparent text-navy"
                  }`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.phone.href}
              className="btn-nav-phone mt-3 w-full justify-center"
              onClick={() => setOpen(false)}
            >
              <Phone className="size-3.5" aria-hidden />
              {siteConfig.phone.display}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

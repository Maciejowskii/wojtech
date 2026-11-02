"use client";

import Link from "next/link";
import { offerServices } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  open: boolean;
  pathname: string;
  panelId: string;
  onClose: () => void;
};

export function MobileNavDrawer({ open, pathname, panelId, onClose }: Props) {
  return (
    <div
      className="mobile-drawer lg:hidden"
      data-open={open ? "true" : "false"}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="mobile-drawer__backdrop"
        tabIndex={open ? 0 : -1}
        aria-label="Zamknij menu"
        onClick={onClose}
      />

      <aside
        id={panelId}
        className="mobile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav className="mobile-drawer__nav" aria-label="Menu mobilne">
          <ul className="flex flex-col">
            <li>
              <Link
                href="/"
                className={`mobile-drawer__link ${
                  pathname === "/" ? "text-accent" : "text-navy"
                }`}
                aria-current={pathname === "/" ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
              >
                Strona główna
              </Link>
            </li>
            {siteConfig.nav.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`mobile-drawer__link ${
                      active ? "text-accent" : "text-navy"
                    }`}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? 0 : -1}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-border px-1 pt-5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Usługi
            </p>
            <ul className="mt-2 flex flex-col">
              {offerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="flex min-h-11 items-center px-3 text-[0.95rem] font-medium text-graphite hover:text-accent"
                    tabIndex={open ? 0 : -1}
                    onClick={onClose}
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mobile-drawer__footer">
          <a
            href={siteConfig.phone.href}
            className="btn btn-primary w-full"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            {siteConfig.phone.display}
          </a>
          <Link
            href="/kontakt#wycena"
            className="btn btn-secondary mt-3 w-full"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            Zapytaj o wycenę
          </Link>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted">
            {siteConfig.address.street}, {siteConfig.address.city}
          </p>
        </div>
      </aside>
    </div>
  );
}

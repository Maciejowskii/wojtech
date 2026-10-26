"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

export function MobileCta() {
  return (
    <div className="mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={siteConfig.phone.href}
          className="btn btn-secondary flex-1 py-3 text-sm"
        >
          <Phone className="size-4" aria-hidden />
          Zadzwoń
        </a>
        <Link href="/#wycena" className="btn btn-primary flex-1 py-3 text-sm">
          Wycena
        </Link>
      </div>
    </div>
  );
}

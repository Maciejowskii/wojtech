import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { offerServices } from "@/data/services";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Mapa strony",
  description:
    "Spis podstron WOJ-TECH Elektroserwis Ostrzeszów: oferta, kontakt, blog, dokumenty.",
  alternates: { canonical: "/mapa-strony" },
};

const mainLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/oferta", label: "Oferta" },
  { href: "/jak-pracujemy", label: "Jak pracujemy" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/opinie", label: "Opinie" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

const docs = [
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/cookies", label: "Pliki cookies" },
];

function LinkGroup({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
        {title}
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center text-[1.05rem] font-semibold text-navy underline-offset-4 hover:text-accent hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <>
      <PageIntro
        label="Nawigacja"
        title="Mapa strony"
        lead="Wszystkie ważne podstrony warsztatu w jednym miejscu."
      >
        <a href={siteConfig.phone.href} className="btn btn-primary">
          Zadzwoń: {siteConfig.phone.display}
        </a>
        <Link href="/kontakt#wycena" className="btn btn-secondary">
          Formularz wyceny
        </Link>
      </PageIntro>

      <section className="section-pad bg-white">
        <div className="container-page max-w-3xl space-y-10">
          <LinkGroup title="Główne" items={mainLinks} />
          <LinkGroup
            title="Usługi"
            items={offerServices.map((service) => ({
              href: service.href,
              label: service.shortTitle,
            }))}
          />
          <LinkGroup title="Dokumenty" items={docs} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { requireDynamic } from "@/lib/dynamic";
import {
  categoryLabel,
  listPublicRealizations,
  realizationFilters,
} from "@/lib/realizations-db";
import { siteConfig } from "@/lib/site.config";

export const instant = false;

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Galeria napraw WOJ-TECH Elektroserwis w Ostrzeszowie: ekspresy, elektronika, rowery i hulajnogi.",
  alternates: { canonical: "/realizacje" },
};

type Props = { searchParams: Promise<{ kategoria?: string }> };

export default async function RealizationsPage({ searchParams }: Props) {
  await requireDynamic();
  const { kategoria } = await searchParams;
  const all = listPublicRealizations();
  const items =
    kategoria && kategoria !== "all"
      ? all.filter((item) => item.category === kategoria)
      : all;

  return (
    <>
      <PageIntro
        label="Realizacje"
        title="Wszystkie realizacje"
        lead="Zdjęcia i opisy napraw z serwisu WOJ-TECH w Ostrzeszowie."
      >
        <a href={siteConfig.phone.href} className="btn btn-primary">
          {siteConfig.phone.display}
        </a>
        <Link href="/kontakt#wycena" className="btn btn-secondary">
          Zapytaj o wycenę
        </Link>
      </PageIntro>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="-mx-[var(--page-gutter)] overflow-x-auto px-[var(--page-gutter)] pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="flex w-max min-w-full flex-nowrap gap-2 sm:w-auto sm:flex-wrap">
              {realizationFilters().map((f) => {
                const active =
                  (f.id === "all" && !kategoria) || kategoria === f.id;
                const href =
                  f.id === "all"
                    ? "/realizacje"
                    : `/realizacje?kategoria=${f.id}`;
                return (
                  <Link
                    key={f.id}
                    href={href}
                    className={`inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-md)] border px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-white text-navy hover:border-navy"
                    }`}
                  >
                    {f.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="mt-10 border border-border bg-mist px-6 py-12 text-center">
              <p className="text-base text-muted">
                Brak realizacji w tej kategorii.
              </p>
              <Link
                href="/realizacje"
                className="btn btn-secondary mt-6 inline-flex"
              >
                Pokaż wszystkie
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const cover =
                  item.images.find((i) => i.kind === "after") || item.images[0];
                return (
                  <Link
                    key={item.id}
                    href={`/realizacje/${item.slug}`}
                    className="group flex h-full flex-col no-underline"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      {cover ? (
                        <Image
                          src={cover.url}
                          alt={cover.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col border-x border-b border-border px-4 py-5 sm:px-5">
                      <p className="text-sm font-semibold text-accent">
                        {categoryLabel(item.category)}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold uppercase tracking-[0.02em] text-navy transition-colors group-hover:text-accent">
                        {item.title}
                      </h2>
                      {item.problem ? (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                          {item.problem}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

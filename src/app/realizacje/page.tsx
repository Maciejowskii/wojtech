import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requireDynamic } from "@/lib/dynamic";
import {
  categoryLabel,
  listPublicRealizations,
  realizationFilters,
} from "@/lib/realizations-db";

export const instant = false;

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Galeria napraw WOJ-TECH Elektroserwis w Ostrzeszowie — ekspresy, elektronika, rowery i hulajnogi.",
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
    <div className="section-pad">
      <div className="container-page">
        <SectionHeading
          label="Portfolio"
          title="Wszystkie realizacje"
          subtitle="Opisy i zdjęcia napraw wykonanych w serwisie WOJ-TECH."
        />

        <div className="flex flex-wrap gap-2">
          {realizationFilters().map((f) => {
            const active =
              (f.id === "all" && !kategoria) || kategoria === f.id;
            const href =
              f.id === "all" ? "/realizacje" : `/realizacje?kategoria=${f.id}`;
            return (
              <Link
                key={f.id}
                href={href}
                className={`min-h-10 rounded-[var(--radius-md)] border px-4 py-2 text-sm font-medium ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-white text-navy"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div className="card-surface mt-8 p-10 text-center text-muted">
            Brak realizacji w tej kategorii.
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const cover =
                item.images.find((i) => i.kind === "after") || item.images[0];
              return (
                <Link
                  key={item.id}
                  href={`/realizacje/${item.slug}`}
                  className="card-surface overflow-hidden hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] bg-card">
                    {cover ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {categoryLabel(item.category)}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-navy">
                      {item.title}
                    </h2>
                    {item.problem ? (
                      <p className="mt-2 line-clamp-3 text-sm text-muted">
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
    </div>
  );
}

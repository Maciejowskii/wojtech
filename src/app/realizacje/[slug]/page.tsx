import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireDynamic } from "@/lib/dynamic";
import {
  categoryLabel,
  getPublicRealizationBySlug,
  listPublicRealizations,
} from "@/lib/realizations-db";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await requireDynamic();
  const { slug } = await params;
  const item = getPublicRealizationBySlug(slug);
  if (!item) return { title: "Realizacja" };
  return {
    title: item.title,
    description: item.problem || item.description || item.title,
    alternates: { canonical: `/realizacje/${item.slug}` },
  };
}

export default async function RealizationDetailPage({ params }: Props) {
  await requireDynamic();
  const { slug } = await params;
  const item = getPublicRealizationBySlug(slug);
  if (!item) notFound();

  const related = listPublicRealizations(4).filter((r) => r.id !== item.id).slice(0, 3);

  return (
    <article className="section-pad">
      <div className="container-page max-w-4xl">
        <p className="section-label">{categoryLabel(item.category)}</p>
        <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-navy">
          {item.title}
        </h1>

        {item.images.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {item.images.map((img) => (
              <figure key={img.id} className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.url}
                    alt={img.alt || item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="bg-white px-3 py-2 text-xs uppercase tracking-wide text-muted">
                  {img.kind === "before"
                    ? "Przed"
                    : img.kind === "after"
                      ? "Po"
                      : img.alt || "Zdjęcie"}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        <div className="mt-8 space-y-6">
          {item.problem ? (
            <section>
              <h2 className="text-xl font-semibold text-navy">Problem</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.problem}</p>
            </section>
          ) : null}
          {item.work ? (
            <section>
              <h2 className="text-xl font-semibold text-navy">Wykonane prace</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.work}</p>
            </section>
          ) : null}
          {item.description ? (
            <section>
              <h2 className="text-xl font-semibold text-navy">Opis</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
            </section>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/kontakt#wycena" className="btn btn-primary">
            Zapytaj o wycenę
          </Link>
          <Link href="/realizacje" className="btn btn-secondary">
            Wszystkie realizacje
          </Link>
        </div>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-navy">Inne realizacje</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/realizacje/${r.slug}`} className="card-surface p-4">
                  <p className="text-sm font-semibold text-navy">{r.title}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}

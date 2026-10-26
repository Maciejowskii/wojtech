import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requireDynamic } from "@/lib/dynamic";
import {
  categoryLabel,
  listPublicRealizations,
} from "@/lib/realizations-db";

export async function Realizations() {
  await requireDynamic();
  let items: ReturnType<typeof listPublicRealizations> = [];
  try {
    items = listPublicRealizations(3);
  } catch {
    items = [];
  }

  return (
    <section
      id="realizacje"
      className="section-pad bg-mist"
      aria-labelledby="realizacje-title"
    >
      <div className="container-page">
        <SectionHeading
          id="realizacje-title"
          label="Realizacje"
          title="Zobacz, co naprawiamy"
          subtitle="Najnowsze przykłady napraw z naszego serwisu."
        />

        {items.length === 0 ? (
          <div className="card-surface px-6 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Portfolio
            </p>
            <h3 className="mt-3 text-xl font-semibold text-navy">
              Realizacje w przygotowaniu
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Wkrótce pojawią się tutaj zdjęcia i opisy wykonanych napraw.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const cover =
                  item.images.find((i) => i.kind === "after") ||
                  item.images[0];
                return (
                  <Link
                    key={item.id}
                    href={`/realizacje/${item.slug}`}
                    className="card-surface overflow-hidden transition-colors hover:border-accent/40"
                  >
                    <div className="relative aspect-[4/3] bg-card">
                      {cover ? (
                        <Image
                          src={cover.url}
                          alt={cover.alt || item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {categoryLabel(item.category)}
                      </p>
                      <h3 className="mt-2 font-semibold text-navy">
                        {item.title}
                      </h3>
                      {item.problem ? (
                        <p className="mt-2 line-clamp-2 text-sm text-muted">
                          {item.problem}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8">
              <Link href="/realizacje" className="btn btn-secondary">
                Wszystkie realizacje
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

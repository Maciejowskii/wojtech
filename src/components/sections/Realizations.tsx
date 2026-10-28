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
          label="Portfolio"
          title="Wybrane realizacje"
          subtitle="Naprawy wykonane w serwisie WOJ-TECH w Ostrzeszowie."
        />

        {items.length === 0 ? (
          <div className="card-surface grid gap-5 p-6 sm:grid-cols-2 md:p-8">
            <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-card">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/brand/stanowisko.jpg"
                  alt="Wejście do serwisu WOJ-TECH"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Serwis
                </p>
                <h3 className="mt-2 font-semibold text-navy">
                  Stanowisko w Ostrzeszowie
                </h3>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Portfolio
              </p>
              <h3 className="mt-2 text-xl font-semibold text-navy">
                Realizacje w przygotowaniu
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Wkrótce pojawią się tu zdjęcia i opisy wykonanych napraw.
                Zapytaj o wycenę albo zadzwoń.
              </p>
              <Link href="/realizacje" className="btn btn-secondary mt-6 w-fit">
                Nasze realizacje
              </Link>
            </div>
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
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
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
                Nasze realizacje
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

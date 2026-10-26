import Link from "next/link";
import { DeleteRealizationButton } from "@/components/admin/DeleteRealizationButton";
import { requireDynamic } from "@/lib/dynamic";
import {
  categoryLabel,
  listAllRealizations,
} from "@/lib/realizations-db";

export const instant = false;

export default async function AdminRealizationsPage() {
  await requireDynamic();
  const items = listAllRealizations();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Realizacje
          </h1>
          <p className="mt-2 text-muted">
            Dodawaj naprawy ze zdjęciami i opisami.
          </p>
        </div>
        <Link href="/admin/realizacje/nowa" className="btn btn-primary">
          Nowa realizacja
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {items.length === 0 ? (
          <div className="card-surface p-8 text-muted">
            Brak realizacji. Dodaj pierwszą z panelu.
          </div>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="h-24 w-full shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-card sm:w-36">
                {item.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.images[0].url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-navy">{item.title}</h2>
                <p className="mt-1 text-sm text-muted">
                  {categoryLabel(item.category)} ·{" "}
                  {item.published ? "Opublikowana" : "Ukryta"} ·{" "}
                  {item.images.length} zdjęć
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/realizacje/${item.id}`}
                  className="btn btn-secondary py-1.5 text-xs"
                >
                  Edytuj
                </Link>
                {item.published ? (
                  <Link
                    href={`/realizacje/${item.slug}`}
                    className="btn btn-ghost py-1.5 text-xs"
                    target="_blank"
                  >
                    Podgląd
                  </Link>
                ) : null}
                <DeleteRealizationButton id={item.id} />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

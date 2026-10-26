import Link from "next/link";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/site.config";

export function Reviews() {
  return (
    <section
      id="opinie"
      className="section-pad bg-white"
      aria-labelledby="opinie-title"
    >
      <div className="container-page">
        <SectionHeading
          id="opinie-title"
          title="Co mówią nasi klienci?"
          subtitle="Publikujemy wyłącznie potwierdzone opinie. Sekcja jest gotowa na uzupełnienie."
        />

        {reviews.length === 0 ? (
          <div className="card-surface flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex gap-1 text-steel" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current opacity-40" />
                ))}
              </div>
              <h3 className="mt-3 text-lg font-bold text-navy">
                Opinie pojawią się wkrótce
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Nie tworzymy fikcyjnych recenzji. Gdy właściciel udostępni
                prawdziwe opinie lub link do profilu Google, pokażemy je w tym
                miejscu.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteConfig.googleBusinessUrl ? (
                <a
                  href={siteConfig.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Zobacz opinie w Google
                </a>
              ) : (
                <Link href="/#kontakt" className="btn btn-secondary">
                  Skontaktuj się z serwisem
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="card-surface p-6">
                <div
                  className="flex gap-1 text-accent"
                  aria-label={`Ocena ${review.rating} na 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < review.rating ? "fill-current" : "opacity-25"}`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-navy">
                  „{review.text}”
                </p>
                <div className="mt-4 text-sm text-muted">
                  <p className="font-semibold text-navy">{review.author}</p>
                  {review.date ? <p>{review.date}</p> : null}
                  {review.source === "google" ? <p>Źródło: Google</p> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

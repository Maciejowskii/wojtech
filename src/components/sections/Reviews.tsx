import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { googleRatingSummary, reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/site.config";

type ReviewsProps = {
  showHeading?: boolean;
};

export function Reviews({ showHeading = true }: ReviewsProps) {
  return (
    <section
      id="opinie"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "opinie-title" : undefined}
    >
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            id="opinie-title"
            label="Opinie"
            title="Opinie klientów"
            subtitle="Z wizytówki Google Maps."
          />
        ) : null}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-2">
            <p className="font-display text-3xl font-semibold text-navy">
              {googleRatingSummary.rating.toFixed(1)}
            </p>
            <div>
              <div
                className="flex gap-0.5 text-accent"
                aria-label={`${googleRatingSummary.rating} na 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < googleRatingSummary.rating ? "fill-current" : "opacity-25"}`}
                  />
                ))}
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {googleRatingSummary.count} opinie w Google
              </p>
            </div>
          </div>
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full sm:w-auto"
          >
            Zobacz wizytówkę Google
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.id} className="card-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <div
                  className="flex gap-0.5 text-accent"
                  aria-label={`Ocena ${review.rating} na 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${i < review.rating ? "fill-current" : "opacity-25"}`}
                    />
                  ))}
                </div>
                {review.source === "google" ? (
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Google
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy">
                „{review.text}”
              </p>
              <div className="mt-4 text-sm text-muted">
                <p className="font-semibold text-navy">{review.author}</p>
                {review.date ? <p>{review.date}</p> : null}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          Opinie pochodzą z{" "}
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-accent hover:underline"
          >
            wizytówki Google
          </a>
          . Aktualne oceny zobaczysz w Google Maps.
        </p>
      </div>
    </section>
  );
}

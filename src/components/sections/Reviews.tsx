import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { googleRatingSummary, reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/site.config";

type ReviewsProps = {
  showHeading?: boolean;
};

export function Reviews({ showHeading = true }: ReviewsProps) {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");
  const [featured, ...rest] = reviews;

  return (
    <section
      id="opinie"
      className="section-pad bg-mist"
      aria-labelledby={showHeading ? "opinie-title" : undefined}
    >
      <div className="container-page">
        <ScrollReveal variant="left">
          <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              {showHeading ? (
                <>
                  <p className="section-label">Opinie</p>
                  <h2
                    id="opinie-title"
                    className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[0.02em] text-navy"
                  >
                    Opinie klientów
                  </h2>
                </>
              ) : (
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold uppercase tracking-[0.02em] text-navy">
                  Z wizytówki Google
                </h2>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <p className="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">
                {rating}
                <span className="ml-2 align-baseline text-base font-semibold text-muted">
                  / 5 Google
                </span>
              </p>
              <a
                href={siteConfig.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Wizytówka Google
              </a>
            </div>
          </div>
        </ScrollReveal>

        {featured ? (
          <ScrollReveal as="figure" variant="clip" delay={80} className="mt-10 max-w-4xl">
            <blockquote className="text-[clamp(1.35rem,2.6vw,1.85rem)] font-medium leading-snug text-navy">
              <p>„{featured.text}”</p>
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-navy">{featured.author}</span>
              {featured.date ? <span>, {featured.date}</span> : null}
            </figcaption>
          </ScrollReveal>
        ) : null}

        {rest.length > 0 ? (
          <ul className="mt-10 grid gap-6 border-t border-border pt-10 md:grid-cols-3 md:gap-8">
            {rest.map((review, index) => (
              <ScrollReveal
                key={review.id}
                as="li"
                variant="up"
                delay={100 + index * 90}
              >
                <p className="text-[1.02rem] leading-relaxed text-graphite">
                  „{review.text}”
                </p>
                <p className="mt-4 text-sm">
                  <span className="font-semibold text-navy">{review.author}</span>
                  {review.date ? (
                    <span className="text-muted">, {review.date}</span>
                  ) : null}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

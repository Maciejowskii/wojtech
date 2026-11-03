import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { googleRatingSummary, reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/site.config";

type ReviewsProps = {
  showHeading?: boolean;
};

export function Reviews({ showHeading = true }: ReviewsProps) {
  const rating = googleRatingSummary.rating.toFixed(1).replace(".", ",");
  const [featured, ...rest] = reviews;
  const side = rest.slice(0, 3);

  return (
    <section
      id="opinie"
      className="section-pad bg-white"
      aria-labelledby={showHeading ? "opinie-title" : undefined}
    >
      <div className="container-page">
        <ScrollReveal variant="left">
          {showHeading ? (
            <SectionHeader
              label="Opinie"
              title="Opinie klientów"
              titleId="opinie-title"
              action={
                <div className="flex flex-wrap items-center gap-4">
                  <p className="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">
                    {rating}
                    <span className="ml-2 align-baseline text-base font-semibold text-muted">
                      / 5
                    </span>
                  </p>
                  <a
                    href={siteConfig.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Google
                  </a>
                </div>
              }
            />
          ) : (
            <SectionHeader
              label="Opinie"
              title="Z wizytówki Google"
              action={
                <a
                  href={siteConfig.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Google
                </a>
              }
            />
          )}
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {featured ? (
            <ScrollReveal
              as="figure"
              variant="clip"
              delay={60}
              className="flex flex-col justify-center border border-border bg-mist px-5 py-7 sm:px-8 sm:py-9 lg:col-span-7"
            >
              <blockquote className="text-[clamp(1.2rem,2.4vw,1.65rem)] font-medium leading-snug text-navy">
                <p>„{featured.text}”</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted">
                <span className="font-semibold text-navy">{featured.author}</span>
                {featured.date ? <span>, {featured.date}</span> : null}
              </figcaption>
            </ScrollReveal>
          ) : null}

          {side.length > 0 ? (
            <ul className="flex flex-col gap-5 lg:col-span-5">
              {side.map((review, index) => (
                <ScrollReveal
                  key={review.id}
                  as="li"
                  variant="up"
                  delay={100 + index * 70}
                  className="border-b border-border pb-5 last:border-b-0 last:pb-0"
                >
                  <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-graphite">
                    „{review.text}”
                  </p>
                  <p className="mt-2.5 text-sm">
                    <span className="font-semibold text-navy">
                      {review.author}
                    </span>
                    {review.date ? (
                      <span className="text-muted">, {review.date}</span>
                    ) : null}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

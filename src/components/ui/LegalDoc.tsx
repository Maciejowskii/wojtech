import type { ReactNode } from "react";

type LegalDocProps = {
  children: ReactNode;
  updated?: string;
};

export function LegalDoc({ children, updated }: LegalDocProps) {
  return (
    <article className="section-pad bg-white">
      <div className="container-page max-w-3xl">
        {updated ? (
          <p className="mb-8 text-sm text-muted">
            Ostatnia aktualizacja: {updated}
          </p>
        ) : null}
        <div className="legal-doc">{children}</div>
      </div>
    </article>
  );
}

type LegalSectionProps = {
  id?: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold uppercase tracking-[0.02em] text-navy md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

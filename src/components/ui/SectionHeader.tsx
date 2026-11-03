import type { ReactNode } from "react";

type SectionHeaderProps = {
  label: string;
  title: string;
  titleId?: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  titleId,
  lead,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-8 flex flex-col gap-5 border-b border-border pb-7 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-8 ${className}`}
    >
      <div className="max-w-2xl">
        <p className="section-label">{label}</p>
        <h2
          id={titleId}
          className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[0.02em] text-navy"
        >
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-muted">
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

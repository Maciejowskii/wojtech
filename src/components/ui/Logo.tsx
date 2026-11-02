import Link from "next/link";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 items-center no-underline ${className}`}
      aria-label="WOJ-TECH Elektroserwis - strona główna"
    >
      <span className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-2 font-display text-[1.45rem] font-bold uppercase leading-none tracking-[0.06em] text-navy sm:text-[1.65rem]">
          <span>WOJ</span>
          <span
            className="inline-block h-[0.85em] w-[3px] shrink-0 bg-accent"
            aria-hidden
          />
          <span>TECH</span>
        </span>
        {!compact ? (
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted sm:block">
            Elektroserwis
          </span>
        ) : null}
      </span>
    </Link>
  );
}

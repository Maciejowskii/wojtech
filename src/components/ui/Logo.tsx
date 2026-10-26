import Link from "next/link";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <Link
      href="/#start"
      className={`inline-flex items-center gap-3 no-underline ${className}`}
      aria-label="WOJ-TECH Elektroserwis — strona główna"
    >
      <span
        className="relative grid size-10 place-items-center rounded-xl bg-navy text-white shadow-sm"
        aria-hidden
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.35"
          />
          <path
            d="M8 12h3.2L12.5 8l1.8 8L16 12h0"
            stroke="#B2C3D7"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="12" r="1.2" fill="#267A9B" />
          <circle cx="16" cy="12" r="1.2" fill="#267A9B" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-bold tracking-tight text-navy">
          WOJ-TECH
        </span>
        {!compact && (
          <span className="mt-1 text-[0.68rem] font-semibold tracking-[0.14em] text-muted">
            ELEKTROSERWIS
          </span>
        )}
      </span>
    </Link>
  );
}

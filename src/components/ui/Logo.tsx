import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 no-underline ${className}`}
      aria-label="WOJ-TECH Elektroserwis - strona główna"
    >
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] bg-navy sm:size-11">
        <Image
          src="/brand/logo.png"
          alt=""
          width={32}
          height={32}
          className="size-8 object-contain sm:size-9"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-tight text-navy sm:text-[1.25rem]">
          WOJ-TECH
        </span>
        {!compact && (
          <span className="mt-1.5 text-[0.62rem] font-semibold tracking-[0.18em] text-muted">
            ELEKTROSERWIS
          </span>
        )}
      </span>
    </Link>
  );
}

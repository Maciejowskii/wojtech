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
      className={`inline-flex items-center gap-2.5 no-underline ${className}`}
      aria-label="WOJ-TECH Elektroserwis — strona główna"
    >
      <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] bg-navy">
        <Image
          src="/brand/logo.png"
          alt=""
          width={28}
          height={28}
          className="size-7 object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-navy">
          WOJ-TECH
        </span>
        {!compact && (
          <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.18em] text-muted">
            ELEKTROSERWIS
          </span>
        )}
      </span>
    </Link>
  );
}

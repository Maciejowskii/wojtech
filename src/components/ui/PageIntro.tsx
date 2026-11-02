import type { ReactNode } from "react";

type PageIntroProps = {
  label?: string;
  title: string;
  lead?: string;
  tone?: "mist" | "white";
  children?: ReactNode;
};

export function PageIntro({
  label,
  title,
  lead,
  tone = "mist",
  children,
}: PageIntroProps) {
  return (
    <section
      className={`border-b border-border ${
        tone === "mist" ? "bg-mist" : "bg-white"
      }`}
    >
      <div className="container-page py-12 md:py-16">
        {label ? <p className="section-label">{label}</p> : null}
        <h1
          className={`${label ? "mt-2" : ""} max-w-3xl text-[clamp(2rem,4.5vw,3.1rem)] font-semibold uppercase tracking-[0.02em] text-navy`}
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

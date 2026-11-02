type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
  id?: string;
  tone?: "default" | "onDark";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  label,
  align = "left",
  id,
  tone = "default",
  className = "",
}: SectionHeadingProps) {
  const titleColor = tone === "onDark" ? "text-white" : "text-navy";
  const subColor = tone === "onDark" ? "text-steel" : "text-muted";

  return (
    <div
      className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {label ? (
        <p
          className={`section-label ${align === "center" ? "mx-auto" : ""} ${tone === "onDark" ? "text-steel" : ""}`}
        >
          {label}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[0.02em] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-[62ch] text-pretty text-base leading-relaxed md:text-lg ${subColor}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

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
          className={`section-label ${align === "center" ? "mx-auto" : ""} ${tone === "onDark" ? "text-steel before:bg-steel" : ""}`}
        >
          {label}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-balance text-[clamp(1.85rem,3.5vw,2.65rem)] font-semibold tracking-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 max-w-[65ch] text-pretty text-base leading-relaxed md:text-lg ${subColor}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

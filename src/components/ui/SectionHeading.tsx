type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
  tone?: "default" | "onDark";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
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
      <h2
        id={id}
        className={`text-balance text-3xl font-bold tracking-tight md:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 text-pretty text-base leading-relaxed md:text-lg ${subColor}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

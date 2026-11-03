import Image from "next/image";
import { media } from "@/data/media";

type VisualBreakProps = {
  image?: keyof typeof media;
  /** Wyższy pas na desktopie */
  tall?: boolean;
};

export function VisualBreak({
  image = "espressoClose",
  tall = false,
}: VisualBreakProps) {
  const shot = media[image];

  return (
    <section
      aria-hidden
      className={`relative overflow-hidden bg-navy ${
        tall
          ? "h-[min(48vw,26rem)] sm:h-[min(36vw,22rem)]"
          : "h-[min(40vw,18rem)] sm:h-[min(28vw,16rem)]"
      }`}
    >
      <Image
        src={shot.src}
        alt=""
        fill
        className="object-cover opacity-[0.88]"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-navy/20" />
    </section>
  );
}

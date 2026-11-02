"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type RevealVariant =
  | "up"
  | "fade"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "clip";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "figure" | "ul" | "header";
};

export function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  once = true,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const mounted = useIsClient();
  const reduceMotion = usePrefersReducedMotion();
  // Po hydracji: reduced-motion od razu pokazuje treść. Przed hydracją zawsze ukryte (SSR match).
  const shown = mounted && (reduceMotion || visible);

  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, once, reduceMotion]);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant} ${shown ? "reveal-in" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

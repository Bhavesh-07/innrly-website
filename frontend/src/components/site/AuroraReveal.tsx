import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * AuroraReveal — one signature scroll moment.
 * On first intersection, sweeps an aurora gradient diagonally across the
 * children once. Used sparingly on hero headlines to give the site a memorable
 * motion beat without turning into a parallax circus.
 */
export function AuroraReveal({
  children,
  className,
  delay = 120,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setRevealed(true), delay);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={cn("aurora-reveal relative inline-block", revealed && "is-revealed", className)}
    >
      {children}
    </span>
  );
}

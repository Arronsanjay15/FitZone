import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

type AnimatedNumberProps = {
  value: number;
  className?: string;
  /** Intro animation length in milliseconds. */
  duration?: number;
};

/**
 * Counts a number up from zero the first time it scrolls into view, then eases
 * smoothly to any later value changes (e.g. progress made during a session).
 * Reduced-motion users see the final value immediately.
 */
export function AnimatedNumber({
  value,
  className,
  duration = 900
}: AnimatedNumberProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
  );

  const currentRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const from = currentRef.current;
    const to = value;

    if (from === to) return;

    // Longer journeys take a little longer, but never feel sluggish.
    const length = Math.min(duration, 320 + Math.abs(to - from) * 55);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / length);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (to - from) * eased);

      currentRef.current = next;
      setDisplay(next);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {reduceMotion ? value : display}
    </span>
  );
}

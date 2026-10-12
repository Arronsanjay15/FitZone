import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Shrink the viewport so elements reveal just before reaching the edge. */
  rootMargin?: string;
  /** Keep the in-view state once it flips true (default: reveal once). */
  once?: boolean;
};

/**
 * Tracks whether an element has entered the viewport.
 *
 * Uses a zero threshold on purpose: very tall sections can never reach a high
 * intersection ratio, so a "touch the edge" trigger is the only reliable option.
 * The `rootMargin` bottom inset is what makes the reveal feel intentional.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  rootMargin = "0px 0px -12% 0px",
  once = true
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);

  // Environments without IntersectionObserver start visible so content is
  // never hidden forever.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin]);

  return { ref, inView };
}

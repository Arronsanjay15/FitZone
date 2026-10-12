import { useEffect, useState } from "react";

type ScrollState = {
  /** Page scroll progress between 0 and 1. */
  progress: number;
  /** Current vertical scroll offset in pixels. */
  y: number;
};

/**
 * Reports page scroll progress, throttled with requestAnimationFrame so it
 * never runs layout work more than once per frame.
 */
export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, y: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const y = window.scrollY;

      setState({
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        y
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

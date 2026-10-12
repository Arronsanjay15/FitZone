import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently closest to the top of the viewport.
 * Pass a stable (module-level) id array so the listener is only bound once.
 */
export function useScrollSpy(ids: readonly string[], offset = 150): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      let current = ids[0] ?? "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (element.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      setActive(current);
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
  }, [ids, offset]);

  return active;
}

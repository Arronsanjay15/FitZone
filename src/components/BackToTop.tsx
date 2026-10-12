import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating back-to-top control with a ring that fills as the page is scrolled.
 * Slides into view once the visitor has moved past the first screen.
 */
export function BackToTop() {
  const { progress, y } = useScrollProgress();
  const visible = y > 520;

  return (
    <button
      type="button"
      className={`back-to-top-fab${visible ? " is-visible" : ""}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
      <svg className="back-to-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          className="back-to-top-ring-track"
          cx="24"
          cy="24"
          r={RADIUS}
        />
        <circle
          className="back-to-top-ring-progress"
          cx="24"
          cy="24"
          r={RADIUS}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE * (1 - progress)
          }}
        />
      </svg>
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}

import { useScrollProgress } from "../hooks/useScrollProgress";

/**
 * Thin accent bar pinned to the bottom of the navbar that tracks scroll
 * progress through the page.
 */
export function ScrollProgress() {
  const { progress } = useScrollProgress();

  return (
    <span
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

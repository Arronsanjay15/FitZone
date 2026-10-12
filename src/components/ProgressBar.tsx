import { useInView } from "../hooks/useInView";

type ProgressBarProps = {
  value: number;
  max: number;
  className?: string;
  /** Accessible description of what the bar represents. */
  label?: string;
};

/**
 * Progress track that fills from zero the first time it scrolls into view,
 * giving the change a visible moment instead of appearing pre-filled.
 */
export function ProgressBar({
  value,
  max,
  className = "",
  label
}: ProgressBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const percent =
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      className={`progress-track ${className}`.trim()}
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className="progress-fill"
        style={{ width: inView ? `${percent}%` : "0%" }}
      />
    </div>
  );
}

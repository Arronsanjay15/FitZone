import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

export type RevealVariant =
  | "up"
  | "fade"
  | "left"
  | "right"
  | "scale"
  | "stagger";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Mark purely decorative reveals as hidden from assistive tech. */
  ariaHidden?: boolean;
};

/**
 * Wraps content so it animates into place the first time it scrolls into view.
 *
 * The ref is owned internally rather than handed back to the caller, which
 * keeps the reveal logic encapsulated and avoids leaking refs through render.
 *
 * - `stagger` animates the wrapper's direct children in sequence (grids/lists).
 * - the other variants animate the wrapper itself.
 */
export function Reveal({
  children,
  className = "",
  variant = "up",
  ariaHidden
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const base = variant === "stagger" ? "reveal-stagger" : `reveal reveal-${variant}`;
  const classes = `${base}${inView ? " is-visible" : ""}${
    className ? ` ${className}` : ""
  }`;

  return (
    <div
      ref={ref}
      className={classes}
      aria-hidden={ariaHidden || undefined}
    >
      {children}
    </div>
  );
}

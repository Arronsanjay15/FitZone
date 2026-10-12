import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  onClose: () => void;
  labelledBy?: string;
  className?: string;
  closeLabel?: string;
  children: ReactNode;
};

/**
 * Accessible modal shell: closes on Escape or backdrop click, locks background
 * scrolling, and moves focus to the close button when it opens.
 */
export function Modal({
  onClose,
  labelledBy,
  className = "",
  closeLabel = "Close",
  children
}: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X size={20} aria-hidden="true" />
        </button>
        {children}
      </section>
    </div>
  );
}

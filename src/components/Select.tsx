import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent
} from "react";
import { Check, ChevronDown } from "lucide-react";

type SelectProps<T extends string> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  id?: string;
  /** Accessible name for the trigger and the option list. */
  ariaLabel?: string;
};

/**
 * Custom single-choice dropdown that matches the FitZone dark theme.
 *
 * A native `<select>` renders its option list with OS styling that clashes
 * with the rest of the UI, so this builds a small combobox on top of a button
 * and a `role="listbox"` menu, with full keyboard support.
 */
export function Select<T extends string>({
  value,
  options,
  onChange,
  id,
  ariaLabel
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const openMenu = (startIndex: number) => {
    setActiveIndex(startIndex);
    setOpen(true);
  };

  const commit = (index: number) => {
    const next = options[index];
    if (next !== undefined && next !== value) onChange(next);
    setOpen(false);
  };

  // Close when the user clicks/taps anywhere outside the dropdown.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const selected = options.indexOf(value);
    openMenu(selected < 0 ? 0 : selected);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (open) {
          setActiveIndex((index) => Math.min(options.length - 1, index + 1));
        } else {
          openMenu(options.indexOf(value) < 0 ? 0 : options.indexOf(value));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) {
          setActiveIndex((index) => Math.max(0, index - 1));
        } else {
          openMenu(options.indexOf(value) < 0 ? 0 : options.indexOf(value));
        }
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) commit(activeIndex);
        else toggle();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`select${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="select-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-activedescendant={
          open ? `${listboxId}-option-${activeIndex}` : undefined
        }
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <span className="select-value">{value}</span>
        <ChevronDown size={16} aria-hidden="true" className="select-chevron" />
      </button>

      {open ? (
        <ul className="select-menu" id={listboxId} role="listbox" aria-label={ariaLabel}>
          {options.map((option, index) => {
            const isSelected = option === value;
            const isActive = index === activeIndex;

            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`select-option${isSelected ? " is-selected" : ""}${
                    isActive ? " is-active" : ""
                  }`}
                  onClick={() => commit(index)}
                  onPointerMove={() => setActiveIndex(index)}
                >
                  <span>{option}</span>
                  {isSelected ? (
                    <Check size={15} aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

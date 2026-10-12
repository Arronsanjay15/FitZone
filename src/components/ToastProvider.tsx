import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { Check, Info, TriangleAlert, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ToastContext,
  type ToastContextValue,
  type ToastTone
} from "../lib/toast";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

const toneIcons: Record<ToastTone, LucideIcon> = {
  success: Check,
  info: Info,
  warn: TriangleAlert
};

const TOAST_LIFETIME = 2800;

/**
 * Lightweight toast queue. Renders transient feedback above the app and
 * exposes `notify` (via {@link import("../hooks/useToast").useToast}) so any
 * component can confirm an action without prop drilling.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback<ToastContextValue["notify"]>(
    (message, tone = "success") => {
      const id = (idRef.current += 1);

      // Keep at most three messages on screen at once.
      setToasts((previous) => [...previous.slice(-2), { id, message, tone }]);

      window.setTimeout(() => dismiss(id), TOAST_LIFETIME);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((toast) => {
          const Icon = toneIcons[toast.tone];

          return (
            <div className={`toast toast-${toast.tone}`} key={toast.id}>
              <span className="toast-icon">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span className="toast-message">{toast.message}</span>
              <button
                type="button"
                className="toast-close"
                aria-label="Dismiss notification"
                onClick={() => dismiss(toast.id)}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

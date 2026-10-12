import { createContext } from "react";

export type ToastTone = "success" | "info" | "warn";

export type ToastContextValue = {
  /** Queue a short feedback message. */
  notify: (message: string, tone?: ToastTone) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

import { useCallback, useEffect, useState } from "react";

/** The non-standard `beforeinstallprompt` event exposed by Chromium browsers. */
type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
};

/** True when the app is already running as an installed PWA. */
function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari exposes this flag instead of the display-mode media query.
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

/** iOS never fires `beforeinstallprompt` — installing goes through the Share sheet. */
function isIosDevice() {
  const agent = window.navigator.userAgent;

  return (
    /iphone|ipad|ipod/i.test(agent) ||
    // iPadOS 13+ reports itself as a desktop Mac, so probe for touch support.
    (agent.includes("Macintosh") && navigator.maxTouchPoints > 1)
  );
}

/**
 * Bridges the browser's install flow so the app can offer its own
 * "Install" control: it captures `beforeinstallprompt` (which Chromium fires
 * when the app becomes installable) and exposes a way to trigger the native
 * prompt. On iOS, where no such API exists, `isIos` signals that the visitor
 * should be shown manual "Add to Home Screen" guidance instead.
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandalone);
  const [isIos] = useState(() => isIosDevice() && !isStandalone());

  useEffect(() => {
    const handleBeforeInstall = (event: Event) => {
      // Suppress Chromium's own mini-infobar so we can present our control.
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstall
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return null;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    return outcome;
  }, [deferredPrompt]);

  return {
    /** Chromium: a native install prompt is queued and ready to show. */
    canPrompt: deferredPrompt !== null,
    /** iOS: only the manual Share-sheet route is available. */
    isIos,
    /** The app already runs as an installed PWA. */
    installed,
    promptInstall
  };
}

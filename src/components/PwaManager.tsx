import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { useToast } from "../hooks/useToast";

/**
 * Owns the service-worker lifecycle for the app shell. It registers the
 * generated service worker, confirms once the app is available offline, and
 * surfaces a small prompt when a freshly downloaded version is waiting to take
 * over — the visitor decides when to reload into it.
 */
export function PwaManager() {
  const { notify } = useToast();

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW();

  // Announce that the app shell has been cached for offline use.
  useEffect(() => {
    if (!offlineReady) return;

    notify("FitZone is ready to use offline", "success");
    setOfflineReady(false);
  }, [offlineReady, notify, setOfflineReady]);

  if (!needRefresh) return null;

  return (
    <div className="pwa-update" role="alert">
      <span className="pwa-update-icon" aria-hidden="true">
        <RefreshCw size={16} />
      </span>

      <div className="pwa-update-copy">
        <strong>Update available</strong>
        <span>A new version of FitZone is ready.</span>
      </div>

      <div className="pwa-update-actions">
        <button
          type="button"
          className="pwa-update-reload"
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </button>
        <button
          type="button"
          className="pwa-update-later"
          onClick={() => setNeedRefresh(false)}
        >
          Later
        </button>
      </div>
    </div>
  );
}

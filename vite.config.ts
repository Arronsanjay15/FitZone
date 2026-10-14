import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

/**
 * FitZone brand surface colour — kept in sync with `--bg` in `src/App.css`.
 * Used for the manifest theme/background and the installed app's status bar.
 */
const THEME_COLOR = "#0a0e0c";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      // A new service worker waits until the visitor taps "Reload" in the
      // in-app update prompt (see src/components/PwaManager.tsx).
      registerType: "prompt",
      // Registration is handled in React, not by an injected script.
      injectRegister: null,
      // The icons in public/ are already precached by the glob patterns below,
      // so skip the plugin's automatic (duplicate) manifest-icon entries.
      includeManifestIcons: false,

      manifest: {
        name: "FitZone — Workout Planner & Tracker",
        short_name: "FitZone",
        description:
          "Plan, learn, and complete guided workouts — offline. 48 exercises, a 30-day challenge, and progress tracking saved right on your device.",
        id: "/",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui"],
        orientation: "portrait-primary",
        theme_color: THEME_COLOR,
        background_color: THEME_COLOR,
        lang: "en",
        dir: "ltr",
        categories: ["health", "fitness", "lifestyle", "sports"],
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        // Long-press app-icon shortcuts on Android / desktop.
        shortcuts: [
          {
            name: "Plan a workout",
            short_name: "Planner",
            description: "Generate a fresh workout plan.",
            url: "/#planner",
            icons: [
              { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" }
            ]
          },
          {
            name: "Exercise library",
            short_name: "Exercises",
            description: "Browse all 48 exercises.",
            url: "/#exercises",
            icons: [
              { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" }
            ]
          },
          {
            name: "Workout history",
            short_name: "History",
            description: "Review your finished sessions.",
            url: "/#history",
            icons: [
              { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" }
            ]
          }
        ]
      },

      workbox: {
        // Precache the built app shell and all local media.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,woff2}"],
        // Single-page app: any in-app navigation resolves to the app shell.
        navigateFallback: "index.html",
        // Reserved for future server routes that must reach the network.
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          // Inter (index.html) — refreshed in the background.
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" }
          },
          // Font files — effectively immutable.
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Demonstration photos from the open Free Exercise DB dataset.
          {
            urlPattern:
              /^https:\/\/(cdn\.jsdelivr\.net|raw\.githubusercontent\.com)\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "exercise-photos",
              expiration: { maxEntries: 160, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // YouTube poster frames used on cards.
          {
            urlPattern: /^https:\/\/(i\.ytimg\.com|img\.youtube\.com)\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "youtube-thumbnails",
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },

      // Lets the PWA be exercised from `npm run dev` (writes to dev-dist/).
      devOptions: {
        enabled: true,
        type: "module",
        // The dev service worker only precaches the entry, which makes the
        // glob patterns below warn as "no match" — that is expected here.
        suppressWarnings: true
      }
    })
  ]
});

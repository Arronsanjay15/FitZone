import {
  defineConfig,
  minimal2023Preset
} from "@vite-pwa/assets-generator/config";

/**
 * Configuration for `@vite-pwa/assets-generator`.
 *
 * Run `npm run generate-pwa-assets` to (re)create every PWA icon in `public/`
 * from the single brand source `public/favicon.svg`. The maskable and
 * Apple variants are padded with the app's dark surface colour so the artwork
 * blends into the OS-provided mask instead of showing a white ring.
 */

/** Matches `--bg` in `src/App.css` so the icons sit on the app's own surface. */
const THEME_COLOR = "#0a0e0c";

export default defineConfig({
  headLinkOptions: {
    preset: "2023"
  },
  preset: {
    ...minimal2023Preset,
    // Standard icons keep the rounded-square artwork (no padding, alpha kept).
    transparent: {
      ...minimal2023Preset.transparent,
      padding: 0
    },
    // Maskable icons need a safe zone, so the mark is inset and the padding
    // filled with the brand background.
    maskable: {
      sizes: [512],
      padding: 0.12,
      resizeOptions: { fit: "contain", background: THEME_COLOR }
    },
    // Apple touch icons are always square and masked by iOS itself.
    apple: {
      sizes: [180],
      padding: 0,
      resizeOptions: { fit: "contain", background: THEME_COLOR }
    }
  },
  images: ["public/favicon.svg"]
});

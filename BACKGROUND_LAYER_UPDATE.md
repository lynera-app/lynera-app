# Lynera v19 background-layer update

This update replaces the Home hero's CSS background rendering with a dedicated, absolutely positioned image layer. The source portrait image had no vertical overflow under `background-size: cover`, so changing `background-position-y` did not visibly move it on the iPhone layout.

Changed files:
- `src/screens/Home.tsx`: adds the existing aurora image as a decorative background layer.
- `src/styles.css`: positions the background layer with an explicit vertical offset while leaving all foreground layout unchanged.
- `public/sw.js`: increments the PWA cache to `lynera-v19`.

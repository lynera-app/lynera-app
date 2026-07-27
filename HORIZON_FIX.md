# Lynera v21 horizon fix

This update uses a deterministic image layer instead of `background-size: cover` positioning.

Changed files:
- `src/assets/aurora-home.png` — restored the original unzoomed aurora/lake asset.
- `src/styles.css` — final `!important` override renders the image at exactly the hero width, positions it with a fixed mobile top offset, and fades its top and bottom edges.
- `public/sw.js` — cache version increased to `lynera-v21`.

No foreground layout, text, arc, cards, data, prediction, calendar, or privacy logic was changed.

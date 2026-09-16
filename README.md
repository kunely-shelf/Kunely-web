# Kunely — web

Landing page for [Kunely](https://github.com/kunely-shelf), a reading app for iOS and Android.

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no framework — open `index.html` in a browser and it runs.

## Structure

```
index.html            the page
assets/css/style.css  design tokens and layout
assets/js/i18n.js     translations and the ES/EN toggle
assets/img/           brand assets, light and dark variants
```

## Conventions

**Colours come from the design system, never invented here.** `assets/css/style.css` mirrors the Kunely palette — Reading Chair (light) and Butaca (dark) — as CSS custom properties taken from `src/shared/theme/colors.ts` in the app repository. The upstream source is the `Vellum Design System` project on claude.design. If a colour needs changing, it changes there first and is resynced here; do not patch a hex locally.

**There are no greys.** Muted text and borders are low-opacity tints of the palette's own ink (light) or blush (dark). A neutral grey anywhere is a bug.

**Both themes are first-class.** The page follows `prefers-color-scheme`, and every brand asset has a dark variant swapped through `<picture>`. The favicon carries its own `prefers-color-scheme` block instead, since it renders outside the page. Check both before shipping a change.

**Brand assets are vectors.** The mark, wordmark and favicon are SVG, so they stay sharp at any size and on any display. Two PNGs survive on purpose: `og-image.png`, because social scrapers do not render SVG, and `favicon.png`, as a fallback for browsers without SVG favicon support. Do not reintroduce a raster mark or wordmark.

**Every visible string lives in `i18n.js`.** The Spanish copy also ships in the markup as the no-JavaScript fallback, so a string added to one dictionary has to be added to the other and to the HTML.

**Motion respects `prefers-reduced-motion`**, matching the app.

## Running it

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Opening the file directly over `file://` also works, but a server is closer to how it will be served.

## Publishing

Not published yet. GitHub Pages serves from a repository's default branch, and on a free plan **the repository has to be public** for Pages to work at all.

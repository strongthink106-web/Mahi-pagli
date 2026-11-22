# The Mahi Edition — A Little World of Wonder

A Bengali-first, seven-page birthday keepsake made for Mahi. The experience uses an editorial visual system: warm paper tones, botanical vector artwork, thoughtful typography, clear page navigation and small interactions.

## Seven real pages
1. `index.html` — Welcome / opening note
2. `wishes.html` — Six tap-to-reveal wishes
3. `letter.html` — A birthday letter
4. `memories.html` — Three original vector-illustrated keepsakes
5. `garden.html` — Plant a flower with each tap
6. `cake.html` — Turn birthday candles off and on
7. `finale.html` — Final birthday wish and user-triggered celebration

## Navigation and themes
- Each chapter is a separate HTML page, not a hidden panel in one document.
- Desktop has all seven navigation links. Mobile has an Explore menu and a persistent previous / chapter switcher / next dock.
- All page changes are ordinary HTML links; primary navigation works without JavaScript.
- The day/night theme is optional and remembered in the current browser when storage is available.
- No music, autoplay, backend, database, API key, analytics or form submission.

## Accessibility and performance
- Semantic landmarks, skip link, visible keyboard focus, native links and disclosure control.
- Reduced-motion preference is respected.
- Mobile controls use comfortable touch sizes.
- Original inline SVG artwork keeps image weight low.
- Progressive cross-document View Transitions are enabled only where supported; navigation remains ordinary HTML links in unsupported browsers.
- Cross-document View Transitions are progressive enhancement only; ordinary document navigation remains the fallback.
- Google Fonts are optional and have local font fallbacks.

## Publish
1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/(root)`, then save.
4. GitHub Pages automatically builds and publishes each new commit on `main`.
5. Verify the latest **pages build and deployment** run in the Actions tab.
6. Expected URL: `https://strongthink106-web.github.io/Mahi-pagli/`

The repository's native GitHub Pages deployment has been verified successfully. The redundant custom deployment workflow has been removed to keep publishing to one reliable path.

## Editing
Page text is stored in each individual HTML file. Shared styling and behaviour are in:
- `assets/app.css`
- `assets/app.js`


## Release notes
- Replaced the original one-document chapter panels with seven separately addressable HTML pages.
- Added mobile-first chapter switching, day/night mode, interactive wish cards, a growing garden, candle controls and a finale celebration.
- Added a pre-deploy validation step and removed the obsolete single-page CSS/JavaScript assets.

# The Mahi Edition — The Art of a Beautiful Moment

A Bengali-first seven-page birthday keepsake with a cinematic dusk palette, a bespoke floral illustration, editorial typography and small interactions designed to feel calm, warm and personal.

## Experience map
1. `index.html` — A cinematic opening and a note before the journey
2. `wishes.html` — Six constellation-inspired wishes that unfold on tap
3. `letter.html` — An interactive sealed envelope and a personal letter
4. `memories.html` — Four illustrated moments, composed as an editorial collection
5. `garden.html` — A growing wish garden; each tap plants a bloom
6. `cake.html` — A custom layered cake and candle interaction
7. `finale.html` — A warm, cinematic closing and a user-triggered celebration

## Design system
- Default palette: deep aubergine, warm near-black, muted rose, champagne, pearl and restrained eucalyptus.
- Optional light theme for a softer paper-like reading mode.
- Typography: Cormorant Garamond for expressive display, Hind Siliguri for Bengali text, DM Sans for interface labels.
- Shared page navigation, responsive menu, progress indicator and page transitions.
- Motion is restrained and the reduced-motion preference is respected.

## No media feature
This experience intentionally contains no music or autoplay. The artwork is original SVG/CSS; there are no external stock photo dependencies.

## Accessibility and performance
- Semantic landmarks, skip link, page titles, Bengali language declaration and visible keyboard focus.
- Functional links and native disclosure elements.
- Touch-friendly mobile controls.
- No framework, database, analytics, API key or server required.
- Core interactions degrade gracefully if JavaScript is unavailable; direct page links remain usable.

## Publish
GitHub Pages is published from the `main` branch at the repository root. The expected URL is:
`https://strongthink106-web.github.io/Mahi-pagli/`

## Editing
- Each page has its own HTML file.
- Shared design tokens and responsive styling: `assets/mahi.css`
- Shared interactions: `assets/mahi.js`
- Hero artwork: `assets/mahi-bloom.svg`

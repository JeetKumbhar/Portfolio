# Visual refinement R1 (revised Phase 1)

Requested by Jeet after reviewing the first Phase 1 delivery: the result felt like a basic dark template.
No content was changed or added. Phase 2 (WebGL hero) was not started.

## Changes

| Area | Before | After |
|---|---|---|
| Hero name | Up to 144 px, wide, line-height 0.9 | Up to 92 px, slightly condensed (width axis 86%), weight 650, line-height 0.95, tracking -0.03em |
| Hero visual | Flat CSS gradient circle with one orbit line | Static SVG scene: glass sphere with rim-light crescent and terminator shading, multi-ring system passing behind and in front of the sphere, moons, procedural star field, layered ridgeline lit from above, film grain, vignette |
| Composition | Text vertically centred beside a giant circle | Title-card layout: text bottom-left, planet right of centre (above the text on mobile), light from the planet falls on the ridges, quiet "Scroll" cue bottom-right |
| Navigation | Full-width bordered bar | Floating glass elements: monogram ring, centred pill nav with soft active state, Resume pill; mobile uses a rounded sheet with large display-font links |
| Buttons | Flat violet / outlined | Gradient primary with inner highlight and glow, glass ghost, arrow and download icons that respond to hover |
| Sections | Plain | Hairline-led headings, skill tags, ambient violet light, framed portrait placeholder, numbered project rows, Contact closes on the same ridgeline as the hero |
| Motion | None | One short load-in (fade and rise), switched off by the global reduced-motion rule |

## Notes

- Everything is static SVG and CSS. No Three.js or R3F is used yet. `Planet.jsx` becomes the no-WebGL fallback in Phase 2.
- Ridges and stars are generated deterministically from seeds in `src/components/scene/procedural.js`: no runtime randomness, no layout shift.
- The display font now loads Bricolage Grotesque's width axis (`wdth.css`): the Latin file grew from about 41 kB to about 78 kB. No new dependency.
- Fixed during this refinement: a lighter box at the top of Contact caused by the grain overlay, and a doubled anchor offset (scroll-margin plus scroll-padding).

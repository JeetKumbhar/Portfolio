# Phase 2 notes: visual foundation and hero

## What was built

- **Live 3D hero (React Three Fiber, procedural, no model files).** Dark glass planet, three fine rings with real front/back occlusion, three orbiting moons, a lit-edge crescent and atmosphere (small custom shaders), seeded drifting dust, studio reflections from a generated environment map (no network request).
- **Scroll reveal (GSAP ScrollTrigger), large screens with motion allowed only.** The hero section is 165svh tall and its stage is `position: sticky`. Scroll progress drives: camera dolly and tilt, ridgeline parallax, star drift, text drift and hand-off. After 0.65 viewport heights the stage releases and the page scrolls on normally. Nothing intercepts wheel, touch or keyboard.
- **Fallback ladder** (`src/hooks/useSceneTier.js`):

| Situation | What renders |
|---|---|
| Large screen, WebGL available | `full`: 420 particles, pixel ratio up to 1.5, MSAA, pointer parallax, scroll dolly |
| Small screen or tablet, WebGL available | `lite`: 150 particles, pixel ratio up to 1.25, no MSAA, no pointer parallax, no scroll scrub, normal one-screen hero |
| No WebGL, data-saver on, WebGL context lost, or the 3D chunk fails to load | The static SVG planet from revision R1. On large screens it is scaled by the same scroll scrub |
| `prefers-reduced-motion: reduce` | Static SVG planet only. No 3D download, no tall hero, no scroll scrubbing, no load-in animation |

- **Loading.** The static SVG planet is always rendered first and is the poster. The 3D code is a separate chunk fetched after the page loads and the browser is idle, then cross-fades over the poster once its first frames render.
- **Pausing and adaptive quality.** Rendering stops when the hero is off-screen. If early frames are slow, the pixel ratio drops to 1 once.
- **Accessibility.** The canvas is inside an `aria-hidden` decorative layer, is not focusable, and has `pointer-events: none`. The heading, role, tagline and CTAs are ordinary HTML and unchanged. Tab order is unchanged.

## Files

Added: `src/components/three/{HeroScene,HeroVisual,Particles,WebGLBoundary}.jsx`, `src/components/three/shaders.js`, `src/hooks/useSceneTier.js`, `src/lib/capabilities.js`, `src/lib/heroProgress.js`.
Modified: `src/components/sections/Hero.jsx`, `src/styles/base.css` (grain no longer uses a blend mode), `README.md`.
Removed: `src/components/three/.gitkeep` (folder is no longer empty).
No dependency changes: `three`, `@react-three/fiber` and `gsap` were already installed.

## Known limitations and honest notes

- **Real 3D frame rate was not measured.** The only WebGL available in my test environment was CPU software rendering (about 1 fps), so it cannot tell us how the scene performs on a real GPU. Please open the site on your own machine and phone, and tell me if it feels smooth. Phase 8 will measure properly.
- **Bundle size.** The main bundle grew from about 242 kB to about 363 kB (75 kB to 123 kB gzip) because GSAP and ScrollTrigger are now used. The lazy 3D chunk is about 926 kB (245 kB gzip), mostly three.js; React Three Fiber does not tree-shake it well. It does not block first paint, but it is a download on phones too. Phase 8 will look at reducing it.
- **Console warning.** `THREE.Clock: This module has been deprecated` appears once at startup. It comes from the installed React Three Fiber 9.8.2 (the app does not reference `Clock`). It is harmless today; it would be fixed by a future library update.
- **Hero scroll length.** On large screens the hero adds 0.65 viewport heights of scroll before About. If you find that too long or too short, it is one value (`motion-safe:lg:h-[165svh]` in `Hero.jsx`).
- The planet's look is tuned by eye in a software renderer. Colors and reflections may read slightly differently on real displays.

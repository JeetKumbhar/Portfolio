# Jeet Kumbhar: Developer Portfolio

A dark, cinematic personal portfolio for Jeet Kumbhar, Full Stack Developer.

> **Status: Phase 2 of 10 complete (visual foundation and 3D hero).**
> About content, project showcase, contact links and resume are built in later phases.
> Placeholders are marked in the UI and listed in `PHASE_DELIVERY_NOTES.md`.

The implementation plan is `PORTFOLIO_PLAN.md`. Progress is tracked in `PROJECT_PROGRESS.md`.

## Stack

React 19, Vite, plain JavaScript (no TypeScript), Tailwind CSS v4, GSAP + ScrollTrigger, Three.js + React Three Fiber.
GSAP drives the hero scroll reveal; Three.js / React Three Fiber render the hero planet (lazy-loaded, with a static SVG fallback).
Fonts (Bricolage Grotesque with its width axis, Hanken Grotesk) are self-hosted via Fontsource.

## Requirements

Node.js `^20.19.0` or `>=22.12.0`, and npm.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (`npm ci` for a clean, lockfile-exact install) |
| `npm run dev` | Start the dev server |
| `npm run build` | Produce the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

Repository: https://github.com/JeetKumbhar/Portfolio

## Language

The whole project is plain **JavaScript**: components are `.jsx`, everything else is `.js`. There is no TypeScript.
Standing rules for every phase are in `docs/PROJECT_RULES.md`.

## Project structure

```text
jsconfig.json      lets your editor understand the "@/" import alias
public/            static files (images, icons, models, resume)
src/
  components/
    layout/        Container, Section, SectionHeading, SkipLink, Footer
    navigation/    Header (desktop nav and mobile menu)
    sections/      Hero, About, Skills, Projects, Contact
    projects/      reserved for the Phase 4 showcase
    scene/         static SVG art: Planet (3D poster and fallback), Horizon, Stars
    three/         3D hero: HeroVisual (tiering, lazy load, fallback), HeroScene, shaders, particles
    ui/            ButtonLink, PendingAction, Placeholder
  data/            all editable content (profile, skills, projects, links, navigation)
  hooks/           useMediaQuery, useReducedMotion, useActiveSection, useSceneTier
  lib/             gsap.js, motion.js, capabilities.js (WebGL probe), heroProgress.js
  styles/          tokens.css (design tokens), base.css, index.css
  docs/              Phase 0 blueprint, decisions, visual refinement and Phase 2 notes
```

## Editing content

All content lives in `src/data/`. A link field in `links.js` that is `undefined` is not rendered.
Only put verified values there. Never commit passwords, tokens, API keys or `.env` files.

## Design tokens

Colors, fonts, type scale, radii, breakpoints and easing are defined once in `src/styles/tokens.css`
and become Tailwind utilities (for example `bg-bg`, `text-ink`, `text-display`, `rounded-pill`).
Breakpoints: `xs` 480, `md` 768, `lg` 1024, `xl` 1440, `2xl` 1920.

## Hero 3D and fallbacks

See `docs/PHASE_2_NOTES.md`. Large screens get the full scene and a sticky scroll reveal; small screens get a lighter scene with no scroll scrubbing; no WebGL, data-saver or reduced motion get the static SVG planet.

## Accessibility baseline

Skip link, semantic landmarks, one `h1`, keyboard-operable navigation with visible focus,
44px minimum touch targets, and `prefers-reduced-motion` support (smooth scrolling is only enabled
when motion is allowed). Anchor navigation is native and never waits on animation.

## Deployment

Not configured. Deployment requires Jeet's explicit approval (Phase 10).

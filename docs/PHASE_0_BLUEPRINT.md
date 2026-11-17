# Phase 0 Blueprint — Jeet Kumbhar Portfolio

> **Superseded in part (historical document).** After this blueprint was written, Jeet decided the project is
> **JavaScript only** (`.js` / `.jsx`, no TypeScript) and changed the ZIP policy. Wherever this document says
> TypeScript, `.ts`, `.tsx`, `tsc` or a typecheck step, read it as plain JavaScript. See `docs/PROJECT_RULES.md`
> and `docs/DECISIONS.md` for the current rules.

Status: planning only. No application code, scaffold, or dependencies exist yet.
Source of truth: `PORTFOLIO_PLAN.md`. Visual direction: the supplied reference board image.

---

## 1. Repository confirmation

I cannot access GitHub from this environment, so I cannot independently verify the repo is empty.
Working assumption (per plan §1.2): Jeet created a brand-new empty repository, and Phase 1 will be extracted into its root.
**Jeet to confirm:** the repo is empty, and its name (suggested: `portfolio`).

---

## 2. Reference image vs. plan — conflicts and how I will resolve them

The plan outranks the image where they differ. Items needing Jeet's decision are listed in §13.

| Reference image shows | Plan says | Proposed resolution |
|---|---|---|
| "2+ Years Experience", "10+ Projects Completed", "∞ Curiosity Forever" stat strip | §1.7, §3, §8: no fake statistics or unverified metrics | **Omit** the stat strip. If Jeet wants a stat row, only confirmed, countable facts (e.g. number of projects actually shown). |
| Photographic portrait of a young man | §3: only a real portrait supplied and approved by Jeet; never a generated/stock face | Use the image's portrait **for layout only**. Ship a neutral placeholder until Jeet supplies a real photo. If that image is Jeet, he can send the original. |
| Hero reads "Hi, I'm Jeet Kumbhar" | §3 hero title is **JEET KUMBHAR** | Follow the plan: large JEET KUMBHAR title. Greeting line optional, Jeet decides. |
| Nav: Home, Projects, About, Skills, Contact + "Download CV" | §3 nav: About, Skills, Projects, Contact, Resume | Follow plan order and labels; the logo returns to top. |
| CTAs "View My Work" / "Download Resume" | §3: **Explore My Work** / **Download Resume** | Use plan wording. |
| Supporting line "Building digital experiences, one idea at a time." | §3: short authentic line, to be finalized with Jeet | Treated as a **draft placeholder**, not final copy. |
| Skills grid with GSAP, Three.js, Next.js, Tailwind, Git, etc. | §3: only technologies Jeet confirms | Skill list is a **placeholder** pending confirmation (Next.js and others are not in the plan's project inventory). |
| Project card "WanderLust" mock screenshot and "Live Demo / View Code" | §3, §4: genuine previews only, verified actions | Placeholder previews until real screenshots and verified URLs exist. Buttons render only when a URL is verified. |
| 3D laptop in Skills, 3D door/figure in Contact | §3: 3D only in hero and project showcase; Skills and Contact stay clean | **No 3D in Skills/Contact.** Use CSS/SVG-based atmosphere (gradient glow, subtle horizon light) for Contact instead. |
| Planet-with-rings hero object over a mountain horizon | §3: one sculptural focal object, studio lighting, particles | Keep the **ringed sphere concept**: it is on-brief. Built procedurally in R3F with no external model. |
| "Fully Responsive / Optimized Performance" checklist | §7 | Treated as acceptance criteria, measured not claimed. |

---

## 3. Technology decisions

| Concern | Decision | Reason |
|---|---|---|
| Framework | React + Vite | Plan §5 |
| Language | TypeScript (strict) | Plan §5 preference; safer data-driven content |
| Styling | Tailwind CSS v4 with CSS variables as the token layer | Fast, consistent; tokens stay in one `tokens.css` |
| Animation | GSAP + ScrollTrigger (via `@gsap/react` `useGSAP` for cleanup) | Plan §5; automatic revert on unmount |
| 3D | `three` + `@react-three/fiber`; `@react-three/drei` only for specific helpers (e.g. `Environment`, `Float` only if needed) | Plan §5; keeps bundle lean |
| Smooth scroll (Lenis) | **Not included.** Re-evaluate in Phase 6 only if native scrolling feels flat and a11y stays intact | Plan §5: "only if justified"; avoids scroll-hijack risk |
| Fonts | Self-hosted via `@fontsource-variable/*` | No third-party font requests; better privacy and performance |
| Routing | None (single page with anchor sections) | Plan §5: no backend, simple site |
| Lint / format | ESLint + TypeScript `tsc --noEmit` | Plan §11 |
| Backend | None | Plan §5. Contact uses `mailto:` and verified links; no form service unless Jeet approves. |

Exact versions will be resolved and pinned (via lockfile) in Phase 1 after a real `npm install`; I will not guess version numbers here.

---

## 4. Project structure (refined from plan §9)

```text
portfolio/
├── public/
│   ├── images/          # optimized WebP/AVIF project + portrait assets
│   ├── icons/           # favicon set
│   └── resume/          # Jeet's approved PDF (supplied later)
├── src/
│   ├── components/
│   │   ├── layout/      # Container, Section, SectionHeading, SkipLink
│   │   ├── navigation/  # Header, MobileMenu, NavLink
│   │   ├── sections/    # Hero, About, Skills, Projects, Contact
│   │   ├── projects/    # ProjectStage (desktop), ProjectList (mobile), ProjectPreview
│   │   ├── three/       # HeroScene, HeroObject, Particles, WebGLBoundary
│   │   └── ui/          # Button, ExternalLink, Placeholder
│   ├── data/            # profile.ts, skills.ts, projects.ts, links.ts (single edit point)
│   ├── hooks/           # useReducedMotion, useMediaQuery, useWebGLSupport, useActiveSection
│   ├── lib/             # gsap.ts (plugin registration), motion.ts (durations/easings)
│   ├── styles/          # tokens.css, base.css, utilities.css
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── docs/                # blueprint and decision records
├── PORTFOLIO_PLAN.md
├── PROJECT_PROGRESS.md
├── PHASE_DELIVERY_NOTES.md
├── DELETE_FILES.txt
└── README.md
```

Deviation from plan §9: added `components/three/` and `docs/`, since the 3D code should be isolated so it can be lazy-loaded as one chunk.

---

## 5. Component architecture

- **`App`**: skip link, `Header`, `<main>` containing sections in order, footer. Hero's 3D scene is `React.lazy` loaded.
- **`Section`**: semantic `<section>` with `id`, `aria-labelledby`; the single place that owns vertical rhythm.
- **`Header`**: sticky, anchor links, active-section highlight (IntersectionObserver), mobile menu as an accessible disclosure (button with `aria-expanded`, focus management, Esc to close). Never blocked by animation.
- **`Hero`**: text layer (always real HTML, readable with no JS animation) + `HeroScene` canvas layer behind it (decorative, `aria-hidden`).
- **`HeroScene`**: `Canvas` with `frameloop="demand"` when off-screen or reduced motion; ringed glass/metal sphere, 2 rim lights + environment, a small particle field; DPR capped.
- **`WebGLBoundary`**: error boundary plus capability check; renders the static fallback (pre-rendered image or CSS gradient orb) if WebGL is missing or crashes.
- **`Projects`**: reads `projects.ts`. Desktop ≥1024px with motion allowed: `ProjectStage`. Otherwise: `ProjectList`. Both consume the same data, so content never diverges.
- **`ProjectStage`**: staged, scroll-driven sequence with a visible index (e.g. 1 / N), prev/next controls and project jump links. Implemented with sticky positioning plus ScrollTrigger scrub rather than hijacking scroll; keyboard users can jump directly.
- **`Contact`**: closing statement, verified links only.

Data-driven: every piece of copy, link and project lives in `src/data/*`. A field flagged `placeholder: true` renders a visible dev-only marker and blocks Phase 9 sign-off.

---

## 6. Design tokens (proposed)

Colors (all contrast-checked against the base in Phase 7):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#07060B` | page background (deep violet-tinted black) |
| `--surface` | `#0E0C16` | raised panels |
| `--line` | `rgba(243,239,232,0.10)` | borders, dividers |
| `--ink` | `#F3EFE8` | primary text (warm white) |
| `--ink-muted` | `#A7A2B3` | secondary text |
| `--violet` | `#7C5CFF` | primary accent |
| `--blue` | `#3D7BFF` | secondary accent (used sparingly, in gradients with violet) |
| `--glow` | `rgba(124,92,255,0.35)` | controlled glow only on focal elements |

Rules: one accent moment per viewport; no rainbow gradients; glow is limited to the hero object, primary CTA and focus rings.

Radius: small scale (4 / 10 / 999px); not one radius for everything.
Spacing: 4px base scale; section padding fluid via `clamp()`.
Breakpoints: 480 / 768 / 1024 / 1440 / 1920 (covers mobile, tablet, laptop, wide desktop).
Content widths: text max ~65ch; layout container up to ~1280px; hero and showcase may go full-bleed.
Focus: 2px violet-blue outline with offset, always visible, never removed.

## 7. Typography (proposal, needs Jeet's approval)

- **Display:** Bricolage Grotesque (variable): expressive width/optical axes, oversized headings with character, distinct from the common default sans.
- **Body/UI:** Hanken Grotesk (variable): calm, highly legible, pairs cleanly as a quieter partner.
- Fluid type scale with `clamp()`; display roughly 3.5rem → 9rem; body 1rem–1.125rem at 1.6 line-height; headings tight-tracked (about −0.02em).
- Plain sentence case for UI labels; avoid ALL-CAPS eyebrow labels except the plan-mandated closing line **LET'S BUILD SOMETHING GREAT.**, which can be set in display type.
- Fonts subset to Latin and `font-display: swap`.

---

## 8. Motion strategy

Principles: motion explains hierarchy; content is complete without it; no scroll hijacking; one signature moment per major section, not scattered fades.

| Area | Desktop (motion allowed) | Mobile / reduced motion |
|---|---|---|
| Hero | Name reveals by line/mask on load; object rotates slowly; scroll scrubs camera dolly and object tilt while text fades up out of the way. Hero is a tall section with a **sticky** stage, not a scroll-locking pin. | Static composition, short fade-in, gentle idle only if not reduced; reduced motion = no motion at all |
| About | Minimal: one restrained text reveal; portrait sits still | No animation |
| Skills | Grouped lists appear once; hover states only | Immediate display |
| Projects | Staged scrub sequence, active project crossfades, index updates | Vertical cards, one fade-in each |
| Contact | One closing reveal of the statement | Immediate display |

Implementation rules:
- `gsap.matchMedia()` gates desktop vs. mobile vs. reduced-motion variants; contexts reverted on unmount.
- `ScrollTrigger.refresh()` after fonts and images load; `invalidateOnRefresh` for scrubs.
- Shared durations/easings in `lib/motion.ts`; nothing hard-coded in components.
- Anchor navigation uses native smooth scroll (disabled under reduced motion); animations never delay navigation.

## 9. 3D strategy and fallback ladder

- Hero object is **procedural** (sphere + tilted ring geometry, glass/metal `MeshPhysicalMaterial`) — no model file, so no download cost. `public/models/` stays empty unless a justified asset arrives.
- Performance guards: DPR capped (~1.5 desktop, ~1 on mobile), limited particles (a few hundred), pause rendering when hero is off-screen, no expensive transmission passes on low-power devices.
- Fallback ladder: (1) full WebGL scene → (2) simplified scene on small/low-power screens → (3) static image/CSS orb if WebGL is unavailable or errors → (4) reduced-motion: static render, no loop.
- Project showcase 3D (plan §3) is **optional enhancement**: a light tilt/parallax of preview planes. It is decided in Phase 4 only if it clarifies rather than decorates, and must never obscure the real screenshots.
- No 3D in About, Skills, Contact.

---

## 10. Content data model (Phase 1 will create typed files)

```ts
Project {
  id, name, summary, contribution, stack[], status,
  previewImage?: { src, alt }, liveUrl?, repoUrl?,
  note?,                 // e.g. "Recreation of an existing site"
  verified: boolean,     // links/features verified by Jeet
  placeholder: boolean
}
SkillGroup { label, items[{ name }] }   // no levels, no percentages
Profile    { name, role, tagline, bio[], education?, portrait? }
Links      { email?, github?, linkedin?, resume? }   // undefined = not rendered
```

Missing links render nothing (or a clearly marked dev placeholder), never a dummy URL.

---

## 11. Assets and inputs Jeet must supply (by when)

| Needed | Phase |
|---|---|
| Confirmation: repo is empty, repo name | before Phase 1 |
| Approval of fonts and palette | before Phase 2 (or now) |
| Final tagline / supporting line wording | Phase 2 |
| Real portrait (original photo, optional crops) | Phase 3 |
| Confirmed bio facts and which education details are public | Phase 3 |
| Confirmed skill list, grouped | Phase 3 |
| Per-project: real screenshots, verified live/repo URLs, accurate feature list, Jeet's actual contribution | Phase 4 |
| Written client permission for Pratik Shelke Photography branding/screenshots (public-facing only) | Phase 4 |
| Confirmed email, GitHub, LinkedIn URLs | Phase 5 |
| Current resume PDF | Phase 5 |
| Domain/hosting preference and approval | Phase 10 |

Never send passwords, tokens, keys, or customer data.

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| 3D hurts mobile performance or battery | Capped DPR, simplified mobile scene, off-screen pause, real device-size testing, static fallback |
| ScrollTrigger conflicts, pinning jank, layout shift | Sticky over hard pin, `matchMedia`, refresh after assets load, fixed image aspect ratios |
| Scroll trap / hijack | No wheel interception, no Lenis initially, always provide direct nav |
| Heavy JS bundle from three + R3F | Lazy-load the 3D chunk, tree-shake imports, minimal drei usage, measure in Phase 8 |
| Placeholder content leaks into release | Typed `placeholder` flag, visible dev marker, Phase 9 blocker check, grep in release checks |
| Fabricated claims creep in from the reference image | Conflict table in §2; stats strip and portrait removed |
| Client confidentiality (photography site) | Public-facing screenshots only; written permission first |
| Dependency drift or incompatible versions | Pin via lockfile from a real install in Phase 1; verify build in a clean install |
| Usage limit interrupts work | `PROJECT_PROGRESS.md` checkpointing per plan §2 |

I cannot render or visually review a browser here until the app exists. In later phases I will run builds, and where tooling permits, headless screenshot checks. Anything I could not run will be marked "not run" in the delivery notes.

---

## 13. Open questions for Jeet

1. **Repo:** confirm it is the empty repo; what is it called?
2. **Typography and palette:** approve Bricolage Grotesque + Hanken Grotesk and the violet/blue palette in §6, or request changes.
3. **Hero wording:** plan says title **JEET KUMBHAR**; the image says "Hi, I'm Jeet Kumbhar." Keep the greeting or not? What is the supporting line?
4. **Stat strip:** confirm it is removed; or give verifiable facts to show.
5. **Portrait:** is the face in the reference image you? If so, send the original photo for Phase 3.
6. **Skills:** which technologies are you confident listing? (e.g., React, Node.js, Express, MongoDB, TypeScript/JavaScript, GSAP, Three.js, Tailwind, Git. Next.js appears in the image but not in the plan.)
7. **Projects:** which of the five (+ optional Simon Says) go in the final selection, and in what order?
8. **Education:** may the BE IT / Universal College of Engineering / May 2026 line be public? (CGPA stays private unless you say otherwise.)
9. **Role title:** confirm "Full Stack Developer" (vs. MERN Stack Developer) for the hero.
10. **Package manager:** npm (plan lists `package-lock.json`). OK?

---

## 14. Phase roadmap and verification focus

| Phase | Deliverable | ZIP | Key checks |
|---|---|---|---|
| 0 | This blueprint + progress docs | Planning-only | Docs present, no code |
| 1 | Scaffold, tokens, shell, responsive nav | **Full project** | clean install, dev server, build, lint, tsc, no horizontal overflow |
| 2 | Hero + 3D + fallback | Delta | WebGL-off test, reduced motion, no scroll trap, key viewport sizes |
| 3 | About + Skills | Delta | Content truth review, responsive layout |
| 4 | Projects | Delta | Link verification, mobile sequence, no private data |
| 5 | Contact + resume | Delta | Links/resume open, no invented details |
| 6 | Motion polish | Delta | Reduced-motion complete, no scroll lock |
| 7 | Responsive + a11y audit | Delta | Keyboard, contrast, focus, touch targets |
| 8 | Performance + SEO | Delta | Real measurements only; build, metadata |
| 9 | Final content + release | Delta | No placeholders, claims verified, README |
| 10 | Deployment (only if approved) | Final | HTTPS URL, desktop/mobile check |

Every phase ZIP includes `PHASE_DELIVERY_NOTES.md`, `PROJECT_PROGRESS.md`, and `DELETE_FILES.txt`.

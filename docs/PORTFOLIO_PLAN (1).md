# PORTFOLIO_PLAN.md
## Jeet Kumbhar — Personal Developer Portfolio

This is the implementation brief for Claude. The project starts from a brand-new, empty repository created by Jeet. There is no existing application to inspect or preserve.

## 1. Non-negotiable instructions for Claude

1. Read this entire plan before starting and reread the relevant sections at each phase.
2. Start from the empty repository. Do not assume existing code, assets, configuration, or deployment.
3. Work one phase at a time. Stop after each phase and wait for Jeet's explicit approval before beginning the next.
4. Phase 0 is planning only: do not scaffold the app, install dependencies, or write application source code.
5. Every completed phase must produce a downloadable, verified ZIP. A GitHub push is not a substitute for ZIP delivery.
6. Never claim a phase or verification is complete unless it was actually completed and checked.
7. Never invent experience, clients, testimonials, metrics, project features, achievements, contact details, or URLs.
8. Never include credentials, tokens, API keys, `.env`, private customer data, booking data, or admin-only screenshots.
9. Never silently delete or rename files. Record exact project-root-relative paths in `DELETE_FILES.txt`.
10. Keep the site usable without animation. Support reduced motion, keyboard access, mobile layouts, and WebGL fallback.
11. Do not deploy publicly, buy services, configure a domain, or make irreversible external changes without Jeet's approval.

### Required ZIP delivery rules

- Phase 1: deliver a **FULL PROJECT ZIP** containing the initial scaffold.
- Later phases: normally deliver **DELTA PATCH ZIPs** containing only added/modified files plus required delivery documents. Preserve paths relative to project root.
- Every phase ZIP must include `PHASE_DELIVERY_NOTES.md` and the updated `PROJECT_PROGRESS.md`.
- Include `DELETE_FILES.txt` when files are deleted/renamed; otherwise include it with the text `No deletions or renames in this phase.`
- `PHASE_DELIVERY_NOTES.md` must state: phase number/title, delivery type, extraction destination (project root), files added/modified/deleted/renamed, manual steps, commands and actual test results, known limitations, and next phase.
- Include the package lockfile whenever dependency changes require it.
- Exclude `node_modules`, `.git`, build caches, logs, `.env`, credentials, tokens, API keys, and secrets.
- Before delivery, verify the ZIP exists and is non-empty; test archive integrity; inspect contents and paths; ensure no unwanted parent folder; ensure required docs are present; and check prohibited files/secrets are absent.
- Do not claim verification unless each check was actually run. Fix failures and recreate/retest the ZIP.
- Tell Jeet whether the ZIP is full or delta and that it must be extracted into the local project root. Do not claim the local folder or GitHub was updated just because a ZIP was made.
- Phase 0 may provide a planning-only ZIP; it must not pretend to contain application code.

## 2. Claude usage-limit continuity

If usage runs out or work must stop:
1. Stop safely and update `PROJECT_PROGRESS.md` in the repository root.
2. Record the exact current phase/status; completed and incomplete tasks; exact next action; files added/modified/deleted/renamed; commands and observed results; tests passed/failed/skipped/not run; errors; decisions and open questions; ZIP status; and manual steps for Jeet.
3. Do not label incomplete work complete or create a misleading completion ZIP.
4. When resuming—even in another Claude conversation/account—read this entire plan and `PROJECT_PROGRESS.md`, inspect the actual repository, and verify the checkpoint.
5. Resume at the exact first incomplete task. Do not restart or repeat completed and verified work. Do not trust old claims without checking.
6. Finish the current phase, run checks, create and verify its ZIP, then stop for approval. Never start the next phase without explicit approval.

Keep `PROJECT_PROGRESS.md` updated throughout the project.

## 3. Project vision and approved visual direction

Create a premium, memorable personal developer portfolio for Jeet Kumbhar, communicating practical full-stack web development ability, visual craft, clear professional direction, and selected real projects.

**Approved direction: dark premium + selective cinematic 3D + editorial personal storytelling.**

Use deep near-black/charcoal backgrounds, warm white typography, restrained violet/electric-blue accents, generous negative space, strong typographic hierarchy, subtle gradients, controlled glow, and refined depth.

Avoid generic portfolio templates, dashboard-like cards, excessive neon, rainbow gradients, overloaded glassmorphism, childish/game-like 3D, constant distracting motion, arbitrary skill percentages, and fake statistics.

### Hero — cinematic first impression

- Dark studio-like environment with one sophisticated metallic, glass, or abstract sculptural 3D focal object.
- Controlled studio lighting and subtle particles.
- Large title: **JEET KUMBHAR**.
- Role: **Full Stack Developer**.
- Short authentic supporting line, to be finalized with Jeet.
- CTAs: **Explore My Work** and **Download Resume**.
- Scroll-driven camera/object/text reveal should feel deliberate and premium.
- Keep text readable; never trap scrolling.
- Provide static/WebGL fallback and respect `prefers-reduced-motion`.

### About — editorial personal story

- Editorial layout using a real portrait supplied and approved by Jeet.
- Until then, use a neutral placeholder or omit the portrait.
- Never present a generated or stock face as Jeet.
- Keep biography concise and factual.

### Skills — clear and credible

Use categorized groups such as Frontend, Backend, Databases, Languages, and Tools/workflow. Use only technologies Jeet confirms. No arbitrary percentages or proficiency bars.

### Projects — second signature moment

Desktop may use a pinned/staged scroll-driven showcase if it improves clarity. Each project needs a genuine visual preview, name, concise purpose, contribution, real stack, and verified actions. Include clear progress/index and direct navigation.

On mobile, use a simpler vertical sequence/cards. Do not force desktop pinning or horizontal scroll onto mobile. Never use fabricated screenshots that imply nonexistent functionality.

### Contact — restrained close

A closing statement such as **LET'S BUILD SOMETHING GREAT.** Use only verified email, GitHub, LinkedIn, and resume links. No invented contact information.

### Navigation

About, Skills, Projects, Contact, Resume. It must be keyboard accessible and work on mobile. Visitors must be able to jump directly to sections; animation must not block navigation.

Use 3D selectively in the hero and project showcase. Keep About editorial and Skills/Contact clean.

## 4. Provisional content and project inventory

Treat these as leads to verify with Jeet before publishing. Confirm descriptions, screenshots, links, permissions, and exact functionality.

1. **WanderLust** — Airbnb-inspired accommodation/travel MERN application; described as having search and map-related functionality. Verify the current implementation.
2. **Pratik Shelke Photography** — MERN photography business website with booking/admin workflows and WhatsApp integration. Obtain client permission. Use only public-facing screenshots; never expose customer, booking, or admin data.
3. **Gen AI Interview** — React/Vite application using Gemini-related functionality and ATS/PDF features. Verify exact features and current behavior.
4. **Backend Ledger** — Node/Express/MongoDB/JWT backend involving ledger integrity concepts such as idempotency and immutable reversals. Describe only implemented behavior.
5. **DogStudio Clone** — learning/recreation project using React Three Fiber/Three.js and GSAP. Clearly label as a clone/recreation; do not imply ownership of the original.
6. **Simon Says** — optional smaller project if it strengthens the final selection.

Potential education detail to confirm: BE Information Technology, Universal College of Engineering, University of Mumbai, completed May 2026. Do not publish CGPA or school marks unless Jeet explicitly approves.

Possible professional direction: MERN Stack Developer, Full Stack Developer, Frontend Developer, Software Developer. Do not imply internships or employment that Jeet has not confirmed.

## 5. Technology direction

Preferred stack:
- React + Vite
- TypeScript preferred; JavaScript acceptable with a clear reason
- Tailwind CSS or a well-structured CSS system
- GSAP + ScrollTrigger
- Three.js / React Three Fiber for selective 3D
- `@react-three/drei` only when useful
- Lenis only if justified and accessibility remains intact

No backend is required by default. This is a portfolio, not a SaaS product. Use compatible stable dependencies and avoid unnecessary libraries. Vercel may be considered for deployment, but deployment and third-party services require Jeet's approval.

## 6. Design system

Define consistent color tokens, typography scale, weights/line heights, spacing, content widths, grids/breakpoints, borders/radii, focus states, buttons/links, transitions, and motion timing/easing.

Use oversized display typography for key moments and comfortable body text. Maintain contrast. Animation must support—not replace—content hierarchy.

## 7. Responsive, accessibility, and performance

**Responsive**
- Design intentionally for mobile, tablet, laptop, and wide desktop.
- No horizontal overflow, clipped headings, or inaccessible controls.
- Comfortable touch targets.
- Adapt complex desktop interactions for mobile.

**Accessibility**
- Semantic HTML and meaningful heading order.
- Keyboard-operable navigation and controls; visible focus states.
- Useful alt text; hide decorative visuals from assistive technology.
- Sufficient contrast and reduced-motion support.
- Do not convey information only through color or animation.
- No scroll hijacking.

**Performance**
- Optimize 3D geometry, materials, textures, and render loops.
- Lazy-load noncritical sections/assets where appropriate.
- Compress and correctly size images.
- Avoid loading heavy 3D assets too early.
- Avoid unnecessary re-renders and animation loops.
- Graceful WebGL fallback.
- Test realistic mobile viewport sizes.
- Do not sacrifice usability for visual effects.

## 8. SEO and content integrity

Include meaningful title/meta description, social sharing metadata, favicon, semantic sections, descriptive link labels, and suitable heading hierarchy. Add sitemap/robots configuration if appropriate for deployment.

Do not publish placeholder text, fake links, dummy testimonials, invented statistics, or unverified claims. Keep missing content as an explicit development placeholder and list it in phase notes.

## 9. Suggested project structure

Claude may refine this when justified, keeping the app maintainable:

```text
portfolio/
├── public/
│   ├── images/
│   ├── models/
│   ├── icons/
│   └── resume/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   ├── projects/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── PROJECT_PROGRESS.md
├── PHASE_DELIVERY_NOTES.md
├── DELETE_FILES.txt
├── package.json
├── package-lock.json
├── index.html
└── README.md
```

Avoid unnecessary abstractions. Make content data-driven where it improves editing and consistency.

## 10. Phases and approval gates

Complete only one phase at a time. At the end of every phase, deliver its verified ZIP and wait for Jeet's explicit approval.

### Phase 0 — Planning only

- Confirm repository is the new empty repository.
- Read this full plan and prepare a practical implementation blueprint.
- Define component architecture, design tokens, motion strategy, asset requirements, risks, and open questions.
- Identify assets Jeet must supply.
- Create initial `PROJECT_PROGRESS.md`.
- Do not scaffold, install packages, or write application source code.
- Deliver planning documents (planning-only ZIP if useful), report unknowns, and request approval.

### Phase 1 — Foundation and responsive shell

- Scaffold the approved stack from scratch.
- Set up global styles, fonts, tokens, section structure, reusable layout primitives, responsive navigation, scripts, and baseline documentation.
- Use placeholders for assets/content not yet supplied.
- Acceptance: clean install and run; build/lint/type checks pass where configured; responsive shell works; no fake details. Deliver **FULL PROJECT ZIP** and stop.

### Phase 2 — Visual foundation and hero

- Implement dark visual system, hero composition, typography, CTAs, selective 3D object, and scroll reveal.
- Add static/WebGL fallback and reduced-motion behavior.
- Acceptance: polished at key sizes, readable, usable, no scroll trap, fallback works, checks pass. Deliver delta ZIP and stop.

### Phase 3 — About and skills

- Build editorial About and categorized Skills.
- Integrate only approved portrait, biography, education, and skills.
- Acceptance: concise truthful content, no arbitrary percentages, responsive layout, checks pass. Deliver delta ZIP and stop.

### Phase 4 — Projects showcase

- Build showcase, data structure, genuine previews, descriptions, stack labels, verified links, and desktop choreography where useful.
- Build simpler mobile sequence.
- Acceptance: accurate real projects, verified links, usable mobile/desktop, no private client data, checks pass. Deliver delta ZIP and stop.

### Phase 5 — Contact and resume

- Build contact close, verified social links, and approved resume PDF/link.
- Acceptance: actions work, no fabricated details, resume opens/downloads, checks pass. Deliver delta ZIP and stop.

### Phase 6 — Motion polish

- Refine timing, easing, transitions, hover/focus states, and scroll choreography.
- Remove distracting/redundant animation.
- Acceptance: motion supports content, reduced-motion mode remains complete, no scroll lock/jumps, checks pass. Deliver delta ZIP and stop.

### Phase 7 — Responsive and accessibility audit

- Test mobile/tablet/laptop/wide desktop.
- Audit keyboard navigation, semantics, contrast, focus, alt text, and reduced motion.
- Fix overflow, clipping, and touch-target issues.
- Acceptance: core experience works across sizes and keyboard use; remaining issues documented. Deliver delta ZIP and stop.

### Phase 8 — Performance and SEO

- Optimize assets, loading, 3D rendering, and unnecessary work.
- Add metadata, social preview, favicon, and suitable crawl files.
- Run production build and performance checks.
- Acceptance: build succeeds, no known critical runtime errors, assets optimized, metadata correct. Record actual measurements; never invent Lighthouse scores. Deliver delta ZIP and stop.

### Phase 9 — Final content and release readiness

- Replace placeholders with approved content/assets.
- Verify project claims, images, links, and client permission.
- Prepare README and deployment instructions.
- Do not deploy publicly without approval.
- Acceptance: no public placeholders, claims/links checked, production build and smoke tests pass. Deliver delta ZIP and stop.

### Phase 10 — Deployment (only after explicit approval)

- Deploy to approved provider and configure only approved settings.
- Verify deployed site on desktop/mobile.
- Document deployment, domain, and rollback steps.
- Acceptance: HTTPS URL works, sections/links/assets/responsive behavior verified, no secrets exposed. Deliver final verified ZIP and release notes.

## 11. Testing checklist

Run relevant checks throughout the project:
- Clean dependency install and development server startup
- Production build
- Lint/type checks if configured
- Browser console/runtime errors
- Desktop and mobile viewport checks
- Navigation and anchor behavior
- Keyboard-only navigation
- Reduced-motion mode
- WebGL unavailable/fallback behavior
- External links and resume download
- Image loading and missing-asset behavior
- Horizontal overflow
- Secret/private-data scan
- ZIP integrity and contents verification

Report exact commands and actual outcomes. Clearly label checks not run.

## 12. Assets Jeet may provide

Request them when the relevant phase approaches:
- Real portrait for About
- Current resume PDF
- Confirmed email
- Confirmed GitHub and LinkedIn URLs
- Public project repository/live URLs
- Project screenshots or screen recordings
- Client permission for branding/screenshots
- Preferred name/title/tagline wording
- Confirmation of which education details may be public

Never ask Jeet to put passwords, tokens, API keys, or private customer records into the repository.

## 13. `PROJECT_PROGRESS.md` template

Create this in Phase 0 and update it throughout:

```markdown
# Project Progress

## Current status
- Current phase:
- Phase title:
- Status: Not started / In progress / Blocked / Completed
- Last updated:

## Completed and verified
- [ ] Task — evidence/result:

## Incomplete tasks
- [ ] Task — exact next action:

## Files changed
- Added:
- Modified:
- Deleted:
- Renamed:

## Commands and tests
- Command:
- Actual result:

## Errors and blockers
- None / details:

## Decisions and open questions
- Decision:
- Question for Jeet:

## Delivery
- ZIP type: None / Planning-only / Full project / Delta patch
- ZIP filename:
- ZIP created:
- ZIP integrity verified:
- Contents inspected:
- Required documents included:
- Secret/excluded-file check:

## Exact next action
1. ...

## Approval gate
- Waiting for Jeet's approval to begin the next phase: Yes / No
```

## 14. Definition of done

The portfolio is ready only when it expresses the approved visual direction; works on mobile and desktop; has purposeful performant animations and fallback behavior; contains only accurate approved content; has working links and resume; meets accessibility/reduced-motion requirements; has SEO metadata and production build checked; exposes no secrets/private data; and has complete documentation and a verified final ZIP. Deployment requires Jeet's explicit approval.

## 15. First instruction to Claude

Read this entire `PORTFOLIO_PLAN.md`. Confirm the repository is the brand-new empty repository Jeet created. Work on **Phase 0 only**: produce the blueprint, list decisions/assets requiring Jeet's input, create the initial `PROJECT_PROGRESS.md`, and package planning deliverables if applicable. Do not scaffold the application or install dependencies. Report the result and ask for approval before Phase 1.

For all later phases, obey the ZIP delivery and verification rules in Section 1. If usage runs out, follow Section 2 and resume from the exact checkpoint without restarting.

import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ArrowIcon } from '@/components/ui/icons'
import { ProjectPreview } from './ProjectPreview'
import { ProjectInfo } from './ProjectInfo'

/** How much scrolling (in screen heights) it takes to move from one project to the next. */
const SCROLL_PER_PROJECT = 70

const pad = (n) => String(n).padStart(2, '0')

const navButton =
  'inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] ' +
  'backdrop-blur-md transition-colors duration-(--duration-base) hover:border-violet-soft/70 ' +
  'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15'

/**
 * The scroll-driven showcase (large screens, motion allowed).
 *
 * How it works: this section is taller than the screen and its inner stage is `position: sticky`,
 * so the stage stays in view while you scroll through the extra height. ScrollTrigger turns the
 * scroll position into "which project is active". Nothing takes over the scroll wheel, so you can
 * always scroll straight past. The buttons and the list on the left jump to any project directly.
 */
export function ProjectStage({ projects }) {
  const count = projects.length
  const sectionRef = useRef(null)
  const meterRef = useRef(null)
  const panelRefs = useRef([])
  const triggerRef = useRef(null)
  const activeRef = useRef(0)
  const previousRef = useRef(0)
  const [active, setActive] = useState(0)

  // Turn scroll progress into the active project and the progress line.
  useGSAP(
    () => {
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          meterRef.current?.style.setProperty('--p', String(self.progress))
          const index = Math.round(self.progress * (count - 1))
          if (index !== activeRef.current) {
            activeRef.current = index
            setActive(index)
          }
        },
      })
      // Fonts and images can change the page height, so measure again once they are ready.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      return () => {
        triggerRef.current = null
      }
    },
    { scope: sectionRef, dependencies: [count] },
  )

  // Fade the previous project out and the new one in whenever the active project changes.
  useGSAP(
    () => {
      if (previousRef.current === active) return
      const direction = active > previousRef.current ? 1 : -1
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return
        if (index === active) {
          gsap.fromTo(
            panel,
            { autoAlpha: 0, y: 28 * direction },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.12, overwrite: true },
          )
        } else {
          gsap.to(panel, { autoAlpha: 0, y: -20 * direction, duration: 0.25, ease: 'power2.in', overwrite: true })
        }
      })
      previousRef.current = active
    },
    { scope: sectionRef, dependencies: [active] },
  )

  // Scroll to the exact position where project `index` becomes active.
  const goTo = (index) => {
    const trigger = triggerRef.current
    if (!trigger) return
    const clamped = Math.min(count - 1, Math.max(0, index))
    const top = trigger.start + (clamped / (count - 1)) * (trigger.end - trigger.start)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title"
      tabIndex={-1}
      // Cancels the header offset so the anchor jump lands exactly where the stage sticks.
      className="relative scroll-mt-[calc(var(--header-h)*-1)]"
      style={{ height: `calc(100svh + ${(count - 1) * SCROLL_PER_PROJECT}svh)` }}
    >
      <div className="ambient-l sticky top-0 isolate h-svh overflow-clip">
        <Container className="grid h-full items-center gap-12 pb-10 pt-[calc(var(--header-h)+1rem)] lg:grid-cols-[17rem_1fr] lg:gap-14">
          {/* Left: heading, counter, progress and direct navigation */}
          <div className="flex flex-col gap-7 [@media(max-height:700px)]:gap-4">
            <SectionHeading sectionId="projects">Projects</SectionHeading>

            {/* Counter and previous / next buttons share one row to save height on short screens. */}
            <div className="flex items-center justify-between">
              <p
                aria-hidden="true"
                className="font-display text-5xl font-semibold tabular-nums [@media(max-height:700px)]:text-4xl"
              >
                {pad(active + 1)} <span className="text-2xl text-ink-muted">/ {pad(count)}</span>
              </p>
              <div className="flex gap-2">
                <button type="button" className={navButton} onClick={() => goTo(active - 1)} disabled={active === 0}>
                  <ArrowIcon className="rotate-180" />
                  <span className="sr-only">Previous project</span>
                </button>
                <button
                  type="button"
                  className={navButton}
                  onClick={() => goTo(active + 1)}
                  disabled={active === count - 1}
                >
                  <ArrowIcon />
                  <span className="sr-only">Next project</span>
                </button>
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              Project {active + 1} of {count}: {projects[active].name}
            </p>

            <div ref={meterRef} className="relative pl-5">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-line">
                <span className="absolute inset-0 origin-top bg-violet-soft [transform:scaleY(var(--p,0))]" />
              </span>
              <ol aria-label="Jump to a project" className="flex flex-col">
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={index === active ? 'true' : undefined}
                      className={`min-h-11 w-full text-left text-[0.9375rem] [@media(max-height:700px)]:min-h-9 transition-colors duration-(--duration-base) hover:text-ink ${
                        index === active ? 'text-ink' : 'text-ink-muted'
                      }`}
                    >
                      {project.name}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: all projects stacked in one grid cell; only the active one is visible */}
          <div className="grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(node) => {
                  panelRefs.current[index] = node
                }}
                // Hidden panels are removed from tab order and from screen readers.
                inert={index !== active}
                style={index === 0 ? undefined : { opacity: 0, visibility: 'hidden' }}
                className="col-start-1 row-start-1 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]"
              >
                <ProjectPreview project={project} />
                <ProjectInfo project={project} headingClassName="text-3xl xl:text-4xl" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}

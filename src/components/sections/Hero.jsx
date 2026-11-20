import { useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { links } from '@/data/links'
import { HERO_ID } from '@/data/navigation'
import { gsap, useGSAP } from '@/lib/gsap'
import { heroProgress } from '@/lib/heroProgress'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PendingAction } from '@/components/ui/PendingAction'
import { Stars } from '@/components/scene/Stars'
import { Horizon } from '@/components/scene/Horizon'
import { HeroVisual } from '@/components/three/HeroVisual'

/**
 * Title-card hero. On large screens (with motion allowed) the section is taller than the viewport
 * and its stage is `position: sticky`: scroll progress drives the camera dolly, the ridgeline
 * parallax and the text hand-off, then the stage releases and the page scrolls on normally.
 * Nothing intercepts the wheel or touch, so there is no scroll trap. Below 1024 px, or with
 * reduced motion, the hero is a plain one-screen section.
 */
export function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const cueRef = useRef(null)
  const actionsRef = useRef(null)
  const starsRef = useRef(null)
  const horizonRef = useRef(null)
  const planetRef = useRef(null)
  const [sceneLive, setSceneLive] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 64rem) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              heroProgress.value = self.progress
            },
          },
        })

        // Text drifts up with the scroll and hands off just before the stage releases.
        tl.to(textRef.current, { yPercent: -7, duration: 1 }, 0)
          // The text block fades with plain opacity so the heading stays in the accessibility tree.
          // The buttons fade slightly earlier and also get visibility:hidden, so they are already
          // unfocusable before they stop being visible. Nobody can focus a button they cannot see.
          .to(textRef.current, { opacity: 0, duration: 0.22 }, 0.74)
          .to(actionsRef.current, { autoAlpha: 0, duration: 0.2 }, 0.62)
          .to(cueRef.current, { autoAlpha: 0, duration: 0.15 }, 0)
          .to(horizonRef.current, { yPercent: 14, duration: 1 }, 0)
          .to(starsRef.current, { scale: 1.12, yPercent: -4, duration: 1 }, 0)

        // With the live 3D scene the camera does the dolly; the static SVG planet is scaled instead.
        if (!sceneLive) {
          tl.to(planetRef.current, { scale: 1.2, yPercent: -3, duration: 1 }, 0)
        }

        return () => {
          heroProgress.value = 0
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [sceneLive], revertOnUpdate: true },
  )

  return (
    <section
      ref={sectionRef}
      id={HERO_ID}
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="relative motion-safe:lg:h-[165svh]"
    >
      <div className="relative isolate flex min-h-svh flex-col overflow-clip [--planet-x:50%] md:[--planet-x:60%] motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:h-svh lg:[--planet-x:71%]">
        {/* Decorative scene */}
        <div aria-hidden="true" className="load-fade pointer-events-none absolute inset-0 -z-10 forced-colors:hidden">
          <div ref={starsRef} className="absolute inset-0">
            <Stars className="size-full" />
          </div>
          <div className="horizon-glow" />
          <HeroVisual
            ref={planetRef}
            onLiveChange={setSceneLive}
            className="absolute left-(--planet-x) top-[calc(var(--header-h)+0.25rem)] w-[min(98vw,28rem)] -translate-x-1/2 md:top-[calc(var(--header-h)+1.5rem)] md:w-[min(76vw,40rem)] lg:top-[46%] lg:w-[min(48vw,46rem)] lg:-translate-y-1/2"
          />
          <div ref={horizonRef} className="absolute inset-x-0 bottom-0 h-[30svh] min-h-44 lg:h-[36svh]">
            <Horizon className="size-full" />
          </div>
          <div className="text-scrim hidden lg:block" />
          <div className="vignette" />
          <div className="grain" />
        </div>

        <Container className="relative mt-auto pb-[clamp(4.5rem,11svh,6.5rem)] pt-[calc(var(--header-h)+15rem)] md:pt-[calc(var(--header-h)+22rem)] lg:pt-[calc(var(--header-h)+3rem)]">
          <div ref={textRef}>
            <h1
              id="hero-title"
              className="load-rise text-display font-[650] uppercase [--d:0.15s] [font-stretch:86%]"
            >
              <span className="block">Jeet</span> <span className="block">Kumbhar</span>
            </h1>

            <div className="load-rise mt-6 flex items-center gap-4 [--d:0.3s]">
              <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-violet-soft to-transparent" />
              <p className="font-display text-xl font-medium text-violet-soft">{profile.role}</p>
            </div>

            <p className="load-rise mt-4 max-w-[36ch] text-lead text-ink-soft [--d:0.42s]">
              {profile.tagline}
            </p>

            <div ref={actionsRef} className="load-rise mt-9 flex flex-wrap gap-3 [--d:0.55s]">
              <ButtonLink href="#projects" icon="arrow">
                Explore My Work
              </ButtonLink>
              {links.resume ? (
                <ButtonLink href={links.resume} variant="ghost" icon="download" download>
                  Download Resume
                </ButtonLink>
              ) : (
                <PendingAction icon="download" reason="resume not available yet">
                  Download Resume
                </PendingAction>
              )}
            </div>
          </div>
        </Container>

        <a
          ref={cueRef}
          href="#about"
          aria-label="Scroll to About"
          className="load-rise absolute bottom-6 right-(--gutter) hidden min-h-12 flex-col items-center gap-3 px-3 text-sm text-ink-muted transition-colors duration-(--duration-base) hover:text-ink md:flex [--d:0.9s]"
        >
          Scroll
          <span aria-hidden="true" className="h-10 w-px bg-linear-to-b from-ink-muted to-transparent" />
        </a>
      </div>
    </section>
  )
}

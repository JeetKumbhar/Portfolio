import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

// Fonts can change the page height after the first paint, so measure the page again once they load.
let fontRefreshQueued = false
function refreshWhenFontsReady() {
  if (fontRefreshQueued || !document.fonts) return
  fontRefreshQueued = true
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

/**
 * Gentle "rise and fade in" as content scrolls into view. Mark things in your JSX with:
 *   data-reveal            one element
 *   data-reveal-delay="0.1"  optional extra delay in seconds
 *   data-reveal-group      its direct children appear one after another
 *   data-line              a hairline that draws in from the left
 *
 * Rules that keep it safe:
 *  - Only runs when the visitor has NOT asked for reduced motion; otherwise everything is simply visible.
 *  - Phones get a shorter, faster version than tablets and desktops.
 *  - Each thing animates once and then its animation styles are removed, so layout never shifts.
 *  - It never touches scrolling, so navigation links and anchors always work immediately.
 */
export function useReveal(scopeRef) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      const setup = (large) => () => {
        const scope = scopeRef.current
        if (!scope) return
        const distance = large ? 28 : 16
        const duration = large ? 0.9 : 0.6
        const shared = { ease: 'expo.out', clearProps: 'opacity,visibility,transform' }
        const once = (trigger, start) => ({ trigger, start, once: true })

        scope.querySelectorAll('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            ...shared,
            autoAlpha: 0,
            y: distance,
            duration,
            delay: Number(el.dataset.revealDelay || 0),
            scrollTrigger: once(el, 'top 88%'),
          })
        })

        scope.querySelectorAll('[data-reveal-group]').forEach((group) => {
          gsap.from(group.children, {
            ...shared,
            autoAlpha: 0,
            y: distance,
            duration,
            stagger: large ? 0.09 : 0.05,
            scrollTrigger: once(group, 'top 85%'),
          })
        })

        scope.querySelectorAll('[data-line]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: large ? 1.1 : 0.7,
            ease: 'expo.out',
            clearProps: 'transform,transformOrigin',
            scrollTrigger: once(el, 'top 90%'),
          })
        })
      }

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 48rem)', setup(true))
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 47.99rem)', setup(false))
      refreshWhenFontsReady()
    },
    { scope: scopeRef },
  )
}

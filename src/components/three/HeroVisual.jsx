import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Planet } from '@/components/scene/Planet'
import { useSceneTier } from '@/hooks/useSceneTier'
import { WebGLBoundary } from './WebGLBoundary'

// The 3D code (three + react-three-fiber) is a separate chunk, fetched after first paint.
const HeroScene = lazy(() => import('./HeroScene'))

/**
 * The static SVG planet is always rendered first: it is the poster, the no-WebGL fallback and the
 * reduced-motion version. When the 3D scene is ready it cross-fades over the poster.
 */
export function HeroVisual({ ref, className = '', onLiveChange }) {
  const tier = useSceneTier()
  const hostRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [visible, setVisible] = useState(true)

  const wantsScene = tier !== 'static' && !failed
  const live = wantsScene && ready

  // Defer the 3D download until the page has loaded and the browser is idle.
  useEffect(() => {
    if (!wantsScene) return
    let cancelled = false
    const start = () => {
      if (!cancelled) setMounted(true)
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }
    const id = setTimeout(start, 400)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [wantsScene])

  // Stop rendering while the hero is off-screen.
  useEffect(() => {
    const el = hostRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    onLiveChange(live)
  }, [live, onLiveChange])

  const setRefs = (node) => {
    hostRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  return (
    <div ref={setRefs} className={className}>
      <Planet
        className={`h-auto w-full transition-opacity duration-1000 ease-out ${live ? 'opacity-0' : 'opacity-100'}`}
      />
      {wantsScene && mounted && (
        // 150% of the planet box, centred, so the dolly and rings are never clipped at rest.
        <div
          data-scene={tier}
          className={`pointer-events-none absolute left-1/2 top-1/2 aspect-[600/460] w-[150%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-out ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <WebGLBoundary onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <HeroScene
                tier={tier}
                active={visible}
                onReady={() => setReady(true)}
                onContextLost={() => setFailed(true)}
              />
            </Suspense>
          </WebGLBoundary>
        </div>
      )}
    </div>
  )
}

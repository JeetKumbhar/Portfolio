import { useState } from 'react'
import { useMediaQuery } from './useMediaQuery'
import { useReducedMotion } from './useReducedMotion'
import { detectWebGL, prefersSavingData } from '@/lib/capabilities'

/**
 * Picks how much of the hero to render:
 *  - static: no WebGL, data-saver, or reduced motion. The SVG scene only, nothing downloaded.
 *  - lite:   small screens. Fewer particles, lower pixel ratio, no pointer or scroll scrubbing.
 *  - full:   large screens.
 */
export function useSceneTier() {
  const reducedMotion = useReducedMotion()
  const isLarge = useMediaQuery('(min-width: 64rem)')
  const [capable] = useState(() => detectWebGL() && !prefersSavingData())

  if (reducedMotion || !capable) return 'static'
  return isLarge ? 'full' : 'lite'
}

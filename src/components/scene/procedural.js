/**
 * Deterministic procedural helpers for the static scene art.
 * Same seed, same output: no randomness at runtime, no layout shift, SSR-safe.
 */

export function mulberry32(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n) => Math.round(n * 10) / 10

/** A jagged mountain ridge. Returns the filled shape and its top edge as separate paths. */
export function ridge({ seed, width, height, base, amp, step = 20 }) {
  const rand = mulberry32(seed)
  const p1 = rand() * 10
  const p2 = rand() * 10
  const p3 = rand() * 10
  // |sin| has sharp zero-crossings, so 1 - |sin| gives pointed peaks and rounded valleys.
  const peak = (t) => 1 - Math.abs(Math.sin(t))

  const pts = []
  for (let x = -step; x <= width + step; x += step) {
    const h = 0.55 * peak(x * 0.0042 + p1) + 0.3 * peak(x * 0.0113 + p2) + 0.15 * peak(x * 0.029 + p3)
    const jitter = (rand() - 0.5) * amp * 0.07
    pts.push([r1(x), r1(base - amp * h + jitter)])
  }

  const edge = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const fill = `${edge} L${width + step},${height} L${-step},${height} Z`
  return { edge, fill }
}

/** Sparse star field; `avoid` keeps the title area clean. */
export function stars(count, width, height, seed) {
  const rand = mulberry32(seed)
  const out = []
  while (out.length < count) {
    const x = rand() * width
    const y = rand() * height * 0.78 // none below the horizon
    // keep the lower-left (title) quadrant almost empty
    if (x < width * 0.38 && y > height * 0.42 && rand() > 0.15) continue
    const size = rand()
    out.push({
      x: r1(x),
      y: r1(y),
      r: r1(0.5 + size * size * 1.3),
      o: r1(0.25 + rand() * 0.6),
    })
  }
  return out
}

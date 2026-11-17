import { ridge } from './procedural'

const W = 1600
const H = 420

const far = ridge({ seed: 3, width: W, height: H, base: 190, amp: 150, step: 22 })
const mid = ridge({ seed: 11, width: W, height: H, base: 290, amp: 120, step: 20 })
const near = ridge({ seed: 29, width: W, height: H, base: 368, amp: 62, step: 18 })

/**
 * Three layered mountain silhouettes. The far ridge carries a thin rim light,
 * as if lit from the planet above. Decorative.
 */
export function Horizon({ className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="hz-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d0926" />
          <stop offset="1" stopColor="#06050b" />
        </linearGradient>
        <linearGradient id="hz-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#080618" />
          <stop offset="1" stopColor="#07060b" />
        </linearGradient>
        <linearGradient id="hz-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a692ff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#a692ff" stopOpacity="0.55" />
          <stop offset="0.75" stopColor="#cfc6ff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#a692ff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hz-edge-mid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c5cff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#7c5cff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={far.fill} fill="url(#hz-far)" />
      <path d={far.edge} fill="none" stroke="url(#hz-edge)" strokeWidth="1.3" />
      <path d={mid.fill} fill="url(#hz-mid)" />
      <path d={mid.edge} fill="none" stroke="url(#hz-edge-mid)" strokeWidth="1" />
      <path d={near.fill} fill="#07060b" />
    </svg>
  )
}

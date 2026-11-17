import { stars } from './procedural'

const W = 1600
const H = 900
const field = stars(72, W, H, 7)

/** Decorative static star field. */
export function Stars({ className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {field.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#e9e4ff" opacity={s.o} />
      ))}
    </svg>
  )
}

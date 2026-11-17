/**
 * Static ringed glass planet. Pure SVG: layered gradients, a rim-light crescent,
 * and rings that pass behind the sphere on top and in front of it below, which is
 * what makes it read as 3D. Phase 2 replaces this with the WebGL scene and keeps
 * this component as the no-WebGL / reduced-motion fallback. Decorative.
 */
const CX = 400
const CY = 400
const R = 165
const TILT = -16
const RX = 272
const RY = 64

const halfTop = (k) => `M${CX - RX * k},${CY} A${RX * k},${RY * k} 0 0 1 ${CX + RX * k},${CY}`
const halfBottom = (k) => `M${CX - RX * k},${CY} A${RX * k},${RY * k} 0 0 0 ${CX + RX * k},${CY}`

const rings = [
  { k: 1, w: 2.4, back: 0.55, front: 1 },
  { k: 1.1, w: 1, back: 0.3, front: 0.55 },
  { k: 1.2, w: 0.8, back: 0.18, front: 0.35 },
]

function Moon({ cx, cy, r, id }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#pl-rim)" strokeWidth="1.2" opacity="0.9" />
    </g>
  )
}

export function Planet({ className = '' }) {
  return (
    <svg
      viewBox="100 180 600 460"
      aria-hidden="true"
      focusable="false"
      className={className}
      overflow="visible"
    >
      <defs>
        <radialGradient id="pl-body" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#3b2a95" />
          <stop offset="0.38" stopColor="#1a1046" />
          <stop offset="0.75" stopColor="#0a0620" />
          <stop offset="1" stopColor="#04030c" />
        </radialGradient>
        <radialGradient id="pl-shade" cx="0.3" cy="0.24" r="0.95">
          <stop offset="0.45" stopColor="#04030c" stopOpacity="0" />
          <stop offset="1" stopColor="#04030c" stopOpacity="0.92" />
        </radialGradient>
        <linearGradient id="pl-rim" gradientUnits="userSpaceOnUse" x1="260" y1="250" x2="560" y2="560">
          <stop offset="0" stopColor="#e4dcff" stopOpacity="1" />
          <stop offset="0.3" stopColor="#8f74ff" stopOpacity="0.8" />
          <stop offset="0.62" stopColor="#4a3bd0" stopOpacity="0.15" />
          <stop offset="1" stopColor="#4a3bd0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pl-gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pl-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#7c5cff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pl-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a692ff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#a692ff" stopOpacity="0.7" />
          <stop offset="0.6" stopColor="#e4dcff" stopOpacity="1" />
          <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pl-moon-a" cx="0.32" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#4a3aa8" />
          <stop offset="0.6" stopColor="#120b30" />
          <stop offset="1" stopColor="#05030f" />
        </radialGradient>
        <radialGradient id="pl-moon-b" cx="0.32" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#2d4fb8" />
          <stop offset="0.6" stopColor="#0c1233" />
          <stop offset="1" stopColor="#04040f" />
        </radialGradient>
        <clipPath id="pl-clip">
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
        <filter id="pl-soft" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="pl-bloom" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Atmosphere halo */}
      <circle cx={CX} cy={CY} r={R * 1.75} fill="url(#pl-halo)" />

      {/* Rings, back halves (behind the sphere) */}
      <g transform={`rotate(${TILT} ${CX} ${CY})`}>
        <path d={halfTop(1.06)} fill="none" stroke="url(#pl-ring)" strokeWidth="18" opacity="0.1" />
        {rings.map((r) => (
          <path
            key={`b${r.k}`}
            d={halfTop(r.k)}
            fill="none"
            stroke="url(#pl-ring)"
            strokeWidth={r.w}
            opacity={r.back}
          />
        ))}
      </g>

      {/* Sphere */}
      <circle cx={CX} cy={CY} r={R} fill="url(#pl-body)" />
      <g clipPath="url(#pl-clip)">
        {/* surface bands hint at glass / atmosphere layers */}
        <g transform={`rotate(-22 ${CX} ${CY})`} fill="none" stroke="#a692ff" strokeWidth="1">
          <ellipse cx={CX} cy={CY} rx={R * 1.05} ry="38" opacity="0.1" />
          <ellipse cx={CX} cy={CY + 4} rx={R * 1.05} ry="86" opacity="0.07" />
          <ellipse cx={CX} cy={CY + 8} rx={R * 1.05} ry="132" opacity="0.05" />
        </g>
        {/* soft glass reflection */}
        <ellipse
          cx={CX - 78}
          cy={CY - 96}
          rx="58"
          ry="19"
          transform={`rotate(-40 ${CX - 78} ${CY - 96})`}
          fill="url(#pl-gloss)"
          filter="url(#pl-soft)"
        />
        <circle cx={CX} cy={CY} r={R} fill="url(#pl-shade)" />
      </g>
      {/* Rim light: blurred bloom under a crisp line */}
      <circle
        cx={CX}
        cy={CY}
        r={R - 1}
        fill="none"
        stroke="url(#pl-rim)"
        strokeWidth="9"
        filter="url(#pl-bloom)"
        opacity="0.8"
      />
      <circle cx={CX} cy={CY} r={R - 0.5} fill="none" stroke="url(#pl-rim)" strokeWidth="2.2" />

      {/* Rings, front halves (cross in front of the sphere) */}
      <g transform={`rotate(${TILT} ${CX} ${CY})`}>
        {rings.map((r) => (
          <path
            key={`f${r.k}`}
            d={halfBottom(r.k)}
            fill="none"
            stroke="url(#pl-ring)"
            strokeWidth={r.w}
            opacity={r.front}
          />
        ))}
      </g>

      {/* Moons */}
      <Moon cx={648} cy={262} r={15} id="pl-moon-a" />
      <Moon cx={176} cy={590} r={8.5} id="pl-moon-b" />
      <Moon cx={560} cy={612} r={5} id="pl-moon-a" />
    </svg>
  )
}

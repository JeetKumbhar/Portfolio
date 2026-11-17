const common = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function ArrowIcon({ className = '' }) {
  return (
    <svg {...common} className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function DownloadIcon({ className = '' }) {
  return (
    <svg {...common} className={className}>
      <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13h10" />
    </svg>
  )
}

export function ExternalIcon({ className = '' }) {
  return (
    <svg {...common} className={className}>
      <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7.5 8.5" />
    </svg>
  )
}

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-pill px-6 ' +
  'text-[0.9375rem] font-semibold tracking-[0.01em] ' +
  'transition-[background-color,border-color,box-shadow,filter,color,transform] duration-(--duration-base) ease-out-expo'

const variants = {
  // Start color keeps white text above 4.5:1 across the whole gradient.
  primary:
    'border border-transparent bg-[linear-gradient(135deg,#6e4ff6_0%,#5645ee_55%,#4a44e6_100%)] text-white ' +
    'shadow-[0_10px_30px_-10px_rgb(124_92_255/0.75),inset_0_1px_0_rgb(255_255_255/0.22)] ' +
    'hover:brightness-110 hover:shadow-[0_14px_36px_-10px_rgb(124_92_255/0.9),inset_0_1px_0_rgb(255_255_255/0.28)]',
  ghost:
    'border border-white/15 bg-white/[0.04] text-ink backdrop-blur-md ' +
    'hover:border-violet-soft/70 hover:bg-white/[0.09]',
}

export function buttonClasses(variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim()
}

/** Icon motion is a response to hover, so it stays even though it is decorative. */
export const iconMotion =
  'transition-transform duration-(--duration-base) ease-out-expo group-hover:translate-x-0.5'

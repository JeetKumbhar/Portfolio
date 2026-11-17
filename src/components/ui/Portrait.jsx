/**
 * Portrait frame for the About section.
 * - With a `portrait` object ({ src, alt, width, height }) it shows the real photo.
 * - Without one it shows a neutral silhouette that is not a picture of anyone.
 * The frame has a fixed 4:5 shape either way, so the page never jumps when the image loads.
 */
export function Portrait({ portrait }) {
  return (
    <figure className="m-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-white/12 bg-[radial-gradient(120%_70%_at_30%_0%,rgb(124_92_255/0.28),transparent_60%),linear-gradient(to_bottom,var(--color-surface),var(--color-bg))] shadow-[0_30px_80px_-40px_rgb(124_92_255/0.5)]">
        {portrait ? (
          <img
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-end justify-center">
            <svg
              viewBox="0 0 200 250"
              role="img"
              aria-label="Portrait placeholder silhouette"
              className="h-[85%] w-auto text-white/[0.07]"
            >
              <circle cx="100" cy="92" r="42" fill="currentColor" />
              <path d="M20 250c0-56 36-92 80-92s80 36 80 92z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
      {!portrait && <figcaption className="mt-3 text-sm text-ink-muted">Portrait placeholder.</figcaption>}
    </figure>
  )
}

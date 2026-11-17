/**
 * The visual for one project: a real screenshot if one was supplied, otherwise a clearly
 * labelled empty frame. The frame has a fixed 16:10 shape so the layout never jumps.
 */
export function ProjectPreview({ project }) {
  const { preview, name } = project

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-white/12 bg-surface shadow-[0_30px_80px_-40px_rgb(124_92_255/0.55)]">
      {preview ? (
        <img
          src={preview.src}
          alt={preview.alt}
          width={preview.width}
          height={preview.height}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      ) : (
        <div
          role="img"
          aria-label={`Screenshot of ${name}: not added yet`}
          className="flex size-full items-center justify-center bg-[radial-gradient(90%_70%_at_30%_0%,rgb(124_92_255/0.22),transparent_60%),linear-gradient(to_bottom,var(--color-surface),var(--color-bg))]"
        >
          <span className="rounded-pill border border-dashed border-violet-soft/50 px-4 py-1.5 text-sm text-ink-muted">
            Screenshot to be added
          </span>
        </div>
      )}
    </div>
  )
}

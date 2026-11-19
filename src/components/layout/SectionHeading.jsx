export function SectionHeading({ sectionId, children, className = '', reveal = true }) {
  return (
    <div data-reveal={reveal ? '' : undefined}>
      <span
        aria-hidden="true"
        data-line={reveal ? '' : undefined}
        className="mb-6 block h-px w-14 bg-linear-to-r from-violet-soft to-transparent"
      />
      <h2 id={`${sectionId}-title`} className={`text-h2 text-balance ${className}`}>
        {children}
      </h2>
    </div>
  )
}

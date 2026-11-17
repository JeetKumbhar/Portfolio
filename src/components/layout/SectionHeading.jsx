export function SectionHeading({ sectionId, children, className = '' }) {
  return (
    <div>
      <span
        aria-hidden="true"
        className="mb-6 block h-px w-14 bg-linear-to-r from-violet-soft to-transparent"
      />
      <h2 id={`${sectionId}-title`} className={`text-h2 text-balance ${className}`}>
        {children}
      </h2>
    </div>
  )
}

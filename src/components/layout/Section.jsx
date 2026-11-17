import { Container } from './Container'

/** Owns vertical rhythm, the anchor target and the landmark label for a page section. */
export function Section({ id, className = '', children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className={`py-(--section-y) ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}

import { useRef } from 'react'
import { profile } from '@/data/profile'
import { useReveal } from '@/hooks/useReveal'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Placeholder } from '@/components/ui/Placeholder'
import { Portrait } from '@/components/ui/Portrait'

/** Editorial About: story on the left, portrait on the right, key facts underneath the story. */
export function About() {
  const { bio, portrait, role, education } = profile
  const hasBio = bio.length > 0
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <Section ref={sectionRef} id="about" className="ambient-r relative isolate overflow-hidden">
      <div className="grid items-start gap-14 md:grid-cols-[1.15fr_1fr] md:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading sectionId="about">About</SectionHeading>

          {hasBio ? (
            <div data-reveal data-reveal-delay="0.05" className="flex max-w-[60ch] flex-col gap-5 text-lg text-ink-muted">
              {bio.map((paragraph, index) => (
                // The first paragraph is the opening line, so it gets a larger, brighter style.
                <p key={paragraph} className={index === 0 ? 'text-lead text-ink' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div data-reveal data-reveal-delay="0.05" className="max-w-[60ch]">
              <Placeholder>
                Biography to be added. Jeet's own words go in <code>src/data/profile.js</code>.
              </Placeholder>
            </div>
          )}

          <dl data-reveal data-reveal-delay="0.1" className="grid max-w-[60ch] gap-8 border-t border-line pt-8">
            <div>
              <dt className="text-sm text-ink-muted">Role</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">{role}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Education</dt>
              <dd className="mt-1">
                <span className="block font-display text-2xl font-semibold">{education.degree}</span>
                <span className="mt-1 block text-ink-muted">
                  {education.institution}, {education.date}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div data-reveal data-reveal-delay="0.15" className="md:sticky md:top-28">
          <Portrait portrait={portrait} />
        </div>
      </div>
    </Section>
  )
}

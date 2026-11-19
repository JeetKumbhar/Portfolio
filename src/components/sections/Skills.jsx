import { useRef } from 'react'
import { skillGroups } from '@/data/skills'
import { useReveal } from '@/hooks/useReveal'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'

/**
 * Skills grouped by what they are used for. One row per group, like an index.
 * There are deliberately no percentages or progress bars: they would be made-up numbers.
 */
export function Skills() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <Section ref={sectionRef} id="skills">
      <SectionHeading sectionId="skills">Skills</SectionHeading>
      <p data-reveal data-reveal-delay="0.05" className="mt-6 max-w-[48ch] text-lead text-ink-muted">Technologies I work with, grouped by what they do.</p>

      <dl data-reveal-group className="mt-14 border-t border-line">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="grid gap-4 border-b border-line py-7 md:grid-cols-[14rem_1fr] md:gap-10 md:py-9"
          >
            <dt className="font-display text-2xl font-semibold">{group.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-pill border border-line bg-white/[0.03] px-5 py-2 text-base text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

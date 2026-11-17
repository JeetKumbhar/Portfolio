import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Placeholder } from '@/components/ui/Placeholder'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Horizon } from '@/components/scene/Horizon'
import { links } from '@/data/links'

export function Contact() {
  const hasAnyLink = Boolean(links.email || links.github || links.linkedin)

  return (
    <Section id="contact" className="relative isolate overflow-hidden">
      {/* Closing frame: the same ridgeline and light as the hero, bookending the page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [--planet-x:50%]">
        <div className="horizon-glow" />
        <Horizon className="absolute inset-x-0 bottom-0 h-[34%] min-h-40 w-full" />
      </div>

      <SectionHeading sectionId="contact" className="max-w-[14ch] uppercase">
        Let’s build something great.
      </SectionHeading>

      <div className="mt-10 flex flex-wrap gap-3">
        {links.email && (
          <ButtonLink href={`mailto:${links.email}`} icon="arrow">
            Email
          </ButtonLink>
        )}
        {links.github && (
          <ButtonLink href={links.github} variant="ghost" target="_blank" rel="noopener noreferrer">
            GitHub
          </ButtonLink>
        )}
        {links.linkedin && (
          <ButtonLink href={links.linkedin} variant="ghost" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </ButtonLink>
        )}
      </div>

      {!hasAnyLink && (
        <div className="mt-8 max-w-[60ch]">
          <Placeholder>
            Email, GitHub and LinkedIn links are added in Phase 5, once Jeet confirms them.
          </Placeholder>
        </div>
      )}

      {/* Keeps content clear of the ridgeline. */}
      <div aria-hidden="true" className="h-28 md:h-44" />
    </Section>
  )
}

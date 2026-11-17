import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ProjectPreview } from './ProjectPreview'
import { ProjectInfo } from './ProjectInfo'

const pad = (n) => String(n).padStart(2, '0')

/**
 * The simple version: projects one after another, no scroll tricks.
 * Used on phones and tablets, and for visitors who prefer reduced motion.
 */
export function ProjectList({ projects }) {
  return (
    <Section id="projects" className="ambient-l relative isolate overflow-hidden">
      <SectionHeading sectionId="projects">Projects</SectionHeading>

      <ol className="mt-14 flex flex-col gap-20 md:gap-28">
        {projects.map((project, index) => (
          <li key={project.id} className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <div className="flex flex-col gap-4">
              <p className="font-display text-lg text-violet-soft tabular-nums">
                {pad(index + 1)} <span className="text-ink-muted">/ {pad(projects.length)}</span>
              </p>
              <ProjectPreview project={project} />
            </div>
            <ProjectInfo project={project} headingClassName="text-3xl" />
          </li>
        ))}
      </ol>
    </Section>
  )
}

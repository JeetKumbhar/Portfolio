import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Placeholder } from '@/components/ui/Placeholder'
import { ArrowIcon, DownloadIcon, ExternalIcon } from '@/components/ui/icons'
import { Horizon } from '@/components/scene/Horizon'
import { links } from '@/data/links'

/** "https://www.linkedin.com/in/name/" becomes "linkedin.com/in/name" for display. */
const prettyUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/**
 * Lets a very long email address wrap before the "@" instead of in the middle of a word.
 * <wbr /> is only a line-break hint, so copying the address still gives exactly the right text.
 */
function BreakableEmail({ value }) {
  const [name, domain] = value.split('@')
  return (
    <>
      {name}
      <wbr />@{domain}
    </>
  )
}

/** Build the list of contact rows from the verified links. Missing links are skipped. */
function getRows() {
  const rows = []
  if (links.email) {
    rows.push({
      label: 'Email',
      value: <BreakableEmail value={links.email} />,
      href: `mailto:${links.email}`,
      icon: ArrowIcon,
    })
  }
  if (links.github) {
    rows.push({ label: 'GitHub', value: prettyUrl(links.github), href: links.github, external: true })
  }
  if (links.linkedin) {
    rows.push({ label: 'LinkedIn', value: prettyUrl(links.linkedin), href: links.linkedin, external: true })
  }
  if (links.resume) {
    rows.push({ label: 'Resume', value: 'Download PDF', href: links.resume, download: true })
  }
  return rows
}

/** Restrained closing section: one statement and a short list of verified ways to reach out. */
export function Contact() {
  const rows = getRows()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <Section ref={sectionRef} id="contact" className="relative isolate overflow-hidden">
      {/* Closing frame: the same ridgeline and light as the hero, bookending the page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [--planet-x:50%] forced-colors:hidden">
        <div className="horizon-glow" />
        <Horizon className="absolute inset-x-0 bottom-0 h-[34%] min-h-40 w-full" />
      </div>

      <SectionHeading sectionId="contact" className="max-w-[14ch] uppercase">
        Let’s build something great.
      </SectionHeading>

      {rows.length > 0 ? (
        <ul data-reveal-group className="mt-12 max-w-2xl border-t border-line">
          {rows.map((row) => {
            // Rows are plain links. External ones open in a new tab; the resume downloads.
            const Icon = row.icon ?? (row.download ? DownloadIcon : ExternalIcon)
            return (
              <li key={row.label}>
                <a
                  href={row.href}
                  download={row.download ? true : undefined}
                  target={row.external ? '_blank' : undefined}
                  rel={row.external ? 'noopener noreferrer' : undefined}
                  className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-5 transition-colors duration-(--duration-base) hover:border-violet-soft/60 md:grid-cols-[7rem_1fr_auto] md:gap-x-6"
                >
                  <span className="col-start-1 row-start-1 text-sm text-ink-muted">{row.label}</span>
                  <span className="col-start-1 row-start-2 min-w-0 font-display text-xl font-medium [overflow-wrap:anywhere] md:col-start-2 md:row-start-1 md:text-2xl">
                    {row.value}
                    {row.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                  <Icon className="col-start-2 row-span-2 row-start-1 shrink-0 text-ink-muted md:col-start-3 md:row-span-1 transition-[transform,color] duration-(--duration-base) ease-out-expo group-hover:translate-x-0.5 group-hover:text-violet-soft" />
                </a>
              </li>
            )
          })}
        </ul>
      ) : (
        <div data-reveal className="mt-10 max-w-[60ch]">
          <Placeholder>
            Email, GitHub, LinkedIn and resume links appear here once Jeet adds them in{' '}
            <code>src/data/links.js</code>.
          </Placeholder>
        </div>
      )}

      {/* Keeps content clear of the ridgeline. */}
      <div aria-hidden="true" className="h-28 md:h-44" />
    </Section>
  )
}

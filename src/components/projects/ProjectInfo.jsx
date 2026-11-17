import { ButtonLink } from '@/components/ui/ButtonLink'
import { Placeholder } from '@/components/ui/Placeholder'

/** Text side of a project: name, what it is, what you did, the stack and the verified links. */
export function ProjectInfo({ project, headingClassName = 'text-3xl md:text-4xl' }) {
  const { name, optional, summary, contribution, stack = [], note, liveUrl, repoUrl } = project
  const hasDetails = Boolean(summary || contribution || stack.length > 0)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className={`font-display font-semibold ${headingClassName}`}>{name}</h3>
        {(note || optional) && (
          <p className="mt-2 text-sm text-ink-muted">{[note, optional && 'Optional'].filter(Boolean).join(' · ')}</p>
        )}
      </div>

      {summary && <p className="max-w-[48ch] text-ink-muted">{summary}</p>}

      {contribution && (
        <div>
          <p className="text-sm text-ink-muted">My contribution</p>
          <p className="mt-1 max-w-[48ch]">{contribution}</p>
        </div>
      )}

      {stack.length > 0 && (
        <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <li key={item} className="rounded-pill border border-line bg-white/[0.03] px-3.5 py-1 text-sm">
              {item}
            </li>
          ))}
        </ul>
      )}

      {!hasDetails && <Placeholder>Details to be added once Jeet has verified them.</Placeholder>}

      {(liveUrl || repoUrl) && (
        <div className="flex flex-wrap gap-3">
          {liveUrl && (
            <ButtonLink href={liveUrl} icon="external" target="_blank" rel="noopener noreferrer">
              Live demo<span className="sr-only"> of {name} (opens in a new tab)</span>
            </ButtonLink>
          )}
          {repoUrl && (
            <ButtonLink href={repoUrl} variant="ghost" icon="external" target="_blank" rel="noopener noreferrer">
              Source code<span className="sr-only"> of {name} (opens in a new tab)</span>
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  )
}

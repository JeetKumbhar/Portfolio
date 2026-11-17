import { buttonClasses } from './button-styles'
import { DownloadIcon } from './icons'

/**
 * Stands in for an action whose target (e.g. the resume PDF) has not been supplied.
 * It never links anywhere, so no fake URL can ship by accident.
 */
export function PendingAction({ variant = 'ghost', icon = 'none', className = '', reason, children }) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title={reason}
      onClick={(event) => event.preventDefault()}
      className={buttonClasses(variant, `cursor-not-allowed opacity-60 ${className}`)}
    >
      {children}
      {icon === 'download' && <DownloadIcon />}
      <span className="sr-only"> ({reason})</span>
    </button>
  )
}

import { buttonClasses, iconMotion } from './button-styles'
import { ArrowIcon, DownloadIcon, ExternalIcon } from './icons'

export function ButtonLink({ variant = 'primary', icon = 'none', className = '', children, ...rest }) {
  return (
    <a className={buttonClasses(variant, className)} {...rest}>
      {children}
      {icon === 'arrow' && <ArrowIcon className={iconMotion} />}
      {icon === 'download' && <DownloadIcon className={iconMotion} />}
      {icon === 'external' && <ExternalIcon className={iconMotion} />}
    </a>
  )
}

import { buttonClasses, iconMotion } from './button-styles'
import { ArrowIcon, DownloadIcon, ExternalIcon } from './icons'

export function ButtonLink({ variant = 'primary', icon = 'none', className = '', children, ...rest }) {
  return (
    <a className={buttonClasses(variant, `active:scale-[0.98] ${className}`)} {...rest}>
      {children}
      {icon === 'arrow' && <ArrowIcon className={iconMotion} />}
      {icon === 'download' && <DownloadIcon className={iconMotion} />}
      {icon === 'external' && <ExternalIcon className={iconMotion} />}
    </a>
  )
}

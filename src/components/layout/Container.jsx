export function Container({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`mx-auto w-full max-w-(--container-max) px-(--gutter) ${className}`}>{children}</Tag>
}

import { useEffect, useRef, useState } from 'react'
import { navItems, sectionIds, HERO_ID } from '@/data/navigation'
import { links } from '@/data/links'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PendingAction } from '@/components/ui/PendingAction'

const RESUME_PENDING_REASON = 'resume not available yet'

/** Shared glass treatment for every floating header element. */
const glass = 'border border-white/12 bg-bg/55 backdrop-blur-xl'

export function Header() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 48rem)')
  const activeId = useActiveSection(sectionIds)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // The mobile panel only exists below the md breakpoint.
  const menuOpen = open && !isDesktop

  useEffect(() => {
    if (!menuOpen) return

    panelRef.current?.querySelector('a, button')?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      const target = event.target
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  const resume = links.resume ? (
    <ButtonLink href={links.resume} variant="ghost" icon="download" download>
      Resume
    </ButtonLink>
  ) : (
    <PendingAction icon="download" reason={RESUME_PENDING_REASON}>
      Resume
    </PendingAction>
  )

  return (
    // The bar itself is transparent and click-through; only the glass elements capture input.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <Container className="grid h-(--header-h) grid-cols-[auto_1fr] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <a
          href={`#${HERO_ID}`}
          aria-label="JK, back to top"
          onClick={() => setOpen(false)}
          className={`${glass} pointer-events-auto grid size-12 place-items-center rounded-full font-display text-lg font-semibold tracking-tight transition-colors duration-(--duration-base) hover:border-violet-soft/70`}
        >
          JK
        </a>

        <nav aria-label="Primary" className="pointer-events-auto hidden md:block">
          <ul className={`${glass} flex items-center gap-1 rounded-pill p-1`}>
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium transition-colors duration-(--duration-base) hover:text-ink ${
                      isActive ? 'bg-white/10 text-ink forced-colors:underline' : 'text-ink-muted'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="pointer-events-auto flex justify-self-end">
          <div className="hidden md:block">{resume}</div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`${glass} inline-flex min-h-12 items-center gap-2.5 rounded-pill px-5 text-[0.9375rem] font-medium md:hidden`}
          >
            <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
              <span
                className={`h-px bg-current transition-transform duration-(--duration-base) ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`}
              />
              <span
                className={`h-px bg-current transition-transform duration-(--duration-base) ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
              />
            </span>
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-menu"
        ref={panelRef}
        aria-label="Primary mobile"
        hidden={!menuOpen}
        className="pointer-events-auto md:hidden"
      >
        <Container>
          {/* max-h + overflow lets the menu scroll on short screens, so every link stays reachable */}
          <ul
            className={`${glass} max-h-[calc(100svh-var(--header-h)-1rem)] overflow-y-auto overscroll-contain rounded-[1.25rem] bg-bg/90 p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)]`}
          >
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center justify-between rounded-md px-4 font-display text-2xl font-medium ${
                      isActive ? 'bg-white/8 text-ink forced-colors:underline' : 'text-ink-muted'
                    }`}
                  >
                    {item.label}
                    {isActive && <span aria-hidden="true" className="size-1.5 rounded-full bg-violet-soft" />}
                  </a>
                </li>
              )
            })}
            <li className="p-2 pt-3">{resume}</li>
          </ul>
        </Container>
      </nav>
    </header>
  )
}

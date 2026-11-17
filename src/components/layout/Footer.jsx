import { Container } from './Container'
import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-2 text-sm text-ink-muted md:flex-row md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="inline-flex min-h-12 w-fit items-center hover:text-ink">
          Back to top
        </a>
      </Container>
    </footer>
  )
}

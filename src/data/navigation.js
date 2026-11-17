/** Order follows PORTFOLIO_PLAN.md section 3: About, Skills, Projects, Contact (+ Resume). */
export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

/** The hero is the page top; it has no nav entry of its own. */
export const HERO_ID = 'top'

export const sectionIds = [HERO_ID, ...navItems.map((item) => item.id)]

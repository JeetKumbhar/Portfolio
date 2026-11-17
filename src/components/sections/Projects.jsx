import { projects } from '@/data/projects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ProjectStage } from '@/components/projects/ProjectStage'
import { ProjectList } from '@/components/projects/ProjectList'

/**
 * Same content, two layouts:
 *  - large screens with motion allowed: the scroll-driven stage
 *  - everything else (phones, tablets, reduced motion): a plain vertical list
 */
export function Projects() {
  const useStage = useMediaQuery('(min-width: 64rem) and (prefers-reduced-motion: no-preference)')
  return useStage ? <ProjectStage projects={projects} /> : <ProjectList projects={projects} />
}

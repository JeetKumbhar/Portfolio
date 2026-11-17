/**
 * Shared hero scroll progress (0 at the top of the page, 1 when the hero stage releases).
 * Written by GSAP ScrollTrigger in Hero, read every frame by the 3D scene. A plain
 * mutable object on purpose: it changes per frame and must not trigger React renders.
 */
export const heroProgress = { value: 0 }

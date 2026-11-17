import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { mulberry32 } from '@/components/scene/procedural'

/** Sparse, slowly drifting dust. Seeded, so the field is identical on every load. */
export function Particles({ count }) {
  const ref = useRef(null)

  const positions = useMemo(() => {
    const rand = mulberry32(21)
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2.6 + rand() * 4.4
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7
      data[i * 3 + 2] = radius * Math.cos(phi) - 1
    }
    return data
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        sizeAttenuation
        color="#d9d0ff"
        transparent
        opacity={0.65}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Euler, PMREMGenerator, DoubleSide, BackSide } from 'three'

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { heroProgress } from '@/lib/heroProgress'
import { atmosphereMaterialParams, rimMaterialParams } from './shaders'
import { Particles } from './Particles'

const TIERS = {
  full: { dpr: [1, 1.5], particles: 420, segments: 72, pointer: true, antialias: true },
  lite: { dpr: [1, 1.25], particles: 150, segments: 40, pointer: false, antialias: false },
}

/** Camera distance that makes the planet match the static SVG's size and placement. */
const CAMERA_Z = 6.6
/** The ring plane's elevation toward the camera, and its roll on screen (matches the SVG ring). */
const RING_TILT = 0.237
const RING_ROLL = 0.28

const RINGS = [
  { radius: 1.65, tube: 0.009, opacity: 0.8 },
  { radius: 1.82, tube: 0.006, opacity: 0.5 },
  { radius: 1.98, tube: 0.005, opacity: 0.32 },
]

const MOONS = [
  { radius: 0.09, orbit: 1.75, speed: 0.11, phase: 0.55, inclination: 0.5, color: '#3a2c9a' },
  { radius: 0.052, orbit: 2.05, speed: -0.07, phase: 3.9, inclination: -0.4, color: '#2a46a8' },
  { radius: 0.032, orbit: 1.55, speed: 0.16, phase: 2.1, inclination: 0.9, color: '#3a2c9a' },
]

function Scene({ tier, onReady }) {
  const config = TIERS[tier]
  const rig = useRef(null)
  const moons = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const frames = useRef(0)
  const slowFrames = useRef(0)
  const readyCalled = useRef(false)

  const gl = useThree((state) => state.gl)
  const setDpr = useThree((state) => state.setDpr)

  const ringEuler = useMemo(() => new Euler(RING_TILT, 0, RING_ROLL, 'ZXY'), [])

  // Subtle studio reflections from a generated environment: no network request, no HDR file.
  const envMap = useMemo(() => {
    const pmrem = new PMREMGenerator(gl)
    const env = new RoomEnvironment()
    const target = pmrem.fromScene(env, 0.04)
    pmrem.dispose()
    env.dispose()
    return target
  }, [gl])

  useEffect(() => () => envMap.dispose(), [envMap])

  useEffect(() => {
    if (!config.pointer) return
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [config.pointer])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const progress = heroProgress.value
    // After a long pause (hero off-screen) delta can be large; cap it so nothing jumps.
    const ease = Math.min(1, Math.min(delta, 0.1) * 3)

    moons.current?.children.forEach((moon, i) => {
      const m = MOONS[i]
      const angle = m.phase + t * m.speed
      moon.position.set(
        Math.cos(angle) * m.orbit,
        Math.sin(angle) * m.orbit * Math.sin(m.inclination) * 0.5,
        Math.sin(angle) * m.orbit * 0.6,
      )
    })

    if (rig.current) {
      // Pointer parallax plus a scroll-driven tilt and lift.
      const targetY = pointer.current.x * 0.18
      const targetX = pointer.current.y * 0.1 + progress * 0.32
      rig.current.rotation.y += (targetY - rig.current.rotation.y) * ease
      rig.current.rotation.x += (targetX - rig.current.rotation.x) * ease
      rig.current.position.y = progress * 0.28
    }

    // Scroll dolly: the camera pushes toward the planet as the hero releases.
    state.camera.position.z = CAMERA_Z - progress * 2.2

    // Adaptive quality: if early frames are slow, drop to 1x pixel ratio once.
    frames.current += 1
    if (frames.current > 30 && frames.current <= 150) {
      // Idle frames are about 33 ms apart on purpose, so only count frames well beyond that as slow.
      if (delta > 0.055) slowFrames.current += 1
      if (frames.current === 150 && slowFrames.current > 60) setDpr(1)
    }

    if (!readyCalled.current && frames.current >= 3) {
      readyCalled.current = true
      onReady()
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} color="#6a58d6" />
      <directionalLight position={[-3, 3, 4]} intensity={3.2} color="#b9a8ff" />
      <directionalLight position={[4, -1, -2]} intensity={0.9} color="#4d7bff" />

      <group ref={rig}>
        <mesh>
          <sphereGeometry args={[1, config.segments, config.segments]} />
          <meshPhysicalMaterial
            color="#150d3f"
            emissive="#0f0830"
            emissiveIntensity={0.6}
            roughness={0.42}
            metalness={0.1}
            clearcoat={0.55}
            clearcoatRoughness={0.3}
            envMap={envMap.texture}
            envMapIntensity={0.12}
          />
        </mesh>

        {/* Lit-edge crescent and atmosphere */}
        <mesh scale={1.004}>
          <sphereGeometry args={[1, config.segments, config.segments]} />
          <shaderMaterial args={[rimMaterialParams]} />
        </mesh>
        <mesh scale={1.16}>
          <sphereGeometry args={[1, 40, 40]} />
          <shaderMaterial args={[{ ...atmosphereMaterialParams, side: BackSide }]} />
        </mesh>

        {/* Rings sit in a tilted, rolled frame; depth testing gives the front/back occlusion. */}
        <group rotation={ringEuler}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            {RINGS.map((ring) => (
              <mesh key={ring.radius}>
                <torusGeometry args={[ring.radius, ring.tube, 6, 200]} />
                <meshBasicMaterial color="#d6cbff" transparent opacity={ring.opacity} toneMapped={false} />
              </mesh>
            ))}
            <mesh>
              <ringGeometry args={[1.62, 1.98, 160, 1]} />
              <meshBasicMaterial
                color="#7c5cff"
                transparent
                opacity={0.07}
                side={DoubleSide}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>

        <group ref={moons}>
          {MOONS.map((moon) => (
            <mesh key={moon.orbit}>
              <sphereGeometry args={[moon.radius, 24, 24]} />
              <meshStandardMaterial
                color={moon.color}
                roughness={0.4}
                metalness={0.2}
                envMap={envMap.texture}
                envMapIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      </group>

      <Particles count={config.particles} />
    </>
  )
}

/** While idle the scene only drifts slowly, so about 30 frames a second is plenty. */
const IDLE_FRAME_MS = 33

/**
 * Decides when to draw a frame (the Canvas is in "demand" mode):
 *  - idle: about 30 frames a second, which is enough for the slow moons and dust
 *  - while the visitor scrolls or moves the mouse: every frame, so the camera move stays smooth
 *  - hero off-screen (active = false): no frames at all
 */
function FrameDriver({ active, followPointer }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!active) return
    let raf = 0
    let lastDraw = 0
    let busyUntil = 0

    const markBusy = (ms) => {
      busyUntil = performance.now() + ms
    }
    const onScroll = () => markBusy(200)
    const onPointerMove = () => markBusy(700) // longer, so the parallax can settle smoothly

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (now < busyUntil || now - lastDraw >= IDLE_FRAME_MS) {
        lastDraw = now
        invalidate()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    if (followPointer) window.addEventListener('pointermove', onPointerMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [active, followPointer, invalidate])

  return null
}

export default function HeroScene({ tier, active, onReady, onContextLost }) {
  const config = TIERS[tier]

  return (
    <Canvas
      frameloop="demand"
      dpr={config.dpr}
      camera={{ position: [0, 0, CAMERA_Z], fov: 35, near: 0.1, far: 40 }}
      gl={{ antialias: config.antialias, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault()
          onContextLost()
        })
      }}
    >
      <FrameDriver active={active} followPointer={config.pointer} />
      <Scene tier={tier} onReady={onReady} />
    </Canvas>
  )
}

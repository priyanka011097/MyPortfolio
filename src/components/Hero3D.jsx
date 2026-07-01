import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Environment,
} from '@react-three/drei'
import { useTheme } from '../context/ThemeContext.jsx'

/* Waypoints the object glides through as the page scrolls (0 = top, 1 = bottom).
   x: -1..1 (left→right), y: -1..1 (bottom→top) in viewport fractions. */
const WAYPOINTS = [
  [0.55, 0.45],   // hero — right, next to the name
  [-0.55, 0.05],  // About Me — left
  [0.55, -0.05],  // Motivation — right
  [0.0, -0.15],   // Skills — center (behind the columns)
  [-0.72, -0.38], // end — far left
]
const HIT_RADIUS_WORLD = 1.4 // approx on-screen radius of the shape for drag hit-testing

function samplePath(t) {
  const n = WAYPOINTS.length - 1
  const scaled = Math.min(Math.max(t, 0), 1) * n
  const i = Math.min(Math.floor(scaled), n - 1)
  let f = scaled - i
  f = f * f * (3 - 2 * f)
  const a = WAYPOINTS[i]
  const b = WAYPOINTS[i + 1]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]
}

function Scene({ progressRef, mouseRef, ctl, blobColor, accent }) {
  const group = useRef()
  const inner = useRef()
  const { viewport } = useThree()

  useFrame((state, dt) => {
    const [fx, fy] = samplePath(progressRef.current)
    const a = 1 - Math.exp(-6 * Math.min(dt, 0.1)) // frame-rate-independent easing
    const c = ctl.current
    c.cur.x += (fx - c.cur.x) * a
    c.cur.y += (fy - c.cur.y) * a
    c.vpw = viewport.width
    if (!group.current) return
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    group.current.position.x = c.cur.x * (viewport.width / 2) + mx * 0.25
    group.current.position.y = c.cur.y * (viewport.height / 2) + my * 0.25
    if (inner.current) {
      if (!c.dragging) c.userRot.y += dt * 0.35 // gentle auto-spin when not dragging
      inner.current.rotation.y = c.userRot.y
      inner.current.rotation.x = c.userRot.x + (c.dragging ? 0 : my * 0.3)
    }
  })

  return (
    <group ref={group}>
      <group ref={inner}>
        <mesh scale={1.15}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            color={blobColor}
            roughness={0.12}
            metalness={0.4}
            distort={0.4}
            speed={1.8}
            iridescence={1}
            iridescenceIOR={1.6}
            iridescenceThicknessRange={[130, 900]}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.8}
          />
        </mesh>

        <Float speed={2} rotationIntensity={2} floatIntensity={2.2}>
          <mesh position={[1.85, 1.05, -0.8]} scale={0.3}>
            <torusGeometry args={[1, 0.4, 32, 96]} />
            <MeshWobbleMaterial color={accent} factor={0.6} speed={1.5} metalness={0.9} roughness={0.12} envMapIntensity={1.3} />
          </mesh>
        </Float>
        <Float speed={1.6} rotationIntensity={3} floatIntensity={2}>
          <mesh position={[-1.75, -1.05, -0.5]} scale={0.34}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={accent} metalness={1} roughness={0.14} envMapIntensity={1.4} />
          </mesh>
        </Float>
        <Float speed={2.6} rotationIntensity={1.5} floatIntensity={3}>
          <mesh position={[1.55, -1.25, 0.6]} scale={0.18}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.08} envMapIntensity={1.6} />
          </mesh>
        </Float>
      </group>
    </group>
  )
}

export default function Hero3D() {
  const { theme } = useTheme()
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ctl = useRef({
    cur: { x: 0.55, y: 0.45 },
    vpw: 7.37,
    userRot: { x: 0, y: 0 },
    dragging: false,
    last: { x: 0, y: 0 },
  })

  const blobColor = theme === 'dark' ? '#6a5cff' : '#8a90c8'
  const accent = theme === 'dark' ? '#20c9c9' : '#7a8ad0'

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = max > 0 ? window.scrollY / max : 0
    }

    // shape's current screen position + hit radius (px)
    const shapeScreen = () => {
      const c = ctl.current
      const cx = (c.cur.x * 0.5 + 0.5) * window.innerWidth
      const cy = (0.5 - c.cur.y * 0.5) * window.innerHeight
      const pxPerWorld = window.innerWidth / c.vpw
      return { cx, cy, r: HIT_RADIUS_WORLD * pxPerWorld }
    }
    const isOver = (e) => {
      const { cx, cy, r } = shapeScreen()
      return Math.hypot(e.clientX - cx, e.clientY - cy) < r
    }

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return // don't hijack touch-scroll
      if (isOver(e)) {
        ctl.current.dragging = true
        ctl.current.last = { x: e.clientX, y: e.clientY }
        document.body.style.cursor = 'grabbing'
        e.preventDefault()
      }
    }
    const onPointerMove = (e) => {
      // tilt / parallax
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)

      if (ctl.current.dragging) {
        const dx = e.clientX - ctl.current.last.x
        const dy = e.clientY - ctl.current.last.y
        ctl.current.userRot.y += dx * 0.01
        ctl.current.userRot.x += dy * 0.01
        ctl.current.last = { x: e.clientX, y: e.clientY }
        e.preventDefault()
      } else if (e.pointerType !== 'touch') {
        // grab-cursor affordance when hovering the shape
        document.body.style.cursor = isOver(e) ? 'grab' : ''
      }
    }
    const onPointerUp = () => {
      if (ctl.current.dragging) {
        ctl.current.dragging = false
        document.body.style.cursor = ''
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <div className="hero-3d">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-6, -3, 2]} intensity={40} color="#ff4fa3" />
          <pointLight position={[6, 3, 4]} intensity={35} color="#4fd0ff" />
          <pointLight position={[0, -5, -3]} intensity={25} color="#9b5cff" />
          <Scene progressRef={progressRef} mouseRef={mouseRef} ctl={ctl} blobColor={blobColor} accent={accent} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

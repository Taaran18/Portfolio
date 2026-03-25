'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingObjects from './FloatingObjects'
import { useMousePosition } from '@/hooks/useMousePosition'

/** Inner camera rig that subtly pans toward the cursor */
function CameraRig({ normalised }: { normalised: { x: number; y: number } }) {
  const rig = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!rig.current) return
    // Smooth damp toward mouse position
    rig.current.rotation.y +=
      (normalised.x * 0.08 - rig.current.rotation.y) * 0.03
    rig.current.rotation.x +=
      (-normalised.y * 0.05 - rig.current.rotation.x) * 0.03
  })

  return <group ref={rig} />
}

interface SceneProps {
  /** Optional height class, defaults to full viewport */
  className?: string
}

export default function Scene({ className = 'fixed inset-0 -z-10' }: SceneProps) {
  const { normalised } = useMousePosition()

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: false,           // perf
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}               // cap pixel ratio
      >
        {/* Subtle ambient + directional light */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#22d3ee" />
        <directionalLight position={[-10, -5, -5]} intensity={0.3} color="#a855f7" />

        <Suspense fallback={null}>
          <CameraRig normalised={normalised} />
          <ParticleField mouseNorm={normalised} />
          <FloatingObjects mouseNorm={normalised} />
        </Suspense>

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
    </div>
  )
}

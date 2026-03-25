'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  mouseNorm: { x: number; y: number }
  count?: number
}

/**
 * A large field of tiny glowing particles that slowly rotate
 * and subtly respond to mouse movement.
 */
export default function ParticleField({ mouseNorm, count = 3000 }: Props) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions once
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const cyan = new THREE.Color('#22d3ee')
    const purple = new THREE.Color('#a855f7')
    const white = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      // Spread across a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 4 + Math.random() * 8

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Randomly tint particles cyan, purple, or white
      const t = Math.random()
      const color = t < 0.4 ? cyan : t < 0.7 ? purple : white
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime

    // Gentle base rotation
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = time * 0.015

    // Mouse influence — adds to the base rotation
    pointsRef.current.rotation.y += mouseNorm.x * 0.05
    pointsRef.current.rotation.x -= mouseNorm.y * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

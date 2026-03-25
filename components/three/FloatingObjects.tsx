'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  mouseNorm: { x: number; y: number }
}

/** A single wireframe mesh that floats and rotates */
function WireShape({
  geometry,
  position,
  color,
  speed = 1,
  mouseNorm,
}: {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  color: string
  speed?: number
  mouseNorm: { x: number; y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const basePos = useRef(new THREE.Vector3(...position))

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Floating motion
    meshRef.current.position.y =
      basePos.current.y + Math.sin(t * speed * 0.5) * 0.4
    meshRef.current.position.x =
      basePos.current.x + Math.cos(t * speed * 0.3) * 0.2

    // Continuous rotation
    meshRef.current.rotation.x = t * speed * 0.2
    meshRef.current.rotation.y = t * speed * 0.15
    meshRef.current.rotation.z = t * speed * 0.1

    // Subtle mouse tilt
    meshRef.current.rotation.x += mouseNorm.y * 0.1
    meshRef.current.rotation.y += mouseNorm.x * 0.1
  })

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial color={color} wireframe opacity={0.35} transparent />
    </mesh>
  )
}

/**
 * Several floating wireframe shapes scattered around the background scene.
 */
export default function FloatingObjects({ mouseNorm }: Props) {
  // Geometries are stable references (created once)
  const torus = new THREE.TorusGeometry(0.8, 0.25, 16, 60)
  const icosa = new THREE.IcosahedronGeometry(0.7, 1)
  const octa = new THREE.OctahedronGeometry(0.6, 0)
  const tetra = new THREE.TetrahedronGeometry(0.7, 0)
  const torusKnot = new THREE.TorusKnotGeometry(0.5, 0.15, 80, 12)

  return (
    <group>
      <WireShape geometry={torus}     position={[-3.5, 1.5, -2]}  color="#22d3ee" speed={0.8} mouseNorm={mouseNorm} />
      <WireShape geometry={icosa}     position={[3.2, -1.2, -1.5]} color="#a855f7" speed={1.2} mouseNorm={mouseNorm} />
      <WireShape geometry={octa}      position={[-2.8, -2, -3]}    color="#22d3ee" speed={0.6} mouseNorm={mouseNorm} />
      <WireShape geometry={tetra}     position={[2.5, 2, -2.5]}    color="#f0abfc" speed={1.0} mouseNorm={mouseNorm} />
      <WireShape geometry={torusKnot} position={[0, -2.8, -1]}     color="#818cf8" speed={0.5} mouseNorm={mouseNorm} />
    </group>
  )
}

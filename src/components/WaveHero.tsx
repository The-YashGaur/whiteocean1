'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WaveHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50)
    const material = new THREE.MeshBasicMaterial({
      color: 0x00B4D8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wave = new THREE.Mesh(geometry, material)
    scene.add(wave)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xFF7A00,
      transparent: true,
      opacity: 0.8,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    camera.position.z = 5
    camera.position.y = 2
    camera.rotation.x = -0.3

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Wave animation
      const positions = wave.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.3 + time) * 0.3
      }
      wave.geometry.attributes.position.needsUpdate = true

      // Particles animation
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full absolute inset-0" />
}

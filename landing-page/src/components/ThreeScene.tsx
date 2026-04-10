'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  isMobile?: boolean
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ containerRef, isMobile = false }) => {
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const targetRotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current || isMobile) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 2.5
    cameraRef.current = camera

    // Renderer with optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Cap at 1.5x for performance
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Geometry: Icosphere for smooth, optimized 3D shape
    const geometry = new THREE.IcosahedronGeometry(1, 4)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00f5ff,
      wireframe: false,
      shininess: 100,
      emissive: 0x003366,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.8,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    meshRef.current = mesh

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00f5ff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xff2d78, 0.5)
    pointLight.position.set(-5, -5, 2)
    scene.add(pointLight)

    // Animation loop with request animation frame for 60fps
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (meshRef.current && targetRotationRef.current) {
        // Smooth interpolation for mouse-reactive rotation
        meshRef.current.rotation.x += (targetRotationRef.current.x - meshRef.current.rotation.x) * 0.05
        meshRef.current.rotation.y += (targetRotationRef.current.y - meshRef.current.rotation.y) * 0.05

        // Auto-rotation when idle
        meshRef.current.rotation.x += 0.0005
        meshRef.current.rotation.y += 0.0008
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      targetRotationRef.current = {
        x: (y - 0.5) * 0.5,
        y: (x - 0.5) * 0.5,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Handle window resize
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isMobile])

  return null
}

export default ThreeScene

'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  const positionRef = useRef({ x: 0, y: 0 })
  const ringPositionRef = useRef({ x: 0, y: 0 })
  const targetPosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const isHoveringRef = useRef(false)

  // Optimized magnetic target calculation
  const calculateMagneticTarget = (el: Element, cursorX: number, cursorY: number) => {
    const rect = el.getBoundingClientRect()
    const elCenterX = rect.left + rect.width / 2
    const elCenterY = rect.top + rect.height / 2

    const distanceX = elCenterX - cursorX
    const distanceY = elCenterY - cursorY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < 120) {
      // Premium easing curve for magnetic pull
      const strength = Math.pow((120 - distance) / 120, 1.5)
      targetPosRef.current = {
        x: cursorX + distanceX * strength * 0.35,
        y: cursorY + distanceY * strength * 0.35,
      }
    } else {
      targetPosRef.current = { x: cursorX, y: cursorY }
    }
  }

  // Check if element is interactive
  const isInteractiveElement = (el: Element | null): boolean => {
    if (!el) return false
    return el.matches('a, button, [role="button"], input, textarea, select, [data-magnetic], .button-like')
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
      setPosition({ x: e.clientX, y: e.clientY })

      // Check for interactive elements more efficiently
      const interactiveElement = document.elementFromPoint(e.clientX, e.clientY)
      if (interactiveElement && isInteractiveElement(interactiveElement)) {
        calculateMagneticTarget(interactiveElement, e.clientX, e.clientY)
      } else {
        targetPosRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    // Smooth animation loop with better interpolation
    const updateRingPosition = () => {
      // Use refs to avoid state closure issues
      const targetRef = targetPosRef.current
      const currentRef = ringPositionRef.current

      // Smooth exponential decay for premium feel (original position: 0.15)
      const easing = 0.12 // Slightly slower for smoother feel
      ringPositionRef.current = {
        x: currentRef.x + (targetRef.x - currentRef.x) * easing,
        y: currentRef.y + (targetRef.y - currentRef.y) * easing,
      }

      setRingPosition({ ...ringPositionRef.current })
      animationFrameRef.current = requestAnimationFrame(updateRingPosition)
    }

    // Event listeners for hover states
    const handleMouseEnter = () => {
      isHoveringRef.current = true
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      isHoveringRef.current = false
      setIsHovering(false)
    }

    // Add hover listeners to interactive elements
    const setupEventListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-magnetic], .button-like'
      )

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    setupEventListeners()
    animationFrameRef.current = requestAnimationFrame(updateRingPosition)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Cleanup event listeners
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-magnetic], .button-like'
      )
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div className="cursor fixed top-0 left-0 z-9999 pointer-events-none hidden lg:block">
      {/* Outer Glow Ring (Renders first, behind cursor) */}
      <motion.div
        className="cursor-glow-outer w-24 h-24 rounded-full absolute"
        style={{
          left: ringPosition.x,
          top: ringPosition.y,
          transform: 'translate(-50%, -50%)',
          background: isHovering
            ? 'radial-gradient(circle, rgba(180, 255, 57, 0.15), transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 245, 255, 0.08), transparent 70%)',
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
      />

      {/* Cursor Ring with Magnetic Effect */}
      <motion.div
        className="cursor-ring border rounded-full absolute"
        style={{
          left: ringPosition.x,
          top: ringPosition.y,
          transform: 'translate(-50%, -50%)',
          borderColor: isHovering ? '#b4ff39' : '#00f5ff',
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          opacity: isHovering ? 1 : 0.65,
          boxShadow: isHovering
            ? '0 0 25px rgba(180, 255, 57, 0.6), inset 0 0 25px rgba(180, 255, 57, 0.1)'
            : '0 0 15px rgba(0, 245, 255, 0.4)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
      />

      {/* Cursor Dot (Center) */}
      <motion.div
        className="cursor-dot w-2.5 h-2.5 bg-cyan rounded-full absolute"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 0.4 : 1,
          boxShadow: isHovering ? '0 0 10px #b4ff39' : '0 0 5px #00f5ff',
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 28,
        }}
      />
    </div>
  )
}

export default Cursor


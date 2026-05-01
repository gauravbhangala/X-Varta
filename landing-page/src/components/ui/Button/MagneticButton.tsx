'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  magneticStrength?: number
}

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  magneticStrength = 30,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      // Only apply magnetic effect within certain distance
      if (distance < 150) {
        const angle = Math.atan2(distanceY, distanceX)
        const moveX = Math.cos(angle) * (magneticStrength - distance / 5)
        const moveY = Math.sin(angle) * (magneticStrength - distance / 5)

        setPosition({ x: moveX * 0.5, y: moveY * 0.5 })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magneticStrength])

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className={`relative inline-block ${className}`}
      >
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            variant === 'primary'
              ? 'bg-cyan text-black hover:bg-acid'
              : 'bg-transparent border-2 border-cyan text-cyan hover:border-acid hover:text-acid'
          }`}
        >
          {children}
        </button>
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative ${className} px-6 py-3 rounded-lg font-semibold transition-all ${
        variant === 'primary'
          ? 'bg-cyan text-black hover:bg-acid'
          : 'bg-transparent border-2 border-cyan text-cyan hover:border-acid hover:text-acid'
      }`}
    >
      {children}
    </motion.button>
  )
}

export default MagneticButton

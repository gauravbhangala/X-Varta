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

    window.addEventListener('mousemove', handleMouseMove)
    ref.current?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ref.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magneticStrength])

  const baseStyles = {
    primary:
      'bg-gradient-to-br from-cyan to-blue-600 text-black hover:shadow-3xl hover:shadow-cyan/40',
    secondary:
      'border border-cyan/20 text-white bg-transparent hover:border-cyan hover:text-cyan',
  }

  const Component = href ? 'a' : 'button'

  return (
    <div ref={ref} className="relative inline-block">
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
        className="relative"
      >
        <Component
          href={href}
          onClick={onClick}
          className={`font-mono text-xs font-bold tracking-wider uppercase px-14 py-6 transition-all inline-block ${baseStyles[variant]} ${className}`}
          style={{ clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)' }}
        >
          {children}
        </Component>
      </motion.div>

      {/* Glow effect background */}
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 0.2,
        }}
        className="absolute inset-0 bg-cyan/20 rounded-sm blur-xl -z-10 pointer-events-none"
        style={{ clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)' }}
      />
    </div>
  )
}

export default MagneticButton

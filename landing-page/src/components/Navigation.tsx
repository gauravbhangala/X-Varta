'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6 transition-all duration-400 ${
        isScrolled
          ? 'bg-black/85 border-b border-cyan/20 backdrop-blur-xl py-4'
          : 'border-b border-transparent'
      }`}
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/" className="group">
          <div className="font-bebas text-2xl tracking-wider text-white">
            NEX<span className="text-cyan">US</span>
          </div>
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex gap-10 list-none"
      >
        {navItems.map((item) => (
          <motion.li key={item.label} variants={itemVariants}>
            <Link
              href={item.href}
              className="group font-mono text-xs tracking-wider text-muted uppercase transition-colors duration-300 hover:text-white relative"
            >
              <span className="text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                // 
              </span>
              <span className="group-hover:text-cyan transition-colors">{item.label}</span>
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-cyan"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* CTA Button */}
      <motion.a
        href="/contact"
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 245, 255, 0.2)' }}
        whileTap={{ scale: 0.98 }}
        className="hidden lg:block font-mono text-xs font-bold tracking-widest uppercase text-black bg-cyan px-7 py-3 transition-all hover:bg-acid"
        style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
      >
        Get Started
      </motion.a>
    </motion.nav>
  )
}

export default Navigation

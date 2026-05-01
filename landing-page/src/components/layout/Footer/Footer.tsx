'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  const footerVariants = {
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#cta' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-cyan/20 px-12 py-12 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 bg-black/20 backdrop-blur-sm"
      role="contentinfo"
    >
      {/* Logo */}
      <motion.div
        variants={itemVariants}
        className="font-bebas text-2xl tracking-wider text-muted hover:text-cyan transition-colors"
      >
        NEX<span className="text-cyan">US</span>
      </motion.div>

      {/* Copyright */}
      <motion.p
        variants={itemVariants}
        className="font-mono text-xs tracking-wider text-muted uppercase"
      >
        © {currentYear} Nexus Agency. All rights reserved.
      </motion.p>

      {/* Links */}
      <motion.nav
        aria-label="Footer links"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex gap-8 list-none"
      >
        <ul className="flex gap-8 list-none">
          {footerLinks.map((link) => (
            <motion.li key={link.label} variants={itemVariants}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-wider uppercase text-muted hover:text-cyan transition-colors relative group"
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-cyan"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </motion.footer>
  )
}

export default Footer

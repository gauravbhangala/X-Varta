'use client'

import { motion } from 'framer-motion'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h4 className="font-bold text-white mb-4">X Varta</h4>
            <p className="text-sm text-slate-400">Enterprise solutions for digital transformation</p>
          </motion.div>

          {/* Product */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <div className="space-y-2 text-sm">
              <p className="hover:text-white cursor-pointer transition">Features</p>
              <p className="hover:text-white cursor-pointer transition">Pricing</p>
              <p className="hover:text-white cursor-pointer transition">Security</p>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <p className="hover:text-white cursor-pointer transition">About</p>
              <p className="hover:text-white cursor-pointer transition">Blog</p>
              <p className="hover:text-white cursor-pointer transition">Careers</p>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <p className="hover:text-white cursor-pointer transition">Privacy</p>
              <p className="hover:text-white cursor-pointer transition">Terms</p>
              <p className="hover:text-white cursor-pointer transition">Contact</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">© {currentYear} X Varta. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

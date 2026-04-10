'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    challenge: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', company: '', challenge: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      title: 'Email',
      value: 'hello@nexus.agency',
      description: 'Direct inquiries and proposals',
    },
    {
      title: 'Response Time',
      value: '24 Hours',
      description: 'We respond to all inquiries within one business day',
    },
    {
      title: 'Initial Consultation',
      value: 'Free',
      description: '30-min call to discuss your challenges and determine fit',
    },
  ]

  return (
    <main className="bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-12 pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-acid/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-cyan mb-6">
              <motion.div className="w-10 h-px bg-cyan" />
              Get In Touch
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6 text-white">
              Let's Talk <span className="text-cyan">Strategy</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted leading-relaxed">
              Have a digital challenge? We'd like to understand it. Schedule a free 30-minute consultation.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Info & Form */}
      <section className="relative px-12 py-32 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
              >
                <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-3">{info.title}</p>
                <h3 className="font-bebas text-2xl text-white mb-3">{info.value}</h3>
                <p className="text-sm text-muted">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-cyan/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-cyan/40 transition-all"
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-cyan/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-cyan/40 transition-all"
                    placeholder="you@company.com"
                  />
                </motion.div>

                {/* Company */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white mb-3">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-cyan/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-cyan/40 transition-all"
                    placeholder="Your company"
                  />
                </motion.div>

                {/* Challenge */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white mb-3">Primary Challenge</label>
                  <select
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-cyan/20 rounded-lg text-white focus:outline-none focus:border-cyan/40 transition-all"
                  >
                    <option value="">Select a challenge...</option>
                    <option value="positioning">Market Positioning</option>
                    <option value="platform">Platform Architecture</option>
                    <option value="transformation">Digital Transformation</option>
                    <option value="growth">Growth Acceleration</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white mb-3">Tell Us More</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-card border border-cyan/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-cyan/40 transition-all resize-none"
                    placeholder="Describe your challenge and what success looks like..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? 'Message Sent ✓' : 'Send Message'}
                </motion.button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-cyan text-sm font-semibold"
                  >
                    Thanks for reaching out. We'll be in touch within 24 hours.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h3 className="font-bebas text-2xl text-cyan mb-4">Initial Consultation</h3>
                <p className="text-muted leading-relaxed">
                  We offer a free 30-minute strategy discussion to understand your challenge, assess your situation, and determine if we're a good fit to work together.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="font-bebas text-2xl text-cyan mb-4">What Happens Next</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-cyan font-bold shrink-0">1.</span>
                    <p className="text-sm text-muted">You submit this form</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-cyan font-bold shrink-0">2.</span>
                    <p className="text-sm text-muted">We review and schedule a call within 24 hours</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-cyan font-bold shrink-0">3.</span>
                    <p className="text-sm text-muted">30-min strategy discussion (no sales pitch)</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-cyan font-bold shrink-0">4.</span>
                    <p className="text-sm text-muted">If there's fit, we propose next steps</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-card border border-cyan/20 rounded-lg p-6">
                <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-3">Direct Contact</p>
                <p className="text-lg text-white font-semibold mb-1">hello@nexus.agency</p>
                <p className="text-sm text-muted">Feel free to reach out directly if you prefer.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage

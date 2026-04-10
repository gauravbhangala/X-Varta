'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    const result = await signUp(formData.email, formData.password, formData.fullName)
    if (result) {
      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } else {
      setError('Failed to create account. Please try again.')
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-white mb-2">Account Created!</h1>
          <p className="text-muted">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">X Varta</h1>
          <p className="text-muted">Create Your Account</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Get Started</h2>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

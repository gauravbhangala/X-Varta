'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn(email, password)
      if (result) {
        // Wait a tiny bit for auth state to settle, then redirect
        setTimeout(() => {
          window.location.href = 'http://localhost:3001/'
        }, 100)
      } else {
        setError('Invalid email or password. Please try again.')
        setIsLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4" suppressHydrationWarning>
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">X Varta</h1>
          <p className="text-muted">Dashboard Login</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Test Credentials */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Email: test@xvarta.com</p>
          <p>Password: Test123!</p>
        </div>
      </div>
    </div>
  )
}

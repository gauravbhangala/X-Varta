# Authentication Guide

Complete guide to setting up and using authentication in X Varta.

## 🔐 Authentication Flow

### Sign Up (New User)

**Step 1: Client submits signup form**
```
Email: john@example.com
Password: secure-password123
Full Name: John Doe
```

**Step 2: Supabase Auth creates user**
```
auth.users table gets:
- id: uuid
- email: john@example.com
- encrypted_password
```

**Step 3: Auto-create user profile**
```
public.users table gets:
- id: (same as auth user)
- email: john@example.com
- full_name: John Doe
- role: client (default)
```

**Step 4: JWT token returned**
```
{
  "access_token": "eyJ...",
  "refresh_token": "...",
  "expires_in": 3600
}
```

### Sign In (Existing User)

```
Email: john@example.com
Password: secure-password123
↓
Verified against auth.users
↓
JWT token returned
↓
Stored in browser (httpOnly cookie or localStorage)
↓
Attached to all API requests
```

### Session Management

```
1. Sign In → JWT token (1 hour expiry)
2. Refresh Token used to get new JWT
3. Auto-refresh on expiry
4. Sign Out → Delete session
```

## 📱 Dashboard Implementation

### Installation

```bash
npm install @supabase/supabase-js
```

### Create Auth Context

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Create Auth Hook

Create `src/hooks/useAuth.ts`:

```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    if (error) throw error
    return data
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}
```

### Login Page

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-muted text-sm mt-4">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Signup Page

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    company: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signUp(formData.email, formData.password, formData.fullName)
      
      // Create user profile with company
      // This would be done via API call to set company_name
      
      router.push('/auth/verify-email')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-muted text-sm mt-4">
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
```

## 🔐 Protected Routes Middleware

Create `src/middleware.ts`:

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect unauthenticated users to login
  if (
    !session &&
    !req.nextUrl.pathname.startsWith('/auth') &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 🚀 Production Checklist

- [ ] Email templates configured (optional for custom emails)
- [ ] Password strength requirements set
- [ ] Rate limiting enabled for auth endpoints
- [ ] HTTPS enforced
- [ ] Secure cookies configured
- [ ] Session timeout set (default 1 hour)
- [ ] Refresh token strategy configured
- [ ] Error messages don't leak user info
- [ ] Account lockout after failed attempts
- [ ] Password reset emails working

## 🐛 Troubleshooting

### "Invalid email or password"
- User doesn't exist
- Password is incorrect
- User not confirmed (if email confirmation enabled)

### "User already exists"
- Email already registered
- User was recently deleted (wait 24 hours)

### "Session expired"
- Access token expired (auto-refresh)
- Refresh token expired (re-login required)
- Browser cookies cleared

### CORS errors
- Verify Supabase URL is correct
- Check anon key is valid
- Ensure domain is allowed in Supabase settings

# Dashboard ↔ Backend Integration Guide

This guide explains how to connect the X Varta Dashboard to the Supabase backend.

## 📦 Installation

### 1. Install Supabase Client

```bash
cd dashboard
npm install @supabase/supabase-js
```

### 2. Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = any // Add generated types later
```

## 🔐 Authentication Integration

### Update Auth Store

Update `src/store/authStore.ts` to use Supabase:

```typescript
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'client' | 'team_member'
  avatar_url?: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    set({ user: data.user as any, isAuthenticated: true })
  },

  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    if (error) throw error
    
    // Create user profile
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: 'client',
      })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    try {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        // Fetch user profile from database
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        set({
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      set({ isLoading: false })
    }
  },
}))
```

### Create Auth Pages

Create `src/app/auth/login/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
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
          <h1 className="text-3xl font-bold text-white mb-2">X Varta</h1>
          <p className="text-muted mb-6">Client Dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:border-primary"
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
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:border-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
```

## 📊 Fetching Data

### Example: Projects Page

Update `src/app/projects/page.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  name: string
  status: string
  budget: number
  spent: number
  completion_percentage: number
  due_date: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('due_date', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Error updating project:', error)
    } else {
      // Refetch or update local state
      fetchProjects()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Projects</h1>
      
      <button
        onClick={() => {
          // Create new project
          const name = prompt('Project name:')
          if (name) {
            supabase
              .from('projects')
              .insert({ name })
              .then(() => fetchProjects())
          }
        }}
        className="px-6 py-2 bg-primary text-white rounded-lg"
      >
        + New Project
      </button>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-4 text-left text-white">Name</th>
              <th className="px-6 py-4 text-left text-white">Status</th>
              <th className="px-6 py-4 text-left text-white">Progress</th>
              <th className="px-6 py-4 text-left text-white">Budget</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-border hover:bg-background">
                <td className="px-6 py-4 text-white">{project.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-32 bg-background rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${project.completion_percentage}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted">
                  ${project.spent} / ${project.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

## 🔄 Real-time Updates

Subscribe to real-time changes:

```typescript
useEffect(() => {
  const subscription = supabase
    .from('projects')
    .on('*', (payload) => {
      console.log('Project updated:', payload)
      // Update local state
      if (payload.eventType === 'INSERT') {
        setProjects([...projects, payload.new])
      } else if (payload.eventType === 'UPDATE') {
        setProjects(
          projects.map((p) => p.id === payload.new.id ? payload.new : p)
        )
      } else if (payload.eventType === 'DELETE') {
        setProjects(projects.filter((p) => p.id !== payload.old.id))
      }
    })
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

## 🔒 Protected Routes

Create middleware to protect routes:

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

  // Redirect to login if not authenticated
  if (!session && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!auth|_next|public).*)',
  ],
}
```

## 🪝 Custom Hook for Fetching

Create `src/hooks/useData.ts`:

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useData<T>(table: string, query?: any) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q = supabase.from(table).select('*')
        
        if (query) {
          Object.entries(query).forEach(([key, value]: [string, any]) => {
            q = q.eq(key, value)
          })
        }

        const { data: result, error: err } = await q
        if (err) throw err
        setData(result || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, query])

  return { data, loading, error }
}
```

Usage:
```typescript
const { data: projects } = useData('projects', { status: 'in_progress' })
```

## 📋 Environment Setup

Copy `.env.local.example` and fill in from Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## ✅ Checklist

- [ ] Supabase project created
- [ ] Schema migrated
- [ ] Auth configured
- [ ] Environment variables in dashboard
- [ ] Supabase client initialized
- [ ] Auth store updated
- [ ] Login page created
- [ ] Projects page connected
- [ ] Real-time subscriptions working
- [ ] Protected routes configured

## 🐛 Common Issues

### "Row level security policy violation"
- User doesn't have proper RLS access
- Check database user role
- Verify RLS policies

### "Auth token expired"
- Implement token refresh
- Check auth storage

### "CORS errors"
- Verify Supabase URL is correct
- Check anon key is valid

## 📚 Next Steps

1. Test login/signup flow
2. Connect remaining pages to database
3. Add real-time subscriptions
4. Implement file uploads
5. Add notifications
6. Deploy to production

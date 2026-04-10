import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Just use auth user data directly, don't fetch profile
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            role: 'client',
            avatar_url: null,
          })
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Session check error:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes - just track auth state, don't fetch profile
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          role: 'client',
          avatar_url: null,
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [setUser])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setError(null)
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message)
        return null
      }

      if (authData.user) {
        // Just set user from auth, don't create profile table entry
        setUser({
          id: authData.user.id,
          email,
          name: fullName,
          role: 'client',
          avatar_url: null,
        })
        return authData
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed'
      setError(message)
      return null
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return null
      }

      // Return immediately - don't do anything else
      // The onAuthStateChange listener will handle profile fetching
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      setError(message)
      return null
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) {
        setError(signOutError.message)
        return false
      }
      logout()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed'
      setError(message)
      return false
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
        return false
      }
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed'
      setError(message)
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface TopbarProps {
  onSidebarToggle: () => void
}

export default function Topbar({ onSidebarToggle }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    if (await signOut()) {
      router.push('/auth/login')
    }
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
      {/* Left: Menu Toggle */}
      <button
        onClick={onSidebarToggle}
        className="p-2 hover:bg-background rounded-lg transition-colors text-muted hover:text-white md:hidden"
        title="Toggle sidebar"
      >
        ☰
      </button>

      {/* Center: Search (optional) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Right: Profile & Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-background rounded-lg transition-colors text-muted hover:text-white">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2 hover:bg-background rounded-lg transition-colors"
          >
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="w-8 h-8 bg-primary rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm text-white font-medium hidden md:block">{user?.name || 'User'}</span>
            <span className="text-muted">▼</span>
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm text-white font-medium">{user?.name}</p>
                <p className="text-xs text-muted">{user?.email}</p>
              </div>
              <button className="w-full text-left px-4 py-3 text-white hover:bg-background transition-colors">
                👤 Profile
              </button>
              <a href="/settings" className="w-full block text-left px-4 py-3 text-white hover:bg-background transition-colors">
                ⚙️ Settings
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-white hover:bg-background transition-colors border-t border-border text-red-400 hover:text-red-300"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

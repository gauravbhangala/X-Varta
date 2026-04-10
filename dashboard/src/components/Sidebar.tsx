'use client'

import Link from 'next/link'
import { useState } from 'react'

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ open }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/projects', label: 'Projects', icon: '📁' },
    { href: '/team', label: 'Team', icon: '👥' },
    { href: '/reports', label: 'Reports', icon: '📈' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-card border-r border-border transition-all duration-200 flex flex-col ${
        !open && 'hidden md:flex'
      }`}
    >
      {/* Logo */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        {!collapsed && <h1 className="text-xl font-bold text-white">X Varta</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-background rounded-lg transition-colors text-muted hover:text-white"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              collapsed
                ? 'justify-center'
                : 'hover:bg-background'
            } text-muted hover:text-white group`}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center gap-3 ${collapsed && 'justify-center'}`}>
          <div className="w-10 h-10 bg-primary rounded-full"></div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-muted truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

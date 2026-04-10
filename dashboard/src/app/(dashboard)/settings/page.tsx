'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => {
      setSaveSuccess(true)
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 500)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-muted">Manage your account and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Success Message */}
        {saveSuccess && (
          <div className="p-4 bg-accent/20 border border-accent/30 rounded-lg text-accent text-sm">
            ✓ Changes saved successfully
          </div>
        )}

        {/* Account Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-muted focus:outline-none transition-colors opacity-60"
              />
              <p className="text-xs text-muted mt-1">Email cannot be changed here</p>
            </div>

            {user?.role && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">Account Type</label>
                <div className="px-4 py-2 bg-background border border-border rounded-lg text-white capitalize">
                  {user.role}
                </div>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity font-medium"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive updates via email' },
              { label: 'Project updates', description: 'Get notified about project changes' },
              { label: 'Team messages', description: 'Alerts for team communications' },
              { label: 'Weekly summary', description: 'Get a summary of activities' },
            ].map((notification, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                <div>
                  <p className="text-white font-medium">{notification.label}</p>
                  <p className="text-muted text-sm">{notification.description}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

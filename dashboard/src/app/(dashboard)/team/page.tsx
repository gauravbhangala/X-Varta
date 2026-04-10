'use client'

import { useState } from 'react'
import { useTeamMembers } from '@/hooks/useData'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

const roleColors: Record<string, string> = {
  'manager': 'bg-primary/20 text-primary',
  'developer': 'bg-blue-500/20 text-blue-400',
  'designer': 'bg-purple-500/20 text-purple-400',
  'consultant': 'bg-orange-500/20 text-orange-400',
}

const roleLabels: Record<string, string> = {
  'manager': 'Manager',
  'developer': 'Developer',
  'designer': 'Designer',
  'consultant': 'Consultant',
}

export default function TeamPage() {
  const { members, loading, refetch } = useTeamMembers()
  const { user } = useAuth()
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'developer' as const,
    hourly_rate: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    if (!user) {
      setError('User not authenticated')
      setIsSubmitting(false)
      return
    }

    if (!formData.full_name || !formData.email || !formData.hourly_rate) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      // Generate a UUID for the member
      const memberId = crypto.randomUUID()
      
      // Create a record in project_members with name and email
      const { data: memberData, error: memberError } = await supabase
        .from('project_members')
        .insert([
          {
            member_id: memberId,
            project_id: user.id,
            role: formData.role,
            hourly_rate: parseInt(formData.hourly_rate),
            hours_logged: 0,
            full_name: formData.full_name,
            email: formData.email,
          },
        ])
        .select()

      if (memberError) {
        setError(memberError.message)
        setIsSubmitting(false)
        return
      }

      setSuccess(`Team member "${formData.full_name}" invited successfully!`)
      setFormData({ full_name: '', email: '', role: 'developer', hourly_rate: '' })
      setTimeout(() => {
        setIsAdding(false)
        setSuccess('')
        refetch()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add team member')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-muted">Manage your team and collaborate effectively.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          {isAdding ? 'Cancel' : '+ Invite Member'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Add Team Member</h2>
          {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">{error}</div>}
          {success && <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm mb-6">{success}</div>}

          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="consultant">Consultant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Hourly Rate ($) *</label>
                <input
                  type="number"
                  name="hourly_rate"
                  value={formData.hourly_rate}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isSubmitting ? 'Inviting...' : 'Invite Member'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted">Loading team members...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted mb-4">No team members yet</p>
          <button
            onClick={() => setIsAdding(true)}
            className="text-primary hover:underline"
          >
            Invite your first team member →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {member.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{member.full_name}</h3>
                  <p className={`text-xs font-medium capitalize px-2 py-1 rounded w-fit ${roleColors[member.role]}`}>
                    {roleLabels[member.role]}
                  </p>
                </div>
              </div>
              <p className="text-muted text-sm mb-2 truncate">{member.email}</p>
              <p className="text-accent text-sm font-medium mb-4">${member.hourly_rate}/hr</p>
              <button className="w-full px-4 py-2 border border-border rounded-lg text-white hover:bg-background transition-colors text-sm">
                Manage
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

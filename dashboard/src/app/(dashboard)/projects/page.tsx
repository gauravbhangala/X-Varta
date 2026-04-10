'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks/useData'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

const statusColors: Record<string, string> = {
  'completed': 'bg-accent/20 text-accent',
  'in_progress': 'bg-primary/20 text-primary',
  'planning': 'bg-blue-500/20 text-blue-400',
  'on_hold': 'bg-orange-500/20 text-orange-400',
  'archived': 'bg-gray-500/20 text-gray-400',
}

const statusLabels: Record<string, string> = {
  'completed': 'Completed',
  'in_progress': 'In Progress',
  'planning': 'Planning',
  'on_hold': 'On Hold',
  'archived': 'Archived',
}

export default function ProjectsPage() {
  const { user } = useAuth()
  const { projects, loading, refetch } = useProjects()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    start_date: '',
    due_date: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    if (!user) {
      setError('User not authenticated')
      setIsSubmitting(false)
      return
    }

    if (!formData.name || !formData.budget) {
      setError('Please fill in project name and budget')
      setIsSubmitting(false)
      return
    }

    try {
      const { data, error: err } = await supabase
        .from('projects')
        .insert([
          {
            name: formData.name,
            description: formData.description,
            budget: parseInt(formData.budget),
            spent: 0,
            completion_percentage: 0,
            status: 'planning',
            client_id: user.id,
            start_date: formData.start_date || new Date().toISOString().split('T')[0],
            due_date: formData.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          },
        ])
        .select()

      if (err) {
        setError(err.message)
        setIsSubmitting(false)
        return
      }

      setSuccess('Project created successfully!')
      setFormData({ name: '', description: '', budget: '', start_date: '', due_date: '' })
      setTimeout(() => {
        setIsCreating(false)
        setSuccess('')
        refetch()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
          <p className="text-muted">Manage and track all your active projects.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          {isCreating ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {isCreating && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Create New Project</h2>
          {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">{error}</div>}
          {success && <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm mb-6">{success}</div>}

          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Website Redesign"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Budget ($) *</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Project details..."
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted mb-4">No projects yet</p>
          <button
            onClick={() => setIsCreating(true)}
            className="text-primary hover:underline"
          >
            Create your first project →
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Project Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-background transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{project.name}</p>
                      <p className="text-muted text-sm">{project.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-background rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.completion_percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted min-w-fit">{project.completion_percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted text-sm">
                    <div>
                      <p className="text-white">${((project.spent || 0) / 1000).toFixed(1)}K / ${((project.budget || 0) / 1000).toFixed(1)}K</p>
                      <p className="text-xs">{project.budget ? Math.round(((project.spent || 0) / project.budget) * 100) : 0}% spent</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted text-sm">{project.due_date ? new Date(project.due_date).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

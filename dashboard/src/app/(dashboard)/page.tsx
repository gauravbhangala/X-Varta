'use client'

import { useProjects, useReports, useTeamMembers } from '@/hooks/useData'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { projects, loading: projectsLoading } = useProjects()
  const { reports, loading: reportsLoading } = useReports()
  const { members } = useTeamMembers()

  const isLoading = authLoading || projectsLoading || reportsLoading

  // Calculate stats
  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.status === 'in_progress').length
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0)
  const completionRate = projects.length > 0
    ? Math.round(projects.reduce((sum, p) => sum + p.completion_percentage, 0) / projects.length)
    : 0

  const statCards = [
    { label: 'Total Projects', value: totalProjects.toString(), change: `${activeProjects} active` },
    { label: 'Total Budget', value: `$${(totalBudget / 1000).toFixed(0)}K`, change: `${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% spent` },
    { label: 'Team Members', value: members.length.toString(), change: 'Across projects' },
    { label: 'Completion Rate', value: `${completionRate}%`, change: 'Average progress' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name || 'User'}</h1>
        <p className="text-muted">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
            <p className="text-muted text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-xs text-accent">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Projects Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Projects</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted mb-4">No projects yet</p>
            <a href="/projects" className="text-primary hover:underline">
              Create your first project →
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="text-white font-medium">{project.name}</p>
                  <p className="text-muted text-sm">{project.description}</p>
                  <div className="mt-2 w-full bg-background rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.completion_percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-white font-medium">${((project.spent || 0) / 1000).toFixed(1)}K / ${((project.budget || 0) / 1000).toFixed(1)}K</p>
                  <p className="text-muted text-sm">{project.completion_percentage}% complete</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted">Loading activity...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted">No activity yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.slice(0, 4).map((report) => (
              <div key={report.id} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                <div>
                  <p className="text-white font-medium">{report.title}</p>
                  <p className="text-muted text-sm">{report.report_type} report · {new Date(report.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  report.report_type === 'revenue' ? 'bg-accent/20 text-accent' :
                  report.report_type === 'time_tracking' ? 'bg-primary/20 text-primary' :
                  report.report_type === 'project_status' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {report.report_type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

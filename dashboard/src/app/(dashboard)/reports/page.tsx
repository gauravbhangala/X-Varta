'use client'

import { useProjects, useReports } from '@/hooks/useData'

export default function ReportsPage() {
  const { projects, loading: projectsLoading } = useProjects()
  const { reports, loading: reportsLoading } = useReports()

  const isLoading = projectsLoading || reportsLoading

  // Calculate statistics
  const completedProjects = projects.filter((p) => p.status === 'completed').length
  const activeProjects = projects.filter((p) => p.status === 'in_progress').length
  const totalRevenue = projects.reduce((sum, p) => sum + ((p.budget || 0) - (p.spent || 0)), 0)

  const stats = [
    { label: 'Total Budget', value: `$${(projects.reduce((sum, p) => sum + (p.budget || 0), 0) / 1000).toFixed(0)}K` },
    { label: 'Spent', value: `$${(projects.reduce((sum, p) => sum + (p.spent || 0), 0) / 1000).toFixed(0)}K` },
    { label: 'Active Projects', value: activeProjects.toString() },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Reports</h1>
        <p className="text-muted">View analytics and performance reports.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-muted">Loading reports...</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Project Status Overview */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Project Status Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted text-sm">Completed</span>
                  <span className="text-white font-medium">{completedProjects}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${projects.length > 0 ? (completedProjects / projects.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted text-sm">In Progress</span>
                  <span className="text-white font-medium">{activeProjects}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${projects.length > 0 ? (activeProjects / projects.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Reports</h2>
            {reports.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted">No reports yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.slice(0, 10).map((report) => (
                  <div key={report.id} className="flex items-start justify-between py-4 border-b border-border last:border-0">
                    <div>
                      <p className="text-white font-medium">{report.title}</p>
                      <p className="text-muted text-sm">
                        {new Date(report.period_start).toLocaleDateString()} - {new Date(report.period_end).toLocaleDateString()}
                      </p>
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
        </>
      )}
    </div>
  )
}

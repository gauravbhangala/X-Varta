import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'

interface Project {
  id: string
  name: string
  description: string | null
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'archived'
  budget: number
  spent: number
  completion_percentage: number
  start_date: string
  due_date: string
  created_at: string
  updated_at: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        setProjects([])
        return
      }

      const { data, error: err } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      if (err) {
        setError(err.message)
        setProjects([])
      } else {
        setProjects(data || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchProjects()
    } else {
      setProjects([])
      setLoading(false)
    }
  }, [user])

  return { projects, loading, error, refetch: fetchProjects }
}

interface Report {
  id: string
  project_id: string
  report_type: 'revenue' | 'time_tracking' | 'project_status' | 'team_performance'
  title: string
  description: string | null
  data: Record<string, any>
  period_start: string
  period_end: string
  generated_by: string
  created_at: string
  updated_at: string
}

export function useReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()
  const { projects } = useProjects()

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user || projects.length === 0) {
        setReports([])
        return
      }

      const projectIds = projects.map((p) => p.id)

      const { data, error: err } = await supabase
        .from('reports')
        .select('*')
        .in('project_id', projectIds)
        .order('created_at', { ascending: false })
        .limit(10)

      if (err) {
        setError(err.message)
        setReports([])
      } else {
        setReports(data || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports')
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [user, projects])

  return { reports, loading, error, refetch: fetchReports }
}

interface TeamMember {
  id: string
  full_name: string
  email: string
  role: 'manager' | 'developer' | 'designer' | 'consultant'
  hourly_rate: number
  hours_logged: number
}

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        setMembers([])
        return
      }

      // For now, just fetch all project_members without filtering by project
      // In production, you'd filter by project_id
      const { data, error: err } = await supabase
        .from('project_members')
        .select('*')
        .limit(50)

      if (err) {
        setError(err.message)
        setMembers([])
      } else {
        const formattedMembers = (data || []).map((item: any) => ({
          id: item.member_id,
          full_name: item.full_name || `Team Member ${item.member_id.slice(0, 8)}`,
          email: item.email || `member${item.member_id.slice(0, 4)}@xvarta.com`,
          role: item.role,
          hourly_rate: item.hourly_rate,
          hours_logged: item.hours_logged || 0,
        }))

        setMembers(formattedMembers)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team members')
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [user])

  return { members, loading, error, refetch: fetchTeamMembers }
}

-- Common Queries for X Varta

-- ============================================================================
-- USER QUERIES
-- ============================================================================

-- Get user profile
SELECT * FROM users WHERE id = auth.uid();

-- Update user profile
UPDATE users 
SET full_name = 'New Name', phone = '123-456-7890'
WHERE id = auth.uid();

-- Get user role
SELECT role FROM users WHERE id = auth.uid();

-- Get all team members for admin
SELECT * FROM users WHERE role IN ('admin', 'team_member');

-- ============================================================================
-- PROJECT QUERIES
-- ============================================================================

-- Get all projects for current user
SELECT * FROM projects 
WHERE client_id = auth.uid()
ORDER BY due_date ASC;

-- Get project with team members
SELECT 
  p.*,
  json_agg(json_build_object(
    'id', pm.id,
    'name', u.full_name,
    'role', pm.role,
    'hours_logged', pm.hours_logged,
    'hourly_rate', pm.hourly_rate
  )) as team_members
FROM projects p
LEFT JOIN project_members pm ON p.id = pm.project_id
LEFT JOIN users u ON pm.member_id = u.id
WHERE p.id = $1
GROUP BY p.id;

-- Get projects by status
SELECT * FROM projects 
WHERE client_id = auth.uid()
  AND status = 'in_progress'
ORDER BY completion_percentage DESC;

-- Get projects with budget overview
SELECT 
  id,
  name,
  budget,
  spent,
  (budget - spent) as remaining,
  ROUND((spent / budget * 100)::numeric, 2) as percent_spent,
  CASE 
    WHEN spent > budget THEN 'OVER'
    WHEN (spent / budget) > 0.9 THEN 'CAUTION'
    ELSE 'OK'
  END as budget_status
FROM projects
WHERE client_id = auth.uid()
ORDER BY percent_spent DESC;

-- Get overdue projects
SELECT * FROM projects 
WHERE client_id = auth.uid()
  AND due_date < CURRENT_DATE
  AND status != 'completed'
ORDER BY due_date ASC;

-- Create new project
INSERT INTO projects (name, description, client_id, budget, start_date, due_date, status)
VALUES ('Project Name', 'Description', auth.uid(), 10000, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 'planning')
RETURNING *;

-- ============================================================================
-- TEAM MEMBER QUERIES
-- ============================================================================

-- Get team members for a project
SELECT 
  pm.id,
  u.full_name,
  u.email,
  pm.role,
  pm.hourly_rate,
  pm.hours_logged,
  pm.hours_logged * pm.hourly_rate as cost
FROM project_members pm
JOIN users u ON pm.member_id = u.id
WHERE pm.project_id = $1
ORDER BY u.full_name;

-- Get total team cost for project
SELECT 
  SUM(pm.hours_logged * pm.hourly_rate) as total_cost,
  COUNT(*) as member_count,
  AVG(pm.hourly_rate) as avg_hourly_rate
FROM project_members pm
WHERE pm.project_id = $1;

-- Get team members across all user's projects
SELECT DISTINCT
  u.id,
  u.full_name,
  u.email,
  COUNT(*) as project_count,
  SUM(pm.hours_logged) as total_hours
FROM project_members pm
JOIN users u ON pm.member_id = u.id
JOIN projects p ON pm.project_id = p.id
WHERE p.client_id = auth.uid()
GROUP BY u.id, u.full_name, u.email
ORDER BY u.full_name;

-- ============================================================================
-- TIME TRACKING QUERIES
-- ============================================================================

-- Get time entries for date range
SELECT 
  te.*,
  u.full_name,
  p.name as project_name,
  te.hours_worked * pm.hourly_rate as cost
FROM time_entries te
JOIN users u ON te.member_id = u.id
JOIN projects p ON te.project_id = p.id
LEFT JOIN project_members pm ON pm.project_id = p.id AND pm.member_id = u.id
WHERE p.client_id = auth.uid()
  AND te.entry_date >= $1
  AND te.entry_date <= $2
ORDER BY te.entry_date DESC;

-- Get billable vs non-billable hours
SELECT 
  billable,
  COUNT(*) as entries,
  SUM(hours_worked) as total_hours,
  ROUND(SUM(hours_worked * COALESCE((
    SELECT hourly_rate FROM project_members 
    WHERE project_id = te.project_id AND member_id = te.member_id
  ), 0))::numeric, 2) as total_cost
FROM time_entries te
WHERE te.project_id = $1
GROUP BY billable;

-- Get hours by team member
SELECT 
  u.full_name,
  SUM(te.hours_worked) as total_hours,
  COUNT(*) as entry_count,
  ROUND(AVG(te.hours_worked)::numeric, 2) as avg_hours_per_entry
FROM time_entries te
JOIN users u ON te.member_id = u.id
WHERE te.project_id = $1
GROUP BY u.id, u.full_name
ORDER BY total_hours DESC;

-- ============================================================================
-- BILLING QUERIES
-- ============================================================================

-- Get invoices for client
SELECT 
  *,
  CASE 
    WHEN status = 'paid' THEN 'Paid'
    WHEN due_date < CURRENT_DATE AND status != 'paid' THEN 'Overdue'
    WHEN status = 'pending' THEN 'Pending'
    ELSE status
  END as display_status
FROM billing
WHERE client_id = auth.uid()
ORDER BY billing_date DESC;

-- Get revenue summary
SELECT 
  DATE_TRUNC('month', billing_date) as month,
  COUNT(*) as invoice_count,
  SUM(amount) as total_amount,
  SUM(tax_amount) as total_tax,
  SUM(total_amount) as total_with_tax,
  SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) as paid,
  SUM(CASE WHEN status != 'paid' THEN total_amount ELSE 0 END) as unpaid
FROM billing
WHERE client_id = auth.uid()
GROUP BY month
ORDER BY month DESC;

-- Get outstanding invoices
SELECT 
  *,
  CURRENT_DATE - due_date as days_overdue
FROM billing
WHERE client_id = auth.uid()
  AND status IN ('pending', 'sent')
  AND due_date < CURRENT_DATE
ORDER BY due_date ASC;

-- Get revenue by project
SELECT 
  p.name,
  COUNT(b.id) as invoice_count,
  SUM(b.total_amount) as total_revenue,
  SUM(CASE WHEN b.status = 'paid' THEN b.total_amount ELSE 0 END) as paid,
  SUM(CASE WHEN b.status != 'paid' THEN b.total_amount ELSE 0 END) as unpaid
FROM billing b
JOIN projects p ON b.project_id = p.id
WHERE b.client_id = auth.uid()
GROUP BY p.id, p.name
ORDER BY total_revenue DESC;

-- ============================================================================
-- REPORT QUERIES
-- ============================================================================

-- Get all reports for user's projects
SELECT 
  r.*,
  p.name as project_name
FROM reports r
JOIN projects p ON r.project_id = p.id
WHERE p.client_id = auth.uid()
ORDER BY r.created_at DESC;

-- Get latest reports by type
SELECT DISTINCT ON (report_type)
  *,
  (SELECT name FROM projects WHERE id = project_id) as project_name
FROM reports
WHERE project_id IN (
  SELECT id FROM projects WHERE client_id = auth.uid()
)
ORDER BY report_type, created_at DESC;

-- ============================================================================
-- ACTIVITY LOG QUERIES
-- ============================================================================

-- Get activity for user's projects
SELECT 
  al.*,
  u.full_name as user_name,
  p.name as project_name
FROM activity_log al
JOIN users u ON al.user_id = u.id
LEFT JOIN projects p ON al.project_id = p.id
WHERE al.project_id IN (
  SELECT id FROM projects WHERE client_id = auth.uid()
)
  OR al.user_id = auth.uid()
ORDER BY al.created_at DESC
LIMIT 50;

-- Get recent changes to specific project
SELECT 
  action,
  entity_type,
  u.full_name,
  changes,
  created_at
FROM activity_log al
JOIN users u ON al.user_id = u.id
WHERE al.project_id = $1
ORDER BY created_at DESC
LIMIT 100;

-- ============================================================================
-- DASHBOARD SUMMARY QUERIES
-- ============================================================================

-- Get dashboard overview
SELECT 
  (SELECT COUNT(*) FROM projects WHERE client_id = auth.uid()) as total_projects,
  (SELECT COUNT(*) FROM projects WHERE client_id = auth.uid() AND status = 'in_progress') as active_projects,
  (SELECT SUM(budget) FROM projects WHERE client_id = auth.uid()) as total_budget,
  (SELECT SUM(spent) FROM projects WHERE client_id = auth.uid()) as total_spent,
  (SELECT SUM(total_amount) FROM billing WHERE client_id = auth.uid() AND status = 'paid') as total_revenue,
  (SELECT SUM(total_amount) FROM billing WHERE client_id = auth.uid() AND status = 'pending') as pending_revenue;

-- Get key metrics
SELECT 
  (SELECT COUNT(DISTINCT member_id) FROM project_members 
   WHERE project_id IN (SELECT id FROM projects WHERE client_id = auth.uid())) as team_size,
  (SELECT SUM(hours_worked) FROM time_entries 
   WHERE project_id IN (SELECT id FROM projects WHERE client_id = auth.uid())) as total_hours,
  (SELECT AVG(completion_percentage) FROM projects 
   WHERE client_id = auth.uid()) as avg_completion,
  (SELECT COUNT(*) FROM projects 
   WHERE client_id = auth.uid() AND due_date < CURRENT_DATE AND status != 'completed') as overdue_projects;

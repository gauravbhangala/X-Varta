-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view project members" ON public.project_members;
DROP POLICY IF EXISTS "Users can view reports" ON public.reports;
DROP POLICY IF EXISTS "Users can view billing" ON public.billing;
DROP POLICY IF EXISTS "Users can view time entries" ON public.time_entries;
DROP POLICY IF EXISTS "Users can view activity logs" ON public.activity_log;

-- Simplified policy: Allow authenticated users to access all data
-- This disables row-level filtering for now - can be made more restrictive later
CREATE POLICY "Enable all access for authenticated users" ON public.users
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.projects
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.project_members
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.reports
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.billing
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.time_entries
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.activity_log
  FOR ALL
  USING (auth.role() = 'authenticated');

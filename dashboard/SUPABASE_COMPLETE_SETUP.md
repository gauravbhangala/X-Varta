# ✅ Supabase Setup - Step-by-Step Guide

## Your Project Credentials ✓

**Project URL:** `https://qxbvxbetadxrwcsmwbky.supabase.co`
**Status:** ✅ Credentials configured in `.env.local`

---

## Step 1️⃣: Set Up Database Schema (3 minutes)

### 1.1 Open SQL Editor
1. Go to your Supabase project: **https://app.supabase.com**
2. Click **SQL Editor** (left sidebar)
3. Click **New query** button (top right)

### 1.2 Copy Database Schema
Copy the entire SQL code below and paste it into the SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'client', 'team_member');
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'on_hold', 'completed', 'archived');
CREATE TYPE report_type AS ENUM ('revenue', 'time_tracking', 'project_status', 'team_performance');

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  company_name TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON public.users
  FOR SELECT
  USING (
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================================
-- PROJECTS TABLE
-- ============================================================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status project_status NOT NULL DEFAULT 'planning',
  budget DECIMAL(12, 2),
  spent DECIMAL(12, 2) DEFAULT 0,
  start_date DATE,
  due_date DATE,
  completion_percentage INT DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON public.projects
  FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admins can view all projects"
  ON public.projects
  FOR SELECT
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Clients can create projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their own projects"
  ON public.projects
  FOR UPDATE
  USING (client_id = auth.uid());

-- ============================================================================
-- PROJECT MEMBERS TABLE
-- ============================================================================
CREATE TABLE public.project_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  hourly_rate DECIMAL(8, 2),
  hours_logged DECIMAL(10, 2) DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, member_id)
);

ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view project members for their projects"
  ON public.project_members
  FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id = auth.uid()
    )
  );

-- ============================================================================
-- REPORTS TABLE
-- ============================================================================
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  report_type report_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  data JSONB,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  generated_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reports for their projects"
  ON public.reports
  FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id = auth.uid()
    )
  );

-- ============================================================================
-- BILLING TABLE
-- ============================================================================
CREATE TABLE public.billing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  billing_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.billing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own billing"
  ON public.billing
  FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admins can view all billing"
  ON public.billing
  FOR SELECT
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- ============================================================================
-- TIME TRACKING TABLE
-- ============================================================================
CREATE TABLE public.time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  task_description TEXT NOT NULL,
  hours_worked DECIMAL(5, 2) NOT NULL,
  entry_date DATE NOT NULL,
  billable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view time entries for their projects"
  ON public.time_entries
  FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id = auth.uid()
    )
  );

-- ============================================================================
-- ACTIVITY LOG TABLE
-- ============================================================================
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activity for their projects"
  ON public.activity_log
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    project_id IN (
      SELECT id FROM public.projects WHERE client_id = auth.uid()
    )
  );

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_due_date ON public.projects(due_date);
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);
CREATE INDEX idx_project_members_member_id ON public.project_members(member_id);
CREATE INDEX idx_reports_project_id ON public.reports(project_id);
CREATE INDEX idx_reports_type ON public.reports(report_type);
CREATE INDEX idx_billing_client_id ON public.billing(client_id);
CREATE INDEX idx_billing_status ON public.billing(status);
CREATE INDEX idx_billing_due_date ON public.billing(due_date);
CREATE INDEX idx_time_entries_project_id ON public.time_entries(project_id);
CREATE INDEX idx_time_entries_member_id ON public.time_entries(member_id);
CREATE INDEX idx_time_entries_date ON public.time_entries(entry_date);
CREATE INDEX idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_project_id ON public.activity_log(project_id);
CREATE INDEX idx_activity_log_created ON public.activity_log(created_at);

-- ============================================================================
-- FUNCTIONS FOR AUTOMATIC TIMESTAMP UPDATES
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_billing_updated_at BEFORE UPDATE ON public.billing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 1.3 Run the Script
1. **Click Run** button (or Ctrl+Enter)
2. Wait for success message at the bottom
3. Should show "Success" with no errors

---

## Step 2️⃣: Create Test User (2 minutes)

### 2.1 Go to Authentication
1. Click **Authentication** (left sidebar)
2. Click **Users**

### 2.2 Add User
1. Click **Add user** button (top right)
2. Fill in:
   - **Email**: `test@xvarta.com`
   - **Password**: `Test123!`
   - ✓ Check **Auto confirm user** (so no email confirmation needed)
3. Click **Create user** button

### 2.3 Verify User Created
- You should see the user in the list with status **Confirmed** ✓

---

## Step 3️⃣: Test Dashboard Connection (2 minutes)

### 3.1 Start Dashboard Server
1. Open terminal in `/dashboard` folder
2. Run: `npm run dev -- -p 3001`
3. Wait for "ready - started server on 0.0.0.0:3001"

### 3.2 Open Login Page
1. Go to: **http://localhost:3001/auth/login**
2. You should see the login form (not an error!)

### 3.3 Login Test
1. Email: `test@xvarta.com`
2. Password: `Test123!`
3. Click **Login**

### ✅ Success!
If all goes well, you'll see:
- ✅ Redirect to dashboard home page
- ✅ User name appears in top-right
- ✅ Dashboard shows stats (0 projects since we just created the user)

---

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
- ✅ Fixed! We already updated `.env.local`
- Hard refresh: **Ctrl+Shift+R**

### "SQL Error" when running schema
- Check for copy/paste errors
- Try running in smaller chunks
- Delete and paste again carefully

### "Invalid login credentials"
- Verify email: **test@xvarta.com** (exact)
- Verify password: **Test123!** (exact)
- Check user status is "Confirmed" in Supabase

### "Connection to database failed"
- Verify Supabase project status (green = active)
- Check all 3 API keys in `.env.local` are correct
- Hard refresh dashboard (Ctrl+Shift+R)

---

## Next Steps

Once login works:
1. ✅ Create real projects in the dashboard
2. ✅ Add team members
3. ✅ Track reports and billing
4. ✅ Enable notifications (email, Slack, etc.)

---

**Support**: Check browser Console (F12) for error messages

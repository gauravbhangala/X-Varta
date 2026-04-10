# Supabase Setup Guide for X Varta Dashboard

Complete guide to set up Supabase for the X Varta dashboard and connect it to your local environment.

## Step 1: Create Supabase Account & Project

### 1.1 Create Account
1. Go to **https://app.supabase.com**
2. Click **Sign Up**
3. Choose **Continue with GitHub** (recommended, easier)
   - Or use Email/Password
4. Verify your email

### 1.2 Create New Project
1. Click **New Project**
2. Fill in the form:
   - **Name**: `x-varta` (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `us-east-1` for US)
3. Click **Create new project**
4. Wait 2-3 minutes for project initialization

## Step 2: Get Your Credentials

### 2.1 Find Project URL & API Keys
1. Once project is ready, go to **Settings** (⚙️ icon, left sidebar)
2. Click **API**
3. Under "Project API keys", find:
   - **Project URL** (starts with `https://...supabase.co`)
   - **anon public** key (long string)
   - **service_role** key (even longer string)

**Copy these - you'll need them in Step 4**

## Step 3: Set Up Database Schema

### 3.1 Access SQL Editor
1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**

### 3.2 Run Migration Script
1. Copy the entire SQL migration from: `/Backend/SUPABASE_MIGRATION.sql`
2. Paste it into the SQL editor
3. Click **Run** (or press Ctrl+Enter)
4. Wait for confirmation (should show "Success")

**What the migration creates:**
- `users` table (synced with auth)
- `projects` table (client projects)
- `project_members` table (team members)
- `reports` table (project reports)
- `billing` table (invoice tracking)
- `time_entries` table (time tracking)
- `activity_log` table (audit trail)
- Row-Level Security (RLS) policies (data protection)
- 14+ indexes (performance optimization)

## Step 4: Configure Environment Variables

### 4.1 Update `.env.local`
Navigate to your dashboard folder and update `.env.local`:

```bash
# File: /dashboard/.env.local

NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Replace:
- `YOUR-PROJECT-ID` with your actual project ID
- `your-anon-key-here` with the anon public key from Step 2
- `your-service-role-key-here` with the service_role key from Step 2

### 4.2 Verify Format
Your NEXT_PUBLIC_SUPABASE_URL should look exactly like:
```
https://abcdefghijklmnop.supabase.co
```

## Step 5: Create Test User

### 5.1 Create User via Supabase Dashboard
1. Go to **Authentication** → **Users** (left sidebar)
2. Click **Add user**
3. Fill in:
   - **Email**: `test@xvarta.com`
   - **Password**: `Test123!` (exactly this)
   - Check **Auto confirm user**
4. Click **Create user**

### 5.2 Verify User Created
You should see the user in the Users list with:
- Email: `test@xvarta.com`
- Status: Confirmed ✓

## Step 6: Test Connection in Dashboard

### 6.1 Save .env.local
Save your `.env.local` file (Ctrl+S)

### 6.2 Refresh Dashboard
1. If dashboard is running, it will auto-reload
2. If not, start it: `npm run dev -- -p 3001`
3. Go to **http://localhost:3001/auth/login**

### 6.3 Login
Try logging in with:
- **Email**: `test@xvarta.com`
- **Password**: `Test123!`

If successful, you'll be redirected to the dashboard home page!

## Step 7: Verify Data Flow

### 7.1 Check Real-Time Subscription
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Login and check for any errors
4. You should see data loading on the dashboard

### 7.2 Create Test Data (Optional)
To see the dashboard with actual data:

#### Add Test Project
In Supabase SQL Editor:
```sql
INSERT INTO projects (
  client_id,
  name,
  description,
  status,
  start_date,
  due_date,
  budget,
  spent,
  completion_percentage
) VALUES (
  'YOUR-USER-ID-HERE',
  'Test Project',
  'Test description',
  'in_progress',
  now(),
  now() + interval '30 days',
  50000,
  12000,
  40
);
```

**Get YOUR-USER-ID**:
1. Go to **Authentication** → **Users**
2. Click on the test user
3. Copy the ID from the top

#### Add Test Team Members
```sql
INSERT INTO project_members (project_id, user_id, role, hourly_rate)
SELECT 
  p.id,
  u.id,
  'developer',
  75.00
FROM projects p, users u
WHERE p.name = 'Test Project'
LIMIT 1;
```

## Troubleshooting

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Solution:**
1. Check `.env.local` exists in `/dashboard/` folder
2. Verify exact format of URL and keys
3. **Save the file** and refresh browser with Ctrl+Shift+R (hard refresh)

### Issue: "Connection refused"
**Solution:**
1. Verify Supabase project is running (green status in dashboard)
2. Check paste was exact (no spaces at beginning)
3. Try `npm run dev -- -p 3001` to restart dev server

### Issue: "Invalid login credentials"
**Solution:**
1. Verify user email is `test@xvarta.com` (case-sensitive)
2. Verify password is exactly `Test123!`
3. Check user status is "Confirmed" in Supabase
4. Try resetting user password in Supabase dashboard

### Issue: "RLS Policy violation"
**Solution:**
1. Go to SQL Editor
2. Run: `SELECT * FROM users;` 
3. Should show the test user
4. This means database is working, RLS is active (expected)

## What's Next?

Once login works:
1. ✅ Authentication is live
2. ✅ Database is connected
3. ✅ Real-time subscriptions are active
4. **Next**: Create projects, manage team, view reports

## Support

For issues:
1. Check browser Console (F12) for error messages
2. Go to Supabase Dashboard → **Logs** for backend errors
3. Verify all `.env.local` values are correct
4. Try refreshing with Ctrl+Shift+R (hard refresh)

---

**Project Links:**
- Supabase Dashboard: https://app.supabase.com
- Dashboard Local: http://localhost:3001
- Landing Page Local: http://localhost:3000

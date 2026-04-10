# Dashboard Integration Guide

Complete guide to set up the X Varta Dashboard with Supabase backend.

## 🚀 Quick Setup (10 minutes)

### Step 1: Get Supabase Credentials

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **Settings → API**
3. Copy these values:
   - `Project URL` → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → Keep safe, for future server operations

### Step 2: Create Environment Variables

In the dashboard folder, create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Replace with your actual values from Supabase!**

### Step 3: Install Dependencies

```bash
cd dashboard
npm install
```

### Step 4: Create Test User in Supabase

1. Go to your Supabase project
2. Navigate to **Authentication → Users**
3. Click **"Add user"**
4. Create a test user:
   - Email: `test@xvarta.com`
   - Password: `Test123!` (minimum 6 characters)
5. Click **"Create user"**

### Step 5: Start the Dashboard

```bash
npm run dev
```

Dashboard will run on **http://localhost:3000**

### Step 6: Test Login

1. Navigate to http://localhost:3000/auth/login
2. Enter credentials:
   - Email: `test@xvarta.com`
   - Password: `Test123!`
3. Should redirect to dashboard homepage
4. ✅ Success!

---

## 📁 New Files Created

### Authentication
- **`src/lib/supabase.ts`** - Supabase client initialization
- **`src/hooks/useAuth.ts`** - Auth hook (sign in, sign up, sign out)
- **`src/app/auth/login/page.tsx`** - Login page
- **`src/app/auth/signup/page.tsx`** - Signup page

### Data Fetching
- **`src/hooks/useData.ts`** - Data hooks (projects, reports, team members)

### Updated Files
- **`src/store/authStore.ts`** - Added persistence, avatar_url
- **`src/components/Topbar.tsx`** - Shows user name, logout button
- **`src/components/DashboardLayout.tsx`** - Auth initialization, loading state
- **`src/app/page.tsx`** - Real data from Supabase
- **`src/app/projects/page.tsx`** - Real projects list
- **`src/app/team/page.tsx`** - Real team members
- **`src/app/reports/page.tsx`** - Real reports
- **`src/app/settings/page.tsx`** - User settings form

### Configuration
- **`middleware.ts`** - Route protection (simplified)
- **`.env.local.example`** - Environment variable template
- **`package.json`** - Added `@supabase/supabase-js`

---

## 🔐 Authentication Flow

### Sign Up

```typescript
// User fills signup form
// → Supabase creates auth user
// → Public.users table gets profile row
// → JWT token returned
// → User redirected to dashboard
```

### Sign In

```typescript
// User enters email/password
// → Supabase verifies credentials
// → User profile fetched from public.users
// → Zustand authStore updated
// → User redirected to dashboard
```

### Session Persistence

- Session stored in browser localStorage (via Zustand persist)
- Auth state synced on app load
- Real-time auth state changes detected via Supabase listener

### Logout

```typescript
// User clicks logout
// → Supabase session cleared
// → useAuthStore cleared
// → Redirected to login page
```

---

## 🗄️ Data Integration

### Projects Hook (`useProjects`)

```typescript
const { projects, loading, error, refetch } = useProjects()

// Returns:
// - projects: Project[] (from Supabase)
// - loading: boolean
// - error: string | null
// - refetch: () => Promise
```

**Features:**
- Fetches only user's own projects (RLS enforced)
- Real-time updates via Supabase subscriptions
- Auto-refresh on user change

### Reports Hook (`useReports`)

```typescript
const { reports, loading, error, refetch } = useReports()
```

**Features:**
- Fetches reports for user's projects
- Ordered by most recent first
- Limited to 10 records

### Team Members Hook (`useTeamMembers`)

```typescript
const { members, loading, error, refetch } = useTeamMembers()
```

**Features:**
- Fetches team members across all user projects
- Removes duplicates
- Shows hourly rate and hours logged

---

## 🔧 Customization

### Changing Color Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#3B82F6',      // Main blue
  secondary: '#1F2937',    // Dark gray
  accent: '#10B981',       // Green
  muted: '#6B7280',        // Medium gray
}
```

### Modifying Auth Pages

Login page: `src/app/auth/login/page.tsx`
Signup page: `src/app/auth/signup/page.tsx`

### Adding New Dashboard Pages

1. Create file: `src/app/new-page/page.tsx`
2. Add 'use client' directive
3. Use hooks to fetch data:

```typescript
'use client'

import { useProjects } from '@/hooks/useData'

export default function NewPage() {
  const { projects } = useProjects()
  
  return (
    <div>
      {projects.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  )
}
```

4. Add to sidebar: `src/components/Sidebar.tsx`

---

## 🐛 Troubleshooting

### "Invalid email or password"

- **Cause**: User doesn't exist or password wrong
- **Solution**: Create test user in Supabase, verify credentials

### "NEXT_PUBLIC_SUPABASE_URL is not defined"

- **Cause**: `.env.local` not created or missing values
- **Solution**: 
  1. Create `.env.local` file
  2. Add Supabase URL and keys
  3. Restart dev server: `npm run dev`

### "Failed to fetch projects"

- **Cause**: Wrong Supabase URL/key, or RLS policy issue
- **Solution**:
  1. Verify `.env.local` values
  2. Check Supabase dashboard for errors
  3. Verify RLS policies in database

### "Blank dashboard when logged in"

- **Cause**: User not authenticated or data fetch failing
- **Solution**:
  1. Open browser console (F12)
  2. Check for error messages
  3. Verify Supabase connection
  4. Check RLS policies allow user access

### "Session lost on refresh"

- **Cause**: Zustand persistence not working
- **Solution**: Check `authStore.ts` has `persist` middleware

---

## ✅ Verification Checklist

- [ ] `.env.local` created with Supabase credentials
- [ ] Test user created in Supabase
- [ ] Dependencies installed: `npm install`
- [ ] Dev server running: `npm run dev`
- [ ] Can access login page: http://localhost:3000/auth/login
- [ ] Can login with test credentials
- [ ] Dashboard loads with user data
- [ ] Projects page shows real projects
- [ ] Topbar shows user name
- [ ] Logout works and redirects to login
- [ ] Session persists on page refresh

---

## 🚀 Next Steps

### Phase 1: Testing (Done!)
- ✅ Auth flow working
- ✅ Dashboard loads
- ✅ Data displaying

### Phase 2: Development
- Add project creation form
- Implement project editing
- Add team member management
- Create billing section

### Phase 3: Production
- Deploy to Vercel
- Set up custom domain
- Enable email confirmations
- Set up analytics

---

## 📚 Available Data

### Projects Table
```
- id: UUID
- name: string
- description: string
- status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'archived'
- budget: number
- spent: number
- completion_percentage: 0-100
- start_date: date
- due_date: date
```

### Team Members
```
- id: UUID
- full_name: string
- email: string
- role: 'manager' | 'developer' | 'designer' | 'consultant'
- hourly_rate: number
- hours_logged: number
```

### Reports
```
- id: UUID
- report_type: 'revenue' | 'time_tracking' | 'project_status' | 'team_performance'
- title: string
- data: JSON
- period_start: date
- period_end: date
```

---

## 📞 Common Queries

### Get user's projects with team

```typescript
const { data } = await supabase
  .from('projects')
  .select(`
    *,
    project_members(
      *,
      users(full_name)
    )
  `)
  .eq('client_id', userId)
```

### Get billing summary

```typescript
const { data } = await supabase
  .from('billing')
  .select('*')
  .eq('client_id', userId)
  .eq('status', 'paid')
```

### Subscribe to project updates

```typescript
supabase
  .from('projects')
  .on('*', (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

See `/backend/docs/COMMON_QUERIES.sql` for more examples.

---

## 🎓 Learning Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

---

**Status**: ✅ Dashboard fully integrated with Supabase
**Last Updated**: Today
**Version**: 1.0

Ready to build! Start with the Quick Setup section above ⬆️

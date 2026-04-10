# X Varta Backend - Quick Reference Card

**Print this page or bookmark it for quick access during development.**

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Create Supabase project
# https://supabase.com → New Project

# 2. Execute migration
# Copy content from: supabase/migrations/001_initial_schema.sql
# Paste in: Supabase Dashboard → SQL Editor → New Query
# Click: Run

# 3. Create test user
# Supabase Dashboard → Authentication → Add user
# Email: test@xvarta.com | Password: Test123!

# 4. Install dashboard
cd dashboard
npm install

# 5. Add environment variables
# Create .env.local from .env.local.example
# Add your Supabase URL and keys

# 6. Update dashboard auth
# Follow: backend/docs/DASHBOARD_INTEGRATION.md
```

## 📦 Environment Variables

```bash
# .env.local (in dashboard folder)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPABASE_DB_URL=postgresql://postgres:PASSWORD@YOUR_PROJECT.supabase.co:5432/postgres
```

## 🗄️ Database Tables (Quick Overview)

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | User profiles | id, email, full_name, role |
| **projects** | Client projects | id, name, client_id, budget, spent, status |
| **project_members** | Team assignments | project_id, member_id, role, hourly_rate |
| **time_entries** | Work tracking | project_id, member_id, hours_worked, billable |
| **billing** | Invoices & payments | client_id, project_id, amount, status |
| **reports** | Analytics & reports | project_id, report_type, data (JSONB) |
| **activity_log** | Audit trail | user_id, project_id, action, changes (JSONB) |

## 🔐 User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **admin** | Company admin | See all data, manage users, billing |
| **client** | Client user | See own projects & invoices |
| **team_member** | Team worker | Time tracking, see own projects |

## 📂 Project Status Enum

```
planning      → Initial phase
in_progress   → Currently active
on_hold       → Paused temporarily
completed     → Finished successfully
archived      → Old/inactive
```

## 📊 Report Types

```
revenue           → Financial reports
time_tracking     → Hours & labor tracking
project_status    → Progress & timeline
team_performance  → Team metrics
```

## 💰 Billing Status Enum

```
draft     → Being prepared
sent      → Sent to client
pending   → Awaiting payment
paid      → Payment received
overdue   → Past due date
cancelled → Voided
```

## 🔗 Key Relationships

```
users (1) ──→ (N) projects (client_id)
projects (1) ──→ (N) project_members
projects (1) ──→ (N) reports
projects (1) ──→ (N) billing
projects (1) ──→ (N) time_entries
users (1) ──→ (N) activity_log (as user_id)
projects (1) ──→ (N) activity_log (as project_id)
```

## 🛡️ Security Rules

| Action | Who Can Do It |
|--------|---------------|
| See own profile | Anyone authenticated |
| See own projects | User who created them |
| See all projects | Admin only |
| Create projects | Admin only |
| Modify projects | Project client or admin |
| See time entries | Team members in project |
| See invoices | Project client or admin |

## 📡 API Basics (Supabase JavaScript Client)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// CRUD Examples
const { data, error } = await supabase
  .from('projects')
  .select('*')                    // GET all
  .eq('client_id', userId)        // WHERE clause
  .order('created_at', { ascending: false })
  .limit(10)

// Insert
await supabase.from('projects').insert([{ name: 'New' }])

// Update
await supabase.from('projects').update({ status: 'completed' }).eq('id', id)

// Delete
await supabase.from('projects').delete().eq('id', id)
```

## 🔐 Auth Examples

```typescript
// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})

// Get Current User
const { data: { user } } = await supabase.auth.getUser()

// Sign Out
await supabase.auth.signOut()

// Check Session
const { data: { session } } = await supabase.auth.getSession()
```

## 📝 Common Queries

```typescript
// Get user's projects
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('client_id', auth.uid())

// Get project with team
const { data } = await supabase
  .from('projects')
  .select(`
    *,
    project_members(
      *,
      users(full_name, email)
    )
  `)
  .eq('id', projectId)

// Get time entries with cost
const { data } = await supabase
  .from('time_entries')
  .select(`
    *,
    users(full_name),
    member:project_members!member_id(hourly_rate)
  `)

// Real-time subscription
const subscription = supabase
  .from('projects')
  .on('*', (payload) => {
    console.log('Update:', payload)
  })
  .subscribe()
```

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `PGRST301` | JWT invalid | Check token not expired, refresh if needed |
| `Unauthorized` | RLS policy blocks | Check user has access to that data |
| `Foreign key violation` | Referenced row missing | Ensure parent record exists first |
| `Invalid enum value` | Wrong status | Check enum values in schema |
| `CORS error` | Domain not allowed | Add domain in Supabase Settings |
| `Anon key can't insert` | Needs INSERT policy | Check RLS policies for INSERT |

## 📱 Frontend Integration Checklist

- [ ] Install `@supabase/supabase-js`
- [ ] Create `src/lib/supabase.ts` client
- [ ] Create `src/hooks/useAuth.ts` hook
- [ ] Update `src/store/authStore.ts` with Supabase
- [ ] Create `/auth/login` page
- [ ] Create `/auth/signup` page
- [ ] Update protected routes middleware
- [ ] Test login flow
- [ ] Test data fetching
- [ ] Test real-time updates

## 🚦 Performance Tips

1. **Use indexes** - All FKs and common filters have indexes
2. **Select specific columns** - Don't do `SELECT *` unnecessarily
3. **Add limits** - Use `.limit(100)` for pagination
4. **Filter server-side** - Do filtering in query, not JavaScript
5. **Real-time wisely** - Subscribe only to data you need
6. **Cache responses** - Use React Query or SWR for caching
7. **Batch operations** - Insert/update multiple rows in one request

## 🔄 API Rate Limits

- **Auth**: 10 requests/second
- **Data**: 100 requests/second
- **Real-time**: Unlimited subscriptions
- **Storage**: Based on plan tier

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `SETUP.md` | Step-by-step Supabase setup |
| `API.md` | Complete API reference |
| `AUTHENTICATION.md` | Auth implementation examples |
| `DASHBOARD_INTEGRATION.md` | Connect frontend to backend |
| `SCHEMA_DIAGRAM.md` | Database visualization |
| `COMMON_QUERIES.sql` | Copy-paste SQL queries |
| `TESTING_VERIFICATION.md` | Test your setup |

## 🌐 Useful Links

- **Supabase Docs**: https://supabase.com/docs
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **RLS Policies**: https://supabase.com/docs/guides/auth/row-level-security
- **SQL Editor**: https://app.supabase.com/project/_/sql
- **Dashboard**: http://localhost:3000

## 🆘 Get Help

**Issue**: Check these in order:
1. `backend/docs/TESTING_VERIFICATION.md` → Run tests
2. `backend/docs/SETUP.md` → Follow step-by-step
3. `backend/docs/DASHBOARD_INTEGRATION.md` → Check code examples
4. `COMMON_QUERIES.sql` → Test in SQL Editor
5. Browser console → Check for errors
6. Supabase logs → Dashboard → Logs section

**Questions About**:
- **Schema**: See `SCHEMA_DIAGRAM.md`
- **APIs**: See `API.md` + `COMMON_QUERIES.sql`
- **Auth**: See `AUTHENTICATION.md`
- **Setup**: See `SETUP.md`
- **Testing**: See `TESTING_VERIFICATION.md`

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Tables | 7 |
| Indexes | 14+ |
| RLS Policies | 20+ |
| Enum Types | 3 |
| Trigger Functions | 5 |
| Estimated Storage | ~50MB at scale |
| Free Tier Limits | 500MB DB, 1GB/month bandwidth |

## ⚡ Next Steps

1. **Today**: Create Supabase project, run migration, create test user
2. **Tomorrow**: Install dashboard dependencies, implement login page
3. **This week**: Complete dashboard integration with test data
4. **Next week**: Test end-to-end, deploy to production

---

**Last Updated**: Backend Infrastructure Complete v1.0
**Version**: Production Ready
**Maintenance**: Follow deployment guide before going live

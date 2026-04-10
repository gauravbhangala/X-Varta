# X Varta Backend Setup Guide

## 🎯 Overview

The X Varta backend is built on **Supabase**, a PostgreSQL-based platform that provides:
- ✅ Database (PostgreSQL)
- ✅ Authentication (Email/Password, OAuth)
- ✅ Row-Level Security (RLS)
- ✅ Real-time subscriptions
- ✅ Storage (file uploads)

## 📋 Prerequisites

1. Supabase account ([https://supabase.com](https://supabase.com))
2. Node.js 18+ (for managing migrations)
3. Git

## 🚀 Setup Steps

### Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: `x-varta`
   - **Database Password**: Save securely
   - **Region**: Choose closest to your users
4. Wait for project to initialize (~2 minutes)

### Step 2: Get Connection Details

In Supabase dashboard:

1. Click **Settings** → **Database**
2. Copy these and save in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
   ```

3. Under **Project Settings** → **API**:
   - Keep **Anon Public** key for client-side
   - Keep **Service Role** key for server-side only

### Step 3: Create Tables

#### Option A: Using Supabase SQL Editor (Manual)

1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Copy entire content of `supabase/migrations/001_initial_schema.sql`
4. Paste into SQL Editor
5. Click "Run"

#### Option B: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref xxxxx

# Run migrations
supabase migration up
```

### Step 4: Enable Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** (already enabled by default)
3. Under **Email Auth**, ensure these are set:
   - ✅ Enable email signup
   - ✅ Enable email confirmations (optional)

### Step 5: Create Test User

In Supabase **Auth** section:
1. Click "Add User"
2. Fill in:
   - **Email**: `admin@xvarta.com`
   - **Password**: Generate secure password
   - **Auto confirm user**: ✓ Check
3. Click "Create User"

## 📁 Schema Overview

### Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | User accounts & profiles | id, email, role, company_name |
| **projects** | Client projects | id, name, client_id, status, budget |
| **project_members** | Team assignments | project_id, member_id, role, hours_logged |
| **reports** | Performance reports | id, project_id, type, data (JSONB) |
| **billing** | Invoices & payments | id, client_id, amount, status |
| **time_entries** | Time tracking | id, project_id, member_id, hours_worked |
| **activity_log** | Audit trail | id, user_id, action, changes (JSONB) |

### User Roles

- **admin** - Full access to all projects, users, reports, billing
- **client** - Own projects, team members, billing
- **team_member** - Assigned projects only, time tracking

### Security (RLS Policies)

✅ Users can only see their own data  
✅ Admins bypass RLS for full access  
✅ Time entries linked to project access  
✅ Billing records restricted by client_id  

## 🔑 Environment Variables

### Client-side (.env.local or .env.public)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Server-side (.env.local - never commit)
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-key
SUPABASE_URL=https://your-project.supabase.co
```

## 🔐 Authentication Flow

### Sign Up (Client)
```
UI Form → Supabase Auth.signUp() 
→ Check email → User created in auth.users
→ Trigger auto-creates profile in public.users
```

### Sign In (Client)
```
UI Form → Supabase Auth.signInWithPassword()
→ JWT token returned
→ Stored in browser
→ Attached to all requests
```

### Role-Based Access
```
Check user.role in:
1. Frontend: Show/hide UI elements
2. Backend: RLS policies enforce server-side
3. Supabase: Row-Level Security policies
```

## 📡 API Integration (Dashboard)

### Install Supabase Client

```bash
cd dashboard
npm install @supabase/supabase-js
```

### Initialize Client

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Example: Fetch Projects

```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('client_id', userId)

if (error) console.error(error)
else console.log(data)
```

### Example: Subscribe to Real-time

```typescript
const subscription = supabase
  .from(`projects:client_id=eq.${userId}`)
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

## 🛡️ Security Best Practices

### ✓ Do:
- Store `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (never in git)
- Use RLS policies for data access
- Validate user roles server-side
- Hash sensitive data if needed
- Use HTTPS in production

### ✗ Don't:
- Expose service role key to client
- Trust client-side role checks alone
- Store passwords in plaintext
- Skip RLS policy setup
- Commit `.env.local`

## 📊 Common Queries

### Get User's Projects
```sql
SELECT * FROM projects 
WHERE client_id = auth.uid();
```

### Get Project with Team
```sql
SELECT p.*, 
  COALESCE(json_agg(json_build_object(
    'id', pm.id,
    'member_id', pm.member_id,
    'role', pm.role,
    'hours_logged', pm.hours_logged
  )), '[]'::json) as team_members
FROM projects p
LEFT JOIN project_members pm ON p.id = pm.project_id
WHERE p.id = $1
GROUP BY p.id;
```

### Get Revenue for Period
```sql
SELECT 
  SUM(total_amount) as revenue,
  COUNT(*) as invoice_count,
  SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) as paid
FROM billing
WHERE client_id = auth.uid()
  AND billing_date BETWEEN $1 AND $2;
```

## 🐛 Troubleshooting

### "Permission denied" errors
- Check RLS policies are correctly set up
- Verify user has correct role in database
- Ensure auth.uid() matches user id in database

### Can't connect to Supabase
- Verify URL and keys are correct
- Check network connectivity
- Ensure project is not suspended

### Migrations fail
- Check SQL syntax in migration file
- Verify database user has permissions
- Check for duplicate table/index names

## 📚 Further Reading

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Row-Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time](https://supabase.com/docs/guides/realtime)

## 📞 Support

For issues:
1. Check Supabase dashboard logs
2. Review SQL migration files
3. Test queries in SQL Editor
4. Check RLS policies in Auth section

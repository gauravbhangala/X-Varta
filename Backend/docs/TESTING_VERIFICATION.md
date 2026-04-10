# Testing & Verification Guide

Complete testing procedures to verify your X Varta backend setup.

## Prerequisites

- Supabase project created
- Migration executed successfully
- Test user account created
- Environment variables configured

## Phase 1: Database Verification

### Test 1.1: Verify Tables Exist

In Supabase SQL Editor, run:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Expected Output**:
```
activity_log
billing
project_members
projects
reports
time_entries
users
```

### Test 1.2: Check Row-Level Security Enabled

```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

**Expected**: All tables should have `rowsecurity = true`

### Test 1.3: Verify Indexes

```sql
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Expected**: 14+ indexes for performance optimization

### Test 1.4: Test Enum Types

```sql
SELECT enum_range(null::user_role);
SELECT enum_range(null::project_status);
SELECT enum_range(null::report_type);
```

**Expected**:
```
user_role: admin, client, team_member
project_status: planning, in_progress, on_hold, completed, archived
report_type: revenue, time_tracking, project_status, team_performance
```

## Phase 2: RLS Policy Testing

### Test 2.1: User-Level Access

**Setup**: Sign in as test user (uuid: `YOUR_USER_ID`)

```sql
-- As the user, should see their own profile
SELECT * FROM users WHERE id = auth.uid();
```

**Expected**: Returns user row

```sql
-- Manual override (from Supabase console as admin)
SELECT * FROM users WHERE id != auth.uid();
```

**Expected**: Returns nothing (user can't see others)

### Test 2.2: Project Access

```sql
-- Insert test project
INSERT INTO projects (name, client_id, budget, status)
VALUES ('Test Project', auth.uid(), 5000, 'planning')
RETURNING *;
```

**Expected**: Returns inserted project with current user as client

```sql
-- Should see own project
SELECT * FROM projects WHERE id = $1;
```

**Expected**: Returns project

### Test 2.3: Admin Override

**Setup**: Switch to admin user role

```sql
-- Admin should see all projects
SELECT COUNT(*) FROM projects;
```

**Expected**: Returns count of all projects

## Phase 3: Data Integrity Testing

### Test 3.1: Timestamp Triggers

```sql
-- Create test project
INSERT INTO projects (name, client_id, budget, status)
VALUES ('Timestamp Test', auth.uid(), 1000, 'planning')
RETURNING id, created_at, updated_at;
```

**Expected**: Both `created_at` and `updated_at` are populated

```sql
-- Wait 2 seconds, then update
UPDATE projects 
SET name = 'Updated Name'
WHERE id = $1
RETURNING updated_at;
```

**Expected**: `updated_at` is newer than `created_at`

### Test 3.2: Foreign Key Constraints

```sql
-- Try to create project_member with non-existent project
INSERT INTO project_members (project_id, member_id, role)
VALUES ('00000000-0000-0000-0000-000000000000', auth.uid(), 'developer');
```

**Expected**: Foreign key constraint violation error

### Test 3.3: Enum Constraints

```sql
-- Try to insert invalid status
INSERT INTO projects (name, client_id, budget, status)
VALUES ('Invalid', auth.uid(), 1000, 'invalid_status');
```

**Expected**: Invalid enum value error

## Phase 4: API Integration Testing

### Test 4.1: Authentication

**Using curl**:

```bash
# Sign Up
curl -X POST "https://YOUR_PROJECT_ID.supabase.co/auth/v1/signup" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "user_metadata": {
      "full_name": "Test User"
    }
  }'

# Expected Response
{
  "user": {
    "id": "...",
    "email": "test@example.com",
    ...
  },
  "session": {
    "access_token": "...",
    "refresh_token": "..."
  }
}
```

```bash
# Sign In
curl -X POST "https://YOUR_PROJECT_ID.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'

# Expected Response
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 3600
}
```

### Test 4.2: Data Operations

**Using JavaScript Client**:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://YOUR_PROJECT_ID.supabase.co',
  'YOUR_ANON_KEY'
)

// Test: Insert Project
async function testInsertProject() {
  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        name: 'Test Project',
        budget: 5000,
        status: 'planning',
        // client_id auto-filled by RLS
      },
    ])
    .select()

  if (error) console.error('Insert failed:', error)
  else console.log('Inserted:', data)
}

// Test: Fetch Projects
async function testFetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) console.error('Fetch failed:', error)
  else console.log('Projects:', data)
}

// Test: Update Project
async function testUpdateProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .update({ status: 'in_progress' })
    .eq('id', projectId)
    .select()

  if (error) console.error('Update failed:', error)
  else console.log('Updated:', data)
}

// Run tests
await testInsertProject()
await testFetchProjects()
```

### Test 4.3: Real-time Subscriptions

```typescript
// Subscribe to project changes
const subscription = supabase
  .from('projects')
  .on('*', (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()

// In another window/tab, update a project
// You should see the change logged in real-time

// Clean up
subscription.unsubscribe()
```

## Phase 5: Security Testing

### Test 5.1: RLS Policy Enforcement

**Scenario**: User A tries to access User B's project

**Setup**:
1. Create User A and User B test accounts
2. Create a project under User A
3. Sign in as User B

```sql
-- Query to try as User B
SELECT * FROM projects WHERE client_id = 'USER_A_ID';
```

**Expected**: Returns empty result (User B can't see User A's data)

### Test 5.2: JWT Token Validation

**Test**: Use an invalid/expired token

```bash
curl -X GET "https://YOUR_PROJECT_ID.supabase.co/rest/v1/projects" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer invalid_token"
```

**Expected**: 401 Unauthorized error

### Test 5.3: Anon Key vs Service Role Key

**Setup**: Create two requests - one with anon key, one with service role key

```typescript
// With anon key - respects RLS
const anonClient = createClient(url, anonKey)
const { data } = await anonClient.from('projects').select()
// Returns only current user's projects

// With service role key - bypasses RLS
const adminClient = createClient(url, serviceRoleKey)
const { data } = await adminClient.from('projects').select()
// Returns all projects
```

**Expected**: Service role key sees all data, anon key respects RLS

## Phase 6: Performance Testing

### Test 6.1: Query Performance

In Supabase SQL Editor, use `EXPLAIN ANALYZE`:

```sql
EXPLAIN ANALYZE
SELECT * FROM projects 
WHERE client_id = auth.uid()
ORDER BY created_at DESC
LIMIT 10;
```

**Expected**: Execution time < 10ms (should use indexes)

### Test 6.2: Concurrent Load

```typescript
// Simulate 10 simultaneous requests
const promises = Array(10)
  .fill(null)
  .map(() =>
    supabase
      .from('projects')
      .select()
  )

const results = await Promise.all(promises)
console.log('All requests completed:', results.length)
```

**Expected**: All requests succeed

### Test 6.3: Large Dataset

```sql
-- Insert 1000 test records
INSERT INTO time_entries (project_id, member_id, hours_worked, entry_date)
SELECT 
  'PROJECT_ID',
  'USER_ID',
  ROUND(RANDOM() * 8 + 1),
  CURRENT_DATE - INTERVAL '1 day' * GENERATE_SERIES(1, 1000)
FROM GENERATE_SERIES(1, 1000);

-- Query should still be fast
SELECT * FROM time_entries 
WHERE project_id = 'PROJECT_ID'
ORDER BY entry_date DESC;
```

**Expected**: Query completes in < 100ms

## Phase 7: Integration Testing

### Test 7.1: Dashboard Login Flow

1. Navigate to dashboard at `http://localhost:3000`
2. Go to `/auth/login`
3. Enter test user credentials
4. Click "Sign In"

**Expected**:
- ✅ Login successful
- ✅ Redirected to dashboard home
- ✅ User name displayed in profile
- ✅ Can navigate between pages

### Test 7.2: Data Display

1. Navigate to `/projects`
2. Should see list of projects (if any exist)

**Expected**:
- ✅ Projects loaded from backend
- ✅ Progress bars display correctly
- ✅ Budget shows spent vs total

### Test 7.3: Real-time Updates

1. Open dashboard in dashboard in two browser windows
2. In one window, create a new project via form
3. In other window, project list should update automatically

**Expected**:
- ✅ New project appears without page refresh
- ✅ All details correct

## Troubleshooting Tests

### Issue: "JWT invalid"

```bash
# Verify token format
curl -X GET "https://YOUR_PROJECT_ID.supabase.co/auth/v1/user" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Should return user info if token is valid
```

### Issue: "Unauthorized" on data queries

```sql
-- Check RLS policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Issue: Slow queries

```sql
-- Check if indexes are being used
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM projects 
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Should show "Index Scan" not "Seq Scan"
```

## Checklist

- [ ] All 7 tables exist in database
- [ ] Row-Level Security enabled on all tables
- [ ] 14+ indexes created
- [ ] Enum types defined correctly
- [ ] Timestamp triggers working
- [ ] Foreign key constraints enforced
- [ ] RLS policies tested (user isolation verified)
- [ ] Auth sign up/sign in working
- [ ] API CRUD operations working
- [ ] Real-time subscriptions working
- [ ] Dashboard login successful
- [ ] Data displays correctly in dashboard
- [ ] Performance acceptable (queries < 100ms)
- [ ] Security verified (RLS enforced)
- [ ] No console errors in dashboard

## Next Steps

✅ **If all tests pass**: Backend is production-ready
- Proceed with dashboard full integration
- Test all data flows end-to-end
- Set up monitoring and alerts

❌ **If tests fail**: Debug using the troubleshooting section
- Check logs in Supabase dashboard
- Review error messages in browser console
- Verify environment variables
- Check RLS policies are correct

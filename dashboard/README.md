# Dashboard — X Varta

Client dashboard application for X Varta services. Built with Next.js 16, App Router, TypeScript, Tailwind CSS, and **fully integrated with Supabase backend**.

## ✨ Features

- 🎯 **App Router Architecture** - Modern Next.js 16+ routing
- 🎨 **Tailwind CSS** - Utility-first styling with dark theme
- 🔐 **TypeScript** - Full type safety
- 📦 **Zustand** - Lightweight state management with persistence
- 📡 **Supabase Integration** - Real-time data from PostgreSQL backend
- 🔑 **Authentication** - Email/password with session management
- 📱 **Responsive Design** - Mobile-friendly interface
- 🧩 **Component Library** - Reusable UI components
- ⚡ **Real-time Updates** - Subscribe to data changes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free at https://supabase.com)
- Backend schema migrated (see `/backend`)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with Supabase credentials
cp .env.local.example .env.local
# Edit .env.local and add:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Start development server
npm run dev
```

Navigate to **http://localhost:3000**

### Test Account
Create in Supabase:
- Email: `test@xvarta.com`
- Password: `Test123!`

Login at http://localhost:3000/auth/login

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with auth init
│   │   ├── page.tsx                # Dashboard home (real data)
│   │   ├── projects/page.tsx       # Projects list (Supabase)
│   │   ├── team/page.tsx           # Team members (Supabase)
│   │   ├── reports/page.tsx        # Analytics (Supabase)
│   │   ├── settings/page.tsx       # User settings
│   │   ├── auth/login/page.tsx     # Login page ✨ NEW
│   │   ├── auth/signup/page.tsx    # Signup page ✨ NEW
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── DashboardLayout.tsx     # Main wrapper (auth check)
│   │   ├── Sidebar.tsx             # Left navigation
│   │   └── Topbar.tsx              # Header with user menu
│   ├── hooks/
│   │   ├── useAuth.ts              # Auth hook ✨ NEW
│   │   ├── useData.ts              # Data hooks (projects, reports) ✨ NEW
│   │   └── useAsync.ts             # Loading helper
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client ✨ NEW
│   │   └── utils.ts                # Utility functions
│   └── store/
│       └── authStore.ts            # Zustand auth state (updated)
├── middleware.ts                   # Route protection ✨ NEW
├── package.json                    # Dependencies (added Supabase)
├── .env.local.example              # Environment template
├── INTEGRATION_SETUP.md            # Step-by-step guide ✨ NEW
└── INTEGRATION_COMPLETE.md         # Detailed summary ✨ NEW
```

## 🔐 Authentication

### Login Flow
```
User → Login Page (/auth/login)
  ↓
Email/Password Validation (Supabase Auth)
  ↓
User Profile Fetch (public.users table)
  ↓
Store in Zustand (with persistence)
  ↓
Redirect to Dashboard (/)
```

### Signup Flow
```
New User → Signup Page (/auth/signup)
  ↓
Email/Password Validation
  ↓
Auth user created (Supabase Auth)
  ↓
Profile record created (public.users table)
  ↓
Auto-login or redirect to login
```

### Session Management
- Session stored in localStorage (Zustand persist)
- Auto-synced on app load
- Real-time detection of auth changes
- Auto-logout if session invalid

## 📊 Data Integration

### useProjects Hook
Fetch authenticated user's projects with real-time updates:

```typescript
const { projects, loading, error, refetch } = useProjects()

// Each project has: id, name, status, budget, spent, completion_percentage, etc.
// Changes are reflected instantly via Supabase subscriptions
```

### useReports Hook
Fetch analytics and reports:

```typescript
const { reports, loading, error, refetch } = useReports()

// Report types: revenue, time_tracking, project_status, team_performance
```

### useTeamMembers Hook
Fetch team across all projects:

```typescript
const { members, loading, error, refetch } = useTeamMembers()

// Shows hourly rates and hours logged
```

## 🛠️ Development

### Build
```bash
npm run build
```

### Production
```bash
npm run start
```

### Linting
```bash
npm run lint
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#3B82F6',
  accent: '#10B981',
  background: '#111827',
  card: '#1F2937',
  border: '#374151',
  muted: '#6B7280',
}
```

### Add New Pages

1. Create: `src/app/new-page/page.tsx`
2. Add 'use client' directive
3. Fetch data with hooks:
```typescript
'use client'
import { useProjects } from '@/hooks/useData'

export default function NewPage() {
  const { projects } = useProjects()
  return <div>{projects.map(p => ...)}</div>
}
```

4. Add to Sidebar: `src/components/Sidebar.tsx`

## 🔒 Security

✅ **Row-Level Security (RLS)**
- Enforced by Supabase automatically
- Users can only access their own data

✅ **Environment Variables**
- Never commit `.env.local`
- Use `.env.local.example` as template
- All secrets in environment only

✅ **Session Security**
- JWT tokens validated by Supabase
- Auto-refresh on expiry
- Secure cookie storage (via Supabase)

## 📚 Documentation

- [Integration Setup Guide](./INTEGRATION_SETUP.md) - Step-by-step setup
- [Integration Complete](./INTEGRATION_COMPLETE.md) - What was built
- [Backend Docs](/backend/docs/DASHBOARD_INTEGRATION.md) - Backend reference
- [Supabase Docs](https://supabase.com/docs) - Full Supabase documentation

## 🐛 Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
```bash
# 1. Create .env.local
cp .env.local.example .env.local

# 2. Add your Supabase URL and key

# 3. Restart dev server
npm run dev
```

### "Failed to fetch projects"
- Verify Supabase URL and key in `.env.local`
- Check RLS policies allow user access
- Verify database migration was executed

### "Can't login"
- Create test user in Supabase Authentication
- Verify email/password match exactly
- Check browser console for error messages

### Clear Session
```bash
# In browser console:
localStorage.clear()
location.reload()
```

## 🚀 Deployment

### Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
https://vercel.com/new

# 3. Add environment variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Deploy!
```

### Environment Variables on Vercel
1. Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL`
3. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy

## 📦 Dependencies

- **next** (16.2.2) - React framework
- **react** (19.0) - UI library
- **typescript** (5.7) - Type safety
- **tailwindcss** (4.2) - Styling
- **zustand** (4.5) - State management
- **@supabase/supabase-js** (2.43) - Backend API

## 📄 License

Part of X Varta project

## 🤝 Support

For issues and questions:
1. Check [INTEGRATION_SETUP.md](./INTEGRATION_SETUP.md)
2. Check [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)
3. Review console errors (F12)
4. Check [Backend docs](/backend)

---

**Status**: ✅ Production Ready
**Last Updated**: Today
**Version**: 1.0 with full Supabase integration

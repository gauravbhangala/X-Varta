# X Varta - Enterprise Digital Solutions Platform

> A unified Next.js application combining marketing landing page + protected dashboard with Supabase backend.

[![Deployment Status](https://img.shields.io/badge/status-production%20ready-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green)](https://supabase.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🎯 Overview

X Varta is a complete enterprise platform combining:

### 🌍 **Marketing Website**
- Landing page with advanced animations
- Case studies showcase
- Solutions & services pages
- Contact form
- Enterprise-grade design

### 🔐 **Protected Dashboard**
- User authentication & sessions
- Project management
- Team collaboration
- Analytics & reports
- User settings

### 🗄️ **Backend Infrastructure**  
- PostgreSQL database (Supabase)
- Row-level security policies
- Real-time data synchronization
- Email integration ready
- Production-ready RLS

---

## 📋 Features

### ✨ Marketing Features
- 🎨 Animated Hero section with 3D graphics
- 📊 Enterprise metrics & testimonials
- 🎬 Case studies with detailed results
- 📱 Fully responsive design
- 🚀 Optimized performance (Lighthouse 90+)

### 🔧 Dashboard Features
- 📁 Create and manage projects
- 👥 Team member management
- 📊 Analytics and reporting
- ⚙️ User settings & profile
- 🔒 Secure authentication
- 💾 Real-time data sync

### 🛡️ Security
- Row-level security (RLS) on database
- JWT authentication
- Protected API routes
- CORS configured
- Environment variables managed

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account (free at supabase.com)

### Installation

```bash
# Clone or navigate to the dashboard folder
cd dashboard

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Add your Supabase credentials to .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in browser

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── (marketing)/           # Public marketing pages
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── layout.tsx
│   │   │   ├── solutions/
│   │   │   ├── case-studies/
│   │   │   ├── insights/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── (dashboard)/           # Protected app pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   ├── auth/                  # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css
│   ├── components/                # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── ...
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useData.ts
│   │   └── useAsync.ts
│   ├── lib/                       # Utilities & helpers
│   │   ├── supabase.ts            # Supabase client
│   │   └── utils.ts
│   └── store/                     # Zustand state management
│       └── authStore.ts
├── public/                        # Static files
├── .env.local                     # Environment variables (not committed)
├── .env.local.example             # Template for env vars
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile                     # Docker image definition
├── docker-compose.yml             # Local development with Docker
├── vercel.json                    # Vercel deployment config
├── next.config.js
└── README.md
```

---

## 🔗 Routes Map

### Public Routes (Marketing)
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/solutions` | Solutions & services |
| `/case-studies` | Client case studies |
| `/insights` | Blog & articles |
| `/about` | Company information |
| `/contact` | Contact form |

### Authentication Routes
| Route | Description |
|-------|-------------|
| `/auth/login` | Login page |
| `/auth/signup` | Sign up page |

### Protected Routes (Dashboard)
| Route | Description | Auth Required |
|-------|-------------|---|
| `/dashboard` | Home dashboard | ✅ |
| `/dashboard/projects` | Projects list | ✅ |
| `/dashboard/team` | Team members | ✅ |
| `/dashboard/reports` | Analytics | ✅ |
| `/dashboard/settings` | User settings | ✅ |

---

## 🔐 Environment Variables

Create `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in these.

---

## 🗄️ Database Schema

### Tables
- **users** - User profiles
- **projects** - Client projects
- **project_members** - Team assignments
- **reports** - Analytics & reports
- **billing** - Invoices & payments
- **time_entries** - Time tracking
- **activity_log** - Audit trail

All tables include:
- Row-level security (RLS) policies
- Automatic timestamps (created_at, updated_at)
- Proper foreign key relationships
- Performance indexes

---

## 🚀 Deployment

### Vercel (Recommended - Easiest)
```bash
# 1. Push to GitHub
git push origin main

# 2. Connect repo to Vercel
# Visit https://vercel.com/import

# 3. Set environment variables in Vercel dashboard
# Deploy!
```

### Railway.app
```bash
# 1. Connect GitHub repo to Railway
# 2. Set environment variables
# 3. Deploy with one click
```

### Docker
```bash
# Build image
docker build -t x-varta .

# Run locally
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... x-varta

# Push to registry & deploy
```

See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🔌 API Integration

### Supabase Client
```typescript
import { supabase } from '@/lib/supabase'

// Create
const { data, error } = await supabase
  .from('projects')
  .insert([{ name: 'New Project' }])

// Read  
const { data, error } = await supabase
  .from('projects')
  .select('*')

// Update
const { data, error } = await supabase
  .from('projects')
  .update({ name: 'Updated' })
  .eq('id', project_id)

// Delete
const { data, error } = await supabase
  .from('projects')
  .delete()
  .eq('id', project_id)
```

### Authentication
```typescript
import { useAuth } from '@/hooks/useAuth'

export function MyComponent() {
  const { user, signIn, signOut } = useAuth()
  
  return (
    <>
      {user && <p>Welcome, {user.name}!</p>}
      <button onClick={() => signIn(email, password)}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads with animations
- [ ] All marketing pages accessible
- [ ] Contact form processes submissions
- [ ] Login page renders
- [ ] Can create project on dashboard
- [ ] Can add team member
- [ ] Can view reports
- [ ] Can edit settings
- [ ] Logout works
- [ ] Session persists on refresh

### Build Testing
```bash
npm run build        # Check for build errors
npm run lint         # Check code quality
npm start            # Test production build
```

---

## 📊 Performance Metrics

### Target Metrics
- Lighthouse Score: 90+
- First Contentful Paint: < 2s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

### Optimization
- Next.js Image optimization
- Code splitting & lazy loading
- CSS optimization with Tailwind
- Database query optimization with indexes

---

## 🆘 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

### Database Connection
- Verify Supabase URL in .env.local
- Check IP is whitelisted (if applicable)
- Confirm credentials are correct
- Check RLS policies aren't blocking reads

### Authentication Not Working
- Verify Supabase Auth is enabled
- Check email confirmation settings
- Verify CORS allowed origins
- Test with same credentials locally

See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) troubleshooting section for more.

---

## 📚 Documentation

- [Monorepo Merge Guide](./MONOREPO_MERGE_GUIDE.md) - How to combine landing page + dashboard
- [Production Deployment Guide](./PRODUCTION_DEPLOYMENT_GUIDE.md) - Deploy to production
- [Backend README](../Backend/README.md) - Database schema & API
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling
- [Next.js Docs](https://nextjs.org/docs) - Framework
- [Supabase Docs](https://supabase.com/docs) - Backend

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request
# After review, merge to main

# Deploy to production
git checkout main
git pull
# Vercel/Railway auto-deploys on push to main
```

---

## 📦 Dependencies

### Core
- **next** - React framework
- **react** - UI library
- **typescript** - Type safety

### Styling
- **tailwindcss** - Utility-first CSS
- **autoprefixer** - CSS compatibility

### Backend
- **@supabase/supabase-js** - PostgreSQL client
- **zustand** - State management

### Animations
- **framer-motion** - React animations
- **gsap** - JavaScript animations
- **three** - 3D graphics

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 💡 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 Support

Need help? Check:
1. [Troubleshooting section](#-troubleshooting)
2. [Production guide](./PRODUCTION_DEPLOYMENT_GUIDE.md)
3. [Existing issues on GitHub](https://github.com/yourusername/x-varta/issues)
4. [Supabase Community](https://discord.supabase.io)

---

## 🎉 Features Roadmap

### Coming Soon
- [ ] Email verification
- [ ] Password reset flow  
- [ ] Advanced reporting with charts
- [ ] Invoice generation
- [ ] Team invitations
- [ ] Activity timeline
- [ ] Mobile app
- [ ] API documentation (OpenAPI)

---

## 🚀 Ready to Launch?

1. ✅ Install dependencies: `npm install`
2. ✅ Configure environment: `.env.local`
3. ✅ Run locally: `npm run dev`
4. ✅ Test all routes
5. ✅ Build for production: `npm run build`
6. ✅ Deploy to Vercel/Railway/Docker

**Questions?** Check the [deployment guide](./PRODUCTION_DEPLOYMENT_GUIDE.md) or create a GitHub issue.

---

**Made with ❤️ for enterprise teams.**

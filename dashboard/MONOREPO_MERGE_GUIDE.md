# 🚀 X Varta Monorepo Merge Guide

## Overview
Combining `/landing-page` and `/dashboard` into a single unified Next.js application.

---

## 📋 MERGE STRATEGY

### Current Structure:
```
X Varta/
├── landing-page/     (Marketing - port 3000)
├── dashboard/        (App - port 3001)
└── Backend/
```

### Target Structure (Single App):
```
dashboard/           ← Main app (combined)
├── src/
│   ├── app/
│   │   ├── (marketing)/        ← Public pages
│   │   ├── (dashboard)/        ← Protected pages
│   │   ├── auth/               ← Auth pages
│   │   └── layout.tsx
│   ├── components/             ← All components (merged)
│   ├── hooks/
│   ├── lib/
│   └── store/
├── package.json                ← Updated with all dependencies
└── README.md
```

---

## 🔧 STEP-BY-STEP MERGE PROCESS

### Step 1: Copy Landing Page Components
Copy these files from `landing-page/src/components/` to `dashboard/src/components/`:
- `Hero.tsx`
- `Navigation.tsx`
- `Footer.tsx`
- `Marquee.tsx`
- `Services.tsx`
- `CaseStudy.tsx`
- `ClientMetrics.tsx`
- `CTA.tsx`
- `Process.tsx`
- `EngagementModel.tsx`
- `Leadership.tsx`
- `WhyUs.tsx`
- `Results.tsx`
- `TrustSignals.tsx`
- `FloatingCTA.tsx`
- `ThreeScene.tsx`
- `MagneticButton.tsx`
- `Cursor.tsx`

### Step 2: Copy Marketing Route Group
Copy the entire `landing-page/src/app/(marketing)/` folder to `dashboard/src/app/(marketing)/`

This includes:
```
(marketing)/
├── page.tsx              ← Home page
├── layout.tsx            ← Marketing layout
├── solutions/
│   └── page.tsx
├── case-studies/
│   └── page.tsx
├── insights/
│   └── page.tsx
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

### Step 3: Update Root Layout
Merge `landing-page/src/app/layout.tsx` with `dashboard/src/app/layout.tsx`:
- Keep Dashboard auth/Supabase setup
- Add landing page styles (fonts, globals)
- Wrap with Providers component

### Step 4: Copy Global Styles
Copy `landing-page/src/app/globals.css` content to `dashboard/src/app/globals.css` (merge if needed)

### Step 5: Update Navigation
Update `Navigation.tsx` in components to:
- Link to dashboard for authenticated users
- Show login/signup for guests
- Support both marketing and app routes

### Step 6: Install Dependencies
```bash
cd dashboard
npm install
```

---

## 📝 FILES TO UPDATE

### `dashboard/src/app/(marketing)/layout.tsx`
```tsx
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
```

### `dashboard/src/app/layout.tsx` (root)
```tsx
import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'X Varta',
  description: 'Enterprise digital solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

---

## 🔗 ROUTING MAP

| Route | Type | Component |
|-------|------|-----------|
| `/` | Marketing | Landing page (Hero + CTA) |
| `/solutions` | Marketing | Solutions page |
| `/case-studies` | Marketing | Case studies |
| `/insights` | Marketing | Blog/insights |
| `/about` | Marketing | About company |
| `/contact` | Marketing | Contact form |
| `/auth/login` | Public | Login form |
| `/auth/signup` | Public | Signup form |
| `/dashboard` | Protected | Dashboard home |
| `/dashboard/projects` | Protected | Projects list |
| `/dashboard/team` | Protected | Team members |
| `/dashboard/reports` | Protected | Analytics |
| `/dashboard/settings` | Protected | User settings |

---

## ⚙️ ENVIRONMENT VARIABLES

Update `.env.local` in dashboard with all variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://qxbvxbetadxrwcsmwbky.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_API_URL=http://localhost:3001

# Production (for deployment)
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_role_key
NEXT_PUBLIC_API_URL=https://your-domain.com
```

---

## 🚀 PRODUCTION DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All components copied and working
- [ ] Routes tested locally
- [ ] Authentication flows tested
- [ ] Supabase RLS policies reviewed
- [ ] Build without errors: `npm run build`

### Environment Setup
- [ ] Create production Supabase project
- [ ] Update production environment variables
- [ ] Configure custom domain
- [ ] Set up SSL certificate

### Testing
- [ ] Test landing page homepage
- [ ] Test all marketing routes
- [ ] Test login/signup flow
- [ ] Test dashboard pages
- [ ] Test logout
- [ ] Test session persistence

### Deployment Options

#### Option A: Vercel (Recommended)
```bash
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy
```

#### Option B: Docker
```bash
1. Create Dockerfile
2. Build image
3. Deploy to container service
4. Set environment variables
```

#### Option C: Traditional Server
```bash
1. npm run build
2. npm start
3. Set environment variables
4. Configure reverse proxy (nginx/Apache)
```

---

## 📦 PACKAGE.JSON UPDATE

Replace `dashboard/package.json` with:

```json
{
  "name": "x-varta",
  "version": "1.0.0",
  "description": "Enterprise digital solutions platform",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^16.2.2",
    "typescript": "^5.7.2",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/node": "^22.0.0",
    "tailwindcss": "^4.2.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "zustand": "^4.5.2",
    "@supabase/supabase-js": "^2.43.4",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.2",
    "three": "^0.155.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.2.2",
    "@types/three": "^0.183.1"
  }
}
```

---

## 🧪 LOCAL TESTING AFTER MERGE

```bash
cd dashboard
npm install
npm run dev
```

Then visit:
- Home: http://localhost:3001/
- Solutions: http://localhost:3001/solutions
- Dashboard: http://localhost:3001/dashboard
- Login: http://localhost:3001/auth/login

---

## 📋 NEXT STEPS

1. **Copy Components** - Follow Step 1 above
2. **Copy Marketing Routes** - Follow Step 2 above
3. **Update Layouts** - Follow Step 3 above
4. **Test Locally** - Run `npm run dev`
5. **Fix Issues** - Address any build/runtime errors
6. **Deploy** - Choose deployment method above

---

## ⚠️ IMPORTANT NOTES

- Keep both `/landing-page` and `/dashboard` folders until merge is complete
- Test thoroughly before deleting old folders
- Back up both projects before starting merge
- Consider git history - you may want to merge git repos

---

## 🆘 TROUBLESHOOTING

**Issue**: Components not found
- Solution: Ensure all imports use `@/components/` path alias

**Issue**: Port conflicts
- Solution: Dashboard runs on 3001 by default. Landing page can stay on 3000 during transition.

**Issue**: Build errors
- Solution: Run `npm install` to ensure all dependencies are installed

**Issue**: Styling issues
- Solution: Merge globals.css and ensure Tailwind config is correct

---

## 📞 DEPLOYMENT SUPPORT

Once merged, you can deploy to:
- **Vercel** (easiest, free tier available)
- **Railway.app** (Great for Next.js + Supabase)
- **AWS** (Amplify or EC2)
- **DigitalOcean** (App Platform)

Choose based on your needs and budget.

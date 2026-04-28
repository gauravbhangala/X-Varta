# 🚀 X Varta Production Deployment Guide

## Overview
Complete guide to deploy the X Varta unified application to production.

---

## 🎯 DEPLOYMENT OPTIONS

### Recommended: Vercel (Easiest)
✅ Free tier available
✅ Automatic deployments from Git
✅ Built-in Next.js optimization
✅ Serverless functions included
✅ Global CDN included

### Alternative: Railway.app
✅ Great for Next.js + Supabase combo
✅ Environment variables management
✅ Automatic deployments
✅ Generous free tier

### Alternative: Docker + Cloud Provider
✅ Full control over environment
✅ Deploy anywhere (AWS, GCP, Azure, DigitalOcean, etc.)
✅ More complex setup

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Code Quality
- [ ] All code committed to Git
- [ ] No console errors in dev
- [ ] No TypeScript errors: `npm run build`
- [ ] All routes tested locally
- [ ] Authentication flows working

### Environment
- [ ] Production Supabase project created
- [ ] All environment variables documented
- [ ] Database schema deployed to production DB
- [ ] RLS policies configured for production
- [ ] Test user created in production

### Testing
- [ ] Landing page homepage loads
- [ ] All marketing routes work (/solutions, /about, etc.)
- [ ] Login/signup flows work
- [ ] Dashboard pages load (protected)
- [ ] Create project functionality works
- [ ] Add team member functionality works
- [ ] Logout and re-login works
- [ ] Session persists on refresh

### Performance
- [ ] Images optimized
- [ ] No large bundles
- [ ] Database queries optimized
- [ ] RLS policies efficient

---

## 🌍 DOMAIN & SSL

### Before Deploying:
1. **Register Domain** (if not already done)
   - Namecheap, GoDaddy, Route53, etc.

2. **Update DNS Records**
   ```
   Type: CNAME
   Name: www
   Value: [your-deployment-url]
   ```

3. **SSL Certificate**
   - Vercel/Railway auto-provision SSL
   - If self-hosting, use Let's Encrypt (free)

---

## 🚀 DEPLOY TO VERCEL (Recommended)

### Step 1: Push to GitHub
```bash
cd dashboard
git init
git add .
git commit -m "Initial commit: X Varta unified app"
git remote add origin https://github.com/yourusername/x-varta.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Sign up or login
3. Click "New Project"
4. Select your GitHub repo
5. Click "Import"

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-prod-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Step 4: Deploy
Click "Deploy" button. Vercel will:
- Run `npm install`
- Run `npm run build`
- Deploy to production
- Give you a URL

### Step 5: Add Custom Domain
In Vercel Dashboard → Settings → Domains:
1. Add your domain
2. Update DNS records (Vercel shows exact steps)
3. Wait for SSL to provision (5-10 minutes)

### Step 6: Confirm Deployment
Visit your domain and test all functionality.

---

## 🚀 DEPLOY TO RAILWAY.APP

### Step 1: Create Railway Account
https://railway.app - Sign up with GitHub

### Step 2: New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your x-varta repo
4. Click "Deploy"

### Step 3: Add Environment Variables
Railway Dashboard → Your Project → Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-prod-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
```

### Step 4: Configure Build & Deploy
- Build Command: `npm run build`
- Start Command: `next start`
- Node Version: 20

### Step 5: Add Custom Domain
Railway Dashboard → Domains:
1. Click "Add Domain"
2. Enter your domain
3. Update DNS CNAME record
4. Railway provisions SSL automatically

### Step 6: Deploy
Click "Deploy" and Railway will build and deploy automatically.

---

## 🐳 DEPLOY WITH DOCKER

### Step 1: Docker Image (Multi-stage build for optimization)

Create `Dockerfile` in dashboard root:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

### Step 2: Create .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
.env
.env.local
```

### Step 3: Build Image

```bash
docker build -t x-varta:latest .
```

### Step 4: Test Locally

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -e SUPABASE_SERVICE_ROLE_KEY=... \
  x-varta:latest
```

### Step 5: Push to Container Registry

#### Docker Hub:
```bash
docker login
docker tag x-varta:latest yourusername/x-varta:latest
docker push yourusername/x-varta:latest
```

#### AWS ECR:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [your-ecr-url]
docker tag x-varta:latest [your-ecr-url]/x-varta:latest
docker push [your-ecr-url]/x-varta:latest
```

### Step 6: Deploy to Cloud Provider

#### AWS ECS (Elastic Container Service)
- Create ECS Cluster
- Create Task Definition
- Create Service
- Configure Load Balancer

#### Google Cloud Run
```bash
gcloud run deploy x-varta \
  --source . \
  --platform managed \
  --region us-central1
```

#### DigitalOcean App Platform
- Select Docker image
- Configure environment variables
- Deploy

---

## 🔐 PRODUCTION SECURITY CHECKLIST

### Database Security
- [ ] RLS policies enabled on all tables
- [ ] Restrict anonymous access
- [ ] Use service role key only server-side
- [ ] Enable database backup (Supabase does this)

### API Security
- [ ] HTTPS only (browser access)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation on all forms

### Environment Variables
- [ ] Never commit .env files
- [ ] Rotation keys periodically
- [ ] Use managed secrets (Vercel, Railway, etc.)
- [ ] Backup key somewhere safe

### Monitoring
- [ ] Enable error logging (Sentry optional)
- [ ] Monitor database performance
- [ ] Set up uptime monitoring (StatusPage, UptimeRobot)
- [ ] Monitor error rates

---

## 🔄 CONTINUOUS DEPLOYMENT

### GitHub Actions (Automated Testing + Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run build
        run: npm run build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
        run: |
          npm i -g vercel
          vercel deploy --prod --token $VERCEL_TOKEN
```

---

## 📊 POST-DEPLOYMENT

### Day 1
- [ ] Test all functionality on live site
- [ ] Check analytics setup (optional: Google Analytics)
- [ ] Monitor error logs
- [ ] Verify email notifications work

### Week 1
- [ ] Monitor uptime
- [ ] Check user feedback
- [ ] Review database performance
- [ ] Plan future improvements

### Ongoing
- [ ] Security updates
- [ ] Performance optimization
- [ ] Feature additions
- [ ] User analytics

---

## 🆘 TROUBLESHOOTING PRODUCTION

### Issues & Solutions

**Issue**: "Cannot find module" errors
```
Solution: Verify all imports use correct paths
Run: npm run build locally first
```

**Issue**: 404 on /dashboard routes
```
Solution: Check routes are under (dashboard) folder
Verify authentication is working
```

**Issue**: Supabase connection fails
```
Solution: Check environment variables are set
Verify IP whitelisting if applicable
Test Supabase credentials
```

**Issue**: Slow page loads
```
Solution: Enable Next.js Image optimization
Check network tab in DevTools
Consider CDN optimization
```

**Issue**: Authentication not working
```
Solution: Verify NEXT_PUBLIC_SUPABASE_URL is correct
Check RLS policies allow reads
Test with same user locally
```

---

## 📞 SUPPORT & RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Docker Docs**: https://docs.docker.com

---

## ✅ FINAL CHECKLIST

- [ ] Code merged and tested
- [ ] Environment variables configured
- [ ] Domain registered and DNS updated
- [ ] SSL certificate verified
- [ ] Database deployed to production
- [ ] RLS policies tested
- [ ] All routes tested on live site
- [ ] Authentication flows working
- [ ] Error handling working
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Documentation updated

### YOU'RE READY TO LAUNCH! 🚀

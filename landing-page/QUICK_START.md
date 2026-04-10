# 🚀 Quick Start Guide - NEXUS Landing Page

## Prerequisites
- Node.js 14 or higher
- npm or yarn package manager
- Code editor (VS Code recommended)

## Installation (5 minutes)

### Step 1: Navigate to Project
```powershell
cd "d:\XVarta Website\X Varta\landing-page"
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Start Development Server
```powershell
npm run dev
```

### Step 4: Open in Browser
Visit **http://localhost:3000**

You should see the NEXUS landing page with all interactive elements working!

---

## 🎨 Make Your First Change

### Change the Headline Text

1. Open `src/components/Hero.tsx`
2. Find the `<h1>` element (around line 75)
3. Change the text:
   ```tsx
   <span className="line">WE BUILD</span>
   <span className="line outline glitch" data-text="EMPIRES">EMPIRES</span>
   <span className="line accent">ONLINE.</span>
   ```
4. Save the file (auto-reload)
5. Changes appear instantly in browser!

### Change Colors

1. Open `tailwind.config.js`
2. Modify color values:
   ```javascript
   colors: {
     cyan: '#00f5ff',      // Change this
     acid: '#b4ff39',      // Or this
     magenta: '#ff2d78',   // Or this
   }
   ```
3. Save - colors update across entire site

### Change Service Cards

1. Open `src/components/Services.tsx`
2. Edit the `services` array (lines 1-30)
3. Change `title`, `desc`, or `tags`
4. Saves automatically!

---

## 📁 Important Files to Know

| File | Purpose |
|------|---------|
| `src/pages/index.tsx` | Main page (imports all components) |
| `src/components/Hero.tsx` | Hero section |
| `src/components/Services.tsx` | Services grid |
| `src/components/Navigation.tsx` | Header nav |
| `src/styles/globals.css` | Global styles & animations |
| `tailwind.config.js` | Design system config |

---

## 🔧 Common Tasks

### Add a New Section
1. Create file: `src/components/NewSection.tsx`
2. Import in `src/pages/index.tsx`
3. Add to JSX in the main function

### Change Email
Update in `src/components/CTA.tsx`:
```tsx
<a href="mailto:YOUR_EMAIL@example.com">
```

### Update Navigation Links
Edit `src/components/Navigation.tsx` - modify the nav-links list

### Change Font Sizes
Use Tailwind classes in components:
- `text-sm` (small)
- `text-base` (normal)
- `text-lg` (large)
- `text-xl`, `text-2xl`, etc.

### Add Images
1. Place in `public/` folder
2. Import and use in components:
```tsx
import Image from 'next/image'

<Image 
  src="/image.jpg" 
  alt="Description"
  width={400}
  height={300}
/>
```

---

## 🐛 Troubleshooting

### Port 3000 already in use
```powershell
npm run dev -- -p 3001
```

### Styles not updating
1. Clear browser cache (Ctrl + Shift + Del)
2. Restart dev server (Ctrl + C, then `npm run dev`)

### TypeScript errors
- Save file again
- Check file syntax
- Restart VS Code

### Components not showing
- Check import path in `pages/index.tsx`
- Verify component file exists
- Check for typos

---

## 📦 Building for Production

### Create Optimized Build
```powershell
npm run build
```

### Test Production Build Locally
```powershell
npm start
```

### Deploy to Vercel (Easiest)
1. Push code to GitHub
2. Connect repo at vercel.com
3. Auto-deploys on every push!

---

## 💡 Tips & Tricks

- Use `npm run lint` to check for code issues
- Inspect page with DevTools (F12)
- Test on mobile: DevTools → Toggle device toolbar
- Use `console.log()` for debugging
- Tailwind classes: https://tailwindcss.com/docs

---

## 🎯 What's Next?

- [ ] Customize brand colors
- [ ] Update service descriptions
- [ ] Add company logo
- [ ] Set up email form
- [ ] Add analytics
- [ ] Deploy to production
- [ ] Set up custom domain

---

## 📞 Need Help?

- Check `README.md` for detailed docs
- See `SETUP_COMPLETE.md` for full reference
- Tailwind docs: https://tailwindcss.com
- Next.js docs: https://nextjs.org
- TypeScript: https://www.typescriptlang.org

---

Happy coding! 🎉

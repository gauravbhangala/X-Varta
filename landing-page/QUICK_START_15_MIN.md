# ⚡ QUICK START - Complete Refactoring in 15 Minutes

## 🎯 Three-Step Process

### STEP 1: Copy Files to New Locations (5 min)

Open PowerShell and run these commands:

```powershell
cd "d:\XVarta Website\X Varta\landing-page\src\components"

# Create directories
mkdir -Force @(
    "sections\home\Hero",
    "sections\home\Solutions", 
    "sections\home\Industries",
    "sections\home\CaseStudies",
    "sections\home\WhyChoose",
    "sections\home\CTA",
    "sections\home\Services",
    "sections\home\Process",
    "sections\home\EngagementModel",
    "sections\home\ClientMetrics",
    "sections\home\TrustSignals",
    "sections\home\Leadership",
    "sections\home\Results",
    "sections\home\Marquee",
    "sections\home\FloatingCTA"
) | ForEach-Object { $null }

# Copy Hero section
Copy-Item "Hero.tsx" "sections\home\Hero\" -Force
Copy-Item "ThreeScene.tsx" "sections\home\Hero\" -Force
Copy-Item "Cursor.tsx" "sections\home\Hero\" -Force

# Copy other sections
Copy-Item "SolutionsSection.tsx" "sections\home\Solutions\SolutionsSection.tsx" -Force
Copy-Item "IndustriesSection.tsx" "sections\home\Industries\IndustriesSection.tsx" -Force
Copy-Item "CaseStudy.tsx" "sections\home\CaseStudies\CaseStudy.tsx" -Force
Copy-Item "WhyUs.tsx" "sections\home\WhyChoose\WhyUs.tsx" -Force
Copy-Item "CTA.tsx" "sections\home\CTA\CTA.tsx" -Force
Copy-Item "CTASection.tsx" "sections\home\CTA\CTASection.tsx" -Force
Copy-Item "Services.tsx" "sections\home\Services\Services.tsx" -Force
Copy-Item "Process.tsx" "sections\home\Process\Process.tsx" -Force
Copy-Item "EngagementModel.tsx" "sections\home\EngagementModel\EngagementModel.tsx" -Force
Copy-Item "ClientMetrics.tsx" "sections\home\ClientMetrics\ClientMetrics.tsx" -Force
Copy-Item "TrustSignals.tsx" "sections\home\TrustSignals\TrustSignals.tsx" -Force
Copy-Item "Leadership.tsx" "sections\home\Leadership\Leadership.tsx" -Force
Copy-Item "Results.tsx" "sections\home\Results\Results.tsx" -Force
Copy-Item "Marquee.tsx" "sections\home\Marquee\Marquee.tsx" -Force
Copy-Item "FloatingCTA.tsx" "sections\home\FloatingCTA\FloatingCTA.tsx" -Force

Write-Host "✅ All files copied successfully"
```

### STEP 2: Create Index Files (3 min)

**Use VS Code Find & Replace** in each new folder's files:

In `Hero/Hero.tsx`:
- Find: `import MagneticButton from './MagneticButton'`
- Replace: `import MagneticButton from '@/components/ui/Button'`

In any file importing Animations:
- Find: `import { AnimatedCard, SlideUp } from './Animations'`
- Replace: `import { AnimatedCard, SlideUp } from '@/components/animations'`

Create `index.ts` files: **Copy & paste these into each folder**

```typescript
// sections/home/Hero/index.ts
export { default as Hero } from './Hero'
export { default as ThreeScene } from './ThreeScene'
export { default as Cursor } from './Cursor'
```

Then create for each section:
```typescript
// sections/home/Solutions/index.ts
export { default as SolutionsSection } from './SolutionsSection'
```

(Repeat pattern for all section folders)

### STEP 3: Update Main Page Inputs (2 min)

Edit: `src/app/(marketing)/page.tsx`

Replace the imports section with:

```typescript
import type { Metadata } from 'next'
import { homeContent } from '@/content/pages/home'

// Layout
import { Navigation } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Hero section
import { Hero } from '@/components/sections/home/Hero'

// Marquee
import { Marquee } from '@/components/sections/home/Marquee'

// Metrics
import { ClientMetrics } from '@/components/sections/home/ClientMetrics'
import { TrustSignals } from '@/components/sections/home/TrustSignals'

// Services & sections
import { Services } from '@/components/sections/home/Services'
import { CaseStudy } from '@/components/sections/home/CaseStudies'
import { EngagementModel } from '@/components/sections/home/EngagementModel'
import { Leadership } from '@/components/sections/home/Leadership'
import { WhyUs } from '@/components/sections/home/WhyChoose'
import { Process } from '@/components/sections/home/Process'
import { CTA } from '@/components/sections/home/CTA'
import { Results } from '@/components/sections/home/Results'
import { FloatingCTA } from '@/components/sections/home/FloatingCTA'

// ... rest of page
```

---

## 🧪 Verify It Works (5 min)

```powershell
# In project root
npm run build
# If NO errors → Continue

npm run dev
# Open http://localhost:3000
# Check if all sections display
```

✅ If no errors and page loads → **Refactoring successful!**

---

## 🗑️ Clean Up (2 min)

After verification, delete old files:

```powershell
cd "d:\XVarta Website\X Varta\landing-page\src\components"

# Delete old files (keep only index, layout, sections, ui, animations folders)
Remove-Item @(
    "Animations.tsx",
    "CaseStudy.tsx", 
    "ClientMetrics.tsx",
    "CTA.tsx",
    "CTASection.tsx",
    "Cursor.tsx",
    "EngagementModel.tsx",
    "FloatingCTA.tsx",
    "Footer.tsx",
    "GradientSphere.tsx",
    "Hero.tsx",
    "IndustriesSection.tsx",
    "Leadership.tsx",
    "MagneticButton.tsx",
    "Marquee.tsx",
    "Navigation.tsx",
    "Process.tsx",
    "Results.tsx",
    "Services.tsx",
    "SolutionsSection.tsx",
    "TechnologiesSection.tsx",
    "ThreeScene.tsx",
    "TrustSignals.tsx",
    "WhyUs.tsx"
) -Force -ErrorAction SilentlyContinue

Write-Host "✅ Cleanup complete"
```

---

## 📊 Total Time: 15 minutes ⚡

| Task | Time |
|---|---|
| Copy files | 5 min |
| Create indexes | 3 min |
| Update imports | 2 min |
| Verify build | 5 min |
| **Total** | **15 min** |

---

## ✅ When Complete

```
✅ New folder structure in place
✅ All files organized by type
✅ All imports use @/ aliases  
✅ npm run build passes
✅ npm run dev works
✅ Old files cleaned up
✅ Project scales beautifully
```

## 🎉 SUCCESS!
Your Next.js project now has enterprise-level architecture!

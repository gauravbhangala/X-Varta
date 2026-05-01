# Next.js Project Refactoring Guide - Enterprise Architecture

## ✅ COMPLETED REFACTORING STEPS

### 1. Directory Structure Created
```
/src/components/
├── layout/
│   ├── Navbar/
│   │   ├── Navigation.tsx ✅ (MOVED)
│   │   └── index.ts ✅ (CREATED)
│   ├── Footer/
│   │   ├── Footer.tsx ✅ (MOVED)
│   │   └── index.ts ✅ (CREATED)
│   └── index.ts ✅ (CREATED)
│
├── sections/
│   └── home/
│       ├── Hero/
│       ├── Solutions/
│       ├── Industries/
│       ├── CaseStudies/
│       ├── WhyChoose/
│       ├── CTA/
│       └── index.ts ✅ (CREATED)
│
├── ui/
│   ├── Button/
│   │   ├── MagneticButton.tsx ✅ (MOVED)
│   │   └── index.ts ✅ (CREATED)
│   ├── Card/
│   ├── Badge/
│   ├── SectionHeading/
│   └── index.ts ✅ (CREATED)
│
└── animations/
    ├── AnimatedCard.tsx ✅ (CREATED)
    ├── FadeIn.tsx ✅ (CREATED)
    ├── SlideUp.tsx ✅ (CREATED)
    ├── types.ts ✅ (CREATED)
    └── index.ts ✅ (CREATED)
```

### 2. Completed Moves
- ✅ Animations.tsx → Split into components/animations/{AnimatedCard, FadeIn, SlideUp}.tsx
- ✅ MagneticButton.tsx → components/ui/Button/MagneticButton.tsx
- ✅ Navigation.tsx → components/layout/Navbar/Navigation.tsx
- ✅ Footer.tsx → components/layout/Footer/Footer.tsx
- ✅ Created index.ts files for clean exports

## 📋 REMAINING MOVES - EXECUTE IN ORDER

### Phase 1: Hero Section Components
```
FROM: src/components/Hero.tsx
TO: src/components/sections/home/Hero/Hero.tsx

FROM: src/components/ThreeScene.tsx  
TO: src/components/sections/home/Hero/ThreeScene.tsx

FROM: src/components/Cursor.tsx
TO: src/components/sections/home/Hero/Cursor.tsx
```

**Import Updates Required in Hero.tsx:**
```typescript
// OLD (relative)
import MagneticButton from './MagneticButton'
import ThreeScene from './ThreeScene'

// NEW (@/ aliases)
import { MagneticButton } from '@/components/ui/Button'
import ThreeScene from './ThreeScene'  // same folder
```

### Phase 2: Utility/Visual Components
```
FROM: src/components/Marquee.tsx
TO: src/components/sections/home/Marquee.tsx

FROM: src/components/Cursor.tsx
TO: src/components/sections/home/Hero/Cursor.tsx

FROM: src/components/GradientSphere.tsx
TO: src/components/sections/home/GradientSphere.tsx
```

### Phase 3: Section Components
```
FROM: src/components/SolutionsSection.tsx
TO: src/components/sections/home/Solutions/SolutionsSection.tsx

FROM: src/components/IndustriesSection.tsx
TO: src/components/sections/home/Industries/IndustriesSection.tsx

FROM: src/components/CaseStudy.tsx
TO: src/components/sections/home/CaseStudies/CaseStudy.tsx

FROM: src/components/WhyUs.tsx
TO: src/components/sections/home/WhyChoose/WhyUs.tsx

FROM: src/components/CTA.tsx
TO: src/components/sections/home/CTA/CTA.tsx
```

### Phase 4: Services & Additional Sections
```
FROM: src/components/Services.tsx
TO: src/components/sections/home/Services/Services.tsx

FROM: src/components/Process.tsx
TO: src/components/sections/home/Process/Process.tsx

FROM: src/components/EngagementModel.tsx
TO: src/components/sections/home/EngagementModel/EngagementModel.tsx

FROM: src/components/ClientMetrics.tsx
TO: src/components/sections/home/ClientMetrics/ClientMetrics.tsx

FROM: src/components/TrustSignals.tsx
TO: src/components/sections/home/TrustSignals/TrustSignals.tsx

FROM: src/components/Leadership.tsx
TO: src/components/sections/home/Leadership/Leadership.tsx

FROM: src/components/Results.tsx
TO: src/components/sections/home/Results/Results.tsx
```

### Phase 5: Supporting Components
```
FROM: src/components/CTASection.tsx
TO:   src/components/sections/home/CTA/CTASection.tsx

FROM: src/components/FloatingCTA.tsx
TO:   src/components/sections/home/FloatingCTA/FloatingCTA.tsx
```

## 🔄 IMPORT CONVERSION PATTERNS

### Pattern 1: Relative to Alias (Same Folder)
```typescript
// OLD
import { AnimatedCard } from './Animations'

// NEW
import { AnimatedCard } from '@/components/animations'
```

### Pattern 2: Relative to Alias (Different Folder)
```typescript
// OLD
import MagneticButton from './MagneticButton'

// NEW
import { MagneticButton } from '@/components/ui/Button'
```

### Pattern 3: Component with Local Sub-components
```typescript
// OLD
import ThreeScene from './ThreeScene'

// NEW (same folder)
import ThreeScene from './ThreeScene'

// OR (if moving ThreeScene to separate folder)
import ThreeScene from '@/components/sections/home/Hero/ThreeScene'
```

## 📝 FILES TO UPDATE IMPORTS IN

### Critical (Must Update First)
1. **src/app/(marketing)/page.tsx** - Main home page imports
2. **src/app/enterprise/page.tsx** - Enterprise page imports  
3. **src/app/(marketing)/layout.tsx** - Layout imports

### Component Files (After Section Moves)
```
src/components/sections/home/Hero/Hero.tsx
src/components/sections/home/Solutions/SolutionsSection.tsx
src/components/sections/home/Industries/IndustriesSection.tsx
src/components/sections/home/CaseStudies/CaseStudy.tsx
src/components/sections/home/WhyChoose/WhyUs.tsx
src/components/sections/home/CTA/CTA.tsx
src/components/sections/home/Services/Services.tsx
src/components/sections/home/Process/Process.tsx
src/components/sections/home/EngagementModel/EngagementModel.tsx
src/components/sections/home/ClientMetrics/ClientMetrics.tsx
src/components/sections/home/TrustSignals/TrustSignals.tsx
src/components/sections/home/Leadership/Leadership.tsx
src/components/sections/home/Results/Results.tsx
```

## 🎯 IMPORT UPDATE CHECKLIST

### For each moved component:
- [ ] Update relative imports to @/ aliases
- [ ] Update imports of moved dependencies
- [ ] Create index.ts in new folder if needed
- [ ] Export from parent index.ts
- [ ] Update any imports pointing to old location
- [ ] Verify no circular dependencies

## ✨ INDEX.TS FILES TO CREATE

After moving all components to their folders, create:

```typescript
// src/components/sections/home/Hero/index.ts
export { default as Hero } from './Hero'
export { default as ThreeScene } from './ThreeScene'
export { default as Cursor } from './Cursor'

// src/components/sections/home/Solutions/index.ts
export { default as SolutionsSection } from './SolutionsSection'

// src/components/sections/home/Industries/index.ts
export { default as IndustriesSection } from './IndustriesSection'

// ... etc for all section folders
```

## 🔗 NEW IMPORT PATHS (AFTER REFACTORING)

### Page Imports (src/app/(marketing)/page.tsx)
```typescript
// Hero imports
import { Hero, ThreeScene } from '@/components/sections/home/Hero'
import { Marquee } from '@/components/sections/home'
import { ClientMetrics } from '@/components/sections/home'

// Service imports
import { Services } from '@/components/sections/home/Services'
import { Process } from '@/components/sections/home/Process'
import { CaseStudy } from '@/components/sections/home/CaseStudies'

// Leadership imports
import { Leadership } from '@/components/sections/home/Leadership'
import { WhyUs } from '@/components/sections/home/WhyChoose'

// CTA imports
import { CTA } from '@/components/sections/home/CTA'

// Layout imports
import { Navigation } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
```

## 🧪 TESTING STRATEGY

### Step 1: Validate Structure
```bash
npm run build  # Should compile without errors
```

### Step 2: Test Dev Server
```bash
npm run dev    # Should run on localhost:3000
```

### Step 3: Visual Verification
- [ ] Navigate to http://localhost:3000
- [ ] Each section renders correctly
- [ ] Animations work
- [ ] Responsive design works
- [ ] No console errors
- [ ] No missing imports

### Step 4: Search & Replace for Old Imports
Use find & replace to ensure NO remaining:
- `import Hero from './Hero'`  
- `import MagneticButton from './MagneticButton'`
- Other relative imports from components folder

## 🗑️ CLEANUP (AFTER VERIFICATION)

Once project runs without errors:

```bash
# Delete old component files
rm src/components/Animations.tsx
rm src/components/MagneticButton.tsx
rm src/components/Navigation.tsx
rm src/components/Footer.tsx
rm src/components/Hero.tsx
rm src/components/ThreeScene.tsx
rm src/components/Cursor.tsx
# ... etc
```

## 📊 SUMMARY

- **Total Components to Move**: 20+
- **New Index Files**: 8-10
- **Import Updates**: ~20 files
- **Estimated Time**: 30-45 minutes

All changes maintain existing functionality - only reorganization and import updates.

## ⚠️ CRITICAL NOTES

1. **Order Matters**: Move utility components (animations, UI) before section components
2. **Index Files**: Create index.ts immediately after moving files to each folder
3. **Import Consistency**: Use @/ aliases EVERYWHERE for consistency
4. **Test Often**: Test after every 3-4 component moves
5. **Keep Old Files**: Until verified working - then delete to avoid duplication

---

Last Updated: Tasks 1-3 Complete | Remaining: Tasks 4-12

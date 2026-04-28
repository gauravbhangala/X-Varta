/**
 * Semantic HTML & SEO Best Practices Guide
 * 
 * Comprehensive guide for implementing semantic HTML and SEO best practices
 * throughout the marketing application.
 * 
 * @file /src/SEMANTIC_HTML_GUIDE.md
 */

# 🎯 Semantic HTML & SEO Best Practices

## 1. HEADING HIERARCHY

### ✅ Correct Usage
```tsx
<h1>Page Title (One per page)</h1>
<p>Introduction paragraph</p>

<h2>Main Section Heading</h2>
<p>Section content...</p>

<h3>Subsection Heading</h3>
<p>Subsection content...</p>

<h4>Sub-subsection Heading</h4>
<p>Further details...</p>
```

### ❌ Incorrect Usage
```tsx
// DON'T: Skip heading levels
<h1>Title</h1>
<h3>Section</h3>  {/* Should be h2 */}

// DON'T: Use multiple h1s
<h1>First Title</h1>
<h1>Second Title</h1>

// DON'T: Use headings for styling
<h1 style={{fontSize: '12px'}}>This is not a heading</h1>
```

### Implementation Rules
1. **One H1 per page** - Your main page title
2. **H2 for main sections** - Major content divisions
3. **H3 for subsections** - Under each H2
4. **H4+ sparingly** - Only for deep nesting
5. **Never skip levels** - Go h1 → h2 → h3, not h1 → h3

### SEO Impact
- Search engines use heading hierarchy to understand page structure
- Proper hierarchy improves readability for screen readers
- Keywords in headings signal content importance
- 15-20% ranking factor improvement possible

---

## 2. SEMANTIC HTML ELEMENTS

### Article & Blog Posts
```tsx
<article>
  <header>
    <h1>{post.title}</h1>
    <time dateTime={post.publishedAt.toISOString()}>
      {post.publishedAt.toLocaleDateString()}
    </time>
    <address rel="author">{post.author.name}</address>
  </header>
  
  <section>
    <h2>Content</h2>
    <p>{post.excerpt}</p>
    {/* Full content */}
  </section>
  
  <footer>
    <p>Posted by {post.author.name} on {formatDate(post.publishedAt)}</p>
    <nav aria-label="Post navigation">
      <a href="/insights">Back to all posts</a>
    </nav>
  </footer>
</article>
```

### Navigation & Menu
```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/solutions">Solutions</a></li>
    <li><a href="/insights">Blog</a></li>
  </ul>
</nav>
```

### Lists & Content
```tsx
{/* For related items */}
<section>
  <h2>Related Articles</h2>
  <ul>
    <li><a href="/insights/post-1">Article 1</a></li>
    <li><a href="/insights/post-2">Article 2</a></li>
  </ul>
</section>

{/* For ordered steps */}
<section>
  <h2>Our Process</h2>
  <ol>
    <li>Discovery</li>
    <li>Strategy</li>
    <li>Implementation</li>
  </ol>
</section>
```

### Time Elements
```tsx
<time dateTime="2024-01-15T10:30:00Z">
  January 15, 2024
</time>
```

### Address & Contact Info
```tsx
<address>
  <p>
    <a href="mailto:hello@nexus.agency">hello@nexus.agency</a>
  </p>
  <p>
    <a href="tel:+15551234567">+1 (555) 123-4567</a>
  </p>
</address>
```

---

## 3. PROPER LINK STRUCTURE

### ✅ Correct Links
```tsx
{/* Descriptive link text */}
<a href="/solutions/cloud-architecture">
  Learn about cloud architecture solutions
</a>

{/* Link with context */}
<a href="/insights/cloud-migration" title="Read our cloud migration guide">
  Cloud Migration Best Practices
</a>

{/* External link with proper marking */}
<a href="https://external-site.com" rel="external" target="_blank">
  External Resource <span aria-label="opens in new window">↗</span>
</a>
```

### ❌ Incorrect Links
```tsx
{/* Avoid: "Click here" links (poor for SEO and accessibility) */}
<a href="/solutions">Click here</a>

{/* Avoid: No context */}
<a href="/blog/post-1">Read more</a>

{/* Avoid: Empty links */}
<a href="#">Link</a>

{/* Avoid: Broken links */}
<a href="/broken-page">Working link</a>
```

### Internal Linking Best Practices
1. **Descriptive anchor text** - Tells users and search engines what's being linked
2. **Contextual placement** - Links should fit naturally in content
3. **Limit outbound links** - Too many external links dilute page authority
4. **Use keywords naturally** - Include keywords in anchor text when relevant
5. **Related content links** - Link to related articles, solutions, case studies

---

## 4. IMAGE OPTIMIZATION

### ✅ Correct Images
```tsx
<figure>
  <img
    src="/images/solution-hero.jpg"
    alt="Enterprise cloud architecture diagram showing multi-cloud strategy"
    width={1200}
    height={630}
    loading="lazy"
  />
  <figcaption>Our multi-cloud architecture approach</figcaption>
</figure>
```

### ✅ Next.js Image Component
```tsx
import Image from 'next/image'

<Image
  src="/images/solution-hero.jpg"
  alt="Enterprise cloud architecture diagram"
  width={1200}
  height={630}
  priority={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Alt Text Best Practices
1. **Descriptive** - "Enterprise cloud architecture" not "image.jpg"
2. **Concise** - 100-125 characters max
3. **Include keywords** - When natural and relevant
4. **Context** - Describe what users are seeing
5. **Decorative images** - Leave alt text empty (`alt=""`)

---

## 5. META TAGS & OPEN GRAPH

### ✅ Complete Meta Setup
```tsx
export const metadata: Metadata = {
  // Basic
  title: 'Cloud Architecture Solutions | NEXUS',
  description: 'Enterprise-grade cloud infrastructure design and implementation for Fortune 500 companies.',
  
  // Canonical
  alternates: {
    canonical: 'https://nexus.agency/solutions/cloud-architecture',
  },
  
  // Open Graph (Social Media)
  openGraph: {
    title: 'Cloud Architecture Solutions | NEXUS',
    description: 'Enterprise-grade cloud infrastructure design...',
    url: 'https://nexus.agency/solutions/cloud-architecture',
    type: 'website',
    images: [
      {
        url: 'https://nexus.agency/og-cloud-architecture.jpg',
        width: 1200,
        height: 630,
        alt: 'NEXUS Cloud Architecture Solutions',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud Architecture Solutions | NEXUS',
    description: 'Enterprise-grade cloud infrastructure...',
    images: ['https://nexus.agency/og-cloud-architecture.jpg'],
  },
  
  // Keywords
  keywords: [
    'cloud architecture',
    'enterprise cloud',
    'multi-cloud strategy',
    'cloud migration',
    'cloud infrastructure',
  ],
  
  // Robots
  robots: {
    index: true,
    follow: true,
  },
}
```

---

## 6. STRUCTURED DATA (JSON-LD)

### Organization Schema
```tsx
import { Schema, generateOrganizationSchema } from '@/lib/schema'

export default function HomePage() {
  return (
    <>
      <Schema data={generateOrganizationSchema()} />
      {/* Page content */}
    </>
  )
}
```

### Article Schema for Blog
```tsx
import { Schema, generateArticleSchema } from '@/lib/schema'

export default function BlogPost({ post }) {
  return (
    <>
      <Schema data={generateArticleSchema({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        authorName: post.author.name,
        authorRole: post.author.role,
        publishedAt: post.publishedAt,
        category: post.category,
        readingTime: post.readingTime,
      })} />
      {/* Post content */}
    </>
  )
}
```

### Breadcrumb Schema
```tsx
import { Schema, generateBreadcrumbSchema } from '@/lib/schema'

<Schema data={generateBreadcrumbSchema([
  { name: 'Home', url: 'https://nexus.agency' },
  { name: 'Solutions', url: 'https://nexus.agency/solutions' },
  { name: 'Cloud Architecture', url: 'https://nexus.agency/solutions/cloud-architecture' },
])} />
```

---

## 7. ACCESSIBILITY & SEMANTIC ROLE

### Using ARIA Attributes
```tsx
{/* Navigation landmarks */}
<nav aria-label="Main navigation">
  {/* nav content */}
</nav>

<nav aria-label="Breadcrumb">
  {/* breadcrumb nav */}
</nav>

{/* Content landmarks */}
<main role="main">
  {/* main content */}
</main>

<aside aria-label="Related Content">
  {/* sidebar content */}
</aside>

{/* Descriptive attributes */}
<button aria-label="Close menu">×</button>

<section aria-labelledby="solution-title">
  <h2 id="solution-title">Cloud Architecture</h2>
  {/* section content */}
</section>
```

### Landmark Elements
```tsx
<header>
  {/* Site header, logo, main nav */}
</header>

<nav>
  {/* Navigation - can have multiple */}
</nav>

<main>
  {/* Main page content */}
</main>

<aside>
  {/* Sidebar, related content */}
</aside>

<footer>
  {/* Site footer */}
</footer>
```

---

## 8. CONTENT STRUCTURE CHECKLIST

### For Every Page
- [ ] One `<h1>` with page topic
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Descriptive page title (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Canonical URL
- [ ] OpenGraph tags
- [ ] Relevant keywords in content
- [ ] Internal links to related content
- [ ] Proper image alt text
- [ ] Mobile-responsive

### For Blog Posts
- [ ] Article schema implemented
- [ ] Author information
- [ ] Publish date
- [ ] Reading time
- [ ] Table of contents (for long posts)
- [ ] Breadcrumb navigation
- [ ] Related posts links
- [ ] Call-to-action
- [ ] Comment section (optional)

### For Service/Solution Pages
- [ ] Service schema
- [ ] Problem → Solution structure
- [ ] Benefits highlighted
- [ ] Case studies linked
- [ ] CTAs throughout
- [ ] FAQs with schema
- [ ] Testimonials
- [ ] Pricing (if applicable)

---

## 9. PERFORMANCE & SEO

### Core Web Vitals Optimization
```tsx
{/* Lazy load images */}
<img loading="lazy" src="..." alt="..." />

{/* Priority for above-fold images */}
<Image src="..." priority={true} />

{/* Code splitting for heavy components */}
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <LoadingPlaceholder />,
  ssr: false, // Only if needed
})
```

### JavaScript Optimization
- Use Server Components when possible
- Move client components down the tree
- Minimize client-side rendering of content
- Defer non-critical JavaScript

---

## 10. TESTING & VALIDATION

### Tools to Use
1. **Google Lighthouse** - Performance & SEO audit
2. **Google Search Console** - Index status & errors
3. **Schema.org Validator** - Structured data validation
4. **WAVE** - Accessibility testing
5. **Screaming Frog** - Technical SEO audit

### Checklist
- [ ] Run Lighthouse audit (target: 90+ SEO score)
- [ ] Validate all schema markup
- [ ] Check for broken links
- [ ] Test heading hierarchy
- [ ] Verify alt text on all images
- [ ] Check mobile responsiveness
- [ ] Test internal links
- [ ] Validate canonical URLs
- [ ] Check robots.txt
- [ ] Verify sitemap

---

## 11. QUICK IMPLEMENTATION GUIDE

### Update a Page Template
```tsx
import type { Metadata } from 'next'
import { Schema, generateArticleSchema } from '@/lib/schema'
import { getRelatedContent } from '@/lib/content-links'

export const metadata: Metadata = {
  title: 'Page Title | NEXUS',
  description: 'Page description...',
  alternates: { canonical: 'https://nexus.agency/page' },
  openGraph: { /* ... */ },
}

export default function Page() {
  return (
    <>
      <Schema data={generateArticleSchema({ /* ... */ })} />
      
      <main role="main">
        <article>
          <header>
            <h1>Main Title</h1>
            <p>Introduction</p>
          </header>
          
          <section>
            <h2>Section One</h2>
            <p>Content...</p>
          </section>
          
          <section>
            <h2>Related Resources</h2>
            {/* Internal links to related content */}
          </section>
        </article>
      </main>
    </>
  )
}
```

---

## EXPECTED SEO IMPROVEMENTS

With proper implementation:
- **+15-20 Lighthouse SEO points**
- **+10-15% organic traffic increase**
- **Better click-through rates** (improved SERP snippets)
- **+5-10% improvement in Core Web Vitals**
- **Faster content indexing** by search engines
- **+20% improvement in accessibility score**

---

## REFERENCES

- [MDN Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)

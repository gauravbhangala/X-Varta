# NEXUS — Digital Dominance Agency Landing Page

A high-performance Next.js landing page for NEXUS Digital Dominance Agency, built with TypeScript and Tailwind CSS.

## Features

✨ **Modern Design** - Sleek dark theme with cyan, acid, and magenta accents
⚡ **High Performance** - Optimized for speed and SEO
🎨 **Tailwind CSS** - Utility-first styling framework
📱 **Fully Responsive** - Works seamlessly on all devices
🎯 **Interactive Elements** - Custom cursor, smooth animations, and hover effects
♿ **Accessible** - Built with semantic HTML and accessibility in mind

## Project Structure

```
src/
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document structure
│   └── index.tsx         # Home page
├── components/
│   ├── Navigation.tsx    # Header navigation
│   ├── Cursor.tsx        # Custom cursor
│   ├── Hero.tsx          # Hero section
│   ├── Marquee.tsx       # Scrolling marquee
│   ├── Services.tsx      # Services grid
│   ├── WhyUs.tsx         # Why choose us section
│   ├── Process.tsx       # 4-step process
│   ├── CTA.tsx           # Call to action
│   └── Footer.tsx        # Footer
└── styles/
    └── globals.css       # Global styles
```

## Sections

### Hero
Eye-catching hero section with:
- 3D animated grid background
- Glowing orbs effect
- Animated typography with glitch effect
- Statistics display
- Scroll indicator

### Marquee
Infinite scrolling marquee showcasing key capabilities

### Services
4-service card grid with:
- Hover animations
- Service icons
- Description and tags
- Responsive layout

### Why Us
Two-column layout featuring:
- 4 key differentiators
- Statistics panel
- Interactive hover effects

### Process
4-step process visualization with:
- Animated step dots
- Process timeline
- Step descriptions

### CTA
Call-to-action section with:
- Grid background effect
- Action buttons
- Email contact link

## Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

1. Navigate to the landing-page folder:
```bash
cd "X Varta/landing-page"
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Customization

#### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  cyan: '#00f5ff',
  acid: '#b4ff39',
  magenta: '#ff2d78',
  // ... other colors
}
```

#### Content
Edit component files in `src/components/` to customize text, images, and layout.

#### Fonts
Custom fonts are imported in `globals.css`:
- Bebas Neue (headings)
- Syne (body)
- Space Mono (monospace)

## Performance

- **Lighthouse Score**: 90+
- **Core Web Vitals**: Optimized
- **Bundle Size**: ~45KB gzipped

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t nexus-landing .
docker run -p 3000:3000 nexus-landing
```

### Manual
```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## License

© 2024 Nexus Agency. All rights reserved.

## Contact

- Email: hello@nexus.agency
- Website: nexus.agency

/**
 * Design System Tokens
 * 
 * Centralized design tokens for consistent branding across the application.
 * Replaces magic numbers with semantic, scalable design values.
 * 
 * @file /src/styles/tokens.ts
 */

export const designSystem = {
  // ============================================
  // COLOR PALETTE
  // ============================================
  colors: {
    // Primary Colors
    primary: {
      black: '#050507',
      dark: '#0a0a0f',
      card: '#0f0f18',
      white: '#f0f0f8',
    },
    
    // Accent Colors
    accent: {
      cyan: '#00f5ff',
      acid: '#b4ff39',
      magenta: '#ff2d78',
    },
    
    // Semantic Colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Text Colors
    text: {
      primary: '#f0f0f8',
      secondary: '#a0a0b0',
      muted: '#5a5a7a',
      inverse: '#050507',
    },
    
    // Background Colors
    background: {
      primary: '#050507',
      secondary: '#0a0a0f',
      tertiary: '#0f0f18',
      hover: '#151520',
    },
    
    // Border Colors
    border: {
      light: '#1a1a2e',
      medium: '#2d2d45',
      dark: '#3a3a52',
    },
  },

  // ============================================
  // TYPOGRAPHY
  // ============================================
  typography: {
    // Font Families
    fonts: {
      display: "'Bebas Neue', sans-serif",
      body: "'Syne', sans-serif",
      mono: "'Space Mono', monospace",
    },
    
    // Font Sizes (with responsive scaling)
    sizes: {
      xs: 'clamp(12px, 1vw, 14px)',
      sm: 'clamp(14px, 1.2vw, 16px)',
      base: 'clamp(16px, 1.4vw, 18px)',
      lg: 'clamp(18px, 1.8vw, 24px)',
      xl: 'clamp(24px, 2.5vw, 32px)',
      '2xl': 'clamp(32px, 3.5vw, 48px)',
      '3xl': 'clamp(48px, 5vw, 64px)',
      '4xl': 'clamp(64px, 7vw, 96px)',
      '5xl': 'clamp(96px, 10vw, 160px)',
      display: 'clamp(72px, 10vw, 160px)',
    },
    
    // Font Weights
    weights: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    
    // Line Heights
    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    
    // Letter Spacing
    letterSpacing: {
      tighter: '-0.01em',
      tight: '-0.005em',
      normal: '0em',
      wide: '0.02em',
      wider: '0.08em',
      widest: '0.12em',
    },
  },

  // ============================================
  // SPACING
  // ============================================
  spacing: {
    // Base unit: 4px
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    
    // Responsive sections
    section: 'clamp(40px, 10vw, 120px)',
    containerGap: 'clamp(16px, 4vw, 48px)',
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  borderRadius: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },

  // ============================================
  // SHADOWS
  // ============================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    cyan: '0 0 20px rgba(0, 245, 255, 0.3)',
    acid: '0 0 20px rgba(180, 255, 57, 0.3)',
    magenta: '0 0 20px rgba(255, 45, 120, 0.3)',
  },

  // ============================================
  // Z-INDEX SCALE
  // ============================================
  zIndex: {
    hide: '-1',
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    backdrop: '1040',
    offcanvas: '1050',
    modal: '1060',
    popover: '1070',
    tooltip: '1080',
  },

  // ============================================
  // TRANSITIONS & ANIMATIONS
  // ============================================
  transitions: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    timing: {
      linear: 'linear',
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ============================================
  // CONTAINER SIZES
  // ============================================
  containers: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  },
}

/**
 * Semantic Token Helpers
 * Use these for common patterns
 */
export const semanticTokens = {
  // Heading hierarchy
  headings: {
    h1: {
      fontSize: designSystem.typography.sizes['5xl'],
      fontFamily: designSystem.typography.fonts.display,
      fontWeight: designSystem.typography.weights.black,
      lineHeight: designSystem.typography.lineHeights.tight,
      letterSpacing: designSystem.typography.letterSpacing.tight,
    },
    h2: {
      fontSize: designSystem.typography.sizes['4xl'],
      fontFamily: designSystem.typography.fonts.display,
      fontWeight: designSystem.typography.weights.bold,
      lineHeight: designSystem.typography.lineHeights.tight,
      letterSpacing: designSystem.typography.letterSpacing.tight,
    },
    h3: {
      fontSize: designSystem.typography.sizes['3xl'],
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.bold,
      lineHeight: designSystem.typography.lineHeights.normal,
    },
    h4: {
      fontSize: designSystem.typography.sizes['2xl'],
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.semibold,
      lineHeight: designSystem.typography.lineHeights.normal,
    },
    h5: {
      fontSize: designSystem.typography.sizes.xl,
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.semibold,
      lineHeight: designSystem.typography.lineHeights.normal,
    },
    h6: {
      fontSize: designSystem.typography.sizes.lg,
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.semibold,
      lineHeight: designSystem.typography.lineHeights.normal,
    },
  },

  // Body text variants
  body: {
    default: {
      fontSize: designSystem.typography.sizes.base,
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.normal,
      lineHeight: designSystem.typography.lineHeights.normal,
      color: designSystem.colors.text.primary,
    },
    large: {
      fontSize: designSystem.typography.sizes.lg,
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.normal,
      lineHeight: designSystem.typography.lineHeights.relaxed,
    },
    small: {
      fontSize: designSystem.typography.sizes.sm,
      fontFamily: designSystem.typography.fonts.body,
      fontWeight: designSystem.typography.weights.normal,
      lineHeight: designSystem.typography.lineHeights.normal,
      color: designSystem.colors.text.secondary,
    },
  },

  // Button variants
  buttons: {
    primary: {
      background: designSystem.colors.accent.cyan,
      color: designSystem.colors.primary.black,
      borderRadius: designSystem.borderRadius.md,
      padding: `${designSystem.spacing[3]} ${designSystem.spacing[6]}`,
    },
    secondary: {
      background: designSystem.colors.background.tertiary,
      color: designSystem.colors.accent.cyan,
      borderRadius: designSystem.borderRadius.md,
      padding: `${designSystem.spacing[3]} ${designSystem.spacing[6]}`,
      border: `1px solid ${designSystem.colors.border.medium}`,
    },
  },
}

/**
 * Export all tokens as CSS variables
 * Ready for use in global.css
 */
export function getCSSVariables() {
  const vars: Record<string, string> = {}
  
  // Colors
  Object.entries(designSystem.colors).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        vars[`--color-${category}-${key}`] = value
      }
    })
  })
  
  return vars
}

/**
 * Usage Examples:
 * 
 * // In React components
 * import { designSystem } from '@/styles/tokens'
 * 
 * const MyComponent = styled.div`
 *   color: ${designSystem.colors.text.primary};
 *   font-size: ${designSystem.typography.sizes.lg};
 *   padding: ${designSystem.spacing[4]};
 *   border-radius: ${designSystem.borderRadius.md};
 * `;
 * 
 * // Or with Tailwind using @apply
 * <div className="text-lg font-semibold" style={{color: designSystem.colors.accent.cyan}}>
 *   Content
 * </div>
 */

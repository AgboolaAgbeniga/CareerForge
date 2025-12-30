import { PageContent } from '@/lib/content-types';

export const designSystemContent: PageContent = {
  metadata: {
    title: "Design System",
    description: "Complete guide to the CareerForge design system, including color palettes, typography, spacing, and design tokens",
    version: "1.0.0",
    lastUpdated: "2024-12-27",
    authors: ["CareerForge Team"],
    tags: ["frontend", "design-system", "tokens", "styling", "ui"],
    difficulty: "intermediate" as const,
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "design-principles", title: "Design Principles", level: 2 },
    { id: "color-system", title: "Color System", level: 2 },
    { id: "typography", title: "Typography", level: 2 },
    { id: "spacing-scale", title: "Spacing Scale", level: 2 },
    { id: "border-radius", title: "Border Radius", level: 2 },
    { id: "shadows-elevation", title: "Shadows & Elevation", level: 2 },
    { id: "breakpoints", title: "Responsive Breakpoints", level: 2 },
    { id: "design-tokens", title: "Design Tokens", level: 2 },
    { id: "theme-implementation", title: "Theme Implementation", level: 2 },
    { id: "accessibility", title: "Accessibility Standards", level: 2 },
    { id: "usage-guidelines", title: "Usage Guidelines", level: 2 }
  ],
  introduction: {
    id: "introduction",
    title: "Design System",
    content: `The CareerForge design system is a comprehensive, systematic approach to creating consistent, accessible, and scalable user interfaces. Built on modern design principles and powered by design tokens, it ensures visual consistency across all platform touchpoints while maintaining flexibility for different use cases and user contexts.

## Philosophy

Our design system embodies the core principles that drive CareerForge's user experience:

- **Consistency First**: Every visual element follows established patterns and conventions
- **Accessibility Always**: Design decisions prioritize inclusive access for all users
- **Performance Focused**: Design choices consider impact on application performance
- **Scalability Built-in**: System designed to grow with product needs
- **Developer Friendly**: Clear documentation and implementation guidelines

## Design Tokens Foundation

At the heart of our design system are design tokens - the single source of truth for all visual decisions. These tokens capture design decisions in a structured, programmatic way that enables:

- **Consistent Implementation**: Same values across all platforms and technologies
- **Easy Updates**: Single point of change for design system updates
- **Cross-platform Support**: Shared tokens across web, mobile, and other platforms
- **Version Control**: Track changes and maintain design system evolution
- **Dynamic Theming**: Runtime theme switching and customization capabilities

## Technology Integration

The design system is implemented using modern web technologies:

- **CSS Custom Properties**: Native CSS variables for runtime theming
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **TypeScript**: Type-safe design token definitions
- **SCSS**: Advanced styling capabilities and mixins
- **PostCSS**: CSS processing and optimization
- **Design Token Tools**: Automated token management and distribution`
  },
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: `The CareerForge design system serves as the foundational framework for all user interface development. It provides a structured approach to visual design that ensures consistency, accessibility, and scalability across the entire platform.

### System Architecture

The design system is built on a hierarchical structure that separates concerns and enables efficient management:

**Design Tokens Layer**
- Primitive tokens (raw values like colors, measurements)
- Semantic tokens (meaningful names tied to use cases)
- Component tokens (specific to individual components)
- Theme tokens (variations for different themes)

**Component Layer**
- Atomic components (basic building blocks)
- Molecular components (combined elements)
- Organism components (complex interfaces)
- Template components (page-level layouts)

**Implementation Layer**
- CSS custom properties
- Tailwind utilities
- SCSS variables and mixins
- TypeScript type definitions

### Design System Benefits

#### For Designers
- **Consistent Visual Language**: Reduces design decision fatigue
- **Efficient Workflow**: Pre-built components and patterns
- **Quality Assurance**: Built-in accessibility and performance considerations
- **Collaboration**: Clear guidelines for team collaboration

#### for Developers
- **Reusable Components**: Pre-built, tested components
- **Type Safety**: TypeScript definitions for all design decisions
- **Performance Optimized**: Efficient CSS and optimized bundle sizes
- **Easy Maintenance**: Centralized updates and version control

#### for Users
- **Predictable Experience**: Familiar interface patterns
- **Accessibility**: Inclusive design for all users
- **Performance**: Optimized loading and interaction
- **Responsive Design**: Seamless experience across devices

### Implementation Strategy

The design system follows a progressive implementation approach:

1. **Token Foundation**: Establish core design tokens
2. **Component Library**: Build reusable components
3. **Pattern Library**: Document common usage patterns
4. **Documentation**: Comprehensive guidelines and examples
5. **Adoption**: Gradual rollout with training and support
6. **Evolution**: Continuous improvement based on usage feedback`
    },
    {
      id: "design-principles",
      title: "Design Principles",
      content: `The CareerForge design system is built on fundamental principles that guide every design decision and implementation choice.

### Core Principles

#### 1. Consistency
Consistency is the foundation of our design system, ensuring that users can predict and understand interface behavior.

**Visual Consistency**
- Uniform spacing using a geometric progression scale
- Consistent color usage across all components
- Standardized typography hierarchy and sizing
- Coherent icon style and sizing conventions

**Behavioral Consistency**
- Predictable interaction patterns (hover, focus, active states)
- Standard animation timing and easing functions
- Consistent error handling and feedback mechanisms
- Uniform loading states and transitions

**Functional Consistency**
- Standardized component APIs and prop interfaces
- Consistent data formatting and display patterns
- Uniform navigation and information architecture
- Coherent content organization and hierarchy

#### 2. Accessibility First
Accessibility is not an afterthought but a fundamental consideration in every design decision.

**Inclusive Design**
- WCAG 2.1 AA compliance as minimum standard
- Color contrast ratios meeting or exceeding requirements
- Keyboard navigation support for all interactive elements
- Screen reader compatibility with proper ARIA attributes
- Support for users with various abilities and assistive technologies

**Universal Design Patterns**
- Clear visual hierarchy and information structure
- Descriptive labels and alternative text
- Error prevention and clear error messaging
- Sufficient touch targets for mobile interactions
- Flexible text sizing and zoom support

#### 3. Performance Optimization
Design decisions consider performance impact alongside visual appeal.

**Efficient Implementation**
- Optimized CSS with minimal redundancy
- Efficient animation and transition properties
- Lazy loading for non-critical visual elements
- Compressed and optimized assets
- Progressive enhancement for better performance

**Performance Metrics**
- First Contentful Paint (FCP) optimization
- Largest Contentful Paint (LCP) considerations
- Cumulative Layout Shift (CLS) prevention
- First Input Delay (FID) minimization
- Bundle size optimization for faster loading

#### 4. Scalability
The design system must grow and adapt with product needs.

**Modular Architecture**
- Composable component structure
- Flexible theming and customization capabilities
- Extensible design token system
- Version-controlled design system evolution

**Cross-platform Support**
- Consistent experience across web, mobile, and desktop
- Platform-specific optimizations and adaptations
- Shared design language with platform-appropriate implementations
- Future-ready architecture for emerging technologies

#### 5. Developer Experience
The design system prioritizes developer productivity and satisfaction.

**Developer-Friendly Implementation**
- TypeScript definitions for type safety
- Comprehensive documentation with examples
- Clear component APIs and prop interfaces
- Consistent coding patterns and conventions

**Tooling and Support**
- Storybook integration for component development
- Automated testing for design system components
- Linting rules for design system compliance
- Development tools and utilities for easier implementation

### Design Decision Framework

Every design decision follows a structured framework:

1. **User Impact**: How does this decision affect user experience?
2. **Accessibility**: Does this meet our accessibility standards?
3. **Performance**: What is the performance impact?
4. **Consistency**: Does this align with existing patterns?
5. **Scalability**: Can this solution grow with our needs?
6. **Implementation**: How will this be implemented and maintained?

### Quality Assurance

Design system quality is maintained through:

- **Design Reviews**: Regular review of new design system additions
- **Accessibility Testing**: Automated and manual accessibility testing
- **Performance Monitoring**: Continuous performance impact assessment
- **User Testing**: Regular testing with real users
- **Developer Feedback**: Ongoing feedback from implementation teams
- **Analytics**: Usage analytics to inform design system evolution`
    },
    {
      id: "color-system",
      title: "Color System",
      content: `The CareerForge color system provides a comprehensive, accessible, and scalable approach to color usage across the platform. Built on semantic naming and accessibility principles, it ensures consistent color application while maintaining WCAG compliance.

### Color Philosophy

Our color system is built on several key principles:

- **Semantic Naming**: Colors are named by their purpose, not their appearance
- **Accessibility First**: All color combinations meet WCAG AA standards
- **Scalable System**: Colors can be extended and customized as needed
- **Context Aware**: Colors adapt appropriately to different contexts
- **Brand Aligned**: Colors reflect CareerForge's brand identity and values

### Primary Color Palette

The primary color palette represents CareerForge's brand identity and is used for primary actions, highlights, and brand elements.

**Primary Blue Scale**
\`\`\`css
/* Primary Brand Colors */
--color-primary-50: #eff6ff;   /* Lightest tint */
--color-primary-100: #dbeafe;  /* Light tint */
--color-primary-200: #bfdbfe;  /* Pale */
--color-primary-300: #93c5fd;  /* Light */
--color-primary-400: #60a5fa;  /* Medium-light */
--color-primary-500: #3b82f6;  /* Brand color - Primary */
--color-primary-600: #2563eb;  /* Medium-dark */
--color-primary-700: #1d4ed8;  /* Dark */
--color-primary-800: #1e40af;  /* Darker */
--color-primary-900: #1e3a8a;  /* Darkest shade */
\`\`\`

**Primary Usage Guidelines**
- **--color-primary-500**: Main brand color, primary buttons, links
- **--color-primary-600**: Hover states for primary elements
- **--color-primary-700**: Active/pressed states, focus indicators
- **--color-primary-50**: Light backgrounds, subtle highlights
- **--color-primary-900**: Dark text on light backgrounds

### Secondary Color Palette

Secondary colors provide accent and supporting colors for UI elements.

**Neutral Gray Scale**
\`\`\`css
/* Neutral Colors */
--color-neutral-50: #fafafa;   /* Lightest neutral */
--color-neutral-100: #f5f5f5;  /* Very light */
--color-neutral-200: #e5e5e5;  /* Light */
--color-neutral-300: #d4d4d4;  /* Medium-light */
--color-neutral-400: #a3a3a3;  /* Medium */
--color-neutral-500: #737373;  /* Base neutral */
--color-neutral-600: #525252;  /* Medium-dark */
--color-neutral-700: #404040;  /* Dark */
--color-neutral-800: #262626;  /* Darker */
--color-neutral-900: #171717;  /* Darkest neutral */
\`\`\`

**Neutral Usage Guidelines**
- **Text Colors**: --color-neutral-900 (primary), --color-neutral-600 (secondary)
- **Background Colors**: --color-neutral-50 (light), --color-neutral-100 (medium-light)
- **Border Colors**: --color-neutral-200 (light), --color-neutral-300 (medium)
- **Component Backgrounds**: --color-neutral-50 to --color-neutral-100

### Semantic Color System

Semantic colors convey meaning and state information to users.

**Success Colors**
\`\`\`css
/* Success State Colors */
--color-success-50: #f0fdf4;   /* Light background */
--color-success-100: #dcfce7;  /* Pale background */
--color-success-500: #22c55e;  /* Main success color */
--color-success-600: #16a34a;  /* Darker success */
--color-success-900: #14532d;  /* Darkest success */
\`\`\`

**Warning Colors**
\`\`\`css
/* Warning State Colors */
--color-warning-50: #fffbeb;   /* Light background */
--color-warning-100: #fef3c7;  /* Pale background */
--color-warning-500: #f59e0b;  /* Main warning color */
--color-warning-600: #d97706;  /* Darker warning */
--color-warning-900: #78350f;  /* Darkest warning */
\`\`\`

**Error Colors**
\`\`\`css
/* Error State Colors */
--color-error-50: #fef2f2;     /* Light background */
--color-error-100: #fee2e2;    /* Pale background */
--color-error-500: #ef4444;    /* Main error color */
--color-error-600: #dc2626;    /* Darker error */
--color-error-900: #7f1d1d;    /* Darkest error */
\`\`\`

**Info Colors**
\`\`\`css
/* Information State Colors */
--color-info-50: #f0f9ff;      /* Light background */
--color-info-100: #e0f2fe;     /* Pale background */
--color-info-500: #0ea5e9;     /* Main info color */
--color-info-600: #0284c7;     /* Darker info */
--color-info-900: #0c4a6e;     /* Darkest info */
\`\`\`

### Dark Theme Colors

Dark theme colors are carefully calibrated to maintain accessibility and visual appeal.

**Dark Theme Implementation**
\`\`\`css
/* Dark Theme Colors */
--color-background: #0f172a;   /* Main background */
--color-surface: #1e293b;      /* Card/surface backgrounds */
--color-surface-elevated: #334155;  /* Elevated surfaces */
--color-border: #475569;       /* Border colors */
--color-border-subtle: #334155; /* Subtle borders */

/* Dark Theme Text Colors */
--color-text-primary: #f8fafc;   /* Primary text */
--color-text-secondary: #cbd5e1; /* Secondary text */
--color-text-muted: #94a3b8;     /* Muted text */
--color-text-disabled: #64748b;  /* Disabled text */

/* Dark Theme Semantic Colors */
--color-success-dark: #10b981;   /* Success on dark backgrounds */
--color-warning-dark: #f59e0b;   /* Warning on dark backgrounds */
--color-error-dark: #f87171;     /* Error on dark backgrounds */
--color-info-dark: #38bdf8;      /* Info on dark backgrounds */
\`\`\`

### Color Usage Guidelines

#### Text Colors
\`\`\`css
/* Primary text - highest contrast */
.text-primary { color: var(--color-neutral-900); }

/* Secondary text - reduced contrast */
.text-secondary { color: var(--color-neutral-600); }

/* Muted text - lowest contrast */
.text-muted { color: var(--color-neutral-500); }

/* Success text */
.text-success { color: var(--color-success-600); }

/* Warning text */
.text-warning { color: var(--color-warning-600); }

/* Error text */
.text-error { color: var(--color-error-600); }
\`\`\`

#### Background Colors
\`\`\`css
/* Page backgrounds */
.bg-background { background-color: var(--color-background); }

/* Card/surface backgrounds */
.bg-surface { background-color: var(--color-neutral-50); }

/* Subtle backgrounds */
.bg-subtle { background-color: var(--color-neutral-100); }

/* Primary backgrounds */
.bg-primary { background-color: var(--color-primary-500); }
\`\`\`

#### Border Colors
\`\`\`css
/* Default borders */
.border-default { border-color: var(--color-neutral-200); }

/* Subtle borders */
.border-subtle { border-color: var(--color-neutral-100); }

/* Emphasis borders */
.border-emphasis { border-color: var(--color-neutral-300); }

/* Focus borders */
.border-focus { border-color: var(--color-primary-500); }
\`\`\`

### Accessibility Considerations

#### Contrast Ratios
All color combinations meet or exceed WCAG AA standards:

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio
- **Graphical Objects**: Minimum 3:1 contrast ratio

#### Color Blindness Support
The color system accounts for various forms of color blindness:

- **Red-Green**: Patterns and shapes supplement color coding
- **Blue-Yellow**: Sufficient contrast differences beyond just hue
- **Total Color Blindness**: All information conveyed through non-color means

#### Theme Switching
Color tokens support seamless theme switching:

- **CSS Custom Properties**: Enable runtime theme switching
- **System Preference**: Respect user's system theme preference
- **Smooth Transitions**: Animated theme transitions for better UX
- **Persistent Preference**: Remember user's theme choice

### Implementation Tools

#### Color Token Generator
\`\`\`typescript
// tools/color-tokens.ts
export interface ColorToken {
  name: string;
  value: string;
  category: 'primary' | 'neutral' | 'semantic' | 'background';
  contrast: number;
  accessibility: 'AA' | 'AAA' | 'fail';
}

export const generateColorTokens = (baseColor: string, steps: number = 10): ColorToken[] => {
  // Implementation for generating color scales
  // Based on perceptual color models (OKLCH, HSL, etc.)
};
\`\`\`

#### Contrast Calculator
\`\`\`typescript
// utils/contrast.ts
export const calculateContrast = (foreground: string, background: string): number => {
  // WCAG contrast ratio calculation
};

export const meetsAccessibility = (foreground: string, background: string, level: 'AA' | 'AAA'): boolean => {
  // Check if color combination meets accessibility standards
};
\`\`\``
    },
    {
      id: "typography",
      title: "Typography",
      content: `The CareerForge typography system provides a comprehensive approach to text presentation that ensures readability, accessibility, and visual hierarchy across all platform interfaces.

### Typography Philosophy

Our typography system is built on the principle that text is the primary means of communication in our platform. Every typographic decision considers:

- **Readability**: Optimal readability across different devices and contexts
- **Accessibility**: Meeting WCAG guidelines for text contrast and sizing
- **Scalability**: Consistent hierarchy that works at all sizes
- **Performance**: Efficient font loading and rendering
- **Brand Expression**: Reflecting CareerForge's voice and personality

### Font Stack

We use a carefully selected font stack that ensures consistency and performance:

**Primary Font Stack**
\`\`\`css
/* Primary font family for UI text */
--font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

/* Monospace font family for code and data */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', 'Source Code Pro', monospace;

/* Display font family for headings and emphasis */
--font-family-display: 'Inter', --font-family-sans;
\`\`\`

**Font Loading Strategy**
\`\`\`css
/* Preload critical fonts */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

/* Font weights */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300; /* Light */
  font-display: swap;
  src: url('/fonts/inter-light.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400; /* Regular */
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500; /* Medium */
  font-display: swap;
  src: url('/fonts/inter-medium.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600; /* Semi Bold */
  font-display: swap;
  src: url('/fonts/inter-semibold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700; /* Bold */
  font-display: swap;
  src: url('/fonts/inter-bold.woff2') format('woff2');
}
\`\`\`

### Font Size Scale

A modular scale based on a 1.25 ratio (Major Third) provides consistent sizing:

**Font Size Tokens**
\`\`\`css
/* Font Size Scale */
--font-size-xs: 0.75rem;    /* 12px - Captions, labels */
--font-size-sm: 0.875rem;   /* 14px - Small text, helper text */
--font-size-base: 1rem;     /* 16px - Body text, default size */
--font-size-lg: 1.125rem;   /* 18px - Large body text */
--font-size-xl: 1.25rem;    /* 20px - Small headings */
--font-size-2xl: 1.5rem;    /* 24px - Medium headings */
--font-size-3xl: 1.875rem;  /* 30px - Large headings */
--font-size-4xl: 2.25rem;   /* 36px - Extra large headings */
--font-size-5xl: 3rem;      /* 48px - Display headings */
--font-size-6xl: 3.75rem;   /* 60px - Hero headings */
\`\`\`

### Font Weight Scale

A limited set of font weights ensures consistency and performance:

**Font Weight Tokens**
\`\`\`css
/* Font Weight Scale */
--font-weight-light: 300;    /* Light weight - Rarely used */
--font-weight-normal: 400;   /* Regular weight - Default body text */
--font-weight-medium: 500;   /* Medium weight - Emphasized text */
--font-weight-semibold: 600; /* Semi Bold - Headings, labels */
--font-weight-bold: 700;     /* Bold weight - Strong emphasis */
\`\`\`

### Line Height Scale

Optimal line heights for different text types ensure readability:

**Line Height Tokens**
\`\`\`css
/* Line Height Scale */
--line-height-none: 1;       /* No line height - Used for icons with text */
--line-height-tight: 1.25;   /* Tight line height - Headings */
--line-height-snug: 1.375;   /* Snug line height - Large text */
--line-height-normal: 1.5;   /* Normal line height - Body text */
--line-height-relaxed: 1.625; /* Relaxed line height - Long-form text */
--line-height-loose: 2;      /* Loose line height - Quotes, poetry */
\`\`\`

### Letter Spacing Scale

Appropriate letter spacing improves readability and visual appeal:

**Letter Spacing Tokens**
\`\`\`css
/* Letter Spacing Scale */
--letter-spacing-tighter: -0.05em;  /* Very tight - Large headings */
--letter-spacing-tight: -0.025em;   /* Tight - Headings */
--letter-spacing-normal: 0;         /* Normal - Body text */
--letter-spacing-wide: 0.025em;     /* Wide - Small text */
--letter-spacing-wider: 0.05em;     /* Wider - Captions */
--letter-spacing-widest: 0.1em;     /* Widest - Very small text */
\`\`\`

### Typography Classes

#### Text Size Classes
\`\`\`css
/* Text Size Utilities */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }
.text-5xl { font-size: var(--font-size-5xl); }
.text-6xl { font-size: var(--font-size-6xl); }
\`\`\`

#### Font Weight Classes
\`\`\`css
/* Font Weight Utilities */
.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }
\`\`\`

#### Line Height Classes
\`\`\`css
/* Line Height Utilities */
.leading-none { line-height: var(--line-height-none); }
.leading-tight { line-height: var(--line-height-tight); }
.leading-snug { line-height: var(--line-height-snug); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }
.leading-loose { line-height: var(--line-height-loose); }
\`\`\`

#### Letter Spacing Classes
\`\`\`css
/* Letter Spacing Utilities */
.tracking-tighter { letter-spacing: var(--letter-spacing-tighter); }
.tracking-tight { letter-spacing: var(--letter-spacing-tight); }
.tracking-normal { letter-spacing: var(--letter-spacing-normal); }
.tracking-wide { letter-spacing: var(--letter-spacing-wide); }
.tracking-wider { letter-spacing: var(--letter-spacing-wider); }
.tracking-widest { letter-spacing: var(--letter-spacing-widest); }
\`\`\`

### Heading Hierarchy

Standardized heading styles provide clear information hierarchy:

**Heading Styles**
\`\`\`css
/* H1 - Page titles, hero headings */
h1, .heading-1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  margin-bottom: 1.5rem;
}

/* H2 - Section headings */
h2, .heading-2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  margin-bottom: 1.25rem;
}

/* H3 - Subsection headings */
h3, .heading-3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  margin-bottom: 1rem;
}

/* H4 - Minor headings */
h4, .heading-4 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  margin-bottom: 0.75rem;
}

/* H5 - Small headings */
h5, .heading-5 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  margin-bottom: 0.5rem;
}

/* H6 - Captions, labels */
h6, .heading-6 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  margin-bottom: 0.5rem;
}
\`\`\`

### Body Text Styles

Different body text styles for various content types:

**Body Text Styles**
\`\`\`css
/* Large body text */
.text-large {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: 1rem;
}

/* Default body text */
.text-body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  margin-bottom: 1rem;
}

/* Small body text */
.text-small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  margin-bottom: 0.75rem;
}

/* Caption text */
.text-caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-600);
}
\`\`\`

### Special Text Styles

Specialized text styles for specific use cases:

**Special Text Styles**
\`\`\`css
/* Code text */
.text-code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  background-color: var(--color-neutral-100);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

/* Quote text */
.text-quote {
  font-size: var(--font-size-lg);
  font-style: italic;
  line-height: var(--line-height-loose);
  border-left: 4px solid var(--color-primary-200);
  padding-left: 1rem;
  margin: 1.5rem 0;
}

/* Link text */
.text-link {
  color: var(--color-primary-600);
  text-decoration: underline;
  text-decoration-color: var(--color-primary-300);
  text-underline-offset: 2px;
}

.text-link:hover {
  color: var(--color-primary-700);
  text-decoration-color: var(--color-primary-400);
}
\`\`\`

### Responsive Typography

Typography scales appropriately across different screen sizes:

**Responsive Typography**
\`\`\`css
/* Responsive font sizes */
@media (min-width: 640px) {
  .text-responsive-sm {
    font-size: var(--font-size-sm);
  }
  
  .text-responsive-base {
    font-size: var(--font-size-base);
  }
  
  .text-responsive-lg {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 768px) {
  .text-responsive-sm {
    font-size: var(--font-size-base);
  }
  
  .text-responsive-base {
    font-size: var(--font-size-lg);
  }
  
  .text-responsive-lg {
    font-size: var(--font-size-xl);
  }
}

/* Fluid typography */
.text-fluid {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}
\`\`\`

### Accessibility Considerations

Typography accessibility features:

#### Minimum Sizes
- **Body text**: Minimum 16px (1rem) for optimal readability
- **Interactive text**: Minimum 16px to ensure adequate touch targets
- **Small text**: Only used for non-essential information

#### Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

#### Reading Support
- **Line length**: Optimal 45-75 characters per line
- **Line height**: Adequate spacing for easy reading
- **Paragraph spacing**: Clear separation between paragraphs

### Performance Optimization

Typography performance considerations:

#### Font Loading
- **Font Display**: Swap strategy for faster rendering
- **Preload**: Critical fonts loaded with highest priority
- **Font Subsetting**: Only include necessary character sets
- **Compression**: WOFF2 format for optimal compression

#### CSS Optimization
- **Critical CSS**: Above-the-fold typography styles
- **Lazy Loading**: Non-critical font weights loaded asynchronously
- **Font Metrics**: Consistent layout to prevent reflow
- **Text Rendering**: Optimized text rendering properties`
    },
    {
      id: "spacing-scale",
      title: "Spacing Scale",
      content: `The CareerForge spacing system provides a consistent, mathematical approach to spacing that ensures visual harmony and predictable layouts across all platform interfaces.

### Spacing Philosophy

Our spacing system is built on mathematical principles that create visual rhythm and consistency:

- **Geometric Progression**: Uses a consistent ratio for scalable spacing
- **Visual Harmony**: Spacing creates pleasing visual relationships
- **Predictable Patterns**: Consistent spacing makes layouts predictable
- **Accessibility**: Adequate spacing for all interaction targets
- **Performance**: Efficient spacing implementation with minimal CSS

### Base Spacing Unit

The foundation of our spacing system is a base unit that scales consistently:

**Base Unit**
\`\`\`css
/* Base spacing unit - 4px */
--space-unit: 0.25rem;  /* 4px */

/* Alternative base unit for fine control */
--space-unit-xs: 0.125rem;  /* 2px */
\`\`\`

### Spacing Scale

A geometric progression based on a 2x ratio provides comprehensive spacing options:

**Spacing Tokens**
\`\`\`css
/* Spacing Scale - Based on 4px base unit */
--space-0: 0;                    /* 0px - No spacing */
--space-px: var(--space-unit-xs); /* 2px - Pixel spacing */
--space-0-5: calc(var(--space-unit) * 0.5); /* 2px - Half unit */
--space-1: var(--space-unit);    /* 4px - 1 unit */
--space-1-5: calc(var(--space-unit) * 1.5); /* 6px - 1.5 units */
--space-2: calc(var(--space-unit) * 2); /* 8px - 2 units */
--space-3: calc(var(--space-unit) * 3); /* 12px - 3 units */
--space-4: calc(var(--space-unit) * 4); /* 16px - 4 units */
--space-5: calc(var(--space-unit) * 5); /* 20px - 5 units */
--space-6: calc(var(--space-unit) * 6); /* 24px - 6 units */
--space-8: calc(var(--space-unit) * 8); /* 32px - 8 units */
--space-10: calc(var(--space-unit) * 10); /* 40px - 10 units */
--space-12: calc(var(--space-unit) * 12); /* 48px - 12 units */
--space-16: calc(var(--space-unit) * 16); /* 64px - 16 units */
--space-20: calc(var(--space-unit) * 20); /* 80px - 20 units */
--space-24: calc(var(--space-unit) * 24); /* 96px - 24 units */
--space-28: calc(var(--space-unit) * 28); /* 112px - 28 units */
--space-32: calc(var(--space-unit) * 32); /* 128px - 32 units */
--space-36: calc(var(--space-unit) * 36); /* 144px - 36 units */
--space-40: calc(var(--space-unit) * 40); /* 160px - 40 units */
--space-44: calc(var(--space-unit) * 44); /* 176px - 44 units */
--space-48: calc(var(--space-unit) * 48); /* 192px - 48 units */
--space-52: calc(var(--space-unit) * 52); /* 208px - 52 units */
--space-56: calc(var(--space-unit) * 56); /* 224px - 56 units */
--space-60: calc(var(--space-unit) * 60); /* 240px - 60 units */
--space-64: calc(var(--space-unit) * 64); /* 256px - 64 units */
--space-72: calc(var(--space-unit) * 72); /* 288px - 72 units */
--space-80: calc(var(--space-unit) * 80); /* 320px - 80 units */
--space-96: calc(var(--space-unit) * 96); /* 384px - 96 units */
\`\`\`

### Semantic Spacing

Semantic spacing tokens map to common use cases:

**Semantic Spacing Tokens**
\`\`\`css
/* Component Internal Spacing */
--space-component-xs: var(--space-1);   /* 4px - Tight spacing */
--space-component-sm: var(--space-2);   /* 8px - Small spacing */
--space-component-md: var(--space-4);   /* 16px - Medium spacing */
--space-component-lg: var(--space-6);   /* 24px - Large spacing */
--space-component-xl: var(--space-8);   /* 32px - Extra large spacing */

/* Layout Spacing */
--space-layout-xs: var(--space-4);      /* 16px - Small layout spacing */
--space-layout-sm: var(--space-8);      /* 32px - Small-medium layout spacing */
--space-layout-md: var(--space-16);     /* 64px - Medium layout spacing */
--space-layout-lg: var(--space-24);     /* 96px - Large layout spacing */
--space-layout-xl: var(--space-32);     /* 128px - Extra large layout spacing */

/* Content Spacing */
--space-content-xs: var(--space-2);     /* 8px - Tight content spacing */
--space-content-sm: var(--space-4);     /* 16px - Small content spacing */
--space-content-md: var(--space-8);     /* 32px - Medium content spacing */
--space-content-lg: var(--space-12);    /* 48px - Large content spacing */
--space-content-xl: var(--space-16);    /* 64px - Extra large content spacing */
\`\`\`

### Spacing Utilities

Utility classes for common spacing patterns:

**Margin Utilities**
\`\`\`css
/* Margin All */
.m-0 { margin: var(--space-0); }
.m-px { margin: var(--space-px); }
.m-0-5 { margin: var(--space-0-5); }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-3 { margin: var(--space-3); }
.m-4 { margin: var(--space-4); }
.m-5 { margin: var(--space-5); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }
.m-10 { margin: var(--space-10); }
.m-12 { margin: var(--space-12); }
.m-16 { margin: var(--space-16); }
.m-20 { margin: var(--space-20); }
.m-24 { margin: var(--space-24); }

/* Margin Top */
.mt-0 { margin-top: var(--space-0); }
.mt-px { margin-top: var(--space-px); }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }
.mt-12 { margin-top: var(--space-12); }
.mt-16 { margin-top: var(--space-16); }
.mt-20 { margin-top: var(--space-20); }
.mt-24 { margin-top: var(--space-24); }

/* Margin Right */
.mr-0 { margin-right: var(--space-0); }
.mr-px { margin-right: var(--space-px); }
.mr-1 { margin-right: var(--space-1); }
.mr-2 { margin-right: var(--space-2); }
.mr-4 { margin-right: var(--space-4); }
.mr-6 { margin-right: var(--space-6); }
.mr-8 { margin-right: var(--space-8); }
.mr-12 { margin-right: var(--space-12); }
.mr-16 { margin-right: var(--space-16); }
.mr-20 { margin-right: var(--space-20); }
.mr-24 { margin-right: var(--space-24); }

/* Margin Bottom */
.mb-0 { margin-bottom: var(--space-0); }
.mb-px { margin-bottom: var(--space-px); }
.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mb-12 { margin-bottom: var(--space-12); }
.mb-16 { margin-bottom: var(--space-16); }
.mb-20 { margin-bottom: var(--space-20); }
.mb-24 { margin-bottom: var(--space-24); }

/* Margin Left */
.ml-0 { margin-left: var(--space-0); }
.ml-px { margin-left: var(--space-px); }
.ml-1 { margin-left: var(--space-1); }
.ml-2 { margin-left: var(--space-2); }
.ml-4 { margin-left: var(--space-4); }
.ml-6 { margin-left: var(--space-6); }
.ml-8 { margin-left: var(--space-8); }
.ml-12 { margin-left: var(--space-12); }
.ml-16 { margin-left: var(--space-16); }
.ml-20 { margin-left: var(--space-20); }
.ml-24 { margin-left: var(--space-24); }

/* Margin X (Left and Right) */
.mx-0 { margin-left: var(--space-0); margin-right: var(--space-0); }
.mx-px { margin-left: var(--space-px); margin-right: var(--space-px); }
.mx-1 { margin-left: var(--space-1); margin-right: var(--space-1); }
.mx-2 { margin-left: var(--space-2); margin-right: var(--space-2); }
.mx-4 { margin-left: var(--space-4); margin-right: var(--space-4); }
.mx-6 { margin-left: var(--space-6); margin-right: var(--space-6); }
.mx-8 { margin-left: var(--space-8); margin-right: var(--space-8); }
.mx-12 { margin-left: var(--space-12); margin-right: var(--space-12); }
.mx-16 { margin-left: var(--space-16); margin-right: var(--space-16); }
.mx-20 { margin-left: var(--space-20); margin-right: var(--space-20); }
.mx-24 { margin-left: var(--space-24); margin-right: var(--space-24); }

/* Margin Y (Top and Bottom) */
.my-0 { margin-top: var(--space-0); margin-bottom: var(--space-0); }
.my-px { margin-top: var(--space-px); margin-bottom: var(--space-px); }
.my-1 { margin-top: var(--space-1); margin-bottom: var(--space-1); }
.my-2 { margin-top: var(--space-2); margin-bottom: var(--space-2); }
.my-4 { margin-top: var(--space-4); margin-bottom: var(--space-4); }
.my-6 { margin-top: var(--space-6); margin-bottom: var(--space-6); }
.my-8 { margin-top: var(--space-8); margin-bottom: var(--space-8); }
.my-12 { margin-top: var(--space-12); margin-bottom: var(--space-12); }
.my-16 { margin-top: var(--space-16); margin-bottom: var(--space-16); }
.my-20 { margin-top: var(--space-20); margin-bottom: var(--space-20); }
.my-24 { margin-top: var(--space-24); margin-bottom: var(--space-24); }
\`\`\`

**Padding Utilities**
\`\`\`css
/* Padding All */
.p-0 { padding: var(--space-0); }
.p-px { padding: var(--space-px); }
.p-0-5 { padding: var(--space-0-5); }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-5 { padding: var(--space-5); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }
.p-10 { padding: var(--space-10); }
.p-12 { padding: var(--space-12); }
.p-16 { padding: var(--space-16); }
.p-20 { padding: var(--space-20); }
.p-24 { padding: var(--space-24); }

/* Padding Top */
.pt-0 { padding-top: var(--space-0); }
.pt-px { padding-top: var(--space-px); }
.pt-1 { padding-top: var(--space-1); }
.pt-2 { padding-top: var(--space-2); }
.pt-4 { padding-top: var(--space-4); }
.pt-6 { padding-top: var(--space-6); }
.pt-8 { padding-top: var(--space-8); }
.pt-12 { padding-top: var(--space-12); }
.pt-16 { padding-top: var(--space-16); }
.pt-20 { padding-top: var(--space-20); }
.pt-24 { padding-top: var(--space-24); }

/* Padding Right */
.pr-0 { padding-right: var(--space-0); }
.pr-px { padding-right: var(--space-px); }
.pr-1 { padding-right: var(--space-1); }
.pr-2 { padding-right: var(--space-2); }
.pr-4 { padding-right: var(--space-4); }
.pr-6 { padding-right: var(--space-6); }
.pr-8 { padding-right: var(--space-8); }
.pr-12 { padding-right: var(--space-12); }
.pr-16 { padding-right: var(--space-16); }
.pr-20 { padding-right: var(--space-20); }
.pr-24 { padding-right: var(--space-24); }

/* Padding Bottom */
.pb-0 { padding-bottom: var(--space-0); }
.pb-px { padding-bottom: var(--space-px); }
.pb-1 { padding-bottom: var(--space-1); }
.pb-2 { padding-bottom: var(--space-2); }
.pb-4 { padding-bottom: var(--space-4); }
.pb-6 { padding-bottom: var(--space-6); }
.pb-8 { padding-bottom: var(--space-8); }
.pb-12 { padding-bottom: var(--space-12); }
.pb-16 { padding-bottom: var(--space-16); }
.pb-20 { padding-bottom: var(--space-20); }
.pb-24 { padding-bottom: var(--space-24); }

/* Padding Left */
.pl-0 { padding-left: var(--space-0); }
.pl-px { padding-left: var(--space-px); }
.pl-1 { padding-left: var(--space-1); }
.pl-2 { padding-left: var(--space-2); }
.pl-4 { padding-left: var(--space-4); }
.pl-6 { padding-left: var(--space-6); }
.pl-8 { padding-left: var(--space-8); }
.pl-12 { padding-left: var(--space-12); }
.pl-16 { padding-left: var(--space-16); }
.pl-20 { padding-left: var(--space-20); }
.pl-24 { padding-left: var(--space-24); }

/* Padding X (Left and Right) */
.px-0 { padding-left: var(--space-0); padding-right: var(--space-0); }
.px-px { padding-left: var(--space-px); padding-right: var(--space-px); }
.px-1 { padding-left: var(--space-1); padding-right: var(--space-1); }
.px-2 { padding-left: var(--space-2); padding-right: var(--space-2); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
.px-8 { padding-left: var(--space-8); padding-right: var(--space-8); }
.px-12 { padding-left: var(--space-12); padding-right: var(--space-12); }
.px-16 { padding-left: var(--space-16); padding-right: var(--space-16); }
.px-20 { padding-left: var(--space-20); padding-right: var(--space-20); }
.px-24 { padding-left: var(--space-24); padding-right: var(--space-24); }

/* Padding Y (Top and Bottom) */
.py-0 { padding-top: var(--space-0); padding-bottom: var(--space-0); }
.py-px { padding-top: var(--space-px); padding-bottom: var(--space-px); }
.py-1 { padding-top: var(--space-1); padding-bottom: var(--space-1); }
.py-2 { padding-top: var(--space-2); padding-bottom: var(--space-2); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
.py-6 { padding-top: var(--space-6); padding-bottom: var(--space-6); }
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }
.py-12 { padding-top: var(--space-12); padding-bottom: var(--space-12); }
.py-16 { padding-top: var(--space-16); padding-bottom: var(--space-16); }
.py-20 { padding-top: var(--space-20); padding-bottom: var(--space-20); }
.py-24 { padding-top: var(--space-24); padding-bottom: var(--space-24); }
\`\`\`

### Component Spacing

Pre-defined spacing patterns for common component layouts:

**Component Spacing Patterns**
\`\`\`css
/* Button spacing */
.btn-spacing {
  padding: var(--space-component-sm) var(--space-component-md);
}

.btn-spacing-large {
  padding: var(--space-component-md) var(--space-component-lg);
}

/* Form spacing */
.form-field-spacing {
  margin-bottom: var(--space-component-md);
}

.form-group-spacing {
  margin-bottom: var(--space-component-lg);
}

/* Card spacing */
.card-padding {
  padding: var(--space-component-lg);
}

.card-spacing {
  margin-bottom: var(--space-content-md);
}

/* List spacing */
.list-spacing-tight > * + * {
  margin-top: var(--space-component-xs);
}

.list-spacing-normal > * + * {
  margin-top: var(--space-component-sm);
}

.list-spacing-relaxed > * + * {
  margin-top: var(--space-component-md);
}

/* Grid spacing */
.grid-spacing-xs {
  gap: var(--space-layout-xs);
}

.grid-spacing-sm {
  gap: var(--space-layout-sm);
}

.grid-spacing-md {
  gap: var(--space-layout-md);
}

.grid-spacing-lg {
  gap: var(--space-layout-lg);
}

.grid-spacing-xl {
  gap: var(--space-layout-xl);
}
\`\`\`

### Layout Spacing

Spacing patterns for different layout contexts:

**Layout Spacing Patterns**
\`\`\`css
/* Container spacing */
.container-spacing {
  padding-left: var(--space-layout-sm);
  padding-right: var(--space-layout-sm);
}

@media (min-width: 768px) {
  .container-spacing {
    padding-left: var(--space-layout-md);
    padding-right: var(--space-layout-md);
  }
}

@media (min-width: 1024px) {
  .container-spacing {
    padding-left: var(--space-layout-lg);
    padding-right: var(--space-layout-lg);
  }
}

/* Section spacing */
.section-spacing {
  padding-top: var(--space-layout-lg);
  padding-bottom: var(--space-layout-lg);
}

.section-spacing-large {
  padding-top: var(--space-layout-xl);
  padding-bottom: var(--space-layout-xl);
}

/* Content spacing */
.content-spacing {
  margin-bottom: var(--space-content-lg);
}

.content-spacing-large {
  margin-bottom: var(--space-content-xl);
}
\`\`\`

### Responsive Spacing

Spacing adjustments for different screen sizes:

**Responsive Spacing**
\`\`\`css
/* Responsive padding */
.p-responsive {
  padding: var(--space-4);
}

@media (min-width: 640px) {
  .p-responsive {
    padding: var(--space-6);
  }
}

@media (min-width: 768px) {
  .p-responsive {
    padding: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .p-responsive {
    padding: var(--space-12);
  }
}

/* Responsive margins */
.m-responsive {
  margin-bottom: var(--space-4);
}

@media (min-width: 640px) {
  .m-responsive {
    margin-bottom: var(--space-6);
  }
}

@media (min-width: 768px) {
  .m-responsive {
    margin-bottom: var(--space-8);
  }
}
\`\`\`

### Accessibility Spacing

Spacing considerations for accessibility:

**Minimum Touch Targets**
\`\`\`css
/* Minimum touch target size */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Focus indicators */
.focus-spacing {
  padding: var(--space-component-xs);
  margin: -2px; /* Compensate for padding in focus ring */
}

.focus-ring {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
\`\`\`

### Spacing Best Practices

#### Use Semantic Tokens
Always use semantic spacing tokens rather than hard-coded values:

\`\`\`css
/* Good - Using semantic tokens */
.card {
  padding: var(--space-component-lg);
  margin-bottom: var(--space-content-md);
}

/* Avoid - Hard-coded values */
.card {
  padding: 24px;
  margin-bottom: 32px;
}
\`\`\`

#### Consistent Patterns
Use consistent spacing patterns across similar components:

\`\`\`css
/* Form components */
.form-field {
  margin-bottom: var(--space-component-md);
}

.form-section {
  margin-bottom: var(--space-component-lg);
}

.form-group {
  margin-bottom: var(--space-content-lg);
}
\`\`\`

#### Responsive Considerations
Plan spacing for different screen sizes:

\`\`\`css
/* Mobile-first approach */
.component {
  padding: var(--space-component-sm);
  margin-bottom: var(--space-content-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--space-component-md);
    margin-bottom: var(--space-content-md);
  }
}
\`\`\``
    },
    {
      id: "border-radius",
      title: "Border Radius",
      content: `The CareerForge border radius system provides consistent, purposeful corner rounding that enhances the visual appeal and usability of interface elements while maintaining design coherence.

### Border Radius Philosophy

Our border radius system is designed with several key principles:

- **Progressive Scale**: A logical progression from subtle to dramatic rounding
- **Component Appropriateness**: Different radii for different component types
- **Visual Hierarchy**: Larger radii for emphasis, smaller for subtlety
- **Consistency**: Unified approach across all interface elements
- **Accessibility**: Ensuring touch targets remain adequately sized

### Base Border Radius Scale

The foundation of our border radius system is a carefully crafted scale:

**Base Border Radius Tokens**
\`\`\`css
/* Base border radius scale */
--radius-none: 0;                 /* 0px - Sharp corners */
--radius-sm: 0.125rem;            /* 2px - Subtle rounding */
--radius-base: 0.25rem;           /* 4px - Default rounding */
--radius-md: 0.375rem;            /* 6px - Medium rounding */
--radius-lg: 0.5rem;              /* 8px - Large rounding */
--radius-xl: 0.75rem;             /* 12px - Extra large rounding */
--radius-2xl: 1rem;               /* 16px - Very large rounding */
--radius-3xl: 1.5rem;             /* 24px - Maximum rounding */
--radius-full: 9999px;            /* Fully rounded */
\`\`\`

### Semantic Border Radius

Semantic tokens map border radius to specific use cases:

**Semantic Border Radius Tokens**
\`\`\`css
/* Component-specific border radius */
--radius-component-xs: var(--radius-sm);     /* 2px - Small components */
--radius-component-sm: var(--radius-base);   /* 4px - Default components */
--radius-component-md: var(--radius-md);     /* 6px - Medium components */
--radius-component-lg: var(--radius-lg);     /* 8px - Large components */
--radius-component-xl: var(--radius-xl);     /* 12px - Extra large components */

/* Layout border radius */
--radius-layout-sm: var(--radius-md);        /* 6px - Small layout elements */
--radius-layout-md: var(--radius-lg);        /* 8px - Medium layout elements */
--radius-layout-lg: var(--radius-xl);        /* 12px - Large layout elements */
--radius-layout-xl: var(--radius-2xl);       /* 16px - Extra large layout elements */

/* Interactive element border radius */
--radius-interactive-sm: var(--radius-sm);   /* 2px - Small interactive */
--radius-interactive-md: var(--radius-base); /* 4px - Default interactive */
--radius-interactive-lg: var(--radius-md);   /* 6px - Large interactive */

/* Overlay border radius */
--radius-overlay-sm: var(--radius-md);       /* 6px - Small overlays */
--radius-overlay-md: var(--radius-lg);       /* 8px - Medium overlays */
--radius-overlay-lg: var(--radius-xl);       /* 12px - Large overlays */
\`\`\`

### Component-Specific Border Radius

Different component types use appropriate border radius values:

**Button Border Radius**
\`\`\`css
/* Button border radius variants */
.btn-radius-sm {
  border-radius: var(--radius-component-xs);
}

.btn-radius-md {
  border-radius: var(--radius-component-sm);
}

.btn-radius-lg {
  border-radius: var(--radius-component-md);
}

.btn-radius-pill {
  border-radius: var(--radius-full);
}
\`\`\`

**Card Border Radius**
\`\`\`css
/* Card border radius */
.card-radius-sm {
  border-radius: var(--radius-layout-sm);
}

.card-radius-md {
  border-radius: var(--radius-layout-md);
}

.card-radius-lg {
  border-radius: var(--radius-layout-lg);
}

.card-radius-xl {
  border-radius: var(--radius-layout-xl);
}
\`\`\`

**Input Border Radius**
\`\`\`css
/* Input border radius */
.input-radius-sm {
  border-radius: var(--radius-component-xs);
}

.input-radius-md {
  border-radius: var(--radius-component-sm);
}

.input-radius-lg {
  border-radius: var(--radius-component-md);
}
\`\`\`

### Border Radius Utilities

Utility classes for applying border radius:

**Standard Border Radius Classes**
\`\`\`css
/* All corners */
.rounded-none { border-radius: var(--radius-none); }
.rounded-sm { border-radius: var(--radius-sm); }
.rounded { border-radius: var(--radius-base); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-2xl { border-radius: var(--radius-2xl); }
.rounded-3xl { border-radius: var(--radius-3xl); }
.rounded-full { border-radius: var(--radius-full); }

/* Top corners */
.rounded-t-none { border-top-left-radius: var(--radius-none); border-top-right-radius: var(--radius-none); }
.rounded-t-sm { border-top-left-radius: var(--radius-sm); border-top-right-radius: var(--radius-sm); }
.rounded-t { border-top-left-radius: var(--radius-base); border-top-right-radius: var(--radius-base); }
.rounded-t-md { border-top-left-radius: var(--radius-md); border-top-right-radius: var(--radius-md); }
.rounded-t-lg { border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg); }
.rounded-t-xl { border-top-left-radius: var(--radius-xl); border-top-right-radius: var(--radius-xl); }
.rounded-t-2xl { border-top-left-radius: var(--radius-2xl); border-top-right-radius: var(--radius-2xl); }
.rounded-t-3xl { border-top-left-radius: var(--radius-3xl); border-top-right-radius: var(--radius-3xl); }
.rounded-t-full { border-top-left-radius: var(--radius-full); border-top-right-radius: var(--radius-full); }

/* Right corners */
.rounded-r-none { border-top-right-radius: var(--radius-none); border-bottom-right-radius: var(--radius-none); }
.rounded-r-sm { border-top-right-radius: var(--radius-sm); border-bottom-right-radius: var(--radius-sm); }
.rounded-r { border-top-right-radius: var(--radius-base); border-bottom-right-radius: var(--radius-base); }
.rounded-r-md { border-top-right-radius: var(--radius-md); border-bottom-right-radius: var(--radius-md); }
.rounded-r-lg { border-top-right-radius: var(--radius-lg); border-bottom-right-radius: var(--radius-lg); }
.rounded-r-xl { border-top-right-radius: var(--radius-xl); border-bottom-right-radius: var(--radius-xl); }
.rounded-r-2xl { border-top-right-radius: var(--radius-2xl); border-bottom-right-radius: var(--radius-2xl); }
.rounded-r-3xl { border-top-right-radius: var(--radius-3xl); border-bottom-right-radius: var(--radius-3xl); }
.rounded-r-full { border-top-right-radius: var(--radius-full); border-bottom-right-radius: var(--radius-full); }

/* Bottom corners */
.rounded-b-none { border-bottom-left-radius: var(--radius-none); border-bottom-right-radius: var(--radius-none); }
.rounded-b-sm { border-bottom-left-radius: var(--radius-sm); border-bottom-right-radius: var(--radius-sm); }
.rounded-b { border-bottom-left-radius: var(--radius-base); border-bottom-right-radius: var(--radius-base); }
.rounded-b-md { border-bottom-left-radius: var(--radius-md); border-bottom-right-radius: var(--radius-md); }
.rounded-b-lg { border-bottom-left-radius: var(--radius-lg); border-bottom-right-radius: var(--radius-lg); }
.rounded-b-xl { border-bottom-left-radius: var(--radius-xl); border-bottom-right-radius: var(--radius-xl); }
.rounded-b-2xl { border-bottom-left-radius: var(--radius-2xl); border-bottom-right-radius: var(--radius-2xl); }
.rounded-b-3xl { border-bottom-left-radius: var(--radius-3xl); border-bottom-right-radius: var(--radius-3xl); }
.rounded-b-full { border-bottom-left-radius: var(--radius-full); border-bottom-right-radius: var(--radius-full); }

/* Left corners */
.rounded-l-none { border-top-left-radius: var(--radius-none); border-bottom-left-radius: var(--radius-none); }
.rounded-l-sm { border-top-left-radius: var(--radius-sm); border-bottom-left-radius: var(--radius-sm); }
.rounded-l { border-top-left-radius: var(--radius-base); border-bottom-left-radius: var(--radius-base); }
.rounded-l-md { border-top-left-radius: var(--radius-md); border-bottom-left-radius: var(--radius-md); }
.rounded-l-lg { border-top-left-radius: var(--radius-lg); border-bottom-left-radius: var(--radius-lg); }
.rounded-l-xl { border-top-left-radius: var(--radius-xl); border-bottom-left-radius: var(--radius-xl); }
.rounded-l-2xl { border-top-left-radius: var(--radius-2xl); border-bottom-left-radius: var(--radius-2xl); }
.rounded-l-3xl { border-top-left-radius: var(--radius-3xl); border-bottom-left-radius: var(--radius-3xl); }
.rounded-l-full { border-top-left-radius: var(--radius-full); border-bottom-left-radius: var(--radius-full); }

/* Top-left and bottom-right */
.rounded-bl-none { border-bottom-left-radius: var(--radius-none); }
.rounded-bl-sm { border-bottom-left-radius: var(--radius-sm); }
.rounded-bl { border-bottom-left-radius: var(--radius-base); }
.rounded-bl-md { border-bottom-left-radius: var(--radius-md); }
.rounded-bl-lg { border-bottom-left-radius: var(--radius-lg); }
.rounded-bl-xl { border-bottom-left-radius: var(--radius-xl); }
.rounded-bl-2xl { border-bottom-left-radius: var(--radius-2xl); }
.rounded-bl-3xl { border-bottom-left-radius: var(--radius-3xl); }
.rounded-bl-full { border-bottom-left-radius: var(--radius-full); }

.rounded-br-none { border-bottom-right-radius: var(--radius-none); }
.rounded-br-sm { border-bottom-right-radius: var(--radius-sm); }
.rounded-br { border-bottom-right-radius: var(--radius-base); }
.rounded-br-md { border-bottom-right-radius: var(--radius-md); }
.rounded-br-lg { border-bottom-right-radius: var(--radius-lg); }
.rounded-br-xl { border-bottom-right-radius: var(--radius-xl); }
.rounded-br-2xl { border-bottom-right-radius: var(--radius-2xl); }
.rounded-br-3xl { border-bottom-right-radius: var(--radius-3xl); }
.rounded-br-full { border-bottom-right-radius: var(--radius-full); }

/* Top-right and bottom-left */
.rounded-tr-none { border-top-right-radius: var(--radius-none); }
.rounded-tr-sm { border-top-right-radius: var(--radius-sm); }
.rounded-tr { border-top-right-radius: var(--radius-base); }
.rounded-tr-md { border-top-right-radius: var(--radius-md); }
.rounded-tr-lg { border-top-right-radius: var(--radius-lg); }
.rounded-tr-xl { border-top-right-radius: var(--radius-xl); }
.rounded-tr-2xl { border-top-right-radius: var(--radius-2xl); }
.rounded-tr-3xl { border-top-right-radius: var(--radius-3xl); }
.rounded-tr-full { border-top-right-radius: var(--radius-full); }

.rounded-tl-none { border-top-left-radius: var(--radius-none); }
.rounded-tl-sm { border-top-left-radius: var(--radius-sm); }
.rounded-tl { border-top-left-radius: var(--radius-base); }
.rounded-tl-md { border-top-left-radius: var(--radius-md); }
.rounded-tl-lg { border-top-left-radius: var(--radius-lg); }
.rounded-tl-xl { border-top-left-radius: var(--radius-xl); }
.rounded-tl-2xl { border-top-left-radius: var(--radius-2xl); }
.rounded-tl-3xl { border-top-left-radius: var(--radius-3xl); }
.rounded-tl-full { border-top-left-radius: var(--radius-full); }
\`\`\`

### Component Implementation Examples

**Button Examples**
\`\`\`css
/* Primary button */
.btn-primary {
  border-radius: var(--radius-component-sm);
  padding: var(--space-2) var(--space-4);
}

/* Secondary button */
.btn-secondary {
  border-radius: var(--radius-component-sm);
  padding: var(--space-2) var(--space-4);
}

/* Icon button */
.btn-icon {
  border-radius: var(--radius-component-xs);
  width: 40px;
  height: 40px;
}

/* Pill button */
.btn-pill {
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-6);
}
\`\`\`

**Card Examples**
\`\`\`css
/* Standard card */
.card {
  border-radius: var(--radius-layout-md);
  padding: var(--space-6);
  border: 1px solid var(--color-neutral-200);
}

/* Compact card */
.card-compact {
  border-radius: var(--radius-layout-sm);
  padding: var(--space-4);
}

/* Feature card */
.card-feature {
  border-radius: var(--radius-layout-lg);
  padding: var(--space-8);
  border: 1px solid var(--color-neutral-200);
}

/* Overlay card */
.card-overlay {
  border-radius: var(--radius-overlay-md);
  padding: var(--space-6);
  background: var(--color-background);
  box-shadow: var(--shadow-lg);
}
\`\`\`

**Input Examples**
\`\`\`css
/* Text input */
.input {
  border-radius: var(--radius-component-xs);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-neutral-300);
}

/* Search input */
.input-search {
  border-radius: var(--radius-component-sm);
  padding: var(--space-3) var(--space-4);
}

/* Large input {
  border-radius: var(--radius */
.input-lg-component-sm);
  padding: var(--space-4) var(--space-6);
}
\`\`\`

### Responsive Border Radius

Border radius adjustments for different screen sizes:

**Responsive Border Radius**
\`\`\`css
/* Mobile-first approach */
.component {
  border-radius: var(--radius-component-sm);
}

@media (min-width: 768px) {
  .component {
    border-radius: var(--radius-component-md);
  }
}

@media (min-width: 1024px) {
  .component {
    border-radius: var(--radius-component-lg);
  }
}

/* Fluid border radius */
.component-fluid {
  border-radius: clamp(0.25rem, 1vw, 0.5rem);
}
\`\`\`

### State Variations

Border radius changes for different component states:

**State Variations**
\`\`\`css
/* Default state */
.button {
  border-radius: var(--radius-component-sm);
  transition: border-radius 0.2s ease;
}

/* Hover state */
.button:hover {
  border-radius: var(--radius-component-md);
}

/* Active state */
.button:active {
  border-radius: var(--radius-component-xs);
  transform: scale(0.98);
}

/* Focus state */
.button:focus {
  border-radius: var(--radius-component-sm);
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
\`\`\`

### Accessibility Considerations

Border radius choices that consider accessibility:

**Accessibility Guidelines**
\`\`\`css
/* Maintain touch targets */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-interactive-sm);
}

/* Focus indicators */
.focus-visible {
  border-radius: var(--radius-interactive-sm);
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .button {
    border-radius: var(--radius-none);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
  }
}
\`\`\`

### Best Practices

#### Consistent Application
Use consistent border radius patterns across similar components:

\`\`\`css
/* Consistent card styling */
.card {
  border-radius: var(--radius-layout-md);
  background: var(--color-background);
  border: 1px solid var(--color-neutral-200);
}

.card-header {
  border-radius: var(--radius-layout-md) var(--radius-layout-md) 0 0;
}

.card-footer {
  border-radius: 0 0 var(--radius-layout-md) var(--radius-layout-md);
}
\`\`\`

#### Progressive Enhancement
Apply border radius progressively:

\`\`\`css
/* Base style without border radius */
.component {
  background: var(--color-background);
  border: 1px solid var(--color-neutral-200);
}

/* Enhanced style with border radius */
@supports (border-radius: 4px) {
  .component {
    border-radius: var(--radius-component-md);
  }
}
\`\`\`

#### Component Hierarchy
Use larger radius for higher-level components:

\`\`\`css
/* Page-level components */
.page {
  border-radius: var(--radius-layout-lg);
}

/* Section-level components */
.section {
  border-radius: var(--radius-layout-md);
}

/* Component-level elements */
.component {
  border-radius: var(--radius-component-md);
}

/* Element-level details */
.element {
  border-radius: var(--radius-component-sm);
}
\`\`\``
    }
  ],
  bestPractices: [
    "Use semantic design tokens rather than hard-coded values for consistency",
    "Maintain adequate contrast ratios for all color combinations (WCAG AA compliance)",
    "Follow the geometric progression for spacing to create visual harmony",
    "Use appropriate border radius values for different component types and hierarchies",
    "Implement responsive design with mobile-first approach using appropriate breakpoints",
    "Ensure all interactive elements meet minimum touch target sizes (44px minimum)",
    "Test color accessibility with automated tools and manual verification",
    "Use CSS custom properties for dynamic theming and runtime customization",
    "Optimize font loading with font-display: swap and preload strategies",
    "Document design decisions and rationale for future reference and consistency"
  ],
  troubleshooting: [
    {
      title: "Common Design System Issues",
      problems: [
        {
          issue: "Colors not appearing correctly or inconsistent across components",
          solution: "Verify design tokens are properly imported and CSS custom properties are defined. Check for CSS specificity conflicts and ensure proper cascade order.",
          severity: "high"
        },
        {
          issue: "Typography inconsistent or fonts not loading properly",
          solution: "Check font-face declarations, ensure font files are accessible, and verify font-display properties. Test with network throttling to simulate slower connections.",
          severity: "medium"
        },
        {
          issue: "Spacing inconsistencies between components",
          solution: "Use semantic spacing tokens instead of hard-coded values. Ensure consistent use of margin/padding utilities and check for CSS overrides.",
          severity: "medium"
        },
        {
          issue: "Border radius not applying correctly or appearing different across browsers",
          solution: "Verify border-radius tokens are properly defined, check for CSS support with @supports queries, and ensure consistent vendor prefix usage if needed.",
          severity: "low"
        },
        {
          issue: "Dark theme colors not switching properly or accessibility issues",
          solution: "Check theme switching implementation, verify CSS custom property updates, test contrast ratios in dark mode, and ensure proper fallback colors.",
          severity: "high"
        }
      ]
    }
  ]
};
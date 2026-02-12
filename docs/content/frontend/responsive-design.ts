import { PageContent } from '@/lib/content-types';

export const responsiveDesignContent: PageContent = {
  metadata: {
    title: "Responsive Design",
    description: "Comprehensive guide to responsive design implementation, breakpoint system, and mobile-first development practices",
    version: "1.0.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Team"],
    tags: ["frontend", "responsive", "mobile", "breakpoints", "css"],
    difficulty: "intermediate" as const,
    estimatedTime: 18
  },
  tableOfContents: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "breakpoint-system", title: "Breakpoint System", level: 2 },
    { id: "mobile-first", title: "Mobile-First Approach", level: 2 },
    { id: "flexible-layouts", title: "Flexible Layouts", level: 2 },
    { id: "responsive-typography", title: "Responsive Typography", level: 2 },
    { id: "responsive-images", title: "Responsive Images", level: 2 },
    { id: "component-adaptation", title: "Component Adaptation", level: 2 },
    { id: "touch-interactions", title: "Touch Interactions", level: 2 },
    { id: "performance", title: "Performance Optimization", level: 2 },
    { id: "testing-strategies", title: "Testing Strategies", level: 2 },
    { id: "best-practices", title: "Best Practices", level: 2 }
  ],
  introduction: {
    id: "introduction",
    title: "Responsive Design",
    content: `The CareerForge responsive design system ensures optimal user experiences across all devices and screen sizes. Built on mobile-first principles with a comprehensive breakpoint system, it provides consistent functionality and visual appeal from small mobile phones to large desktop displays.

## Responsive Design Philosophy

Our responsive design approach is built on several core principles:

- **Mobile-First Development**: Start with mobile design and progressively enhance for larger screens
- **Content Prioritization**: Most important content is accessible on all devices
- **Progressive Enhancement**: Advanced features added for capable devices
- **Performance Focused**: Optimized loading and interaction across all devices
- **Touch-Friendly**: Appropriate touch targets and interactions for mobile devices
- **Accessibility Maintained**: Responsive design doesn't compromise accessibility

## Implementation Strategy

The responsive design system uses a multi-layered approach:

1. **Flexible Grid System**: CSS Grid and Flexbox for layout flexibility
2. **Responsive Typography**: Fluid typography that scales appropriately
3. **Adaptive Components**: Components that change behavior based on screen size
4. **Performance Optimization**: Device-specific optimizations for faster loading
5. **Touch Optimization**: Enhanced touch interactions for mobile devices
6. **Progressive Enhancement**: Advanced features for capable devices

## Browser and Device Support

The system supports a wide range of devices and browsers:

- **Mobile Devices**: iPhone, Android phones, tablets (320px - 1024px)
- **Desktop Computers**: Standard and high-resolution displays (1024px+)
- **Browser Support**: Modern browsers with graceful degradation
- **Performance Tiers**: Optimized for various device capabilities
- **Accessibility**: Screen readers and assistive technologies supported

## Technical Foundation

The responsive design implementation leverages modern web technologies:

- **CSS Custom Properties**: Dynamic responsive values
- **CSS Grid and Flexbox**: Flexible layout systems
- **Media Queries**: Conditional styling based on screen characteristics
- **Container Queries**: Component-based responsive design
- **Viewport Units**: Relative sizing based on viewport dimensions
- **Progressive Enhancement**: Feature detection and graceful degradation`
  },
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: `Responsive design is essential for providing optimal user experiences across the diverse landscape of devices and screen sizes that users access CareerForge from. Our implementation ensures that every user can effectively search for jobs, manage applications, and connect with potential employers regardless of their device.

### Why Responsive Design Matters

#### User Behavior Patterns
- **Multi-device Usage**: Users frequently switch between devices throughout their job search journey
- **Mobile-First Job Searching**: Many users primarily search for jobs on mobile devices
- **Context-Specific Usage**: Different devices for different job search activities
- **Time-Sensitive Applications**: Users need to apply for jobs quickly on any device

#### Business Impact
- **Increased Accessibility**: Wider audience reach across all device types
- **Better User Engagement**: Improved experience leads to higher platform usage
- **Competitive Advantage**: Superior mobile experience compared to competitors
- **SEO Benefits**: Search engines favor mobile-friendly websites
- **Reduced Development Costs**: Single codebase for all devices

### CareerForge Responsive Strategy

#### Content-First Approach
Our responsive design prioritizes content accessibility and usability:

- **Critical Content Priority**: Essential job search features work on all devices
- **Progressive Information Disclosure**: Information revealed based on available space
- **Contextual Adaptations**: Content organization adapts to usage context
- **Search Optimization**: Job search remains primary focus across all devices

#### Performance Considerations
- **Device-Specific Optimizations**: Different strategies for different device capabilities
- **Progressive Loading**: Critical content loads first, enhanced features follow
- **Network-Aware Features**: Adapt functionality based on connection speed
- **Battery Conscious**: Efficient animations and interactions to preserve battery life

### Responsive Design Goals

#### Functional Goals
- **Complete Feature Parity**: All features accessible on all devices
- **Optimal Performance**: Fast loading and smooth interactions on all devices
- **Intuitive Navigation**: Easy navigation regardless of screen size
- **Efficient Interactions**: Quick task completion on all devices

#### Experience Goals
- **Consistent Brand Experience**: Unified look and feel across devices
- **Device-Appropriate Interactions**: Natural interactions for each device type
- **Accessibility Maintained**: Full accessibility support across all breakpoints
- **Error Prevention**: Clear feedback and guidance on all devices

### Implementation Philosophy

#### Mobile-First Methodology
\`\`\`css
/* Mobile-first approach - Base styles for mobile */
.component {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

/* Progressive enhancement for larger screens */
@media (min-width: 768px) {
  .component {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .component {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
\`\`\`

#### Component-Based Responsiveness
\`\`\`typescript
// Responsive component behavior
interface ResponsiveProps {
  layout: 'stack' | 'grid' | 'sidebar';
  spacing: 'compact' | 'comfortable' | 'spacious';
  density: 'dense' | 'normal' | 'relaxed';
}

const useResponsiveProps = (): ResponsiveProps => {
  const breakpoint = useBreakpoint();
  
  return {
    layout: breakpoint === 'mobile' ? 'stack' : 'sidebar',
    spacing: breakpoint === 'mobile' ? 'compact' : 'comfortable',
    density: breakpoint === 'mobile' ? 'dense' : 'normal',
  };
};
\`\`\``
    },
    {
      id: "breakpoint-system",
      title: "Breakpoint System",
      content: `The CareerForge breakpoint system provides a structured approach to responsive design, ensuring consistent behavior across different screen sizes and device types.

### Breakpoint Philosophy

Our breakpoint system is designed to:

- **Cover Real Devices**: Breakpoints based on actual device widths, not arbitrary values
- **Enable Progressive Enhancement**: Each breakpoint adds meaningful improvements
- **Maintain Content Flow**: Smooth transitions between different screen sizes
- **Support Component Adaptation**: Components can adapt behavior at logical breakpoints
- **Minimize Complexity**: Clear, predictable breakpoint structure

### Breakpoint Definition

**Primary Breakpoints**
\`\`\`css
/* CSS Custom Properties for Breakpoints */
:root {
  /* Mobile devices */
  --breakpoint-sm: 640px;    /* Small tablets and large phones */
  --breakpoint-md: 768px;    /* Tablets */
  --breakpoint-lg: 1024px;   /* Small desktops */
  --breakpoint-xl: 1280px;   /* Standard desktops */
  --breakpoint-2xl: 1536px;  /* Large desktops */
}

/* Media Query Aliases */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
\`\`\`

**Breakpoint Categories**
\`\`\`css
/* Device Category Breakpoints */
:root {
  /* Mobile */
  --mobile-max: 639px;
  
  /* Tablet */
  --tablet-min: 640px;
  --tablet-max: 1023px;
  
  /* Desktop */
  --desktop-min: 1024px;
}
\`\`\`

### Responsive Hook System

**Breakpoint Detection Hook**
\`\`\`typescript
// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= 1536) {
        setBreakpoint('wide');
      } else if (width >= 1024) {
        setBreakpoint('desktop');
      } else if (width >= 640) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

/* Usage */
const MyComponent = () => {
  const breakpoint = useBreakpoint();
  
  return (
    <div className={\`layout layout-\${breakpoint}\`}>
      {/* Component content */}
    </div>
  );
};
\`\`\`

**Media Query Hook**
\`\`\`typescript
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

/* Usage */
const ResponsiveComponent = () => {
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
  
  return (
    <div>
      {isTabletOrLarger ? (
        <DesktopLayout />
      ) : (
        <MobileLayout />
      )}
    </div>
  );
};
\`\`\`

### Breakpoint-Specific Utilities

**CSS Utility Classes**
\`\`\`css
/* Display utilities */
.hidden { display: none; }
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }

/* Mobile-first responsive utilities */
@media (min-width: 640px) {
  .sm\\:hidden { display: none; }
  .sm\\:block { display: block; }
  .sm\\:flex { display: flex; }
  .sm\\:grid { display: grid; }
}

@media (min-width: 768px) {
  .md\\:hidden { display: none; }
  .md\\:block { display: block; }
  .md\\:flex { display: flex; }
  .md\\:grid { display: grid; }
}

@media (min-width: 1024px) {
  .lg\\:hidden { display: none; }
  .lg\\:block { display: block; }
  .lg\\:flex { display: flex; }
  .lg\\:grid { display: grid; }
}

/* Spacing utilities */
.p-4 { padding: 1rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }

@media (min-width: 640px) {
  .sm\\:p-6 { padding: 1.5rem; }
  .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .sm\\:py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
}

@media (min-width: 768px) {
  .md\\:p-8 { padding: 2rem; }
  .md\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
  .md\\:py-8 { padding-top: 2rem; padding-bottom: 2rem; }
}

/* Grid utilities */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

@media (min-width: 640px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 768px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}
\`\`\`

### Container Queries

**Component-Based Responsive Design**
\`\`\`css
/* Container queries for component-level responsiveness */
@container (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container (min-width: 500px) {
  .card {
    grid-template-columns: 1fr 3fr;
    gap: 1.5rem;
  }
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
  .card {
    display: block;
  }
  
  @media (min-width: 768px) {
    .card {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
    }
  }
}
\`\`\`

### Breakpoint-Specific Components

**Responsive Navigation**
\`\`\`typescript
// components/ResponsiveNavigation.tsx
import { useBreakpoint } from '@/hooks/useBreakpoint';

const ResponsiveNavigation = () => {
  const breakpoint = useBreakpoint();
  
  if (breakpoint === 'mobile') {
    return <MobileNavigation />;
  }
  
  return <DesktopNavigation />;
};

const MobileNavigation = () => (
  <nav className="mobile-nav">
    <button className="menu-toggle">
      <MenuIcon />
    </button>
    <div className="mobile-menu">
      {/* Mobile menu items */}
    </div>
  </nav>
);

const DesktopNavigation = () => (
  <nav className="desktop-nav">
    <div className="nav-items">
      {/* Desktop navigation items */}
    </div>
  </nav>
);
\`\`\`

### Viewport-Based Units

**Dynamic Sizing with Viewport Units**
\`\`\`css
/* Viewport-based sizing */
.hero {
  min-height: 100vh; /* Full viewport height */
  padding: 5vh 5vw;  /* 5% of viewport height and width */
}

.heading {
  font-size: clamp(1.5rem, 4vw, 3rem); /* Fluid typography */
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2vw; /* Responsive gap */
}

/* Container-based units */
.component {
  padding: 10cqw 10cqh; /* 10% of container width/height */
  width: 80cqw; /* 80% of container width */
}
\`\`\`

### Responsive Testing

**Breakpoint Testing Strategy**
\`\`\`typescript
// utils/responsive-testing.ts
export const breakpoints = {
  mobile: { min: 0, max: 639 },
  tablet: { min: 640, max: 1023 },
  desktop: { min: 1024, max: 1535 },
  wide: { min: 1536, max: Infinity },
};

export const testBreakpoint = (width: number): string => {
  for (const [name, range] of Object.entries(breakpoints)) {
    if (width >= range.min && width <= range.max) {
      return name;
    }
  }
  return 'unknown';
};

/* Cypress responsive testing */
describe('Responsive Design', () => {
  const viewports = [
    { width: 375, height: 667 },  // iPhone
    { width: 768, height: 1024 }, // iPad
    { width: 1024, height: 768 }, // Desktop
    { width: 1440, height: 900 }, // Large desktop
  ];

  viewports.forEach(({ width, height }) => {
    it(\`should work correctly at \${width}x\${height}\`, () => {
      cy.viewport(width, height);
      cy.visit('/');
      cy.get('[data-testid="main-navigation"]').should('be.visible');
    });
  });
});
\`\`\``
    },
    {
      id: "mobile-first",
      title: "Mobile-First Approach",
      content: `The CareerForge platform follows a mobile-first development approach, ensuring that the mobile experience is not just a smaller version of the desktop experience, but a thoughtfully designed interface optimized for mobile contexts and interactions.

### Mobile-First Philosophy

#### Why Mobile-First?
- **User Behavior**: Most job searches begin on mobile devices
- **Content Priority**: Essential features must work perfectly on small screens
- **Progressive Enhancement**: Add complexity for larger screens rather than removing from mobile
- **Performance**: Mobile constraints force better performance optimization
- **Future-Proof**: New devices and screen sizes continue to emerge

#### Mobile Context Considerations
- **Touch Interactions**: All interactions designed for touch input
- **Thumb Navigation**: Important actions within thumb reach zones
- **Portrait Orientation**: Primary orientation for mobile usage
- **Limited Attention**: Quick, focused interactions for busy users
- **Network Constraints**: Optimized for varying connection speeds

### Mobile-First CSS Architecture

**Base Mobile Styles**
\`\`\`css
/* Mobile-first base styles */
.container {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card {
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
}

.button {
  width: 100%;
  height: 44px; /* Minimum touch target */
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
\`\`\`

**Progressive Enhancement**
\`\`\`css
/* Tablet and up */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .navigation {
    flex-direction: row;
    gap: 2rem;
  }
  
  .card {
    width: calc(50% - 0.5rem);
    display: inline-block;
    vertical-align: top;
    margin-bottom: 2rem;
  }
  
  .card:nth-child(even) {
    margin-left: 1rem;
  }
  
  .button {
    width: auto;
    height: auto;
    padding: 0.75rem 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1400px;
  }
  
  .card {
    width: calc(33.333% - 0.667rem);
  }
  
  .card:nth-child(3n) {
    margin-left: 1rem;
  }
  
  .card:nth-child(3n + 1) {
    margin-left: 0;
  }
}
\`\`\`

### Mobile-Optimized Components

**Responsive Card Component**
\`\`\`typescript
// components/JobCard.tsx
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface JobCardProps {
  job: Job;
  layout?: 'list' | 'grid' | 'compact';
}

const JobCard: React.FC<JobCardProps> = ({ job, layout }) => {
  const breakpoint = useBreakpoint();
  
  // Determine layout based on breakpoint
  const effectiveLayout = layout || (breakpoint === 'mobile' ? 'compact' : 'list');
  
  return (
    <article className={\`job-card job-card--\${effectiveLayout}\`}>
      <div className="job-card__header">
        <h3 className="job-card__title">{job.title}</h3>
        <span className="job-card__company">{job.company}</span>
      </div>
      
      <div className="job-card__content">
        <p className="job-card__location">{job.location}</p>
        <p className="job-card__salary">{job.salary}</p>
      </div>
      
      <div className="job-card__actions">
        <button className="btn btn--primary btn--full">
          Apply Now
        </button>
        <button className="btn btn--secondary btn--icon">
          <HeartIcon />
        </button>
      </div>
    </article>
  );
};
\`\`\`

**Mobile-First Grid System**
\`\`\`css
/* Mobile-first grid utilities */
.grid {
  display: grid;
  gap: 1rem;
}

.grid--1 { grid-template-columns: 1fr; }
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }

/* Auto-fit grid for flexible layouts */
.grid--auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Progressive enhancement */
@media (min-width: 640px) {
  .sm\\:grid--2 { grid-template-columns: repeat(2, 1fr); }
  .sm\\:grid--3 { grid-template-columns: repeat(3, 1fr); }
  .sm\\:grid--auto-fit { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
}

@media (min-width: 768px) {
  .md\\:grid--3 { grid-template-columns: repeat(3, 1fr); }
  .md\\:grid--4 { grid-template-columns: repeat(4, 1fr); }
}
\`\`\`

### Touch-Optimized Interactions

**Touch Target Guidelines**
\`\`\`css
/* Minimum touch target size */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Touch-friendly spacing */
.touch-spacing {
  margin-bottom: 0.75rem; /* Increased spacing for touch */
}

/* Touch feedback */
.touch-feedback {
  transition: transform 0.1s ease, background-color 0.1s ease;
}

.touch-feedback:active {
  transform: scale(0.98);
  background-color: var(--color-primary-100);
}
\`\`\`

**Mobile Gesture Support**
\`\`\`typescript
// hooks/useSwipeGesture.ts
import { useRef, useEffect } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: SwipeGestureOptions) => {
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      if (Math.max(absDeltaX, absDeltaY) < threshold) return;
      
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    };
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);
  
  return elementRef;
};

/* Usage */
const SwipeableCard = () => {
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
  });
  
  return (
    <div ref={swipeRef} className="swipeable-card">
      {/* Card content */}
    </div>
  );
};
\`\`\`

### Mobile Performance Optimization

**Critical CSS Strategy**
\`\`\`css
/* Inline critical CSS for mobile */
<style>
  {`
    /* Critical above-the-fold styles */
    .header {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #e5e5e5;
    }
    
    .hero {
      padding: 2rem 1rem;
      text-align: center;
    }
    
    .hero h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  `}
</style>

/* Non-critical CSS loaded asynchronously */
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
\`\`\`

**Mobile-First JavaScript**
\`\`\`typescript
// Progressive enhancement for mobile
const initializeMobileFeatures = async () => {
  // Only load heavy features on capable devices
  if ('serviceWorker' in navigator && window.innerWidth >= 768) {
    const { default: registerSW } = await import('./service-worker');
    registerSW();
  }
  
  // Initialize analytics on all devices
  initializeAnalytics();
  
  // Load interactive features for touch devices
  if ('ontouchstart' in window) {
    const { default: initTouchFeatures } = await import('./touch-features');
    initTouchFeatures();
  }
};
\`\`\`

### Mobile Navigation Patterns

**Mobile Navigation Component**
\`\`\`typescript
// components/MobileNavigation.tsx
import { useState } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();
  
  // Don't render mobile navigation on larger screens
  if (breakpoint !== 'mobile') {
    return null;
  }
  
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav__header">
        <Logo />
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      
      {isMenuOpen && (
        <div id="mobile-menu" className="mobile-nav__menu">
          <a href="/jobs" className="mobile-nav__link">
            Browse Jobs
          </a>
          <a href="/applications" className="mobile-nav__link">
            My Applications
          </a>
          <a href="/profile" className="mobile-nav__link">
            Profile
          </a>
          <div className="mobile-nav__actions">
            <button className="btn btn--primary btn--full">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
\`\`\`

### Mobile-First Testing

**Mobile Testing Strategy**
\`\`\`typescript
// tests/mobile.test.tsx
import { render, screen } from '@testing-library/react';
import { JobSearchPage } from '../JobSearchPage';

describe('Mobile Job Search', () => {
  beforeEach(() => {
    // Simulate mobile viewport
    global.window.innerWidth = 375;
    global.window.innerHeight = 667;
  });
  
  test('displays mobile-optimized job search interface', () => {
    render(<JobSearchPage />);
    
    expect(screen.getByTestId('mobile-search-form')).toBeInTheDocument();
    expect(screen.getByTestId('job-results-mobile')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-sidebar')).not.toBeInTheDocument();
  });
  
  test('shows touch-friendly buttons', () => {
    render(<JobSearchPage />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveStyle({
        minHeight: '44px',
        minWidth: '44px',
      });
    });
  });
});
\`\`\``
    },
    {
      id: "flexible-layouts",
      title: "Flexible Layouts",
      content: `Flexible layouts are the foundation of responsive design, enabling content to adapt gracefully to different screen sizes and orientations. CareerForge uses modern CSS layout techniques to create responsive, maintainable, and performant layouts.

### Layout Philosophy

Our flexible layout system follows several key principles:

- **Content-Driven**: Layout adapts based on content needs and importance
- **Performance Optimized**: Efficient CSS that doesn't impact loading speed
- **Maintainable**: Clear, predictable layout patterns that are easy to modify
- **Accessible**: Layouts that work well with screen readers and assistive technologies
- **Progressive Enhancement**: Basic layouts enhanced for capable devices

### CSS Grid System

**Modern Grid Implementation**
\`\`\`css
/* CSS Grid Container */
.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Fixed grid columns */
.layout-grid--fixed {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

/* Responsive grid */
.layout-grid--responsive {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .layout-grid--responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .layout-grid--responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .layout-grid--responsive {
    grid-template-columns: repeat(4, 1fr);
  }
}
\`\`\`

**Grid Area Definitions**
\`\`\`css
/* Named grid areas for complex layouts */
.page-layout {
  display: grid;
  grid-template-areas:
    "header"
    "nav"
    "main"
    "sidebar"
    "footer";
  grid-template-rows: auto auto 1fr auto auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }

/* Tablet and desktop layouts */
@media (min-width: 768px) {
  .page-layout {
    grid-template-areas:
      "header header"
      "nav nav"
      "main sidebar"
      "footer footer";
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto auto 1fr auto;
  }
}
\`\`\`

### Flexbox Layouts

**Flexbox Container Patterns**
\`\`\`css
/* Basic flex container */
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row;
  }
}

/* Centered layout */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Space between layout */
.flex-space-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Equal height columns */
.flex-equal-height {
  display: flex;
  gap: 1rem;
}

.flex-equal-height > * {
  flex: 1;
}

/* Vertical center for single items */
.flex-v-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}
\`\`\`

**Flex Item Patterns**
\`\`\`css
/* Flex item utilities */
.flex-grow { flex-grow: 1; }
.flex-shrink { flex-shrink: 1; }
.flex-none { flex: none; }

/* Flex basis utilities */
.flex-basis-auto { flex-basis: auto; }
.flex-basis-full { flex-basis: 100%; }
.flex-basis-half { flex-basis: 50%; }
.flex-basis-third { flex-basis: 33.333%; }
.flex-basis-quarter { flex-basis: 25%; }

/* Responsive flex items */
@media (min-width: 768px) {
  .md\\:flex-grow { flex-grow: 1; }
  .md\\:flex-shrink { flex-shrink: 1; }
  .md\\:flex-none { flex: none; }
}
\`\`\`

### Responsive Grid Patterns

**Auto-Fit Grid**
\`\`\`css
/* Auto-fit grid for flexible card layouts */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Auto-fill grid for consistent spacing */
.card-grid--fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Minimum card size adaptation */
@media (max-width: 320px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 321px) and (max-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
\`\`\`

**Masonry-Style Layout**
\`\`\`css
/* CSS Grid masonry simulation */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: max-content;
  gap: 1rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

/* Fallback for browsers without masonry support */
@supports not (break-inside: avoid) {
  .masonry {
    display: flex;
    flex-direction: column;
  }
  
  .masonry-item {
    margin-bottom: 1rem;
  }
}
\`\`\`

### Layout Components

**Responsive Container**
\`\`\`typescript
// components/ResponsiveContainer.tsx
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'md',
}) => {
  const breakpoint = useBreakpoint();
  
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
  };
  
  return (
    <div
      className={[
        'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        breakpoint === 'mobile' ? 'px-4' : '', // Extra mobile padding
      ].join(' ')}
    >
      {children}
    </div>
  );
};
\`\`\`

**Responsive Grid Component**
\`\`\`typescript
// components/ResponsiveGrid.tsx
import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  minItemWidth?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = 'md',
  minItemWidth = '280px',
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };
  
  const getGridTemplate = () => {
    if (minItemWidth) {
      return `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`;
    }
    
    const templates = [];
    if (columns.mobile) templates.push(`repeat(${columns.mobile}, 1fr)`);
    
    return templates.join(' ');
  };
  
  return (
    <div
      className={[
        'grid',
        gapClasses[gap],
        // Mobile-first approach
        `grid-cols-${columns.mobile || 1}`,
        // Responsive columns
        columns.tablet && `sm:grid-cols-${columns.tablet}`,
        columns.desktop && `md:grid-cols-${columns.desktop}`,
        columns.wide && `lg:grid-cols-${columns.wide}`,
      ].filter(Boolean).join(' ')}
      style={{
        gridTemplateColumns: minItemWidth ? getGridTemplate() : undefined,
      }}
    >
      {children}
    </div>
  );
};
\`\`\`

### Advanced Layout Patterns

**Sticky Layout with Sidebar**
\`\`\`css
/* Sticky sidebar layout */
.layout-with-sidebar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

@media (min-width: 768px) {
  .layout-with-sidebar {
    grid-template-columns: 1fr 300px;
  }
}

/* Alternative flexbox approach */
.layout-sidebar-flex {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
}

.sidebar {
  flex-shrink: 0;
}

.main {
  flex: 1;
}

@media (min-width: 768px) {
  .layout-sidebar-flex {
    flex-direction: row;
  }
  
  .sidebar {
    width: 300px;
  }
}
\`\`\`

**Equal Height Columns**
\`\`\`css
/* Flexbox equal height */
.equal-height-flex {
  display: flex;
  gap: 1rem;
}

.equal-height-flex > * {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* CSS Grid equal height */
.equal-height-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.equal-height-grid > * {
  display: flex;
  flex-direction: column;
}

/* Content equal height */
.content-equal-height {
  display: flex;
  gap: 1rem;
}

.content-equal-height > * {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-equal-height > * > *:last-child {
  margin-top: auto;
}
\`\`\`

### Layout Performance

**CSS Containment**
\`\`\`css
/* Layout containment for performance */
.card {
  contain: layout style;
}

.card-grid {
  contain: layout style;
}

/* Content visibility optimization */
.lazy-content {
  content-visibility: auto;
  contain-intrinsic-size: 400px;
}
\`\`\`

**Layout Shift Prevention**
\`\`\`css
/* Reserve space to prevent layout shift */
.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Skeleton loading state */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
\`\`\`

### Layout Testing

**Layout Testing Utilities**
\`\`\`typescript
// tests/layout.test.tsx
import { render, screen } from '@testing-library/react';
import { Layout } from '../Layout';

describe('Responsive Layout', () => {
  test('renders single column on mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    render(<Layout><div data-testid="content">Test Content</div></Layout>);
    
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('grid-cols-1');
    expect(content).not.toHaveClass('md:grid-cols-2');
  });
  
  test('renders two columns on tablet', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 768 });
    render(<Layout><div data-testid="content">Test Content</div></Layout>);
    
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('md:grid-cols-2');
  });
});
\`\`\``
    },
    {
      id: "responsive-typography",
      title: "Responsive Typography",
      content: `Responsive typography ensures optimal readability and visual hierarchy across all device sizes. CareerForge implements fluid typography systems that adapt seamlessly to different screen sizes while maintaining accessibility standards.

### Typography Responsiveness Philosophy

Our responsive typography approach ensures:

- **Readability First**: Text remains readable across all screen sizes
- **Visual Hierarchy**: Clear information hierarchy maintained at all sizes
- **Performance Optimized**: Efficient typography scaling without layout shift
- **Accessibility Compliant**: Meets WCAG guidelines for text size and contrast
- **Brand Consistent**: Typography reflects CareerForge's brand voice across devices

### Fluid Typography System

**CSS Custom Properties for Typography**
\`\`\`css
:root {
  /* Base font size */
  --font-size-base: 1rem;
  
  /* Fluid typography scale */
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
  --font-size-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem);
  --font-size-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
  --font-size-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
  
  /* Line height for fluid typography */
  --line-height-tight: clamp(1.2, 1.1 + 0.1vw, 1.3);
  --line-height-normal: clamp(1.5, 1.4 + 0.1vw, 1.6);
  --line-height-relaxed: clamp(1.6, 1.5 + 0.1vw, 1.7);
  
  /* Letter spacing */
  --letter-spacing-tight: clamp(-0.025em, -0.02em + -0.005vw, -0.03em);
  --letter-spacing-normal: 0;
  --letter-spacing-wide: clamp(0.025em, 0.02em + 0.005vw, 0.03em);
}
\`\`\`

**Fluid Typography Classes**
\`\`\`css
/* Fluid text size utilities */
.text-fluid-xs { font-size: var(--font-size-xs); }
.text-fluid-sm { font-size: var(--font-size-sm); }
.text-fluid-base { font-size: var(--font-size-base); }
.text-fluid-lg { font-size: var(--font-size-lg); }
.text-fluid-xl { font-size: var(--font-size-xl); }
.text-fluid-2xl { font-size: var(--font-size-2xl); }
.text-fluid-3xl { font-size: var(--font-size-3xl); }
.text-fluid-4xl { font-size: var(--font-size-4xl); }
.text-fluid-5xl { font-size: var(--font-size-5xl); }

/* Fluid line height utilities */
.leading-fluid-tight { line-height: var(--line-height-tight); }
.leading-fluid-normal { line-height: var(--line-height-normal); }
.leading-fluid-relaxed { line-height: var(--line-height-relaxed); }

/* Fluid letter spacing utilities */
.tracking-fluid-tight { letter-spacing: var(--letter-spacing-tight); }
.tracking-fluid-normal { letter-spacing: var(--letter-spacing-normal); }
.tracking-fluid-wide { letter-spacing: var(--letter-spacing-wide); }
\`\`\`

### Breakpoint-Specific Typography

**Responsive Typography Scale**
\`\`\`css
/* Base mobile typography */
.heading-1 {
  font-size: 1.75rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.heading-2 {
  font-size: 1.5rem;
  line-height: 1.3;
  margin-bottom: 1.25rem;
}

.heading-3 {
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.body-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .heading-1 {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
  
  .heading-2 {
    font-size: 1.875rem;
    margin-bottom: 1.5rem;
  }
  
  .heading-3 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }
  
  .body-text {
    font-size: 1.125rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .heading-1 {
    font-size: 3rem;
    margin-bottom: 2.5rem;
  }
  
  .heading-2 {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
  
  .heading-3 {
    font-size: 1.875rem;
    margin-bottom: 1.5rem;
  }
  
  .body-text {
    font-size: 1.25rem;
  }
}
\`\`\`

### Typography Components

**Responsive Heading Component**
\`\`\`typescript
// components/ResponsiveHeading.tsx
import { ReactNode } from 'react';

interface ResponsiveHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  responsive?: boolean;
}

const ResponsiveHeading: React.FC<ResponsiveHeadingProps> = ({
  children,
  level = 1,
  className = '',
  responsive = true,
}) => {
  const baseClasses = [
    'font-bold',
    'tracking-tight',
    'leading-tight',
    'mb-4',
  ];
  
  const sizeClasses = responsive ? [
    // Mobile sizes
    `text-${level === 1 ? '2xl' : level === 2 ? 'xl' : level === 3 ? 'lg' : 'base'}`,
    // Tablet sizes
    `md:text-${level === 1 ? '3xl' : level === 2 ? '2xl' : level === 3 ? 'xl' : 'lg'}`,
    // Desktop sizes
    `lg:text-${level === 1 ? '4xl' : level === 2 ? '3xl' : level === 3 ? '2xl' : 'xl'}`,
  ] : [
    `text-${['base', 'lg', 'xl', '2xl', '3xl', '4xl'][level - 1]}`
  ];
  
  const Component = \`h\${level}\` as keyof JSX.IntrinsicElements;
  
  return (
    <Component className={[...baseClasses, ...sizeClasses, className].join(' ')}>
      {children}
    </Component>
  );
};
\`\`\`

**Responsive Text Component**
\`\`\`typescript
// components/ResponsiveText.tsx
import { ReactNode } from 'react';

interface ResponsiveTextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  responsive?: boolean;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  className = '',
  responsive = true,
}) => {
  const baseClasses = [
    'text-neutral-900',
    \`font-\${weight}\`,
  ];
  
  const sizeClasses = responsive ? [
    // Mobile sizes
    \`text-\${size}\`,
    // Tablet sizes
    size === 'xs' ? 'md:text-sm' : 
    size === 'sm' ? 'md:text-base' :
    size === 'base' ? 'md:text-lg' :
    size === 'lg' ? 'md:text-xl' : 'md:text-2xl',
    // Desktop sizes
    size === 'xs' ? 'lg:text-base' : 
    size === 'sm' ? 'lg:text-lg' :
    size === 'base' ? 'lg:text-xl' :
    size === 'lg' ? 'lg:text-2xl' : 'lg:text-3xl',
  ] : [\`text-\${size}\`];
  
  return (
    <p className={[...baseClasses, ...sizeClasses, className].join(' ')}>
      {children}
    </p>
  );
};
\`\`\`

### Typography Accessibility

**Minimum Font Sizes**
\`\`\`css
/* Ensure minimum readable sizes */
.text-minimum {
  font-size: 1rem; /* 16px minimum for body text */
  line-height: 1.5;
}

@media (prefers-reduced-motion: no-preference) {
  .text-minimum {
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  }
}

/* Interactive text minimums */
button, 
.interactive-text {
  font-size: 1rem; /* Minimum for touch targets */
  min-height: 44px; /* Touch target size */
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1rem;
}

/* Links */
a {
  font-size: 1rem;
  color: var(--color-primary-600);
  text-decoration: underline;
  text-underline-offset: 2px;
}

a:hover {
  color: var(--color-primary-700);
}
\`\`\`

**High Contrast Support**
\`\`\`css
/* High contrast mode adjustments */
@media (prefers-contrast: high) {
  .text-primary {
    color: #000000;
  }
  
  .text-secondary {
    color: #333333;
  }
  
  .text-muted {
    color: #666666;
  }
  
  /* Increase font weights for better contrast */
  .heading-1,
  .heading-2,
  .heading-3 {
    font-weight: 700;
  }
  
  .body-text {
    font-weight: 500;
  }
}

/* Dark mode typography */
@media (prefers-color-scheme: dark) {
  .text-primary {
    color: #f8fafc;
  }
  
  .text-secondary {
    color: #cbd5e1;
  }
  
  .text-muted {
    color: #94a3b8;
  }
}
\`\`\`

### Performance-Optimized Typography

**Font Loading Optimization**
\`\`\`css
/* Font display optimization */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Prevent invisible text during font load */
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-semibold.woff2') format('woff2');
}

/* Critical font loading */
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-semibold.woff2" as="font" type="font/woff2" crossorigin>
\`\`\`

**Typography Performance Utilities**
\`\`\`css
/* Font loading state */
.font-loading {
  font-family: system-ui, -apple-system, sans-serif; /* Fallback font */
}

.font-loaded {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Prevent layout shift during font load */
.text-stable {
  /* Reserve space to prevent layout shift */
  font-size-adjust: 0.5;
  font-optical-sizing: none;
}

/* Efficient text rendering */
.text-optimized {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reduce repaints */
.text-will-change {
  will-change: contents;
}
\`\`\`

### Responsive Typography Testing

**Typography Testing Utilities**
\`\`\`typescript
// tests/typography.test.tsx
import { render, screen } from '@testing-library/react';
import { ResponsiveText } from '../ResponsiveText';

describe('Responsive Typography', () => {
  test('applies appropriate font sizes for mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    
    render(<ResponsiveText size="lg">Test Text</ResponsiveText>);
    
    const text = screen.getByText('Test Text');
    expect(text).toHaveClass('text-lg');
    expect(text).toHaveClass('md:text-xl');
    expect(text).toHaveClass('lg:text-2xl');
  });
  
  test('maintains accessibility at all sizes', () => {
    const { container } = render(
      <div>
        <ResponsiveText size="base">Body text</ResponsiveText>
        <ResponsiveText size="sm">Small text</ResponsiveText>
      </div>
    );
    
    const textElements = container.querySelectorAll('p');
    textElements.forEach(element => {
      expect(element).toHaveStyle({
        fontSize: expect.stringMatching(/1rem|1\.125rem/),
      });
    });
  });
});
\`\`\`

**Viewport-Based Testing**
\`\`\`typescript
// utils/typography-testing.ts
export const testTypographyAtViewport = (width: number, height: number) => {
  // Set viewport size
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
  
  // Test typography rendering
  const computedStyles = getComputedStyle(document.documentElement);
  
  return {
    fontSize: computedStyles.getPropertyValue('--font-size-base'),
    lineHeight: computedStyles.getPropertyValue('--line-height-normal'),
    letterSpacing: computedStyles.getPropertyValue('--letter-spacing-normal'),
  };
};

// Test different viewport sizes
const viewports = [
  { width: 320, height: 568 },  // iPhone SE
  { width: 375, height: 667 },  // iPhone 8
  { width: 414, height: 896 },  // iPhone 11
  { width: 768, height: 1024 }, // iPad
  { width: 1024, height: 768 }, // iPad landscape
  { width: 1440, height: 900 }, // Desktop
];

viewports.forEach(({ width, height }) => {
  console.log(\`Testing typography at \${width}x\${height}:\`, testTypographyAtViewport(width, height));
});
\`\`\``
    },
    {
      id: "responsive-images",
      title: "Responsive Images",
      content: `Responsive images are crucial for optimal performance and visual quality across different devices and screen sizes. CareerForge implements a comprehensive responsive image strategy that serves appropriately sized images based on device capabilities and viewport dimensions.

### Image Responsiveness Philosophy

Our responsive image approach ensures:

- **Optimal Loading**: Appropriate image sizes for each device and context
- **Visual Quality**: High-quality images that look great on all displays
- **Performance**: Fast loading times with minimal data transfer
- **Accessibility**: Proper alt text and descriptive image content
- **Future-Proof**: Support for emerging image formats and technologies

### Responsive Image Techniques

**CSS-Based Responsive Images**
\`\`\`css
/* Responsive images with CSS */
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
}

/* Aspect ratio preservation */
.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* Modern aspect ratio support */
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fallback for older browsers */
@supports not (aspect-ratio: 16 / 9) {
  .image-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio fallback */
    height: 0;
  }
  
  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
\`\`\`

**Art Direction with Picture Element**
\`\`\`html
<!-- Responsive images with art direction -->
<picture>
  <!-- Mobile-optimized image -->
  <source 
    media="(max-width: 767px)" 
    srcset="
      image-mobile-320w.jpg 320w,
      image-mobile-480w.jpg 480w,
      image-mobile-640w.jpg 640w
    "
    sizes="(max-width: 767px) 100vw, 50vw"
  >
  
  <!-- Tablet-optimized image -->
  <source 
    media="(min-width: 768px) and (max-width: 1023px)" 
    srcset="
      image-tablet-768w.jpg 768w,
      image-tablet-1024w.jpg 1024w,
      image-tablet-1280w.jpg 1280w
    "
    sizes="(min-width: 768px) and (max-width: 1023px) 75vw, 50vw"
  >
  
  <!-- Desktop-optimized image -->
  <source 
    media="(min-width: 1024px)" 
    srcset="
      image-desktop-1024w.jpg 1024w,
      image-desktop-1440w.jpg 1440w,
      image-desktop-1920w.jpg 1920w
    "
    sizes="(min-width: 1024px) 50vw, 33vw"
  >
  
  <!-- Fallback image -->
  <img 
    src="image-desktop-1024w.jpg" 
    alt="Job seeker working on laptop"
    loading="lazy"
    decoding="async"
  >
</picture>
\`\`\`

### Modern Image Formats

**WebP and AVIF Support**
\`\`\`html
<!-- Multiple format support with fallback -->
<picture>
  <!-- AVIF format (best compression) -->
  <source 
    type="image/avif" 
    srcset="
      image-320w.avif 320w,
      image-480w.avif 480w,
      image-640w.avif 640w,
      image-768w.avif 768w,
      image-1024w.avif 1024w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
  >
  
  <!-- WebP format (good compression) -->
  <source 
    type="image/webp" 
    srcset="
      image-320w.webp 320w,
      image-480w.webp 480w,
      image-640w.webp 640w,
      image-768w.webp 768w,
      image-1024w.webp 1024w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
  >
  
  <!-- Fallback to JPEG -->
  <img 
    src="image-640w.jpg" 
    srcset="
      image-320w.jpg 320w,
      image-480w.jpg 480w,
      image-640w.jpg 640w,
      image-768w.jpg 768w,
      image-1024w.jpg 1024w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
    alt="Career development illustration"
    loading="lazy"
    decoding="async"
  >
</picture>
\`\`\`

### React Responsive Image Component

**Responsive Image Component**
\`\`\`typescript
// components/ResponsiveImage.tsx
import { useState, useCallback } from 'react';

interface ResponsiveImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  srcSet,
  sizes,
  alt,
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  className = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const containerClasses = [
    'relative',
    'overflow-hidden',
    className,
  ].filter(Boolean).join(' ');

  const imageClasses = [
    'w-full',
    'h-full',
    'transition-opacity',
    'duration-300',
    imageLoaded ? 'opacity-100' : 'opacity-0',
    objectFit === 'cover' ? 'object-cover' : 'object-contain',
  ].join(' ');

  if (aspectRatio) {
    return (
      <div className={containerClasses} style={{ aspectRatio }}>
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};
\`\`\`

**Responsive Avatar Component**
\`\`\`typescript
// components/ResponsiveAvatar.tsx
import { ResponsiveImage } from './ResponsiveImage';

interface ResponsiveAvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

const ResponsiveAvatar: React.FC<ResponsiveAvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const imageSrcSet = src ? `
    ${src}?w=32&h=32&fit=crop 32w,
    ${src}?w=48&h=48&fit=crop 48w,
    ${src}?w=64&h=64&fit=crop 64w,
    ${src}?w=96&h=96&fit=crop 96w,
    ${src}?w=128&h=128&fit=crop 128w
  `.trim() : undefined;

  const sizes = "(max-width: 640px) 32px, (max-width: 768px) 48px, (max-width: 1024px) 64px, 96px";

  if (!src && fallback) {
    return (
      <div
        className={[
          'flex items-center justify-center',
          'bg-gray-300',
          'rounded-full',
          sizeClasses[size],
          fontSizeClasses[size],
          'font-medium',
          'text-gray-600',
          className,
        ].join(' ')}
      >
        {fallback}
      </div>
    );
  }

  return (
    <ResponsiveImage
      src={src || ''}
      srcSet={imageSrcSet}
      sizes={sizes}
      alt={alt}
      aspectRatio="1"
      objectFit="cover"
      className={[
        'rounded-full',
        sizeClasses[size],
        className,
      ].join(' ')}
    />
  );
};
\`\`\`

### Image Optimization

**Next.js Image Component**
\`\`\`typescript
// Using Next.js Image component for optimization
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className = '',
}) => {
  // Determine responsive sizes based on context
  const getResponsiveSizes = () => {
    if (width && height) {
      // Fixed dimensions
      return `${width}px`;
    }
    
    // Responsive sizes
    return "(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw";
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={getResponsiveSizes()}
      priority={priority}
      quality={quality}
      className={className}
      placeholder="empty" // or "blur" if using blurDataURL
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
\`\`\`

**Lazy Loading Implementation**
\`\`\`typescript
// Custom lazy loading hook
import { useState, useRef, useEffect } from 'react';

interface UseLazyImageOptions {
  src: string;
  threshold?: number;
  rootMargin?: string;
}

export const useLazyImage = ({ src, threshold = 0.1, rootMargin = '50px' }: UseLazyImageOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isInView && !isLoaded && !error) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
      img.src = src;
    }
  }, [isInView, src, isLoaded, error]);

  return {
    ref: imgRef,
    isLoaded,
    isInView,
    error,
    shouldLoad: isInView && !isLoaded && !error,
  };
};
\`\`\`

### Image Accessibility

**Accessible Image Patterns**
\`\`\`typescript
// Accessible image component
interface AccessibleImageProps {
  src: string;
  alt: string;
  decorative?: boolean;
  longDescription?: string;
  className?: string;
}

const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  decorative = false,
  longDescription,
  className = '',
}) => {
  if (decorative) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {longDescription && (
        <figcaption className="sr-only">
          {longDescription}
        </figcaption>
      )}
    </figure>
  );
};
\`\`\`

### Performance Monitoring

**Image Performance Tracking**
\`\`\`typescript
// utils/imagePerformance.ts
export const trackImagePerformance = (img: HTMLImageElement) => {
  const perfData = {
    src: img.src,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    loadTime: 0,
    renderTime: 0,
  };

  const startTime = performance.now();

  img.onload = () => {
    perfData.loadTime = performance.now() - startTime;
    
    // Report to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'image_load', {
        image_src: img.src,
        load_time: perfData.loadTime,
        image_size: \`\${img.naturalWidth}x\${img.naturalHeight}\`,
      });
    }
  };

  // Monitor render performance
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      const renderTime = performance.now() - startTime;
      perfData.renderTime = renderTime;
    });
  }
};

// Usage with image loading
const monitorImage = (img: HTMLImageElement) => {
  if (img.dataset.monitored !== 'true') {
    img.dataset.monitored = 'true';
    trackImagePerformance(img);
  }
};
\`\`\`

### Image Testing

**Responsive Image Testing**
\`\`\`typescript
// tests/responsive-images.test.tsx
import { render, screen } from '@testing-library/react';
import { ResponsiveImage } from '../ResponsiveImage';

describe('Responsive Images', () => {
  test('renders with correct aspect ratio', () => {
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test image"
        aspectRatio="16/9"
      />
    );

    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveStyle({
      aspectRatio: '16 / 9',
    });
  });

  test('handles loading states', () => {
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test image"
      />
    );

    // Should show loading state initially
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('opacity-0');
  });

  test('applies responsive srcset', () => {
    const srcSet = `
      /image-320w.jpg 320w,
      /image-640w.jpg 640w,
      /image-1024w.jpg 1024w
    `.trim();

    render(
      <ResponsiveImage
        src="/image-640w.jpg"
        srcSet={srcSet}
        alt="Test image"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
    );

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.srcset).toBe(srcSet);
    expect(img.sizes).toBe('(max-width: 640px) 100vw, 50vw');
  });
});
\`\`\``
    },
    {
      id: "component-adaptation",
      title: "Component Adaptation",
      content: `Component adaptation ensures that individual UI components respond intelligently to different screen sizes and contexts, providing optimal experiences across all devices while maintaining design consistency and functionality.

### Component Adaptation Philosophy

Our component adaptation approach ensures:

- **Contextual Optimization**: Components adapt behavior based on available space and device capabilities
- **Progressive Enhancement**: Core functionality preserved while adding enhancements for larger screens
- **Consistent Experience**: Users can accomplish the same tasks regardless of device
- **Performance Conscious**: Lightweight adaptations that don't impact performance
- **Accessibility Maintained**: All adaptations preserve accessibility standards

### Breakpoint-Aware Components

**Adaptive Layout Component**
\`\`\`typescript
// components/AdaptiveLayout.tsx
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { ReactNode } from 'react';

interface AdaptiveLayoutProps {
  children: ReactNode;
  mobileLayout: ReactNode;
  tabletLayout?: ReactNode;
  desktopLayout?: ReactNode;
  fallback?: ReactNode;
}

const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({
  children,
  mobileLayout,
  tabletLayout,
  desktopLayout,
  fallback,
}) => {
  const breakpoint = useBreakpoint();
  
  // Determine which layout to render
  const renderLayout = () => {
    switch (breakpoint) {
      case 'mobile':
        return mobileLayout;
      case 'tablet':
        return tabletLayout || mobileLayout;
      case 'desktop':
        return desktopLayout || tabletLayout || mobileLayout;
      case 'wide':
        return desktopLayout || tabletLayout || mobileLayout;
      default:
        return fallback || mobileLayout;
    }
  };

  return (
    <div className={\`adaptive-layout adaptive-layout--\${breakpoint}\`}>
      {renderLayout()}
    </div>
  );
};
\`\`\`

**Responsive Card Grid**
\`\`\`typescript
// components/ResponsiveCardGrid.tsx
import { useState, useMemo } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface Card {
  id: string;
  title: string;
  description: string;
  image?: string;
  priority: 'high' | 'medium' | 'low';
}

interface ResponsiveCardGridProps {
  cards: Card[];
  layout?: 'list' | 'grid' | 'masonry';
  showImages?: boolean;
  maxItems?: number;
}

const ResponsiveCardGrid: React.FC<ResponsiveCardGridProps> = ({
  cards,
  layout = 'grid',
  showImages = true,
  maxItems,
}) => {
  const breakpoint = useBreakpoint();
  const [visibleCount, setVisibleCount] = useState(maxItems || cards.length);

  // Determine grid columns based on breakpoint
  const gridColumns = useMemo(() => {
    switch (breakpoint) {
      case 'mobile':
        return 1;
      case 'tablet':
        return 2;
      case 'desktop':
        return 3;
      case 'wide':
        return 4;
      default:
        return 1;
    }
  }, [breakpoint]);

  // Determine layout based on breakpoint and content
  const effectiveLayout = useMemo(() => {
    if (breakpoint === 'mobile' && cards.length > 6) {
      return 'list'; // Switch to list view for better mobile UX
    }
    return layout;
  }, [breakpoint, cards.length, layout]);

  // Filter and sort cards
  const sortedCards = useMemo(() => {
    return cards
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, visibleCount);
  }, [cards, visibleCount]);

  const loadMore = () => {
    const increment = breakpoint === 'mobile' ? 5 : 10;
    setVisibleCount(prev => Math.min(prev + increment, cards.length));
  };

  if (effectiveLayout === 'list') {
    return (
      <div className="space-y-4">
        {sortedCards.map((card) => (
          <div key={card.id} className="card card--list">
            {showImages && card.image && (
              <div className="card__image">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
            )}
            <div className="card__content">
              <h3 className="card__title">{card.title}</h3>
              <p className="card__description">{card.description}</p>
            </div>
          </div>
        ))}
        
        {visibleCount < cards.length && (
          <button onClick={loadMore} className="btn btn--outline btn--full">
            Load More ({cards.length - visibleCount} remaining)
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      className={\`grid gap-6 grid-cols-\${gridColumns}\`}
      style={{
        gridTemplateColumns: \`repeat(\${gridColumns}, minmax(0, 1fr))\`,
      }}
    >
      {sortedCards.map((card) => (
        <div key={card.id} className="card">
          {showImages && card.image && (
            <div className="card__image">
              <img src={card.image} alt={card.title} loading="lazy" />
            </div>
          )}
          <div className="card__content">
            <h3 className="card__title">{card.title}</h3>
            <p className="card__description">{card.description}</p>
          </div>
        </div>
      ))}
      
      {visibleCount < cards.length && (
        <div className="col-span-full">
          <button onClick={loadMore} className="btn btn--outline btn--full">
            Load More ({cards.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
\`\`\`

### Container Query Components

**Container-Responsive Component**
\`\`\`css
/* Container query-based component */
@container (min-width: 300px) {
  .job-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: start;
  }
  
  .job-card__title {
    font-size: 1.125rem;
  }
}

@container (min-width: 500px) {
  .job-card {
    grid-template-columns: auto 1fr auto;
    gap: 1.5rem;
  }
  
  .job-card__image {
    width: 80px;
    height: 80px;
  }
  
  .job-card__actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

@container (min-width: 700px) {
  .job-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
  
  .job-card__title {
    font-size: 1.25rem;
  }
  
  .job-card__description {
    display: block;
  }
}

/* Container query support detection */
@supports not (container-type: inline-size) {
  /* Fallback to media queries */
  .job-card {
    display: block;
  }
  
  @media (min-width: 768px) {
    .job-card {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 1rem;
    }
  }
}
\`\`\`

**Container Query React Hook**
\`\`\`typescript
// hooks/useContainerQuery.ts
import { useState, useEffect, useRef } from 'react';

export const useContainerQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('CSS' in window) || !CSS.supports('container-type', 'inline-size')) {
      return;
    }

    // Enable container queries on the element
    element.style.containerType = 'inline-size';

    const mediaQuery = window.matchMedia(query);
    
    const updateMatches = () => setMatches(mediaQuery.matches);
    
    // Use container query if supported
    if ('ContainerQuery' in window) {
      const containerQuery = new (window as any).ContainerQuery(element, query);
      
      const observer = new MutationObserver(() => {
        setMatches(containerQuery.matches);
      });
      
      observer.observe(element, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      
      return () => observer.disconnect();
    } else {
      // Fallback to media query
      updateMatches();
      mediaQuery.addEventListener('change', updateMatches);
      
      return () => mediaQuery.removeEventListener('change', updateMatches);
    }
  }, [query]);

  return matches;
};

/* Usage */
const ContainerResponsiveComponent = () => {
  const isWide = useContainerQuery('(min-width: 500px)');
  
  return (
    <div ref={elementRef} className="container-responsive">
      <div className={\`content \${isWide ? 'layout-wide' : 'layout-narrow'}\`}>
        {/* Component content */}
      </div>
    </div>
  );
};
\`\`\`

### Adaptive Navigation

**Responsive Navigation Component**
\`\`\`typescript
// components/ResponsiveNavigation.tsx
import { useState, useEffect } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface ResponsiveNavigationProps {
  items: NavigationItem[];
  logo: React.ReactNode;
  userMenu?: React.ReactNode;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  items,
  logo,
  userMenu,
}) => {
  const breakpoint = useBreakpoint();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when breakpoint changes
  useEffect(() => {
    if (breakpoint !== 'mobile') {
      setIsMenuOpen(false);
    }
  }, [breakpoint]);

  // Don't render navigation on very small screens if not needed
  if (breakpoint === 'mobile' && items.length === 0 && !userMenu) {
    return null;
  }

  return (
    <nav className={\`navigation navigation--\${breakpoint}\`}>
      <div className="navigation__header">
        <div className="navigation__logo">
          {logo}
        </div>
        
        {breakpoint === 'mobile' && (
          <button
            className="navigation__toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <MenuIcon />
          </button>
        )}
      </div>

      <div className={\`navigation__content \${isMenuOpen ? 'navigation__content--open' : ''}\`}>
        <ul className="navigation__items">
          {items.map((item) => (
            <li key={item.id} className="navigation__item">
              <a
                href={item.href}
                className="navigation__link"
                {...(item.badge && { 'data-badge': item.badge })}
              >
                {item.icon && <span className="navigation__icon">{item.icon}</span>}
                <span className="navigation__label">{item.label}</span>
                {item.badge && (
                  <span className="navigation__badge">{item.badge}</span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {userMenu && (
          <div className="navigation__user">
            {userMenu}
          </div>
        )}
      </div>
    </nav>
  );
};
\`\`\`

### Adaptive Form Components

**Responsive Form Layout**
\`\`\`typescript
// components/ResponsiveForm.tsx
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { ReactNode } from 'react';

interface FormField {
  id: string;
  label: string;
  component: ReactNode;
  width?: 'full' | 'half' | 'third';
}

interface ResponsiveFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  submitLabel?: string;
}

const ResponsiveForm: React.FC<ResponsiveFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
}) => {
  const breakpoint = useBreakpoint();

  const getFieldWidth = (width?: string) => {
    switch (breakpoint) {
      case 'mobile':
        return 'full';
      case 'tablet':
        return width === 'third' ? 'half' : width || 'full';
      case 'desktop':
      case 'wide':
      default:
        return width || 'full';
    }
  };

  return (
    <form onSubmit={onSubmit} className="responsive-form">
      <div className="form-grid">
        {fields.map((field) => (
          <div
            key={field.id}
            className={\`form-field form-field--\${getFieldWidth(field.width)}\`}
          >
            <label htmlFor={field.id} className="form-label">
              {field.label}
            </label>
            {field.component}
          </div>
        ))}
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn--primary btn--full">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
\`\`\`

### Performance Considerations

**Lazy Component Loading**
\`\`\`typescript
// hooks/useLazyComponent.ts
import { useState, useEffect, useRef } from 'react';

export const useLazyComponent = (component: () => Promise<{ default: React.ComponentType<any> }>) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          component().then(({ default: Comp }) => {
            setComponent(() => Comp);
            setIsLoaded(true);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [component, isLoaded]);

  return { ref, Component, isLoaded };
};

/* Usage */
const LazyJobCard = () => {
  const { ref, Component, isLoaded } = useLazyComponent(
    () => import('./components/JobCard')
  );

  return (
    <div ref={ref}>
      {Component ? (
        <Component />
      ) : (
        <div className="job-card job-card--skeleton">
          <div className="skeleton skeleton--text" />
          <div className="skeleton skeleton--text" />
          <div className="skeleton skeleton--button" />
        </div>
      )}
    </div>
  );
};
\`\`\`

### Component Testing

**Adaptive Component Testing**
\`\`\`typescript
// tests/adaptive-components.test.tsx
import { render, screen } from '@testing-library/react';
import { ResponsiveCardGrid } from '../ResponsiveCardGrid';

const mockCards = [
  { id: '1', title: 'Job 1', description: 'Description 1', priority: 'high' as const },
  { id: '2', title: 'Job 2', description: 'Description 2', priority: 'medium' as const },
  { id: '3', title: 'Job 3', description: 'Description 3', priority: 'low' as const },
];

describe('Adaptive Components', () => {
  test('renders single column on mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    
    render(<ResponsiveCardGrid cards={mockCards} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid-cols-1');
  });

  test('switches to list view for many items on mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    const manyCards = Array.from({ length: 8 }, (_, i) => ({
      ...mockCards[0],
      id: \`job-\${i}\`,
    }));
    
    render(<ResponsiveCardGrid cards={manyCards} />);
    
    // Should use list layout for mobile with many items
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  test('renders multiple columns on desktop', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1440 });
    
    render(<ResponsiveCardGrid cards={mockCards} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('md:grid-cols-3');
  });
});
\`\`\``
    },
    {
      id: "touch-interactions",
      title: "Touch Interactions",
      content: `Touch interactions are fundamental to the mobile experience in CareerForge. Our touch interaction system ensures intuitive, responsive, and accessible interactions across all touch-enabled devices while maintaining functionality for mouse and keyboard users.

### Touch Interaction Philosophy

Our touch interaction approach ensures:

- **Intuitive Gestures**: Natural touch gestures that match user expectations
- **Accessibility**: Touch interactions work with assistive technologies
- **Performance**: Smooth, responsive touch feedback without lag
- **Consistency**: Uniform touch behavior across the platform
- **Progressive Enhancement**: Touch features enhance but don't replace other input methods

### Touch Target Guidelines

**Minimum Touch Target Sizes**
\`\`\`css
/* Minimum touch target size - 44x44px */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Touch-friendly spacing */
.touch-spacing {
  margin-bottom: 0.75rem;
  padding: 0.5rem;
}

/* Touch feedback states */
.touch-interactive {
  transition: all 0.15s ease;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.touch-interactive:hover {
  background-color: var(--color-primary-50);
}

.touch-interactive:active {
  transform: scale(0.98);
  background-color: var(--color-primary-100);
}

.touch-interactive:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
\`\`\`

**Component Touch Targets**
\`\`\`css
/* Button touch targets */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
}

.btn--icon {
  padding: 0.75rem;
  width: 44px;
  height: 44px;
}

/* Link touch targets */
a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Form control touch targets */
input,
select,
textarea {
  min-height: 44px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.375rem;
}

/* Checkbox and radio touch targets */
input[type="checkbox"],
input[type="radio"] {
  width: 20px;
  height: 20px;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
  min-height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 0.5rem;
}
\`\`\`

### Touch Gesture System

**Swipe Gesture Hook**
\`\`\`typescript
// hooks/useSwipeGesture.ts
import { useRef, useEffect, useCallback } from 'react';

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefault?: boolean;
}

export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  preventDefault = true,
}: SwipeOptions) => {
  const elementRef = useRef<HTMLElement>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!startPosRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe meets threshold
    if (Math.max(absDeltaX, absDeltaY) < threshold) {
      startPosRef.current = null;
      return;
    }

    // Determine swipe direction
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0 && onSwipeRight) {
        if (preventDefault) e.preventDefault();
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        if (preventDefault) e.preventDefault();
        onSwipeLeft();
      }
    } else {
      // Vertical swipe
      if (deltaY > 0 && onSwipeDown) {
        if (preventDefault) e.preventDefault();
        onSwipeDown();
      } else if (deltaY < 0 && onSwipeUp) {
        if (preventDefault) e.preventDefault();
        onSwipeUp();
      }
    }

    startPosRef.current = null;
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold, preventDefault]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return elementRef;
};
\`\`\`

**Pinch-to-Zoom Hook**
\`\`\`typescript
// hooks/usePinchZoom.ts
import { useRef, useEffect, useCallback, useState } from 'react';

interface PinchZoomOptions {
  onZoomChange?: (scale: number) => void;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}

export const usePinchZoom = ({
  onZoomChange,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1,
}: PinchZoomOptions) => {
  const elementRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(initialScale);
  const touchesRef = useRef<TouchList | null>(null);
  const initialDistanceRef = useRef<number | null>(null);

  const calculateDistance = (touches: TouchList): number => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      touchesRef.current = e.touches;
      initialDistanceRef.current = calculateDistance(e.touches);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && touchesRef.current && initialDistanceRef.current) {
      e.preventDefault();
      
      const currentDistance = calculateDistance(e.touches);
      const scaleFactor = currentDistance / initialDistanceRef.current;
      const newScale = Math.max(minScale, Math.min(maxScale, scale * scaleFactor));
      
      setScale(newScale);
      onZoomChange?.(newScale);
    }
  }, [scale, minScale, maxScale, onZoomChange]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length < 2) {
      touchesRef.current = null;
      initialDistanceRef.current = null;
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    ref: elementRef,
    scale,
    setScale: (newScale: number) => {
      const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));
      setScale(clampedScale);
      onZoomChange?.(clampedScale);
    },
  };
};
\`\`\`

### Touch-Optimized Components

**Swipeable Card Component**
\`\`\`typescript
// components/SwipeableCard.tsx
import { useState } from 'react';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    label: string;
    icon: React.ReactNode;
    color: string;
  };
  rightAction?: {
    label: string;
    icon: React.ReactNode;
    color: string;
  };
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className = '',
}) => {
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const elementRef = useSwipeGesture({
    onSwipeLeft: () => {
      if (leftAction) {
        triggerAction('left');
      }
      onSwipeLeft?.();
    },
    onSwipeRight: () => {
      if (rightAction) {
        triggerAction('right');
      }
      onSwipeRight?.();
    },
    threshold: 100,
    preventDefault: true,
  });

  const triggerAction = (direction: 'left' | 'right') => {
    setIsAnimating(true);
    const targetOffset = direction === 'left' ? -100 : 100;
    setOffset(targetOffset);
    
    // Reset after animation
    setTimeout(() => {
      setOffset(0);
      setIsAnimating(false);
    }, 200);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;
    
    // Handle manual swipe tracking
    // Implementation would track touch position and update offset
  };

  return (
    <div className={\`swipeable-card-container \${className}\`}>
      {/* Left action background */}
      {leftAction && (
        <div 
          className="swipe-action swipe-action--left"
          style={{ backgroundColor: leftAction.color }}
        >
          <div className="swipe-action__content">
            {leftAction.icon}
            <span>{leftAction.label}</span>
          </div>
        </div>
      )}
      
      {/* Right action background */}
      {rightAction && (
        <div 
          className="swipe-action swipe-action--right"
          style={{ backgroundColor: rightAction.color }}
        >
          <div className="swipe-action__content">
            {rightAction.icon}
            <span>{rightAction.label}</span>
          </div>
        </div>
      )}
      
      {/* Card content */}
      <div
        ref={elementRef}
        className="swipeable-card"
        style={{
          transform: \`translateX(\${offset}px)\`,
          transition: isAnimating ? 'transform 0.2s ease' : 'none',
        }}
        onTouchMove={handleTouchMove}
      >
        {children}
      </div>
    </div>
  );
};
\`\`\`

**Touch-Friendly Modal**
\`\`\`typescript
// components/TouchModal.tsx
import { useEffect, useRef } from 'react';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

interface TouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  fullScreen?: boolean;
}

const TouchModal: React.FC<TouchModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  fullScreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Swipe down to close on mobile
  const { ref: swipeRef } = useSwipeGesture({
    onSwipeDown: onClose,
    threshold: 100,
    preventDefault: true,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus management for accessibility
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: fullScreen ? 'stretch' : 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: fullScreen ? 0 : '1rem',
      }}
    >
      <div
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        style={{
          backgroundColor: 'white',
          borderRadius: fullScreen ? 0 : '0.75rem',
          width: fullScreen ? '100%' : '100%',
          maxWidth: fullScreen ? 'none' : '500px',
          height: fullScreen ? '100%' : 'auto',
          maxHeight: fullScreen ? 'none' : '90vh',
          overflow: 'auto',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        {title && (
          <div className="modal-header" style={{ 
            padding: '1rem',
            borderBottom: '1px solid #e5e5e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h2 className="modal-title" style={{ margin: 0 }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="modal-close"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
        )}
        
        <div ref={swipeRef} className="modal-body" style={{ padding: '1rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
\`\`\`

### Touch Accessibility

**Accessibility Considerations**
\`\`\`typescript
// utils/touchAccessibility.ts
export const ensureTouchAccessibility = (element: HTMLElement) => {
  // Ensure minimum touch target size
  const rect = element.getBoundingClientRect();
  const minSize = 44;
  
  if (rect.height < minSize || rect.width < minSize) {
    element.style.minHeight = \`\${minSize}px\`;
    element.style.minWidth = \`\${minSize}px\`;
  }
  
  // Add touch-friendly padding
  element.style.padding = '0.5rem';
  
  // Ensure proper focus styles for keyboard navigation
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid var(--color-primary-500)';
    element.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', () => {
    element.style.outline = '';
    element.style.outlineOffset = '';
  });
};

// Screen reader support for touch gestures
export const announceTouchAction = (action: string, target: string) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const announcement = \`\${action} on \${target}\`;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(announcement));
  }
};
\`\`\`

### Performance Optimization

**Touch Performance Considerations**
\`\`\`css
/* Optimize touch performance */
.touch-optimized {
  /* Enable hardware acceleration */
  transform: translateZ(0);
  will-change: transform;
  
  /* Smooth scrolling */
  -webkit-overflow-scrolling: touch;
  
  /* Disable text selection for better touch experience */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  /* Remove tap highlights */
  -webkit-tap-highlight-color: transparent;
}

/* Passive touch listeners for better performance */
.touch-listener {
  /* Use passive listeners where appropriate */
  touch-action: manipulation;
}

/* Optimize animations for touch */
@media (prefers-reduced-motion: reduce) {
  .touch-interactive {
    transition: none;
  }
  
  .touch-interactive:active {
    transform: none;
  }
}
\`\`\`

**Touch Event Optimization**
\`\`\`typescript
// hooks/useOptimizedTouch.ts
import { useCallback, useRef } from 'react';

export const useOptimizedTouch = () => {
  const lastTouchTime = useRef(0);
  const touchThreshold = 16; // ~60fps

  const optimizedTouchHandler = useCallback((handler: (e: TouchEvent) => void) => {
    return (e: TouchEvent) => {
      const now = Date.now();
      
      // Throttle touch events to prevent excessive processing
      if (now - lastTouchTime.current < touchThreshold) {
        return;
      }
      
      lastTouchTime.current = now;
      
      // Use passive listeners for better scroll performance
      if (e.cancelable) {
        e.preventDefault();
      }
      
      handler(e);
    };
  }, []);

  return { optimizedTouchHandler };
};
\`\`\`

### Touch Testing

**Touch Interaction Testing**
\`\`\`typescript
// tests/touch-interactions.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SwipeableCard } from '../SwipeableCard';

describe('Touch Interactions', () => {
  test('responds to swipe gestures', () => {
    const onSwipeLeft = jest.fn();
    
    render(
      <SwipeableCard onSwipeLeft={onSwipeLeft}>
        <div>Test Card</div>
      </SwipeableCard>
    );
    
    const card = screen.getByText('Test Card').closest('[data-testid="swipeable-card"]');
    
    // Simulate swipe left
    fireEvent.touchStart(card!, {
      touches: [{ clientX: 200, clientY: 100 }],
    });
    
    fireEvent.touchEnd(card!, {
      changedTouches: [{ clientX: 100, clientY: 100 }],
    });
    
    expect(onSwipeLeft).toHaveBeenCalled();
  });

  test('meets minimum touch target size', () => {
    render(
      <button className="touch-target">
        <span>Test Button</span>
      </button>
    );
    
    const button = screen.getByRole('button');
    const styles = window.getComputedStyle(button);
    
    expect(parseFloat(styles.minHeight)).toBeGreaterThanOrEqual(44);
    expect(parseFloat(styles.minWidth)).toBeGreaterThanOrEqual(44);
  });

  test('provides visual feedback on touch', () => {
    render(
      <div className="touch-interactive">
        Interactive Element
      </div>
    );
    
    const element = screen.getByText('Interactive Element');
    
    // Simulate touch start
    fireEvent.touchStart(element);
    
    // Check for active state styles (would need actual implementation)
    // This is a simplified example
    expect(element).toHaveClass('touch-interactive');
  });
});
\`\`\``
    },
    {
      id: "performance",
      title: "Performance Optimization",
      content: `Performance optimization is crucial for responsive design, ensuring that all devices, especially mobile devices with limited resources, can load and interact with CareerForge quickly and smoothly.

### Performance Philosophy

Our responsive performance approach ensures:

- **Progressive Loading**: Critical content loads first, enhancements follow
- **Device-Aware Optimization**: Different strategies for different device capabilities
- **Efficient Resource Management**: Minimal data transfer and processing
- **Smooth Interactions**: 60fps animations and responsive feedback
- **Battery Conscious**: Efficient code that preserves device battery life

### Critical Rendering Path Optimization

**Critical CSS Strategy**
\`\`\`html
<!-- Inline critical CSS for above-the-fold content -->
<style>
  /* Critical CSS for initial page render */
  .header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: white;
    border-bottom: 1px solid #e5e5e5;
  }
  
  .hero {
    padding: 2rem 1rem;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .job-card {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
</style>

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-image.jpg" as="image">

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
\`\`\`

**Resource Prioritization**
\`\`\`html
<!-- Critical resources with high priority -->
<link rel="preconnect" href="https://api.careerforge.com">
<link rel="dns-prefetch" href="https://cdn.careerforge.com">

<!-- Progressive image loading -->
<img 
  src="hero-mobile.jpg"
  srcset="
    hero-mobile-320w.jpg 320w,
    hero-mobile-480w.jpg 480w,
    hero-mobile-640w.jpg 640w
  "
  sizes="(max-width: 640px) 100vw, 50vw"
  alt="CareerForge Hero"
  loading="eager"
  fetchpriority="high"
>

<!-- Lazy loaded images -->
<img 
  src="placeholder.jpg"
  data-src="content-image.jpg"
  alt="Content Image"
  loading="lazy"
  decoding="async"
>
\`\`\`

### JavaScript Optimization

**Progressive Enhancement**
\`\`\`typescript
// utils/progressiveEnhancement.ts
export const loadProgressiveFeatures = async () => {
  // Load features based on device capabilities
  const capabilities = await detectDeviceCapabilities();
  
  const features = [];
  
  // Always load core features
  features.push(import('./core-features'));
  
  // Load advanced features for capable devices
  if (capabilities.hasServiceWorker) {
    features.push(import('./service-worker'));
  }
  
  if (capabilities.hasIntersectionObserver) {
    features.push(import('./intersection-features'));
  }
  
  if (capabilities.isHighEndDevice) {
    features.push(import('./advanced-animations'));
  }
  
  // Execute feature loading in parallel
  await Promise.all(features);
};

const detectDeviceCapabilities = async () => {
  const [hasServiceWorker, hasIntersectionObserver] = await Promise.all([
    'serviceWorker' in navigator,
    'IntersectionObserver' in window,
  ]);
  
  // Detect device performance tier
  const isHighEndDevice = await detectPerformanceTier();
  
  return {
    hasServiceWorker,
    hasIntersectionObserver,
    isHighEndDevice,
    connectionSpeed: detectConnectionSpeed(),
  };
};

const detectPerformanceTier = async (): Promise<boolean> => {
  // Use device memory and hardware concurrency as indicators
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  return deviceMemory >= 4 && hardwareConcurrency >= 4;
};

const detectConnectionSpeed = (): 'slow' | 'fast' => {
  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    return effectiveType === '4g' || effectiveType === 'wifi' ? 'fast' : 'slow';
  }
  return 'fast'; // Default assumption
};
\`\`\`

**Code Splitting by Device**
\`\`\`typescript
// components/LazyLoad.tsx
import { lazy, Suspense } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

// Mobile-optimized components
const MobileJobList = lazy(() => import('./mobile/MobileJobList'));
const MobileSearch = lazy(() => import('./mobile/MobileSearch'));

// Desktop-optimized components  
const DesktopJobList = lazy(() => import('./desktop/DesktopJobList'));
const DesktopSearch = lazy(() => import('./desktop/DesktopSearch'));

// Tablet-optimized components
const TabletJobList = lazy(() => import('./tablet/TabletJobList'));
const TabletSearch = lazy(() => import('./tablet/TabletSearch'));

interface ResponsiveJobInterfaceProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const ResponsiveJobInterface: React.FC<ResponsiveJobInterfaceProps> = ({
  searchQuery,
  onSearch,
}) => {
  const breakpoint = useBreakpoint();
  
  const getJobListComponent = () => {
    switch (breakpoint) {
      case 'mobile':
        return MobileJobList;
      case 'tablet':
        return TabletJobList;
      case 'desktop':
      case 'wide':
      default:
        return DesktopJobList;
    }
  };
  
  const getSearchComponent = () => {
    switch (breakpoint) {
      case 'mobile':
        return MobileSearch;
      case 'tablet':
        return TabletSearch;
      case 'desktop':
      case 'wide':
      default:
        return DesktopSearch;
    }
  };
  
  const JobListComponent = getJobListComponent();
  const SearchComponent = getSearchComponent();
  
  return (
    <div className="responsive-job-interface">
      <Suspense fallback={<JobListSkeleton breakpoint={breakpoint} />}>
        <SearchComponent 
          query={searchQuery}
          onSearch={onSearch}
        />
      </Suspense>
      
      <Suspense fallback={<JobListSkeleton breakpoint={breakpoint} />}>
        <JobListComponent />
      </Suspense>
    </div>
  );
};

const JobListSkeleton: React.FC<{ breakpoint: string }> = ({ breakpoint }) => {
  const skeletonClass = breakpoint === 'mobile' 
    ? 'skeleton skeleton--mobile' 
    : 'skeleton skeleton--desktop';
    
  return (
    <div className={skeletonClass}>
      {Array.from({ length: breakpoint === 'mobile' ? 3 : 6 }).map((_, i) => (
        <div key={i} className="job-card-skeleton">
          <div className="skeleton skeleton--text" />
          <div className="skeleton skeleton--text" />
          <div className="skeleton skeleton--button" />
        </div>
      ))}
    </div>
  );
};
\`\`\`

### CSS Performance Optimization

**Critical CSS Extraction**
\`\`\`css
/* Critical CSS - loaded inline */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
}

.nav {
  display: flex;
  gap: 1rem;
}

.hero {
  padding: 2rem 1rem;
  text-align: center;
}

/* Non-critical CSS - loaded asynchronously */
/* This would be in a separate file loaded after page load */

/* Optimize rendering performance */
.job-card {
  contain: layout style;
  content-visibility: auto;
  contain-intrinsic-size: 300px;
}

/* Efficient animations */
.animate-smooth {
  will-change: transform, opacity;
  transform: translateZ(0); /* Hardware acceleration */
}

/* Reduce layout thrashing */
.flex-container {
  display: flex;
  gap: 1rem;
}

.flex-item {
  flex: 1;
  min-width: 0; /* Prevent flex item overflow */
}
\`\`\`

**Container Queries Performance**
\`\`\`css
/* Optimize container queries */
@container (min-width: 300px) {
  .responsive-component {
    /* Container-specific styles */
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
  .responsive-component {
    /* Media query fallback */
    display: block;
  }
  
  @media (min-width: 768px) {
    .responsive-component {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
    }
  }
}
\`\`\`

### Image Optimization

**Progressive Image Loading**
\`\`\`typescript
// components/ProgressiveImage.tsx
import { useState, useRef, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  srcSet,
  sizes,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=',
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={\`progressive-image \${className}\`}>
      {/* Placeholder */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className="progressive-image__placeholder"
      />
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          onLoad={handleLoad}
          className={\`progressive-image__actual \${isLoaded ? 'progressive-image__loaded' : ''}\`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};
\`\`\`

**WebP with Fallback**
\`\`\`html
<!-- Responsive images with modern format support -->
<picture>
  <!-- AVIF format (best compression) -->
  <source 
    type="image/avif" 
    srcset="
      image-320w.avif 320w,
      image-480w.avif 480w,
      image-640w.avif 640w,
      image-768w.avif 768w,
      image-1024w.avif 1024w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
  >
  
  <!-- WebP format (good compression) -->
  <source 
    type="image/webp" 
    srcset="
      image-320w.webp 320w,
      image-480w.webp 480w,
      image-640w.webp 640w,
      image-768w.webp 768w,
      image-1024w.webp 1024w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
  >
  
  <!-- Fallback JPEG -->
  <img 
    src="image-640w.jpg"
    srcset="
      image-320w.jpg 320w,
      image-480w.jpg 480w,
      image-640w.jpg 640w,
      image-768w.jpg 768w,
      image-1024w.jpg 1024w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
    alt="Responsive image example"
    loading="lazy"
    decoding="async"
  >
</picture>
\`\`\`

### Network-Aware Loading

**Connection-Aware Resource Loading**
\`\`\`typescript
// utils/networkAware.ts
interface NetworkInfo {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export const getNetworkInfo = (): NetworkInfo | null => {
  const connection = (navigator as any).connection;
  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  return null;
};

export const shouldLoadHighQualityImages = (): boolean => {
  const network = getNetworkInfo();
  
  if (!network) return true; // Default to high quality
  
  // Don't load high quality images on slow connections
  if (network.saveData) return false;
  if (network.effectiveType === 'slow-2g' || network.effectiveType === '2g') {
    return false;
  }
  
  return true;
};

export const getOptimalImageQuality = (): 'low' | 'medium' | 'high' => {
  const network = getNetworkInfo();
  
  if (!network) return 'high';
  
  switch (network.effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'low';
    case '3g':
      return 'medium';
    case '4g':
    default:
      return 'high';
  }
};

// Usage in image component
const NetworkAwareImage: React.FC<ImageProps> = (props) => {
  const quality = getOptimalImageQuality();
  
  const getSrcSet = () => {
    const baseSrc = props.src;
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    switch (quality) {
      case 'low':
        return \`\${baseName}-320w.\${extension} 320w, \${baseName}-480w.\${extension} 480w\`;
      case 'medium':
        return \`\${baseName}-480w.\${extension} 480w, \${baseName}-640w.\${extension} 640w, \${baseName}-768w.\${extension} 768w\`;
      case 'high':
      default:
        return \`\${baseName}-640w.\${extension} 640w, \${baseName}-768w.\${extension} 768w, \${baseName}-1024w.\${extension} 1024w, \${baseName}-1440w.\${extension} 1440w\`;
    }
  };
  
  return (
    <img
      {...props}
      srcSet={getSrcSet()}
      loading={quality === 'low' ? 'eager' : 'lazy'}
    />
  );
};
\`\`\`

### Performance Monitoring

**Core Web Vitals Tracking**
\`\`\`typescript
// utils/performanceMonitoring.ts
export const trackCoreWebVitals = () => {
  // Largest Contentful Paint (LCP)
  const trackLCP = (callback: (value: number) => void) => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      callback(lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const trackFID = (callback: (value: number) => void) => {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        callback((entry as any).processingStart - entry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const trackCLS = (callback: (value: number) => void) => {
    let clsValue = 0;
    
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          callback(clsValue);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  };

  // Track responsive performance
  const trackResponsivePerformance = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const deviceMemory = (navigator as any).deviceMemory || 'unknown';
    const connection = (navigator as any).connection;
    
    return {
      // Timing metrics
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      
      // Device capabilities
      deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
      
      // Network information
      connectionType: connection?.effectiveType,
      downlink: connection?.downlink,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
    };
  };

  return {
    trackLCP,
    trackFID,
    trackCLS,
    trackResponsivePerformance,
  };
};

// Usage in analytics
export const initializePerformanceTracking = () => {
  const { trackLCP, trackFID, trackCLS, trackResponsivePerformance } = trackCoreWebVitals();
  
  trackLCP((value) => {
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        metric_name: 'LCP',
        metric_value: Math.round(value),
      });
    }
  });
  
  // Track responsive performance on page load
  const responsiveMetrics = trackResponsivePerformance();
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'responsive_performance', responsiveMetrics);
  }
};
\`\`\`

### Performance Testing

**Performance Budget Testing**
\`\`\`typescript
// tests/performance.test.ts
describe('Responsive Performance', () => {
  const performanceBudgets = {
    'First Contentful Paint': 1800, // 1.8s
    'Largest Contentful Paint': 2500, // 2.5s
    'First Input Delay': 100, // 100ms
    'Cumulative Layout Shift': 0.1,
    'Total Blocking Time': 300, // 300ms
  };

  test('meets performance budgets on mobile', async () => {
    // Simulate mobile device
    await page.setViewport({ width: 375, height: 667 });
    
    const navigationPromise = page.waitForNavigation();
    await page.goto('/jobs');
    await navigationPromise;
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          resolve(list.getEntries());
        }).observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input'] });
      });
    });
    
    // Verify performance metrics meet budgets
    // Implementation would parse metrics and assert against budgets
  });

  test('loads efficiently on slow connections', async () => {
    // Simulate slow 3G connection
    await page.setOffline(true);
    await page.setViewport({ width: 375, height: 667 });
    
    await page.goto('/jobs');
    
    // Check that critical content loads first
    const heroVisible = await page.waitForSelector('[data-testid="hero"]', { visible: true, timeout: 5000 });
    expect(heroVisible).toBeTruthy();
    
    // Check that non-critical content loads after
    const sidebarVisible = await page.waitForSelector('[data-testid="sidebar"]', { visible: true, timeout: 10000 });
    expect(sidebarVisible).toBeTruthy();
  });
});
\`\`\``
    },
    {
      id: "testing-strategies",
      title: "Testing Strategies",
      content: `Comprehensive testing ensures that responsive design works correctly across all devices and screen sizes. CareerForge implements a multi-layered testing strategy that covers functional, visual, and performance aspects of responsive design.

### Testing Philosophy

Our responsive testing approach ensures:

- **Real Device Testing**: Testing on actual devices, not just browser emulation
- **Cross-Browser Compatibility**: Consistent behavior across different browsers
- **Performance Validation**: Ensuring responsive design doesn't impact performance
- **Accessibility Testing**: Verifying accessibility across all breakpoints
- **Continuous Integration**: Automated testing as part of development workflow

### Device Testing Matrix

**Supported Device Matrix**
\`\`\`typescript
// testing/deviceMatrix.ts
export interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  pixelRatio: number;
  userAgent: string;
  category: 'mobile' | 'tablet' | 'desktop';
}

export const deviceMatrix: DeviceConfig[] = [
  // Mobile devices
  {
    name: 'iPhone SE',
    width: 320,
    height: 568,
    pixelRatio: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    category: 'mobile',
  },
  {
    name: 'iPhone 8',
    width: 375,
    height: 667,
    pixelRatio: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    category: 'mobile',
  },
  {
    name: 'iPhone 11',
    width: 414,
    height: 896,
    pixelRatio: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    category: 'mobile',
  },
  
  // Tablet devices
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    pixelRatio: 2,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    category: 'tablet',
  },
  {
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    pixelRatio: 2,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    category: 'tablet',
  },
  
  // Desktop devices
  {
    name: 'MacBook Pro',
    width: 1440,
    height: 900,
    pixelRatio: 2,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    category: 'desktop',
  },
  {
    name: 'Desktop HD',
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    category: 'desktop',
  },
  {
    name: 'Desktop 4K',
    width: 2560,
    height: 1440,
    pixelRatio: 1,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    category: 'desktop',
  },
];
\`\`\`

### Visual Regression Testing

**Responsive Visual Tests**
\`\`\`typescript
// tests/visualRegression.test.ts
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('Responsive Visual Regression', () => {
  const viewports = [
    { width: 320, height: 568, name: 'mobile-small' },
    { width: 375, height: 667, name: 'mobile-standard' },
    { width: 414, height: 896, name: 'mobile-large' },
    { width: 768, height: 1024, name: 'tablet-portrait' },
    { width: 1024, height: 768, name: 'tablet-landscape' },
    { width: 1440, height: 900, name: 'desktop-standard' },
    { width: 1920, height: 1080, name: 'desktop-hd' },
  ];

  viewports.forEach(({ width, height, name }) => {
    describe(\`\${name} (\${width}x\${height})\`, () => {
      beforeEach(async () => {
        await page.setViewport({ width, height });
      });

      test('job search page renders correctly', async () => {
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        
        const screenshot = await page.screenshot({
          fullPage: true,
          omitBackground: false,
        });
        
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: \`jobs-page-\${name}\`,
        });
      });

      test('job card layout adapts correctly', async () => {
        await page.goto('/jobs');
        await page.waitForLoadState('networkidle');
        
        // Check grid layout
        const grid = await page.$('[data-testid="job-grid"]');
        const gridBoundingBox = await grid?.boundingBox();
        
        expect(gridBoundingBox?.width).toBeLessThanOrEqual(width - 32); // Account for padding
        
        // Take screenshot for visual verification
        const screenshot = await page.screenshot({
          fullPage: false,
          omitBackground: false,
        });
        
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: \`job-grid-\${name}\`,
        });
      });

      test('navigation adapts to screen size', async () => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        const navigation = await page.$('[data-testid="main-navigation"]');
        
        if (width < 768) {
          // Mobile: Should show hamburger menu
          const menuButton = await page.$('[data-testid="mobile-menu-button"]');
          expect(menuButton).toBeTruthy();
          
          // Desktop navigation should be hidden
          const desktopNav = await page.$('[data-testid="desktop-navigation"]');
          expect(desktopNav).toBeFalsy();
        } else {
          // Desktop: Should show full navigation
          const desktopNav = await page.$('[data-testid="desktop-navigation"]');
          expect(desktopNav).toBeTruthy();
        }
        
        const screenshot = await page.screenshot({
          fullPage: false,
          omitBackground: false,
        });
        
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: \`navigation-\${name}\`,
        });
      });
    });
  });
});
\`\`\`

### Functional Testing

**Responsive Function Tests**
\`\`\`typescript
// tests/responsiveFunctionality.test.ts
describe('Responsive Functionality', () => {
  test('touch interactions work on mobile', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('/jobs');
    
    // Test swipe gesture on job cards
    const jobCard = await page.$('[data-testid="job-card"]:first-child');
    const cardBoundingBox = await jobCard?.boundingBox();
    
    if (cardBoundingBox) {
      // Simulate swipe left
      await page.touchscreen.tap(cardBoundingBox.x + cardBoundingBox.width - 50, cardBoundingBox.y + cardBoundingBox.height / 2);
      
      // Check if swipe action triggered
      const swipeAction = await page.$('[data-testid="swipe-action"]');
      expect(swipeAction).toBeTruthy();
    }
  });

  test('keyboard navigation works at all breakpoints', async () => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const { width, height } of viewports) {
      await page.setViewport({ width, height });
      await page.goto('/jobs');
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
      
      // Continue tabbing through interactive elements
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        // Verify focus is visible
        const focusVisible = await page.evaluate(() => {
          const activeElement = document.activeElement as HTMLElement;
          return activeElement && window.getComputedStyle(activeElement).outline !== 'none';
        });
        expect(focusVisible).toBeTruthy();
      }
    }
  });

  test('forms adapt correctly across breakpoints', async () => {
    await page.goto('/profile/edit');
    
    const testFormLayout = async (width: number, height: number) => {
      await page.setViewport({ width, height });
      
      const form = await page.$('[data-testid="profile-form"]');
      const formBoundingBox = await form?.boundingBox();
      
      if (width < 768) {
        // Mobile: Single column layout
        const formFields = await page.$$('[data-testid="form-field"]');
        for (const field of formFields) {
          const fieldBox = await field.boundingBox();
          expect(fieldBox?.width).toBeLessThanOrEqual(width - 32);
        }
      } else {
        // Desktop: Multi-column layout possible
        const formFields = await page.$$('[data-testid="form-field"]');
        expect(formFields.length).toBeGreaterThan(0);
      }
    };
    
    await testFormLayout(375, 667);
    await testFormLayout(768, 1024);
    await testFormLayout(1440, 900);
  });
});
\`\`\`

### Performance Testing

**Responsive Performance Tests**
\`\`\`typescript
// tests/responsivePerformance.test.ts
describe('Responsive Performance', () => {
  test('page loads quickly on mobile', async () => {
    await page.setViewport({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Mobile page load should be under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries.find(entry => entry.entryType === 'largest-contentful-paint');
          resolve({ lcp: lcp?.startTime });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    expect(metrics.lcp).toBeLessThan(2500); // LCP under 2.5s
  });

  test('images load appropriately for screen size', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('/jobs');
    
    // Check that mobile-sized images are loaded
    const jobImages = await page.$$('[data-testid="job-card"] img');
    
    for (const img of jobImages) {
      const src = await img.getAttribute('src');
      const srcset = await img.getAttribute('srcset');
      
      // Should have responsive srcset
      expect(srcset).toBeTruthy();
      
      // Mobile viewport should load smaller images
      if (srcset) {
        const sources = srcset.split(',').map(s => s.trim());
        const smallestSource = sources[0];
        const widthMatch = smallestSource.match(/(\d+)w/);
        
        if (widthMatch) {
          const width = parseInt(widthMatch[1]);
          expect(width).toBeLessThanOrEqual(640); // Mobile-appropriate image size
        }
      }
    }
  });

  test('animations are smooth at 60fps', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('/jobs');
    
    // Start performance monitoring
    await page.evaluate(() => {
      (window as any).frameTimes = [];
      
      function measureFPS() {
        (window as any).frameTimes.push(performance.now());
        if ((window as any).frameTimes.length > 60) {
          (window as any).frameTimes.shift();
        }
        requestAnimationFrame(measureFPS);
      }
      
      requestAnimationFrame(measureFPS);
    });
    
    // Trigger animations
    await page.hover('[data-testid="job-card"]:first-child');
    await page.waitForTimeout(1000);
    
    // Check frame rate
    const frameTimes = await page.evaluate(() => (window as any).frameTimes);
    
    if (frameTimes.length > 1) {
      const intervals = [];
      for (let i = 1; i < frameTimes.length; i++) {
        intervals.push(frameTimes[i] - frameTimes[i - 1]);
      }
      
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const fps = 1000 / avgInterval;
      
      expect(fps).toBeGreaterThan(30); // At least 30fps
    }
  });
});
\`\`\`

### Accessibility Testing

**Responsive Accessibility Tests**
\`\`\`typescript
// tests/responsiveAccessibility.test.ts
import AxeBuilder from '@axe-core/playwright';

describe('Responsive Accessibility', () => {
  const accessibilityViewports = [
    { width: 320, height: 568, name: 'mobile-small' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' },
  ];

  accessibilityViewports.forEach(({ width, height, name }) => {
    test(\`meets WCAG standards at \${name} viewport\`, async () => {
      await page.setViewport({ width, height });
      await page.goto('/jobs');
      await page.waitForLoadState('networkidle');
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(\`touch targets meet minimum size requirements at \${name} viewport\`, async () => {
      await page.setViewport({ width, height });
      await page.goto('/jobs');
      
      const touchTargets = await page.$$('[role="button"], button, a, input[type="checkbox"], input[type="radio"]');
      
      for (const target of touchTargets) {
        const boundingBox = await target.boundingBox();
        
        if (boundingBox) {
          expect(boundingBox.height).toBeGreaterThanOrEqual(44);
          expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test(\`text remains readable at \${name} viewport\`, async () => {
      await page.setViewport({ width, height });
      await page.goto('/jobs');
      
      // Check font sizes
      const bodyText = await page.$$eval('p, span, div', elements => 
        elements.map(el => window.getComputedStyle(el).fontSize)
      );
      
      // All text should be at least 16px (1rem)
      bodyText.forEach(fontSize => {
        const size = parseFloat(fontSize);
        expect(size).toBeGreaterThanOrEqual(16);
      });
      
      // Check color contrast
      const textElements = await page.$$('p, h1, h2, h3, h4, h5, h6, span');
      
      for (const element of textElements) {
        const color = await element.evaluate(el => window.getComputedStyle(el).color);
        const backgroundColor = await element.evaluate(el => {
          let el = el;
          while (el && el !== document.body) {
            const bg = window.getComputedStyle(el).backgroundColor;
            if (bg && bg !== 'rgba(0, 0, 0, 0)') return bg;
            el = el.parentElement;
          }
          return 'white';
        });
        
        // This is a simplified check - in practice, you'd use a proper contrast calculator
        expect(color).toBeTruthy();
        expect(backgroundColor).toBeTruthy();
      }
    });
  });
});
\`\`\`

### Continuous Integration Testing

**GitHub Actions Workflow**
\`\`\`yaml
# .github/workflows/responsive-tests.yml
name: Responsive Design Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  responsive-tests:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        device:
          - name: "Mobile iPhone SE"
            width: 320
            height: 568
          - name: "Mobile iPhone 8"
            width: 375
            height: 667
          - name: "Tablet iPad"
            width: 768
            height: 1024
          - name: "Desktop HD"
            width: 1440
            height: 900
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Install Playwright
      run: npx playwright install --with-deps
    
    - name: Run responsive tests
      run: npx playwright test --project="${{ matrix.device.name }}"
      env:
        DEVICE_WIDTH: ${{ matrix.device.width }}
        DEVICE_HEIGHT: ${{ matrix.device.height }}
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: playwright-results-${{ matrix.device.name }}
        path: |
          test-results/
          playwright-report/
    
  visual-regression:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright
      run: npx playwright install --with-deps
    
    - name: Run visual regression tests
      run: npx playwright test --project="visual-regression"
    
    - name: Upload visual regression results
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: visual-regression-results
        path: test-results/visual-regression/
\`\`\`

**Playwright Configuration**
\`\`\`typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // Mobile devices
    {
      name: 'Mobile iPhone SE',
      use: { 
        ...devices['iPhone SE'],
        viewport: { width: 320, height: 568 },
      },
    },
    {
      name: 'Mobile iPhone 8',
      use: { 
        ...devices['iPhone 8'],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'Mobile iPhone 11',
      use: { 
        ...devices['iPhone 11'],
        viewport: { width: 414, height: 896 },
      },
    },
    
    // Tablet devices
    {
      name: 'iPad',
      use: { 
        ...devices['iPad'],
        viewport: { width: 768, height: 1024 },
      },
    },
    
    // Desktop devices
    {
      name: 'Desktop HD',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    
    // Visual regression tests
    {
      name: 'visual-regression',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.visual\.spec\.ts/,
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
\`\`\``
    },
    {
      id: "best-practices",
      title: "Best Practices",
      content: `Implementing responsive design effectively requires following established best practices that ensure optimal user experiences across all devices while maintaining code quality and performance.

### Implementation Best Practices

#### Mobile-First Development
\`\`\`css
/* Always start with mobile styles */
.component {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

/* Progressive enhancement for larger screens */
@media (min-width: 768px) {
  .component {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .component {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
\`\`\`

**Key Mobile-First Principles:**
- Start with the smallest viewport and work up
- Use min-width media queries for progressive enhancement
- Ensure touch targets are at least 44x44 pixels
- Prioritize content hierarchy for small screens
- Test on actual mobile devices, not just browser emulation

#### Semantic HTML Structure
\`\`\`html
<!-- Semantic HTML that works across all devices -->
<main>
  <header role="banner">
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/jobs">Browse Jobs</a></li>
        <li><a href="/applications">My Applications</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </nav>
  </header>
  
  <article role="main">
    <h1>Job Listings</h1>
    <section aria-labelledby="job-results">
      <h2 id="job-results">Available Positions</h2>
      <!-- Job cards -->
    </section>
  </article>
  
  <aside role="complementary" aria-label="Search filters">
    <!-- Sidebar content -->
  </aside>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</main>
\`\`\`

**Semantic Structure Benefits:**
- Screen readers can navigate effectively on all devices
- Search engines understand content hierarchy
- Content is accessible without CSS
- Progressive enhancement works naturally
- Accessibility tools function correctly

#### Flexible Layout Systems
\`\`\`css
/* Use modern layout systems */
.flex-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 280px; /* Grow, shrink, minimum width */
  min-width: 0; /* Prevent overflow */
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Responsive utilities */
.responsive-hide {
  display: block;
}

@media (max-width: 767px) {
  .responsive-hide {
    display: none;
  }
}

.responsive-show {
  display: none;
}

@media (max-width: 767px) {
  .responsive-show {
    display: block;
  }
}
\`\`\`

#### Performance Optimization
\`\`\`css
/* Optimize for performance */
.optimized-component {
  /* Enable hardware acceleration */
  transform: translateZ(0);
  will-change: transform;
  
  /* Efficient animations */
  transition: transform 0.2s ease;
  
  /* Prevent layout thrashing */
  contain: layout style;
  
  /* Content visibility optimization */
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}

/* Optimize images */
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  loading: lazy;
  decoding: async;
}
\`\`\`

### Design Best Practices

#### Typography Responsiveness
\`\`\`css
/* Fluid typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
  margin-bottom: clamp(1rem, 2vw, 2rem);
}

.body-text {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .animated-text {
    transition: none;
    animation: none;
  }
}

@media (prefers-color-scheme: dark) {
  .text {
    color: var(--color-text-dark);
  }
}
\`\`\`

#### Touch-Friendly Interactions
\`\`\`css
/* Touch target optimization */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem;
  margin: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Touch feedback */
.touch-interactive {
  transition: all 0.15s ease;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.touch-interactive:active {
  transform: scale(0.98);
  background-color: var(--color-primary-100);
}

/* Focus styles for keyboard navigation */
.touch-interactive:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
\`\`\`

### Development Best Practices

#### Component Architecture
\`\`\`typescript
// Reusable responsive component
interface ResponsiveProps {
  mobile: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  fallback?: React.ReactNode;
}

const ResponsiveComponent: React.FC<ResponsiveProps> = ({
  mobile,
  tablet,
  desktop,
  fallback,
}) => {
  const breakpoint = useBreakpoint();
  
  switch (breakpoint) {
    case 'mobile':
      return <>{mobile}</>;
    case 'tablet':
      return <>{tablet || mobile}</>;
    case 'desktop':
    case 'wide':
      return <>{desktop || tablet || mobile}</>;
    default:
      return <>{fallback || mobile}</>;
  }
};

// Usage
<ResponsiveComponent
  mobile={<MobileJobCard />}
  tablet={<TabletJobCard />}
  desktop={<DesktopJobCard />}
/>
\`\`\`

#### CSS Architecture
\`\`\`css
/* Use CSS custom properties for consistency */
:root {
  --space-unit: 0.25rem;
  --space-xs: calc(var(--space-unit) * 1);
  --space-sm: calc(var(--space-unit) * 2);
  --space-md: calc(var(--space-unit) * 4);
  --space-lg: calc(var(--space-unit) * 6);
  --space-xl: calc(var(--space-unit) * 8);
  
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
}

/* Component-scoped CSS */
.component-scoped {
  padding: var(--space-md);
  background: var(--color-primary-50);
  border-radius: var(--border-radius-md);
}

/* Responsive utilities */
@media (max-width: 640px) {
  .sm\:hidden { display: none; }
  .sm\:block { display: block; }
  .sm\:flex { display: flex; }
}

@media (max-width: 768px) {
  .md\:hidden { display: none; }
  .md\:block { display: block; }
  .md\:flex { display: flex; }
}

@media (max-width: 1024px) {
  .lg\:hidden { display: none; }
  .lg\:block { display: block; }
  .lg\:flex { display: flex; }
}
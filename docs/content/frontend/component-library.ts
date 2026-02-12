import { PageContent } from '@/lib/content-types';

export const componentLibraryContent: PageContent = {
  metadata: {
    title: "Component Library",
    description: "Comprehensive guide to reusable UI components, design system implementation, and component architecture",
    version: "1.0.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Team"],
    tags: ["frontend", "components", "design-system", "ui", "react"],
    difficulty: "intermediate" as const,
    estimatedTime: 25
  },
  tableOfContents: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "design-system", title: "Design System Foundation", level: 2 },
    { id: "component-architecture", title: "Component Architecture", level: 2 },
    { id: "atomic-components", title: "Atomic Components", level: 2 },
    { id: "molecular-components", title: "Molecular Components", level: 2 },
    { id: "organism-components", title: "Organism Components", level: 2 },
    { id: "layout-components", title: "Layout Components", level: 2 },
    { id: "form-components", title: "Form Components", level: 2 },
    { id: "navigation-components", title: "Navigation Components", level: 2 },
    { id: "feedback-components", title: "Feedback Components", level: 2 },
    { id: "data-display", title: "Data Display Components", level: 2 },
    { id: "component-theming", title: "Component Theming", level: 2 },
    { id: "accessibility", title: "Accessibility Standards", level: 2 },
    { id: "testing-strategy", title: "Testing Strategy", level: 2 }
  ],
  introduction: {
    id: "introduction",
    title: "Component Library",
    content: `The CareerForge component library is a comprehensive, reusable UI component system built with modern React patterns and TypeScript. Designed following atomic design principles, it provides a solid foundation for building consistent, accessible, and maintainable user interfaces across the entire platform.

## Key Features

- **Atomic Design Methodology**: Systematic approach to component organization from atoms to organisms
- **TypeScript Integration**: Full type safety and IntelliSense support for all components
- **Theme System**: Comprehensive theming support with dark mode compatibility
- **Accessibility First**: WCAG 2.1 AA compliant components with full screen reader support
- **Responsive Design**: Mobile-first approach with breakpoint-aware components
- **Performance Optimized**: Lazy loading, memoization, and bundle size optimization
- **Storybook Integration**: Interactive component documentation and testing
- **Design Token System**: Centralized design tokens for colors, typography, spacing, and more
- **Component Variants**: Flexible variants and configuration options for all components
- **Internationalization**: Built-in i18n support for global deployment

## Architecture

The component library follows a hierarchical structure based on atomic design principles:

- **Atoms**: Basic building blocks (buttons, inputs, icons)
- **Molecules**: Simple combinations (search bar, form fields)
- **Organisms**: Complex UI sections (navigation, cards, modals)
- **Templates**: Page layouts and arrangements
- **Pages**: Full application pages

## Technology Stack

Built with modern web technologies and best practices:
- **React 18**: Latest React features including concurrent rendering
- **TypeScript**: Full type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form handling and validation
- **React Testing Library**: Comprehensive testing utilities
- **Storybook**: Component documentation and development

## Design Philosophy

The component library embodies CareerForge's design principles:

- **Consistency**: Uniform design language across all interfaces
- **Accessibility**: Inclusive design for all users
- **Performance**: Optimized for speed and efficiency
- **Scalability**: Architecture that grows with product needs
- **Maintainability**: Clean, documented, and testable code`
  },
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: `The CareerForge component library serves as the foundation for all user interface elements in the platform. It provides a standardized, consistent approach to building UI components while maintaining flexibility and extensibility.

### Library Structure

#### Component Organization
The component library is organized following atomic design principles to ensure scalability and maintainability.

**Directory Structure:**
\`\`\`
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   ├── molecules/       # Simple combinations
│   ├── organisms/       # Complex components
│   ├── templates/       # Layout components
│   └── pages/          # Full page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── styles/             # Global styles and themes
└── tokens/             # Design tokens
\`\`\`

#### Component Categories
Each component category serves a specific purpose in the design system:

**Atoms (Basic Elements)**
- Buttons, inputs, labels, icons
- Typography components
- Color and spacing utilities
- Form validation messages

**Molecules (Simple Combinations)**
- Search bars, form fields, cards
- Navigation items, breadcrumbs
- User avatars, tags, badges
- Progress indicators

**Organisms (Complex Components)**
- Navigation bars, sidebars
- Data tables, charts
- Modal dialogs, drawers
- Complex forms and workflows

**Templates (Layout Components)**
- Page layouts, grid systems
- Header/footer components
- Content containers
- Responsive breakpoints

### Design Principles

#### Consistency
All components follow established design patterns and conventions to ensure a cohesive user experience.

**Consistency Guidelines:**
- **Visual Consistency**: Uniform spacing, colors, and typography
- **Behavioral Consistency**: Predictable interactions and animations
- **Functional Consistency**: Standardized APIs and prop interfaces
- **Documentation Consistency**: Uniform component documentation

#### Accessibility
Accessibility is built into every component from the ground up, ensuring inclusive design for all users.

**Accessibility Features:**
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Logical focus flow and visual indicators
- **Alternative Text**: Descriptive alt text for all visual elements

#### Performance
Components are optimized for performance through careful architecture and modern React patterns.

**Performance Optimizations:**
- **Code Splitting**: Lazy loading of non-critical components
- **Memoization**: React.memo and useMemo for expensive operations
- **Virtual Scrolling**: Efficient rendering of large data sets
- **Bundle Optimization**: Tree shaking and minimal bundle sizes
- **Image Optimization**: Lazy loading and responsive images

### Component Development

#### Development Workflow
Standardized workflow for developing and maintaining components.

**Development Process:**
1. **Design Analysis**: Review design requirements and user stories
2. **Component Planning**: Define component API and props interface
3. **Implementation**: Build component with TypeScript and testing
4. **Documentation**: Create Storybook stories and documentation
5. **Testing**: Unit tests, integration tests, and accessibility testing
6. **Review**: Code review and design review process
7. **Publishing**: Version bump and release to component library

#### Code Standards
Established coding standards and conventions for component development.

**Code Standards:**
- **TypeScript**: Strict type checking and interfaces
- **ESLint & Prettier**: Code formatting and linting rules
- **Component Naming**: PascalCase for components, camelCase for props
- **File Organization**: Consistent file and folder structure
- **Import Conventions**: Standardized import and export patterns

#### Testing Strategy
Comprehensive testing approach to ensure component quality and reliability.

**Testing Coverage:**
- **Unit Tests**: Individual component functionality testing
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: Automated accessibility compliance testing
- **Visual Regression Tests**: Screenshot-based visual testing
- **Performance Tests**: Load time and runtime performance testing`
    },
    {
      id: "design-system",
      title: "Design System Foundation",
      content: `The design system foundation provides the core building blocks and design tokens that ensure consistency across all components in the CareerForge platform.

### Design Tokens

#### Color System
Comprehensive color system with semantic naming and accessibility considerations.

**Color Categories:**
- **Primary Colors**: Brand colors and primary actions
- **Secondary Colors**: Supporting colors and secondary actions
- **Neutral Colors**: Grays for text, backgrounds, and borders
- **Semantic Colors**: Success, warning, error, and info colors
- **Background Colors**: Surface colors for light and dark themes

**Implementation:**
\`\`\`typescript
// tokens/colors.ts
export const colors = {
  // Primary brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Semantic colors
  semantic: {
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      900: '#7f1d1d',
    },
    info: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      900: '#0c4a6e',
    },
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Dark theme colors
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
  },
};
\`\`\`

#### Typography System
Comprehensive typography scale with consistent sizing and spacing.

**Typography Scale:**
\`\`\`typescript
// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
};
\`\`\`

#### Spacing System
Consistent spacing scale based on geometric progression.

**Spacing Scale:**
\`\`\`typescript
// tokens/spacing.ts
export const spacing = {
  0: '0px',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
};
\`\`\`

#### Border Radius
Consistent border radius scale for rounded corners.

**Border Radius:**
\`\`\`typescript
// tokens/borders.ts
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};
\`\`\`

#### Shadows
Layered shadow system for depth and elevation.

**Shadow Scale:**
\`\`\`typescript
// tokens/shadows.ts
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};
\`\`\`

### Theme System

#### Light Theme
Default light theme with proper contrast ratios.

**Light Theme Configuration:**
\`\`\`typescript
// themes/light.ts
export const lightTheme = {
  colors: {
    background: '#ffffff',
    surface: '#f8fafc',
    primary: colors.primary[500],
    primaryText: '#ffffff',
    secondary: colors.neutral[600],
    secondaryText: colors.neutral[900],
    border: colors.neutral[300],
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      disabled: colors.neutral[400],
    },
    semantic: {
      success: colors.semantic.success[500],
      warning: colors.semantic.warning[500],
      error: colors.semantic.error[500],
      info: colors.semantic.info[500],
    },
  },
  spacing: spacing,
  typography: typography,
  borderRadius: borderRadius,
  shadows: shadows,
};
\`\`\`

#### Dark Theme
Comprehensive dark theme with proper color adjustments.

**Dark Theme Configuration:**
\`\`\`typescript
// themes/dark.ts
export const darkTheme = {
  colors: {
    background: colors.dark.background,
    surface: colors.dark.surface,
    primary: colors.primary[400],
    primaryText: colors.neutral[900],
    secondary: colors.neutral[300],
    secondaryText: colors.dark.text.primary,
    border: colors.neutral[600],
    text: {
      primary: colors.dark.text.primary,
      secondary: colors.dark.text.secondary,
      disabled: colors.neutral[500],
    },
    semantic: {
      success: colors.semantic.success[400],
      warning: colors.semantic.warning[400],
      error: colors.semantic.error[400],
      info: colors.semantic.info[400],
    },
  },
  spacing: spacing,
  typography: typography,
  borderRadius: borderRadius,
  shadows: {
    ...shadows,
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
  },
};
\`\`\`

#### Theme Provider
React context provider for theme management.

**Theme Provider Implementation:**
\`\`\`typescript
// providers/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '@/themes';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  themeConfig: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('careerforge-theme');
      return (stored as 'light' | 'dark') || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('careerforge-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const themeConfig = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

### Breakpoint System

#### Responsive Breakpoints
Consistent breakpoints for responsive design across all components.

**Breakpoint System:**
\`\`\`typescript
// tokens/breakpoints.ts
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Hook for responsive design
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('sm');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) setBreakpoint('2xl');
      else if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else setBreakpoint('sm');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};
\`\`\`

#### Responsive Utilities
Utility functions for responsive design patterns.

**Responsive Utilities:**
\`\`\`typescript
// utils/responsive.ts
export const responsive = {
  // Check if current breakpoint matches or exceeds target
  isBreakpointOrLarger: (target: keyof typeof breakpoints) => {
    const current = useBreakpoint();
    const targetIndex = Object.keys(breakpoints).indexOf(target);
    const currentIndex = Object.keys(breakpoints).indexOf(current);
    return currentIndex >= targetIndex;
  },

  // Get responsive value based on breakpoint
  getResponsiveValue: <T>(values: Record<keyof typeof breakpoints, T>) => {
    const breakpoint = useBreakpoint();
    return values[breakpoint];
  },

  // Conditional rendering based on breakpoint
  ResponsiveShow: ({ children, breakpoint, direction = 'up' }: {
    children: React.ReactNode;
    breakpoint: keyof typeof breakpoints;
    direction?: 'up' | 'down';
  }) => {
    const shouldShow = direction === 'up' 
      ? responsive.isBreakpointOrLarger(breakpoint)
      : !responsive.isBreakpointOrLarger(breakpoint);
    
    return shouldShow ? <>{children}</> : null;
  },
};
\`\`\``
    },
    {
      id: "component-architecture",
      title: "Component Architecture",
      content: `The component architecture follows modern React patterns and best practices to ensure scalability, maintainability, and performance across the entire CareerForge platform.

### Component Structure

#### Base Component Structure
Standardized structure for all components with consistent patterns and conventions.

**Component Template:**
\`\`\`typescript
// components/Button/Button.tsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Component variants using CVA (Class Variance Authority)
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Component props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Main component implementation
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
\`\`\`

#### Compound Components
Advanced component pattern for complex, flexible components that need to share state.

**Compound Component Example:**
\`\`\`typescript
// components/Dialog/Dialog.tsx
import React, { createContext, useContext, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Context for compound component state
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within Dialog');
  }
  return context;
};

// Root Dialog component
const Dialog: React.FC<{
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({ children, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: setOpen }}>
      <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};

// Dialog Trigger component
const DialogTrigger = DialogPrimitive.Trigger;

// Dialog Content component
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { open } = useDialog();

  if (!open) return null;

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

// Dialog Header component
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);

// Dialog Title component
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));

// Dialog Description component
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
\`\`\`

### State Management

#### Local Component State
Appropriate use of React hooks for component-level state management.

**State Management Patterns:**
\`\`\`typescript
// Hook for complex component state
const useComponentState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateState = (updates: Partial<any>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(initialState);
    setError(null);
  };

  const withLoading = async (asyncFn: () => Promise<any>) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFn();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state,
    isLoading,
    error,
    updateState,
    resetState,
    withLoading,
  };
};

// Custom hook for component-specific logic
const useDataFetching = (url: string, dependencies: any[] = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => setLoading(true) };
};
\`\`\`

#### Global State Management
Strategic use of global state for shared application state.

**Global State Pattern:**
\`\`\`typescript
// hooks/useAuth.ts - Global authentication state
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (token) {
          const userData = await verifyToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials);
    setUser(response.user);
    setIsAuthenticated(true);
    localStorage.setItem('auth-token', response.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth-token');
  };

  return { user, isAuthenticated, loading, login, logout };
};

// Provider for global state
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

### Performance Optimization

#### Component Memoization
Strategic memoization to prevent unnecessary re-renders.

**Memoization Patterns:**
\`\`\`typescript
// components/OptimizedList.tsx
import React, { memo, useMemo, useCallback } from 'react';

interface OptimizedListProps {
  items: Array<{ id: string; name: string; value: number }>;
  onItemClick: (id: string) => void;
  filter?: string;
}

// Memoized item component
const ListItem = memo(({ item, onClick }: { 
  item: OptimizedListProps['items'][0];
  onClick: (id: string) => void;
}) => {
  const handleClick = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  return (
    <div onClick={handleClick} className="p-2 border-b">
      <h3>{item.name}</h3>
      <p>Value: {item.value}</p>
    </div>
  );
});

// Memoized list component
const OptimizedList = memo<OptimizedListProps>(({ items, onItemClick, filter }) => {
  // Memoize filtered items
  const filteredItems = useMemo(() => {
    if (!filter) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  // Memoize click handler
  const handleItemClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {filteredItems.map(item => (
        <ListItem 
          key={item.id} 
          item={item} 
          onClick={handleItemClick} 
        />
      ))}
    </div>
  );
});
\`\`\`

#### Lazy Loading
Code splitting and lazy loading for improved performance.

**Lazy Loading Implementation:**
\`\`\`typescript
// Lazy loading with React.lazy
import React, { Suspense } from 'react';

// Dynamic imports for code splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
const Chart = React.lazy(() => import('./Chart'));
const DataTable = React.lazy(() => import('./DataTable'));

// Loading fallback components
const ComponentLoader: React.FC<{ height?: string }> = ({ height = '200px' }) => (
  <div 
    className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded"
    style={{ height }}
  >
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Wrapper component with suspense
const LazyWrapper: React.FC<{ 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => (
  <Suspense fallback={fallback || <ComponentLoader />}>
    {children}
  </Suspense>
);

// Usage example
const Dashboard: React.FC = () => (
  <div className="space-y-6">
    <LazyWrapper>
      <HeavyComponent data={dashboardData} />
    </LazyWrapper>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LazyWrapper fallback={<ComponentLoader height="300px" />}>
        <Chart data={chartData} />
      </LazyWrapper>
      
      <LazyWrapper fallback={<ComponentLoader height="300px" />}>
        <DataTable items={tableData} />
      </LazyWrapper>
    </div>
  </div>
);
\`\`\`

### Error Handling

#### Error Boundaries
Comprehensive error boundary implementation for graceful error handling.

**Error Boundary Component:**
\`\`\`typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({ errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            We encountered an unexpected error. Please try again.
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-4 p-4 bg-muted rounded text-left">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 text-sm">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
\`\`\`

#### Error Recovery
Strategies for graceful error recovery and user feedback.

**Error Recovery Patterns:**
\`\`\`typescript
// hooks/useErrorRecovery.ts
const useErrorRecovery = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState<Error | null>(null);

  const retry = useCallback(async (
    operation: () => Promise<any>,
    maxRetries = 3
  ) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt);
        const result = await operation();
        setLastError(null);
        return result;
      } catch (error) {
        setLastError(error as Error);
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }, []);

  const reset = useCallback(() => {
    setRetryCount(0);
    setLastError(null);
  }, []);

  return { retry, reset, retryCount, lastError };
};
\`\`\``
    },
    {
      id: "atomic-components",
      title: "Atomic Components",
      content: `Atomic components form the foundation of the CareerForge design system. These basic building blocks are designed to be simple, reusable, and composable, providing the essential UI elements needed across the entire platform.

### Button Components

#### Primary Button
The main action button used for primary calls-to-action throughout the application.

**Implementation:**
\`\`\`typescript
// components/atoms/Button/Button.tsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
\`\`\`

**Usage Examples:**
\`\`\`typescript
// Basic usage
<Button>Save Profile</Button>

// With loading state
<Button loading>Creating Account...</Button>

// Different variants
<div className="space-x-2">
  <Button variant="default">Primary Action</Button>
  <Button variant="secondary">Secondary Action</Button>
  <Button variant="outline">Outline Button</Button>
  <Button variant="ghost">Ghost Button</Button>
  <Button variant="destructive">Delete Item</Button>
  <Button variant="link">Link Button</Button>
</div>

// Different sizes
<div className="space-x-2">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <Plus className="h-4 w-4" />
  </Button>
</div>

// As a link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
\`\`\`

#### Icon Button
Specialized button component for icon-only interactions.

**Icon Button Implementation:**
\`\`\`typescript
// components/atoms/IconButton/IconButton.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        subtle: 'hover:bg-accent/50',
      },
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        default: 'h-9 w-9',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  'aria-label': string; // Required for accessibility
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
\`\`\`

### Input Components

#### Text Input
Standard text input component with validation and styling variants.

**Text Input Implementation:**
\`\`\`typescript
// components/atoms/Input/Input.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        default: 'h-9 px-3 py-2',
        lg: 'h-11 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    type, 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    id, 
    ...props 
  }, ref) => {
    const inputId = id || 'input-' + Math.random().toString(36).substr(2, 9);
    const showError = !!error;
    const showHelper = !!helperText && !showError;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ variant: showError ? 'error' : variant, size, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            aria-invalid={showError}
            aria-describedby={
              showError ? inputId + '-error' : 
              showHelper ? inputId + '-helper' : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        
        {showError && (
          <p id={inputId + '-error'} className="text-sm text-destructive">
            {error}
          </p>
        )}
        
        {showHelper && (
          <p id={inputId + '-helper'} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
\`\`\`

#### Textarea
Multi-line text input component for longer content.

**Textarea Implementation:**
\`\`\`typescript
// components/atoms/Textarea/Textarea.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    resize = 'vertical', 
    id, 
    ...props 
  }, ref) => {
    const textareaId = id || 'textarea-' + Math.random().toString(36).substr(2, 9);
    const showError = !!error;
    const showHelper = !!helperText && !showError;

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            resizeClasses[resize],
            showError && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
          aria-invalid={showError}
          aria-describedby={
            showError ? textareaId + '-error' : 
            showHelper ? textareaId + '-helper' : undefined
          }
          {...props}
        />
        
        {showError && (
          <p id={textareaId + '-error'} className="text-sm text-destructive">
            {error}
          </p>
        )}
        
        {showHelper && (
          <p id={textareaId + '-helper'} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
\`\`\`

### Form Controls

#### Checkbox
Accessible checkbox component with proper ARIA attributes.

**Checkbox Implementation:**
\`\`\`typescript
// components/atoms/Checkbox/Checkbox.tsx
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive data-[state=checked]:bg-destructive',
        success: 'border-green-500 data-[state=checked]:bg-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, label, description, id, ...props }, ref) => {
  const checkboxId = id || 'checkbox-' + Math.random().toString(36).substr(2, 9);

  return (
    <div className="flex items-start space-x-3">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(checkboxVariants({ variant, className }))}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
\`\`\`

#### Radio Group
Accessible radio button group component.

**Radio Group Implementation:**
\`\`\`typescript
// components/atoms/RadioGroup/RadioGroup.tsx
import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive',
        success: 'border-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, description, orientation = 'vertical', ...props }, ref) => {
  return (
    <div className="space-y-2">
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <div className="text-sm font-medium leading-none">
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </div>
          )}
          {description && (
            <div className="text-sm text-muted-foreground">
              {description}
            </div>
          )}
        </div>
      )}
      
      <RadioGroupPrimitive.Root
        className={cn(
          'grid gap-2',
          orientation === 'horizontal' && 'grid-flow-col',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, label, description, id, ...props }, ref) => {
  const itemId = id || 'radio-' + Math.random().toString(36).substr(2, 9);

  return (
    <div className="flex items-start space-x-3">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        className={cn(radioVariants({ variant, className }))}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-3.5 w-3.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={itemId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
\`\`\`

### Typography Components

#### Heading
Semantic heading components with consistent styling and accessibility.

**Heading Implementation:**
\`\`\`typescript
// components/atoms/Heading/Heading.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      level: {
        h1: 'scroll-m-20 text-4xl font-extrabold lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold',
        h4: 'scroll-m-20 text-xl font-semibold',
        h5: 'scroll-m-20 text-lg font-semibold',
        h6: 'scroll-m-20 text-base font-semibold',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-accent-foreground',
      },
    },
    defaultVariants: {
      level: 'h1',
      variant: 'default',
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, variant, as, children, ...props }, ref) => {
    const Component = as || level || 'h1';
    
    return (
      <Component
        className={cn(headingVariants({ level, variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
\`\`\`

#### Text
Typography component for body text and paragraphs.

**Text Implementation:**
\`\`\`typescript
// components/atoms/Text/Text.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva(
  '',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-accent-foreground',
        destructive: 'text-destructive',
        success: 'text-green-600',
        warning: 'text-yellow-600',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
      variant: 'default',
      align: 'left',
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, variant, align, as, children, ...props }, ref) => {
    const Component = as || 'p';
    
    return (
      <Component
        className={cn(textVariants({ size, weight, variant, align, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
\`\`\`

### Feedback Components

#### Alert
Alert component for displaying important messages to users.

**Alert Implementation:**
\`\`\`typescript
// components/atoms/Alert/Alert.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600 dark:text-green-400',
        warning: 'border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600 dark:text-yellow-400',
        info: 'border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-600 dark:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const icons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, dismissible, onDismiss, children, ...props }, ref) => {
    const Icon = icons[variant || 'default'];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div className="space-y-1">
          {title && (
            <div className="font-medium leading-none tracking-tight">
              {title}
            </div>
          )}
          {children && (
            <div className="text-sm [&_p]:leading-relaxed">
              {children}
            </div>
          )}
        </div>
        
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert, alertVariants };
\`\`\`

#### Badge
Small status indicators and labels.

**Badge Implementation:**
\`\`\`typescript
// components/atoms/Badge/Badge.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        warning: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
\`\`\``
    }
  ],
  bestPractices: [
    "Follow atomic design principles for consistent component hierarchy",
    "Use TypeScript interfaces for all component props to ensure type safety",
    "Implement proper accessibility attributes for all interactive components",
    "Use CVA (Class Variance Authority) for component variants and theming",
    "Implement comprehensive error handling and loading states",
    "Use React.memo and useMemo for performance optimization where appropriate",
    "Follow consistent naming conventions for components, props, and files",
    "Provide comprehensive component documentation with examples",
    "Implement proper focus management for complex interactive components",
    "Use semantic HTML elements for better accessibility and SEO",
    "Test components thoroughly with unit tests and accessibility tests",
    "Design components to be responsive and mobile-first"
  ],
  troubleshooting: [
    {
      title: "Common Component Library Issues",
      problems: [
        {
          issue: "Components not rendering correctly or showing TypeScript errors",
          solution: "Check component prop types, ensure proper imports, and verify that all required dependencies are installed.",
          severity: "high"
        },
        {
          issue: "Styling conflicts between components or themes not applying correctly",
          solution: "Verify CSS class names don't conflict, check theme provider setup, and ensure Tailwind CSS is properly configured.",
          severity: "medium"
        },
        {
          issue: "Accessibility issues with components not meeting WCAG standards",
          solution: "Check ARIA attributes, ensure proper focus management, test with screen readers, and verify keyboard navigation.",
          severity: "high"
        },
        {
          issue: "Performance issues with large component trees or frequent re-renders",
          solution: "Implement React.memo for components, useMemo for expensive calculations, and optimize component structure.",
          severity: "medium"
        },
        {
          issue: "Components not working properly on mobile devices or different screen sizes",
          solution: "Test responsive design, verify breakpoints are working, and ensure touch targets are appropriate size.",
          severity: "medium"
        }
      ]
    }
  ]
};
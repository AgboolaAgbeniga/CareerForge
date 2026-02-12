# CareerForge Documentation

A comprehensive, modern documentation website for the CareerForge AI-powered job matching platform.

## 🚀 Features

- **Modern Design**: Clean, minimalist interface with dark/light theme support
- **Accessibility**: WCAG AA compliant with full keyboard navigation
- **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- **Fast**: Built with Next.js 14 and optimized for performance
- **Search**: Global search functionality with keyboard shortcuts
- **Versioning**: Ready for multi-version documentation support
- **MDX Support**: Write content with React components and Markdown
- **TypeScript**: Full type safety throughout the codebase

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom design system
- **Content**: React components with MDX support
- **Icons**: Lucide React
- **Theme**: CSS custom properties with theme switching
- **Build**: SWC with optimizations

## 📖 Documentation Structure

```
docs/
├── app/                    # Next.js App Router pages
│   ├── docs/              # Documentation pages
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx          # Landing page
├── components/            # Reusable UI components
│   ├── AppShell.tsx      # Main layout wrapper
│   ├── Header.tsx        # Top navigation
│   ├── SidebarNav.tsx    # Left navigation
│   ├── PageTOC.tsx       # Right sidebar TOC
│   └── ThemeToggle.tsx   # Dark/light theme switcher
├── config/               # Configuration files
│   └── navigation.ts     # Navigation structure
├── lib/                  # Utility functions
│   ├── theme.tsx         # Theme provider
│   └── utils.ts          # Helper functions
└── content/              # Static content assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🎨 Design System

### Colors

- **Background**: `#0B0F1A` (dark) / `#FFFFFF` (light)
- **Surface**: `#0F172A` (dark) / `#F8FAFC` (light)
- **Primary**: `#2563EB` - Interactive elements and links
- **Accent**: `#22D3EE` - Secondary highlights
- **Text**: `#F1F5F9` (dark) / `#0F172A` (light)

### Typography

- **Headings**: Inter SemiBold
- **Body**: Inter Regular
- **Code**: JetBrains Mono
- **Scale**: 12/14/16/20/24/30/36px with 1.5 line-height

### Layout

- **Sidebar**: 280px fixed width
- **Content**: Fluid with max-width 1200px
- **Right Rail**: 240px fixed width (TOC)
- **Spacing**: 8px base unit with 8/12/16/24/32 increments

## 📝 Writing Documentation

### Page Structure

Each documentation page follows this structure:

```tsx
import { AppShell } from '@/components/AppShell'

export default function PageName() {
  return (
    <AppShell>
      <div className="py-12">
        {/* Page content */}
      </div>
    </AppShell>
  )
}
```

### Content Guidelines

1. **Headings**: Use hierarchical structure (h1 → h2 → h3 → h4)
2. **Code Blocks**: Include language specification for syntax highlighting
3. **Links**: Use descriptive text, not "click here"
4. **Images**: Optimize for web and include alt text
5. **Accessibility**: Include ARIA labels and semantic HTML

### Navigation

Update the navigation structure in `config/navigation.ts`:

```typescript
{
  title: "Section Title",
  items: [
    {
      title: "Page Title",
      href: "/docs/section/page",
      description: "Brief description",
      badge?: "beta" | "stable" | "deprecated"
    }
  ]
}
```

## 🔧 Customization

### Theme Customization

Modify CSS variables in `tailwind.config.js` and `app/globals.css`:

```css
:root {
  --color-primary: #2563EB;
  --color-accent: #22D3EE;
  /* ... other variables */
}
```

### Adding New Components

1. Create component in `components/`
2. Export from component file
3. Import and use in pages
4. Follow existing patterns for styling and accessibility

### MDX Support

Add `.mdx` files to enable Markdown with React components:

```markdown
# My Documentation

This is a regular Markdown paragraph.

<Callout type="info">
  This is a React component embedded in Markdown!
</Callout>
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

No environment variables required for basic deployment. Add analytics or search integration as needed.

### Deployment Platforms

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative with excellent Next.js support
- **Self-hosted**: Build static files and serve via any web server

## 🔍 Search Integration

The search modal is ready for integration with:

- **Algolia DocSearch**: Add API keys and configuration
- **Local search**: Implement Fuse.js for client-side search
- **Custom solution**: Extend the existing search modal

## 🎯 Performance

### Optimization Features

- **Static Generation**: Pre-build static pages where possible
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Font Optimization**: Self-hosted fonts with display swap

### Performance Targets

- **Lighthouse Score**: > 95 (Performance/Accessibility/Best Practices/SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## ♿ Accessibility

### Features

- **WCAG AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets contrast ratio requirements
- **Reduced Motion**: Respects `prefers-reduced-motion`

### Testing

```bash
# Run accessibility tests
npm run test:a11y

# Lighthouse audit
npm run lighthouse
```

## 🧪 Testing

### Component Testing

```bash
# Run component tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### E2E Testing

```bash
# Run end-to-end tests
npm run test:e2e
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Use TypeScript for all new files
- Follow ESLint configuration
- Use Prettier for formatting
- Write descriptive commit messages

### Content Guidelines

- Write clear, concise documentation
- Include practical examples
- Test instructions thoroughly
- Keep content up-to-date
- Follow accessibility guidelines

## 📄 License

This documentation is part of the CareerForge project. See the main project license for details.

## 🆘 Support

- **Documentation Issues**: Report on GitHub
- **Feature Requests**: Open an issue
- **Questions**: Check the FAQ or open a discussion

## 🗺️ Roadmap

- [ ] MDX integration for content pages
- [ ] Version switcher implementation
- [ ] Search integration (Algolia/Fuse.js)
- [ ] "Edit this page" GitHub integration
- [ ] Analytics integration
- [ ] Advanced theming options
- [ ] Multi-language support
- [ ] PDF export functionality
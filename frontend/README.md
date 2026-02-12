# CareerForge Frontend

A modern, responsive web application for the CareerForge job matching platform, built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Communication**: WebSocket integration for messaging
- **AI-Powered Features**: Integration with AI services for resume analysis and career coaching
- **User Authentication**: Secure JWT-based authentication flow
- **Role-Based UI**: Different experiences for job seekers and recruiters
- **Progressive Web App**: PWA capabilities for offline functionality
- **Accessibility**: WCAG compliant components and navigation

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: React hooks + Context API
- **HTTP Client**: Axios
- **Real-time**: Socket.io-client
- **Icons**: Lucide React + Iconify
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── email-verification/
│   ├── (job-seeker)/            # Job seeker protected routes
│   │   ├── dashboard/
│   │   ├── messaging/
│   │   ├── ai-resume-draft/
│   │   └── profile/
│   ├── (recruiter)/             # Recruiter protected routes
│   │   ├── recruiter-dashboard/
│   │   ├── post-job/
│   │   ├── candidate-matching/
│   │   └── shortlist/
│   ├── api/                     # API routes (if needed)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Loading UI
│   ├── page.tsx                 # Home page
│   └── error.tsx                # Error boundary
├── components/                  # Reusable components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── job-seeker/              # Job seeker specific components
│   │   ├── AICareerCoach.tsx
│   │   ├── ApplicationsTracker.tsx
│   │   ├── ResumeHealthCard.tsx
│   │   └── ...
│   ├── recruiter/               # Recruiter specific components
│   │   ├── AIHiringCopilot.tsx
│   │   ├── ResumeAnalysis.tsx
│   │   └── ...
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx
│   │   ├── FeaturesGrid.tsx
│   │   └── Testimonials.tsx
│   ├── shared/                  # Shared components
│   │   ├── MessagingInbox.tsx
│   │   ├── Settings.tsx
│   │   └── ThemeProvider.tsx
│   └── index.ts                 # Component exports
├── lib/                         # Utilities and configurations
│   ├── api/                     # API client and utilities
│   ├── auth/                    # Authentication utilities
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Helper functions
│   └── validations/             # Form validation schemas
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
├── styles/                      # Additional styles
├── types/                       # TypeScript type definitions
├── middleware.ts                # Next.js middleware
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend services running (see backend README)

### Installation

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables in `.env.local`:
   ```env
   # Backend API
   NEXT_PUBLIC_API_URL=http://localhost:5000

   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # AI Services (if direct access needed)
   NEXT_PUBLIC_RESUME_PARSER_URL=http://localhost:8000
   NEXT_PUBLIC_MATCHING_ENGINE_URL=http://localhost:8001
   NEXT_PUBLIC_CAREER_COACH_URL=http://localhost:8002

   # External Services
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🎯 Key Features

### Authentication Flow
- User registration and login
- Email verification
- Password reset
- Two-factor authentication (2FA)
- Session management

### Job Seeker Experience
- **Dashboard**: Overview of applications, matches, and activity
- **Profile Management**: Complete profile setup and optimization
- **Job Search**: Advanced filtering and AI-powered recommendations
- **Applications Tracker**: Monitor application status
- **AI Career Coach**: Personalized career guidance
- **Resume Builder**: AI-assisted resume creation
- **Messaging**: Real-time communication with recruiters

### Recruiter Experience
- **Dashboard**: Hiring metrics and pipeline overview
- **Job Posting**: Create and manage job listings
- **Candidate Matching**: AI-powered candidate discovery
- **Resume Analysis**: Automated candidate evaluation
- **Shortlisting**: Organize candidates by status
- **Interview Management**: Schedule and track interviews
- **Analytics**: Hiring performance insights

### AI Integration
- **Resume Parsing**: Extract structured data from resumes
- **Job Matching**: Semantic matching algorithms
- **Career Coaching**: Personalized advice and recommendations
- **Content Generation**: Cover letters and profile optimization

## 🏗 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run E2E tests
npm run test:e2e
```

### Code Quality

- **ESLint**: Code linting with Next.js rules
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (via ESLint)
- **Husky**: Git hooks for pre-commit checks

### Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage report
npm run test -- --coverage

# E2E tests
npm run test:e2e
```

### Component Development

Components follow atomic design principles:
- **Atoms**: Basic UI elements (Button, Input, etc.)
- **Molecules**: Composite components (Form fields, Cards)
- **Organisms**: Complex components (Navigation, Dashboards)
- **Templates**: Page layouts
- **Pages**: Complete pages

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS with a custom design system:

- **Colors**: Custom color palette with CSS variables
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent spacing scale
- **Components**: Pre-built component classes

### Dark Mode

Built-in dark mode support with system preference detection.

### Responsive Design

Mobile-first approach with breakpoints:
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+

## 🔧 Configuration

### Next.js Config

Custom configuration in `next.config.js`:
- Image optimization
- Redirects and rewrites
- Headers and security
- Bundle analysis

### Environment Variables

See `.env.example` for all available variables.

### API Integration

HTTP client configured in `lib/api/`:
- Axios instance with interceptors
- Automatic token refresh
- Error handling
- Request/response logging

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Environment Setup

1. Set production environment variables
2. Configure domain and SSL
3. Set up monitoring and analytics
4. Configure CDN for static assets

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📱 Progressive Web App

PWA features include:
- Service worker for caching
- Web app manifest
- Offline functionality
- Push notifications (planned)

## ♿ Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## 🔍 SEO

- Server-side rendering (SSR)
- Static generation for marketing pages
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap generation

## 📊 Analytics

Integration with analytics platforms:
- Google Analytics 4
- Custom event tracking
- User journey analysis
- Performance monitoring

## 🤝 Contributing

1. Follow the established code structure
2. Use TypeScript for all new code
3. Write tests for new features
4. Update component documentation
5. Follow commit message conventions

### Code Standards

- Use functional components with hooks
- Implement proper error boundaries
- Use custom hooks for shared logic
- Follow TypeScript strict mode
- Write meaningful component and function names

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**
   - Clear `.next` cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

2. **Type Errors**
   - Check TypeScript configuration
   - Run type checking: `npm run type-check`

3. **Styling Issues**
   - Verify Tailwind configuration
   - Check CSS imports in `_app.tsx`

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm run dev
```

## 📈 Roadmap

- [ ] Advanced search and filtering
- [ ] Video interviewing integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced AI features

---

**Status**: ✅ Frontend application fully implemented and documented
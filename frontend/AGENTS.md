# AGENTS.md - Frontend Project

This document provides essential context for AI agents working on this frontend codebase. It explains the project structure, conventions, workflows, and feature areas so agents can make consistent, safe, and useful changes.

## Project Overview

This is a modern frontend application built for a product with authenticated users, public-facing pages, dashboards, forms, API integrations, and reusable UI components.

The application should prioritize:

- Clean, accessible, responsive UI
- Maintainable component structure
- Clear separation of concerns
- Consistent styling and design patterns
- Safe handling of authentication and user data
- Predictable API usage
- Strong TypeScript usage where applicable

## Tech Stack

Update this section to match the actual project.

- Framework: Next.js / React
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: Zustand / React Context / other project state library
- Data Fetching: React Query / Axios / Fetch
- Forms: React Hook Form / Zod / equivalent
- Icons: Lucide React or project-approved icon library
- UI Components: Local component library / shadcn-style components

## Important Agent Rules

Before writing code:

1. Read the relevant files first.
2. Follow existing project patterns.
3. Do not introduce a new library unless clearly necessary.
4. Keep changes scoped to the request.
5. Do not refactor unrelated files.
6. Preserve existing behavior unless the request says otherwise.
7. Prefer reusable components when the same UI pattern appears more than once.
8. Avoid hardcoded magic values when the project already has constants, config, or utilities.
9. Never expose secrets, tokens, API keys, or sensitive data in client-visible code.
10. Run relevant checks after changes when possible.

## Project Structure

The structure may vary, but a typical version looks like this:

```txt
src/
  app/
    api/
    auth/
    dashboard/
    layout.tsx
    page.tsx

  components/
    ui/
    auth/
    dashboard/
    layout/
    shared/

  hooks/
  lib/
  services/
  stores/
  types/
  constants/
  utils/
```

## Routing

Public routes usually include:

- Landing page
- About page
- Pricing page
- Contact page
- Blog or resources pages
- Legal pages such as privacy policy and terms

Authentication routes usually include:

- Login
- Signup
- Forgot password
- Reset password
- Verify email
- Onboarding

Protected routes usually include:

- Dashboard
- Settings
- User profile
- Reports or analytics
- Feature-specific workspace pages

## Feature Areas

Replace these with the actual project’s features.

### Authentication

The app may support:

- User registration
- Login/logout
- Email verification
- Password reset
- Session persistence
- Protected routes
- Role-based access where applicable

Agents should be careful when working with auth flows. Do not store sensitive tokens in unsafe places unless the existing architecture explicitly requires it.

### Dashboard

The dashboard may include:

- User-specific overview cards
- Analytics summaries
- Activity history
- Status indicators
- Notifications
- Reports
- Quick actions

Keep dashboard UI scannable, compact, and useful. Avoid marketing-style layouts inside operational dashboard pages.

### Core Product Features

The product may include descriptively defined business features such as:

- Feature modules for managing user workflows
- Data visualization and analytics
- Notifications and alerts
- Resource management
- Transaction or activity tracking
- AI-assisted recommendations or insights
- Integrations with third-party services
- Administrative or team management tools

When implementing feature work, follow the naming and folder organization already used in the codebase.

### Settings

Settings may include:

- Profile management
- Account preferences
- Notification preferences
- Security settings
- Billing or subscription management
- Team or organization settings
- Integration configuration

Settings pages should feel calm, structured, and easy to scan.

## UI Guidelines

The UI should be:

- Clean
- Responsive
- Accessible
- Consistent with the existing design system
- Polished on both desktop and mobile

Use existing components from `components/ui` where available.

Prefer:

- Buttons for actions
- Links for navigation
- Inputs with labels and validation messages
- Dialogs for focused tasks
- Tables for dense structured data
- Cards only when they represent individual grouped items
- Tabs for switching between related views
- Tooltips for icon-only controls

Avoid:

- Inconsistent spacing
- New color systems outside the existing theme
- Overly decorative layouts in dashboard/product areas
- Duplicated component logic
- Unclear button labels
- Text overflow on mobile
- Inaccessible contrast or missing labels

## Styling Conventions

Use the project’s existing styling approach.

If Tailwind CSS is used:

- Prefer utility classes already common in the project.
- Keep responsive classes intentional.
- Avoid excessive arbitrary values unless needed.
- Use theme colors and design tokens where available.
- Keep spacing and border radius consistent.

## Forms

Forms should:

- Use existing form components where available
- Include validation
- Show loading states
- Show success/error feedback
- Disable submit buttons while submitting
- Avoid losing user input unnecessarily
- Use schemas/types where the project already does

## API Usage

API calls should usually live in:

```txt
src/services/
src/lib/api/
src/hooks/
```

Follow existing patterns for:

- Request helpers
- Error handling
- Authentication headers or cookies
- Response typing
- Loading and error states
- Retry behavior

Do not duplicate API client logic if one already exists.

## State Management

Use the existing state management approach.

Common state categories:

- Auth state
- User/session state
- UI state
- Feature-specific state
- Temporary form or wizard state

Persist only what is necessary. Avoid persisting sensitive data unless the architecture explicitly requires it.

## Security Notes

Agents must avoid:

- Logging sensitive data
- Exposing tokens in browser-readable storage unnecessarily
- Committing secrets
- Hardcoding private API keys
- Trusting client-side checks as the only authorization layer
- Returning sensitive user fields to the client when unnecessary

## Accessibility

UI changes should consider:

- Semantic HTML
- Keyboard navigation
- Focus states
- Accessible names for icon buttons
- Proper labels for form controls
- Sufficient color contrast
- Responsive layout without content overlap

## Testing and Verification

When possible, run relevant checks:

```bash
npm run typecheck
npm run lint
npm run build
```

Use the scripts that actually exist in the project.

For UI work, verify:

- Desktop layout
- Mobile layout
- Loading states
- Empty states
- Error states
- Interactive behavior
- No obvious text overflow or broken images

## Code Style

Follow existing code style.

Prefer:

- Small focused components
- Clear prop names
- Typed interfaces
- Local helper functions for repeated logic
- Readable conditional rendering
- Consistent import ordering if the project uses one

Avoid:

- Large unrelated refactors
- Deeply nested JSX when a small component would help
- Overly clever abstractions
- Dead code
- Console logs in production code unless the project allows them

## Git and File Safety

Agents should:

- Never revert unrelated user changes
- Avoid destructive git commands
- Keep edits scoped
- Check existing file contents before modifying
- Respect uncommitted work in the repository

## Environment Variables

Environment variables should be documented and accessed through existing project patterns.

Examples:

```txt
NEXT_PUBLIC_API_BASE_URL=
API_BASE_URL=
NEXT_PUBLIC_APP_URL=
```

Never expose server-only secrets with public prefixes.

## Documentation

When adding or changing important behavior, update relevant docs if they exist.

Documentation may include:

- README
- Feature docs
- API usage notes
- Environment setup
- Component usage notes

## Final Response Expectations

When an agent completes work, it should summarize:

- What changed
- Which files were touched
- What was verified
- Any remaining warnings or follow-up notes

Keep responses concise and practical.
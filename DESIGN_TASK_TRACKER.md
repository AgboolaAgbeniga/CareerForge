# Design Conformance Task Tracker

Source plan: `DESIGN_IMPLEMENTATION_PLAN.md`

Source of truth: `frontend/DESIGN.md`

## Status Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete
- `[!]` Needs decision

## Migration Checklist

- `[x]` Phase 1: Establish design contract tokens, utilities, and guardrails.
- `[x]` Phase 2: Refactor shared UI primitives.
- `[x]` Phase 3: Refactor shell components.
- `[x]` Phase 4: Migrate public marketing pages.
- `[x]` Phase 5: Migrate auth flows.
- `[x]` Phase 6: Migrate product dashboards and workflows.
- `[x]` Phase 7: Sweep modals and overlays.
- `[x]` Phase 8: Decide whether to retire or regenerate `frontend/public/**/*.html` prototypes. (Decision: Retire, since all logic has migrated to Next.js using the DESIGN.md rules)
- `[x]` Phase 9: Run static, build, responsive, and accessibility verification.

## Phase 1: Design Contract

- `[x]` Add reusable typography utility classes.
- `[x]` Add reusable component recipes for buttons, inputs, cards, badges, rows, modals, and shell rows.
- `[x]` Fix hairline border utility behavior.
- `[x]` Add static drift check command to package scripts or docs.

## Phase 2: Shared UI Primitives

- `[x]` `frontend/src/components/ui/Button.tsx`
- `[x]` `frontend/src/components/ui/Input.tsx`
- `[x]` `frontend/src/components/ui/Textarea.tsx`
- `[x]` `frontend/src/components/ui/Select.tsx`
- `[x]` `frontend/src/components/ui/Checkbox.tsx`
- `[x]` `frontend/src/components/ui/Radio.tsx`
- `[x]` `frontend/src/components/ui/Modal.tsx`
- `[x]` `frontend/src/components/ui/EmptyState.tsx`
- `[x]` `frontend/src/components/ui/Skeleton.tsx`
- `[x]` `frontend/src/components/shared/ToastContext.tsx`
- `[x]` `frontend/src/components/shared/UploadResumeModal.tsx`

## Phase 3: Shell

- `[x]` `frontend/src/components/layout/Header.tsx`
- `[x]` `frontend/src/components/layout/Footer.tsx`
- `[x]` `frontend/src/components/layout/AuthLayout.tsx`
- `[x]` `frontend/src/components/layout/OnboardingHeader.tsx`
- `[x]` `frontend/src/components/layout/OnboardingFooter.tsx`
- `[x]` `frontend/src/app/layout.tsx`

## Phase 4: Public Pages

- `[x]` `frontend/src/app/page.tsx`
- `[x]` `frontend/src/app/waiting-list/page.tsx`
- `[x]` `frontend/src/components/sections/Hero.tsx`
- `[x]` `frontend/src/components/sections/HeroDemo.tsx`
- `[x]` `frontend/src/components/sections/ValueProposition.tsx`
- `[x]` `frontend/src/components/sections/FeaturesGrid.tsx`
- `[x]` `frontend/src/components/sections/Testimonials.tsx`
- `[x]` `frontend/src/components/sections/CallToAction.tsx`

## Phase 5: Auth Flows

- `[x]` `frontend/src/app/auth/login/page.tsx`
- `[x]` `frontend/src/app/auth/signup/page.tsx`
- `[x]` `frontend/src/app/auth/forgot-password/page.tsx`
- `[x]` `frontend/src/app/auth/reset-password/page.tsx`
- `[x]` `frontend/src/app/auth/email-verification/page.tsx`
- `[x]` `frontend/src/app/auth/session-expired/page.tsx`
- `[x]` `frontend/src/app/auth/two-factor-setup/page.tsx`
- `[x]` `frontend/src/app/auth/loading.tsx`
- `[x]` `frontend/src/app/auth/error.tsx`

## Phase 6: Product Workflows

- `[x]` Dashboard components.
- `[x]` Job-seeker pages and components.
- `[x]` Recruiter pages and components.
- `[x]` Shared settings, security, messaging, insight, premium, and contributor components.

## Phase 7: Modals And Overlays

- `[x]` Confirm all modal surfaces use design-system recipes.
- `[x]` Confirm scrims, titles, close controls, and focus behavior.
- `[x]` Confirm destructive flows include confirmation or recovery.

## Phase 9: Verification

- `[x]` Run static drift scan.
- `[x]` Run TypeScript/build checks.
- `[x]` Run visual route checks.
- `[x]` Run responsive checks.
- `[x]` Run accessibility checks.

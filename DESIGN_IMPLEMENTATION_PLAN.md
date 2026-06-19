# Frontend Design Conformance Implementation Plan

Source of truth: `frontend/DESIGN.md`

Goal: make every frontend page, component, modal, shared UI primitive, and product workflow conform to the Together AI-inspired design system described in `frontend/DESIGN.md`.

Current audit snapshot:

- `87` source UI files checked under `frontend/src/app` and `frontend/src/components`.
- `60` files contain clear design drift signals.
- `1,732` static drift signals found.
- `frontend/public/**/*.html` was not included in the source count and should be handled as a separate prototype-retirement or regeneration track.

## Design North Star

The frontend should not read as a generic AI hiring SaaS interface. It should feel like a disciplined technical AI platform adapted for CareerForge:

- Near-black and white surface bands.
- One controlled orange-magenta-periwinkle gradient object, primarily at hero scale.
- Black 4px-radius CTAs.
- Uppercase mono labels and button text.
- Display-sans narrative copy.
- Hairline borders.
- Almost no shadows.
- `rounded-full` reserved only for the floating circular icon button.

## 1. Establish The Design Contract

Create a small enforcement layer from `frontend/DESIGN.md`.

Actions:

- Add typography utilities for `display-xxl`, `display-xl`, `display-lg`, `display-md`, `body-lg`, `body-md`, `caption`, `mono-caps-button`, and `mono-caps-eyebrow`.
- Normalize Tailwind tokens to the spec: `canvas`, `canvas-dark`, `surface-dark-soft`, `hairline`, `primary`, `accent-orange`, `accent-magenta`, `accent-periwinkle`, and `accent-mint`.
- Add strict component class recipes for button, input, card, badge, table row, modal, toast, shell row, and data-table header.
- Define a design lint rule list:
  - No `bg-indigo-*`, `bg-purple-*`, `bg-slate-*`, or similar brand styling.
  - No `rounded-full` except circular icon buttons.
  - No broad shadows except approved floating affordances.
  - No decorative `backdrop-blur` or glass panels.
  - No random gradients outside the approved hero-scale brand ribbon.
  - No `font-bold` or `font-semibold` where the design system expects 400 or 500.

## 2. Refactor Shared Primitives First

Shared primitives should become the enforcement layer for the whole app.

Target files:

- `frontend/src/components/ui/Button.tsx`
- `frontend/src/components/ui/Input.tsx`
- `frontend/src/components/ui/Textarea.tsx`
- `frontend/src/components/ui/Select.tsx`
- `frontend/src/components/ui/Checkbox.tsx`
- `frontend/src/components/ui/Radio.tsx`
- `frontend/src/components/ui/Modal.tsx`
- `frontend/src/components/ui/EmptyState.tsx`
- `frontend/src/components/ui/Skeleton.tsx`
- `frontend/src/components/shared/ToastContext.tsx`
- `frontend/src/components/shared/UploadResumeModal.tsx`

Actions:

- Refactor `Button` to support only spec variants: `primary`, `secondaryMint`, `secondaryWhite`, `ghostOnDark`, `outline`, and `iconCircular`.
- Refactor form controls to use 4px radius, hairline borders, display body text, mono labels, and accessible focus states.
- Refactor `Modal` to use a canvas surface, 4px radius, tinted scrim, required title, and no decorative glass blur.
- Refactor toast surfaces to use flat canvas styling, hairline borders, and spec typography.
- Ensure loading, disabled, focus, invalid, and success states are visible and semantically correct.

## 3. Rebuild The App Shell

Navigation and layout should enforce the brand.

Target files:

- `frontend/src/components/layout/Header.tsx`
- `frontend/src/components/layout/Footer.tsx`
- `frontend/src/components/layout/AuthLayout.tsx`
- `frontend/src/components/layout/OnboardingHeader.tsx`
- `frontend/src/components/layout/OnboardingFooter.tsx`
- `frontend/src/app/layout.tsx`

Actions:

- Rebuild `Header` around the spec: dark over hero, white after scroll, centered links, compact mono/button language, and full-overlay mobile drawer.
- Keep one primary CTA per visible viewport.
- Refactor `Footer` to use 4-column nav, mono section labels, body links, and a giant faint `careerforge.ai` wordmark.
- Remove slate/indigo visual language from auth and onboarding shells.
- Make fixed headers reserve appropriate top spacing so content is not hidden underneath.

## 4. Recompose Public Marketing Pages

The public UI should be the clearest expression of `frontend/DESIGN.md`.

Target files:

- `frontend/src/app/page.tsx`
- `frontend/src/app/waiting-list/page.tsx`
- `frontend/src/components/sections/Hero.tsx`
- `frontend/src/components/sections/HeroDemo.tsx`
- `frontend/src/components/sections/ValueProposition.tsx`
- `frontend/src/components/sections/FeaturesGrid.tsx`
- `frontend/src/components/sections/Testimonials.tsx`
- `frontend/src/components/sections/CallToAction.tsx`

Actions:

- Rebuild the home hero as a dark band with a 50/50 desktop layout, left-aligned copy, CTA cluster, and one large brand-gradient ribbon graphic.
- Preserve dark/light/dark band rhythm across public sections.
- Replace shadowed cards with hairline cards.
- Avoid centered body paragraphs under left-aligned display headlines.
- Use the gradient only as a hero-scale brand object, not as text, borders, pills, or progress bars.

## 5. Normalize Auth Flows

Auth pages currently carry heavy dark slate/indigo styling. Convert them to `ex-auth-form-card`.

Target files:

- `frontend/src/app/auth/login/page.tsx`
- `frontend/src/app/auth/signup/page.tsx`
- `frontend/src/app/auth/forgot-password/page.tsx`
- `frontend/src/app/auth/reset-password/page.tsx`
- `frontend/src/app/auth/email-verification/page.tsx`
- `frontend/src/app/auth/session-expired/page.tsx`
- `frontend/src/app/auth/two-factor-setup/page.tsx`
- `frontend/src/app/auth/loading.tsx`
- `frontend/src/app/auth/error.tsx`

Actions:

- Use white/canvas auth form cards with 4px radius.
- Use black primary submit buttons.
- Keep inline field errors near fields.
- Keep semantic feedback for validation, but remove decorative rainbow gradients.
- Remove `rounded-xl`, `shadow-lg`, `bg-gradient-to-r from-indigo-*`, and similar legacy styling.

## 6. Normalize Product Dashboards

For job seeker and recruiter views, interpret the design system as dense technical product UI.

Target file families:

- `frontend/src/components/dashboard/*`
- `frontend/src/components/job-seeker/*`
- `frontend/src/components/recruiter/*`
- `frontend/src/app/job-seeker/*`
- `frontend/src/app/recruiter/*`
- `frontend/src/components/shared/Settings.tsx`
- `frontend/src/components/shared/SecuritySettings.tsx`
- `frontend/src/components/shared/MessagingInbox.tsx`
- `frontend/src/components/shared/AIInsightPanel.tsx`
- `frontend/src/components/shared/PremiumUpsell.tsx`
- `frontend/src/components/shared/Contributors.tsx`

Actions:

- Use app-shell rows, data-table rows, hairline cards, mono labels, and restrained status treatments.
- Remove glass panels, glow effects, gradient cards, broad shadows, and oversized rounded containers.
- Status indicators should use text plus badge, not color-only meaning.
- Keep dashboards scannable and utilitarian.
- Align dashboard typography with the `display-md`, `body-md`, `caption`, and `mono-caps-label` hierarchy.

## 7. Modal And Overlay Sweep

Every modal and overlay must match the same rules.

Actions:

- Use canvas or canvas-dark surface depending on context.
- Use 4px radius.
- Use a scrim strong enough for foreground legibility.
- Remove decorative blur/glass.
- Include proper accessible title, close control, and focus management.
- Use shared `Button` variants for all modal actions.
- Confirm destructive actions use clear recovery or confirmation paths.

Target examples:

- `frontend/src/components/ui/Modal.tsx`
- `frontend/src/components/shared/UploadResumeModal.tsx`
- Auth recovery states.
- Recruiter onboarding confirmation surfaces.
- Job-seeker upload and resume workflows.

## 8. Static Prototype Decision

`frontend/public/**/*.html` appears visually far from `frontend/DESIGN.md`.

Decision needed:

- Retire them if they are old prototypes.
- Or regenerate them after the React source is aligned.
- Do not maintain two visual systems long-term.

## 9. Verification Gate

After refactor, run a conformance gate.

Static checks:

- Search for banned colors and styling classes.
- Search for `rounded-full`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `backdrop-blur`, `glass`, `font-bold`, `font-semibold`, `tracking-tight`, and unapproved gradients.
- Verify `rounded-full` only appears for approved circular icon buttons.
- Verify gradients only appear in approved hero ribbon code.

Visual checks:

- Home page.
- Auth login.
- Auth signup.
- Password reset and email verification.
- Job-seeker dashboard.
- Job-seeker onboarding.
- Resume draft/editor workflow.
- Messaging.
- Recruiter dashboard.
- Candidate matching.
- Candidate profile.
- Post job.
- Recruiter onboarding.
- Settings and security settings.
- All modal states.

Viewport checks:

- Small mobile.
- Large mobile.
- Tablet.
- Desktop.
- Wide desktop.

Accessibility checks:

- Keyboard navigation.
- Visible focus states.
- Form labels and inline errors.
- Touch targets.
- Color contrast.
- Reduced motion.
- No color-only meaning.

## Recommended Execution Order

1. Primitives.
2. Shell.
3. Public pages.
4. Auth flows.
5. Dashboards and product workflows.
6. Modals and overlays.
7. Static prototypes.
8. Visual QA and conformance gate.

This order gives the migration maximum leverage early. Once primitives and shell are aligned, page work becomes mostly replacing local one-off styling with system components and approved design recipes.

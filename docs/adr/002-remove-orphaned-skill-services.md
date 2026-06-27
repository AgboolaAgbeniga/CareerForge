# ADR 002: Removal of Legacy/Orphaned Skill Services

## Context

The backend service directory contains two legacy helper modules:
1. `backend/src/services/skillMatching.ts`
2. `backend/src/services/skillNormalization.ts`

These files contain compile-time reference errors (like missing Drizzle database schemas and deprecated query builders) and are not imported by any routing paths or other service modules. As we transition to a unified skill overlap helper and pgvector-driven hybrid matching, these modules are obsolete.

## Decision

Permanently delete both `skillMatching.ts` and `skillNormalization.ts` to reduce codebase bloat, improve compilation speeds, and avoid confusion. 

We will replace any ad-hoc local client matching routines with a centralized `calculateSkillOverlap` utility helper.

## Consequences

- Compiling the TypeScript project with `pnpm run build` will no longer report dead code type mismatches from these files.
- Simplifies onboarding for developers inspecting the `backend/src/services/` folder.
- Establishes `backend/src/utils/matchingHelper.ts` as the single source of truth for in-memory skill comparisons.

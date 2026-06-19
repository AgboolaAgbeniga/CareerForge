---
name: Use PNPM
description: Always use pnpm instead of npm or yarn as the package manager for this project.
---

# Use PNPM

## Context

This project exclusively uses **pnpm** as its package manager. Do NOT use `npm` or `yarn` under any circumstances.

## Rules

- Whenever you need to install a package, run `pnpm add <package>` instead of `npm install <package>`.
- Whenever you need to run a script defined in package.json, run `pnpm run <script>` instead of `npm run <script>`.
- Whenever you need to execute a package binary, run `pnpm exec <command>` or `pnpm dlx <command>` instead of `npx`.
- Do not create or update `package-lock.json` or `yarn.lock`. The project relies solely on `pnpm-lock.yaml`.

## Examples

**Correct:**
- `pnpm install`
- `pnpm add -D tailwindcss`
- `pnpm run build`
- `pnpm dev`
- `pnpm exec jest`

**Incorrect:**
- `npm install`
- `npm run build`
- `npx create-react-app`
- `yarn add`

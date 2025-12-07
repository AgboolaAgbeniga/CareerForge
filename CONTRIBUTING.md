# Contributing to CareerForge

Welcome! We're excited that you're interested in contributing to CareerForge, a comprehensive job platform built with Next.js, TypeScript, and Tailwind CSS. This document provides guidelines and information to help you contribute effectively.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher (download from [nodejs.org](https://nodejs.org/))
- **npm**: Comes with Node.js, or use Yarn if preferred
- **Git**: For version control

### Cloning the Repository

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/your-username/career-forge.git
cd career-forge
```

3. Add the upstream remote:

```bash
git remote add upstream https://github.com/original-org/career-forge.git
```

## Development Setup

1. **Install Dependencies**:

```bash
npm install
```

2. **Start Development Server**:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev`: Start the development server with hot reloading
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check code quality
- `npm run lint:fix`: Automatically fix ESLint issues where possible
- `npm run format`: Format code using Prettier
- `npm run format:check`: Check if code is properly formatted

## Coding Standards

We maintain high code quality through automated tools and consistent conventions.

### ESLint Configuration

Our ESLint configuration (`.eslintrc.json`) extends:

- `next/core-web-vitals`: Next.js recommended rules for performance and accessibility
- `prettier`: Integrates Prettier formatting rules

Custom rules:

- `react/no-unescaped-entities`: Disabled (allows unescaped entities in JSX)
- `@next/next/no-img-element`: Disabled (allows `<img>` tags)
- `prettier/prettier`: Set to error (formatting issues are treated as errors)

### Prettier Configuration

Our Prettier configuration (`.prettierrc.json`) enforces:

- Semicolons: Required
- Trailing commas: ES5 style (trailing commas where valid in ES5)
- Quotes: Single quotes preferred
- Print width: 80 characters per line
- Indentation: 2 spaces (no tabs)

Always run `npm run format` before committing to ensure consistent formatting.

### TypeScript

- Use TypeScript for all new components and utilities
- Define proper types for props, state, and function parameters
- Avoid `any` type; use specific types or `unknown` when necessary

### Component Guidelines

- Use functional components with hooks
- Follow the component structure in `components/`
- Export components from `components/index.ts`
- Use Tailwind CSS for styling
- Ensure components are accessible and responsive

## Pull Request Guidelines

1. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**:
   - Follow the coding standards above
   - Write clear, concise commit messages
   - Test your changes thoroughly

3. **Run Quality Checks**:

   ```bash
   npm run lint
   npm run format:check
   npm run build  # Ensure the build passes
   ```

4. **Commit and Push**:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**:
   - Use a descriptive title and detailed description
   - Reference any related issues
   - Request review from maintainers

6. **Address Feedback**:
   - Respond to review comments
   - Make requested changes
   - Keep the PR updated with the main branch

### Commit Message Convention

We follow conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Project Structure Overview

```
career-forge/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── ...
│   ├── job-seeker/               # Job seeker dashboard and features
│   │   ├── dashboard/
│   │   ├── full-profile/
│   │   └── ...
│   └── recruiter/                # Recruiter dashboard and features
│       ├── recruiter-dashboard/
│       ├── post-job/
│       └── ...
├── components/                   # Reusable React components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── ...
├── public/                       # Static assets and HTML pages
│   ├── auth/                     # Static auth pages
│   ├── job-seeker/               # Static job seeker pages
│   ├── recruiter/                # Static recruiter pages
│   └── shared/                   # Shared static components
├── shared/                       # Shared HTML components
├── .eslintrc.json                # ESLint configuration
├── .prettierrc.json              # Prettier configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

### Key Directories

- **`app/`**: Contains all Next.js pages using the App Router. Each subdirectory represents a route segment.
- **`components/`**: Reusable UI components built with React and TypeScript. All components are exported from `index.ts`.
- **`public/`**: Static HTML pages and assets. These are served directly and may contain legacy pages or static content.
- **`shared/`**: Common HTML components used across static pages.

## Testing

Currently, we don't have automated tests set up. When contributing:

- Manually test your changes in the browser
- Ensure no console errors
- Test on different screen sizes
- Verify functionality works as expected

## Reporting Issues

When reporting bugs or requesting features:

- Use GitHub Issues
- Provide detailed descriptions
- Include steps to reproduce
- Add screenshots or code examples when relevant

## Code of Conduct

Please be respectful and constructive in all interactions. We follow a standard code of conduct to ensure a welcoming environment for all contributors.

Thank you for contributing to CareerForge! Your efforts help make this platform better for job seekers and recruiters worldwide.

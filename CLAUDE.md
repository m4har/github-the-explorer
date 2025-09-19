# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using the App Router, built with TypeScript and Tailwind CSS v4. The project uses shadcn/ui components with the "new-york" style variant and includes Lucide React for icons.

## Development Commands

- `bun run dev` - Start development server with Turbopack (fast refresh)
- `bun run build` - Build production application with Turbopack
- `bun run start` - Start production server
- `bun run lint` - Run ESLint to check code quality

## Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **UI Components**: shadcn/ui (configured for "new-york" style)
- **Icons**: Lucide React
- **Utility Functions**: clsx + tailwind-merge for conditional styling
- **Testing**: @testing-library/react with bun:test for Jest-like testing experience

### Project Structure

- `src/app/` - Next.js App Router pages and layout
- `src/lib/utils.ts` - Utility functions (cn() for className merging)
- `components.json` - shadcn/ui configuration
- `tsconfig.json` - TypeScript configuration with path alias `@/*` pointing to `src/*`

### Key Configuration Details

#### shadcn/ui Setup

- Style variant: "new-york"
- React Server Components enabled (`"rsc": true`)
- TypeScript support (`"tsx": true`)
- CSS variables enabled with base color "stone"
- Icon library: Lucide
- Path aliases configured for components, utils, ui, lib, and hooks

#### Tailwind CSS v4

- Uses `@import "tailwindcss"` and `@import "tw-animate-css"`
- Custom CSS variables defined in `globals.css`
- Dark mode support with `.dark` class
- Custom color scheme using oklch color space
- Design token system with CSS custom properties

#### TypeScript

- Strict mode enabled
- Module resolution set to "bundler"
- Path alias `@/*` configured for easier imports

### Development Notes

- The project uses Turbopack for faster development and building
- ESLint is configured with Next.js recommended rules
- Testing uses @testing-library/react with bun:test runner
- Happy DOM is configured for browser-like testing environment
- Custom matchers available in matchers.d.ts
- The application is ready for production deployment with Vercel

### File Naming Conventions

- Components: kebab-case (e.g., `hero-section.tsx`)
- Utilities: kebab-case (e.g., `seo-config.ts`)
- Route segments: lowercase with dashes (e.g., `register/data`)
- Feature directories: lowercase (e.g., `landing`, `auth`)

### Testing Standards

#### Data-TestID Convention

**Pattern**: `[module]-[component]-[element]`

#### Required Elements with Data-TestID

- **All interactive elements**: buttons, inputs, links
- **Data display elements**: tables, cards, lists
- **Container elements**: forms, modals, sections
- **Navigation elements**: breadcrumbs, tabs, menus

#### Implementation Examples

```typescript
// Form elements
<Form data-testid="app-form">
  <Input data-testid="app-form-name-input" />
  <Button data-testid="app-form-submit-btn" />
</Form>

// User components
<UserCard data-testid="user-card">
  <Button data-testid={`user-edit-btn-${user.id}`} />
</UserCard>

// Loading states
<p data-testid="app-loading-text">Loading...</p>

// Interactive elements
<Input data-testid="app-search-input" />
<Button data-testid="app-search-btn" />
<Accordion data-testid="app-accordion" />
```

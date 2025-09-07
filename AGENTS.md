# Repository Guidelines

## Project Structure & Module Organization
- `pages/`: Next.js routes (pages and API routes).
- `components/`: Reusable UI components (PascalCase files, `.tsx`).
- `hooks/`: React hooks bridging UI and server (`useX` naming).
- `server/`: Domain logic
  - `adapters/`, `services/`, `repositories/` (tested with `*.spec.ts`).
- `prisma/`: Prisma schema and client generation.
- `public/`, `styles/`, `types/`, `utils/`, `contexts/`, `layouts/`, `providers/`.
- Aliases: `@components/*`, `@hooks/*`, `@server/*` (see `tsconfig.json`).

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js in development at `http://localhost:3000`.
- `npm run build`: Generate Prisma client then build the app.
- `npm start`: Run the production build.
- `npm run lint`: Lint with Next/ESLint rules.
- `npm test`: Run Jest (jsdom + Testing Library).
- `npm run storybook`: Component dev at `http://localhost:6006`.
- `npm run build-storybook`: Static Storybook build.

## Coding Style & Naming Conventions
- TypeScript with `strict` enabled; 2‑space indentation.
- Follow ESLint `next/core-web-vitals`; fix warnings before PR.
- Components: PascalCase filenames and exports; pages are default exports.
- Hooks: `useThing.ts(x)`; server modules prefer named exports.
- Use path aliases instead of relative chains (`import X from '@server/services/…'`).

## Testing Guidelines
- Frameworks: Jest + `@testing-library/react` (jsdom env).
- Server tests live alongside code as `*.spec.ts` (e.g., `server/services/asset/asset.service.spec.ts`).
- UI tests: `*.test.tsx` near components when applicable.
- Aim for meaningful coverage across services/repositories; mock I/O at boundaries.
- Run `npm test` locally and ensure it passes before pushing.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject (optionally Conventional Commits, e.g., `feat(server): add asset service`) and focused diffs.
- PRs: clear description, linked issues, screenshots for UI changes, and notes on tests/coverage.
- Required: CI green (lint + tests), no stray `console.log`, updated docs when behavior changes.

## Security & Configuration Tips
- Copy `.env.example` to `.env`; never commit secrets. Prisma client is generated during build.
- If Prisma schema changes, run migrations locally before pushing.
- Use `vercel.json` for deploy behavior; prefer environment variables for configuration.

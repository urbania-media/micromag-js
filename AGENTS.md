# AGENTS.md - Micromag JS

Micromag is a React monorepo for building interactive multi-screen story/magazine viewers and editors, published as `@micromag/*` packages.

## Repo layout

- `elements/*` — leaf UI components (audio, video, image, footer, etc.)
- `screens/*` — full-screen compositions built from elements
- `packages/*` — shared infrastructure (`core`, `editor`, `viewer`, `fields`, etc.)
- `.storybook/` — shared Storybook config and fixture data (`#.storybook/*` import alias)
- `scripts/` — build helpers (`prepare-package.sh`, etc.)

Each workspace publishes from `src/` to `es/` (ESM) via Rollup.

## Commands

- `npm run storybook` — dev server for component work
- `npm run build` — build all workspaces (Nx-orchestrated)
- `npm run lint` / `npm run typecheck` — verify before handing off
- `npm run format` — Prettier across the source tree

## Code conventions

- **TypeScript** for new code. Define an `interface` for component props; keep `unknown` for genuinely unknown shapes rather than `any`.
- **Function components only.** No class components, no `PropTypes`.
- **Default export the component**, with `index.ts` re-exporting it (`export { default } from './Foo'`).
- **CSS Modules** with PostCSS nesting. No SCSS/Sass — the codebase has fully migrated. Co-locate `*.module.css` next to the component if the package doesn't contains a styles folder with multiple stylesheets.
- **Classnames**: use the `classnames` package, never string concatenation.
- **i18n**: all user-facing strings go through `react-intl` (`FormattedMessage` / `useIntl`).

## Working in this repo

- **Stay scoped.** A bugfix in one element shouldn't touch unrelated packages. Cross-package refactors deserve their own PR.
- **Match the surrounding style** when editing a file — import order, prop destructuring, naming. Don't reformat unrelated lines.
- **Prefer composing existing primitives** from `@micromag/core` (hooks in `core/hooks`, components in `core/components`) over reimplementing.
- **Stories travel with components.** When you add or meaningfully change a component, update or add `*.stories.tsx`.
- **Public API is `index.ts`.** Anything imported from another package must be exported there; don't reach into a package's internals.
- **Don't bump versions or edit `CHANGELOG`** — releases are handled by Lerna.
- **Don't edit generated output** (`es/`, `lib/`, `dist/`, `assets/`). Only `src/` is source of truth.

## Verifying changes

Before declaring a task done:

1. `npm run typecheck` passes.
2. `npm run lint` passes for files you touched.
3. If UI changed, exercise the affected story in Storybook — type-checks don't catch visual regressions.

If a check fails, fix the root cause rather than suppressing it (no blanket `// eslint-disable`, no `any` to silence TS).

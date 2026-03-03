# AGENTS.md - Micromag JS

## Project Overview

Micromag is a React-based monorepo for building interactive story/magazine viewers and editors. It produces responsive, swipeable, multi-screen experiences with support for rich media (audio, video, maps, galleries, quizzes, surveys, timelines, etc.). The project is published as `@micromag/*` packages on npm.

**Repository:** https://github.com/urbania-media/micromag-js
**Current version:** 0.3.831 (managed by Lerna)
**Node version:** v22 (see `.nvmrc`)
**Package manager:** npm (with npm workspaces)

## Tech Stack

- **UI:** React 18.3+ / 19+ (peer deps `^18.3.0 || ^19.0.0`), React Intl for i18n
- **Language:** TypeScript (interfaces for all component props; `unknown` used liberally — not strict mode)
- **Bundler:** Rollup 4 (packages), Webpack 5 (Storybook, viewer-build)
- **Transpiler:** Babel 7 with `@babel/preset-env` + `@babel/preset-react` + `@babel/preset-typescript`
- **Styling:** CSS Modules with PostCSS (`postcss-nested` for nesting). **Zero SCSS/Sass files remain.**
- **Bootstrap:** Pre-compiled Bootstrap 5.3 CSS loaded via `vendor.css`, with theme customization through two overlay files: `bootstrap-overrides.css` (`:root` CSS custom properties) and `bootstrap-patches.css` (component-level selector overrides)
- **Animations:** React Spring 9, @use-gesture/react 10
- **Rich text:** CKEditor 5
- **Routing:** Wouter 3
- **Monorepo tooling:** Lerna 8 + Nx 18
- **Storybook:** v10.2.12 with `@storybook/react-webpack5`

## Directory Structure

```
micromag-js/
├── elements/           # 30 UI element packages (@micromag/element-*)
├── screens/            # 27 screen type packages (@micromag/screen-*)
├── packages/           # 16 core/utility packages (@micromag/*)
│   ├── core/           # Shared components, hooks, contexts, utils, styles
│   ├── viewer/         # Viewer component
│   ├── viewer-build/   # Built/bundled viewer
│   ├── editor/         # Editor component
│   ├── fields/         # Editor field type definitions (115+ field types)
│   ├── screens/        # Screen aggregator/registry
│   ├── elements/       # Element aggregator/registry
│   ├── data/           # Data utilities
│   ├── intl/           # Internationalization
│   ├── transforms/     # Data transformers (e.g. Apple News)
│   ├── ckeditor/       # CKEditor wrapper
│   ├── consent/        # Consent management
│   ├── media-gallery/  # Media selection UI
│   ├── cli/            # Command line tools
│   ├── recorder/       # Recording utilities
│   └── micromag/       # Main aggregator package
├── scripts/            # Build and utility scripts
│   ├── build-css.js    # PostCSS-only CSS builder (replaces build-sass.js)
│   ├── lib/
│   │   ├── generateScopedName.js  # CSS Modules scoped name generator
│   │   └── getPackagesAliases.js  # resolveSourceFile() helper for .ts/.js
│   └── codemods/       # Migration codemods (historical)
├── .storybook/         # Storybook v10 configuration (ESM)
└── babel.config.js     # Root Babel config
```

## Key Commands

```bash
npm install               # Install dependencies (uses --legacy-peer-deps via .npmrc)
npm run start             # Storybook dev server on port 58800
npm run build             # Build all packages (nx run-many --target=build)
npm run build:linear      # Sequential build (if race conditions occur)
npm run build:nocache     # Build without Nx cache
npm run build:viewer      # Build viewer-build package only
npm run storybook         # Launch Storybook
npm run graph             # View Nx dependency graph
npm run intl              # Run i18n tasks
npx nx reset              # Clear Nx cache (run when changing build config)
```

Individual packages build with `../../scripts/prepare-package.sh` which runs Rollup, copies CSS, and outputs to `es/` (ES modules) and sometimes `lib/` (CJS).

## Code Style & Linting

### ESLint
- Extends: `airbnb`, `prettier`
- Parser: `@babel/eslint-parser`
- 4-space JSX indentation
- No `console.log` (allow `warn`/`error`)
- FormatJS: enforce literal default messages, no camelCase keys
- Relative package imports allowed

### Prettier
- Print width: 100
- Tab width: 4 spaces
- Single quotes, trailing commas (all)
- **Import order** (enforced by `@trivago/prettier-plugin-sort-imports`):
  1. Third-party modules
  2. `@panneau/*`
  3. `@micromag/*`
  4. Relative utils/hooks/lib
  5. Relative file imports
  6. `.css` imports
  7. Other asset imports

### Stylelint
- Config: `sass-guidelines` + SMACSS property sort order

### EditorConfig
- UTF-8, LF line endings, 4-space indent, trim trailing whitespace

## Code Conventions

### Component Pattern
```tsx
import type { TextElement } from '@micromag/core';

interface MyComponentProps {
    label?: TextElement;
    disabled?: boolean;
    className?: string;
}

function MyComponent({ label = null, disabled = false, className = null }: MyComponentProps) {
    // ...
}

export default MyComponent;
```

**Prefer `function` declarations** over `const` arrow functions for React components. This applies to all component files — screens, elements, and package components. Exceptions: components wrapped in `React.memo()` or `React.forwardRef()` may remain as arrow functions.

Components use TypeScript interfaces for props. Default values are inline in destructured parameters. `prop-types` has been fully removed from the project.

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `camelCase.ts` (e.g. `useScreenSize.ts`)
- Utilities: `camelCase.ts`
- Styles: `kebab-case.module.css`
- Stories: `ComponentName.stories.tsx` (in `_stories/` directories)
- Definitions: `definition.ts`
- Types: `packages/core/src/lib/types.ts` (80+ shared TypeScript interfaces)

### CSS Modules
- Import as `import styles from './component.module.css'`
- Use `classnames` for conditional classes
- Scoped name pattern: `[package-namespace]-[subdirectory]--[filename]-[local]`
- Nesting supported via `postcss-nested` (same syntax as SCSS nesting)
- Theme values: CSS custom properties with `--mm-*` prefix (defined in `packages/core/src/styles/theme.css`)
- Shared composable classes: `packages/core/src/styles/shared.module.css`

### CSS Architecture (Bootstrap + Theme)

The styling system has three layers:

1. **`vendor.css`** — Aggregates pre-compiled Bootstrap 5.3 CSS, Uppy CSS, and Panneau CSS
2. **`bootstrap-overrides.css`** — `:root` level `--bs-*` CSS custom property overrides (colors, typography, body, borders, focus ring, emphasis, subtle backgrounds/borders)
3. **`bootstrap-patches.css`** — Component-level selector overrides for styles that Bootstrap compiles from Sass variables at build time (button variants, form controls, cards, modals, pagination, dropdowns, nav, alerts, etc.)
4. **`theme.css`** — Project-specific `--mm-*` CSS custom properties (spacing, fonts, colors, input sizing)

**Important:** Since Bootstrap's CSS is pre-compiled, any style that was previously controlled by a Sass variable override must be explicitly overridden in `bootstrap-patches.css` using the component's selector. When adding new Bootstrap component overrides, you must define ALL CSS custom properties the component uses (e.g., `--bs-btn-color`, `--bs-btn-bg`, `--bs-btn-active-color`, etc.) — don't rely on Bootstrap's defaults being present, as loading order may cause them to be lost.

### Internationalization
- All user-facing strings use `react-intl`'s `defineMessage` / `<FormattedMessage>`
- Messages require a literal `defaultMessage` and a `description`
- No camelCase in message IDs (enforced by ESLint)

## Architecture

### Screens
Each screen is an independent package in `screens/` exporting:
- `definition.ts` — declares id, type, group, title, component, layouts, fields
- `ScreenComponent.tsx` — the React component
- `index.ts` — re-exports definition and component
- `_stories/` — Storybook stories
- `*.module.css` — styles

Definition structure:
```ts
export default [{
    id: 'screen-id',
    type: 'screen',
    group: { label: defineMessage({...}), order: N },
    title: defineMessage({...}),
    component: ScreenComponent,
    layouts: ['top', 'middle', 'bottom', 'split'],
    fields: [/* field definitions */],
}];
```

### Elements
Reusable UI building blocks in `elements/`. Same package structure as screens but simpler — they're composed into screens.

### Core Package (`packages/core/`)
The central library providing:
- **Contexts** (`src/contexts/`): ViewerContext, PlaybackContext, ScreenContext, FieldsContext, TrackingContext, SettingsContext, and 20+ more
- **Hooks** (`src/hooks/`): 40+ hooks — useMediaApi, useSwipe, useScreenSize, useTracking, useDragProgress, etc.
- **Components** (`src/components/`): Shared UI components
- **Utils** (`src/utils/`): getStyleFromText, getStyleFromBox, etc.
- **Styles** (`src/styles/`): Theme CSS, shared CSS Modules, vendor CSS, Bootstrap overrides/patches
- **Types** (`src/lib/types.ts`): 80+ TypeScript interfaces

### Fields System
`packages/fields/` defines 115+ field types for the editor. Screens declare which fields they support in their `definition.ts`. Fields handle rendering, validation, and data binding.

### Data Flow
1. Screen definitions declare editable fields
2. Editor uses fields to build editing UI
3. Screen data is stored as JSON
4. Viewer renders screens with the stored data
5. Contexts provide shared state (playback, tracking, settings)

## Package Publishing

- All packages published to npm as `@micromag/*` with public access
- Versioning via Lerna (`lerna publish` from master/develop)
- Allowed publish branches: `master`, `develop`, `feature/es-module`
- Each package exports ES modules (`es/`) via the `module` field
- Output directories: `es/`, `lib/`, `assets/`

## Adding a New Screen

1. Create `screens/my-screen/` with:
   - `package.json` (name: `@micromag/screen-my-screen`, scripts pointing to `../../scripts/prepare-package.sh`)
   - `src/index.ts` (re-exports)
   - `src/definition.ts` (screen definition with fields)
   - `src/MyScreen.tsx` (component)
   - `src/my-screen.module.css` (styles)
   - `src/_stories/MyScreen.stories.tsx`
2. Register in `packages/screens/` aggregator
3. Run `npm run build` from root

## Adding a New Element

Same pattern as screens, but in `elements/` with package name `@micromag/element-*`. Register in `packages/elements/` aggregator.

## Key Dependencies

| Package | Role |
|---------|------|
| `@micromag/core` | Shared hooks, contexts, components, utils, types |
| `@micromag/data` | Data schemas and utilities |
| `@micromag/fields` | Editor field type definitions |
| `@panneau/*` | Editor UI framework (external) |
| `@folklore/*` | Routing, tracking, CLI utilities (external) |
| `react-intl` | Internationalization |
| `@react-spring/*` | Animations |
| `@use-gesture/react` | Touch/drag interactions |
| `classnames` | Conditional CSS class names |
| `lodash` | Utility functions |

## Testing

No automated test suite is configured. Verification is done via:
- Storybook visual testing (`npm run start`)
- Manual browser testing

## Storybook Configuration

- **Version:** 10.2.12 (upgraded from v7 through v8 → v9 → v10)
- **Config:** `.storybook/main.js` (ESM with `createRequire` bridge for CJS modules)
- **Framework:** `@storybook/react-webpack5`
- **Compiler:** `@storybook/addon-webpack5-compiler-babel`
- **CSS Modules:** Custom webpack rule with `namedExport: false` (codebase uses `import styles from` default imports)
- **CSS Modules:** `postcss-nested` plugin configured for `.module.css` files
- **No SCSS rules** — only CSS rules (module.css + regular .css)
- **Default CSS rules filtered out** via `filteredRules` in `webpackFinal` to prevent double-processing
- **Custom addon:** `.storybook/addons/layouts/` — uses `storybook/manager-api` + `storybook/preview-api`
- **Preview imports:** `vendor.css`, `theme.css`, and fonts loaded in `.storybook/preview.js`
- **Stories glob:** `./src/**/*.@(mdx|stories.@(tsx))`

## Notes for AI Agents

### Build & Workflow
- Always run `npm run build` from the root after modifying packages to verify the build succeeds.
- **NX caches aggressively** — run `npx nx reset` when changing build config, Babel plugins, or PostCSS config.
- If builds fail with NX native module errors, run `npm install` again then `npx nx reset`.
- The `prepare-package.sh` script handles the full build pipeline per package. Don't modify build outputs (`es/`, `lib/`, `assets/`) directly.
- **Stale compiled CSS**: `packages/*/styles/` and `packages/*/assets/css/styles.css` are build outputs copied from `src/styles/`. After changing source CSS, you must rebuild that specific package or the stale compiled version will be used by dependents.
- **PostCSS build:** `scripts/build-css.js` is the PostCSS-only CSS builder. It uses `postcss-import` with a custom resolver that supports package.json `exports` field (which `postcss-import` doesn't natively support).

### Code Conventions
- When modifying a screen or element, check its `definition.ts` to understand the field schema.
- Cross-package dependencies flow through `@micromag/core`. Most screens and elements depend on it.
- Import order matters — Prettier enforces a specific order. Let formatting handle it.
- Use `react-intl`'s `defineMessage` for any new user-facing strings.
- Prefer existing hooks from `@micromag/core` before creating new ones.
- CSS class names are generated with a specific scoped pattern. Use CSS Modules, not global styles.

### Common Bug Patterns

#### Infinite Re-render Loops
Default parameter objects/arrays in function signatures create new references on every render. If these are used in `useEffect`/`useMemo`/`useCallback` dependency arrays, they cause infinite update loops. **Fix:** Hoist default values to module-level constants.
```tsx
// BAD — creates new object every render
const MyComponent = ({ color = { color: '#FFF', alpha: 1 } }) => {
    useEffect(() => { /* ... */ }, [color]); // infinite loop!
};

// GOOD — stable reference
const DEFAULT_COLOR = { color: '#FFF', alpha: 1 };
const MyComponent = ({ color = DEFAULT_COLOR }) => {
    useEffect(() => { /* ... */ }, [color]); // stable
};
```

#### Silent Children Dropping
When a wrapper component destructures `children` out of `...props` but renders a self-closing child tag, the entire subtree is silently dropped with no error. **Fix:** Always pass `{children}` explicitly.
```tsx
// BAD — children destructured out of props but never passed
const Wrapper = ({ children, ...props }) => (
    <InnerComponent {...props} />  // children silently lost!
);

// GOOD — explicitly pass children
const Wrapper = ({ children, ...props }) => (
    <InnerComponent {...props}>{children}</InnerComponent>
);
```

#### Commented-Out Imports from Codemods
The PropTypes-to-TypeScript codemod (`scripts/codemods/propTypes-to-ts.js`) sometimes incorrectly comments out runtime imports it misclassifies as PropTypes-related. This causes `ReferenceError: X is not defined` at runtime. Common victims: `Radios`, `FormattedMessage`, `TextField`, `ElementField`, `TagSection`. **Fix:** Uncomment the import.

#### Missing CSS Custom Properties
After the Sass-to-CSS migration, some `var(--mm-*)` references may point to variables that were never defined in `theme.css` (they were previously Bootstrap Sass variables). Check `theme.css` if a CSS variable appears empty in DevTools.

### Bootstrap CSS Patches
When Bootstrap's pre-compiled CSS doesn't match the project theme, add overrides in `bootstrap-patches.css`. Key rules:
- **Define all CSS custom properties** for each component selector, not just the ones you're changing. Bootstrap defines properties like `--bs-btn-active-color`, `--bs-btn-hover-color`, etc. on each `.btn-*` variant. If your patch selector exists, include all of them for completeness.
- **Button variants** need: `--bs-btn-color`, `--bs-btn-bg`, `--bs-btn-border-color`, `--bs-btn-hover-*` (3), `--bs-btn-focus-shadow-rgb`, `--bs-btn-active-*` (3-4), `--bs-btn-disabled-*` (3)
- **Focus colors**: The project uses purple (`#a13dff`) for focus rings. This is set via `--bs-focus-ring-color: rgba(161, 61, 255, 0.25)` in `bootstrap-overrides.css` and via `box-shadow` overrides in `bootstrap-patches.css` for `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`.
- **Dark theme**: The project uses a dark background (`#1c1c1c`) with light text (`#f5f5f5`). Form controls use semi-transparent white backgrounds (`hsla(0, 0%, 100%, 0.07)`).

### CSS Migration Lessons (SCSS → CSS)
- **Zero SCSS files remain.** All Sass has been fully removed from the build pipeline.
- CSS `composes:` only works in **top-level class selectors**, NOT inside nested blocks. For nested contexts, inline the properties directly.
- `var(--mm-x) * 2` is invalid CSS — must be `calc(var(--mm-x) * 2)`. Sass does arithmetic implicitly; CSS requires `calc()`.
- `//` single-line comments are invalid in CSS — use `/* */`. But watch for `//` inside Base64 data URLs (don't convert those).
- `(#hexcolor)` parenthesized hex colors are Sass-only syntax — remove the parentheses in plain CSS.
- `@extend %placeholder` → use `composes: className from 'path'` for top-level classes, or inline the properties for nested selectors.
- When converting Sass variables (`$var`), pre-compute arithmetic values if they were used in simple constant expressions.
- `postcss-import` does NOT respect package.json `exports` field — the build uses a custom `resolve` function with `require.resolve`.

### TypeScript Conversion Gotchas
- Type imports (`import type { X }`) can collide with component imports of the same name (e.g., `Header` type vs `Header` component). Fix: alias with `as HeaderConfig`.
- Component files named the same as types (e.g., `ConversationMessage.tsx` importing `ConversationMessage` type) cause Rollup "not exported" errors. Fix: alias with `as ConversationMessageType`.
- Arrow function types need parentheses in unions: `string | ((...args: unknown[]) => void)`.
- Files inside `packages/core/` must use relative `'../lib'` for type imports, not `'@micromag/core'` (circular dependency).

### Modernization Status: COMPLETE ✅ (branch: `feature/refactor-claude`)
All planned phases are done:
- **Phase 1:** defaultProps removed (~430 files), peer deps ^18.3.0 || ^19.0.0
- **Phase 2:** TypeScript — core types.ts (80+ interfaces), 358 .jsx → .tsx via codemod, all remaining .jsx → .tsx (41+89+15), all .js → .ts (504+ files)
- **Phase 3:** 223 .module.scss → .module.css, theme.css, shared.module.css
- **Phase 4:** Deprecated Babel plugins removed, `prop-types` fully removed (runtime validators deleted, dependency removed from all 68+ package.json files)
- **Phase 5:** Sass/SCSS fully removed — pre-compiled Bootstrap CSS + CSS custom property overrides replace Sass compilation
- **Storybook:** Upgraded v7 → v10.2.12
- **Bug fixes:** PlaybackControls infinite loop, FormsProvider children dropping, 10 commented-out import regressions, TextEditor useId(), missing CSS variables, Bootstrap patches completeness

### Available Codemods (in `scripts/codemods/` — historical, already applied)
- `scss-to-css-modules.js` — converts .module.scss → .module.css
- `inline-composes.js` — replaces nested `composes:` with inline properties
- `fix-local-sass-vars.js` — inlines remaining local Sass variable definitions
- `propTypes-to-ts.js` — converts PropTypes declarations to TypeScript interfaces, renames .jsx → .tsx

# AGENTS.md - Micromag JS

## Project Overview

Micromag is a React-based monorepo for building interactive story/magazine viewers and editors. It produces responsive, swipeable, multi-screen experiences with support for rich media (audio, video, maps, galleries, quizzes, surveys, timelines, etc.). The project is published as `@micromag/*` packages on npm.

**Repository:** https://github.com/urbania-media/micromag-js
**Current version:** 0.3.831 (managed by Lerna)
**Node version:** v22 (see `.nvmrc`)
**Package manager:** Yarn 1.22

## Tech Stack

- **UI:** React 16.8+ (supports 16, 17, 18), React Intl for i18n
- **Bundler:** Rollup 4 (packages), Webpack 5 (Storybook, viewer-build)
- **Transpiler:** Babel 7 with `@babel/preset-env` + `@babel/preset-react`
- **Styling:** SCSS with CSS Modules, PostCSS, Bootstrap 5
- **Animations:** React Spring 9, @use-gesture/react 10
- **Rich text:** CKEditor 5
- **Routing:** Wouter 3
- **Monorepo tooling:** Lerna 8 + Nx 18
- **Storybook:** 7.x with webpack5

## Directory Structure

```
micromag-js/
├── elements/           # 29 UI element packages (@micromag/element-*)
├── screens/            # 26 screen type packages (@micromag/screen-*)
├── packages/           # 16 core/utility packages (@micromag/*)
│   ├── core/           # Shared components, hooks, contexts, utils
│   ├── viewer/         # Viewer component
│   ├── viewer-build/   # Built/bundled viewer
│   ├── editor/         # Editor component
│   ├── fields/         # Editor field type definitions
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
├── .storybook/         # Storybook configuration
└── babel.config.js     # Root Babel config
```

## Key Commands

```bash
yarn install              # Install dependencies (use --legacy-peer-deps via .npmrc)
npm run start             # Storybook dev server on port 58800
npm run build             # Build all packages (nx run-many --target=build)
npm run build:linear      # Sequential build (if race conditions occur)
npm run build:nocache     # Build without Nx cache
npm run build:viewer      # Build viewer-build package only
npm run storybook         # Launch Storybook
npm run graph             # View Nx dependency graph
npm run intl              # Run i18n tasks
```

Individual packages build with `../../scripts/prepare-package.sh` which runs Rollup, copies CSS/SCSS, and outputs to `es/` (ES modules) and sometimes `lib/` (CJS).

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
  6. `.scss` imports
  7. Other asset imports

### Stylelint
- Config: `sass-guidelines` + SMACSS property sort order

### EditorConfig
- UTF-8, LF line endings, 4-space indent, trim trailing whitespace

## Code Conventions

### Component Pattern
```jsx
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const defaultProps = {
    label: null,
    disabled: false,
};

const MyComponent = ({ label, disabled }) => {
    // ...
};

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;
```

### File Naming
- Components: `PascalCase.jsx`
- Hooks: `camelCase.js` (e.g. `useScreenSize.js`)
- Styles: `kebab-case.module.scss`
- Stories: `ComponentName.stories.jsx` (in `_stories/` directories)
- Definitions: `definition.js`

### CSS Modules
- Import as `import styles from './component.module.scss'`
- Use `classnames` for conditional classes
- Scoped name pattern: `[package-namespace]-[subdirectory]--[filename]-[local]`

### Internationalization
- All user-facing strings use `react-intl`'s `defineMessage` / `<FormattedMessage>`
- Messages require a literal `defaultMessage` and a `description`
- No camelCase in message IDs (enforced by ESLint)

## Architecture

### Screens
Each screen is an independent package in `screens/` exporting:
- `definition.js` — declares id, type, group, title, component, layouts, fields
- `ScreenComponent.jsx` — the React component
- `index.js` — re-exports definition and component
- `_stories/` — Storybook stories
- `*.module.scss` — styles

Definition structure:
```js
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
- **Styles** (`src/styles/`): Shared SCSS

### Fields System
`packages/fields/` defines 115+ field types for the editor. Screens declare which fields they support in their `definition.js`. Fields handle rendering, validation, and data binding.

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
   - `src/index.js` (re-exports)
   - `src/definition.js` (screen definition with fields)
   - `src/MyScreen.jsx` (component)
   - `src/my-screen.module.scss` (styles)
   - `src/_stories/MyScreen.stories.jsx`
2. Register in `packages/screens/` aggregator
3. Run `npm run build` from root

## Adding a New Element

Same pattern as screens, but in `elements/` with package name `@micromag/element-*`. Register in `packages/elements/` aggregator.

## Key Dependencies

| Package | Role |
|---------|------|
| `@micromag/core` | Shared hooks, contexts, components, utils |
| `@micromag/data` | Data schemas and utilities |
| `@micromag/fields` | Editor field type definitions |
| `@panneau/*` | Editor UI framework (external) |
| `@folklore/*` | Routing, tracking, CLI utilities (external) |
| `react-intl` | Internationalization |
| `@react-spring/*` | Animations |
| `@use-gesture/react` | Touch/drag interactions |
| `classnames` | Conditional CSS class names |
| `lodash` | Utility functions |
| `prop-types` | Runtime type checking |

## Testing

No automated test suite is configured. Verification is done via:
- Storybook visual testing (`npm run start`)
- Manual browser testing

## Notes for AI Agents

- Always run `npm run build` from the root after modifying packages to verify the build succeeds.
- When modifying a screen or element, check its `definition.js` to understand the field schema.
- Cross-package dependencies flow through `@micromag/core`. Most screens and elements depend on it.
- Import order matters — Prettier enforces a specific order. Let formatting handle it.
- The `prepare-package.sh` script handles the full build pipeline per package. Don't modify build outputs (`es/`, `lib/`, `assets/`) directly.
- Use `react-intl`'s `defineMessage` for any new user-facing strings.
- Prefer existing hooks from `@micromag/core` before creating new ones.
- CSS class names are generated with a specific scoped pattern. Use CSS Modules, not global styles.

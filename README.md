# MICROMAG

## Prerequisites

- [nodejs](https://nodejs.org/en/) (v24+)
    - use [nvm](https://github.com/nvm-sh/nvm) and install it with `nvm install --lts`
- [lerna](https://lerna.js.org/) (v7+)
    - install with `npm i -g lerna`

## Installation

1. Copy `.env.example` to `.env`, and edit it with the right configuration.
2. Run `npm i`
3. Run `lerna run prepare`

## Using Micromag next to Panneau 5

The packages accept `react-intl` 8, 10 and 12 as a peer dependency, except `@micromag/editor`, `@micromag/fields` and `@micromag/media-gallery`, which render Panneau 4 components and stay on `react-intl` 10 or below.

`@micromag/core` depends on Panneau 4 (`@panneau/*` 4). In a site that uses Panneau 5, npm installs it nested under the Micromag packages, which has two consequences:

- The site must declare `@uppy/core` `^6.3.0` in its own dependencies. Otherwise npm hoists the `@uppy/core` 5 of Panneau 4 to the root, and the optional `@uppy/core` peer of `@panneau/fields` 5 fails with `ERESOLVE`.
- The exports of `@micromag/core` that come from Panneau 4 (`ModalContext` and `ModalsProvider` in `@micromag/core/contexts`; `Modal`, `Modals`, `ModalPortal`, `DialogModal` and `UploadModal` in `@micromag/core/components`) aren't supported there: they use nested copies of `@panneau/core` 4 and `react-intl` 10, which don't share the site's contexts. The consent modal, the viewer, the screens and the elements don't use them.

## Development

- Run `npm start` command to launch the Storybook environment. Every element of the Micromag UI should be available as [Storybook](https://storybook.js.org/) _stories_.

## Deployment

- push all changes to `develop` and `main` branches
- `git checkout main` !
- `lerna version` (most of the time, the version bump is generally a `patch`)
    - it pushes a `v*` tag, and the [Publish workflow](.github/workflows/publish.yml) publishes the packages to npm with trusted publishing (no npm token needed)
- if a publish fails, run the Publish workflow manually from the Actions tab: it publishes the versions that are missing from npm

### Trusted publishing

Each package must trust the Publish workflow on npm. Run `./scripts/npm-trust.sh` once (after `npm login`, with npm 11.15.0 or above) to configure every public package. A new package must be published manually once (`npm publish` in its folder) before it can be configured.

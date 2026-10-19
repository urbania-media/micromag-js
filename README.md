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

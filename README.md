# MICROMAG

## Prerequisites

-   [nodejs](https://nodejs.org/en/) (v18+)
    -   use [nvm](https://github.com/nvm-sh/nvm) and install it with `nvm install 14.17.0`
-   [lerna](https://lerna.js.org/) (v4, as of May 25, 2022)
    -   install with `npm i -g lerna`

## Installation

1. Copy `.env.example` to `.env`, and edit it with the right configuration.
2. Run `npm i`
3. Run `lerna run prepare` (grab a coffee or a tea, it's gonna take a while!)

## Development

-   Run `npm start` command to launch the Storybook environment. Every element of the Micromag UI should be available as [Storybook](https://storybook.js.org/) _stories_.

## Deployment

-   push all changes to `develop` and `master` branches
-   `git checkout master` !
-   `lerna publish` (most of the time, the version bump is a `patch`)

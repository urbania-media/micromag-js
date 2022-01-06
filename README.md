# MICROMAG

## Getting started

### Prerequisites

* [nodejs](https://nodejs.org/en/)
* [composer](https://getcomposer.org/doc/00-intro.md)
* [lerna](https://lerna.js.org/)
* [envoy](https://laravel.com/docs/8.x/envoy)

### Installation

1. Make sure the `.env` file exists and contains the right information.
2. Install the Javascript dependencies with `npm install`
3. Install the PHP dependencies with `composer install`
4. Build the libraries with `lerna boostrap`

### Development

Run the `npm run storybook` command to launch the Storybook environment.

Every element of the Micromag interface should be available as [Storybook](https://storybook.js.org/) _stories_.

### Deployment

* Development server: `envoy run deploy`
* Production server: `envoy run deploy-prod`
* Both: `envoy run deploy-all`

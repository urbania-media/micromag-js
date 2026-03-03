import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-webpack5';
import { spyOn } from 'storybook/test';

import withGoogleKeys from './decorators/withGoogleKeys';
import withIntlProvider from './decorators/withIntlProvider';
import withRouter from './decorators/withRouter';
import withScreenDefinition from './decorators/withScreenDefinition';
import withScreenSize from './decorators/withScreenSize';
import withVisitor from './decorators/withVisitor';

import '../packages/core/src/styles/theme.css';
import '../packages/core/src/styles/vendor.css';
import './fonts/fonts.css';

if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
}

export default definePreview({
    parameters: {
        viewport: {
            options: {
                mobileSmall: {
                    name: 'Very small (iPhone5)',
                    styles: {
                        width: '320px',
                        height: '568px',
                    },
                },
                mobileMedium: {
                    name: 'Very small (iPhoneX)',
                    styles: {
                        width: '375px',
                        height: '632px',
                    },
                },
                mobileLarge: {
                    name: 'Small (mobile)',
                    styles: {
                        width: '500px',
                        height: '800px',
                    },
                },
                tabletSmall: {
                    name: 'Medium (iPad - portrait)',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
                tabletLandscape: {
                    name: 'Medium (iPad - landscape)',
                    styles: {
                        width: '1024px',
                        height: '768px',
                    },
                },
                desktopSmall: {
                    name: 'Small (desktop)',
                    styles: {
                        width: '980px',
                        height: '550px',
                    },
                },
                desktopMedium: {
                    name: 'Medium (desktop)',
                    styles: {
                        width: '1200px',
                        height: '650px',
                    },
                },
                desktopLarge: {
                    name: 'Large (desktop)',
                    styles: {
                        width: '1600px',
                        height: '1000px',
                    },
                },
            },
        },
    },

    decorators: [
        withIntlProvider,
        withScreenSize,
        withScreenDefinition,
        withGoogleKeys,
        withVisitor,
        withRouter,
    ],

    beforeEach() {
        spyOn(console, 'log').mockName('console.log');
        spyOn(console, 'warn').mockName('console.warn');
        spyOn(console, 'error').mockName('console.error');
        spyOn(console, 'info').mockName('console.info');
        spyOn(console, 'debug').mockName('console.debug');
        spyOn(console, 'trace').mockName('console.trace');
        spyOn(console, 'count').mockName('console.count');
        spyOn(console, 'dir').mockName('console.dir');
        spyOn(console, 'assert').mockName('console.assert');
    },

    addons: [addonDocs()],
});

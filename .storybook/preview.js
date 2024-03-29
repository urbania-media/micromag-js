import '../packages/core/src/styles/vendor.scss';
import withGoogleKeys from './decorators/withGoogleKeys';
import withIntlProvider from './decorators/withIntlProvider';
import withScreenDefinition from './decorators/withScreenDefinition';
import withScreenSize from './decorators/withScreenSize';
import withVisitor from './decorators/withVisitor';
import './fonts/fonts.scss';

export const parameters = {
    viewport: {
        viewports: {
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
};

export const decorators = [
    withIntlProvider,
    withScreenSize,
    withScreenDefinition,
    withGoogleKeys,
    withVisitor,
];

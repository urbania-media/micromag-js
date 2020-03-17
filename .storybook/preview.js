import '../packages/core/src/styles/vendor.scss';
import { addParameters } from '@storybook/react';

addParameters({
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
                name: 'Medium (iPad)',
                styles: {
                    width: '768px',
                    height: '1024px',
                },
            },
            tabletSmall: {
                name: 'Medium (tablet)',
                styles: {
                    width: '790px',
                    height: '460px',
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
});

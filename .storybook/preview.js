import '../packages/core/src/styles/vendor.scss';
import '../packages/core/assets/styles.css';
import '../helpers/storybook/assets/styles.css';

import '../components/background/assets/styles.css';
import '../components/frame/assets/styles.css';
import '../components/grid/assets/styles.css';
import '../components/box/assets/styles.css';
import '../components/heading/assets/styles.css';
import '../components/image/assets/styles.css';
import '../components/text/assets/styles.css';
import '../components/video/assets/styles.css';

// import '@storybook/addon-console';
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
});

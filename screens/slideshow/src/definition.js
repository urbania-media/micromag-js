import { defineMessage } from 'react-intl';

import SlideshowScreen from './Slideshow';

// import * as transforms from './transforms/index';

export default [
    {
        id: 'slideshow',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 7,
        },
        title: defineMessage({
            defaultMessage: 'Slideshow',
            description: 'Slideshow screen title',
        }),
        component: SlideshowScreen,
        layouts: ['top', 'middle', 'bottom'],
        // transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'two-vertical-equal',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'slides',
                type: 'visuals-with-caption',
                label: defineMessage({
                    defaultMessage: 'Images',
                    description: 'Visuals field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
            {
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
            },
        ],
    },
];

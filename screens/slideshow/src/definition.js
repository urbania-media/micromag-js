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
        fields: [
            {
                name: 'slides',
                type: 'visuals-with-caption',
                label: defineMessage({
                    defaultMessage: 'Images',
                    description: 'Visuals field label',
                }),
            },
            {
                name: 'transitionDelay',
                type: 'number',
                min: 0,
                float: true,
                label: defineMessage({
                    defaultMessage: 'Transition Delay (in seconds)',
                    description: 'Number field label',
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
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
            },
        ],
    },
];

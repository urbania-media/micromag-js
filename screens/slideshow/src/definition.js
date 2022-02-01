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
        layouts: ['start', 'center', 'end'],
        // transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'center',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            // {
            //     name: 'title',
            //     type: 'heading-element',
            //     theme: {
            //         textStyle: 'heading1',
            //     },
            //     label: defineMessage({
            //         defaultMessage: 'Title',
            //         description: 'Title field label',
            //     }),
            // },
            {
                name: 'slides',
                type: 'slides',
                label: defineMessage({
                    defaultMessage: 'Slides',
                    description: 'Slides field label',
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
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    label: {
                        textStyle: 'heading2',
                    },
                },
            },
        ],
    },
];

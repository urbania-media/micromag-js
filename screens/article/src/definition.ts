import { defineMessage } from 'react-intl';

import ArticleScreen from './Article';

// import * as transforms from './transforms/index';

export default [
    {
        id: 'article',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text screen group',
            }),
            order: 2,
        },
        title: defineMessage({
            defaultMessage: 'Article',
            description: 'Article screen title',
        }),
        component: ArticleScreen,
        layouts: ['normal'],
        // transforms,
        fields: [
            {
                name: 'image',
                type: 'visual',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Visual field label',
                }),
            },
            {
                name: 'title',
                type: 'heading-element',
                inline: true,
                theme: {
                    textStyle: 'header2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'surtitle',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Overtitle',
                    description: 'Overtitle field label',
                }),
            },
            {
                name: 'date',
                type: 'date-element',
                label: defineMessage({
                    defaultMessage: 'Date',
                    description: 'Date field label',
                }),
            },
            {
                name: 'author',
                type: 'author-element',
                label: defineMessage({
                    defaultMessage: 'Author',
                    description: 'Author field label',
                }),
            },
            {
                name: 'subtitle',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Subtitle',
                    description: 'Subtitle field label',
                }),
            },
            {
                name: 'text',
                type: 'text-modal',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
                }),
            },
            // TODO: think about how to implement this wthout injecting the styles
            // {
            //     type: 'fields',
            //     isList: true,
            //     label: defineMessage({
            //         defaultMessage: 'Styles',
            //         description: 'Field section label',
            //     }),
            //     fields: [
            //         {
            //             name: 'textTitleStyle',
            //             type: 'text-style-form',
            //             label: defineMessage({
            //                 defaultMessage: 'Text title style',
            //                 description: 'Field label',
            //             }),
            //         },
            //         {
            //             name: 'textQuoteStyle',
            //             type: 'text-style-form',
            //             label: defineMessage({
            //                 defaultMessage: 'Text quote style',
            //                 description: 'Field label',
            //             }),
            //         },
            //     ],
            // },
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
                isSection: true,
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

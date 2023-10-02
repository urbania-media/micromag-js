import { defineMessage } from 'react-intl';

import ArticleScreen from './Article';
import * as transforms from './transforms/index';

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
        transforms,
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
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'surtitle',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Overtitle',
                    description: 'Overtitle field label',
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
                name: 'date',
                type: 'date',
                label: defineMessage({
                    defaultMessage: 'Date',
                    description: 'Date field label',
                }),
            },
            {
                name: 'text',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
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

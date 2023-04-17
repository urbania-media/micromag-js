import { defineMessage } from 'react-intl';

import UrbaniaRecommendation from './UrbaniaRecommendation';

export default [
    {
        id: 'urbania-recommendation',
        type: 'screen',
        namespaces: ['urbania'],
        group: {
            label: defineMessage({
                defaultMessage: 'Urbania',
                description: 'Urbania screen group',
            }),
            order: 10,
        },
        title: defineMessage({
            defaultMessage: 'Urbania recommendation',
            description: 'Urbania screen title',
        }),
        component: UrbaniaRecommendation,
        fields: [
            {
                name: 'category',
                type: 'heading-element',
                label: defineMessage({
                    defaultMessage: 'Category',
                    description: 'Title field label',
                }),
            },
            {
                name: 'date',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Date',
                    description: 'Text field label',
                }),
            },
            {
                name: 'title',
                type: 'heading-element',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'sponsor',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Sponsor',
                    description: 'Text field label',
                }),
            },
            {
                name: 'description',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Description',
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

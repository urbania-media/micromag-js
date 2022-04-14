import { defineMessage } from 'react-intl';
import Recommendation from './Recommendation';

export default [
    {
        id: 'urbania-recommendation',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Urbania',
                description: 'Urbania screen group',
            }),
            order: 10,
        },
        title: defineMessage({
            defaultMessage: 'Urbania recommendation screen',
            description: 'Urbania screen title',
        }),
        component: Recommendation,
        fields: [
            {
                name: 'category',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Category',
                    description: 'Text field label',
                }),
            },
            {
                name: 'date',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Date',
                    description: 'Text field label',
                }),
            },
            {
                name: 'title',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Text field label',
                }),
            },
            {
                name: 'sponsor',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Sponsor',
                    description: 'Text field label',
                }),
            },
            {
                name: 'description',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
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

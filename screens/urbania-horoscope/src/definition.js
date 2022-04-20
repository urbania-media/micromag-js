import { defineMessage } from 'react-intl';
import Horoscope from './Horoscope';

export default [
    {
        id: 'urbania-horoscope',
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
            defaultMessage: 'Urbania horoscope screen',
            description: 'Urbania screen title',
        }),
        component: Horoscope,
        fields: [
            {
                name: 'title',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading1',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
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

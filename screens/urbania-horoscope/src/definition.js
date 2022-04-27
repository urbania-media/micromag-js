import { defineMessage } from 'react-intl';
import Horoscope from './Horoscope';
import signs from './signs';

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
                name: 'author',
                type: 'author-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Author',
                    description: 'Author field label',
                }),
            },
            {
                name: 'signs',
                component: 'items',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Signs',
                    description: 'State label',
                }),
                defaultValue: signs,
                withoutSort: true,
                withoutAddItem: true,
                withoutDeleteItem: true,
                itemsField: {
                    type: 'field-with-form',
                    breadcrumbLabel: defineMessage({
                        defaultMessage: 'Sign',
                        description: 'Breadcrumb field label',
                    }),
                    labelPath: 'id',
                    fields: [
                        {
                            name: 'word',
                            type: 'heading-element',
                            label: defineMessage({
                                defaultMessage: 'Word of the week',
                                description: 'Field label',
                            }),
                        },
                        {
                            name: 'description',
                            type: 'text-element',
                            label: defineMessage({
                                defaultMessage: 'Description',
                                description: 'Field label',
                            }),
                        },
                    ],
                },
            },
            {
                name: 'button',
                type: 'button-element',
                theme: {
                    textStyle: 'button',
                },
                label: defineMessage({
                    defaultMessage: 'Button',
                    description: 'Field label',
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
<<<<<<< HEAD
=======
            {
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
>>>>>>> bbcb5e74b786e9e5126e4a51994674e824ca7643
        ],
    },
];

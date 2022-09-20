import { defineMessage } from 'react-intl';
import UrbaniaHoroscope from './UrbaniaHoroscope';
import signs from './data/signs';

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
            defaultMessage: 'Urbania horoscope',
            description: 'Urbania screen title',
        }),
        component: UrbaniaHoroscope,
        states: [
            {
                id: 'intro',
                label: defineMessage({ defaultMessage: 'Intro', description: ' UrbaniaHoroscope state' }),
                fields: [
                    {
                        name: 'title',
                        type: 'heading-element',
                        label: defineMessage({
                            defaultMessage: 'Title',
                            description: 'Title field label',
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
                        name: 'button',
                        type: 'button-element',
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
                ],
            },
            {
                id: 'grid',
                label: defineMessage({ defaultMessage: 'Grid', description: 'UrbaniaHoroscope state' }),
                fields: [
                    {
                        name: 'popupBackground',
                        type: 'background',
                        label: defineMessage({
                            defaultMessage: 'Background',
                            description: 'Background field label',
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
                ],
            },
            {
                id: 'signs',
                label: defineMessage({ defaultMessage: 'Signs', description: 'UrbaniaHoroscope state' }),
                defaultValue: signs,
                repeatable: true,
                withoutCreate: true,
                fieldName: 'signs',
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
        ],
        fields: [
            {
                name: 'signSubtitle',
                type: 'heading-element',
                defaultValue: { body: 'Le mot de la semaine' },
                label: defineMessage({
                    defaultMessage: 'Sign Subtitle',
                    description: 'Heading field label',
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
        ],
    },
];

import { defineMessage } from 'react-intl';
import Grid from './Grid';

export default [
    {
        id: 'urbania-horoscope',
        type: 'screen',
        namespaces: ['urbania'],
        group: {
            label: defineMessage({
                defaultMessage: 'List',
                description: 'List screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Grid',
            description: 'Grid screen title',
        }),
        component: Grid,
        fields: [
            {
                id: 'items',
                label: defineMessage({ defaultMessage: 'Items', description: 'Grid state' }),
                fieldName: 'items',
                fields: [
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
    },
];

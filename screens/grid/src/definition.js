import { defineMessage } from 'react-intl';

import Grid from './Grid';

export default [
    {
        id: 'grid',
        type: 'screen',
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
        states: [
            {
                id: 'grid',
                label: defineMessage({ defaultMessage: 'Grid', description: 'Grid state' }),
                fields: [
                    {
                        name: 'columns',
                        type: 'number',
                        defaultValue: 3,
                        isHorizontal: true,
                        label: defineMessage({
                            defaultMessage: 'Number of columns',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'spacing',
                        type: 'number',
                        defaultValue: 5,
                        isHorizontal: true,
                        label: defineMessage({
                            defaultMessage: 'Space between items',
                            description: 'Field label',
                        }),
                    },
                ],
            },
            {
                id: 'items',
                label: defineMessage({ defaultMessage: 'Items', description: 'Grid item state' }),
                defaultValue: [],
                repeatable: true,
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
        fields: [
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

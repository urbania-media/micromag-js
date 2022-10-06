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
        layouts: ['top', 'middle', 'bottom'],
        component: Grid,
        states: [
            {
                id: 'grid',
                label: defineMessage({ defaultMessage: 'Grid', description: 'Grid state' }),
                fields: [
                    {
                        name: 'layout',
                        type: 'screen-layout',
                        defaultValue: 'middle',
                        label: defineMessage({
                            defaultMessage: 'Layout',
                            description: 'Layout field label',
                        }),
                    },
                    {
                        name: 'columnAlign',
                        type: 'alignHorizontal',
                        defaultValue: 'middle',
                        label: defineMessage({
                            defaultMessage: 'Align items',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'columns',
                        type: 'number',
                        defaultValue: 3,
                        isHorizontal: true,
                        label: defineMessage({
                            defaultMessage: 'Columns',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'spacing',
                        type: 'number',
                        defaultValue: 5,
                        isHorizontal: true,
                        label: defineMessage({
                            defaultMessage: 'Spacing',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'items',
                        type: 'buttons',
                        theme: {
                            label: {
                                textStyle: 'button',
                            },
                        },
                        label: defineMessage({
                            defaultMessage: 'Buttons',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'textStyle',
                        type: 'text-style-form',
                        label: defineMessage({
                            defaultMessage: 'Label style',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'boxStyle',
                        type: 'box-style-form',
                        label: defineMessage({
                            defaultMessage: 'Button style',
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
                        name: 'content',
                        type: 'text-element',
                        label: defineMessage({
                            defaultMessage: 'Content',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'largeVisual',
                        type: 'visual',
                        label: defineMessage({
                            defaultMessage: 'Visual',
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

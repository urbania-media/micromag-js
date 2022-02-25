import { defineMessage } from 'react-intl';

export default {
    id: 'box-style',
    fields: [
        {
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Box style',
                description: 'Fields label',
            }),
            isList: true,
            fields: [
                {
                    name: 'backgroundColor',
                    label: defineMessage({
                        defaultMessage: 'Background color',
                        description: 'Background color label',
                    }),
                    type: 'color',
                },
                {
                    name: 'borderRadius',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [0, 2, 4, 6, 8, 10],
                    label: defineMessage({
                        defaultMessage: 'Rounded corners',
                        description: 'Rounded corners label',
                    }),
                },
                {
                    name: 'padding',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [5, 10, 20, 30, 40],
                    label: defineMessage({
                        defaultMessage: 'Padding',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Border',
                description: 'Border label',
            }),
            isList: true,
            fields: [
                {
                    name: 'borderWidth',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [0, 1, 2, 3, 4, 5],
                    label: defineMessage({
                        defaultMessage: 'Size',
                        description: 'Size label',
                    }),
                },
                {
                    name: 'borderColor',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Color',
                        description: 'Color label',
                    }),
                },
                {
                    name: 'borderStyle',
                    type: 'border-style',
                    isHorizontal: true,
                },
            ],
        },
    ],
};
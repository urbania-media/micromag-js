import { defineMessage } from 'react-intl';

export default {
    id: 'box-style',
    fields: [
        {
            type: 'fields',
            isList: true,
            label: defineMessage({
                defaultMessage: 'Box',
                description: 'Field label',
            }),
            fields: [
                {
                    name: 'backgroundColor',
                    label: defineMessage({
                        defaultMessage: 'Background color',
                        description: 'Field label',
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
                        description: 'Field label',
                    }),
                },
                {
                    name: 'padding',
                    type: 'padding',
                    isHorizontal: true,
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
                description: 'Field label',
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
                        description: 'Field label',
                    }),
                },
                {
                    name: 'borderColor',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Color',
                        description: 'Field label',
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

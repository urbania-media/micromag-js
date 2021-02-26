import { defineMessage } from 'react-intl';

export default {
    id: 'button-style',
    fields: [
        {
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Button style',
                description: 'Button style label',
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
                        defaultMessage: 'Rounded corner',
                        description: 'Rounded corner label',
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
                    name: 'borderStyle',
                    type: 'border-style',
                    isHorizontal: true,
                    label: defineMessage({
                        defaultMessage: 'Style',
                        description: 'Style label',
                    }),
                },
                {
                    name: 'borderColor',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Border color',
                        description: 'Border color label',
                    }),
                },
            ],
        },
    ],
};

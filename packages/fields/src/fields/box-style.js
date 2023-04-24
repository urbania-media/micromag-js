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
                    dataList: [0, 2, 4, 6, 8, 10, 16, 20, 24, 30],
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
                    label: defineMessage({
                        defaultMessage: 'Style',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Shadow',
                description: 'Field label',
            }),
            isList: true,
            fields: [
                {
                    name: 'shadowDistance',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [0, 1, 2, 3, 4, 5],
                    label: defineMessage({
                        defaultMessage: 'Distance',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'shadowBlur',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [0, 1, 2, 3, 4, 5],
                    label: defineMessage({
                        defaultMessage: 'Blur',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'shadowColor',
                    label: defineMessage({
                        defaultMessage: 'Color',
                        description: 'Field label',
                    }),
                    type: 'color',
                },
                {
                    name: 'shadowAngle',
                    type: 'shadow-angle',
                    label: defineMessage({
                        defaultMessage: 'Angle',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};

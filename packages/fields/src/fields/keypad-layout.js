import { defineMessage } from 'react-intl';

export default {
    id: 'keypad-layout',
    fields: [
        {
            name: 'buttonStyles',
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Buttons',
                description: 'Field label',
            }),
            defaultValue: {
                boxStyle: {
                    backgroundColor: { alpha: 0.5, color: '#000' },
                },
            },
            isList: true,
            fields: [
                {
                    name: 'buttonLayout',
                    type: 'button-layout',
                    isHorizontal: true,
                    label: defineMessage({
                        defaultMessage: 'Layout',
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
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Layout / Spacing',
                description: 'Fields section label',
            }),
            isList: true,
            fields: [
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
                    type: 'radios',
                    defaultValue: 3,
                    options: [
                        {
                            value: 1,
                            label: defineMessage({
                                defaultMessage: '1',
                                description: 'Radio option label',
                            }),
                        },
                        {
                            value: 2,
                            label: defineMessage({
                                defaultMessage: '2',
                                description: 'Radio option label',
                            }),
                        },
                        {
                            value: 3,
                            label: defineMessage({
                                defaultMessage: '3',
                                description: 'Radio option label',
                            }),
                        },
                        {
                            value: 4,
                            label: defineMessage({
                                defaultMessage: '4',
                                description: 'Radio option label',
                            }),
                        },
                    ],
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
                    name: 'withSquareItems',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Use square keys',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};

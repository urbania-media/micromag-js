import { defineMessage } from 'react-intl';

import Keypad from './Keypad';

export default [
    {
        id: 'keypad',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'List',
                description: 'List screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Keypad',
            description: 'Keypad screen title',
        }),
        layouts: ['top', 'middle', 'bottom'],
        component: Keypad,
        states: [
            {
                id: 'keypad',
                label: defineMessage({ defaultMessage: 'Buttons', description: 'Keypad state' }),
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
                        name: 'keypadSettings',
                        type: 'fields',
                        isList: false,
                        withoutLabel: true,
                        defaultValue: {
                            layout: {
                                columnAlign: 'middle',
                                columns: 3,
                                spacing: 2,
                                withSquareItems: false,
                            },
                        },
                        label: defineMessage({
                            defaultMessage: 'Keypad settings',
                            description: 'Field label',
                        }),
                        fields: [
                            {
                                name: 'layout',
                                type: 'keypad-layout',
                                isList: true,
                            },
                        ],
                    },
                    {
                        name: 'items',
                        type: 'buttons',
                        label: defineMessage({
                            defaultMessage: 'Items',
                            description: 'Field label',
                        }),
                        theme: {
                            label: {
                                textStyle: 'button',
                            },
                        },
                        isSection: true,
                    },
                    {
                        name: 'buttonStyles',
                        type: 'fields',
                        defaultValue: {
                            layout: 'label-bottom',
                            boxStyle: {
                                backgroundColor: { alpha: 0.15, color: '#000000' },
                            },
                        },
                        isList: true,
                        fields: [
                            {
                                name: 'layout',
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
                ],
            },
            {
                id: 'popups',
                label: defineMessage({ defaultMessage: 'Popups', description: 'Popup state' }),
                fields: [
                    {
                        name: 'popupStyles',
                        type: 'fields',
                        defaultValue: {
                            layout: 'content-top',
                        },
                        isList: true,
                        fields: [
                            {
                                name: 'layout',
                                type: 'card-layout',
                                label: defineMessage({
                                    defaultMessage: 'Layout',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'headingTextStyle',
                                type: 'text-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Heading text style',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'contentTextStyle',
                                type: 'text-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Content text style',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'boxStyle',
                                type: 'box-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Box style',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'backdrop',
                                type: 'background',
                                label: defineMessage({
                                    defaultMessage: 'Background',
                                    description: 'Field label',
                                }),
                            },
                        ],
                    },
                ],
            },

            {
                id: 'popup',
                label: defineMessage({
                    defaultMessage: 'Popup',
                    description: 'Keypad item state',
                }),
                defaultValue: [],
                repeatable: true,
                fieldName: 'items',
                fields: [
                    {
                        name: 'heading',
                        type: 'heading-element',
                        label: defineMessage({
                            defaultMessage: 'Heading',
                            description: 'Field label',
                        }),
                    },
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
                    {
                        name: 'button',
                        type: 'button-link',
                        label: defineMessage({
                            defaultMessage: 'Button',
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
            {
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
            },
        ],
    },
];

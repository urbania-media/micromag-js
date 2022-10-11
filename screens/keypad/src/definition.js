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
                label: defineMessage({ defaultMessage: 'Keypad', description: 'Keypad state' }),
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
                        name: 'keypadLayout',
                        type: 'keypad-layout-form',
                        label: defineMessage({
                            defaultMessage: 'Keypad layout',
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
                    // {
                    //     name: 'buttonLayout',
                    //     type: 'button-layout',
                    //     label: defineMessage({
                    //         defaultMessage: 'Button layout',
                    //         description: 'Field label',
                    //     }),
                    // },
                    {
                        name: 'buttonStyles',
                        type: 'fields',
                        label: defineMessage({
                            defaultMessage: 'Buttons style',
                            description: 'Field label',
                        }),
                        isList: true,
                        fields: [
                            {
                                name: 'buttonLayout',
                                type: 'button-layout',
                                isHorizontal: true,
                                label: defineMessage({
                                    defaultMessage: 'Button layout',
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
                id: 'items',
                label: defineMessage({ defaultMessage: 'Items', description: 'Keypad item state' }),
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
                        name: 'popupStyles',
                        type: 'fields',
                        label: defineMessage({
                            defaultMessage: 'Popups style',
                            description: 'Field label',
                        }),
                        isList: true,
                        fields: [
                            {
                                name: 'textStyle',
                                type: 'text-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Popup content style',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'boxStyle',
                                type: 'box-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Popup frame style',
                                    description: 'Field label',
                                }),
                            },
                        ],
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

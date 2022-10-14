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
                        defaultValue: {
                            columnAlign: 'middle',
                            columns: 3,
                            spacing: 10,
                            buttonStyles: {
                                layout: 'label-bottom',
                                boxStyle: {
                                    backgroundColor: { alpha: 0.15, color: '#000000' },
                                },
                            },
                        },
                        label: defineMessage({
                            defaultMessage: 'Layout & styles',
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
                ],
            },
            {
                id: 'popup',
                label: defineMessage({ defaultMessage: 'Popup', description: 'Popup state' }),
                fields: [
                    {
                        name: 'popupStyles',
                        type: 'fields',
                        defaultValue: {
                            layout: 'content-top',
                        },
                        label: defineMessage({
                            defaultMessage: 'Popup style',
                            description: 'Field label',
                        }),
                        isList: true,
                        fields: [
                            {
                                name: 'layout',
                                type: 'card-layout',
                                defaultValue: 'content-top',
                                label: defineMessage({
                                    defaultMessage: 'Popup layout',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'textStyle',
                                type: 'text-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Text style',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'boxStyle',
                                type: 'box-style-form',
                                label: defineMessage({
                                    defaultMessage: 'Frame and backgound styles',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'backdrop',
                                type: 'color',
                                label: defineMessage({
                                    defaultMessage: 'Backdrop color',
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

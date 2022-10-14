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
                        type: 'fields',
                        label: defineMessage({
                            defaultMessage: 'Keypad Layout',
                            description: 'Keypad state',
                        }),
                        isList: true,
                        isSection: true,
                        defaultValue: {
                            columnAlign: 'middle',
                            columns: 3,
                            spacing: 5,
                        },
                        fields: [
                            {
                                name: 'columnAlign',
                                type: 'align-horizontal',
                                label: defineMessage({
                                    defaultMessage: 'Align items',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'columns',
                                type: 'radios',
                                options: [
                                    {
                                        value: 1,
                                        label: 1,
                                    },
                                    {
                                        value: 2,
                                        label: 2,
                                    },
                                    {
                                        value: 3,
                                        label: 3,
                                    },
                                    {
                                        value: 4,
                                        label: 4,
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
                                isHorizontal: true,
                                label: defineMessage({
                                    defaultMessage: 'Spacing',
                                    description: 'Field label',
                                }),
                            },
                            {
                                name: 'withSquareItems',
                                type: 'toggle',
                                label: defineMessage({
                                    defaultMessage: 'Use square keys',
                                    description: 'Field label',
                                }),
                            },
                        ],
                    },
                    {
                        name: 'buttonStyles',
                        type: 'fields',
                        label: defineMessage({
                            defaultMessage: 'Buttons Layout',
                            description: 'Field label',
                        }),
                        defaultValue: {
                            layout: 'label-bottom',
                            boxStyle: {
                                backgroundColor: { alpha: 0.15, color: '#000000' },
                            },
                        },
                        isList: true,
                        isSection: true,
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
                id: 'popups',
                label: defineMessage({ defaultMessage: 'Popups', description: 'Keypad item state' }),
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

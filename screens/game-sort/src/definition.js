import { defineMessage } from 'react-intl';

import GameSortScreen from './GameSort';

// import * as transforms from './transforms/index';

export default {
    id: 'game-sort',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Game',
            description: 'Screen group',
        }),
        order: 12,
    },
    title: defineMessage({
        defaultMessage: 'Sort game',
        description: 'Sort game screen title',
    }),
    component: GameSortScreen,
    layouts: ['top', 'middle', 'bottom'],
    // transforms,
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
            name: 'heading',
            type: 'heading-element',
            label: defineMessage({
                defaultMessage: 'Heading',
                description: 'Heading field label',
            }),
        },
        {
            name: 'items',
            type: 'buttons',
            label: defineMessage({
                defaultMessage: 'Buttons',
                description: 'Field label',
            }),
            itemsProps: {
                excludedFields: ['url', 'inWebView'],
            },
            isSection: true,
        },
        {
            name: 'buttonStyles',
            type: 'fields',
            isList: true,
            fields: [
                {
                    name: 'layout',
                    type: 'button-layout',
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
                        defaultMessage: 'Buttons style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'validBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Valid buttons style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'invalidBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Invalid buttons style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'submitBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Submit button style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'validatedBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Validated button style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'submitButtonLabel',
                    type: 'text-element',
                    label: defineMessage({
                        defaultMessage: 'Submit button label',
                        description: 'Button label field',
                    }),
                },
                {
                    name: 'validatedButtonLabel',
                    type: 'text-element',
                    label: defineMessage({
                        defaultMessage: 'Validated button label',
                        description: 'Button label field',
                    }),
                },
            ],
        },
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
};

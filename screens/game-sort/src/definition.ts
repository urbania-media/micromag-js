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
            type: 'game-sort-items',
            label: defineMessage({
                defaultMessage: 'Items',
                description: 'Field label',
            }),
            isSection: true,
        },
        {
            label: defineMessage({
                defaultMessage: 'Items style',
                description: 'Field label',
            }),
            type: 'fields',
            isList: true,
            isSection: true,
            fields: [
                {
                    name: 'itemsLayout',
                    type: 'button-layout',
                    label: defineMessage({
                        defaultMessage: 'Layout',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'itemsTextStyle',
                    type: 'text-style-form',
                    label: defineMessage({
                        defaultMessage: 'Label style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'resultsTextStyle',
                    type: 'text-style-form',
                    label: defineMessage({
                        defaultMessage: 'Results style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'itemsBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Box style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'validBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Valid box style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'invalidBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Invalid box style',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            label: defineMessage({
                defaultMessage: 'Submit button',
                description: 'Submit button section label',
            }),
            type: 'fields',
            isList: true,
            isSection: true,
            fields: [
                {
                    name: 'submitButtonLabel',
                    type: 'text',
                    label: defineMessage({
                        defaultMessage: 'Label',
                        description: 'Button label field',
                    }),
                },
                {
                    name: 'submitBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Button style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'submitTextStyle',
                    type: 'text-style-form',
                    label: defineMessage({
                        defaultMessage: 'Text style',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            label: defineMessage({
                defaultMessage: 'Results',
                description: 'Section label',
            }),
            type: 'fields',
            isList: true,
            isSection: true,
            fields: [
                {
                    name: 'results',
                    type: 'text-element',
                    theme: {
                        textStyle: 'text',
                    },
                    label: defineMessage({
                        defaultMessage: 'Text',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'resultsBoxStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Box style',
                        description: 'Field label',
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

import { defineMessage } from 'react-intl';
import TextScreen from './Text';
import TextTitleScreen from './TextTitle';
import * as transforms from './transforms/index';

export default [
    {
        id: 'text',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text screen group',
            }),
            order: 2,
        },
        title: defineMessage({
            defaultMessage: 'Text',
            description: 'Text screen title',
        }),
        component: TextScreen,
        layouts: ['top', 'middle', 'bottom'],
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'top',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'text',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
                }),
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
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
    {
        id: 'text-title',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text screen group',
            }),
            order: 2,
        },
        title: defineMessage({
            defaultMessage: 'Text with title',
            description: 'TextTitle screen title',
        }),
        component: TextTitleScreen,
        layouts: ['top', 'middle', 'bottom', 'split'],
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'top',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'title',
                type: 'heading-element',
                inline: true,
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'text',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
                }),
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
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
];

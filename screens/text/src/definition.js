import { defineMessage } from 'react-intl';
import TextScreen from './Text';
import TextTitleScreen from './TextTitle';
import * as transforms from './transforms/index';

export default [
    {
        id: 'text',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Text',
            description: 'Text screen group',
        }),
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
                    textColor: 'primary',
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
        ],
    },
    {
        id: 'text-title',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Text',
            description: 'Text screen group',
        }),
        title: defineMessage({
            defaultMessage: 'TextTitle',
            description: 'TextTitle screen title',
        }),
        component: TextTitleScreen,
        layouts: ['top', 'middle', 'bottom', 'split'],
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'title',
                type: 'text-element',
                theme: {
                    textStyle: 'heading1',
                    textColor: 'primary',
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
                    textColor: 'primary',
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
        ],
    },
];

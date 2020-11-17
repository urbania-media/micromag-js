import { defineMessage } from 'react-intl';
import TextScreen from './Text';
import TextTitleScreen from './TextTitle';

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
        fields: [
            {
                name: 'layout',
                component: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'text',
                component: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
                }),
            },
            {
                name: 'background',
                component: 'background',
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
        fields: [
            {
                name: 'layout',
                component: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'text',
                component: 'text',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
                }),
            },
            {
                name: 'title',
                component: 'text',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'background',
                component: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
        ],
    },
];

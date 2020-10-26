import { defineMessage } from 'react-intl';
import Text from './Text';
import TextTitle from './TextTitle';

export default [
    {
        id: 'text',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'Text',
            description: 'Text screen title',
        }),
        component: Text,
        layouts: ['top', 'middle', 'bottom'],
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
                type: 'text',
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
        title: defineMessage({
            defaultMessage: 'TextTitle',
            description: 'TextTitle screen title',
        }),
        component: TextTitle,
        layouts: ['top', 'middle', 'bottom', 'split'],
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
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
                }),
            },
            {
                name: 'title',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
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
]

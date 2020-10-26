import { defineMessage } from 'react-intl';
import Video from './Video';

export default [
    {
        id: 'video',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Video',
            description: 'Video screen group',
        }),
        title: defineMessage({
            defaultMessage: 'Video',
            description: 'Video screen title',
        }),
        component: Video,
        layouts: ['center', 'full'],
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
                name: 'video',
                type: 'video',
                label: defineMessage({
                    defaultMessage: 'Video',
                    description: 'Video field label',
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

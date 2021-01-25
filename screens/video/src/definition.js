import { defineMessage } from 'react-intl';

import VideoScreen from './Video';

export default {
    id: 'video',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Audio and Video',
        description: 'Audio and Video screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Video',
        description: 'Video screen title',
    }),
    component: VideoScreen,
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
            type: 'video-element',
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
};

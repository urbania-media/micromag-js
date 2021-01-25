import { defineMessage } from 'react-intl';

import Video360Screen from './Video360';

export default {
    id: 'video-360',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Audio and Video',
        description: 'Audio and Video screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Video 360',
        description: 'Video 360 screen title',
    }),
    component: Video360Screen,
    layouts: ['full'],
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

import { defineMessage } from 'react-intl';

import Video360Screen from './Video360';
import * as transforms from './transforms/index';

export default {
    id: 'video-360',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Audio and Video',
            description: 'Audio and Video screen group',
        }),
        order: 5,
    },
    title: defineMessage({
        defaultMessage: '360 Video',
        description: 'Video 360 screen title',
    }),
    component: Video360Screen,
    layouts: ['full'],
    transforms,
    fields: [
        {
            name: 'video',
            type: 'video-element',
            theme: {
                color: 'primary',
            },
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

import { defineMessage } from 'react-intl';

import VideoScreen from './Video';
import * as transforms from './transforms/index';

export default {
    id: 'video',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Audio and Video',
            description: 'Audio and Video screen group',
        }),
        order: 5,
    },
    title: defineMessage({
        defaultMessage: 'Video',
        description: 'Video screen title',
    }),
    component: VideoScreen,
    layouts: ['middle', 'full'],
    transforms,
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
        {
            name: 'callToAction',
            type: 'call-to-action',
            defaultValue: { active: false, type: 'swipe-up' },
            label: defineMessage({
                defaultMessage: 'Call to Action',
                description: 'Call to Action field label',
            }),
        },
    ],
};

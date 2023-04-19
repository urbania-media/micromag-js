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
            defaultValue: {
                autoPlay: true,
            },
            label: defineMessage({
                defaultMessage: 'Video',
                description: 'Video field label',
            }),
        },
        {
            name: 'gotoNextScreenOnEnd',
            type: 'toggle',
            defaultValue: false,
            label: defineMessage({
                defaultMessage: 'Go to next screen on end',
                description: 'Field label',
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

import { defineMessage } from 'react-intl';

import AudioScreen from './Audio';

// import * as transforms from './transforms/index';

export default {
    id: 'audio',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Audio and Video',
            description: 'Audio and Video screen group',
        }),
        order: 5,
    },
    title: defineMessage({
        defaultMessage: 'Audio',
        description: 'Audio screen title',
    }),
    component: AudioScreen,
    layouts: ['middle'],
    // transforms,
    fields: [
        {
            name: 'audio',
            type: 'audio-element',
            theme: {
                color: 'primary',
            },
            defaultValue: {
                autoPlay: true,
            },
            label: defineMessage({
                defaultMessage: 'Audio',
                description: 'Audio field label',
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

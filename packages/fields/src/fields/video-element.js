import { defineMessage } from 'react-intl';

export default {
    id: 'video-element',
    fields: [
        {
            name: 'media',
            type: 'video',
        },
    ],
    settings: [
        {
            name: 'autoPlay',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'AutoPlay',
                description: 'Field label',
            }),
        },
        {
            name: 'loop',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'Loop',
                description: 'Field label',
            }),
        },
        {
            name: 'withPlayPause',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'With play/pause button',
                description: 'Field label',
            }),
        },
        {
            name: 'withSeekBar',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'With seek bar',
                description: 'Field label',
            }),
        },
        {
            name: 'withTime',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'With time',
                description: 'Field label',
            }),
        },
        {
            name: 'closedCaptions',
            type: 'closed-captions',
            label: defineMessage({
                defaultMessage: 'Closed captions',
                description: 'Field label',
            }),
        },
    ],
};

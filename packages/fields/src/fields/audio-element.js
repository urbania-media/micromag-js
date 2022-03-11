import { defineMessage } from 'react-intl';

export default {
    id: 'audio-element',
    fields: [
        {
            name: 'media',
            type: 'audio',
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
            name: 'closedCaptions',
            type: 'closed-captions',
            label: defineMessage({
                defaultMessage: 'Closed captions',
                description: 'Field label',
            }),
        },
    ],
};

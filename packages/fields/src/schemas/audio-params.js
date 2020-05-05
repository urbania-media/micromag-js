import messages from '../messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/audio-params.json',
    title: 'Audio parameters',
    type: 'object',
    intl: {
        title: messages.audioParamsTitle,
    },
    properties: {
        loop: {
            type: 'boolean',
            title: 'Loop',
            component: 'toggle',
            intl: {
                title: messages.audioParamsPropsLoop,
            },
        },
        autoPlay: {
            type: 'boolean',
            title: 'Autoplay',
            component: 'toggle',
            intl: {
                title: messages.audioParamsPropsAutoPlay,
            },
        },
        muted: {
            type: 'boolean',
            title: 'Muted',
            component: 'toggle',
            intl: {
                title: messages.audioParamsPropsMuted,
            },
        },
        native: {
            type: 'boolean',
            title: 'Native',
            component: 'toggle',
            intl: {
                title: messages.audioParamsPropsNative,
            },
        },
    },
};

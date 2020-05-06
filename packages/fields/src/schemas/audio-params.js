import { defineMessages } from 'react-intl';

const messages = defineMessages({
    audioParamsTitle: {
        id: 'schemas.audio-params.title',
        defaultMessage: 'Audio parameters',
    },
    audioParamsPropsLoop: {
        id: 'schemas.audio-params.props.loop',
        defaultMessage: 'Loop',
    },
    audioParamsPropsAutoPlay: {
        id: 'schemas.audio-params.props.autoplay',
        defaultMessage: 'Autoplay',
    },
    audioParamsPropsMuted: {
        id: 'schemas.audio-params.props.muted',
        defaultMessage: 'Muted',
    },
    audioParamsPropsNative: {
        id: 'schemas.audio-params.props.native',
        defaultMessage: 'Native',
    },
});

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

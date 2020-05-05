import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/video.json',
    title: 'Video',
    type: 'object',
    component: 'element-list',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                video: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/video.json',
                    title: 'Video',
                    intl: {
                        title: messages.video,
                    },
                },
                videoParams: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/video-params.json',
                    title: 'Video parameters',
                    setting: true,
                    intl: {
                        title: messages.videoParams,
                    },
                },
                subtitles: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/subtitles.json',
                    title: 'Subtitles',
                    setting: true,
                    intl: {
                        title: messages.subtitles,
                    },
                },
                subtitleStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/text-style.json',
                    title: 'Subtitle style',
                    setting: true,
                    intl: {
                        title: messages.subtitleStyle,
                    },
                },
            },
        },
    ],
};

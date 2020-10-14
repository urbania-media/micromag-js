import { layouts } from './Gif';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/gif.json',
    title: 'Gif',
    group: 'Video',
    type: 'object',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                    title: 'Layout',
                    screenType: 'video',
                    enum: layouts,
                    intl: {
                        title: messages.layout,
                    },
                },
                video: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/video.json',
                    title: 'Video',
                    intl: {
                        title: messages.video,
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
            },
        },
    ],
};

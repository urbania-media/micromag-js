import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/video.json',
    title: 'Video',
    type: 'object',
    component: 'element',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                url: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/url.json',
                    title: 'URL',
                    intl: {
                        title: messages.url,
                    },
                },
            },
        },
    ],
};

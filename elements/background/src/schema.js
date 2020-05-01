import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/background.json',
    title: 'Background',
    type: 'object',
    component: 'element-list',
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                color: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
                    type: 'object',
                    title: 'Couleur',
                    intl: {
                        title: messages.color,
                    },
                },
                image: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/image.json',
                    type: 'object',
                    title: 'Image',
                    intl: {
                        title: messages.image,
                    },
                },
                video: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/video.json',
                    type: 'object',
                    title: 'Vidéo',
                    intl: {
                        title: messages.video,
                    },
                },
            },
        },
    ],
};

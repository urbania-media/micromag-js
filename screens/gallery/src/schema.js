import { layouts } from './Gallery';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/gallery.json',
    title: 'Gallery',
    group: 'Gallery',
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
                    screenType: 'gallery',
                    enum: layouts,
                    intl: {
                        title: messages.layout,
                    },
                },
                images: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/images.json',
                    title: 'Images',
                    intl: {
                        title: messages.images,
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

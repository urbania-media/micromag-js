import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/text-image.json',
    title: 'Text with image',
    group: 'Text',
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
                    screenType: 'text-image',
                    enum: names,
                    intl: {
                        title: messages.layout,
                    },
                },
                text: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Text',
                    intl: {
                        title: messages.text,
                    },
                },
                image: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/image.json',
                    title: 'Image',
                    intl: {
                        title: messages.image,
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

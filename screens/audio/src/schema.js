import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/audio.json',
    title: 'Audio',
    group: 'Audio',
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
                    screenType: 'audio',
                    enum: names,
                    intl: {
                        title: messages.layout,
                    },
                },
                audio: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/audio.json',
                    title: 'Audio',
                    intl: {
                        title: messages.audio,
                    },
                },
                image: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/image.json',
                    title: 'Image',
                    intl: {
                        title: messages.image,
                    },
                },
                text: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Description',
                    intl: {
                        title: messages.text,
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

import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/ad.json',
    title: 'Advertising',
    group: 'Ad',
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
                    enum: names,
                    intl: {
                        title: messages.layout,
                    },
                },
                image: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/image.json',
                    title: 'Image',
                    intl: {
                        title: messages.image,
                    },
                },
                url: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/url.json',
                    title: 'Url',
                    intl: {
                        title: messages.url,
                    },
                },
                // NICETOHAVE: add this underneath the image ?
                // text: {
                //     $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                //     title: 'Description',
                //     intl: {
                //         title: messages.text,
                //     },
                // },
                // logo: {
                //     $ref: 'https://schemas.micromag.ca/0.1/elements/image.json',
                //     title: 'Logo',
                //     intl: {
                //         title: messages.logo,
                //     },
                // },
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

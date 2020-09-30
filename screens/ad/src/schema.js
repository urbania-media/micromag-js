import { layouts } from './Ad';
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
                    screenType: 'ad',
                    enum: layouts,
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
                link: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/url.json',
                    title: 'Link',
                    intl: {
                        title: messages.link,
                    },
                },
                text: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Sponsor',
                    intl: {
                        title: messages.sponsor,
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
                spacing: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/spacing.json',
                    title: 'Spacing',
                    intl: {
                        title: messages.spacing,
                    },
                },
            },
        },
    ],
};

import intl from 'react-intl';
import { layouts } from './Ad';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/ad.json',
    title: 'Advertising',
    group: 'Ad',
    type: 'object',
    intl: {
        title: intl.formatMessage({
            description: 'Ad title',
            defaultMessage: 'Advertising',
        }),
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                    screenType: 'ad',
                    enum: layouts,
                    intl: {
                        title: intl.formatMessage({
                            description: 'Schema layout title',
                            defaultMessage: 'Layout',
                        }),
                    },
                },
                image: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/image.json',
                    title: 'Image',
                    intl: {
                        title: intl.formatMessage({
                            description: 'Schema image title',
                            defaultMessage: 'Image',
                        }),
                    },
                },
                link: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/url.json',
                    intl: {
                        title: intl.formatMessage({
                            description: 'Schema link title',
                            defaultMessage: 'Link',
                        }),
                    },
                },
                text: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',

                    intl: {
                        title: intl.formatMessage({
                            description: 'Schema sponsor title',
                            defaultMessage: 'Sponsor',
                        }),
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    intl: {
                        title: intl.formatMessage({
                            description: 'Schema background title',
                            defaultMessage: 'Background',
                        }),
                    },
                },
            },
        },
    ],
};

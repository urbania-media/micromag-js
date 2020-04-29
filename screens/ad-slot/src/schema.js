import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/ad-slot.json',
    title: 'Advertising Slot',
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
                    screenType: 'ad-slot',
                    enum: names,
                    intl: {
                        title: messages.layout,
                    },
                },
                iframe: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/iframe.json',
                    title: 'Ad',
                    intl: {
                        title: messages.ad,
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

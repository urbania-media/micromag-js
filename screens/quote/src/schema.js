import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/quote.json',
    title: 'Quote',
    group: 'Title',
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
                quote: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Quote',
                    intl: {
                        title: messages.quote,
                    },
                },
                source: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Source',
                    intl: {
                        title: messages.source,
                    },
                },
                author: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Author',
                    intl: {
                        title: messages.author,
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

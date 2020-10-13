import { layouts } from './Title';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/title.json',
    title: 'Title',
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
                    screenType: 'title',
                    enum: layouts,
                    intl: {
                        title: messages.layout,
                    },
                },
                title: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/heading.json',
                    title: 'Title',
                    intl: {
                        title: messages.title,
                    },
                },
                subtitle: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/heading.json',
                    title: 'Subtitle',
                    intl: {
                        title: messages.subtitle,
                    },
                },
                description: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    title: 'Description',
                    intl: {
                        title: messages.description,
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

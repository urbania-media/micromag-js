import { schemas as messages } from './messages';
import { layouts } from './Text';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/text.json',
    title: 'Text',
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
                    screenType: 'text',
                    enum: layouts,
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

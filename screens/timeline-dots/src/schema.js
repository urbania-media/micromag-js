import { schemas as messages } from './messages';
// import { layouts } from './TimelineDots';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/timeline-dots.json',
    title: 'Timeline with dots',
    group: 'Timeline',
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
                // layout: {
                //     $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                //     title: 'Layout',
                //     screenType: 'timeline-dots',
                //     enum: layouts,
                //     intl: {
                //         title: messages.layout,
                //     },
                // },
                cards: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/cards.json',
                    title: 'Cards',
                    intl: {
                        title: messages.cards,
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

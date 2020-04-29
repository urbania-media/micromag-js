import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Timeline with dots',
    },
    // layout: {
    //     id: 'schema.properties.layout',
    //     defaultMessage: 'Layout',
    // },
    cards: {
        id: 'schema.properties.cards',
        defaultMessage: 'Cards',
        file: 'src/messages.js',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

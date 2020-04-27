import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Quote',
    },
    quote: {
        id: 'schema.properties.quote',
        defaultMessage: 'Quote',
        file: 'src/messages.js',
    },
    source: {
        id: 'schema.properties.source',
        defaultMessage: 'Source',
        file: 'src/messages.js',
    },
    author: {
        id: 'schema.properties.author',
        defaultMessage: 'Author',
        file: 'src/messages.js',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

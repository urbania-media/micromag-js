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
    },
    source: {
        id: 'schema.properties.source',
        defaultMessage: 'Source',
    },
    author: {
        id: 'schema.properties.author',
        defaultMessage: 'Author',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
    },
});

export default messages;

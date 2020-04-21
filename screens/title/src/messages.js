import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Title',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    title: {
        id: 'schema.properties.title',
        defaultMessage: 'Title',
    },
    subtitle: {
        id: 'schema.properties.subtitle',
        defaultMessage: 'Subtitle',
        file: 'src/messages.js',
    },
    description: {
        id: 'schema.properties.description',
        defaultMessage: 'Description',
        file: 'src/messages.js',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

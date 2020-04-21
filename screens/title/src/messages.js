import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    layout: {
        id: 'schema.layout',
        defaultMessage: 'Layout',
    },
    title: {
        id: 'schema.title',
        defaultMessage: 'Title',
    },
    subtitle: {
        id: 'schema.subtitle',
        defaultMessage: 'Subtitle',
        file: 'src/messages.js',
    },
    description: {
        id: 'schema.description',
        defaultMessage: 'Description',
        file: 'src/messages.js',
    },
    background: {
        id: 'schema.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

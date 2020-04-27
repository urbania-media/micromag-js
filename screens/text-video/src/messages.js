import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Text with video',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    text: {
        id: 'schema.properties.text',
        defaultMessage: 'Text',
    },
    video: {
        id: 'schema.properties.video',
        defaultMessage: 'Video',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

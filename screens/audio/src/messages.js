import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Audio',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    audio: {
        id: 'schema.properties.audio',
        defaultMessage: 'Audio',
    },
    image: {
        id: 'schema.properties.image',
        defaultMessage: 'Image',
    },
    text: {
        id: 'schema.properties.text',
        defaultMessage: 'Text',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

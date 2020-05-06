import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Text with image',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    text: {
        id: 'schema.properties.text',
        defaultMessage: 'Text',
    },
    image: {
        id: 'schema.properties.image',
        defaultMessage: 'Image',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
    },
});

export default messages;

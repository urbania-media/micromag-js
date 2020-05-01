import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Gallery',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    images: {
        id: 'schema.properties.images',
        defaultMessage: 'Images',
    },
    image: {
        id: 'schema.properties.image',
        defaultMessage: 'Image',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

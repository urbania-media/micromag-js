import { defineMessages } from 'react-intl';

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Advertising',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    image: {
        id: 'schema.properties.image',
        defaultMessage: 'Image',
    },
    link: {
        id: 'schema.properties.link',
        defaultMessage: 'Link',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default schemas;

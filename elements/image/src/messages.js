import { defineMessages } from 'react-intl';

const messages = defineMessages({
    name: {
        id: 'messages.name',
        defaultMessage: 'Image',
    },
});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Image element',
    },
    imageStyle: {
        id: 'schema.properties.image_style',
        defaultMessage: 'Image style',
    },
    container: {
        id: 'schema.properties.container_style',
        defaultMessage: 'Container style',
    },
    caption: {
        id: 'schema.properties.caption',
        defaultMessage: 'Caption',
    },
});

export default messages;

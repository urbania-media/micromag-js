import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Map with path',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    map: {
        id: 'schema.properties.map',
        defaultMessage: 'Map',
        file: 'src/messages.js',
    },
    markers: {
        id: 'schema.properties.markers',
        defaultMessage: 'Markers',
        file: 'src/messages.js',
    },
    cardBackground: {
        id: 'schema.properties.cardBackground',
        defaultMessage: 'Item background',
        file: 'src/messages.js',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;

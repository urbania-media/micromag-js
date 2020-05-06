import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Map',
    },
    layout: {
        id: 'schema.properties.layout',
        defaultMessage: 'Layout',
    },
    map: {
        id: 'schema.properties.map',
        defaultMessage: 'Map',
    },
    markers: {
        id: 'schema.properties.markers',
        defaultMessage: 'Markers',
    },
    cardTextStyle: {
        id: 'schema.properties.cardTextStyle',
        defaultMessage: 'Marker text style',
    },
    cardBackground: {
        id: 'schema.properties.cardBackground',
        defaultMessage: 'Marker background',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
    },
});

export default messages;

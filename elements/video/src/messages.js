import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Video element',
    },
    video: {
        id: 'schema.properties.video',
        defaultMessage: 'Video',
    },
    subtitles: {
        id: 'schema.properties.subtitles',
        defaultMessage: 'Subtitles',
    },
    subtitleStyle: {
        id: 'schema.properties.subtitleStyle',
        defaultMessage: 'Subtitle style',
    },
});

export default messages;

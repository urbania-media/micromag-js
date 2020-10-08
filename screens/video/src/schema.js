import intl from 'react-intl';
import { schemaId } from '@micromag/core/utils';
import { layouts } from './Video';

const schema = {
    id: 'video',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Video',
    }),
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
            }),
            layouts,
        },
        {
            name: 'video',
            type: 'video',
            label: defineMessage({
                defaultMessage: 'Video',
            }),
        },
        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
            }),
        },
    ],
};

export default {
    $id: schemaId`screens/video`,
    title: 'Video',
    group: 'Video',
    type: 'object',
    intl: {
        title: intl.formatMessage({
            description: 'Video screen title',
            defaultMessage: 'Video',
        }),
    },
    allOf: [
        {
            $ref: schemaId`screens/screen.json`,
        },
        {
            properties: {
                layout: {
                    $ref: schemaId`fields/screen-layout.json`,
                    screenType: 'video',
                    enum: layouts,
                    intl: {
                        title: intl.formatMessage({
                            description: 'Layout title',
                            defaultMessage: 'Layout',
                        }),
                    },
                },
                video: {
                    $ref: schemaId`elements/video.json`,
                    intl: {
                        title: intl.formatMessage({
                            description: 'Video title',
                            defaultMessage: 'Video',
                        }),
                    },
                },
                background: {
                    $ref: schemaId`elements/background.json`,
                    intl: {
                        title: intl.formatMessage({
                            description: 'Background title',
                            defaultMessage: 'Background',
                        }),
                    },
                },
            },
        },
    ],
};

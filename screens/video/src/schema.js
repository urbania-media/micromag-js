import { defineMessage } from 'react-intl';
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
        title: defineMessage({
            defaultMessage: 'Video',
            description: 'Video screen title',
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
                    title: 'Layout',
                    screenType: 'video',
                    enum: layouts,
                    intl: {
                        title: defineMessage({
                            defaultMessage: 'Layout',
                        }),
                    },
                },
                video: {
                    $ref: schemaId`elements/video.json`,
                    title: 'Video',
                    intl: {
                        title: defineMessage({
                            defaultMessage: 'Video',
                        }),
                    },
                },
                background: {
                    $ref: schemaId`elements/background.json`,
                    title: 'Background',
                    intl: {
                        title: defineMessage({
                            defaultMessage: 'Background',
                        }),
                    },
                },
            },
        },
    ],
};

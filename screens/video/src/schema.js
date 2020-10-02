import { defineMessage } from 'react-intl';
import { schemaId } from '@micromag/core/utils';
import { layouts } from './Video';

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

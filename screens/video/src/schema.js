import intl from 'react-intl';
import { schemaId } from '@micromag/core/utils';
import { layouts } from './Video';

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

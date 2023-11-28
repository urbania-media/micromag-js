import { defineMessage } from 'react-intl';

export default {
    id: 'message',
    component: 'message',
    labelPath: 'message',
    thumbnailPath: 'avatar.thumbnail_url',
    fields: [
        {
            name: 'speaker',
            type: 'select',
            label: defineMessage({
                defaultMessage: 'Speaker',
                description: 'Field label',
            }),
        },
        {
            name: 'message',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Message',
                description: 'Field label',
            }),
        },
        {
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Field label',
            }),
        },
        {
            name: 'audio',
            type: 'audio',
            label: defineMessage({
                defaultMessage: 'Audio attachment',
                description: 'Field label'
            })
        },
        {
            name: 'timingOverrides',
            component: 'toggle-section',
            isList: true,
            fields: [
                {
                    name: 'enabled',
                    type: 'toggle',
                    isHorizontal: true,
                    label: defineMessage({
                        defaultMessage: 'Override default timing',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'appearDelay',
                    type: 'number',
                    defaultValue: 2,
                    label: defineMessage({
                        defaultMessage: 'Appear delay (seconds)',
                        description: 'Field label'
                    })
                },
                {
                    name: 'writingDuration',
                    type: 'number',
                    defaultValue: 5,
                    label: defineMessage({
                        defaultMessage: 'Writing state duration (seconds)',
                        description: 'Field label'
                    })
                }
            ]
        }
    ],
};

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
    ],
};

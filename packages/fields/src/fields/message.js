import { defineMessage } from 'react-intl';

import Fields from '../components/Fields';

export default {
    id: 'message',
    component: Fields,
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
    ]
};

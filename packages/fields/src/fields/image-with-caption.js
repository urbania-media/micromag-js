import { defineMessage } from 'react-intl';

export default {
    id: 'image-with-caption',
    component: 'field-with-form',
    labelPath: 'caption.body',
    thumbnailPath: 'media.thumbnail_url',
    fields: [
        {
            name: 'media',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Field label',
            }),
        },
        {
            name: 'caption',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Caption',
                description: 'Field label',
            }),
        }
    ]
};

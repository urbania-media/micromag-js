import { defineMessage } from 'react-intl';

export default {
    id: 'visual-with-caption',
    component: 'field-with-form',
    labelPath: 'caption.body',
    thumbnailPath: 'media.thumbnail_url',
    fields: [
        {
            name: 'media',
            type: 'visual',
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

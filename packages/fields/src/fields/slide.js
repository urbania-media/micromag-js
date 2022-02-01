import { defineMessage } from 'react-intl';

export default {
    id: 'slide',
    component: 'field-with-form',
    labelPath: 'caption.body',
    thumbnailPath: 'media.thumbnail_url',
    fields: [
        {
            name: 'heading',
            type: 'heading-element',
            label: defineMessage({
                defaultMessage: 'Heading',
                description: 'Field label',
            }),
        },
        {
            name: 'media',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Image / Video',
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

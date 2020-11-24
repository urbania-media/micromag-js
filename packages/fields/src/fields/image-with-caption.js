import { defineMessage } from 'react-intl';

import FieldWithForm from '../components/FieldWithForm';

export default {
    id: 'image-with-caption',
    component: FieldWithForm,
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

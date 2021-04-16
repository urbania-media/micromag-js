import { defineMessage } from 'react-intl';

import FieldWithForm from '../components/FieldWithForm';

export default {
    id: 'visual-with-caption',
    component: FieldWithForm,
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

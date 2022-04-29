import { defineMessage } from 'react-intl';

export default {
    id: 'author-element',
    component: 'field-with-form',
    labelPath: 'name.body',
    fields: [
        {
            name: 'name',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Name',
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
            name: 'url',
            type: 'url',
            label: defineMessage({
                defaultMessage: 'URL',
                description: 'Field label',
            }),
        },
    ],
};

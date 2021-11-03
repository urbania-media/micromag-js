import { defineMessage } from 'react-intl';

export default {
    id: 'speaker',
    component: 'field-with-form',
    labelPath: 'name',
    thumbnailPath: 'avatar.thumbnail_url',
    fields: [
        {
            name: 'name',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Name',
                description: 'Field label',
            }),
        },
        {
            name: 'avatar',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Avatar',
                description: 'Field label',
            }),
        },
        {
            name: 'side',
            type: 'radios',
            options: [
                {
                    value: 'left',
                    label: defineMessage({
                        defaultMessage: 'Left',
                        description: 'Field left label',
                    })
                },
                {
                    value: 'right',
                    label: defineMessage({
                        defaultMessage: 'Right',
                        description: 'Field right label',
                    })
                }
            ],
            label: defineMessage({
                defaultMessage: 'Side',
                description: 'Field label',
            }),
        },
        {
            name: 'color',
            type: 'color',
            label: defineMessage({
                defaultMessage: 'Color',
                description: 'Field label',
            }),
        }
    ]
};

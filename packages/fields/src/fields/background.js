import { defineMessage } from 'react-intl';

export default {
    id: 'background',
    isList: true,
    fields: [
        {
            name: 'color',
            type: 'color',
            label: defineMessage({
                defaultMessage: 'Color',
                description: 'Field label',
            }),
            breadcrumbLabel: defineMessage({
                defaultMessage: 'Background color',
                description: 'Field label',
            })
        },
        {
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Field label',
            }),
            breadcrumbLabel: defineMessage({
                defaultMessage: 'Background image',
                description: 'Field label',
            })
        },
        {
            name: 'video',
            type: 'video',
            label: defineMessage({
                defaultMessage: 'Video',
                description: 'Field label',
            }),
            breadcrumbLabel: defineMessage({
                defaultMessage: 'Background video',
                description: 'Field label',
            })
        }
    ],

    settings: [
        {
            type: 'fields',
            isList: true,
            fields: [
                {
                    name: 'fit',
                    type: 'fit',
                    label: defineMessage({
                        defaultMessage: 'Fit',
                        description: 'Field label',
                    })
                },
                {
                    name: 'repeat',
                    type: 'toggle',
                    label: defineMessage({
                        defaultMessage: 'Repeat',
                        description: 'Field label',
                    })
                }
            ]
        }
    ]
};

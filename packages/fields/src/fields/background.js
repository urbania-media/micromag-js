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
    ]
};

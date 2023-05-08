import { defineMessage } from 'react-intl';

export default {
    id: 'background-recommendation',
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
                description: 'Breadcrumb field label',
            }),
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
                description: 'Breadcrumb field label',
            }),
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
                description: 'Breadcrumb field label',
            }),
        },
        {
            name: 'text',
            type: 'text-element',
            textOnly: true,
            label: defineMessage({
                defaultMessage: 'Background text',
                description: 'Field label',
            }),
        },
        {
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Style',
                description: 'Field label',
            }),
        },
    ],
};

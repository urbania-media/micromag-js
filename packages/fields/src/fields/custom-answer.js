import { defineMessage } from 'react-intl';

export default {
    id: 'custom-answer',
    component: 'custom-answer',
    fields: [
        {
            name: 'active',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Custom answer',
                description: 'Field label',
            }),
        },
        {
            name: 'placeholder',
            type: 'text-element',
            withoutLink: true,
            textOnly: true,
            fieldsProps: {
                textStyle: {
                    excludedFields: ['link', 'highlight'],
                },
            },
            label: defineMessage({
                defaultMessage: 'Placeholder',
                description: 'Field label',
            }),
        },
        {
            name: 'textStyle',
            type: 'text-style-form',
            excludedFields: ['link', 'highlight'],
            label: defineMessage({
                defaultMessage: 'Text style',
                description: 'Field label',
            }),
        },
        {
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Box style',
                description: 'Field label',
            }),
        },
    ],
};

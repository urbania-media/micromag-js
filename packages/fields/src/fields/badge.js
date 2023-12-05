import { defineMessage } from 'react-intl';

export default {
    id: 'badge',
    component: 'badge',
    fields: [
        {
            name: 'active',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Badge',
                description: 'Field label',
            }),
        },
        {
            name: 'label',
            type: 'text-element',
            withoutLink: true,
            fieldsProps: {
                textStyle: {
                    excludedFields: ['link'],
                },
            },
            label: defineMessage({
                defaultMessage: 'Label',
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

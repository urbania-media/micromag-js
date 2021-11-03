import { defineMessage } from 'react-intl';

export default {
    id: 'call-to-action',
    isList: true,
    component: 'call-to-action',
    fields: [
        {
            name: 'active',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Call to Action',
                description: 'CTA field active subfield label',
            }),
        },
        {
            name: 'type',
            type: 'radios',
            options: [
                {
                    value: 'swipe-up',
                    label: defineMessage({
                        defaultMessage: 'Swipe up',
                        description: 'CTA field type subfield swipe-up option label',
                    }),
                },
                {
                    value: 'button',
                    label: defineMessage({
                        defaultMessage: 'Button',
                        description: 'CTA field type subfield button option label',
                    }),
                },
            ],
            firstOptionAsDefault: true,
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Type',
                description: 'CTA field type subfield label',
            }),
        },
        {
            name: 'url',
            type: 'url',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Link',
                description: 'CTA field url field label',
            }),
        },
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'CTA field label field label',
            }),
        },
    ],
};

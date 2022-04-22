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
                description: 'Field label',
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
                        description: 'Field label',
                    }),
                },
                {
                    value: 'button',
                    label: defineMessage({
                        defaultMessage: 'Button',
                        description: 'Field label',
                    }),
                },
            ],
            firstOptionAsDefault: true,
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Type',
                description: 'Field label',
            }),
        },
        {
            name: 'inWebView',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Pop-up window',
                description: 'Field label',
            }),
        },
        {
            name: 'url',
            type: 'url',
            // isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Link',
                description: 'Field label',
            }),
        },
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Button',
                description: 'Field label',
            }),
        },
    ],
};

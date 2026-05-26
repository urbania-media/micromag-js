import { defineMessage } from 'react-intl';

export default {
    id: 'call-to-action',
    component: 'toggle-fields',
    toggleLabel: defineMessage({
        defaultMessage: 'Call to Action',
        description: 'Field label',
    }),
    fields: [
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
            defaultValue: 'swipe-up',
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
                defaultMessage: 'Embedded browser',
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
            withoutLink: true,
            defaultValue: ({ intl }) => ({
                body: intl.formatMessage(
                    defineMessage({
                        defaultMessage: 'Learn more',
                        description: 'Call to action default label',
                    }),
                ),
            }),
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
                defaultMessage: 'Button',
                description: 'Field label',
            }),
        },
    ],
};

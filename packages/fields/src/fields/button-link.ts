import { defineMessage } from 'react-intl';

export default {
    id: 'button-link',
    isList: true,
    component: 'fields',
    fields: [
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
            name: 'url',
            type: 'url',
            // isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Link',
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
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Button',
                description: 'Field label',
            }),
        },
    ],
};

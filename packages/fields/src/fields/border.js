import { defineMessage } from 'react-intl';

export default {
    id: 'border',
    fields: [
        {
            name: 'width',
            type: 'border-width',
            label: defineMessage({
                defaultMessage: 'Border width',
                description: 'Border width label',
            }),
        },
        {
            name: 'style',
            type: 'border-style',
            label: defineMessage({
                defaultMessage: 'Border style',
                description: 'Border style label',
            }),
        },
        {
            name: 'color',
            type: 'color',
            label: defineMessage({
                defaultMessage: 'Border color',
                description: 'Border color label',
            }),
        },
        {
            name: 'radius',
            type: 'border-radius',
            label: defineMessage({
                defaultMessage: 'Border radius',
                description: 'Border radius label',
            }),
        },
    ],
};

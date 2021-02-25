import { defineMessage } from 'react-intl';

export default {
    id: 'button-element',
    component: 'text-element',
    settings: [
        {
            name: 'textStyle',
            type: 'text-style',
        },
        {
            name: 'backgroundColor',
            label: defineMessage({
                defaultMessage: 'Background color',
                description: 'Background color label',
            }),
            type: 'color'
        },
        {
            name: 'borderStyle',
            label: defineMessage({
                defaultMessage: 'Border',
                description: 'Border color label',
            }),
            type: 'border'
        }
    ]
};

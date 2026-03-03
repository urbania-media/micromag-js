import { defineMessage } from 'react-intl';

export default {
    id: 'game-sort-item',
    component: 'field-with-form',
    labelPath: 'label.body',
    fields: [
        {
            name: 'label',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
            withSettings: false,
        },
        {
            name: 'visual',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Visual',
                description: 'Field label',
            }),
        },
        {
            name: 'results',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Results',
                description: 'Field label',
            }),
            withSettings: false,
        },
        {
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Button style',
                description: 'Field label',
            }),
        },
    ],
};

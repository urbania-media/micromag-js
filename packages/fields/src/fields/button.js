import { defineMessage } from 'react-intl';

export default {
    id: 'button',
    component: 'field-with-form',
    labelPath: 'label',
    fields: [
        {
            name: 'label',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
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
            name: 'textStyle',
            type: 'text-style-form',
            label: defineMessage({
                defaultMessage: 'Label style',
                description: 'Field label',
            }),
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

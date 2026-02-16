import { name } from 'ejs';
import { defineMessage } from 'react-intl';

export default {
    id: 'rich-button-styles',
    fields: [
        {
            name: 'layout',
            type: 'button-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Field label',
            }),
        },
        {
            name: 'visualWidth',
            type: 'slider',
            label: defineMessage({
                defaultMessage: 'Visual width',
                description: 'Field label',
            }),
            min: 0,
            max: 100,
            step: 1,
            unit: '%',
            withInput: true,
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
            name: 'labelBoxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Label box style',
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

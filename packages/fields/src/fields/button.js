import { defineMessage } from 'react-intl';

export default {
    id: 'button',
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
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Button style',
                description: 'Field label',
            }),
        },
        // If necessary some day
        // {
        //     name: 'alignment',
        //     type: 'alignment',
        //     label: defineMessage({
        //         defaultMessage: 'Button alignment',
        //         description: 'Field label',
        //     }),
        // },
        {
            name: 'url',
            type: 'url',
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
    ],
};

import { defineMessage } from 'react-intl';

export default {
    id: 'answer',
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
        },
        {
            type: 'fields',
            isList: true,
            fields: [
                {
                    name: 'textStyle',
                    type: 'text-style-form',
                    label: defineMessage({
                        defaultMessage: 'Button text style',
                        description: 'Field label',
                    }),
                },
                {
                    type: 'box-style-form',
                    name: 'buttonStyle',
                    label: defineMessage({
                        defaultMessage: 'Button style',
                        description: 'Field label',
                    })
                },
                {
                    name: 'resultStyle',
                    type: 'graph-bar-style',
                    isList: true,
                    label: defineMessage({
                        defaultMessage: 'Result style',
                        description: 'Field section label',
                    }),
                },
            ]
        },
    ],
};

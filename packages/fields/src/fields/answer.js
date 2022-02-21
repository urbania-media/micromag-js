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
            name: 'buttonStyle',
            type: 'box-style',
            className: 'mt-4'
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
    ],
};

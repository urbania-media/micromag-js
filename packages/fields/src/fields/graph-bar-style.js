import { defineMessage } from 'react-intl';

export default {
    id: 'graph-bar-style',
    isList: true,
    fields: [
        {
            name: 'barColor',
            type: 'color',
            label: defineMessage({
                defaultMessage: 'Bar',
                description: 'Field label',
            }),
        },
        {
            name: 'textColor',
            type: 'color',
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Field label',
            }),
        },
        {
            name: 'percentageTextStyle',
            type: 'text-style-form',
            label: defineMessage({
                defaultMessage: 'Percentage Text',
                description: 'Field label',
            }),
        },
    ],
};

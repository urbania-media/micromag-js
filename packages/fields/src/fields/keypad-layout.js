import { defineMessage } from 'react-intl';

export default {
    id: 'keypad-layout',
    fields: [
        {
            name: 'columnAlign',
            type: 'align-horizontal',
            defaultValue: 'middle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Align items',
                description: 'Field label',
            }),
        },
        {
            name: 'columns',
            type: 'radios',
            options: [
                {
                    value: 1,
                    label: 1,
                },
                {
                    value: 2,
                    label: 2,
                },
                {
                    value: 3,
                    label: 3,
                },
                {
                    value: 4,
                    label: 4,
                },
            ],
            label: defineMessage({
                defaultMessage: 'Columns',
                description: 'Field label',
            }),
        },
        {
            name: 'spacing',
            type: 'number',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Spacing',
                description: 'Field label',
            }),
        },
        {
            name: 'withSquareItems',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'Use square keys',
                description: 'Field label',
            }),
        },
    ],
};

import { defineMessage } from 'react-intl';

export default {
    id: 'share-incentive',
    component: 'share-incentive',
    fields: [
        {
            name: 'active',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Share Incentive',
                description: 'Field label',
            }),
        },
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            fieldsProps: {
                textStyle: {
                    excludedFields: ['highlight', 'link'],
                },
            },
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Box style',
                description: 'Field label',
            }),
        },
    ],
};

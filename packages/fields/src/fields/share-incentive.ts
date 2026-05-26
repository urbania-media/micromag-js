import { defineMessage } from 'react-intl';

export default {
    id: 'share-incentive',
    component: 'toggle-fields',
    toggleLabel: defineMessage({
        defaultMessage: 'Share Incentive',
        description: 'Field label',
    }),
    fields: [
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            fieldsProps: {
                textStyle: {
                    excludedFields: ['highlight', 'link'],
                },
            },
            defaultValue: ({ intl }) => ({
                body: intl.formatMessage(
                    defineMessage({
                        defaultMessage: 'Share this Micromag!',
                        description: 'Share Incentive default label',
                    }),
                ),
            }),
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

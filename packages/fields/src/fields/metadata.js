import { defineMessage } from 'react-intl';

export default {
    id: 'metadata',
    component: 'field-with-form',
    noValueLabel: defineMessage({
        defaultMessage: 'Edit metadata...',
        description: 'metadata field placeholder',
    }),
    fields: [
        {
            name: 'title',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'field label',
            }),
        },
        {
            name: 'description',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Description',
                description: 'field label',
            }),
        },
    ]
};

import { defineMessage } from 'react-intl';

export default {
    id: 'metadata',
    component: 'field-with-form',
    labelPath: 'title',
    noValueLabel: defineMessage({
        defaultMessage: 'Edit metadata...',
        description: 'No value field label',
    }),
    fields: [
        {
            name: 'title',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Field label',
            }),
        },
        {
            name: 'description',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Description',
                description: 'Field label',
            }),
        },
    ],
};
